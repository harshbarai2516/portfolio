// The treasure chest at the end of the dive. The lid lifts and gold light pours
// out when ScrollThread sets data-arrived="true" on the page container.
export default function Chest({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 150" aria-hidden className={className} fill="none" overflow="visible">
      <defs>
        <linearGradient id="ch-wood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8a5a34" />
          <stop offset="1" stopColor="#4a2d18" />
        </linearGradient>
        <linearGradient id="ch-lid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a56d3e" />
          <stop offset="1" stopColor="#6b4125" />
        </linearGradient>
        <linearGradient id="ch-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe29a" />
          <stop offset="1" stopColor="#c9921f" />
        </linearGradient>
        <radialGradient id="ch-beam" cx="50%" cy="100%" r="80%">
          <stop offset="0" stopColor="#ffe9a8" stopOpacity="0.95" />
          <stop offset="0.5" stopColor="#ffd25e" stopOpacity="0.35" />
          <stop offset="1" stopColor="#ffd25e" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* light pouring out of the open chest */}
      <g className="chest-glow">
        <path d="M44 66 L-10 -70 L210 -70 L156 66 Z" fill="url(#ch-beam)" />
        <g fill="#fff6cf">
          <circle cx="62" cy="20" r="2.4" />
          <circle cx="104" cy="-6" r="3" />
          <circle cx="142" cy="24" r="2.2" />
          <circle cx="86" cy="42" r="1.8" />
        </g>
      </g>

      {/* treasure */}
      <g stroke="#9a6a12" strokeWidth="1.2">
        <ellipse cx="62" cy="64" rx="14" ry="5" fill="url(#ch-gold)" />
        <ellipse cx="90" cy="60" rx="16" ry="5.5" fill="url(#ch-gold)" />
        <ellipse cx="118" cy="63" rx="14" ry="5" fill="url(#ch-gold)" />
        <ellipse cx="140" cy="66" rx="12" ry="4.5" fill="url(#ch-gold)" />
      </g>

      {/* base */}
      <rect x="22" y="66" width="156" height="70" rx="8" fill="url(#ch-wood)" stroke="#2a1608" strokeWidth="2" />
      <path d="M22 92 H178" stroke="#2a1608" strokeOpacity="0.5" strokeWidth="2" />
      <rect x="22" y="66" width="14" height="70" fill="#3a3f46" stroke="#1c2024" strokeWidth="1.5" />
      <rect x="164" y="66" width="14" height="70" fill="#3a3f46" stroke="#1c2024" strokeWidth="1.5" />
      <rect x="22" y="124" width="156" height="12" rx="4" fill="#3a3f46" stroke="#1c2024" strokeWidth="1.5" />
      {/* lock */}
      <rect x="88" y="76" width="24" height="26" rx="5" fill="url(#ch-gold)" stroke="#9a6a12" strokeWidth="1.5" />
      <circle cx="100" cy="86" r="3.6" fill="#4a2d18" />
      <rect x="98.2" y="88" width="3.6" height="8" rx="1.6" fill="#4a2d18" />

      {/* lid */}
      <g className="chest-lid">
        <path
          d="M22 66 C22 24 50 12 100 12 C150 12 178 24 178 66 Z"
          fill="url(#ch-lid)"
          stroke="#2a1608"
          strokeWidth="2"
        />
        <path d="M22 66 C22 24 50 12 100 12 C150 12 178 24 178 66" stroke="#3a3f46" strokeWidth="0" />
        <rect x="22" y="40" width="14" height="26" fill="#3a3f46" stroke="#1c2024" strokeWidth="1.5" />
        <rect x="164" y="40" width="14" height="26" fill="#3a3f46" stroke="#1c2024" strokeWidth="1.5" />
        <path d="M60 22 C80 16 120 16 140 22" stroke="#ffffff" strokeOpacity="0.22" strokeWidth="4" strokeLinecap="round" />
        <rect x="22" y="58" width="156" height="8" rx="3" fill="#3a3f46" stroke="#1c2024" strokeWidth="1.5" />
      </g>
    </svg>
  );
}
