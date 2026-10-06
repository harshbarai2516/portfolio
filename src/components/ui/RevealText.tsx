"use client";

import { motion } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
};

// Letters slide up from behind a mask; each letter lifts and turns red on hover.
export default function RevealText({
  text,
  className = "",
  delay = 0,
  stagger = 0.045,
}: Props) {
  return (
    <span
      aria-hidden
      className={`-my-[0.12em] inline-flex overflow-hidden py-[0.12em] ${className}`}
    >
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block cursor-default transition-colors duration-200 hover:text-accent"
          initial={{ y: "115%" }}
          animate={{ y: 0 }}
          whileHover={{ y: -6 }}
          transition={{ duration: 0.8, delay: delay + i * stagger, ease: easeOutExpo }}
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </span>
  );
}