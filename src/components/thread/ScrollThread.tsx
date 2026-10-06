"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  buildThread,
  clamp,
  pointAtY,
  sampleSvgPath,
  type Sample,
} from "@/lib/thread";

type Layout = {
  w: number;
  h: number;
  d: string;
  nodes: { x: number; y: number }[];
  size0: number; // ball size while it is still the hero badge
  finalSize: number; // ball size while rolling
};

type Geometry = { samples: Sample[]; total: number; nodeLens: number[] };

const RING_TEXT = "SCROLL TO EXPLORE • SCROLL DOWN • ";
const RING_FONT = 15;
const RING_SPACING =
  (2 * Math.PI * 80) / RING_TEXT.length - RING_FONT * 0.6;

// Where on screen the ball sits while rolling (0 = top, 1 = bottom)
const ANCHOR = 0.55;

export default function ScrollThread({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLElement>(null);
  const baseRef = useRef<SVGPathElement>(null);
  const progRef = useRef<SVGPathElement>(null);
  const ballRef = useRef<HTMLAnchorElement>(null);
  const rollerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGSVGElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const spotRef = useRef<HTMLSpanElement>(null);
  const nodeRefs = useRef<(SVGCircleElement | null)[]>([]);
  const geomRef = useRef<Geometry | null>(null);
  const layoutRef = useRef<Layout | null>(null);

  const [layout, setLayout] = useState<Layout | null>(null);

  // 1. Measure the page and build the path
  const measure = useCallback(() => {
    const c = containerRef.current;
    if (!c) return;

    const hero = c.querySelector<HTMLElement>("[data-thread-start]");
    const stopEls = Array.from(
      c.querySelectorAll<HTMLElement>("[data-thread-node]")
    );
    if (!hero || stopEls.length === 0) {
      setLayout(null);
      return;
    }

    const cTop = c.getBoundingClientRect().top;
    const w = c.offsetWidth;
    const h = c.offsetHeight;
    const wide = w >= 1280;
    const size0 = w < 640 ? 96 : 112;
    const finalSize = wide ? 40 : 22;

    const heroBottom = hero.getBoundingClientRect().bottom - cTop;
    const start = { x: w / 2, y: heroBottom - 24 - size0 / 2 };

    const stops = stopEls.map((el) => {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return {
        top: r.top - cTop,
        bottom: r.bottom - cTop,
        padTop: parseFloat(cs.paddingTop) || 0,
        padBottom: parseFloat(cs.paddingBottom) || 0,
      };
    });

    const { d, nodes } = buildThread({ width: w, start, stops, wide });

    setLayout((prev) =>
      prev &&
      prev.d === d &&
      prev.w === w &&
      prev.h === h &&
      prev.size0 === size0
        ? prev
        : { w, h, d, nodes, size0, finalSize }
    );
  }, []);

  useEffect(() => {
    let raf = 0;
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };

    schedule();
    const ro = new ResizeObserver(schedule);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", schedule);
    document.fonts?.ready.then(schedule); // fonts change section heights

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", schedule);
    };
  }, [measure]);

  // 2. Move the ball and draw the thread for the current scroll position
  const update = useCallback(() => {
    const g = geomRef.current;
    const c = containerRef.current;
    const L = layoutRef.current;
    const ball = ballRef.current;
    const roller = rollerRef.current;
    const ring = ringRef.current;
    const core = coreRef.current;
    const arrow = arrowRef.current;
    const spot = spotRef.current;
    const prog = progRef.current;
    if (!g || !c || !L || !ball || !roller || !ring || !core || !arrow || !spot || !prog)
      return;

    const anchorY = window.innerHeight * ANCHOR - c.getBoundingClientRect().top;
    const p = pointAtY(g.samples, anchorY);

    // 0 = still the hero badge, 1 = fully a rolling ball
    const detach = clamp((anchorY - g.samples[0].y) / 180, 0, 1);
    const finalScale = L.finalSize / L.size0;
    const scale = 1 - (1 - finalScale) * detach;

    ball.style.visibility = "visible";
    ball.style.transform = `translate3d(${p.x - L.size0 / 2}px, ${p.y - L.size0 / 2}px, 0) scale(${scale})`;
    ball.style.pointerEvents = detach < 0.05 ? "auto" : "none";

    // real rolling: rotation follows distance travelled
    roller.style.transform = `rotate(${(p.l / (Math.PI * L.finalSize)) * 360}deg)`;

    ring.style.opacity = String(1 - clamp(detach * 2.2, 0, 1));
    core.style.inset = `${29 * (1 - detach)}%`;
    core.style.borderWidth = `${2 / scale}px`;
    arrow.style.opacity = String(1 - clamp(detach * 3, 0, 1));
    spot.style.opacity = String(clamp(detach * 2 - 0.4, 0, 1));

    prog.style.strokeDashoffset = String(g.total - p.l);

    g.nodeLens.forEach((len, i) => {
      const el = nodeRefs.current[i];
      if (el) el.style.fill = p.l >= len ? "var(--accent)" : "var(--paper)";
    });
  }, []);

  // 3. After the path is rendered, sample it
  useEffect(() => {
    layoutRef.current = layout;
    const path = baseRef.current;
    if (!layout || !path) {
      geomRef.current = null;
      return;
    }

    const { samples, total } = sampleSvgPath(path);
    const nodeLens = layout.nodes.map((n) => pointAtY(samples, n.y).l);
    geomRef.current = { samples, total, nodeLens };

    if (progRef.current) progRef.current.style.strokeDasharray = String(total);
    update();
  }, [layout, update]);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [update]);

  return (
    <main ref={containerRef} className="relative">
      {layout && (
        <svg
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 z-0"
          width={layout.w}
          height={layout.h}
          viewBox={`0 0 ${layout.w} ${layout.h}`}
          fill="none"
        >
          {/* stitches ahead of the ball */}
          <path
            ref={baseRef}
            d={layout.d}
            stroke="var(--ink)"
            strokeOpacity={0.28}
            strokeWidth={1.5}
            strokeDasharray="2 9"
            strokeLinecap="round"
          />
          {/* thread already pulled */}
          <path
            ref={progRef}
            d={layout.d}
            stroke="var(--accent)"
            strokeWidth={2.5}
            strokeLinecap="round"
            style={{ strokeDasharray: 100000, strokeDashoffset: 100000 }}
          />
          {layout.nodes.map((n, i) => (
            <circle
              key={i}
              ref={(el) => {
                nodeRefs.current[i] = el;
              }}
              cx={n.x}
              cy={n.y}
              r={6}
              stroke="var(--ink)"
              strokeWidth={2}
              style={{ fill: "var(--paper)", transition: "fill 0.3s" }}
            />
          ))}
        </svg>
      )}

      <div className="relative z-10">{children}</div>

      {layout && (
        <a
          ref={ballRef}
          href="#profile"
          aria-label="Scroll to profile"
          className="absolute left-0 top-0 z-20 block"
          style={{
            width: layout.size0,
            height: layout.size0,
            visibility: "hidden",
            willChange: "transform",
          }}
        >
          <div ref={rollerRef} className="relative h-full w-full">
            <svg
              ref={ringRef}
              viewBox="0 0 200 200"
              aria-hidden
              className="ring-spin absolute inset-0 h-full w-full"
            >
              <defs>
                <path
                  id="thread-ring"
                  d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0"
                />
              </defs>
              <text
                className="fill-ink font-mono"
                fontSize={RING_FONT}
                letterSpacing={RING_SPACING}
              >
                <textPath href="#thread-ring">{RING_TEXT}</textPath>
              </text>
            </svg>

            <div
              ref={coreRef}
              className="absolute grid place-items-center rounded-full border-ink bg-accent text-paper"
              style={{ inset: "29%", borderWidth: 2 }}
            >
              <span ref={arrowRef} className="text-xl leading-none">
                ↓
              </span>
              <span
                ref={spotRef}
                aria-hidden
                className="absolute left-1/2 top-[12%] h-[18%] w-[18%] -translate-x-1/2 rounded-full bg-paper opacity-0"
              />
            </div>
          </div>
        </a>
      )}
    </main>
  );
}