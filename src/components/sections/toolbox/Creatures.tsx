import type { CreatureKind } from "@/types";

// Four hand-drawn sea creatures, one per toolbox habitat. Pure SVG; the motion
// comes from the .c-* classes in globals.css. `excited` speeds them up.

type Props = { excited?: boolean; className?: string };

function Jellyfish({ excited, className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 200 250"
      aria-hidden
      className={`creature ${excited ? "is-excited" : ""} ${className}`}
      fill="none"
    >
      <defs>
        <radialGradient id="jf-dome" cx="45%" cy="25%" r="85%">
          <stop offset="0" stopColor="#d9c9ff" stopOpacity="0.95" />
          <stop offset="0.5" stopColor="#8f6bff" stopOpacity="0.8" />
          <stop offset="1" stopColor="#3a2aa8" stopOpacity="0.75" />
        </radialGradient>
        <linearGradient id="jf-arm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b79bff" />
          <stop offset="1" stopColor="#5ff2e0" stopOpacity="0.15" />
        </linearGradient>
        <radialGradient id="jf-halo" cx="50%" cy="40%" r="50%">
          <stop offset="0" stopColor="#8f6bff" stopOpacity="0.4" />
          <stop offset="1" stopColor="#8f6bff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g className="c-bob">
        <circle cx="100" cy="95" r="95" fill="url(#jf-halo)" />

        {/* long trailing arms */}
        <g strokeLinecap="round" fill="none" stroke="url(#jf-arm)">
          <path className="c-sway" strokeWidth="5" d="M62 108 C52 140 74 160 62 196 C56 216 68 232 63 246" />
          <path className="c-sway c-sway-b" strokeWidth="4" d="M84 112 C94 146 74 168 88 202 C94 220 84 236 90 248" />
          <path className="c-sway c-sway-c" strokeWidth="5" d="M112 112 C104 144 126 166 112 200 C106 220 118 234 112 248" />
          <path className="c-sway" strokeWidth="4" d="M138 108 C148 138 128 160 142 192 C148 210 138 226 144 240" />
        </g>
        {/* frilly oral arms */}
        <g strokeLinecap="round" fill="none" stroke="#e6dcff" strokeOpacity="0.9">
          <path className="c-sway c-sway-b" strokeWidth="7" d="M92 108 C86 128 98 138 92 158" />
          <path className="c-sway" strokeWidth="7" d="M108 108 C114 128 102 138 108 158" />
        </g>

        {/* dome */}
        <g className="c-dome">
          <path
            d="M26 104 C24 42 66 10 100 10 C134 10 176 42 174 104 Q154 120 134 104 Q114 120 94 104 Q74 120 54 104 Q40 112 26 104 Z"
            fill="url(#jf-dome)"
            stroke="#e6dcff"
            strokeOpacity="0.55"
            strokeWidth="1.5"
          />
          <path d="M52 62 C58 36 80 24 100 24" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="5" strokeLinecap="round" />
          <g fill="#5ff2e0" fillOpacity="0.85">
            <circle cx="78" cy="72" r="3.4" />
            <circle cx="104" cy="58" r="4.2" />
            <circle cx="126" cy="78" r="3" />
            <circle cx="96" cy="86" r="2.6" />
            <circle cx="146" cy="64" r="2.4" />
          </g>
        </g>
      </g>
    </svg>
  );
}

function Anglerfish({ excited, className = "" }: Props) {
  return (
    <svg
      viewBox="0 -24 260 224"
      aria-hidden
      className={`creature ${excited ? "is-excited" : ""} ${className}`}
      fill="none"
    >
      <defs>
        <linearGradient id="af-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1d5870" />
          <stop offset="1" stopColor="#071f30" />
        </linearGradient>
        <radialGradient id="af-lure" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#fff7c2" />
          <stop offset="0.4" stopColor="#5ff2e0" stopOpacity="0.85" />
          <stop offset="1" stopColor="#5ff2e0" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g className="c-bob">
        {/* tail */}
        <g className="c-tail">
          <path d="M214 104 L252 70 C246 92 246 118 254 142 Z" fill="#12445a" stroke="#2c7da0" strokeWidth="1.5" strokeLinejoin="round" />
        </g>

        {/* dorsal + belly fins */}
        <path d="M150 52 C160 30 176 30 188 52 Z" fill="#12445a" stroke="#2c7da0" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M150 156 C158 176 176 178 186 158 Z" fill="#12445a" stroke="#2c7da0" strokeWidth="1.5" strokeLinejoin="round" />

        {/* body */}
        <path
          d="M34 104 C30 62 78 40 134 46 C184 52 214 82 216 104 C214 128 184 158 134 162 C80 166 36 144 34 104 Z"
          fill="url(#af-body)"
          stroke="#2c7da0"
          strokeWidth="2"
        />
        <path d="M86 56 C120 46 164 56 190 80" stroke="#7fd4e8" strokeOpacity="0.35" strokeWidth="3" strokeLinecap="round" />

        {/* mouth and teeth */}
        <path d="M36 108 C60 134 100 144 138 136 C116 128 70 124 36 108 Z" fill="#031019" stroke="#2c7da0" strokeWidth="1.5" strokeLinejoin="round" />
        <g fill="#f4fcfd">
          <path d="M48 112 l5 14 l5 -11 Z" />
          <path d="M66 119 l5 15 l5 -11 Z" />
          <path d="M86 124 l5 15 l5 -11 Z" />
          <path d="M106 127 l5 14 l5 -10 Z" />
          <path d="M60 116 l-4 -12 l-6 8 Z" />
          <path d="M82 121 l-4 -12 l-6 8 Z" />
          <path d="M104 124 l-4 -12 l-6 8 Z" />
        </g>

        {/* eye */}
        <circle cx="86" cy="86" r="13" fill="#e9fbff" />
        <circle cx="82" cy="86" r="7" fill="#031019" />
        <circle cx="79" cy="83" r="2.4" fill="#ffffff" />

        {/* lure on a stalk */}
        <path d="M74 56 C60 18 96 -2 136 14" stroke="#2c7da0" strokeWidth="3" strokeLinecap="round" />
        <circle className="c-lure" cx="136" cy="14" r="28" fill="url(#af-lure)" />
        <circle cx="136" cy="14" r="7" fill="#fff7c2" />
      </g>
    </svg>
  );
}

function Lanternfish({ excited, className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 260 140"
      aria-hidden
      className={`creature ${excited ? "is-excited" : ""} ${className}`}
      fill="none"
    >
      <defs>
        <linearGradient id="lf-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2f86a8" />
          <stop offset="0.6" stopColor="#14506f" />
          <stop offset="1" stopColor="#0a2f47" />
        </linearGradient>
        <radialGradient id="lf-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#5ff2e0" stopOpacity="0.9" />
          <stop offset="1" stopColor="#5ff2e0" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g className="c-bob">
        <g className="c-tail-r">
          <path d="M40 70 L6 38 C14 58 14 82 6 102 Z" fill="#14506f" stroke="#5fb6d6" strokeWidth="1.5" strokeLinejoin="round" />
        </g>
        <path d="M112 36 C124 18 142 18 152 38 Z" fill="#14506f" stroke="#5fb6d6" strokeWidth="1.5" strokeLinejoin="round" />
        <path
          d="M40 70 C64 26 150 20 214 52 C238 62 248 68 248 70 C248 72 238 78 214 88 C150 120 64 114 40 70 Z"
          fill="url(#lf-body)"
          stroke="#5fb6d6"
          strokeWidth="2"
        />
        <path d="M70 52 C110 36 170 38 210 58" stroke="#ffffff" strokeOpacity="0.28" strokeWidth="3" strokeLinecap="round" />
        <circle cx="206" cy="64" r="9" fill="#e9fbff" />
        <circle cx="209" cy="64" r="4.6" fill="#031019" />
        {/* photophores: the glowing dots along the belly */}
        <g>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
            const x = 80 + i * 16;
            const y = 92 - Math.sin((i / 7) * Math.PI) * 6;
            return (
              <g key={i}>
                <circle cx={x} cy={y} r="9" fill="url(#lf-glow)" />
                <circle cx={x} cy={y} r="2.8" fill="#eafffb" />
              </g>
            );
          })}
        </g>
        <path d="M90 76 C130 86 180 82 214 74" stroke="#5ff2e0" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 6" />
      </g>
    </svg>
  );
}

function Octopus({ excited, className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 240 240"
      aria-hidden
      className={`creature ${excited ? "is-excited" : ""} ${className}`}
      fill="none"
    >
      <defs>
        <radialGradient id="oc-head" cx="40%" cy="25%" r="85%">
          <stop offset="0" stopColor="#ffb199" />
          <stop offset="0.55" stopColor="#ff7a59" />
          <stop offset="1" stopColor="#c8415f" />
        </radialGradient>
        <linearGradient id="oc-arm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff7a59" />
          <stop offset="1" stopColor="#c8415f" />
        </linearGradient>
      </defs>
      <g className="c-bob">
        <g stroke="url(#oc-arm)" strokeWidth="15" strokeLinecap="round" fill="none">
          <path className="c-sway" d="M70 128 C46 150 66 176 36 196 C24 205 30 218 44 214" />
          <path className="c-sway c-sway-b" d="M88 134 C76 164 98 184 76 212 C70 222 78 232 90 228" />
          <path className="c-sway c-sway-c" d="M114 136 C112 170 134 188 118 218 C114 228 124 236 134 230" />
          <path className="c-sway" d="M140 134 C154 164 134 186 156 210 C164 220 158 232 148 230" />
          <path className="c-sway c-sway-b" d="M162 128 C186 152 164 176 196 194 C208 202 206 216 192 214" />
          <path className="c-sway c-sway-c" d="M178 118 C206 128 212 154 222 168 C228 176 224 188 214 186" />
        </g>
        {/* suckers on the near arms */}
        <g fill="#ffd7c9" fillOpacity="0.8">
          <circle cx="54" cy="160" r="2.6" />
          <circle cx="52" cy="176" r="2.6" />
          <circle cx="86" cy="178" r="2.6" />
          <circle cx="92" cy="196" r="2.6" />
          <circle cx="126" cy="176" r="2.6" />
          <circle cx="132" cy="196" r="2.6" />
        </g>
        <path
          d="M44 100 C40 36 80 14 120 14 C160 14 200 36 196 100 C194 130 170 144 120 144 C70 144 46 130 44 100 Z"
          fill="url(#oc-head)"
          stroke="#8f2e4a"
          strokeOpacity="0.5"
          strokeWidth="2"
        />
        <path d="M70 52 C80 34 100 26 118 26" stroke="#ffffff" strokeOpacity="0.45" strokeWidth="6" strokeLinecap="round" />
        <g fill="#8f2e4a" fillOpacity="0.35">
          <circle cx="150" cy="48" r="5" />
          <circle cx="166" cy="64" r="3.4" />
          <circle cx="84" cy="70" r="3" />
        </g>
        {/* eyes */}
        <circle cx="94" cy="100" r="15" fill="#fff6f0" />
        <circle cx="148" cy="100" r="15" fill="#fff6f0" />
        <rect x="88" y="95" width="12" height="10" rx="5" fill="#2a0f1c" />
        <rect x="142" y="95" width="12" height="10" rx="5" fill="#2a0f1c" />
        <circle cx="91" cy="96" r="2" fill="#ffffff" />
        <circle cx="145" cy="96" r="2" fill="#ffffff" />
        <path d="M104 124 C114 132 128 132 138 124" stroke="#8f2e4a" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export default function Creature({
  kind,
  ...rest
}: Props & { kind: CreatureKind }) {
  switch (kind) {
    case "jellyfish":
      return <Jellyfish {...rest} />;
    case "anglerfish":
      return <Anglerfish {...rest} />;
    case "lanternfish":
      return <Lanternfish {...rest} />;
    case "octopus":
      return <Octopus {...rest} />;
  }
}
