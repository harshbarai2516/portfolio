// A sunken ship settled into the trench floor: tilted hull, snapped mast,
// glowing portholes, ribs showing through a torn side and a fallen anchor.
// Pure SVG; the portholes pulse with the existing "lure-pulse" animation.
export default function ShipWreck({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 560 260"
      aria-hidden
      className={className}
      style={style}
      fill="none"
      overflow="visible"
    >
      <defs>
        <linearGradient id="wk-hull" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1d3a4a" />
          <stop offset="1" stopColor="#08151f" />
        </linearGradient>
        <linearGradient id="wk-deck" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2c4b5c" />
          <stop offset="1" stopColor="#12262f" />
        </linearGradient>
        <radialGradient id="wk-port" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#d9fffa" />
          <stop offset="0.5" stopColor="#5ff2e0" />
          <stop offset="1" stopColor="#0b6b72" />
        </radialGradient>
        <linearGradient id="wk-sand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a2b33" />
          <stop offset="1" stopColor="#060d12" />
        </linearGradient>
      </defs>

      {/* light spilling out of the portholes */}
      <g opacity="0.35">
        <path d="M168 120 L60 205 L170 214 Z" fill="#5ff2e0" opacity="0.18" />
        <path d="M238 108 L150 200 L262 204 Z" fill="#5ff2e0" opacity="0.14" />
      </g>

      {/* the ship, listing to port */}
      <g transform="rotate(-9 280 150)">
        {/* snapped mast + rigging */}
        <g stroke="#0c1a22" strokeWidth="5" strokeLinecap="round">
          <path d="M300 112 L318 20" />
          <path d="M318 20 L350 8" strokeWidth="3.5" />
        </g>
        <g stroke="#1d3a4a" strokeWidth="1.4" strokeOpacity="0.9">
          <path d="M318 26 L240 118" />
          <path d="M318 26 L388 124" />
          <path d="M312 50 L262 116" />
          <path d="M350 8 C372 30 380 70 392 122" strokeDasharray="3 4" />
        </g>
        {/* torn sail */}
        <path
          d="M318 28 C346 36 360 60 352 92 C336 84 330 70 320 66 C318 52 320 40 318 28 Z"
          fill="#233f4d"
          fillOpacity="0.75"
          stroke="#0c1a22"
          strokeWidth="1.2"
        />

        {/* hull */}
        <path
          d="M72 128 C120 150 200 168 290 168 C380 168 452 150 492 112 L470 110 C440 130 380 142 290 142 C200 142 130 130 92 112 Z"
          fill="url(#wk-deck)"
          stroke="#0a161d"
          strokeWidth="2"
        />
        <path
          d="M92 112 L72 128 C82 168 150 214 262 218 C374 222 450 182 492 112 C450 150 380 168 290 168 C200 168 120 150 72 128"
          fill="url(#wk-hull)"
          stroke="#0a161d"
          strokeWidth="2.5"
        />
        {/* planks */}
        <g stroke="#0a161d" strokeOpacity="0.55" strokeWidth="1.4">
          <path d="M82 144 C160 180 380 196 478 134" />
          <path d="M100 166 C180 198 360 208 456 156" />
        </g>
        {/* torn side: ribs showing through */}
        <path
          d="M196 150 L214 184 L232 160 L250 194 L270 166 L290 200 L304 170 L206 150 Z"
          fill="#030a0e"
        />
        <g stroke="#2e4f60" strokeWidth="3" strokeLinecap="round">
          <path d="M206 154 L214 190" />
          <path d="M226 156 L236 196" />
          <path d="M246 158 L258 200" />
          <path d="M266 160 L280 202" />
          <path d="M286 162 L300 200" />
        </g>
        {/* portholes */}
        {[
          [120, 138],
          [150, 146],
          [180, 151],
          [334, 160],
          [364, 154],
          [394, 146],
        ].map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="8" fill="#0a161d" stroke="#d6a24e" strokeWidth="2" />
            <circle
              cx={cx}
              cy={cy}
              r="5"
              fill="url(#wk-port)"
              className="c-lure"
              style={{ animationDelay: `-${(i * 0.7).toFixed(1)}s` }}
            />
          </g>
        ))}
        {/* broken rail / bow */}
        <path d="M92 112 L74 86 M104 114 L90 92" stroke="#0c1a22" strokeWidth="4" strokeLinecap="round" />
        {/* barnacles & growth */}
        <g fill="#5ff2e0" fillOpacity="0.5">
          <circle cx="132" cy="170" r="2.2" />
          <circle cx="142" cy="176" r="1.6" />
          <circle cx="410" cy="168" r="2.4" />
          <circle cx="420" cy="160" r="1.7" />
          <circle cx="330" cy="206" r="2" />
        </g>
      </g>

      {/* fallen anchor + chain */}
      <g stroke="#2a4655" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M470 196 V232 M452 206 H488" />
        <path d="M450 226 C456 244 484 244 490 226" />
        <path d="M470 196 C462 206 440 214 420 224 C400 234 372 240 340 236" strokeWidth="2.4" strokeDasharray="1 6" />
      </g>

      {/* debris */}
      <g fill="#10222c" stroke="#0a161d" strokeWidth="1.5">
        <path d="M44 228 L70 220 L78 230 L50 238 Z" />
        <path d="M520 232 L544 228 L546 238 L524 242 Z" />
      </g>

      {/* seabed mound the ship sank into */}
      <path
        d="M-30 232 C60 214 140 238 230 232 C320 226 420 246 590 230 V270 H-30 Z"
        fill="url(#wk-sand)"
      />
    </svg>
  );
}
