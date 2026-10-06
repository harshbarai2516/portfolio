"use client";

import { useState } from "react";
import type { ContactData, Profile } from "@/types";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import MagneticLink from "@/components/ui/MagneticLink";
import { useLocalTime } from "@/hooks/useLocalTime";
import ContactForm from "./ContactForm";

type Props = { profile: Profile; contact: ContactData };

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

  return (
    <Section id="contact" num="05" title="Contact">
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
              ★ Stop the press ★
            </p>
            <h3 className="mt-4 text-5xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl">
              {contact.headline}
            </h3>
            <p className="mt-6 text-lg leading-relaxed text-ink/80">{contact.blurb}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Direct line
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-1 block break-all text-xl font-bold underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-accent sm:text-2xl"
            >
              {profile.email}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="mt-4 rounded-full border-2 border-ink px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors hover:bg-ink hover:text-paper"
            >
              {copied ? "Copied ✓" : "Copy email"}
            </button>

            <dl className="mt-8 divide-y divide-ink/15 border-y border-ink/15">
              <div className="flex justify-between gap-4 py-3">
                <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                  Local time
                </dt>
                <dd className="font-bold">
                  {profile.location} · {time}
                </dd>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                  Status
                </dt>
                <dd className="flex items-center gap-2 font-bold">
                  {profile.availability.open && (
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                    </span>
                  )}
                  {profile.availability.label}
                </dd>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                  Reply
                </dt>
                <dd className="text-right font-bold">{contact.responseTime}</dd>
              </div>
            </dl>

            <ul className="mt-6 flex flex-wrap gap-3">
              {profile.socials
                .filter((s) => s.href)
                .map((s) => (
                  <li key={s.label}>
                    <MagneticLink
                      href={s.href}
                      className="inline-flex items-center gap-2 border-2 border-ink px-5 py-3 font-mono text-xs uppercase tracking-widest transition-colors hover:bg-ink hover:text-paper"
                    >
                      {s.label} ↗
                    </MagneticLink>
                  </li>
                ))}
            </ul>
          </Reveal>
        </div>

        {/* <Reveal className="lg:col-span-7" delay={0.15}>
          <ContactForm to={profile.email} topics={contact.topics} />
        </Reveal> */}
      </div>

      {/* colophon */}
      <footer className="mt-24 flex flex-wrap items-center justify-between gap-4 border-t-2 border-ink pt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
        <span>
          © {new Date().getFullYear()} {profile.name} · Printed in {profile.location}
        </span>
        <span>Set in Playfair Display &amp; JetBrains Mono</span>
        <a href="#top" className="text-ink transition-colors hover:text-accent">
          Back to top ↑
        </a>
      </footer>
    </Section>
  );
}