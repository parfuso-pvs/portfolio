import { memxCaseStudy } from "@/content/case-studies/memx";

export function MemxNarrative() {
  return (
    <div aria-label="MEMX case-study chapters">
      <section className="px-page-gutter pb-section" aria-labelledby="memx-operating-surface">
        <div className="bg-media-backdrop text-media-foreground relative mx-auto grid w-full max-w-[90rem] overflow-hidden px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-12 lg:gap-6 lg:px-14 lg:py-20">
          <div
            className="pointer-events-none absolute inset-0 opacity-15 [background-image:linear-gradient(color-mix(in_srgb,var(--paper-raised)_18%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_srgb,var(--paper-raised)_18%,transparent)_1px,transparent_1px)] [background-size:4rem_4rem]"
            aria-hidden="true"
          />
          <header className="relative lg:col-span-7">
            <p className="type-label text-accent-on-dark">{memxCaseStudy.brief.eyebrow}</p>
            <h2
              id="memx-operating-surface"
              className="type-heading text-media-foreground mt-7 max-w-[13ch] text-pretty"
            >
              {memxCaseStudy.brief.title}
            </h2>
            <p className="type-body text-media-foreground/75 mt-8 max-w-2xl">
              {memxCaseStudy.brief.body}
            </p>
            <p className="type-body-small text-media-foreground/60 mt-6 max-w-2xl border-l border-accent-on-dark pl-5">
              {memxCaseStudy.brief.audience}
            </p>
          </header>

          <dl className="relative mt-16 divide-y divide-media-foreground/20 border-y border-media-foreground/20 lg:col-span-4 lg:col-start-9 lg:mt-0">
            {memxCaseStudy.marketScale.map((metric) => (
              <div key={metric.value} className="grid grid-cols-[5rem_minmax(0,1fr)] gap-5 py-7">
                <dt className="contents">
                  <span className="type-numeric text-accent-on-dark row-span-2">
                    {metric.value}
                  </span>
                  <span className="type-label text-media-foreground self-end">{metric.label}</span>
                </dt>
                <dd className="type-body-small text-media-foreground/60 col-start-2">
                  {metric.detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="px-page-gutter pb-section" aria-labelledby="memx-evolution">
        <div className="mx-auto grid w-full max-w-[90rem] gap-12 border-t border-line-strong pt-6 lg:grid-cols-12 lg:gap-6">
          <header className="lg:col-span-3">
            <p className="type-label text-accent">Role evolution</p>
            <p className="type-mono text-muted mt-3">Frontend foundation / full stack</p>
          </header>

          <div className="lg:col-span-8 lg:col-start-5">
            <h2 id="memx-evolution" className="type-heading text-ink max-w-[12ch] text-pretty">
              The responsibility grew with the platform.
            </h2>
            <ol className="mt-12 divide-y divide-line border-y border-line-strong sm:mt-16">
              {memxCaseStudy.phases.map((phase) => (
                <li
                  key={phase.index}
                  className="grid gap-5 py-9 sm:grid-cols-[5rem_minmax(0,1fr)] sm:py-11"
                >
                  <p className="type-mono text-accent">{phase.index}</p>
                  <article>
                    <h3 className="type-heading text-ink text-[clamp(2rem,3vw,3.5rem)]">
                      {phase.title}
                    </h3>
                    <p className="type-body text-ink mt-6 max-w-3xl">{phase.body}</p>
                    <p className="type-body-small text-muted mt-5 max-w-3xl border-l border-line-strong pl-4">
                      {phase.detail}
                    </p>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="px-page-gutter pb-section" aria-labelledby="memx-scaling-decision">
        <div className="material-blueprint mx-auto grid w-full max-w-[90rem] gap-12 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-12 lg:gap-6 lg:px-14 lg:py-20">
          <header className="lg:col-span-7">
            <p className="type-label text-accent">{memxCaseStudy.architecture.eyebrow}</p>
            <h2
              id="memx-scaling-decision"
              className="type-heading text-ink mt-7 max-w-[14ch] text-pretty"
            >
              {memxCaseStudy.architecture.title}
            </h2>
            <p className="type-body text-ink mt-8 max-w-2xl">{memxCaseStudy.architecture.body}</p>
          </header>
          <aside
            className="material-vellum self-end px-6 py-7 lg:col-span-4 lg:col-start-9"
            aria-label="Evolution note"
          >
            <p className="type-label text-muted">Refactor / repeat</p>
            <p className="type-body-small text-ink mt-5">{memxCaseStudy.architecture.note}</p>
          </aside>
        </div>
      </section>

      <section className="px-page-gutter pb-section" aria-labelledby="memx-production-practice">
        <div className="mx-auto grid w-full max-w-[90rem] gap-12 border-t border-line-strong pt-6 lg:grid-cols-12 lg:gap-6">
          <header className="lg:col-span-3">
            <p className="type-label text-accent">{memxCaseStudy.operatingPractice.eyebrow}</p>
          </header>
          <div className="lg:col-span-5 lg:col-start-5">
            <h2 id="memx-production-practice" className="type-heading text-ink max-w-[12ch]">
              {memxCaseStudy.operatingPractice.title}
            </h2>
            <p className="type-body text-ink mt-7">{memxCaseStudy.operatingPractice.body}</p>
          </div>
          <aside className="border-l border-accent pl-5 lg:col-span-3" aria-label="Team context">
            <p className="type-label text-muted">Team context</p>
            <p className="type-body-small text-ink mt-4">{memxCaseStudy.operatingPractice.team}</p>
          </aside>
        </div>
      </section>
    </div>
  );
}
