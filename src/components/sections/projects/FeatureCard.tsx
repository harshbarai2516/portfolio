import type { Project } from "@/types";
import ProjectVisual from "./ProjectVisual";

type Props = { project: Project; index: number; total: number };

// One "dive site". The card is opaque on purpose: when the next one slides over
// it, nothing may show through. ProjectStack handles the stacking motion.
export default function FeaturedCard({ project: p, index, total }: Props) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <article
      className="theme-deep overflow-hidden rounded-3xl border border-[#2f7fa8]/50 text-white"
      style={{
        background: "#061a35",
        boxShadow:
          "0 0 0 1px rgba(95,242,224,0.08), 0 30px 80px -30px rgba(0,0,0,0.85), 0 0 70px -24px rgba(95,242,224,0.28)",
      }}
    >
      <header className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.2em]">
        <span>
          Dive site {num} / {String(total).padStart(2, "0")}
        </span>
        <span className="text-glow">
          {p.category} · {p.year}
        </span>
      </header>

      <div className="grid lg:grid-cols-12">
        <div className="flex min-w-0 flex-col p-6 sm:p-8 lg:col-span-5">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/65">
            Site · {p.title}
          </p>
          <h3 className="mt-3 break-words text-2xl font-black uppercase leading-[1.04] tracking-tight sm:text-3xl xl:text-4xl">
            {p.headline}
          </h3>
          <p className="mt-4 leading-relaxed text-white/85">{p.summary}</p>

          {p.metrics.length > 0 && (
            <dl className="mt-5 grid grid-cols-3 divide-x divide-white/15 border-y border-white/15">
              {p.metrics.map((m) => (
                <div key={m.label} className="min-w-0 px-3 py-3 first:pl-0">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
                    {m.label}
                  </dt>
                  <dd className="mt-1 break-words text-sm font-bold sm:text-base">
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          <ul className="mt-4 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <li
                key={s}
                className="rounded-full border border-white/30 px-3 py-1 font-mono text-[11px] uppercase tracking-wider"
              >
                {s}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap gap-3 pt-6">
            {p.links.live && (
              <a
                href={p.links.live}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-2 rounded-full bg-coral px-5 py-3 font-mono text-xs font-bold uppercase tracking-widest text-[#04263d] transition-transform hover:-translate-y-0.5"
              >
                Live site
                <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                  ↗
                </span>
              </a>
            )}
            {p.links.code && (
              <a
                href={p.links.code}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/40 px-5 py-3 font-mono text-xs uppercase tracking-widest transition-colors hover:bg-white hover:text-[#04263d]"
              >
                Source
              </a>
            )}
          </div>
        </div>

        <div
          className="relative grid place-items-center border-t border-white/10 p-6 sm:p-8 lg:col-span-7 lg:border-l lg:border-t-0"
          style={{
            background:
              "radial-gradient(520px circle at 70% 30%, rgba(95,242,224,0.14), transparent 65%), #08213f",
          }}
        >
          <span
            className={`absolute right-4 top-4 z-10 rounded-full border px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.18em] ${
              p.status === "Shipped"
                ? "border-glow bg-[#061a35] text-glow"
                : "border-white/50 bg-[#061a35] text-white"
            }`}
          >
            {p.status === "Shipped" ? "Shipped ✓" : "Charting…"}
          </span>
          <ProjectVisual
            kind={p.visual}
            slug={p.slug}
            image={p.image}
            title={p.title}
          />
        </div>
      </div>
    </article>
  );
}
