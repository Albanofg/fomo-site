import Reveal from "@/components/ui/Reveal";

export default function CTA() {
  return (
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
            <a
              href="#"
              className="font-mono text-base tracking-[0.15em] uppercase py-[1.1rem] px-14 bg-accent text-bg font-bold border-none cursor-pointer transition-all duration-300 no-underline"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
              }}
            >
              Request Membership &rarr;
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
