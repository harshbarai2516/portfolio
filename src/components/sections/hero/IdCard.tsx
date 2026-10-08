"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Profile } from "@/types";
import { getInitials } from "@/lib/utils";
import { easeOutExpo } from "@/lib/motion";
import { useLocalTime } from "@/hooks/useLocalTime";

type Props = { profile: Profile };

const faceStyle: React.CSSProperties = {
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
};

const stop = (e: React.MouseEvent) => e.stopPropagation();

export default function IdCard({ profile }: Props) {
  const [flipped, setFlipped] = useState(false);
  const [copied, setCopied] = useState(false);
  const time = useLocalTime(profile.timezone);

  // mouse tilt
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 120, damping: 16 });
  const my = useSpring(rawY, { stiffness: 120, damping: 16 });
  const rotateX = useTransform(my, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mx, [-0.5, 0.5], [-10, 10]);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - r.left) / r.width - 0.5);
    rawY.set((e.clientY - r.top) / r.height - 0.5);
  }

  function onLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard blocked by the browser: ignore
    }
  }

  return (
    <div className="flex flex-col items-center">
      {/* drops in on load */}
      <motion.div
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 70, damping: 11, delay: 0.5 }}
      >
        {/* gentle swing, like a lanyard */}
        <motion.div
          className="flex origin-top flex-col items-center"
          animate={{ rotate: [-1.5, 1.5] }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          <div className="h-14 w-3 bg-accent" />
          <div className="h-3 w-8 rounded-t-md bg-ink" />

          <motion.div
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{ rotateX, rotateY, transformPerspective: 1000 }}
            className="w-[19rem] sm:w-[21rem]"
          >
            <motion.div
              onClick={() => setFlipped((f) => !f)}
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.7, ease: easeOutExpo }}
              style={{ transformStyle: "preserve-3d", transformPerspective: 1200 }}
              className="relative grid cursor-pointer"
            >
              {/* FRONT */}
              <div
                style={faceStyle}
                className="col-start-1 row-start-1 flex h-[31rem] flex-col overflow-hidden rounded-2xl border-2 border-ink bg-ink text-paper shadow-[10px_10px_0_0_var(--accent)]"
              >
                <div className="flex items-center justify-between bg-accent px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.2em]">
                  <span>Dive Pass</span>
                  <span>Cert. 001</span>
                </div>

                <div className="flex flex-1 flex-col px-6 pb-5 pt-4">
                  <div className="mx-auto h-2 w-16 rounded-full bg-paper/25" />

                  <div className="mt-5 flex items-center gap-4">
                    <div className="relative grid h-20 w-20 shrink-0 place-items-center">
                      <motion.span
                        aria-hidden
                        className="absolute inset-0 rounded-full border-2 border-dashed border-accent"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                      />
                      <span className="grid h-16 w-16 place-items-center rounded-full bg-paper text-2xl font-black text-ink">
                        {getInitials(profile.name)}
                      </span>
                    </div>
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60">
                        Education
                      </p>
                      <p className="text-sm font-bold">{profile.education}</p>
                    </div>
                  </div>

                  <h3 className="mt-6 text-3xl font-black uppercase leading-none tracking-tight">
                    {profile.name}
                  </h3>
                  <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-accent">
                    {profile.role}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {profile.stack.map((s) => (
                      <li
                        key={s}
                        className="rounded-full border border-paper/30 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-paper/90"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <div
                      aria-hidden
                      className="h-12 w-full"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(90deg, var(--paper) 0 2px, transparent 2px 5px, var(--paper) 5px 6px, transparent 6px 8px, var(--paper) 8px 11px, transparent 11px 14px)",
                      }}
                    />
                    <div className="mt-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-paper/60">
                      <span>
                        {profile.availability.open ? "Open to work" : "Currently busy"}
                      </span>
                      <span>Tap to flip ↻</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* BACK */}
              <div
                style={{ ...faceStyle, transform: "rotateY(180deg)" }}
                className="col-start-1 row-start-1 flex h-[31rem] flex-col overflow-hidden rounded-2xl border-2 border-ink bg-paper text-ink shadow-[10px_10px_0_0_var(--ink)]"
              >
                <div className="flex items-center justify-between bg-ink px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-paper">
                  <span>Contact</span>
                  <span>
                    {profile.location} · {time}
                  </span>
                </div>

                <div className="flex flex-1 flex-col px-6 py-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                    Drop a line
                  </p>
                  <a
                    href={`mailto:${profile.email}`}
                    onClick={stop}
                    className="mt-1 break-all text-xl font-bold underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"
                  >
                    {profile.email}
                  </a>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      copyEmail();
                    }}
                    className="mt-4 self-start rounded-full border-2 border-ink px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors hover:bg-ink hover:text-paper"
                  >
                    {copied ? "Copied ✓" : "Copy email"}
                  </button>

                  <ul className="mt-6 divide-y divide-ink/15 border-y border-ink/15">
                    {profile.socials
                      .filter((s) => s.href)
                      .map((s) => (
                        <li key={s.label}>
                          <a
                            href={s.href}
                            target="_blank"
                            rel="noreferrer"
                            onClick={stop}
                            className="group flex items-center justify-between py-3 font-bold transition-colors hover:text-accent"
                          >
                            {s.label}
                            <span className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                              ↗
                            </span>
                          </a>
                        </li>
                      ))}
                  </ul>

                  <p className="mt-auto font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                    Tap to flip back ↻
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* keyboard-friendly flip control */}
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        aria-pressed={flipped}
        className="mt-8 font-mono text-xs uppercase tracking-widest underline-offset-4 hover:text-accent hover:underline"
      >
        {flipped ? "Show front" : "Flip card ↻"}
      </button>
    </div>
  );
}