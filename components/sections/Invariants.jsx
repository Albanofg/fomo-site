"use client";

import { useState, useCallback } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionTag from "@/components/ui/SectionTag";
import { INVARIANTS } from "@/data/content";

const COLS = 3;

function getGlow(hoveredIdx, idx) {
  if (hoveredIdx === null) return undefined;

  const rowH = Math.floor(hoveredIdx / COLS);
  const colH = hoveredIdx % COLS;
  const rowI = Math.floor(idx / COLS);
  const colI = idx % COLS;

  // Manhattan distance on the grid
  const dist = Math.abs(rowH - rowI) + Math.abs(colH - colI);

  if (dist === 0) return "rgba(0,255,170,0.10)"; // hovered card
  if (dist === 1) return "rgba(0,255,170,0.03)"; // direct neighbor only
  return undefined;
}

export default function Invariants() {
  const [hovered, setHovered] = useState(null);

  const onEnter = useCallback((i) => setHovered(i), []);
  const onLeave = useCallback(() => setHovered(null), []);

  return (
    <section id="invariants" className="py-32 relative">
      <div className="max-w-[1280px] mx-auto px-8">
        <Reveal>
          <SectionTag>03 // Protocol Law</SectionTag>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] text-white tracking-[0.02em] mb-4 leading-none">
            Invariants
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-text-dim max-w-[600px] mb-16 text-base">
            Unbreakable rules enforced at the protocol level. No exceptions. No
            overrides.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-border border border-border">
            {INVARIANTS.map((inv, i) => (
              <div
                key={inv.num}
                className="bg-bg p-8 transition-[background-color] duration-300"
                style={{ backgroundColor: getGlow(hovered, i) }}
                onMouseEnter={() => onEnter(i)}
                onMouseLeave={onLeave}
              >
                <div className="font-display text-[2.5rem] text-[rgba(0,255,170,0.15)] leading-none mb-3">
                  {inv.num}
                </div>
                <h4 className="font-body font-bold text-[0.85rem] text-white uppercase tracking-[0.05em] mb-2">
                  {inv.title}
                </h4>
                <p className="text-[0.8rem] text-text-dim leading-[1.5]">
                  {inv.desc}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
