export default function SectionTag({ children }) {
  return (
    <div className="font-mono text-[0.65rem] tracking-[0.3em] text-accent uppercase mb-4 flex items-center gap-3">
      <span className="w-[30px] h-px bg-accent inline-block" />
      {children}
    </div>
  );
}
