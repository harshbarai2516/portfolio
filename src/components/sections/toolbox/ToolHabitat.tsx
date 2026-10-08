"use client";

import { useState } from "react";
import type { CreatureKind, ToolGroup } from "@/types";
import { formatDepth } from "@/lib/zones";
import Reveal from "@/components/ui/Reveal";
import Creature from "./Creatures";

type Props = { group: ToolGroup; index: number };

const fallback: CreatureKind[] = ["lanternfish", "anglerfish", "jellyfish", "octopus"];

const species: Record<CreatureKind, string> = {
  lanternfish: "Lanternfish",
  anglerfish: "Anglerfish",
  jellyfish: "Jellyfish",
  octopus: "Octopus",
};

// the soft light behind each creature
const halo: Record<CreatureKind, string> = {
  lanternfish: "rgba(95,242,224,0.22)",
  anglerfish: "rgba(255,226,120,0.16)",
  jellyfish: "rgba(143,107,255,0.30)",
  octopus: "rgba(255,122,89,0.22)",
};

// One habitat: a creature on one side, the tools it "carries" as floating orbs
// on the other. Hovering, focusing or tapping an orb wakes the creature up and
// shows why that tool is in the kit.
export default function ToolHabitat({ group, index }: Props) {
  const kind = group.creature ?? fallback[index % fallback.length];
  const flip = index % 2 === 1;
  const [active, setActive] = useState<number | null>(null);
  const tool = active !== null ? group.tools[active] : null;
  const note = tool?.note ?? null;

  // The creature drifts toward the pointer, like it is curious about you.
  // Handled with CSS variables so React never re-renders on mouse move.
  function onMove(e: React.PointerEvent<HTMLElement>) {
    if (e.pointerType === "touch") return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    e.currentTarget.style.setProperty("--mx", x.toFixed(3));
    e.currentTarget.style.setProperty("--my", y.toFixed(3));
  }
  function onLeave(e: React.PointerEvent<HTMLElement>) {
    e.currentTarget.style.setProperty("--mx", "0");
    e.currentTarget.style.setProperty("--my", "0");
  }

  return (
    <Reveal>
      <article
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="grid items-center gap-8 border-t border-white/20 py-10 lg:grid-cols-12 lg:gap-12 lg:py-14"
      >
        {/* the creature */}
        <div className={`relative min-w-0 lg:col-span-4 ${flip ? "lg:order-2" : ""}`}>
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{ background: halo[kind] }}
          />
          {active !== null && (
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-[44%] h-36 w-36 -translate-x-1/2 -translate-y-1/2"
            >
              <span className="sonar-ring" />
              <span className="sonar-ring" style={{ animationDelay: "-1.6s" }} />
            </div>
          )}
          <div
            style={{
              transform:
                "translate3d(calc(var(--mx, 0) * 16px), calc(var(--my, 0) * 10px), 0)",
              transition: "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <Creature
              kind={kind}
              excited={active !== null}
              className="relative mx-auto h-56 w-full sm:h-64"
            />
          </div>
          <p className="relative mt-3 text-center font-mono text-[11px] uppercase tracking-[0.25em] text-white/75">
            {group.depth !== undefined ? `${formatDepth(group.depth)} · ` : ""}
            {species[kind]}
          </p>
        </div>

        {/* the kit */}
        <div className={`min-w-0 lg:col-span-8 ${flip ? "lg:order-1" : ""}`}>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-glow">
            Habitat 0{index + 1}
          </p>
          <h3 className="mt-2 break-words text-4xl font-black uppercase tracking-tight sm:text-5xl">
            {group.title}
          </h3>
          <p className="mt-3 max-w-xl text-lg text-white/90">{group.blurb}</p>

          <ul className="mt-6 flex flex-wrap gap-3">
            {group.tools.map((tool, i) => (
              <li key={tool.name}>
                <button
                  type="button"
                  aria-pressed={active === i}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  onClick={() => setActive((a) => (a === i ? null : i))}
                  className={`orb inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-wider text-white transition-[background-color,border-color,box-shadow] duration-300 ${
                    active === i
                      ? "border-glow bg-glow/20 shadow-[0_0_28px_rgba(95,242,224,0.45)]"
                      : "border-white/30 bg-white/[0.08] hover:border-glow/70"
                  }`}
                  style={{
                    animationDelay: `-${(i * 0.9).toFixed(1)}s`,
                    animationDuration: `${4 + (i % 3)}s`,
                  }}
                >
                  <span
                    aria-hidden
                    className="h-2 w-2 rounded-full bg-glow"
                    style={{ boxShadow: "0 0 8px var(--glow)" }}
                  />
                  {tool.name}
                </button>
              </li>
            ))}
          </ul>

          <p
            aria-live="polite"
            className="mt-5 flex min-h-[3.75rem] min-w-0 items-center gap-4 rounded-xl border border-white/15 bg-black/25 px-4 py-3 font-mono text-xs uppercase leading-relaxed tracking-wider"
          >
            {tool ? (
              <>
                <span className="shrink-0 border-r border-white/20 pr-4 text-[10px] tracking-[0.2em] text-white/60">
                  Specimen
                  <br />
                  <span className="text-sm font-black text-white">
                    {String((active ?? 0) + 1).padStart(2, "0")}/
                    {String(group.tools.length).padStart(2, "0")}
                  </span>
                </span>
                <span className="min-w-0 break-words">
                  <span className="font-black text-white">{tool.name}</span>
                  <span className="text-glow"> → {note}</span>
                </span>
              </>
            ) : (
              <span className="text-white/60">
                Touch a tool to wake the {species[kind].toLowerCase()}.
              </span>
            )}
          </p>
        </div>
      </article>
    </Reveal>
  );
}
