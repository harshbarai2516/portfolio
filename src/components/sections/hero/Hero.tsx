"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import type { IssueMeta, Profile } from "@/types";
import { easeOutExpo } from "@/lib/motion";
import { useLocalTime } from "@/hooks/useLocalTime";
import RevealText from "@/components/ui/RevealText";
import RotatingWord from "@/components/ui/RotatingWord";
import MagneticLink from "@/components/ui/MagneticLink";
import IdCard from "./IdCard";
import HeroBackdrop from "./HeroBackdrop";

type Props = { profile: Profile; issue: IssueMeta };

export default function Hero({ profile, issue }: Props) {
  const time = useLocalTime(profile.timezone);
  const [first, ...rest] = profile.name.split(" ");
  const last = rest.join(" ");
  const MagneticLinkWithChildren = MagneticLink as unknown as React.FC<
    React.AnchorHTMLAttributes<HTMLAnchorElement> & {
      href: string;
      className?: string;
      children?: React.ReactNode;
    }
  >;

  // cursor glint, like sunlight catching the water
  const gx = useMotionValue(600);
  const gy = useMotionValue(300);
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${gx}px ${gy}px, rgba(255,255,255,0.6), transparent 65%)`;

  function onMove(e: React.MouseEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    gx.set(e.clientX - r.left);
    gy.set(e.clientY - r.top);
  }

  return (
    <section
      id="top"
      data-thread-start
      onMouseMove={onMove}
      className="relative isolate overflow-hidden"
    >
      <HeroBackdrop />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: spotlight }}
      />

      <div className="mx-auto grid min-h-svh max-w-6xl items-center gap-14 px-6 pb-36 pt-32 lg:grid-cols-12">
        {/* LEFT: copy */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-widest sm:text-xs"
          >
            <span className="flex items-center gap-2">
              {profile.availability.open && (
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
              )}
              {profile.availability.label}
            </span>
            <span className="text-muted">
              Dive log {issue.vol}.{issue.no} · {issue.date}
            </span>
            <span className="text-muted">Local {time}</span>
          </motion.div>

          <h1
            aria-label={profile.name}
            className="mt-6 flex flex-wrap gap-x-[0.28em] text-[clamp(2.75rem,6.5vw,5.5rem)] font-black uppercase leading-[0.95] tracking-tight"
          >
            <RevealText text={first} />
            <RevealText text={last} delay={0.25} className="text-outline" />
          </h1>

          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5, ease: easeOutExpo }}
            className="mt-6 inline-block -rotate-2 bg-accent px-3 py-1 font-mono text-xs uppercase tracking-widest text-paper"
          >
            {profile.role}
          </motion.span>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7, ease: easeOutExpo }}
            className="mt-6 text-3xl font-bold leading-tight sm:text-5xl"
          >
            {profile.tagline.lead}{" "}
            <RotatingWord
              words={profile.tagline.words}
              className="italic text-accent"
            />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.7, ease: easeOutExpo }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-ink/80"
          >
            {profile.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7, ease: easeOutExpo }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <MagneticLinkWithChildren
              href="#projects"
              className="group flex items-center gap-3 bg-ink px-7 py-4 font-mono text-sm uppercase tracking-widest text-paper transition-colors hover:bg-accent"
            >
              See my work
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </MagneticLinkWithChildren>
            <MagneticLinkWithChildren
              href="#contact"
              className="border-2 border-ink px-7 py-4 font-mono text-sm uppercase tracking-widest transition-colors hover:bg-ink hover:text-paper"
            >
              Let&apos;s talk
            </MagneticLinkWithChildren>
          </motion.div>
        </div>

        {/* RIGHT: ID card + badge */}
        {/* RIGHT: ID card */}
        <div className="lg:col-span-5">
          <IdCard profile={profile} />
          
        </div>
      </div>
    </section>
  );
}