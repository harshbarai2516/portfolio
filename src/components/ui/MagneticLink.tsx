"use client";

import type { MouseEvent, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Props = { href: string; children: ReactNode; className?: string };

// A link that is gently pulled toward the cursor.
export default function MagneticLink({ href, children, className = "" }: Props) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 200, damping: 15 });
  const y = useSpring(rawY, { stiffness: 200, damping: 15 });

  function onMove(e: MouseEvent<HTMLAnchorElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - (r.left + r.width / 2)) * 0.3);
    rawY.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  }

  function reset() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <motion.a
      href={href}
      style={{ x, y }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={className}
    >
      {children}
    </motion.a>
  );
}