import { domaniEvidence } from "@/content/case-studies/domani-evidence";
import type { FeaturedProjectRecord } from "@/content/projects";

type DomaniProjectRecord = Extract<FeaturedProjectRecord, { id: "domani" }>;

type DomaniProductionEvidenceProps = {
  project: DomaniProjectRecord;
};

export function DomaniProductionEvidence({ project }: DomaniProductionEvidenceProps) {
  return (
    <section className="px-page-gutter pb-section" aria-labelledby="domani-production-evidence">
      <div className="mx-auto w-full max-w-[90rem] border-t border-line-strong pt-6">
        <header className="grid gap-8 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-3">
            <p className="type-label text-accent">{domaniEvidence.eyebrow}</p>
            <p className="type-mono text-muted mt-3">{domaniEvidence.index}</p>
          </div>
          <div className="lg:col-span-7 lg:col-start-5">
            <h2
              id="domani-production-evidence"
              className="type-heading text-ink max-w-[13ch] text-pretty"
            >
              {domaniEvidence.title}
            </h2>
            <p className="type-body text-muted mt-7 max-w-2xl">{domaniEvidence.body}</p>
          </div>
        </header>

        <div className="bg-media-backdrop text-media-foreground relative mt-16 grid gap-14 overflow-hidden px-6 py-10 sm:px-10 sm:py-14 lg:mt-24 lg:grid-cols-12 lg:gap-6 lg:px-14 lg:py-20">
          <div
            className="pointer-events-none absolute inset-0 opacity-15 [background-image:linear-gradient(color-mix(in_srgb,var(--paper-raised)_18%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_srgb,var(--paper-raised)_18%,transparent)_1px,transparent_1px)] [background-size:4rem_4rem]"
            aria-hidden="true"
          />
          <span
            className="bg-accent absolute top-0 left-[12%] h-2 w-24 sm:left-[18%] sm:w-36"
            aria-hidden="true"
          />

          <div className="relative lg:col-span-7">
            <p className="type-label text-accent-on-dark">Evidence ledger / 01—05</p>
            <dl className="border-media-foreground/20 mt-8 divide-y divide-media-foreground/20 border-y">
              {project.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="grid gap-5 py-7 sm:grid-cols-[12rem_minmax(0,1fr)] sm:items-start sm:gap-7"
                >
                  <dt>
                    <span className="type-numeric text-accent-on-dark block">{metric.value}</span>
                    <span className="type-label text-media-foreground mt-3 block">
                      {metric.label}
                    </span>
                  </dt>
                  <dd className="sm:pt-1">
                    <p className="type-body-small text-media-foreground/70">{metric.detail}</p>
                    <p className="type-mono text-media-foreground/50 mt-4">
                      {domaniEvidence.sourceLabels[metric.source]} / {metric.snapshotDate}
                    </p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <aside
            className="border-media-foreground/25 relative self-start border-l pl-5 lg:col-span-4 lg:col-start-9"
            aria-label="Evidence boundaries"
          >
            <p className="type-label text-accent-on-dark">Snapshot boundary</p>
            <p className="type-heading text-media-foreground mt-6 text-[clamp(2rem,3vw,3.5rem)]">
              {domaniEvidence.snapshotLabel}
            </p>
            <ul className="border-media-foreground/20 mt-9 divide-y divide-media-foreground/20 border-y">
              {domaniEvidence.caveats.map((caveat, index) => (
                <li key={caveat} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 py-5">
                  <span className="type-mono text-accent-on-dark" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="type-body-small text-media-foreground/65">{caveat}</p>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-6">
          <header className="lg:col-span-3">
            <p className="type-label text-accent">{domaniEvidence.signals.eyebrow}</p>
            <p className="type-mono text-muted mt-3">Return / retention proxies</p>
          </header>

          <div className="lg:col-span-8 lg:col-start-5">
            <h3 className="type-heading text-ink max-w-[12ch] text-pretty">
              {domaniEvidence.signals.title}
            </h3>
            <p className="type-body text-muted mt-7 max-w-2xl">{domaniEvidence.signals.body}</p>
            <ol className="mt-10 divide-y divide-line border-y border-line-strong sm:mt-14">
              {project.proofPoints.map((proofPoint, index) => (
                <li key={proofPoint} className="grid gap-4 py-7 sm:grid-cols-[4rem_minmax(0,1fr)]">
                  <p className="type-mono text-accent">{String(index + 1).padStart(2, "0")}</p>
                  <p className="type-body text-ink max-w-3xl">{proofPoint}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
