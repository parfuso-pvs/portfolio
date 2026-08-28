"use client";

import { useEffect, useRef, useState } from "react";

export type CareerJourneyEntry = {
  body: string;
  context: string;
  end: { dateTime: string; label: string } | null;
  index: string;
  indexLabel: string;
  kind: "after-hours" | "full-time";
  name: string;
  roles: string;
  start: { dateTime: string; label: string };
};

type CareerJourneyProps = {
  entries: readonly CareerJourneyEntry[];
};

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
  const listRef = useRef<HTMLOListElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let animationFrame = 0;

    const updateJourney = () => {
      animationFrame = 0;

      const list = listRef.current;
      const progress = progressRef.current;

      if (!list || !progress) return;

      const anchor = window.innerHeight * 0.5;
      const listBounds = list.getBoundingClientRect();
      const journeyProgress = Math.min(
        1,
        Math.max(0, (anchor - listBounds.top) / listBounds.height),
      );

      progress.style.transform = `scaleY(${journeyProgress})`;

      let nextActiveIndex = 0;

      itemRefs.current.forEach((item, index) => {
        if (!item) return;

        const bounds = item.getBoundingClientRect();
        const milestone = bounds.top + bounds.height / 2;

        if (milestone <= anchor) nextActiveIndex = index;
      });

      if (nextActiveIndex !== activeIndexRef.current) {
        activeIndexRef.current = nextActiveIndex;
        setActiveIndex(nextActiveIndex);
      }
    };

    const scheduleUpdate = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(updateJourney);
    };

    updateJourney();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="mt-16 lg:mt-24">
      <div className="grid gap-5 border-y border-line-strong py-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <div className="flex items-center gap-4">
          <span className="registration-mark" aria-hidden="true" />
          <div>
            <p className="type-label text-accent">One chronology</p>
            <p className="type-mono text-muted mt-2">Career file / 01—04</p>
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
              <span className="border-accent h-2.5 w-2.5 rotate-45 border-2" aria-hidden="true" />
              After hours
            </li>
          </ul>
        </div>
      </div>

      <ol ref={listRef} className="relative mx-auto max-w-[78rem]">
        <span
          className="absolute top-0 bottom-0 left-[0.375rem] w-px bg-line-strong lg:left-1/4"
          aria-hidden="true"
        />
        <span
          ref={progressRef}
          className="absolute top-0 bottom-0 left-[0.375rem] w-px origin-top bg-accent [transform:scaleY(0)] will-change-transform lg:left-1/4"
          aria-hidden="true"
        />

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
              className="relative isolate grid gap-8 border-b border-line py-16 pl-8 sm:pl-10 lg:min-h-[34rem] lg:grid-cols-12 lg:items-center lg:gap-6 lg:py-20 lg:pl-0"
            >
              <span
                className={`absolute top-[4.35rem] left-[0.375rem] z-10 -translate-x-1/2 border-2 border-accent transition-[width,height,background-color,transform] duration-500 motion-reduce:transition-none lg:top-1/2 lg:left-1/4 lg:-translate-y-1/2 ${
                  isAfterHours ? "rotate-45" : "rounded-pill"
                } ${
                  isActive
                    ? "h-4 w-4 bg-paper-raised shadow-[0_0_0_5px_var(--paper-canvas)]"
                    : isPast
                      ? "h-2.5 w-2.5 bg-accent"
                      : "h-2.5 w-2.5 bg-canvas"
                }`}
                aria-hidden="true"
              />

              <div className="lg:col-span-3 lg:pr-10 lg:text-right">
                <p className={`type-mono ${isActive ? "text-accent" : "text-muted"}`}>
                  {entry.index} / {entry.indexLabel}
                </p>
                <CareerPeriod entry={entry} />
                <p
                  className={`type-label mt-4 ${isAfterHours || isActive ? "text-accent" : "text-muted"}`}
                >
                  {entry.context}
                </p>
              </div>

              <article
                className={`relative overflow-hidden border px-6 py-8 transition-[transform,background-color,border-color,box-shadow] duration-700 motion-reduce:transition-none sm:px-8 lg:col-span-8 lg:col-start-5 lg:px-10 lg:py-12 ${
                  isActive
                    ? "translate-x-0 border-line-strong bg-paper-raised shadow-pinned lg:translate-x-3"
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
                      className="absolute top-8 bottom-8 left-0 w-1.5 bg-accent"
                      aria-hidden="true"
                    />
                  </>
                ) : null}

                <div className="grid gap-8 lg:grid-cols-8 lg:gap-6">
                  <div className="lg:col-span-3">
                    <p
                      className={`type-label mb-5 transition-colors duration-500 motion-reduce:transition-none ${isActive ? "text-accent" : "text-muted"}`}
                    >
                      {isActive ? `In focus / ${entry.index} of 04` : `Chapter ${entry.index}`}
                    </p>
                    <h3
                      className={`type-heading text-[clamp(2.75rem,4.5vw,5rem)] transition-colors duration-500 motion-reduce:transition-none ${isActive ? "text-ink" : "text-muted"}`}
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
  );
}
