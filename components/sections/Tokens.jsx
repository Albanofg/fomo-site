import Reveal from "@/components/ui/Reveal";
import SectionTag from "@/components/ui/SectionTag";
import { CER_TOKEN_PROPS, FOMOG_TOKEN_PROPS } from "@/data/content";

export default function Tokens() {
  return (
    <section id="tokens" className="py-32 relative bg-bg2">
      <div className="max-w-[1280px] mx-auto px-8">
        <Reveal>
          <SectionTag>02 // Token Roles</SectionTag>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] text-white tracking-[0.02em] mb-4 leading-none">
            Two Tokens.
            <br />
            Zero Confusion.
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-text-dim max-w-[600px] mb-16 text-base">
            CER records who owes whom. FOMOG secures the system. They never
            cross purposes.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Reveal delay={0.2}>
            <div className="p-12 bg-linear-to-br from-[rgba(0,255,170,0.05)] to-transparent border border-[rgba(0,255,170,0.15)]">
              <div className="font-display text-[4rem] leading-none mb-1 text-accent">
                CER
              </div>
              <div className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-text-dim mb-6 pb-6 border-b border-border">
                Controllable Electronic Record
              </div>
              <div className="flex flex-col gap-3">
                {CER_TOKEN_PROPS.map(([icon, text]) => (
                  <div key={text} className="flex items-center gap-3 text-[0.85rem]">
                    <span
                      className="w-5 shrink-0 text-[0.7rem]"
                      style={{
                        color:
                          icon === "\u2715"
                            ? "var(--accent3)"
                            : "var(--accent)",
                      }}
                    >
                      {icon}
                    </span>
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="p-12 bg-linear-to-br from-[rgba(0,204,255,0.05)] to-transparent border border-[rgba(0,204,255,0.15)]">
              <div className="font-display text-[4rem] leading-none mb-1 text-accent2">
                FOMOG
              </div>
              <div className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-text-dim mb-6 pb-6 border-b border-border">
                Governance & Economic Security
              </div>
              <div className="flex flex-col gap-3">
                {FOMOG_TOKEN_PROPS.map(([icon, text]) => (
                  <div key={text} className="flex items-center gap-3 text-[0.85rem]">
                    <span className="w-5 shrink-0 text-[0.7rem] text-accent">
                      {icon}
                    </span>
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
