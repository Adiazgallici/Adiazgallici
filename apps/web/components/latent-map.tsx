import Link from "next/link";
import { formatMonth, monthsLive, type Project } from "@/lib/projects";

// Magma, trimmed at the dark end so every dot stays visible on the dark page.
const MAGMA = ["#8c2981", "#b73779", "#de4968", "#f7705c", "#fe9f6d", "#fecf92", "#fcfdbf"];

// Shorter labels for narrow screens, where the map text is drawn larger.
const SHORT: Record<string, string> = { passadore: "Passadore" };

const W = 1000;
const H = 560;
const PAD = { left: 56, right: 40, top: 36, bottom: 64 };

function place(p: Project) {
  return {
    x: PAD.left + p.map.x * (W - PAD.left - PAD.right),
    y: H - PAD.bottom - p.map.y * (H - PAD.top - PAD.bottom),
  };
}

export function LatentMap({ projects }: { projects: Project[] }) {
  const ages = projects.map((p) => monthsLive(p.liveSince));
  const lo = Math.min(...ages);
  const hi = Math.max(...ages);
  const points = projects.map((p) => {
    const age = monthsLive(p.liveSince);
    const t = (age - lo) / (hi - lo || 1);
    return {
      p,
      ...place(p),
      r: 9 + age * 2.6,
      fill: MAGMA[Math.round(t * (MAGMA.length - 1))],
    };
  });
  // Each project's nearest neighbour on the map, drawn once per pair.
  const pairs = new Set<string>();
  const edges: [typeof points[number], typeof points[number]][] = [];
  for (const a of points) {
    let best = points[0];
    let bestD = Infinity;
    for (const b of points) {
      if (a === b) continue;
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < bestD) {
        bestD = d;
        best = b;
      }
    }
    const key = [a.p.slug, best.p.slug].sort().join("|");
    if (!pairs.has(key)) {
      pairs.add(key);
      edges.push([a, best]);
    }
  }

  return (
    <figure className="latent-map">
      <svg viewBox={`0 0 ${W} ${H}`} role="group" aria-labelledby="map-title map-desc">
        <title id="map-title">Projects plotted by who they are for and how much AI they use</title>
        <desc id="map-desc">
          Horizontal position goes from built for our own business on the left to built for
          other people on the right. Vertical position goes from no AI at the bottom to AI at the
          core at the top. Larger dots have been in real use for longer.
        </desc>
        <g className="map-axes" aria-hidden="true">
          <line x1={PAD.left} y1={H - PAD.bottom} x2={W - PAD.right} y2={H - PAD.bottom} />
          <line x1={PAD.left} y1={PAD.top} x2={PAD.left} y2={H - PAD.bottom} />
          {[0.25, 0.5, 0.75].map((t) => (
            <g key={t}>
              <line
                className="map-tick"
                x1={PAD.left + t * (W - PAD.left - PAD.right)}
                x2={PAD.left + t * (W - PAD.left - PAD.right)}
                y1={PAD.top}
                y2={H - PAD.bottom}
              />
              <line
                className="map-tick"
                y1={H - PAD.bottom - t * (H - PAD.top - PAD.bottom)}
                y2={H - PAD.bottom - t * (H - PAD.top - PAD.bottom)}
                x1={PAD.left}
                x2={W - PAD.right}
              />
            </g>
          ))}
          <text x={PAD.left} y={H - 24} className="map-axis-label">
            Built for our own business
          </text>
          <text x={W - PAD.right} y={H - 24} textAnchor="end" className="map-axis-label">
            Built for other people
          </text>
          <text
            x={-(H - PAD.bottom)}
            y={24}
            transform="rotate(-90)"
            className="map-axis-label"
          >
            No AI
          </text>
          <text
            x={-PAD.top}
            y={24}
            transform="rotate(-90)"
            textAnchor="end"
            className="map-axis-label"
          >
            AI at the core
          </text>
        </g>
        <g className="map-edges" aria-hidden="true">
          {edges.map(([a, b]) => (
            <line key={a.p.slug + b.p.slug} x1={a.x} y1={a.y} x2={b.x} y2={b.y} />
          ))}
        </g>
        {points.map(({ p, x, y, r, fill }) => {
          const right = x > W * 0.7;
          return (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              prefetch={false}
              className="map-point"
              aria-label={`${p.name}: live since ${formatMonth(p.liveSince)}. Open the project.`}
            >
              <circle cx={x} cy={y} r={r + 10} className="map-halo" />
              <circle cx={x} cy={y} r={r} fill={fill} />
              <text
                x={right ? x - r - 12 : x + r + 12}
                y={y - 2}
                textAnchor={right ? "end" : "start"}
                className="map-name"
              >
                <tspan className="name-full">{p.name}</tspan>
                <tspan className="name-short">{SHORT[p.slug] ?? p.name}</tspan>
              </text>
              <text
                x={right ? x - r - 12 : x + r + 12}
                y={y + 18}
                textAnchor={right ? "end" : "start"}
                className="map-count"
              >
                since {formatMonth(p.liveSince)}
              </text>
            </Link>
          );
        })}
      </svg>
    </figure>
  );
}
