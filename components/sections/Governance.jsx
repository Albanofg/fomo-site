import Reveal from "@/components/ui/Reveal";
import SectionTag from "@/components/ui/SectionTag";
import { GOV_CARDS } from "@/data/content";

export default function Governance() {
  return (
    <section id="governance" className="py-32 relative bg-bg2">
      <div className="max-w-[1280px] mx-auto px-8">
        <Reveal>
          <SectionTag>06 // Control</SectionTag>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] text-white tracking-[0.02em] mb-4 leading-none">
            Governance
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-text-dim max-w-[600px] mb-16 text-base">
            FOMOG holders govern the protocol. No government authority. No
            central shutdown switch.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {GOV_CARDS.map((card, i) => (
            <Reveal key={card.title} delay={0.2 + i * 0.05}>
              <div className="bg-bg border border-border p-8 transition-[border-color,transform] duration-300 hover:border-accent2 hover:-translate-y-[3px]">
                <div className="text-[1.5rem] mb-4 text-accent2">
                  {card.icon}
                </div>
                <h4 className="font-body font-bold text-white text-[0.95rem] mb-2">
                  {card.title}
                </h4>
                <p className="text-[0.8rem] text-text-dim">{card.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
