import type { IssueMeta } from "@/types";

type Props = { name: string; issue: IssueMeta };

export default function Footer({ name, issue }: Props) {
  return (
    <footer className="border-t-4 border-double border-ink">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 font-mono text-[11px] uppercase tracking-[0.2em] text-muted sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {new Date().getFullYear()} {name}
        </span>
        <span>
          Vol. {issue.vol} · No. {issue.no} · {issue.date}
        </span>
        <span>Set in Playfair Display &amp; JetBrains Mono</span>
      </div>
    </footer>
  );
}
