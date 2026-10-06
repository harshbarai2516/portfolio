"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { NavItem } from "@/types";
import { getInitials } from "@/lib/utils";

type Props = {
  name: string;
  items: NavItem[];
  cta: { label: string; href: string };
};

export default function Navbar({ name, items, cta }: Props) {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  // Highlight the link of the section currently on screen
  useEffect(() => {
    const ids = ["top", ...items.map((i) => i.href.slice(1))];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActive(e.target.id === "top" ? "" : `#${e.target.id}`);
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav className="mx-auto flex max-w-4xl items-center justify-between rounded-full border border-ink/15 bg-paper/80 p-2 shadow-[0_8px_30px_rgba(20,20,20,0.08)] backdrop-blur-md">
        <a
          href="#top"
          aria-label={`${name} - home`}
          className="flex items-center gap-2 pl-1"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full bg-ink font-mono text-xs font-bold text-paper">
            {getInitials(name)}
          </span>
          <span className="hidden font-mono text-xs uppercase tracking-widest sm:block">
            {name}
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {items.map((item) => {
            const isActive = active === item.href;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`relative block rounded-full px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${
                    isActive ? "text-paper" : "hover:text-accent"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-ink"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={cta.href}
            className="hidden rounded-full bg-accent px-5 py-2 font-mono text-xs uppercase tracking-widest text-paper transition-transform hover:scale-105 sm:block"
          >
            {cta.label}
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label="Toggle menu"
            className="rounded-full border border-ink/20 px-4 py-2 font-mono text-xs uppercase tracking-widest md:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mx-auto mt-2 max-w-4xl rounded-3xl border border-ink/15 bg-paper/95 p-4 backdrop-blur-md md:hidden"
          >
            {items.map((item) => (
              <li key={item.href} className="border-b border-ink/10">
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-mono text-sm uppercase tracking-widest"
                >
                  <span className="text-accent">§{item.num}</span> {item.label}
                </a>
              </li>
            ))}
            <li className="pt-3">
              <a
                href={cta.href}
                onClick={() => setOpen(false)}
                className="block rounded-full bg-accent py-3 text-center font-mono text-sm uppercase tracking-widest text-paper"
              >
                {cta.label}
              </a>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}