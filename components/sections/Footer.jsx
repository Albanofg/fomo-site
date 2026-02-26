export default function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="max-w-[1280px] mx-auto px-8 flex justify-between items-center flex-wrap gap-4">
        <div className="font-display text-[1.5rem] text-accent tracking-[0.1em]">
          FOMO
        </div>
        <div className="font-mono text-[0.65rem] text-text-dim tracking-[0.1em]">
          Decentralized Clearing Protocol &mdash; No custody. No oracles. Net
          everything.
        </div>
      </div>
    </footer>
  );
}
