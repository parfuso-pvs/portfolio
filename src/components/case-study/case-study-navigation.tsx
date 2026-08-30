import Link from "next/link";

import type { FeaturedProjectRecord } from "@/content/projects";

type CaseStudyNavigationProps = {
  currentProject: FeaturedProjectRecord;
  nextProject: FeaturedProjectRecord;
  tone?: "dark" | "quiet";
};

export function CaseStudyNavigation({
  currentProject,
  nextProject,
  tone = "dark",
}: CaseStudyNavigationProps) {
  const headingId = `${currentProject.id}-case-study-close`;
  const quiet = tone === "quiet";

  return (
    <section className="px-page-gutter pb-page-gutter" aria-labelledby={headingId}>
      <div
        className={`mx-auto w-full max-w-[90rem] overflow-hidden rounded-[clamp(2rem,6vw,5rem)] px-6 py-9 sm:px-10 sm:py-12 lg:px-14 lg:py-16 ${
          quiet ? "bg-paper-deep text-ink" : "bg-media-backdrop text-media-foreground"
        }`}
      >
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-6">
          <header className="lg:col-span-3">
            <p className={`type-label ${quiet ? "text-accent" : "text-accent-on-dark"}`}>
              Case file complete
            </p>
            <p className={`type-mono mt-3 ${quiet ? "text-muted" : "text-media-foreground/55"}`}>
              {currentProject.indexLabel} / Filed
            </p>
          </header>

          <div className="lg:col-span-8 lg:col-start-5">
            <h2
              id={headingId}
              className={`type-heading max-w-[12ch] text-pretty ${quiet ? "text-ink" : "text-media-foreground"}`}
            >
              One case complete. Another story ahead.
            </h2>

            <div
              className={`mt-12 border-t pt-6 sm:mt-16 ${quiet ? "border-line-strong" : "border-media-foreground/20"}`}
            >
              <p className={`type-mono ${quiet ? "text-accent" : "text-accent-on-dark"}`}>
                Next / {nextProject.indexLabel}
              </p>
              <Link
                href={nextProject.href}
                className={`group mt-5 grid min-h-11 gap-8 border-b pb-7 transition-colors sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end ${
                  quiet
                    ? "border-line-strong hover:border-accent focus-visible:border-accent active:border-accent-strong"
                    : "border-media-foreground/25 hover:border-accent-on-dark focus-visible:border-accent-on-dark active:border-accent-on-dark"
                }`}
              >
                <span>
                  <span
                    className={`type-heading block transition-colors ${
                      quiet
                        ? "text-ink group-hover:text-accent group-focus-visible:text-accent group-active:text-accent-strong"
                        : "text-media-foreground group-hover:text-accent-on-dark group-focus-visible:text-accent-on-dark group-active:text-accent-on-dark"
                    }`}
                  >
                    {nextProject.name}
                  </span>
                  <span
                    className={`type-body-small mt-4 block max-w-xl ${quiet ? "text-muted" : "text-media-foreground/65"}`}
                  >
                    {nextProject.summary}
                  </span>
                </span>
                <span
                  className={`type-mono flex items-center gap-3 transition-transform group-hover:translate-x-1 group-focus-visible:translate-x-1 group-active:translate-x-1 ${quiet ? "text-accent" : "text-accent-on-dark"}`}
                  aria-hidden="true"
                >
                  Open case <span className="text-lg">→</span>
                </span>
              </Link>
            </div>

            <Link
              href={`/#experience-${currentProject.id}`}
              transitionTypes={["career-return"]}
              className={`type-label mt-8 inline-flex min-h-11 items-center border-b py-3 transition-colors ${
                quiet
                  ? "border-line-strong text-ink hover:border-accent hover:text-accent focus-visible:border-accent focus-visible:text-accent active:text-accent-strong"
                  : "border-media-foreground/45 text-media-foreground hover:border-accent-on-dark hover:text-accent-on-dark focus-visible:border-accent-on-dark focus-visible:text-accent-on-dark active:text-media-foreground/70"
              }`}
            >
              Return to the journey
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
