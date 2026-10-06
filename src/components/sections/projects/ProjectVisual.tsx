import type { VisualKind } from "@/types";

type Props = { kind: VisualKind; slug: string; image?: string; title: string };

const S = { stroke: "var(--ink)", strokeWidth: 2 } as const;

// Wireframe drawings shown until a real screenshot is supplied via `image`.
function Drawing({ kind }: { kind: VisualKind }) {
  switch (kind) {
    case "chat":
      return (
        <g {...S}>
          <rect x="24" y="22" width="190" height="34" rx="10" fill="var(--paper)" />
          <rect x="186" y="68" width="190" height="34" rx="10" fill="var(--accent)" />
          <rect x="24" y="114" width="230" height="52" rx="10" fill="var(--paper)" />
          <rect x="226" y="178" width="150" height="26" rx="10" fill="var(--accent)" />
          <rect x="24" y="214" width="352" height="26" rx="13" fill="var(--paper)" />
          <circle cx="360" cy="227" r="7" fill="var(--ink)" />
          <g strokeLinecap="round" strokeWidth="3">
            <path d="M40 39h120M40 131h160M40 147h110M204 85h140M242 191h100" />
          </g>
        </g>
      );
    case "dashboard":
      return (
        <g {...S}>
          {[24, 146, 268].map((x, i) => (
            <g key={x}>
              <rect x={x} y="20" width="108" height="46" fill={i === 0 ? "var(--accent)" : "var(--paper)"} />
              <path d={`M${x + 12} 36h40M${x + 12} 52h70`} strokeLinecap="round" strokeWidth="3" />
            </g>
          ))}
          <rect x="24" y="80" width="200" height="150" fill="var(--paper)" />
          {[40, 70, 100, 130, 160, 190].map((x, i) => {
            const h = [50, 90, 65, 110, 80, 125][i];
            return <rect key={x} x={x} y={218 - h} width="18" height={h} fill={i === 5 ? "var(--accent)" : "var(--ink)"} />;
          })}
          <rect x="238" y="80" width="138" height="150" fill="var(--paper)" />
          <polyline
            points="250,200 280,160 305,178 335,120 364,100"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="4"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </g>
      );
    case "code":
      return (
        <g {...S}>
          <rect x="24" y="20" width="352" height="220" fill="var(--ink)" />
          <g strokeWidth="5" strokeLinecap="round">
            <path d="M44 48h60" stroke="var(--accent)" />
            <path d="M114 48h90" stroke="var(--paper)" strokeOpacity="0.8" />
            <path d="M64 76h120" stroke="var(--paper)" strokeOpacity="0.8" />
            <path d="M194 76h50" stroke="var(--accent)" />
            <path d="M64 104h80" stroke="var(--paper)" strokeOpacity="0.5" />
            <path d="M154 104h110" stroke="var(--paper)" strokeOpacity="0.8" />
            <path d="M64 132h150" stroke="var(--paper)" strokeOpacity="0.5" />
            <path d="M44 160h40" stroke="var(--accent)" />
            <path d="M94 160h140" stroke="var(--paper)" strokeOpacity="0.8" />
            <path d="M64 188h100" stroke="var(--paper)" strokeOpacity="0.5" />
            <path d="M174 188h70" stroke="var(--accent)" />
          </g>
          <rect x="268" y="118" width="96" height="46" fill="var(--paper)" />
          <path d="M280 134h60M280 150h40" stroke="var(--ink)" strokeLinecap="round" strokeWidth="3" />
        </g>
      );
    case "graph": {
      const nodes = [
        [200, 130, 20],
        [90, 70, 14],
        [320, 66, 14],
        [74, 186, 12],
        [326, 192, 16],
        [200, 36, 10],
        [200, 224, 10],
      ];
      return (
        <g {...S}>
          <g strokeDasharray="3 6" strokeLinecap="round">
            {nodes.slice(1).map(([x, y]) => (
              <line key={`${x}-${y}`} x1="200" y1="130" x2={x} y2={y} />
            ))}
            <line x1="90" y1="70" x2="74" y2="186" />
            <line x1="320" y1="66" x2="326" y2="192" />
          </g>
          {nodes.map(([x, y, r], i) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill={i === 0 ? "var(--accent)" : "var(--paper)"} />
          ))}
        </g>
      );
    }
    case "cards":
      return (
        <g {...S}>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={24 + i * 120} y="22" width="104" height="120" fill="var(--paper)" />
              <rect x={32 + i * 120} y="30" width="88" height="62" fill={i === 1 ? "var(--accent)" : "var(--ink)"} fillOpacity={i === 1 ? 1 : 0.15} />
              <path d={`M${36 + i * 120} 108h60M${36 + i * 120} 122h34`} strokeLinecap="round" strokeWidth="3" />
            </g>
          ))}
          <rect x="24" y="158" width="352" height="34" fill="var(--paper)" />
          <rect x="296" y="164" width="72" height="22" fill="var(--accent)" />
          <rect x="24" y="204" width="352" height="34" fill="var(--paper)" />
          <path d="M36 175h120M36 221h90" strokeLinecap="round" strokeWidth="3" />
        </g>
      );
  }
}

export default function ProjectVisual({ kind, slug, image, title }: Props) {
  return (
    <div className="w-full border-2 border-ink bg-paper shadow-[6px_6px_0_0_var(--ink)]">
      <div className="flex items-center gap-2 border-b-2 border-ink bg-paper px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full border-2 border-ink bg-accent" />
        <span className="h-2.5 w-2.5 rounded-full border-2 border-ink" />
        <span className="h-2.5 w-2.5 rounded-full border-2 border-ink" />
        <span className="ml-3 flex-1 truncate border-2 border-ink px-3 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted">
          {slug}.app
        </span>
      </div>

      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt={`${title} screenshot`} className="aspect-[8/5] w-full object-cover" />
      ) : (
        <svg
          viewBox="0 0 400 260"
          role="img"
          aria-label={`${title} interface sketch`}
          className="block aspect-[8/5] w-full bg-paper"
          fill="none"
        >
          <Drawing kind={kind} />
        </svg>
      )}
    </div>
  );
}