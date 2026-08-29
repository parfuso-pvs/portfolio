import type { ReactNode } from "react";
import Link from "next/link";

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
        className="px-page-gutter pt-[clamp(9rem,16vw,14rem)] pb-section relative isolate"
        aria-labelledby="case-study-title"
      >
        <div
          className="material-blueprint absolute top-[11rem] right-[-8rem] -z-10 h-[34rem] w-[38rem] rotate-2 max-lg:hidden"
          aria-hidden="true"
        />

        <div className="mx-auto w-full max-w-[90rem]">
          <header className="flex items-center justify-between gap-6 border-b border-line-strong pb-5">
            <p className="type-mono text-muted">Case file / {caseNumber}</p>
            <Link
              href="/work"
              transitionTypes={["route-back"]}
              className="type-label text-ink min-h-11 border-b border-ink py-3 transition-colors hover:text-accent focus-visible:text-accent active:text-accent-strong"
            >
              Back to work index
            </Link>
          </header>

          <div className="mt-12 grid gap-16 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-7">
              <p className="type-label text-accent">
                {project.discipline} / {project.role}
              </p>
              <h1
                id="case-study-title"
                className="type-display text-ink mt-7 max-w-[9ch] text-balance"
              >
                {project.name}
              </h1>
              <p className="type-heading text-ink mt-10 max-w-[16ch] text-pretty">
                {project.summary}
              </p>
            </div>

            <div className="lg:col-span-4 lg:col-start-9 lg:pt-12">
              <div className="material-sheet material-sheet-raised relative px-6 py-7 sm:px-8 sm:py-9">
                <span className="bg-accent absolute top-0 left-0 h-2 w-24" aria-hidden="true" />
                <span className="registration-mark absolute top-5 right-5" aria-hidden="true" />
                <p className="type-mono text-muted">Artifact note / {caseNumber}</p>
                <p className="type-quote text-ink mt-12 max-w-[12ch]">
                  {artifactStatement ?? project.artifactCopy.primaryLabel}
                </p>
                {secondaryLabel ? (
                  <div className="mt-12 border-t border-line pt-4">
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
        <div className="mx-auto grid w-full max-w-[90rem] gap-12 border-t border-line-strong pt-6 lg:grid-cols-12 lg:gap-6">
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
            <aside className="border-l border-accent pl-5 lg:col-span-3" aria-label="Attribution">
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
