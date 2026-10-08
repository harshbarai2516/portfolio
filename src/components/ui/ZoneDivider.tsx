import { formatDepth } from "@/lib/zones";

type Props = { depth: number; name: string };

// Quadratic wave with a 720-unit period. The svg is 200% wide and holds two
// identical periods, so sliding it by -50% (the .wave animation) loops forever.
const LINE = "M0 40 Q180 0 360 40 T720 40 T1080 40 T1440 40";

// The boundary between two water zones: a pair of rippling light lines (the
// thermocline) and a depth marker, instead of a hard seam.
export default function ZoneDivider({ depth, name }: Props) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-20 -translate-y-1/2 overflow-hidden"
    >
      {/* faint light band hugging the boundary */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(143,230,242,0.10) 50%, transparent)",
        }}
      />

      <svg
        className="wave absolute left-0 top-0 h-full w-[200%]"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        fill="none"
      >
        <path d={LINE} stroke="rgba(191,243,251,0.55)" strokeWidth="1.6" />
      </svg>
      <svg
        className="wave wave-2 absolute left-0 top-[6px] h-full w-[200%]"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        fill="none"
      >
        <path d={LINE} stroke="rgba(95,242,224,0.35)" strokeWidth="1.2" />
      </svg>
      <svg
        className="wave wave-3 absolute left-0 top-[-6px] h-full w-[200%]"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        fill="none"
      >
        <path d={LINE} stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
      </svg>

      {/* depth marker */}
      <div className="absolute inset-0 flex items-center justify-center gap-3 px-4">
        <span className="hidden h-px w-14 bg-gradient-to-r from-transparent to-glow/70 sm:block" />
        <span
          className="whitespace-nowrap rounded-full border border-glow/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-glow"
          style={{
            background: "rgba(2,16,30,0.72)",
            backdropFilter: "blur(6px)",
            boxShadow: "0 0 18px rgba(95,242,224,0.18)",
          }}
        >
          ▼ {formatDepth(depth)} · {name}
        </span>
        <span className="hidden h-px w-14 bg-gradient-to-l from-transparent to-glow/70 sm:block" />
      </div>
    </div>
  );
}
