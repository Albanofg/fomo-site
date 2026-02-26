import Reveal from "@/components/ui/Reveal";
import SectionTag from "@/components/ui/SectionTag";
import { ISSUANCE, COMPARE } from "@/data/content";

export default function Tokenomics() {
  return (
    <section id="tokenomics" className="py-32 relative">
      <div className="max-w-[1280px] mx-auto px-8">
        <Reveal>
          <SectionTag>05 // Economics</SectionTag>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] text-white tracking-[0.02em] mb-4 leading-none">
            FOMOG Tokenomics
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-text-dim max-w-[600px] mb-16 text-base">
            Hard cap. Earned only. Demand from necessity, not speculation.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Supply circle */}
            <div className="relative h-[300px] flex items-center justify-center">
              <div className="w-[260px] h-[260px] border-[3px] border-accent2 rounded-full flex flex-col items-center justify-center relative">
                <div className="absolute -inset-[15px] border border-dashed border-[rgba(0,204,255,0.2)] rounded-full" />
                <div className="font-display text-[3.5rem] text-white leading-none">
                  21M
                </div>
                <div className="font-mono text-[0.7rem] text-accent2 tracking-[0.2em] uppercase">
                  FOMOG
                </div>
                <div className="font-mono text-[0.6rem] text-text-dim mt-2">
                  FIXED CAP &bull; NO INFLATION
                </div>
              </div>
            </div>

            {/* Issuance methods */}
            <div className="flex flex-col gap-5">
              {ISSUANCE.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 items-start px-5 py-4 bg-surface border-l-2 border-accent transition-[border-color,background] duration-300 hover:border-l-accent2 hover:bg-[rgba(0,204,255,0.03)]"
                >
                  <div className="font-display text-[1.5rem] text-accent leading-none shrink-0 w-6">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="text-[0.85rem] text-text">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.3} style={{ marginTop: "4rem" }}>
          <SectionTag>FOMOG vs Bitcoin</SectionTag>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse mt-8">
              <thead>
                <tr>
                  <th className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-left px-6 py-4 border-b-2 border-accent text-text-dim">
                    Attribute
                  </th>
                  <th className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-left px-6 py-4 border-b-2 border-accent text-accent">
                    Bitcoin
                  </th>
                  <th className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-left px-6 py-4 border-b-2 border-accent2 text-accent2">
                    FOMOG
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row) => (
                  <tr
                    key={row.attr}
                    className="hover:[&>td]:bg-[rgba(0,255,170,0.02)]"
                  >
                    <td className="px-6 py-4 border-b border-border text-[0.85rem] align-top transition-colors duration-300 font-mono text-[0.75rem] text-text-dim w-1/4">
                      {row.attr}
                    </td>
                    <td className="px-6 py-4 border-b border-border text-[0.85rem] align-top transition-colors duration-300">
                      {row.btc}
                    </td>
                    <td className="px-6 py-4 border-b border-border text-[0.85rem] align-top transition-colors duration-300">
                      {row.fomog}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
