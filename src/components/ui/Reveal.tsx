"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export default function Reveal({
  children,
  delay = 0,
  className = "",
}: Props) {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{
        opacity: 0,
        y: 16,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
        margin: "0px 0px -60px 0px",
      }}
      transition={{
        duration: 0.55,
        delay,
        ease: easeOutExpo,
      }}
    >
      {children}
    </motion.div>
  );
}