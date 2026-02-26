export default function FlowStep({ num, label, accent = "var(--accent)" }) {
  return (
    <div className="flex flex-col items-center text-center min-w-[140px] shrink-0">
      <div
        className="w-14 h-14 border-2 flex items-center justify-center font-display text-[1.2rem] mb-3 bg-bg2"
        style={{
          borderColor: accent,
          color: accent,
          clipPath:
            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        }}
      >
        {String(num).padStart(2, "0")}
      </div>
      <div className="font-mono text-[0.65rem] text-text max-w-[100px] uppercase tracking-[0.05em]">
        {label}
      </div>
    </div>
  );
}
