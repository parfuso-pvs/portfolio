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

type HomeAssemblyMotionProps = {
  children: ReactNode;
};

const spring = { damping: 24, mass: 0.45, stiffness: 180 };
const loadDomAnimation = () =>
  import("@/components/motion/dom-animation-features").then((module) => module.default);

export function HomeAssemblyMotion({ children }: HomeAssemblyMotionProps) {
  const stageRef = useRef<HTMLDivElement>(null);
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

  function updatePointer(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || shouldReduceMotion) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 2);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 2);
  }

  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadDomAnimation} strict>
        <div
          ref={stageRef}
          className="relative isolate lg:min-h-[43rem]"
          data-motion-probe="home-assembly"
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
          {children}
        </div>
      </LazyMotion>
    </MotionConfig>
  );
}
