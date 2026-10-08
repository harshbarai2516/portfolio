"use client";

import { useState } from "react";
import type { ContactData, Profile } from "@/types";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import MagneticLink from "@/components/ui/MagneticLink";
import { useLocalTime } from "@/hooks/useLocalTime";
import Chest from "./Chest";
import ShipWreck from "./ShipWreck";

type Props = { profile: Profile; contact: ContactData };

const facts = [
  { k: "Zone", v: "Hadal" },
  { k: "Sunlight", v: "None" },
  { k: "Pressure", v: "> 1,000 bar" },
];

export default function ContactSection({ profile, contact }: Props) {
  const time = useLocalTime(profile.timezone);
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard blocked by the browser: ignore
    }
  }

  const socials = profile.socials.filter((s) => s.href);

  return (
    <Section
      id="contact"
      num="05"
      title="Contact"
      zone="hadal"
      from={4000}
      to={10935}
      flush
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        {/* LEFT: the pitch */}
        <div className="min-w-0 lg:col-span-6">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-glow">
              ◎ Mariana Trench · Challenger Deep
            </p>
            <h3 className="mt-4 break-words text-4xl font-black uppercase leading-[0.98] tracking-tight sm:text-5xl lg:text-6xl">
              {contact.headline}
            </h3>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
              {contact.blurb}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-8 flex flex-wrap gap-2">
              {facts.map((f) => (
                <li
                  key={f.k}
                  className="rounded-full border border-white/20 bg-white/[0.05] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/75"
                >
                  {f.k} <span className="text-glow">· {f.v}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* RIGHT: the message in a bottle */}
        <Reveal className="min-w-0 lg:col-span-6" delay={0.15}>
          <div
            className="relative min-w-0 overflow-hidden rounded-3xl border border-white/25 p-6 sm:p-8"
            style={{
              background:
                "linear-gradient(160deg, rgba(10,58,90,0.62), rgba(2,16,30,0.78))",
              boxShadow: "0 0 60px rgba(95,242,224,0.10), inset 0 1px 0 rgba(255,255,255,0.12)",
              backdropFilter: "blur(6px)",
            }}
          >
            <p className="flex items-center gap-3 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-glow">
              <span aria-hidden className="relative inline-flex h-2.5 w-2.5">
                <span className="sonar-ring" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-glow" />
              </span>
              Message in a bottle
            </p>

            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
              Direct line
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-1 block text-xl font-bold leading-snug text-white underline decoration-glow decoration-2 underline-offset-4 transition-colors [overflow-wrap:anywhere] hover:text-glow sm:text-2xl"
            >
              {profile.email}
            </a>

            <div className="mt-5 flex flex-wrap gap-3">
              <MagneticLink
                href={`mailto:${profile.email}`}
                className="inline-flex items-center rounded-full bg-glow px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-[#04263d] transition-shadow hover:shadow-[0_0_28px_rgba(95,242,224,0.55)]"
              >
                Send a message →
              </MagneticLink>
              <button
                type="button"
                onClick={copyEmail}
                className="rounded-full border border-white/40 px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-white transition-colors hover:border-glow hover:text-glow"
              >
                {copied ? "Copied ✓" : "Copy email"}
              </button>
            </div>

            <dl className="mt-7 divide-y divide-white/15 border-y border-white/15 text-sm">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3">
                <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
                  Local time
                </dt>
                <dd className="min-w-0 font-bold">
                  {profile.location} · {time}
                </dd>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3">
                <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
                  Status
                </dt>
                <dd className="flex min-w-0 items-center gap-2 font-bold">
                  {profile.availability.open && (
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-glow opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-glow" />
                    </span>
                  )}
                  {profile.availability.label}
                </dd>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3">
                <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
                  Reply
                </dt>
                <dd className="min-w-0 font-bold">{contact.responseTime}</dd>
              </div>
            </dl>

            {socials.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-3">
                {socials.map((s) => (
                  <li key={s.label}>
                    <MagneticLink
                      href={s.href}
                      className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-white transition-colors hover:border-glow hover:text-glow"
                    >
                      {s.label} ↗
                    </MagneticLink>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Reveal>
      </div>

      {/*
        THE SEABED. The dive line lands on the chest ([data-thread-end]) and the
        chest opens on arrival. The scene is at least 48svh tall so the diver can
        actually travel all the way down to the chest at the bottom of the page.
      */}
      <div className="relative mt-20 flex min-h-[52svh] flex-col justify-between overflow-x-clip sm:mt-28">
        {/* trench walls */}
        <svg
          aria-hidden
          viewBox="0 0 1200 600"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-full w-full"
        >
          <defs>
            <linearGradient id="tr-wall" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#031a38" stopOpacity="0" />
              <stop offset="0.5" stopColor="#020d1a" stopOpacity="0.85" />
              <stop offset="1" stopColor="#01050c" />
            </linearGradient>
          </defs>
          <path
            d="M0 0 L130 0 C150 120 110 190 160 300 C200 390 150 470 190 600 L0 600 Z"
            fill="url(#tr-wall)"
          />
          <path
            d="M1200 0 L1070 0 C1050 130 1090 200 1040 310 C1000 400 1050 480 1010 600 L1200 600 Z"
            fill="url(#tr-wall)"
          />
          <g stroke="#0e2a3f" strokeOpacity="0.7" strokeWidth="1.5" fill="none">
            <path d="M20 120 C70 130 110 120 140 128" />
            <path d="M10 240 C60 252 120 238 158 250" />
            <path d="M30 380 C80 388 130 372 170 384" />
            <path d="M1180 140 C1130 150 1090 138 1062 146" />
            <path d="M1190 270 C1140 282 1086 266 1046 280" />
            <path d="M1170 410 C1120 420 1070 404 1030 416" />
          </g>
        </svg>

        {/* depth marker */}
        <p className="relative z-[2] mx-auto mt-2 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">
          ↓ 10,935 m · deepest point on Earth ↓
        </p>

        {/* the chest, where the line ends */}
        <div className="relative z-[2] mx-auto mt-6 w-44 sm:w-56">
          <div data-thread-end>
            <Chest className="block h-auto w-full" />
          </div>
        </div>

        {/* the wreck, half buried to one side */}
        <ShipWreck
          className="pointer-events-none absolute bottom-14 left-[-14%] z-[1] w-[min(86vw,560px)] opacity-90 sm:bottom-12 sm:left-[2%] xl:left-[6%]"
          style={{
            WebkitMaskImage:
              "linear-gradient(90deg, transparent, #000 14%, #000 86%, transparent)",
            maskImage:
              "linear-gradient(90deg, transparent, #000 14%, #000 86%, transparent)",
          }}
        />

        {/* colophon */}
        <footer className="relative z-[3] mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-white/15 py-5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
          <span className="min-w-0">
            © {new Date().getFullYear()} {profile.name} · Surfaced from {profile.location}
          </span>
          <a href="#top" className="text-white transition-colors hover:text-glow">
            Back to surface ↑
          </a>
        </footer>
      </div>
    </Section>
  );
}
