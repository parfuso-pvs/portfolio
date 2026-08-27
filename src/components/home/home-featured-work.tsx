import Link from "next/link";

import { ProjectIndexCard } from "@/components/work/project-index-card";
import type { FeaturedProjectRecord } from "@/content/projects";

type DomaniProjectRecord = Extract<FeaturedProjectRecord, { id: "domani" }>;
type IffersProjectRecord = Extract<FeaturedProjectRecord, { id: "iffers-pictures" }>;

type HomeFeaturedWorkProps = {
  projects: readonly [DomaniProjectRecord, IffersProjectRecord];
};

export function HomeFeaturedWork({ projects }: HomeFeaturedWorkProps) {
  return (
    <section
      className="px-page-gutter pb-section relative isolate pt-20 sm:pt-28"
      aria-labelledby="home-featured-work-title"
    >
      <div className="mx-auto w-full max-w-[90rem]">
        <header className="grid gap-8 border-t border-line-strong pt-6 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-3">
            <p className="type-label text-accent">Selected work / 02—03</p>
            <p className="type-mono text-muted mt-3">Independent / end to end</p>
          </div>
          <div className="md:col-span-7 md:col-start-5">
            <h2
              id="home-featured-work-title"
              className="type-heading text-ink max-w-[15ch] text-pretty"
            >
              Built independently. Shaped end to end.
            </h2>
            <p className="type-body text-muted mt-7 max-w-2xl border-l border-accent pl-5">
              {projects[0].name} extends product engineering into mobile. {projects[1].name} brings
              design, copy, and code under one creative direction.
            </p>
          </div>
        </header>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:mt-24 lg:grid-cols-12 lg:items-start">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={index === 0 ? "lg:col-span-5" : "lg:col-span-7 lg:col-start-6 lg:mt-40"}
            >
              <ProjectIndexCard project={project} sequence={index} />
            </div>
          ))}
        </div>

        <footer className="mt-16 flex flex-col gap-5 border-t border-line-strong pt-5 sm:mt-24 sm:flex-row sm:items-center sm:justify-between">
          <p className="type-mono text-muted">More context / process / outcomes</p>
          <Link
            href="/work"
            className="type-label text-ink min-h-11 self-start border-b border-ink py-3 transition-colors hover:text-accent focus-visible:text-accent active:text-accent-strong sm:self-auto"
          >
            Open the full work index
          </Link>
        </footer>
      </div>
    </section>
  );
}
