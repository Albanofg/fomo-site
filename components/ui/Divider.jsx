export default function Divider() {
  return (
    <div className="w-full h-px bg-linear-to-r from-transparent via-accent to-transparent relative overflow-hidden">
      <div className="absolute top-0 -left-full w-1/2 h-full bg-linear-to-r from-transparent via-accent2 to-transparent animate-[dividerSlide_3s_linear_infinite]" />
    </div>
  );
}
