"use client";

import {
  LazyMotion,
  MotionConfig,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import * as m from "motion/react-m";
import type { PointerEvent, ReactNode } from "react";
import { useRef } from "react";

import styles from "./home-assembly-motion.module.css";

type HomeAssemblyMotionProps = {
  children: ReactNode;
  identityRail: ReactNode;
};

const spring = { damping: 24, mass: 0.45, stiffness: 180 };
const loadDomAnimation = () =>
  import("@/components/motion/dom-animation-features").then((module) => module.default);

export function HomeAssemblyMotion({ children, identityRail }: HomeAssemblyMotionProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const pointerBoundsRef = useRef<DOMRect | null>(null);
  const pointerScrollOriginRef = useRef({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, spring);
  const smoothY = useSpring(pointerY, spring);
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start end", "end start"],
  });

  const blueprintX = useTransform(smoothX, [-1, 1], [-7, 7]);
  const blueprintY = useTransform(smoothY, [-1, 1], [-5, 5]);
  const backsheetX = useTransform(smoothX, [-1, 1], [5, -5]);
  const backsheetY = useTransform(smoothY, [-1, 1], [4, -4]);
  const blueprintScroll = useTransform(scrollYProgress, [0.35, 0.8], [0, 18]);
  const backsheetScroll = useTransform(scrollYProgress, [0.35, 0.8], [0, 10]);
  const composedBlueprintY = useTransform(() => blueprintY.get() + blueprintScroll.get());
  const composedBacksheetY = useTransform(() => backsheetY.get() + backsheetScroll.get());

  function capturePointerBounds(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || shouldReduceMotion) return;

    pointerBoundsRef.current = event.currentTarget.getBoundingClientRect();
    pointerScrollOriginRef.current = { x: window.scrollX, y: window.scrollY };
  }

  function updatePointer(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || shouldReduceMotion) return;

    const bounds = pointerBoundsRef.current;
    if (!bounds) return;

    const left = bounds.left - (window.scrollX - pointerScrollOriginRef.current.x);
    const top = bounds.top - (window.scrollY - pointerScrollOriginRef.current.y);
    pointerX.set(((event.clientX - left) / bounds.width - 0.5) * 2);
    pointerY.set(((event.clientY - top) / bounds.height - 0.5) * 2);
  }

  function resetPointer() {
    pointerBoundsRef.current = null;
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadDomAnimation} strict>
        <div className="mx-auto grid w-full max-w-[90rem] gap-5 lg:grid-cols-[8.5rem_minmax(0,1fr)] lg:gap-7">
          <div
            className={`home-assembly-name ${styles.identity} flex items-end border-b border-line-strong pb-4 lg:justify-center lg:border-r lg:border-b-0 lg:pb-0`}
          >
            {identityRail}
          </div>

          <div
            ref={stageRef}
            className="relative isolate lg:min-h-[43rem]"
            data-motion-probe="home-assembly"
            onPointerEnter={capturePointerBounds}
            onPointerMove={updatePointer}
            onPointerLeave={resetPointer}
          >
            <m.div
              className="material-blueprint absolute top-4 -left-3 -z-10 h-[72%] w-[62%] -rotate-2 max-lg:top-3 max-lg:left-2 max-lg:h-[38%] max-lg:w-[92%]"
              aria-hidden="true"
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.992 }}
              animate={{ opacity: 1, scale: 1 }}
              style={shouldReduceMotion ? undefined : { x: blueprintX, y: composedBlueprintY }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            />
            <m.div
              className="material-sheet material-sheet-raised absolute right-1 bottom-2 -z-10 h-[58%] w-[68%] rotate-2 max-lg:right-2 max-lg:bottom-0 max-lg:h-[44%] max-lg:w-[88%]"
              aria-hidden="true"
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.992 }}
              animate={{ opacity: 1, scale: 1 }}
              style={shouldReduceMotion ? undefined : { x: backsheetX, y: composedBacksheetY }}
              transition={{ delay: 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className={`home-assembly-sheet-settle ${styles.sheet} relative z-0`}>
              {children}
            </div>
          </div>
        </div>
      </LazyMotion>
    </MotionConfig>
  );
}
