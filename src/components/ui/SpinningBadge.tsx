"use client";

import { motion } from "framer-motion";

type Props = {
  href: string;
  text?: string;
  icon?: string;
  label?: string;
  className?: string; // controls the size
};

const RADIUS = 80;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const FONT_SIZE = 15;
const CHAR_WIDTH = FONT_SIZE * 0.6; // monospace letter width

export default function SpinningBadge({
  href,
  text = "AVAILABLE FOR HIRE • OPEN TO WORK • ",
  icon = "↗",
  label = "Contact me",
  className = "h-32 w-32",
}: Props) {
  // spreads the letters evenly so the text fills the whole circle
  const letterSpacing = CIRCUMFERENCE / text.length - CHAR_WIDTH;

  return (
    <a
      href={href}
      aria-label={label}
      className={`group relative block ${className}`}
    >
      <motion.svg
        viewBox="0 0 200 200"
        className="h-full w-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        <defs>
          <path
            id="badge-circle"
            d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0"
          />
        </defs>
        <text
          className="fill-ink font-mono"
          fontSize={FONT_SIZE}
          letterSpacing={letterSpacing}
        >
          <textPath href="#badge-circle">{text}</textPath>
        </text>
      </motion.svg>

      <span className="absolute inset-0 grid place-items-center">
        <span className="grid h-[42%] w-[42%] place-items-center rounded-full bg-accent text-xl text-paper transition-transform duration-300 group-hover:scale-110">
          {icon}
        </span>
      </span>
    </a>
  );
}