import type { ReactNode } from "react";

import { BackToJourney } from "@/components/layout/back-to-journey";
import { CareerChapterTitle } from "@/components/motion/career-chapter-title";
import type { FeaturedProjectRecord } from "@/content/projects";

type CaseStudyFrameProps = {
  children?: ReactNode;
  project: FeaturedProjectRecord;
};

export function CaseStudyFrame({ children, project }: CaseStudyFrameProps) {
  const caseNumber = project.indexLabel.replace("Case ", "");
  const artifactStatement =
    "statement" in project.artifactCopy ? project.artifactCopy.statement : undefined;
  const secondaryLabel =
    "secondaryLabel" in project.artifactCopy ? project.artifactCopy.secondaryLabel : undefined;
  const secondaryDetail =
    "secondaryDetail" in project.artifactCopy ? project.artifactCopy.secondaryDetail : undefined;

  return (
    <main id="main-content" tabIndex={-1} className="overflow-hidden">
      <section
        className="px-page-gutter pt-7 pb-section sm:pt-9"
        aria-labelledby="case-study-title"
      >
        <div className="mx-auto w-full max-w-[90rem]">
          <header className="flex items-center justify-between gap-6">
            <p className="type-label text-ink">Phil Arfuso</p>
            <BackToJourney projectId={project.id} />
          </header>

          <div className="mt-[clamp(4rem,9vw,8rem)] grid gap-16 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-7">
              <p className="type-mono text-muted">Case / {caseNumber}</p>
              <p className="type-label text-accent">
                {project.discipline} / {project.role}
              </p>
              <CareerChapterTitle projectId={project.id}>
                <h1
                  id="case-study-title"
                  className="type-display text-ink mt-7 max-w-[9ch] text-balance"
                >
                  {project.name}
                </h1>
              </CareerChapterTitle>
              <p className="type-heading text-ink mt-10 max-w-[16ch] text-pretty">
                {project.summary}
              </p>
            </div>

            <div className="lg:col-span-4 lg:col-start-9 lg:pt-12">
              <div className="rounded-[1.5rem] border border-line/70 bg-paper-raised px-6 py-7 shadow-sheet sm:px-8 sm:py-9">
                <p className="type-mono text-accent">In this chapter</p>
                <p className="type-quote text-ink mt-9 max-w-[12ch]">
                  {artifactStatement ?? project.artifactCopy.primaryLabel}
                </p>
                {secondaryLabel ? (
                  <div className="mt-10">
                    <p className="type-label text-accent">{secondaryLabel}</p>
                    {secondaryDetail ? (
                      <p className="type-body-small text-ink mt-2">{secondaryDetail}</p>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-page-gutter pb-section" aria-labelledby="case-study-foundation">
        <div className="mx-auto grid w-full max-w-[90rem] gap-12 lg:grid-cols-12 lg:gap-6">
          <header className="lg:col-span-3">
            <p className="type-label text-accent">At a glance</p>
            <p className="type-mono text-muted mt-3">Foundation / context</p>
          </header>

          <div className="grid gap-12 lg:col-span-8 lg:col-start-5 lg:grid-cols-8 lg:gap-6">
            <div className="lg:col-span-5">
              <h2 id="case-study-foundation" className="type-heading text-ink max-w-[12ch]">
                What this work represents.
              </h2>
              <p className="type-body text-ink mt-7 max-w-2xl">{project.ownership}</p>
            </div>
            <aside
              className="rounded-[1.25rem] bg-paper/70 px-5 py-6 lg:col-span-3"
              aria-label="Attribution"
            >
              <p className="type-label text-muted">Attribution</p>
              <p className="type-body-small text-ink mt-4">{project.attribution}</p>
            </aside>
          </div>
        </div>
      </section>

      {children}
    </main>
  );
}
