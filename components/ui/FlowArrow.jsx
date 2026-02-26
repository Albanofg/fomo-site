export default function FlowArrow({ color = "var(--accent)" }) {
  return (
    <div
      className="w-10 h-0.5 shrink-0 relative -mt-6"
      style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
    >
      <span
        className="absolute -right-1 -top-2 text-[0.7rem]"
        style={{ color }}
      >
        &#9656;
      </span>
    </div>
  );
}
