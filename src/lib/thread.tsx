export type Sample = { x: number; y: number; l: number };

export type StopRect = {
  top: number;
  bottom: number;
  padTop: number;
  padBottom: number;
};

type BuildInput = {
  width: number;
  start: { x: number; y: number };
  stops: StopRect[];
  wide: boolean;
};

export const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

// Builds the SVG path the ball follows: hero -> section 1 -> section 2 ...
export function buildThread({ width, start, stops, wide }: BuildInput) {
  const contentLeft = (width - Math.min(width, 1152)) / 2 + 24;
  const leftX = Math.max(30, contentLeft - 52);
  const rightX = width - leftX;
  const railX = 12;

  let d = `M ${start.x} ${start.y}`;
  let px = start.x;
  let py = start.y;
  const nodes: { x: number; y: number }[] = [];

  stops.forEach((s, k) => {
    const x = wide ? (k % 2 === 0 ? leftX : rightX) : railX;
    const enterY = s.top + s.padTop * 0.6;
    const leaveY = s.bottom - s.padBottom * 0.6;
    const dy = Math.max(enterY - py, 1);

    if (x !== px) {
      // S-curve with vertical tangents: slanting swoop between sides
      d += ` C ${px} ${py + dy / 2} ${x} ${enterY - dy / 2} ${x} ${enterY}`;
    } else {
      d += ` L ${x} ${enterY}`;
    }
    d += ` L ${x} ${leaveY}`;

    px = x;
    py = leaveY;
    nodes.push({ x, y: s.top + s.padTop + 14 });
  });

  return { d, nodes };
}

// Turns the path into a lookup table so scrolling stays cheap.
export function sampleSvgPath(path: SVGPathElement) {
  const total = path.getTotalLength();
  const count = Math.max(200, Math.ceil(total / 4));
  const samples: Sample[] = [];
  for (let i = 0; i <= count; i++) {
    const l = (i / count) * total;
    const p = path.getPointAtLength(l);
    samples.push({ x: p.x, y: p.y, l });
  }
  return { samples, total };
}

// The path only ever goes downward, so a screen height maps to one point.
export function pointAtY(samples: Sample[], y: number): Sample {
  const first = samples[0];
  const last = samples[samples.length - 1];
  if (y <= first.y) return first;
  if (y >= last.y) return last;

  let lo = 0;
  let hi = samples.length - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (samples[mid].y < y) lo = mid;
    else hi = mid;
  }
  const a = samples[lo];
  const b = samples[hi];
  const t = b.y === a.y ? 0 : (y - a.y) / (b.y - a.y);
  return { x: a.x + (b.x - a.x) * t, y, l: a.l + (b.l - a.l) * t };
}