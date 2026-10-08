// The surface: hazy sky, a low sun, and three layers of waves. The bottom wave
// is the exact colour the water has in the ticker band below, so the hero melts
// straight into the sea.

// Two identical periods of 1200 units, so a -50% slide loops with no seam.
function wave(y: number, amp: number) {
  let d = `M0,${y}`;
  for (let k = 0; k < 2; k++) {
    const x = k * 1200;
    d += ` C${x + 200},${y - amp} ${x + 400},${y - amp} ${x + 600},${y}`;
    d += ` C${x + 800},${y + amp} ${x + 1000},${y + amp} ${x + 1200},${y}`;
  }
  return `${d} L2400,160 L0,160 Z`;
}

const layers = [
  { cls: "wave wave-3", fill: "#8fd6e8", opacity: 0.8, d: wave(56, 26) },
  { cls: "wave wave-2", fill: "#4cb8d6", opacity: 0.92, d: wave(86, 22) },
  { cls: "wave", fill: "#1b8cb4", opacity: 1, d: wave(114, 18) },
];

export default function HeroBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* sky */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #f7fdfe 0%, #d9f3f8 52%, #a9e0ee 100%)",
        }}
      />

      {/* low sun */}
      <div
        className="absolute right-[6%] top-[8%] h-[28rem] w-[28rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,248,214,0.95) 0%, rgba(255,240,190,0.5) 32%, rgba(255,240,190,0) 68%)",
        }}
      />

      {/* wispy clouds */}
      <div
        className="absolute left-[-6%] top-[22%] h-24 w-[26rem] rounded-full opacity-70 blur-2xl"
        style={{ background: "#ffffff" }}
      />
      <div
        className="absolute right-[18%] top-[48%] h-20 w-[20rem] rounded-full opacity-60 blur-2xl"
        style={{ background: "#ffffff" }}
      />

      {/* waves */}
      <div className="absolute inset-x-0 bottom-0 h-28 sm:h-40">
        {layers.map((l, i) => (
          <svg
            key={i}
            viewBox="0 0 2400 160"
            preserveAspectRatio="none"
            className={`${l.cls} absolute bottom-0 left-0 h-full w-[200%]`}
          >
            <path d={l.d} fill={l.fill} fillOpacity={l.opacity} />
          </svg>
        ))}
      </div>
    </div>
  );
}
