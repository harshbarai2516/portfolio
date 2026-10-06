"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";

type Props = { children: ReactNode; delay?: number; className?: string };

export default function Reveal({ children, delay = 0, className = "" }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: easeOutExpo }}
    >
      {children}
    </motion.div>
  );
}