"use client";

import { useEffect, useRef } from "react";

// Bubbles that follow the mouse, independent of the scroll thread:
//  - a loose ring of small bubbles orbits the pointer and trails it with a
//    springy lag (it swells when you hover a link or a button)
//  - moving the pointer sheds bubbles that wobble upward and pop
//  - clicking releases a burst
// One fixed canvas, one requestAnimationFrame loop. The loop sleeps when the
// pointer is idle and nothing is left to animate. Mouse and pen only: touch
// screens and "reduce motion" users get nothing.

type Bubble = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  phase: number;
  wob: number;
  age: number;
  life: number;
};

type Orbiter = {
  x: number;
  y: number;
  r: number;
  a: number; // current angle
  speed: number; // radians per second
  dist: number; // distance from the pointer
  lag: number; // 0..1, how quickly it catches up
};

const MAX_BUBBLES = 90;
const ORBITERS = 7;
const TAU = Math.PI * 2;

function drawBubble(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  alpha: number
) {
  ctx.globalAlpha = alpha;
  const g = ctx.createRadialGradient(x - r * 0.35, y - r * 0.4, r * 0.1, x, y, r);
  g.addColorStop(0, "rgba(255,255,255,0.55)");
  g.addColorStop(0.55, "rgba(190,245,255,0.10)");
  g.addColorStop(1, "rgba(190,245,255,0.02)");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, TAU);
  ctx.fill();

  ctx.lineWidth = 1.1;
  ctx.strokeStyle = "rgba(220,250,255,0.85)";
  ctx.beginPath();
  ctx.arc(x, y, r, 0, TAU);
  ctx.stroke();

  // the little glint
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.beginPath();
  ctx.arc(x - r * 0.38, y - r * 0.4, Math.max(r * 0.17, 0.6), 0, TAU);
  ctx.fill();
}

export default function CursorBubbles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const fine = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const mouse = { x: -200, y: -200, px: -200, py: -200, seen: false };
    let swell = 1; // 1 normally, bigger over interactive elements
    let swellTarget = 1;
    let lastMove = 0;
    let acc = 0; // distance travelled since the last bubble was shed
    let raf = 0;
    let last = 0;
    let running = false;

    const bubbles: Bubble[] = [];
    const orbiters: Orbiter[] = Array.from({ length: ORBITERS }, (_, i) => ({
      x: -200,
      y: -200,
      r: 2.2 + ((i * 5) % 4) * 1.1,
      a: (i / ORBITERS) * TAU,
      speed: (i % 2 ? 1 : -1) * (0.7 + (i % 3) * 0.35),
      dist: 20 + (i % 3) * 7,
      lag: 0.12 + (i % 4) * 0.035,
    }));

    const spawn = (x: number, y: number, burst = false) => {
      if (bubbles.length >= MAX_BUBBLES) bubbles.shift();
      const speed = burst ? 1.2 + Math.random() * 2.4 : 0.2 + Math.random() * 0.6;
      const dir = burst ? Math.random() * TAU : -Math.PI / 2 + (Math.random() - 0.5) * 1.2;
      bubbles.push({
        x: x + (Math.random() - 0.5) * 8,
        y: y + (Math.random() - 0.5) * 8,
        r: 1.8 + Math.random() * (burst ? 7 : 5),
        vx: Math.cos(dir) * speed,
        vy: Math.sin(dir) * speed,
        phase: Math.random() * TAU,
        wob: 0.4 + Math.random() * 0.9,
        age: 0,
        life: 1.4 + Math.random() * 1.6,
      });
    };

    const frame = (t: number) => {
      const dt = Math.min((t - last) / 1000 || 0.016, 0.05);
      last = t;
      ctx.clearRect(0, 0, w, h);

      swell += (swellTarget - swell) * Math.min(dt * 9, 1);

      // free bubbles: wobble up, slow down, pop
      for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i];
        b.age += dt;
        if (b.age >= b.life) {
          bubbles.splice(i, 1);
          continue;
        }
        b.vy -= 0.55 * dt; // buoyancy
        b.vx *= 1 - Math.min(dt * 1.6, 1);
        b.vy *= 1 - Math.min(dt * 0.7, 1);
        b.x += b.vx + Math.sin(b.age * 3.2 + b.phase) * b.wob * 0.35;
        b.y += b.vy;
        const k = b.age / b.life;
        // fade in quickly, swell and thin out as it pops
        const alpha = k < 0.1 ? k / 0.1 : 1 - Math.max(0, (k - 0.7) / 0.3);
        const grow = k > 0.88 ? 1 + (k - 0.88) * 5 : 1;
        drawBubble(ctx, b.x, b.y, b.r * grow, alpha * 0.9);
      }

      // the ring that surrounds the pointer
      if (mouse.seen) {
        const visible = Math.min(1, Math.max(0, 1 - (t - lastMove) / 4000 + 0.4));
        for (const o of orbiters) {
          o.a += o.speed * dt;
          const wobble = Math.sin(t / 700 + o.dist) * 2.5;
          const d = (o.dist + wobble) * swell;
          const tx = mouse.x + Math.cos(o.a) * d;
          const ty = mouse.y + Math.sin(o.a) * d * 0.92;
          o.x += (tx - o.x) * o.lag;
          o.y += (ty - o.y) * o.lag;
          drawBubble(ctx, o.x, o.y, o.r * (0.9 + (swell - 1) * 0.5), 0.85 * visible);
        }
      }
      ctx.globalAlpha = 1;

      const idle = t - lastMove > 4000 && bubbles.length === 0;
      if (idle) {
        running = false;
        ctx.clearRect(0, 0, w, h);
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    const wake = () => {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      if (!mouse.seen) {
        // first move: start the ring at the pointer instead of flying in
        mouse.seen = true;
        for (const o of orbiters) {
          o.x = e.clientX;
          o.y = e.clientY;
        }
      }
      mouse.px = mouse.x;
      mouse.py = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      lastMove = performance.now();

      acc += Math.hypot(mouse.x - mouse.px, mouse.y - mouse.py);
      while (acc > 26) {
        acc -= 26;
        spawn(mouse.x, mouse.y);
      }

      const el = e.target as Element | null;
      swellTarget = el?.closest?.("a, button, [role='button'], input, textarea, label")
        ? 1.7
        : 1;
      wake();
    };

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      for (let i = 0; i < 12; i++) spawn(e.clientX, e.clientY, true);
      lastMove = performance.now();
      wake();
    };

    const onLeave = () => {
      mouse.seen = false;
    };
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        running = false;
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("resize", resize);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("resize", resize);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[60]"
    />
  );
}
