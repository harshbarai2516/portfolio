import type { ProjectsData } from "@/types";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import FeaturedCard from "./FeatureCard";

type Props = {
  data: ProjectsData;
};

export default function ProjectsSection({ data }: Props) {
  const featured = data.projects.filter((p) => p.featured);

  return (
    <Section id="projects" num="04" title="Projects">
      <Reveal>
        <p className="max-w-3xl text-3xl font-bold leading-tight sm:text-4xl">
          {data.lead}
        </p>
      </Reveal>

      <div className="mt-14 flex items-center justify-between border-y-2 border-ink py-2 font-mono text-[11px] font-bold uppercase tracking-[0.25em]">
        <span>The Front Page</span>

        <span className="text-accent">
          {String(featured.length).padStart(2, "0")} top stories
        </span>
      </div>

      <div className="mt-10 flow-root">
        <div className="space-y-16">
          {featured.map((project, index) => (
            <div
              key={project.slug}
              className="relative isolate"
            >
              <FeaturedCard
                project={project}
                index={index}
                total={featured.length}
              />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}