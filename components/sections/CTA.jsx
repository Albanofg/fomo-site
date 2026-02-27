"use client";

import { useState, useCallback } from "react";
import Reveal from "@/components/ui/Reveal";
import MembershipModal from "@/components/ui/MembershipModal";

export default function CTA() {
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = useCallback(() => setModalOpen(false), []);

  return (
    <>
      <section className="py-40 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,170,0.06),transparent_70%)]" />
        <div className="max-w-[1280px] mx-auto px-8 relative z-[2] text-center">
          <Reveal>
            <h2 className="font-display text-[clamp(3rem,8vw,7rem)] text-white leading-[0.95] mb-6">
              SETTLE LESS.
              <br />
              NET MORE.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-base text-text-dim max-w-[500px] mx-auto mb-12">
              Liquidity compression through deterministic obligation netting.
              Economically superior to existing settlement rails at global scale.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex gap-6 justify-center flex-wrap">
              <button
                onClick={() => setModalOpen(true)}
                className="group relative font-mono text-xs md:text-base tracking-[0.15em] uppercase py-[1.1rem] px-8 md:px-14 bg-[#00ffaa] text-bg font-bold border-none cursor-pointer transition-all duration-[350ms] hover:bg-[#00b276] hover:text-[#eaf2ff] hover:-translate-y-[2px] hover:shadow-[0_0_20px_rgba(0,255,170,0.3)]"
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
                }}
              >
                Request Membership &rarr;
                <span className="absolute left-0 bottom-0 h-[2px] bg-[#eaf2ff] w-0 group-hover:w-full transition-[width] duration-[350ms]" />
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      <MembershipModal open={modalOpen} onClose={closeModal} />
    </>
  );
}
