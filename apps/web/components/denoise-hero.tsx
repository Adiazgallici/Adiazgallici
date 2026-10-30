"use client";

import { useEffect, useRef, useState } from "react";

const STEPS = 50;
const STEP_MS = 44;

// Cosine noise schedule (Nichol & Dhariwal, 2021): signal kept at step t.
function alphaBar(t: number) {
  const s = 0.008;
  const f = (x: number) => Math.cos(((x / STEPS + s) / (1 + s)) * (Math.PI / 2)) ** 2;
  return f(t) / f(0);
}

function gaussian() {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

// Magma, from hot to pale, then into the page's ink colour once the noise is gone.
const MAGMA = ["#de4968", "#f66e5b", "#fe9f6d", "#fecf92"];
function hex(c: string) {
  const n = parseInt(c.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function mix(a: number[], b: number[], t: number) {
  return a.map((v, i) => Math.round(v + (b[i] - v) * t));
}
function colourFor(noise: number, ink: number[]) {
  if (noise < 0.18) return mix(ink, hex(MAGMA[3]), noise / 0.18);
  const scaled = ((noise - 0.18) / 0.82) * (MAGMA.length - 1);
  const i = Math.min(MAGMA.length - 2, Math.floor(scaled));
  return mix(hex(MAGMA[3 - i]), hex(MAGMA[2 - i] ?? MAGMA[0]), scaled - i);
}

type Dot = {
  tx: number;
  ty: number;
  nx: number;
  ny: number;
  dx: number;
  dy: number;
  target: boolean;
};

export function DenoiseHero({ lines }: { lines: string[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [step, setStep] = useState(STEPS);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let dots: Dot[] = [];
    let width = 0;
    let height = 0;
    let gap = 7;
    let frame = 0;
    let startedAt = 0;
    let finished = reduce;
    let pointer: { x: number; y: number } | null = null;
    let disposed = false;

    const ink = () =>
      hex(getComputedStyle(document.documentElement).getPropertyValue("--ink").trim() || "#fcf6d9");

    function layout() {
      width = wrap!.clientWidth;
      const narrow = width < 640;
      gap = narrow ? 4.5 : width < 1000 ? 6 : 7;
      const family = getComputedStyle(wrap!).fontFamily;
      const probe = document.createElement("canvas").getContext("2d")!;
      probe.font = `700 100px ${family}`;
      const widest = Math.max(...lines.map((l) => probe.measureText(l).width));
      const size = Math.min(170, (width * 0.985 * 100) / widest);
      const lineHeight = size * 0.98;
      height = Math.ceil(lineHeight * lines.length + size * 0.22);

      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const off = document.createElement("canvas");
      off.width = Math.ceil(width);
      off.height = height;
      const o = off.getContext("2d", { willReadFrequently: true })!;
      o.font = `700 ${size}px ${family}`;
      o.textBaseline = "alphabetic";
      o.fillStyle = "#000";
      lines.forEach((l, i) => o.fillText(l, 0, size * 0.86 + i * lineHeight));
      const data = o.getImageData(0, 0, off.width, off.height).data;

      const next: Dot[] = [];
      for (let y = gap / 2; y < height; y += gap) {
        for (let x = gap / 2; x < width; x += gap) {
          const a = data[(Math.floor(y) * off.width + Math.floor(x)) * 4 + 3];
          if (a > 185) next.push(makeDot(x, y, true));
        }
      }
      // Stray dots: part of the noise, they fade out as the signal returns.
      const strays = Math.round(next.length * 0.35);
      for (let i = 0; i < strays; i++) next.push(makeDot(Math.random() * width, Math.random() * height, false));
      dots = next;
    }

    function makeDot(tx: number, ty: number, target: boolean): Dot {
      return {
        tx,
        ty,
        nx: width / 2 + gaussian() * width * 0.32,
        ny: height / 2 + gaussian() * height * 0.42,
        dx: 0,
        dy: 0,
        target,
      };
    }

    function draw(t: number) {
      // t runs from STEPS (pure noise) down to 0 (clean), fractional between steps.
      const ab = alphaBar(t);
      const signal = Math.sqrt(ab);
      const noise = Math.sqrt(1 - ab);
      const base = ink();
      ctx!.clearRect(0, 0, width, height);
      const r = gap * 0.34;
      const jitter = noise * gap * 0.9;
      const [cr, cg, cb] = colourFor(noise, base);
      ctx!.fillStyle = `rgb(${cr},${cg},${cb})`;
      ctx!.beginPath();
      let strayAlpha = 0;
      for (const d of dots) {
        if (!d.target) continue;
        const x = signal * d.tx + noise * d.nx + d.dx + (jitter ? gaussian() * jitter : 0);
        const y = signal * d.ty + noise * d.ny + d.dy + (jitter ? gaussian() * jitter : 0);
        ctx!.moveTo(x + r, y);
        ctx!.arc(x, y, r, 0, Math.PI * 2);
      }
      ctx!.fill();
      strayAlpha = noise * 0.9;
      if (strayAlpha > 0.02) {
        ctx!.globalAlpha = strayAlpha;
        ctx!.beginPath();
        for (const d of dots) {
          if (d.target) continue;
          const x = d.nx + (jitter ? gaussian() * jitter * 2 : 0);
          const y = d.ny + (jitter ? gaussian() * jitter * 2 : 0);
          ctx!.moveTo(x + r, y);
          ctx!.arc(x, y, r, 0, Math.PI * 2);
        }
        ctx!.fill();
        ctx!.globalAlpha = 1;
      }
    }

    // After sampling: the pointer pushes dots away (local re-noising) and they settle back.
    function settle() {
      let moving = false;
      const radius = gap * 9;
      for (const d of dots) {
        if (!d.target) continue;
        if (pointer) {
          const vx = d.tx + d.dx - pointer.x;
          const vy = d.ty + d.dy - pointer.y;
          const dist = Math.hypot(vx, vy);
          if (dist < radius && dist > 0.01) {
            const push = (1 - dist / radius) * gap * 0.9;
            d.dx += (vx / dist) * push + gaussian() * push * 0.4;
            d.dy += (vy / dist) * push + gaussian() * push * 0.4;
          }
        }
        d.dx *= 0.86;
        d.dy *= 0.86;
        if (Math.abs(d.dx) > 0.05 || Math.abs(d.dy) > 0.05) moving = true;
        else {
          d.dx = 0;
          d.dy = 0;
        }
      }
      return moving;
    }

    function loop(now: number) {
      if (disposed) return;
      if (!finished) {
        const elapsed = now - startedAt;
        const t = Math.max(0, STEPS - elapsed / STEP_MS);
        setStep(Math.ceil(t));
        draw(t);
        if (t <= 0) {
          finished = true;
          setDone(true);
        }
        frame = requestAnimationFrame(loop);
        return;
      }
      const moving = settle();
      draw(0);
      frame = moving || pointer ? requestAnimationFrame(loop) : 0;
    }

    function wake() {
      if (!frame && !disposed) frame = requestAnimationFrame(loop);
    }

    function onMove(e: PointerEvent) {
      if (!finished || reduce) return;
      const rect = canvas!.getBoundingClientRect();
      pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      wake();
    }
    function onLeave() {
      pointer = null;
      wake();
    }

    const resize = new ResizeObserver(() => {
      if (Math.abs(wrap.clientWidth - width) < 2) return;
      layout();
      draw(finished ? 0 : STEPS);
      wake();
    });

    document.fonts.ready.then(() => {
      if (disposed) return;
      layout();
      if (reduce) {
        draw(0);
        setStep(0);
        setDone(true);
      } else {
        draw(STEPS);
        startedAt = performance.now() + 250;
        frame = requestAnimationFrame(loop);
      }
      resize.observe(wrap);
    });

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    const theme = new MutationObserver(() => wake());
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resize.disconnect();
      theme.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [lines]);

  return (
    <div className="denoise" ref={wrapRef}>
      <canvas ref={canvasRef} aria-hidden="true" />
      <p className="denoise-readout" aria-hidden="true">
        {done ? (
          <>
            This is how image AI works: it starts from noise and cleans it up, step by step.{" "}
            <span className="hint-hover">Hover</span>
            <span className="hint-touch">Touch</span> to add some noise back.
          </>
        ) : (
          <>
            Sampling step {String(STEPS - step).padStart(2, "0")} of {STEPS}
          </>
        )}
      </p>
    </div>
  );
}
