import { Fragment } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionTag from "@/components/ui/SectionTag";
import FlowStep from "@/components/ui/FlowStep";
import FlowArrow from "@/components/ui/FlowArrow";
import { CER_STEPS, EPOCH_STEPS } from "@/data/content";

export default function Lifecycle() {
  return (
    <section id="lifecycle" className="py-32 relative bg-bg2">
      <div className="max-w-[1280px] mx-auto px-8">
        <Reveal>
          <SectionTag>04 // Process</SectionTag>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] text-white tracking-[0.02em] mb-4 leading-none">
            CER Lifecycle
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-text-dim max-w-[600px] mb-16 text-base">
            From creation to satisfaction. Every obligation follows the same
            deterministic path.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="flex items-center overflow-x-auto py-8">
            {CER_STEPS.map((step, i) => (
              <Fragment key={step}>
                <FlowStep num={i + 1} label={step} />
                {i < CER_STEPS.length - 1 && <FlowArrow />}
              </Fragment>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <SectionTag>Netting Epoch Flow</SectionTag>
        </Reveal>
        <Reveal delay={0.35}>
          <div className="flex items-center overflow-x-auto py-8 mt-6">
            {EPOCH_STEPS.map((step, i) => (
              <Fragment key={step}>
                <FlowStep
                  num={i + 1}
                  label={step}
                  accent="var(--accent2)"
                />
                {i < EPOCH_STEPS.length - 1 && (
                  <FlowArrow color="var(--accent2)" />
                )}
              </Fragment>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
