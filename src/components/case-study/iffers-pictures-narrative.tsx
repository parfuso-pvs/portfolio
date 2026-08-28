import { iffersPicturesCaseStudy } from "@/content/case-studies/iffers-pictures";
import type { FeaturedProjectRecord } from "@/content/projects";

import { MaterialSurface, RegistrationMark } from "@/components/ui/material-surface";

type IffersPicturesProjectRecord = Extract<FeaturedProjectRecord, { id: "iffers-pictures" }>;

type IffersPicturesNarrativeProps = {
  project: IffersPicturesProjectRecord;
};

export function IffersPicturesNarrative({ project }: IffersPicturesNarrativeProps) {
  return (
    <div aria-label="Iffer's Pictures case-study chapters">
      <section className="px-page-gutter pb-section" aria-labelledby="iffers-origin">
        <div className="mx-auto grid w-full max-w-[90rem] gap-8 border-t border-line-strong pt-6 lg:grid-cols-12 lg:gap-6">
          <MaterialSurface
            as="article"
            elevation="raised"
            className="relative px-6 py-10 sm:px-10 sm:py-14 lg:col-span-8 lg:px-14 lg:py-20"
          >
            <RegistrationMark className="top-4 right-4" />
            <p className="type-label text-accent">{iffersPicturesCaseStudy.origin.eyebrow}</p>
            <h2 id="iffers-origin" className="type-heading text-ink mt-7 max-w-[13ch] text-pretty">
              {iffersPicturesCaseStudy.origin.title}
            </h2>
            <p className="type-body text-ink mt-8 max-w-2xl">
              {iffersPicturesCaseStudy.origin.body}
            </p>
          </MaterialSurface>

          <aside
            className="material-vellum self-end px-6 py-7 lg:col-span-4 lg:mb-10 lg:-ml-10"
            aria-label="Project attribution"
          >
            <p className="type-label text-muted">Gift / collaboration / authorship</p>
            <p className="type-body-small text-ink mt-5">{iffersPicturesCaseStudy.origin.note}</p>
            <p className="type-body-small text-muted mt-6 border-l border-accent pl-4">
              {project.attribution}
            </p>
          </aside>
        </div>
      </section>

      <section className="px-page-gutter pb-section" aria-labelledby="iffers-design-principles">
        <div className="mx-auto grid w-full max-w-[90rem] gap-12 border-t border-line-strong pt-6 lg:grid-cols-12 lg:gap-6">
          <header className="lg:col-span-3">
            <p className="type-label text-accent">Designing the frame</p>
            <p className="type-mono text-muted mt-3">Light / voice / rhythm</p>
          </header>

          <div className="lg:col-span-8 lg:col-start-5">
            <h2
              id="iffers-design-principles"
              className="type-heading text-ink max-w-[12ch] text-pretty"
            >
              The site should be felt before it is noticed.
            </h2>
            <ol className="mt-12 divide-y divide-line border-y border-line-strong sm:mt-16">
              {iffersPicturesCaseStudy.principles.map((principle) => (
                <li
                  key={principle.index}
                  className="grid gap-5 py-9 sm:grid-cols-[5rem_minmax(0,1fr)] sm:py-11"
                >
                  <p className="type-mono text-accent">{principle.index}</p>
                  <article>
                    <h3 className="type-heading text-ink text-[clamp(2rem,3vw,3.5rem)]">
                      {principle.title}
                    </h3>
                    <p className="type-body text-ink mt-6 max-w-3xl">{principle.body}</p>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="px-page-gutter pb-section" aria-labelledby="iffers-ownership">
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
            <header className="lg:col-span-7">
              <p className="type-label text-accent-on-dark">
                {iffersPicturesCaseStudy.ownership.eyebrow}
              </p>
              <h2
                id="iffers-ownership"
                className="type-heading text-media-foreground mt-7 max-w-[13ch] text-pretty"
              >
                {iffersPicturesCaseStudy.ownership.title}
              </h2>
              <p className="type-body text-media-foreground/75 mt-8 max-w-2xl">
                {iffersPicturesCaseStudy.ownership.body}
              </p>
              <p className="type-body-small text-media-foreground/60 mt-7 max-w-2xl border-l border-accent-on-dark pl-5">
                {iffersPicturesCaseStudy.ownership.note}
              </p>
            </header>

            <aside className="lg:col-span-4 lg:col-start-9" aria-label="Project scope">
              <p className="type-label text-accent-on-dark">Scope / 01—03</p>
              <ul className="mt-8 divide-y divide-media-foreground/20 border-y border-media-foreground/20">
                {project.approvedFeatures.map((feature, index) => (
                  <li key={feature} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-4 py-6">
                    <span className="type-mono text-accent-on-dark" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="type-body-small text-media-foreground/70">{feature}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className="px-page-gutter pb-section" aria-labelledby="iffers-proof">
        <div className="mx-auto grid w-full max-w-[90rem] gap-12 border-t border-line-strong pt-6 lg:grid-cols-12 lg:gap-6">
          <header className="lg:col-span-3">
            <p className="type-label text-accent">{iffersPicturesCaseStudy.closing.eyebrow}</p>
            <p className="type-mono text-muted mt-3">Direction / implementation</p>
          </header>

          <div className="lg:col-span-6 lg:col-start-5">
            <h2 id="iffers-proof" className="type-heading text-ink max-w-[13ch] text-pretty">
              {iffersPicturesCaseStudy.closing.title}
            </h2>
            <p className="type-body text-ink mt-7 max-w-2xl">
              {iffersPicturesCaseStudy.closing.body}
            </p>
          </div>

          <aside
            className="border-l border-accent pl-5 lg:col-span-2 lg:col-start-11"
            aria-label="Project proof"
          >
            <p className="type-label text-muted">Public result</p>
            <p className="type-body-small text-ink mt-4">{project.proofPoints[0]}</p>
          </aside>
        </div>
      </section>
    </div>
  );
}
