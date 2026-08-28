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
  seriesLabel?: string;
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
  const progressHeadRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let animationFrame = 0;

    const updateJourney = () => {
      animationFrame = 0;

      const list = listRef.current;
      const progressHead = progressHeadRef.current;
      const progress = progressRef.current;

      if (!list || !progress || !progressHead) return;

      const anchor = window.innerHeight * 0.5;
      const listBounds = list.getBoundingClientRect();
      const firstItem = itemRefs.current[0];
      const lastItem = itemRefs.current.at(-1);

      if (!firstItem || !lastItem) return;

      const firstBounds = firstItem.getBoundingClientRect();
      const lastBounds = lastItem.getBoundingClientRect();
      const firstMilestone = firstBounds.top + firstBounds.height / 2;
      const lastMilestone = lastBounds.top + lastBounds.height / 2;
      const trackStart = firstMilestone - listBounds.top;
      const trackLength = Math.max(1, lastMilestone - firstMilestone);
      const isAtPageEnd =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1;
      const effectiveAnchor = isAtPageEnd ? lastMilestone : anchor;
      const journeyProgress = Math.min(
        1,
        Math.max(0, (effectiveAnchor - firstMilestone) / trackLength),
      );

      progress.style.top = `${trackStart}px`;
      progress.style.height = `${trackLength}px`;
      progress.style.transform = `scaleY(${journeyProgress})`;
      progressHead.style.transform = `translate(-50%, ${trackStart + journeyProgress * trackLength}px)`;

      let nextActiveIndex = 0;

      itemRefs.current.forEach((item, index) => {
        if (!item) return;

        const bounds = item.getBoundingClientRect();
        const milestone = bounds.top + bounds.height / 2;

        if (milestone <= effectiveAnchor) nextActiveIndex = index;
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

  const entryCount = String(entries.length).padStart(2, "0");

  return (
    <div className="mt-12 lg:mt-16">
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
          className="absolute top-0 left-[0.375rem] h-0 w-[3px] -translate-x-px origin-top bg-accent shadow-[0_0_12px_color-mix(in_srgb,var(--blueprint)_30%,transparent)] [transform:scaleY(0)] will-change-transform lg:left-1/4"
          aria-hidden="true"
        />
        <span
          ref={progressHeadRef}
          className="absolute top-0 left-[0.375rem] z-20 h-3.5 w-3.5 rounded-pill border-2 border-paper-raised bg-accent shadow-[0_0_0_2px_var(--blueprint),0_0_0_7px_var(--paper-canvas),0_0_20px_color-mix(in_srgb,var(--blueprint)_58%,transparent)] [transform:translate(-50%,0)] will-change-transform lg:left-1/4"
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
  );
}
