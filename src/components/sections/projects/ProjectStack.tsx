"use client";

import { useRef, useSyncExternalStore } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type { Project } from "@/types";
import Reveal from "@/components/ui/Reveal";
import FeaturedCard from "./FeatureCard";

// Stacking needs room: each card has to fit the screen. On small or short
// screens the cards simply scroll past one after another instead.
const QUERY = "(min-width: 1100px) and (min-height: 720px)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
const getSnapshot = () => window.matchMedia(QUERY).matches;
const getServerSnapshot = () => false;

type CardProps = {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
};

function StackedCard({ project, index, total, progress }: CardProps) {
  const last = index === total - 1;
  const span = Math.max(total - 1, 1);

  // The scroll window in which the NEXT card slides up over this one. This card
  // shrinks, rises and fades to nothing inside it, so it is gone before it is
  // fully covered and can never peek out from behind.
  const from = index / span;
  const to = (index + 1) / span;
  const input = last
    ? [0, 0.5, 1]
    : [from, from + (to - from) * 0.5, from + (to - from) * 0.9];

  const opacity = useTransform(progress, input, last ? [1, 1, 1] : [1, 0.55, 0]);
  const scale = useTransform(progress, input, last ? [1, 1, 1] : [1, 0.965, 0.9]);
  const y = useTransform(progress, input, last ? [0, 0, 0] : [0, -14, -44]);

  return (
    <div className="sticky top-0 flex h-svh items-center pb-8 pt-24">
      <motion.div
        style={{ opacity, scale, y }}
        className="w-full origin-top will-change-transform"
      >
        <FeaturedCard project={project} index={index} total={total} />
      </motion.div>
    </div>
  );
}

// useScroll needs its target element to exist on the very first render, so it
// lives in its own component that is only mounted once stacking is on.
function StackLayout({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={ref} style={{ height: `${projects.length * 100}svh` }}>
      {projects.map((p, i) => (
        <StackedCard
          key={p.slug}
          project={p}
          index={i}
          total={projects.length}
          progress={scrollYProgress}
        />
      ))}
    </div>
  );
}

export default function ProjectStack({ projects }: { projects: Project[] }) {
  const stacking = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!stacking) {
    return (
      <div className="space-y-10">
        {projects.map((p, i) => (
          <Reveal key={p.slug}>
            <FeaturedCard project={p} index={i} total={projects.length} />
          </Reveal>
        ))}
      </div>
    );
  }

  return <StackLayout projects={projects} />;
}
