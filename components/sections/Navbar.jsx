"use client";

import { useState } from "react";
import { SECTIONS } from "@/data/content";
import NavLink from "@/components/ui/NavLink";

export default function Navbar() {
  const [mobileNav, setMobileNav] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileNav(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[1000] px-8 py-4 flex justify-between items-center bg-[rgba(6,8,12,0.85)] backdrop-blur-[20px] border-b border-border">
      <a
        href="#"
        className="font-display text-[2rem] tracking-[0.15em] text-accent no-underline relative cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        FOMO
        <span className="font-mono text-[0.5rem] text-text-dim absolute -bottom-0.5 -right-[65px] tracking-[0.2em]">
          {"//"}  PROTOCOL
        </span>
      </a>

      <button
        className="hidden max-nav:flex bg-transparent border border-border text-accent text-[1.2rem] px-[0.6rem] py-[0.4rem] cursor-pointer font-mono"
        onClick={() => setMobileNav(!mobileNav)}
      >
        &#9776;
      </button>

      <ul
        className={`flex gap-10 list-none nav:flex max-nav:hidden ${
          mobileNav
            ? "!flex !flex-col !absolute !top-full !left-0 !right-0 !gap-2 !px-8 !py-4 !bg-[rgba(6,8,12,0.95)] !border-b !border-border"
            : ""
        }`}
      >
        {SECTIONS.map((sec) => (
          <li key={sec.id}>
            <NavLink
              href={`#${sec.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(sec.id);
              }}
            >
              {sec.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
