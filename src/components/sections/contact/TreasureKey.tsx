"use client";

import { useEffect, useRef, useState } from "react";

type Phase = "idle" | "flying" | "surfacing";

// A brass key lying on the seabed beside the wreck. Click it and it flies to
// the chest, the chest opens, and you are carried back up to the profile.
// Position it with className (it needs `absolute` plus left/top).
export default function TreasureKey({ className = "" }: { className?: string }) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const timers = useRef<number[]>([]);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((t) => window.clearTimeout(t));
  }, []);

  function unlockChest() {
    if (phase !== "idle") return;
    const btn = btnRef.current;
    const chest = document.querySelector<HTMLElement>("[data-thread-end]");

    // fly toward the lock, which sits about half way across the chest
    if (btn && chest) {
      const a = btn.getBoundingClientRect();
      const c = chest.getBoundingClientRect();
      btn.style.setProperty("--kx", `${c.left + c.width * 0.5 - (a.left + a.width / 2)}px`);
      btn.style.setProperty("--ky", `${c.top + c.height * 0.58 - (a.top + a.height / 2)}px`);
    }
    setPhase("flying");

    // 1. the key lands: the chest opens
    later(() => chest?.setAttribute("data-unlocked", "true"), 900);
    // 2. swim back up to the profile
    later(() => {
      setPhase("surfacing");
      document
        .getElementById("profile")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 1500);
    // 3. reset, ready for the next visitor
    later(() => {
      chest?.removeAttribute("data-unlocked");
      setPhase("idle");
    }, 4200);
  }

  const flying = phase !== "idle";

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={unlockChest}
      aria-label="Use the key to open the chest and swim back up to the profile"
      className={`group grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full outline-offset-4 ${className}`}
      style={{
        transform: flying
          ? "translate(var(--kx, 0px), var(--ky, 0px)) rotate(-24deg) scale(0.5)"
          : undefined,
        opacity: phase === "surfacing" ? 0 : 1,
        transition:
          phase === "idle"
            ? "opacity 0.4s ease"
            : "transform 0.9s cubic-bezier(0.55, 0, 0.25, 1), opacity 0.4s ease 0.9s",
      }}
    >
      <span className="key-glow key-bob block">
        <svg viewBox="0 0 64 64" width="44" height="44" aria-hidden fill="none">
          <defs>
            <linearGradient id="key-gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ffe9a8" />
              <stop offset="1" stopColor="#c9921f" />
            </linearGradient>
          </defs>
          {/* bow (the ring you hold) */}
          <circle cx="16" cy="32" r="11" stroke="url(#key-gold)" strokeWidth="5" />
          <circle cx="16" cy="32" r="4" fill="#9a6a12" fillOpacity="0.5" />
          {/* shaft */}
          <rect x="26" y="29.5" width="34" height="5" rx="2.5" fill="url(#key-gold)" />
          {/* bit (the teeth) */}
          <rect x="46" y="34" width="5" height="10" rx="1.5" fill="url(#key-gold)" />
          <rect x="54" y="34" width="5" height="7" rx="1.5" fill="url(#key-gold)" />
        </svg>
      </span>

      <span className="pointer-events-none absolute left-1/2 top-full mt-0.5 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.2em] text-[#ffe29a] opacity-70 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
        {flying ? "Surfacing…" : "Take the key"}
      </span>
    </button>
  );
}
