import type { Project } from "@/types";
import ProjectVisual from "./ProjectVisual";

type Props = { project: Project; index: number; total: number };

// One "story" on the front page. On large screens each card sticks and the
// next one slides over it, like pages being stacked on a press desk.
export default function FeaturedCard({ project: p, index, total }: Props) {
  const flip = index % 2 === 1;
  const num = String(index + 1).padStart(2, "0");

  return (
    <article
      style={{ top: `calc(6rem + ${index * 18}px)` }}
      className="mb-10 lg:sticky lg:mb-[28vh] lg:last:mb-0"
    >
      <div
        className={`border-2 border-ink bg-paper ${
          flip ? "shadow-[10px_10px_0_0_var(--ink)]" : "shadow-[10px_10px_0_0_var(--accent)]"
        }`}
      >
        <header className="flex items-center justify-between bg-ink px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-paper">
          <span>
            Story {num} / {String(total).padStart(2, "0")}
          </span>
          <span className="text-accent">
            {p.category} · {p.year}
          </span>
        </header>

        <div className="grid lg:grid-cols-12">
          <div
            className={`flex flex-col p-6 sm:p-8 lg:col-span-5 ${flip ? "lg:order-2" : ""}`}
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
              Filed under · {p.title}
            </p>
            <h3 className="mt-3 text-3xl font-black uppercase leading-[1.02] tracking-tight sm:text-4xl">
              {p.headline}
            </h3>
            <p className="mt-4 leading-relaxed text-ink/80">{p.summary}</p>

            <dl className="mt-6 grid grid-cols-3 divide-x-2 divide-ink border-y-2 border-ink">
              {p.metrics.map((m) => (
                <div key={m.label} className="px-3 py-3 first:pl-0">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    {m.label}
                  </dt>
                  <dd className="mt-1 text-sm font-bold sm:text-base">{m.value}</dd>
                </div>
              ))}
            </dl>

            <ul className="mt-5 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-ink/40 px-3 py-1 font-mono text-[11px] uppercase tracking-wider"
                >
                  {s}
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-wrap gap-3 pt-8">
              {p.links.live && (
                <a
                  href={p.links.live}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-2 bg-ink px-5 py-3 font-mono text-xs uppercase tracking-widest text-paper transition-colors hover:bg-accent"
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
                  className="border-2 border-ink px-5 py-3 font-mono text-xs uppercase tracking-widest transition-colors hover:bg-ink hover:text-paper"
                >
                  Source
                </a>
              )}
            </div>
          </div>

          <div
            className={`relative grid place-items-center border-t-2 border-ink bg-ink/[0.04] p-6 sm:p-10 lg:col-span-7 lg:border-t-0 ${
              flip ? "lg:order-1 lg:border-r-2" : "lg:border-l-2"
            }`}
          >
            <span
              className={`absolute right-4 top-4 z-10 rotate-6 border-2 px-3 py-1 font-mono text-xs font-bold uppercase tracking-[0.2em] ${
                p.status === "Shipped"
                  ? "border-accent bg-paper text-accent"
                  : "border-ink bg-paper text-ink"
              }`}
            >
              {p.status === "Shipped" ? "Shipped ✓" : "In the press…"}
            </span>
            <ProjectVisual kind={p.visual} slug={p.slug} image={p.image} title={p.title} />
          </div>
        </div>
      </div>
    </article>
  );
}