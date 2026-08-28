"use client";

import { LazyMotion, MotionConfig, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";

import styles from "./memx-diagram-trace.module.css";

type MemxDiagramTraceProps = {
  tone: "dark" | "light";
  variant: "configuration" | "realtime";
};

type TracePath = {
  d: string;
  delay: number;
};

const loadDomAnimation = () =>
  import("@/components/motion/dom-animation-features").then((module) => module.default);

const configurationDesktopPaths: readonly TracePath[] = [
  { d: "M80 150 H260", delay: 0 },
  { d: "M260 150 V58 H430 M260 150 V242 H430", delay: 0.16 },
  { d: "M430 58 H550 V150 M430 242 H550 V150", delay: 0.34 },
  { d: "M550 150 H1120", delay: 0.5 },
];

const configurationMobilePaths: readonly TracePath[] = [
  { d: "M18 18 V582", delay: 0 },
  { d: "M18 154 H56 M18 286 H56 M18 418 H56 M18 550 H56", delay: 0.28 },
];

const realtimeDesktopPaths: readonly TracePath[] = [
  { d: "M30 24 H1170", delay: 0 },
  { d: "M258 24 V54 M486 24 V54 M714 24 V54 M942 24 V54", delay: 0.38 },
];

const realtimeMobilePaths: readonly TracePath[] = [
  { d: "M18 16 V584", delay: 0 },
  { d: "M18 128 H52 M18 242 H52 M18 356 H52 M18 470 H52", delay: 0.34 },
];

const pathVariants = {
  hidden: { pathLength: 0 },
  visible: (delay: number) => ({
    pathLength: 1,
    transition: { delay, duration: 0.72, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

function TraceSvg({
  className,
  paths,
  viewBox,
}: {
  className: string;
  paths: readonly TracePath[];
  viewBox: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <m.svg
      className={`${styles.trace} ${className}`}
      viewBox={viewBox}
      preserveAspectRatio="none"
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ amount: 0.35, once: true }}
    >
      {paths.map((path) => (
        <m.path
          key={path.d}
          d={path.d}
          custom={path.delay}
          variants={pathVariants}
          fill="none"
          stroke="currentColor"
          strokeLinecap="square"
          strokeLinejoin="miter"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </m.svg>
  );
}

export function MemxDiagramTrace({ tone, variant }: MemxDiagramTraceProps) {
  const desktopPaths =
    variant === "configuration" ? configurationDesktopPaths : realtimeDesktopPaths;
  const mobilePaths = variant === "configuration" ? configurationMobilePaths : realtimeMobilePaths;

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadDomAnimation} strict>
        <div
          className={`${styles.layer} ${tone === "dark" ? "text-accent-on-dark" : "text-accent"}`}
          aria-hidden="true"
          data-diagram-trace={variant}
        >
          <TraceSvg className="hidden lg:block" paths={desktopPaths} viewBox="0 0 1200 300" />
          <TraceSvg className="block lg:hidden" paths={mobilePaths} viewBox="0 0 600 600" />
        </div>
      </LazyMotion>
    </MotionConfig>
  );
}
