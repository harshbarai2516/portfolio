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
    <Section id="profile" num="02" title="Profile">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="text-3xl font-bold leading-tight sm:text-4xl">
              {about.headline}
            </p>
          </Reveal>

          <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink/80">
            {about.paragraphs.map((text, i) => (
              <Reveal key={i} delay={0.1 * (i + 1)}>
                <p
                  className={
                    i === 0
                      ? "first-letter:float-left first-letter:mr-3 first-letter:text-7xl first-letter:font-black first-letter:leading-[0.8] first-letter:text-accent"
                      : ""
                  }
                >
                  {text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="lg:col-span-5" delay={0.15}>
          <aside className="border-2 border-ink bg-paper shadow-[8px_8px_0_0_var(--accent)]">
            <p className="bg-ink px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-paper">
              Fact sheet
            </p>
            <dl>
              {facts.map((f) => (
                <div
                  key={f.label}
                  className="flex items-baseline justify-between gap-6 border-b border-ink/15 px-5 py-4 last:border-b-0"
                >
                  <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                    {f.label}
                  </dt>
                  <dd className="text-right font-bold">{f.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </Reveal>
      </div>

      <div className="mt-20 grid border-t-2 border-ink md:grid-cols-3">
        {about.principles.map((pr, i) => (
          <Reveal
            key={pr.title}
            delay={0.1 * i}
            className="group border-b-2 border-ink py-8 md:border-b-0 md:border-r-2 md:px-8 md:first:pl-0 md:last:border-r-0"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-muted transition-colors group-hover:text-accent">
              0{i + 1}
            </p>
            <h3 className="mt-3 text-2xl font-black">{pr.title}</h3>
            <p className="mt-2 text-ink/75">{pr.text}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}