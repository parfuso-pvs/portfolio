import Link from "next/link";

import type { FeaturedProjectRecord } from "@/content/projects";

type CaseStudyNavigationProps = {
  currentProject: FeaturedProjectRecord;
  nextProject: FeaturedProjectRecord;
};

export function CaseStudyNavigation({ currentProject, nextProject }: CaseStudyNavigationProps) {
  const headingId = `${currentProject.id}-case-study-close`;

  return (
    <section className="px-page-gutter pb-page-gutter" aria-labelledby={headingId}>
      <div className="bg-media-backdrop text-media-foreground relative mx-auto w-full max-w-[90rem] overflow-hidden px-6 py-9 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-15 [background-image:linear-gradient(color-mix(in_srgb,var(--paper-raised)_18%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_srgb,var(--paper-raised)_18%,transparent)_1px,transparent_1px)] [background-size:4rem_4rem]"
          aria-hidden="true"
        />
        <span
          className="bg-accent absolute top-0 left-[12%] h-2 w-24 sm:left-[18%] sm:w-36"
          aria-hidden="true"
        />

        <div className="relative grid gap-14 lg:grid-cols-12 lg:gap-6">
          <header className="lg:col-span-3">
            <p className="type-label text-accent-on-dark">Case file complete</p>
            <p className="type-mono text-media-foreground/55 mt-3">
              {currentProject.indexLabel} / Filed
            </p>
          </header>

          <div className="lg:col-span-8 lg:col-start-5">
            <h2
              id={headingId}
              className="type-heading text-media-foreground max-w-[12ch] text-pretty"
            >
              One case complete. Another story ahead.
            </h2>

            <div className="border-media-foreground/20 mt-12 border-t pt-6 sm:mt-16">
              <p className="type-mono text-accent-on-dark">Next / {nextProject.indexLabel}</p>
              <Link
                href={nextProject.href}
                className="border-media-foreground/25 hover:border-accent-on-dark focus-visible:border-accent-on-dark active:border-accent-on-dark group mt-5 grid min-h-11 gap-8 border-b pb-7 transition-colors sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end"
              >
                <span>
                  <span className="type-heading text-media-foreground group-hover:text-accent-on-dark group-focus-visible:text-accent-on-dark group-active:text-accent-on-dark block transition-colors">
                    {nextProject.name}
                  </span>
                  <span className="type-body-small text-media-foreground/65 mt-4 block max-w-xl">
                    {nextProject.summary}
                  </span>
                </span>
                <span
                  className="type-mono text-accent-on-dark flex items-center gap-3 transition-transform group-hover:translate-x-1 group-focus-visible:translate-x-1 group-active:translate-x-1"
                  aria-hidden="true"
                >
                  Open case <span className="text-lg">→</span>
                </span>
              </Link>
            </div>

            <Link
              href="/work"
              className="type-label border-media-foreground/45 text-media-foreground hover:border-accent-on-dark hover:text-accent-on-dark focus-visible:border-accent-on-dark focus-visible:text-accent-on-dark active:text-media-foreground/70 mt-8 inline-flex min-h-11 items-center border-b py-3 transition-colors"
            >
              Return to work index
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
