import type { Toolbox } from "@/types";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Marquee from "@/components/ui/Marquee";

type Props = { toolbox: Toolbox };

export default function ToolboxSection({ toolbox }: Props) {
  return (
    <Section id="toolbox" num="03" title="Toolbox">
      <Reveal>
        <p className="max-w-3xl text-3xl font-bold leading-tight sm:text-4xl">
          {toolbox.headline}
        </p>
      </Reveal>

      <div className="mt-14 grid gap-8 md:grid-cols-2">
        {toolbox.groups.map((group, gi) => (
          <Reveal key={group.title} delay={0.08 * gi}>
            <article className="group h-full border-2 border-ink bg-paper shadow-[8px_8px_0_0_var(--ink)] transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0_0_var(--accent)]">
              <header className="flex items-center justify-between bg-ink px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-paper">
                <span>{group.title}</span>
                <span className="text-accent">
                  {String(group.tools.length).padStart(2, "0")}
                </span>
              </header>

              <div className="px-5 pb-6 pt-5">
                <p className="text-ink/75">{group.blurb}</p>

                <ul className="mt-5 divide-y divide-ink/15 border-y border-ink/15">
                  {group.tools.map((tool) => (
                    <li
                      key={tool.name}
                      className="flex items-baseline justify-between gap-4 py-3 transition-colors hover:text-accent"
                    >
                      <span className="font-bold">{tool.name}</span>
                      <span className="text-right font-mono text-[11px] uppercase tracking-wider text-muted">
                        {tool.note}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16" delay={0.1}>
        <div className="border-2 border-dashed border-ink">
          <p className="border-b-2 border-dashed border-ink px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.2em]">
            Currently learning
          </p>
          <Marquee
            items={toolbox.learning}
            speed={28}
            className="py-5 text-2xl font-black uppercase tracking-tight sm:text-3xl"
          />
        </div>
      </Reveal>
    </Section>
  );
}