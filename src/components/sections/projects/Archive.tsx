import type { Project } from "@/types";
import Reveal from "@/components/ui/Reveal";

// The smaller projects, listed like items on a salvage manifest.
export default function Archive({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  return (
    <div className="mt-24">
      <div className="flex items-center justify-between gap-4 border-y border-white/25 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.25em]">
        <span>The sunken archive</span>
        <span className="text-glow">
          {String(projects.length).padStart(2, "0")} wrecks
        </span>
      </div>

      <ul className="divide-y divide-white/10">
        {projects.map((p) => (
          <li key={p.slug}>
            <Reveal>
              <div className="group grid gap-x-6 gap-y-2 px-1 py-5 transition-colors duration-300 hover:bg-white/[0.05] sm:grid-cols-12 sm:items-baseline">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/65 sm:col-span-1">
                  {p.year}
                </p>

                <div className="min-w-0 sm:col-span-3">
                  <h3 className="break-words text-2xl font-black tracking-tight transition-colors duration-300 group-hover:text-glow">
                    {p.title}
                  </h3>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-glow">
                    {p.category}
                  </p>
                </div>

                <div className="min-w-0 sm:col-span-5">
                  <p className="text-white/90">{p.summary}</p>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-white/60">
                    {p.stack.join(" · ")}
                  </p>
                </div>

                <div className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs font-bold uppercase tracking-widest sm:col-span-3 sm:justify-end">
                  {p.links.live && (
                    <a
                      href={p.links.live}
                      target="_blank"
                      rel="noreferrer"
                      className="underline decoration-glow decoration-2 underline-offset-4 transition-colors hover:text-glow"
                    >
                      Live ↗
                    </a>
                  )}
                  {p.links.code && (
                    <a
                      href={p.links.code}
                      target="_blank"
                      rel="noreferrer"
                      className="underline decoration-glow decoration-2 underline-offset-4 transition-colors hover:text-glow"
                    >
                      Code ↗
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}
