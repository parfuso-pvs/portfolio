import type { ProjectRecord } from "@/content/projects";

import { MaterialSurface, RegistrationMark } from "@/components/ui/material-surface";
import { aboutContent } from "@/content/about";

type AboutNarrativeProps = {
  projects: readonly ProjectRecord[];
};

export function AboutNarrative({ projects }: AboutNarrativeProps) {
  return (
    <main id="main-content" tabIndex={-1} className="overflow-hidden">
      <section
        className="px-page-gutter pt-[clamp(9rem,16vw,14rem)] pb-section relative isolate"
        aria-labelledby="about-title"
      >
        <div
          className="material-blueprint absolute top-[10rem] right-[-9rem] -z-10 h-[38rem] w-[42rem] rotate-2 max-lg:hidden"
          aria-hidden="true"
        />

        <div className="mx-auto w-full max-w-[90rem] border-t border-line-strong pt-6">
          <header className="grid gap-12 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-3">
              <p className="type-label text-accent">{aboutContent.hero.eyebrow}</p>
              <p className="type-mono text-muted mt-3">{aboutContent.hero.index}</p>
            </div>
            <div className="lg:col-span-7 lg:col-start-5">
              <h1 id="about-title" className="type-display text-ink max-w-[10ch] text-balance">
                {aboutContent.hero.title}
              </h1>
              <p className="type-heading text-ink mt-10 max-w-[17ch] text-pretty">
                {aboutContent.hero.body}
              </p>
            </div>
          </header>

          <aside className="mt-16 grid gap-3 border-l border-accent pl-5 sm:ml-auto sm:w-80 lg:mt-24">
            <p className="type-heading text-ink text-[clamp(2.5rem,5vw,5rem)]">
              {aboutContent.hero.experience}
            </p>
            <p className="type-body-small text-muted max-w-[24ch]">
              {aboutContent.hero.experienceDetail}
            </p>
          </aside>
        </div>
      </section>

      <section className="px-page-gutter pb-section" aria-labelledby="about-through-line">
        <div className="mx-auto grid w-full max-w-[90rem] gap-8 border-t border-line-strong pt-6 lg:grid-cols-12 lg:gap-6">
          <MaterialSurface
            as="article"
            elevation="raised"
            className="relative px-6 py-10 sm:px-10 sm:py-14 lg:col-span-8 lg:px-14 lg:py-20"
          >
            <RegistrationMark className="top-4 right-4" />
            <p className="type-label text-accent">{aboutContent.thesis.eyebrow}</p>
            <h2
              id="about-through-line"
              className="type-heading text-ink mt-7 max-w-[13ch] text-pretty"
            >
              {aboutContent.thesis.title}
            </h2>
            <p className="type-body text-ink mt-8 max-w-2xl">{aboutContent.thesis.body}</p>
          </MaterialSurface>
          <aside
            className="material-vellum self-end px-6 py-7 lg:col-span-4 lg:mb-10 lg:-ml-10"
            aria-label="Portfolio philosophy"
          >
            <p className="type-label text-muted">Built as evidence</p>
            <p className="type-body-small text-ink mt-5">{aboutContent.thesis.note}</p>
          </aside>
        </div>
      </section>

      <section className="px-page-gutter pb-section" aria-labelledby="about-principles">
        <div className="bg-media-backdrop text-media-foreground relative mx-auto w-full max-w-[90rem] overflow-hidden px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-20">
          <div
            className="pointer-events-none absolute inset-0 opacity-15 [background-image:linear-gradient(color-mix(in_srgb,var(--paper-raised)_18%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_srgb,var(--paper-raised)_18%,transparent)_1px,transparent_1px)] [background-size:4rem_4rem]"
            aria-hidden="true"
          />
          <span
            className="bg-accent absolute top-0 left-[12%] h-2 w-24 sm:left-[18%] sm:w-36"
            aria-hidden="true"
          />

          <div className="relative grid gap-14 lg:grid-cols-12 lg:gap-6">
            <header className="lg:col-span-4">
              <p className="type-label text-accent-on-dark">How I work</p>
              <h2
                id="about-principles"
                className="type-heading text-media-foreground mt-7 max-w-[10ch] text-pretty"
              >
                Close to the problem. Responsible for the outcome.
              </h2>
            </header>
            <ol className="divide-media-foreground/20 border-media-foreground/20 lg:col-span-7 lg:col-start-6 lg:border-y lg:divide-y">
              {aboutContent.principles.map((principle) => (
                <li
                  key={principle.index}
                  className="border-media-foreground/20 grid gap-4 border-t py-7 first:border-t lg:grid-cols-[3rem_minmax(0,1fr)] lg:border-t-0 lg:first:border-t-0"
                >
                  <p className="type-mono text-accent-on-dark">{principle.index}</p>
                  <div>
                    <h3 className="type-heading text-media-foreground text-[clamp(2rem,3vw,3.5rem)]">
                      {principle.title}
                    </h3>
                    <p className="type-body-small text-media-foreground/65 mt-4 max-w-2xl">
                      {principle.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="px-page-gutter pb-section" aria-labelledby="about-contexts">
        <div className="mx-auto w-full max-w-[90rem] border-t border-line-strong pt-6">
          <header className="grid gap-8 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-3">
              <p className="type-label text-accent">{aboutContent.contexts.eyebrow}</p>
              <p className="type-mono text-muted mt-3">{aboutContent.contexts.index}</p>
            </div>
            <div className="lg:col-span-7 lg:col-start-5">
              <h2 id="about-contexts" className="type-heading text-ink max-w-[12ch] text-pretty">
                {aboutContent.contexts.title}
              </h2>
              <p className="type-body text-muted mt-7 max-w-2xl">{aboutContent.contexts.body}</p>
            </div>
          </header>

          <ol className="mt-16 divide-y divide-line border-y border-line-strong lg:mt-24">
            {projects.map((project, index) => (
              <li
                key={project.id}
                className="grid gap-5 py-8 sm:py-10 lg:grid-cols-12 lg:items-baseline lg:gap-6"
              >
                <p className="type-mono text-accent lg:col-span-2">
                  {String(index + 1).padStart(2, "0")} / {project.indexLabel}
                </p>
                <div className="lg:col-span-3">
                  <h3 className="type-heading text-ink text-[clamp(2rem,3vw,3.5rem)]">
                    {project.name}
                  </h3>
                  <p className="type-label text-muted mt-3">{project.role}</p>
                </div>
                <p className="type-body-small text-ink max-w-2xl lg:col-span-5 lg:col-start-8">
                  {project.summary}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
