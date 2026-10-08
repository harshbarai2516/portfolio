// A vintage brass-helmet diver, drawn upright (feet down). ScrollThread tilts it
// to follow the guide line. Pure SVG, no props needed.
export default function Diver({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 96"
      aria-hidden
      className={className}
      fill="none"
      overflow="visible"
    >
      <defs>
        <radialGradient id="dv-brass" cx="35%" cy="30%" r="80%">
          <stop offset="0" stopColor="#ffe29a" />
          <stop offset="0.45" stopColor="#d6a24e" />
          <stop offset="1" stopColor="#8a5a1c" />
        </radialGradient>
        <linearGradient id="dv-collar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e7b95f" />
          <stop offset="1" stopColor="#8a5a1c" />
        </linearGradient>
        <radialGradient id="dv-glass" cx="40%" cy="35%" r="75%">
          <stop offset="0" stopColor="#bff7ff" />
          <stop offset="0.55" stopColor="#2aa6c8" />
          <stop offset="1" stopColor="#06304f" />
        </radialGradient>
        <linearGradient id="dv-suit" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0a3a5a" />
          <stop offset="0.5" stopColor="#0f5a85" />
          <stop offset="1" stopColor="#0a3a5a" />
        </linearGradient>
      </defs>

      {/* arms */}
      <path d="M17 46 C6 52 6 63 10 71" stroke="#0b4468" strokeWidth="9" strokeLinecap="round" />
      <path d="M47 46 C58 52 58 63 54 71" stroke="#0b4468" strokeWidth="9" strokeLinecap="round" />
      <circle cx="10" cy="73" r="5" fill="#082f4a" />
      <circle cx="54" cy="73" r="5" fill="#082f4a" />

      {/* legs and lead boots */}
      <rect x="19" y="72" width="10" height="15" rx="4" fill="#0b4468" />
      <rect x="35" y="72" width="10" height="15" rx="4" fill="#0b4468" />
      <path d="M15 85 h17 v7 a4 4 0 0 1 -4 4 h-9 a4 4 0 0 1 -4 -4 Z" fill="#3b4a56" />
      <path d="M32 85 h17 v7 a4 4 0 0 1 -4 4 h-9 a4 4 0 0 1 -4 -4 Z" fill="#3b4a56" />
      <path d="M17 88 h13 M34 88 h13" stroke="#6d808e" strokeWidth="1.4" strokeLinecap="round" />

      {/* torso */}
      <path d="M15 42 Q32 53 49 42 L52 71 Q32 78 12 71 Z" fill="url(#dv-suit)" stroke="#062d47" strokeWidth="1.2" />
      <path d="M23 47 L21 68" stroke="#ffffff" strokeOpacity="0.16" strokeWidth="3" strokeLinecap="round" />
      <rect x="12" y="66" width="40" height="6.5" rx="3.2" fill="#ff7a59" stroke="#b9482c" strokeWidth="1" />
      <circle cx="32" cy="55" r="3.2" fill="url(#dv-brass)" stroke="#8a5a1c" strokeWidth="0.8" />

      {/* breastplate collar */}
      <path d="M16 34 Q32 45 48 34 L50 41 Q32 53 14 41 Z" fill="url(#dv-collar)" stroke="#7a4f14" strokeWidth="1" />
      <circle cx="21" cy="40" r="1.1" fill="#fff3c8" />
      <circle cx="32" cy="46" r="1.1" fill="#fff3c8" />
      <circle cx="43" cy="40" r="1.1" fill="#fff3c8" />

      {/* helmet */}
      <rect x="28.5" y="3" width="7" height="5" rx="1.8" fill="#c28f3a" stroke="#7a4f14" strokeWidth="0.8" />
      <circle cx="32" cy="22" r="15.5" fill="url(#dv-brass)" stroke="#7a4f14" strokeWidth="1.2" />
      <circle cx="32" cy="22" r="9.8" fill="#8a5a1c" />
      <circle cx="32" cy="22" r="8.1" fill="url(#dv-glass)" />
      <ellipse cx="29" cy="18.8" rx="3.2" ry="2" transform="rotate(-30 29 18.8)" fill="#ffffff" fillOpacity="0.7" />
      <circle cx="19.6" cy="23" r="2.5" fill="#8a5a1c" />
      <circle cx="19.6" cy="23" r="1.5" fill="url(#dv-glass)" />
      <circle cx="44.4" cy="23" r="2.5" fill="#8a5a1c" />
      <circle cx="44.4" cy="23" r="1.5" fill="url(#dv-glass)" />
      {/* helmet rivets */}
      <g fill="#fff3c8">
        <circle cx="32" cy="9.6" r="0.9" />
        <circle cx="42.4" cy="13" r="0.9" />
        <circle cx="21.6" cy="13" r="0.9" />
        <circle cx="42.4" cy="31" r="0.9" />
        <circle cx="21.6" cy="31" r="0.9" />
      </g>
    </svg>
  );
}
