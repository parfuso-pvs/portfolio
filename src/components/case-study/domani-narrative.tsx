import { domaniCaseStudy } from "@/content/case-studies/domani";
import type { FeaturedProjectRecord } from "@/content/projects";

type DomaniProjectRecord = Extract<FeaturedProjectRecord, { id: "domani" }>;

type DomaniNarrativeProps = {
  project: DomaniProjectRecord;
};

export function DomaniNarrative({ project }: DomaniNarrativeProps) {
  return (
    <div aria-label="Domani case-study chapters">
      <section className="px-page-gutter pb-section" aria-labelledby="domani-origin">
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
              <p className="type-label text-accent-on-dark">{domaniCaseStudy.origin.eyebrow}</p>
              <h2
                id="domani-origin"
                className="type-heading text-media-foreground mt-7 max-w-[13ch] text-pretty"
              >
                {domaniCaseStudy.origin.title}
              </h2>
              <p className="type-body text-media-foreground/75 mt-8 max-w-2xl">
                {domaniCaseStudy.origin.body}
              </p>
            </header>

            <aside
              className="border-media-foreground/25 self-end border-l pl-5 lg:col-span-4 lg:col-start-9"
              aria-label="Product intent"
            >
              <p className="type-label text-accent-on-dark">Product / learning loop</p>
              <p className="type-body-small text-media-foreground/65 mt-5">
                {domaniCaseStudy.origin.intent}
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="px-page-gutter pb-section" aria-labelledby="domani-planning-loop">
        <div className="mx-auto grid w-full max-w-[90rem] gap-12 border-t border-line-strong pt-6 lg:grid-cols-12 lg:gap-6">
          <header className="lg:col-span-3">
            <p className="type-label text-accent">The planning loop</p>
            <p className="type-mono text-muted mt-3">Evening / priority / progress</p>
          </header>

          <div className="lg:col-span-8 lg:col-start-5">
            <h2
              id="domani-planning-loop"
              className="type-heading text-ink max-w-[12ch] text-pretty"
            >
              Make tomorrow concrete before it becomes urgent.
            </h2>
            <ol className="mt-12 divide-y divide-line border-y border-line-strong sm:mt-16">
              {domaniCaseStudy.principles.map((principle) => (
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

      <section className="px-page-gutter pb-section" aria-labelledby="domani-ownership">
        <div className="material-blueprint mx-auto grid w-full max-w-[90rem] gap-12 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-12 lg:gap-6 lg:px-14 lg:py-20">
          <header className="lg:col-span-7">
            <p className="type-label text-accent">{domaniCaseStudy.ownership.eyebrow}</p>
            <h2
              id="domani-ownership"
              className="type-heading text-ink mt-7 max-w-[14ch] text-pretty"
            >
              {domaniCaseStudy.ownership.title}
            </h2>
            <p className="type-body text-ink mt-8 max-w-2xl">{domaniCaseStudy.ownership.body}</p>
          </header>
          <aside
            className="material-vellum self-end px-6 py-7 lg:col-span-4 lg:col-start-9"
            aria-label="Learning note"
          >
            <p className="type-label text-muted">Build / release / learn</p>
            <p className="type-body-small text-ink mt-5">{domaniCaseStudy.ownership.note}</p>
          </aside>
        </div>
      </section>

      <section className="px-page-gutter pb-section" aria-labelledby="domani-product-boundary">
        <div className="mx-auto grid w-full max-w-[90rem] gap-12 border-t border-line-strong pt-6 lg:grid-cols-12 lg:gap-6">
          <header className="lg:col-span-3">
            <p className="type-label text-accent">{domaniCaseStudy.boundary.eyebrow}</p>
            <p className="type-mono text-muted mt-3">Shipped / exploring</p>
          </header>

          <div className="lg:col-span-8 lg:col-start-5">
            <h2
              id="domani-product-boundary"
              className="type-heading text-ink max-w-[14ch] text-pretty"
            >
              {domaniCaseStudy.boundary.title}
            </h2>

            <div className="mt-12 grid gap-10 sm:mt-16 md:grid-cols-2 md:gap-6">
              <section className="border-t border-accent pt-5" aria-labelledby="domani-shipped">
                <h3 id="domani-shipped" className="type-label text-accent">
                  Available now
                </h3>
                <ul className="mt-7 space-y-4">
                  {project.approvedFeatures.map((feature) => (
                    <li key={feature} className="type-body-small text-ink flex gap-3">
                      <span className="text-accent" aria-hidden="true">
                        ●
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </section>

              <section
                className="border-t border-line-strong pt-5"
                aria-labelledby="domani-roadmap"
              >
                <h3 id="domani-roadmap" className="type-label text-muted">
                  In exploration
                </h3>
                <ul className="mt-7 space-y-4">
                  {project.roadmap.map((feature) => (
                    <li key={feature} className="type-body-small text-muted flex gap-3">
                      <span aria-hidden="true">○</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <p className="type-body-small text-muted mt-10 max-w-2xl border-l border-line-strong pl-4">
              {domaniCaseStudy.boundary.note}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
