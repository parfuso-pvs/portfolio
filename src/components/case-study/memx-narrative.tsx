import { memxCaseStudy } from "@/content/case-studies/memx";

export function MemxNarrative() {
  return (
    <div aria-label="MEMX case-study chapters">
      <section className="px-page-gutter pb-section" aria-labelledby="memx-operating-surface">
        <div className="mx-auto grid w-full max-w-[90rem] gap-12 lg:grid-cols-12 lg:gap-6">
          <header className="lg:col-span-7 lg:col-start-5">
            <p className="type-label text-accent">{memxCaseStudy.brief.eyebrow}</p>
            <h2
              id="memx-operating-surface"
              className="type-heading text-ink mt-7 max-w-[13ch] text-pretty"
            >
              {memxCaseStudy.brief.title}
            </h2>
            <p className="type-body text-ink mt-8 max-w-2xl">{memxCaseStudy.brief.body}</p>
            <p className="type-body-small text-muted mt-6 max-w-2xl">
              {memxCaseStudy.brief.audience}
            </p>
          </header>

          <dl className="grid gap-4 lg:col-span-7 lg:col-start-5 lg:mt-8 sm:grid-cols-2">
            {memxCaseStudy.marketScale.map((metric) => (
              <div key={metric.value} className="rounded-[1.25rem] bg-paper-raised px-6 py-7">
                <dt>
                  <span className="type-numeric text-accent block">{metric.value}</span>
                  <span className="type-label text-ink mt-5 block">{metric.label}</span>
                </dt>
                <dd className="type-body-small text-muted mt-3">{metric.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="px-page-gutter pb-section" aria-labelledby="memx-evolution">
        <div className="mx-auto grid w-full max-w-[90rem] gap-12 lg:grid-cols-12 lg:gap-6">
          <header className="lg:col-span-3">
            <p className="type-label text-accent">Role evolution</p>
            <p className="type-mono text-muted mt-3">Frontend foundation / full stack</p>
          </header>

          <div className="lg:col-span-8 lg:col-start-5">
            <h2 id="memx-evolution" className="type-heading text-ink max-w-[12ch] text-pretty">
              The responsibility grew with the platform.
            </h2>
            <ol className="mt-12 grid gap-5 sm:mt-16">
              {memxCaseStudy.phases.map((phase) => (
                <li
                  key={phase.index}
                  className="grid gap-5 rounded-[1.25rem] bg-paper-raised px-6 py-7 sm:grid-cols-[4rem_minmax(0,1fr)] sm:px-8 sm:py-9"
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
        <div className="bg-accent mx-auto grid w-full max-w-[90rem] gap-12 rounded-[clamp(2rem,6vw,5rem)] px-6 py-10 text-paper-raised sm:px-10 sm:py-14 lg:grid-cols-12 lg:gap-6 lg:px-14 lg:py-20">
          <header className="lg:col-span-7">
            <p className="type-label text-paper-raised/70">{memxCaseStudy.architecture.eyebrow}</p>
            <h2
              id="memx-scaling-decision"
              className="type-heading mt-7 max-w-[14ch] text-pretty text-paper-raised"
            >
              {memxCaseStudy.architecture.title}
            </h2>
            <p className="type-body mt-8 max-w-2xl text-paper-raised/82">
              {memxCaseStudy.architecture.body}
            </p>
          </header>
          <aside
            className="self-end rounded-[1.25rem] bg-paper-raised/10 px-6 py-7 lg:col-span-4 lg:col-start-9"
            aria-label="Evolution note"
          >
            <p className="type-label text-paper-raised/70">Refactor / repeat</p>
            <p className="type-body-small mt-5 text-paper-raised/82">
              {memxCaseStudy.architecture.note}
            </p>
          </aside>
        </div>
      </section>

      <section className="px-page-gutter pb-section" aria-labelledby="memx-production-practice">
        <div className="mx-auto grid w-full max-w-[90rem] gap-12 lg:grid-cols-12 lg:gap-6">
          <header className="lg:col-span-3">
            <p className="type-label text-accent">{memxCaseStudy.operatingPractice.eyebrow}</p>
          </header>
          <div className="lg:col-span-5 lg:col-start-5">
            <h2 id="memx-production-practice" className="type-heading text-ink max-w-[12ch]">
              {memxCaseStudy.operatingPractice.title}
            </h2>
            <p className="type-body text-ink mt-7">{memxCaseStudy.operatingPractice.body}</p>
          </div>
          <aside
            className="rounded-[1.25rem] bg-paper-raised px-6 py-7 lg:col-span-3"
            aria-label="Team context"
          >
            <p className="type-label text-muted">Team context</p>
            <p className="type-body-small text-ink mt-4">{memxCaseStudy.operatingPractice.team}</p>
          </aside>
        </div>
      </section>
    </div>
  );
}
