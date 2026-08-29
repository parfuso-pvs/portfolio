import type { Metadata } from "next";

import { BackToJourney } from "@/components/layout/back-to-journey";
import { ProjectIndexCard } from "@/components/work/project-index-card";
import { featuredProjects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected systems, products, and independent work by Phil Arfuso.",
};

export default function WorkPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="px-page-gutter overflow-hidden pt-7 pb-section sm:pt-9"
    >
      <header className="mx-auto flex min-h-11 w-full max-w-[90rem] items-center justify-between gap-6">
        <p className="type-label text-ink">Phil Arfuso</p>
        <BackToJourney />
      </header>

      <section
        className="mx-auto mt-[clamp(4rem,9vw,8rem)] w-full max-w-[90rem]"
        aria-labelledby="work-index-title"
      >
        <header className="grid gap-8 border-t border-line-strong pt-6 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-3">
            <p className="type-label text-accent">Selected work / 01—03</p>
          </div>
          <div className="md:col-span-8 md:col-start-5">
            <h1 id="work-index-title" className="type-display text-ink max-w-5xl text-balance">
              Work Index
            </h1>
            <p className="type-heading text-ink mt-8 max-w-4xl text-pretty">
              Systems built for consequential decisions. Products shaped to feel clear, useful, and
              human.
            </p>
            <p className="type-body text-muted mt-8 max-w-2xl border-l border-accent pl-5">
              Three case studies spanning exchange infrastructure, independent product development,
              and photography-led web design.
            </p>
          </div>
        </header>

        <div className="mt-20 grid grid-cols-1 gap-5 lg:grid-cols-12 lg:items-start lg:gap-6">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className={
                project.id === "memx"
                  ? "lg:col-span-7"
                  : project.id === "domani"
                    ? "lg:col-span-5 lg:mt-28"
                    : "lg:col-span-8 lg:col-start-3 lg:mt-10"
              }
            >
              <ProjectIndexCard project={project} sequence={index} />
            </div>
          ))}
        </div>

        <footer className="mt-24 grid gap-5 border-t border-line-strong pt-5 sm:grid-cols-2">
          <p className="type-label text-muted">Three projects / one evolving practice</p>
          <p className="type-mono text-muted sm:text-right">
            Full-stack engineering / product thinking / visual craft
          </p>
        </footer>
      </section>
    </main>
  );
}
