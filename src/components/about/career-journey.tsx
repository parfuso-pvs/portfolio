"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  LazyMotion,
  MotionConfig,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import * as m from "motion/react-m";

import styles from "./career-journey.module.css";

export type CareerJourneyEntry = {
  body: string;
  context: string;
  end: { dateTime: string; label: string } | null;
  index: string;
  indexLabel: string;
  kind: "after-hours" | "full-time";
  name: string;
  roles: string;
  seriesLabel?: string;
  start: { dateTime: string; label: string };
};

type CareerJourneyProps = {
  entries: readonly CareerJourneyEntry[];
};

type JourneyLayout = {
  milestones: number[];
  trackLength: number;
  trackStart: number;
};

const loadDomAnimation = () =>
  import("@/components/motion/dom-animation-features").then((module) => module.default);

function CareerPeriod({ entry }: { entry: CareerJourneyEntry }) {
  return (
    <p className="type-mono text-muted mt-3">
      <time dateTime={entry.start.dateTime}>{entry.start.label}</time>
      <span aria-hidden="true"> — </span>
      {entry.end ? (
        <time dateTime={entry.end.dateTime}>{entry.end.label}</time>
      ) : (
        <span>Present</span>
      )}
    </p>
  );
}

export function CareerJourney({ entries }: CareerJourneyProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const journeyLayoutRef = useRef<JourneyLayout | null>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const journeyProgress = useMotionValue(0);
  const progressHeadY = useMotionValue(0);
  const trackLength = useMotionValue(0);
  const trackStart = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  const updateJourney = useCallback(
    (scrollPosition: number) => {
      const layout = journeyLayoutRef.current;
      if (!layout) return;

      const firstMilestone = layout.milestones[0];
      const lastMilestone = layout.milestones.at(-1);
      if (firstMilestone === undefined || lastMilestone === undefined) return;

      const anchor = scrollPosition + window.innerHeight * 0.5;
      const isAtPageEnd =
        scrollPosition + window.innerHeight >= document.documentElement.scrollHeight - 1;
      const effectiveAnchor = isAtPageEnd ? lastMilestone : anchor;
      const progress = Math.min(
        1,
        Math.max(0, (effectiveAnchor - firstMilestone) / layout.trackLength),
      );

      journeyProgress.set(progress);
      progressHeadY.set(layout.trackStart + progress * layout.trackLength);

      let nextActiveIndex = 0;
      layout.milestones.forEach((milestone, index) => {
        if (milestone <= effectiveAnchor) nextActiveIndex = index;
      });

      if (nextActiveIndex !== activeIndexRef.current) {
        activeIndexRef.current = nextActiveIndex;
        setActiveIndex(nextActiveIndex);
      }
    },
    [journeyProgress, progressHeadY],
  );

  useMotionValueEvent(scrollY, "change", updateJourney);

  useEffect(() => {
    const list = listRef.current;
    const items = itemRefs.current.filter((item): item is HTMLLIElement => item !== null);
    if (!list || items.length === 0) return;

    const measureJourney = () => {
      const scrollPosition = scrollY.get();
      const listBounds = list.getBoundingClientRect();
      const listTop = listBounds.top + scrollPosition;
      const milestones = items.map((item) => {
        const bounds = item.getBoundingClientRect();
        return bounds.top + scrollPosition + bounds.height / 2;
      });
      const firstMilestone = milestones[0];
      const lastMilestone = milestones.at(-1);
      if (firstMilestone === undefined || lastMilestone === undefined) return;

      const nextTrackStart = firstMilestone - listTop;
      const nextTrackLength = Math.max(1, lastMilestone - firstMilestone);

      journeyLayoutRef.current = {
        milestones,
        trackLength: nextTrackLength,
        trackStart: nextTrackStart,
      };
      trackStart.set(nextTrackStart);
      trackLength.set(nextTrackLength);
      updateJourney(scrollPosition);
    };

    const resizeObserver = new ResizeObserver(measureJourney);
    resizeObserver.observe(list);
    items.forEach((item) => resizeObserver.observe(item));
    window.addEventListener("resize", measureJourney);
    measureJourney();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measureJourney);
    };
  }, [scrollY, trackLength, trackStart, updateJourney]);

  const entryCount = String(entries.length).padStart(2, "0");

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadDomAnimation} strict>
        <div className="mt-12 lg:mt-16" data-career-journey>
          <div className="grid gap-5 border-y border-line-strong py-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
            <div className="flex items-center gap-4">
              <span className="registration-mark" aria-hidden="true" />
              <div>
                <p className="type-label text-accent">One chronology</p>
                <p className="type-mono text-muted mt-2">Career file / 01—{entryCount}</p>
              </div>
            </div>
            <div className="sm:text-right">
              <p className="type-label text-ink">Scroll to trace the work</p>
              <ul
                className="type-mono text-muted mt-2 flex flex-wrap gap-x-6 gap-y-3 sm:justify-end"
                aria-label="Timeline key"
              >
                <li className="flex items-center gap-2">
                  <span
                    className="border-accent h-2.5 w-2.5 rounded-pill border-2"
                    aria-hidden="true"
                  />
                  Full-time
                </li>
                <li className="flex items-center gap-2">
                  <span
                    className="border-accent h-2.5 w-2.5 rotate-45 border-2"
                    aria-hidden="true"
                  />
                  After hours
                </li>
              </ul>
            </div>
          </div>

          <div className="relative mx-auto max-w-[78rem]">
            <span
              className="absolute top-0 bottom-0 left-[0.375rem] w-px bg-line-strong lg:left-1/4"
              aria-hidden="true"
            />
            <m.span
              className={`${styles.progress} absolute top-0 left-[0.375rem] h-0 w-[3px] origin-top bg-accent shadow-[0_0_12px_color-mix(in_srgb,var(--blueprint)_30%,transparent)] will-change-transform lg:left-1/4`}
              data-career-progress
              style={{
                height: trackLength,
                scaleY: shouldReduceMotion ? 1 : journeyProgress,
                top: trackStart,
                x: -1,
              }}
              aria-hidden="true"
            />
            <m.span
              className={`${styles.progressHead} absolute top-0 left-[0.375rem] z-20 h-3.5 w-3.5 rounded-pill border-2 border-paper-raised bg-accent shadow-[0_0_0_2px_var(--blueprint),0_0_0_7px_var(--paper-canvas),0_0_20px_color-mix(in_srgb,var(--blueprint)_58%,transparent)] will-change-transform lg:left-1/4`}
              data-career-progress-head
              style={{ x: "-50%", y: progressHeadY }}
              aria-hidden="true"
            />

            <ol ref={listRef}>
              {entries.map((entry, index) => {
                const isActive = index === activeIndex;
                const isPast = index < activeIndex;
                const state = isActive ? "active" : isPast ? "past" : "future";
                const isAfterHours = entry.kind === "after-hours";

                return (
                  <li
                    key={entry.index}
                    ref={(item) => {
                      itemRefs.current[index] = item;
                    }}
                    aria-current={isActive ? "step" : undefined}
                    data-state={state}
                    className="relative isolate grid gap-6 border-b border-line py-11 pl-8 sm:pl-10 lg:min-h-[24rem] lg:grid-cols-12 lg:items-center lg:gap-6 lg:py-12 lg:pl-0"
                  >
                    <span
                      className={`absolute top-[3.45rem] left-[0.375rem] z-10 -translate-x-1/2 border-2 border-accent transition-[width,height,background-color,transform] duration-500 motion-reduce:transition-none lg:top-1/2 lg:left-1/4 lg:-translate-y-1/2 ${
                        isAfterHours ? "rotate-45" : "rounded-pill"
                      } ${
                        isActive
                          ? "h-[1.125rem] w-[1.125rem] bg-accent shadow-[0_0_0_5px_var(--paper-canvas),0_0_0_7px_var(--blueprint)]"
                          : isPast
                            ? "h-2.5 w-2.5 bg-accent"
                            : "h-2.5 w-2.5 bg-canvas"
                      }`}
                      aria-hidden="true"
                    />

                    <div className="lg:col-span-3 lg:pr-10 lg:text-right">
                      <p className={`type-mono ${isActive ? "text-accent" : "text-muted"}`}>
                        <span data-career-index>{entry.index}</span> / {entry.indexLabel}
                      </p>
                      <CareerPeriod entry={entry} />
                      <p
                        className={`type-label mt-4 ${isAfterHours || isActive ? "text-accent" : "text-muted"}`}
                      >
                        {entry.context}
                      </p>
                    </div>

                    <article
                      className={`relative overflow-hidden border px-6 py-7 transition-[transform,background-color,border-color,box-shadow] duration-500 motion-reduce:transition-none sm:px-8 lg:col-span-8 lg:col-start-5 lg:px-10 lg:py-9 ${
                        isActive
                          ? "translate-x-0 border-line-strong bg-paper-raised shadow-pinned lg:translate-x-4 lg:scale-[1.02]"
                          : "border-transparent bg-transparent shadow-none"
                      }`}
                    >
                      {isActive ? (
                        <>
                          {isAfterHours ? (
                            <span
                              className="material-blueprint pointer-events-none absolute inset-0 -z-10 border-0 opacity-55"
                              aria-hidden="true"
                            />
                          ) : null}
                          <span
                            className="absolute top-0 left-8 h-2 w-24 bg-accent lg:left-10"
                            aria-hidden="true"
                          />
                          <span
                            className="absolute top-7 bottom-7 left-0 w-1.5 bg-accent"
                            aria-hidden="true"
                          />
                        </>
                      ) : null}

                      <div className="grid gap-8 lg:grid-cols-8 lg:gap-6">
                        <div className="lg:col-span-3">
                          <p
                            className={`type-label mb-5 transition-colors duration-500 motion-reduce:transition-none ${isActive ? "text-accent" : "text-muted"}`}
                          >
                            {isActive
                              ? `In focus / ${entry.index} of ${entryCount}`
                              : `Chapter ${entry.index}`}
                          </p>
                          {entry.seriesLabel ? (
                            <p className="type-mono text-accent mb-3">{entry.seriesLabel}</p>
                          ) : null}
                          <h3
                            className={`type-heading text-[clamp(2.5rem,4vw,4.25rem)] transition-colors duration-500 motion-reduce:transition-none ${isActive || isPast ? "text-ink" : "text-muted"}`}
                          >
                            {entry.name}
                          </h3>
                        </div>

                        <div className="lg:col-span-4 lg:col-start-5 lg:pt-9">
                          <p
                            className={`type-label leading-[1.5] ${isActive ? "text-ink" : "text-muted"}`}
                          >
                            {entry.roles}
                          </p>
                          <p
                            className={`type-body-small mt-5 max-w-[58ch] ${isActive ? "text-ink" : "text-muted"}`}
                          >
                            {entry.body}
                          </p>
                        </div>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </LazyMotion>
    </MotionConfig>
  );
}
