"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { LazyMotion, MotionConfig, useReducedMotion, useScroll } from "motion/react";
import * as m from "motion/react-m";

import styles from "./career-thread.module.css";

const loadDomAnimation = () =>
  import("@/components/motion/dom-animation-features").then((module) => module.default);

export function CareerThreadMotion({ children }: Readonly<{ children: ReactNode }>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 72%", "end 62%"],
  });

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadDomAnimation} strict>
        <div ref={containerRef} className={styles.motionShell} data-career-thread>
          <svg
            className={styles.thread}
            viewBox="0 0 100 1000"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              className={styles.threadBase}
              d="M50 0 C76 90 24 180 50 270 C76 360 24 455 50 545 C76 640 24 735 50 820 C69 884 37 944 50 1000"
            />
            <m.path
              className={styles.threadProgress}
              d="M50 0 C76 90 24 180 50 270 C76 360 24 455 50 545 C76 640 24 735 50 820 C69 884 37 944 50 1000"
              style={{ pathLength: shouldReduceMotion ? 1 : scrollYProgress }}
            />
          </svg>
          {children}
        </div>
      </LazyMotion>
    </MotionConfig>
  );
}
