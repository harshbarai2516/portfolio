"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";

type Props = { words: string[]; interval?: number; className?: string };

export default function RotatingWord({
  words,
  interval = 2400,
  className = "",
}: Props) {
  const [index, setIndex] = useState(0);
  const widest = words.reduce((a, b) => (b.length > a.length ? b : a), "");

  useEffect(() => {
    if (words.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    <span className={`relative inline-block align-bottom ${className}`}>
      {/* invisible widest word reserves space so the layout never jumps */}
      <span className="invisible" aria-hidden>
        {widest}
      </span>

      <AnimatePresence initial={false}>
        <motion.span
          key={words[index]}
          className="absolute left-0 top-0"
          initial={{ y: "45%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-45%", opacity: 0 }}
          transition={{ duration: 0.45, ease: easeOutExpo }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>

      {/* hand-drawn underline */}
      <svg
        aria-hidden
        className="absolute -bottom-2 left-0 h-3 w-full"
        viewBox="0 0 200 12"
        preserveAspectRatio="none"
        fill="none"
      >
        <motion.path
          d="M2 8 Q 22 0 42 8 T 82 8 T 122 8 T 162 8 T 198 8"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 1.3, ease: "easeInOut" }}
        />
      </svg>
    </span>
  );
}