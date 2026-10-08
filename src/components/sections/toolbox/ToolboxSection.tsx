import type { Toolbox } from "@/types";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Marquee from "@/components/ui/Marquee";
import ToolHabitat from "./ToolHabitat";

type Props = { toolbox: Toolbox };

export default function ToolboxSection({ toolbox }: Props) {
  const content = (
    <>
      <Reveal>
        <p className="max-w-3xl text-3xl font-bold leading-tight sm:text-4xl">
          {toolbox.headline}
        </p>
      </Reveal>

      <div className="mt-14 border-b border-white/20">
        {toolbox.groups.map((group, gi) => (
          <ToolHabitat key={group.title} group={group} index={gi} />
        ))}
      </div>

      <Reveal className="mt-16" delay={0.1}>
        <div className="overflow-hidden rounded-2xl border border-dashed border-white/35 bg-black/15">
          <p className="flex items-center gap-4 border-b border-dashed border-white/35 px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.2em]">
            <span
              aria-hidden
              className="relative inline-block h-5 w-5 shrink-0 overflow-hidden rounded-full border border-glow/70"
            >
              <span
                className="radar-sweep absolute inset-0 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, rgba(95,242,224,0.85), rgba(95,242,224,0) 45%)",
                }}
              />
            </span>
            Uncharted waters · currently learning
          </p>
          <Marquee
            items={toolbox.learning}
            speed={28}
            sepClassName="text-glow"
            className="py-5 text-2xl font-black uppercase tracking-tight sm:text-3xl"
          />
        </div>
      </Reveal>
    </>
  );

  return Section({
    id: "toolbox",
    num: "03",
    title: "Toolbox",
    zone: "twilight",
    from: 200,
    to: 1000,
    children: content,
  } as any);
}
