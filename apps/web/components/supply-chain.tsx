"use client";

import { useEffect, useRef, useState } from "react";

// The path every imported product takes through Lessio Stock. Numbers as of the
// snapshot date in lib/projects.ts; none of them reveal amounts or names.
const STATIONS = [
  {
    id: "china",
    place: "China suppliers",
    module: "Orders and card payments",
    detail:
      "Purchase orders to suppliers in China, with partial payments and every import paid across our credit cards. The app tracks each card’s limit, closing and due dates, and warns two weeks before a statement is due.",
    proof: "27 China orders, 6 cards",
  },
  {
    id: "transit",
    place: "In transit",
    module: "Automatic tracking",
    detail:
      "Each shipment is tracked automatically from China to our door, batch by batch, with its own ETA and customs taxes. An alert goes out when an order is about to land or running late.",
    proof: "18 shipments tracked",
  },
  {
    id: "warehouse",
    place: "Our warehouse",
    module: "Landed cost and COGS",
    detail:
      "Every unit carries its real cost, product plus freight plus taxes, in FIFO layers. Each sale is costed when it happens, and COGS and profit reports come out per product.",
    proof: "452 FIFO cost layers",
  },
  {
    id: "full",
    place: "Mercado Libre FULL",
    module: "Shipment forecast",
    detail:
      "Forecasts when each product runs out in Mercado Libre’s warehouse and plans the next shipment. What Mercado Libre receives, often in parts, is reconciled against what we sent, and returns are told apart from new stock.",
    proof: "21 shipments to FULL",
  },
  {
    id: "customer",
    place: "Customer",
    module: "Orders and promotions",
    detail:
      "Orders sync straight from the Mercado Libre API, returns are detected, and promotions are applied automatically every morning.",
    proof: "7,170 orders synced",
  },
];

const TRAVEL_MS = 2600;

export function SupplyChain() {
  const ref = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(0);
  const [travelled, setTravelled] = useState(false);

  // One orchestrated moment: a unit travels the path the first time the diagram is seen.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      setTravelled(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        el.classList.add("is-travelling");
        window.setTimeout(() => setTravelled(true), TRAVEL_MS);
      },
      { threshold: 0.45 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const current = STATIONS[selected];

  return (
    <div
      ref={ref}
      className={`chain${travelled ? " has-travelled" : ""}`}
      style={{ "--travel-ms": `${TRAVEL_MS}ms` } as React.CSSProperties}
    >
      <ol className="chain-track">
        {STATIONS.map((s, i) => (
          <li
            key={s.id}
            className={`chain-station${i === selected ? " is-selected" : ""}`}
            style={{ "--i": i } as React.CSSProperties}
          >
            <button
              type="button"
              className="chain-stop"
              aria-pressed={i === selected}
              aria-controls="chain-panel"
              onClick={() => setSelected(i)}
              onMouseEnter={() => setSelected(i)}
              onFocus={() => setSelected(i)}
            >
              <span className="chain-node" aria-hidden="true" />
              <span className="chain-place">{s.place}</span>
              <span className="chain-module">{s.module}</span>
            </button>
            <div className="chain-inline">
              <p>{s.detail}</p>
              <p className="work-proof">{s.proof}</p>
            </div>
          </li>
        ))}
        <span className="chain-unit" aria-hidden="true" />
      </ol>

      <div className="chain-return" aria-hidden="true">
        <svg className="chain-loop-arc" viewBox="0 0 1000 40" preserveAspectRatio="none">
          <path d="M990 2 C 990 34, 960 36, 900 36 L 100 36 C 40 36, 10 34, 10 2" />
          <path className="chain-loop-head" d="M3 12 L10 2 L17 12" />
        </svg>
        <span>Sales velocity and lead time pick the next order</span>
      </div>

      <div id="chain-panel" className="chain-panel" aria-live="polite">
        <div>
          <p className="chain-panel-place">{current.place}</p>
          <h3>{current.module}</h3>
        </div>
        <div>
          <p>{current.detail}</p>
          <p className="work-proof">{current.proof}</p>
        </div>
      </div>

      <div className="chain-loop">
        <p>
          <strong>Every morning the loop closes.</strong> Sales velocity and lead time, about 25 days by
          air and 60 by sea, decide what to reorder and when. Then the alerts go out: a card statement
          closing, an order about to land, a product running out in FULL.
        </p>
        <p className="work-proof">840 alerts sent since June 2026</p>
      </div>
    </div>
  );
}
