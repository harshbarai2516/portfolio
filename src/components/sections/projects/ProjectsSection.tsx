import type { ProjectsData } from "@/types";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import ProjectStack from "./ProjectStack";
import Archive from "./Archive";

type Props = {
  data: ProjectsData;
};

export default function ProjectsSection({ data }: Props) {
  const featured = data.projects.filter((p) => p.featured);
  const archive = data.projects.filter((p) => !p.featured);

  return (
    <Section
      id="projects"
      num="04"
      title="Projects"
      zone="midnight"
      from={1000}
      to={4000}
    >
      <Reveal>
        <p className="max-w-3xl text-3xl font-bold leading-tight sm:text-4xl">
          {data.lead}
        </p>
      </Reveal>

      <div className="mt-14 flex items-center justify-between gap-4 border-y border-white/25 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.25em]">
        <span>Dive sites</span>
        <span className="text-glow">
          {String(featured.length).padStart(2, "0")} charted
        </span>
      </div>

      <div className="mt-10">
        <ProjectStack projects={featured} />
      </div>

      <Archive projects={archive} />
    </Section>
  );
}
