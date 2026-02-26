export default function NavLink({ href, children, onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="group no-underline font-mono text-[0.75rem] tracking-[0.12em] uppercase relative inline-block text-text-dim hover:text-accent transition-colors duration-[350ms]"
    >
      {children}
      <span className="absolute left-0 -bottom-1 h-px bg-accent w-0 group-hover:w-full transition-[width] duration-[350ms]" />
    </a>
  );
}
