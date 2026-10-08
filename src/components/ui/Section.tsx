import type { CSSProperties, ReactNode } from "react";
import { formatDepth, zones, type ZoneKey } from "@/lib/zones";
import ZoneDivider from "./ZoneDivider";

type Props = {
  id: string;
  num: string;
  title: string;
  zone: ZoneKey;
  from: number; // metres at the top of the section
  to: number; // metres at the bottom of the section
  flush?: boolean; // no bottom padding (the seabed scene sits flush to the end)
  children?: ReactNode;
};

// Each zone gets its own light and its own faint glow.
const overlays: Partial<Record<ZoneKey, string>> = {
  twilight:
    "radial-gradient(640px circle at 88% 12%, rgba(143,107,255,0.20), transparent 62%), radial-gradient(520px circle at 6% 80%, rgba(95,242,224,0.10), transparent 60%)",
  midnight:
    "radial-gradient(700px circle at 4% 40%, rgba(95,242,224,0.08), transparent 62%), radial-gradient(600px circle at 96% 85%, rgba(143,107,255,0.10), transparent 60%)",
  abyss:
    "radial-gradient(900px circle at 50% 108%, rgba(255,210,94,0.08), transparent 60%)",
  hadal:
    "radial-gradient(700px circle at 8% 30%, rgba(95,242,224,0.07), transparent 62%), radial-gradient(900px circle at 50% 104%, rgba(255,210,94,0.10), transparent 60%)",
};

const fade: CSSProperties = {
  maskImage: "linear-gradient(to bottom, #000 0%, transparent 100%)",
  WebkitMaskImage: "linear-gradient(to bottom, #000 0%, transparent 100%)",
};

export default function Section({
  id,
  num,
  title,
  zone,
  from,
  to,
  flush = false,
  children,
}: Props) {
  const z = zones[zone];
  const overlay = overlays[zone];

  return (
    <section
      id={id}
      data-thread-node
      data-depth-from={from}
      data-depth-to={to}
      data-zone-name={z.name}
      className={`relative scroll-mt-24 pt-24 text-white sm:pt-32 ${
        flush ? "pb-0" : "pb-24 sm:pb-32"
      }`}
    >
      {/* water colour: starts exactly where the previous zone ended */}
      <div
        aria-hidden
        className="absolute inset-x-0 -bottom-px -top-px z-0"
        style={{ background: `linear-gradient(to bottom, ${z.top}, ${z.bottom})` }}
      />
      <ZoneDivider depth={from} name={z.name} />
      {overlay && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{ background: overlay }}
        />
      )}
      {zone === "sunlight" && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[70%] overflow-hidden"
          style={fade}
        >
          <div
            className="rays absolute left-[-6%] top-0 h-full w-[112%]"
            style={{
              background:
                "repeating-linear-gradient(100deg, rgba(255,255,255,0.13) 0 34px, transparent 34px 150px)",
            }}
          />
        </div>
      )}

      <div className="relative z-[2] mx-auto max-w-6xl px-9 sm:px-10 xl:px-6">
        <header className="mb-12 sm:mb-16">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.25em] text-glow">
            <span>§{num}</span>
            <span className="h-px w-10 bg-glow/60" />
            <span>{z.name}</span>
            <span className="ml-auto text-white/70">
              {formatDepth(from)} – {formatDepth(to)}
            </span>
          </div>

          <h2
            className="mt-4 bg-clip-text pb-2 text-[clamp(3rem,10vw,8rem)] font-black uppercase leading-[0.9] tracking-tighter text-transparent"
            style={{
              backgroundImage: "linear-gradient(180deg, #ffffff 30%, #9fe8f5 100%)",
            }}
          >
            {title}
          </h2>

          <div
            aria-hidden
            className="mt-4 h-px w-full"
            style={{
              background: "linear-gradient(90deg, var(--glow), rgba(95,242,224,0))",
            }}
          />
        </header>

        {children}
      </div>
    </section>
  );
}
