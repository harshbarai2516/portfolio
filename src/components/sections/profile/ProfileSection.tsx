import type { About, Profile } from "@/types";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";

type Props = { profile: Profile; about: About };

export default function ProfileSection({ profile, about }: Props) {
  const facts = [
    { label: "Role", value: profile.role },
    { label: "Education", value: profile.education },
    { label: "Based in", value: profile.location },
    {
      label: "Status",
      value: profile.availability.open ? "Open to work" : "Currently busy",
    },
  ];

  return (
    <Section
      id="profile"
      num="02"
      title="Profile"
      zone="sunlight"
      from={0}
      to={200}
    >
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-7">
          <Reveal>
            <p className="text-3xl font-bold leading-tight sm:text-4xl">
              {about.headline}
            </p>
          </Reveal>

          <div className="mt-8 space-y-5 text-lg leading-relaxed text-white">
            {about.paragraphs.map((text, i) => (
              <Reveal key={i} delay={0.1 * (i + 1)}>
                <p
                  className={
                    i === 0
                      ? "first-letter:float-left first-letter:mr-3 first-letter:text-7xl first-letter:font-black first-letter:leading-[0.8] first-letter:text-[#ffd9a0]"
                      : ""
                  }
                >
                  {text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="min-w-0 lg:col-span-5" delay={0.15}>
          <aside
            className="overflow-hidden rounded-2xl border border-white/25 backdrop-blur-sm"
            style={{ background: "rgba(4,38,61,0.55)" }}
          >
            <p className="flex items-center justify-between gap-4 border-b border-white/20 px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.2em]">
              <span className="flex items-center gap-3">
                <span className="relative inline-flex h-2.5 w-2.5">
                  <span className="sonar-ring" />
                  <span className="relative h-2.5 w-2.5 rounded-full bg-glow" />
                </span>
                Dive log
              </span>
              <span className="text-glow">Cert. 001</span>
            </p>
            <dl>
              {facts.map((f) => (
                <div
                  key={f.label}
                  className="flex items-baseline justify-between gap-6 border-b border-white/15 px-5 py-4 last:border-b-0"
                >
                  <dt className="shrink-0 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70">
                    {f.label}
                  </dt>
                  <dd className="min-w-0 break-words text-right font-bold">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </Reveal>
      </div>

      <div className="mt-20 grid gap-5 md:grid-cols-3">
        {about.principles.map((pr, i) => (
          <Reveal key={pr.title} delay={0.1 * i} className="min-w-0">
            <div className="group h-full rounded-2xl border border-white/20 bg-white/[0.07] p-6 transition-colors duration-300 hover:border-glow/60 hover:bg-white/[0.12]">
              <p className="font-mono text-xs uppercase tracking-widest text-glow">
                0{i + 1}
              </p>
              <h3 className="mt-3 text-2xl font-black">{pr.title}</h3>
              <p className="mt-2 text-white/90">{pr.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
