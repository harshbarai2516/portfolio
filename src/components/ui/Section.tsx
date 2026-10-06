import type { ReactNode } from "react";

type Props = { id: string; num: string; title: string; children?: ReactNode };

export default function Section({ id, num, title, children }: Props) {
  return (
    <section
      id={id}
      data-thread-node
      className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 sm:py-28"
    >
      <header className="mb-12 flex items-end justify-between border-b-2 border-ink pb-4">
        <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black uppercase leading-none tracking-tight">
          {title}
        </h2>
        <span className="font-mono text-xs uppercase tracking-widest text-accent">
          §{num} / 05
        </span>
      </header>
      {children}
    </section>
  );
}