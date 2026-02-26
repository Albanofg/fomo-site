import Reveal from "@/components/ui/Reveal";
import SectionTag from "@/components/ui/SectionTag";
import { CER_CHAIN_FEATURES, FOMOG_CHAIN_FEATURES } from "@/data/content";

export default function Architecture() {
  return (
    <section id="architecture" className="py-32 relative">
      <div className="max-w-[1280px] mx-auto px-8">
        <Reveal>
          <SectionTag>01 // Architecture</SectionTag>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] text-white tracking-[0.02em] mb-4 leading-none">
            Dual Chain
            <br />
            Architecture
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-text-dim max-w-[600px] mb-16 text-base">
            Two chains. Two purposes. Obligation state management separated from
            economic security. No compromise.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Reveal delay={0.2}>
            <div className="bg-surface border border-border border-t-[3px] border-t-accent p-10 relative overflow-hidden transition-[border-color,transform] duration-300 hover:border-accent hover:-translate-y-1">
              <div className="w-12 h-12 border-2 border-accent flex items-center justify-center font-display text-[1.2rem] text-accent mb-6">
                CER
              </div>
              <h3 className="font-display text-[1.8rem] text-white tracking-[0.05em] mb-3">
                FOMO CER Chain
              </h3>
              <p className="text-text-dim text-[0.9rem] mb-6">
                Built on Cosmos SDK. Hosts obligation records and the
                deterministic netting epoch engine. No fungible tokens. No
                oracles. No custody.
              </p>
              <ul className="list-none flex flex-col gap-2">
                {CER_CHAIN_FEATURES.map((f) => (
                  <li
                    key={f}
                    className="font-mono text-[0.72rem] text-text flex gap-2"
                  >
                    <span className="text-accent">&#9656;</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="bg-surface border border-border border-t-[3px] border-t-accent2 p-10 relative overflow-hidden transition-[border-color,transform] duration-300 hover:border-accent2 hover:-translate-y-1">
              <div className="w-12 h-12 border-2 border-accent2 flex items-center justify-center font-display text-[1.2rem] text-accent2 mb-6">
                FG
              </div>
              <h3 className="font-display text-[1.8rem] text-white tracking-[0.05em] mb-3">
                FOMOG Chain
              </h3>
              <p className="text-text-dim text-[0.9rem] mb-6">
                Fully separate blockchain. Fixed 21M supply. Economic security
                through staking. Governs protocol upgrades. Tradeable on
                exchanges.
              </p>
              <ul className="list-none flex flex-col gap-2">
                {FOMOG_CHAIN_FEATURES.map((f) => (
                  <li
                    key={f}
                    className="font-mono text-[0.72rem] text-text flex gap-2"
                  >
                    <span className="text-accent2">&#9656;</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
