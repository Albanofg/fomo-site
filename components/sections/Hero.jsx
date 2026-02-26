"use client";

import { useState, useEffect, useCallback } from "react";
import { HERO_STATS } from "@/data/content";

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    setMousePos({
      x: (e.clientX / window.innerWidth - 0.5) * 30,
      y: (e.clientY / window.innerHeight - 0.5) * 30,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden pt-32 pb-20">
      <div
        className="absolute top-[20%] -right-[10%] w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(0,255,170,0.08)_0%,transparent_70%)] z-[1] animate-[pulse_4s_ease-in-out_infinite] transition-transform duration-100 ease-out"
        style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
      />

      <div className="max-w-[1280px] mx-auto px-8">
        <div className="relative z-[2] max-w-[900px]">
          <div className="font-mono text-[0.7rem] tracking-[0.3em] text-accent uppercase mb-6 flex items-center gap-3 animate-[fadeSlideUp_0.8s_0.2s_both]">
            <span className="w-10 h-px bg-accent inline-block" />
            Decentralized Clearing Protocol
          </div>

          <h1 className="font-display text-[clamp(4rem,12vw,10rem)] leading-[0.9] text-white tracking-[0.02em] mb-6 cursor-default animate-[fadeSlideUp_0.8s_0.4s_both]">
            COMPRESS
            <br />
            <span className="[-webkit-text-stroke:2px_var(--accent)] text-transparent">
              LIQUIDITY.
            </span>
            <br />
            NET EVERYTHING.
          </h1>

          <p className="text-[clamp(0.95rem,2vw,1.35rem)] text-text max-w-[55ch] mb-10 leading-[1.35] animate-[fadeSlideUp_0.8s_0.6s_both]">
            FOMO Association is a Verein based in Zug, Switzerland. We are the
            stewards of a cryptographically enforced obligation network enabling
            issuance, control, multilateral netting, &amp; arbitration-backed
            enforcement of controllable electronic records &mdash; reducing gross
            settlement exposure &amp; liquidity needs without asset custody or
            transfer.
          </p>

          <div className="flex gap-12 flex-wrap mb-4 animate-[fadeSlideUp_0.8s_0.8s_both]">
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className="border-l-2 border-accent pl-4">
                <div className="font-display text-[2.5rem] text-white leading-none">
                  {stat.num}
                </div>
                <div className="font-mono text-[0.65rem] text-text-dim uppercase tracking-[0.15em]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
