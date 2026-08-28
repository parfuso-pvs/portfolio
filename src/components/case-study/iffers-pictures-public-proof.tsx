import type { FeaturedProjectRecord } from "@/content/projects";

import { iffersPicturesPublicProof } from "@/content/case-studies/iffers-pictures-public-proof";

type IffersPicturesProjectRecord = Extract<FeaturedProjectRecord, { id: "iffers-pictures" }>;

type IffersPicturesPublicProofProps = {
  project: IffersPicturesProjectRecord;
};

export function IffersPicturesPublicProof({ project }: IffersPicturesPublicProofProps) {
  const publicHost = new URL(project.publicUrl).host;

  return (
    <section className="px-page-gutter pb-section" aria-labelledby="iffers-public-proof">
      <div className="mx-auto w-full max-w-[90rem] border-t border-line-strong pt-6">
        <header className="grid gap-8 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-3">
            <p className="type-label text-accent">{iffersPicturesPublicProof.eyebrow}</p>
            <p className="type-mono text-muted mt-3">{iffersPicturesPublicProof.index}</p>
          </div>

          <div className="lg:col-span-7 lg:col-start-5">
            <h2 id="iffers-public-proof" className="type-heading text-ink max-w-[12ch] text-pretty">
              {iffersPicturesPublicProof.title}
            </h2>
            <p className="type-body text-muted mt-7 max-w-2xl">{iffersPicturesPublicProof.body}</p>
          </div>
        </header>

        <div className="mt-16 grid items-end gap-0 lg:mt-24 lg:grid-cols-12">
          <article className="bg-media-backdrop text-media-foreground relative px-6 py-10 sm:px-10 sm:py-14 lg:col-span-9 lg:px-14 lg:py-16">
            <div
              className="pointer-events-none absolute inset-0 opacity-15 [background-image:linear-gradient(color-mix(in_srgb,var(--paper-raised)_18%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_srgb,var(--paper-raised)_18%,transparent)_1px,transparent_1px)] [background-size:4rem_4rem]"
              aria-hidden="true"
            />
            <span className="bg-accent absolute top-0 left-[12%] h-2 w-28" aria-hidden="true" />

            <div className="relative grid gap-10 lg:grid-cols-8 lg:gap-6">
              <div className="lg:col-span-5">
                <p className="type-mono text-accent-on-dark">Live / {project.indexLabel}</p>
                <h3 className="type-heading text-media-foreground mt-7 max-w-[10ch] text-pretty">
                  {project.name}
                </h3>
                <p className="type-body text-media-foreground/75 mt-7 max-w-xl">
                  {project.proofPoints[0]}
                </p>
              </div>

              <aside
                className="border-media-foreground/25 border-l pl-5 lg:col-span-2 lg:col-start-7"
                aria-label="Ownership evidence"
              >
                <p className="type-label text-accent-on-dark">Ownership</p>
                <p className="type-body-small text-media-foreground/65 mt-4">{project.ownership}</p>
              </aside>
            </div>
          </article>

          <a
            href={project.publicUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`${iffersPicturesPublicProof.linkLabel} (opens in a new tab)`}
            className="material-sheet material-sheet-raised group relative z-10 flex min-h-44 flex-col justify-between border border-line-strong px-6 py-7 transition-transform duration-300 ease-out hover:-translate-y-1 focus-visible:-translate-y-1 active:translate-y-0 sm:min-h-52 sm:px-8 sm:py-9 lg:col-span-4 lg:col-start-9 lg:-mt-12 lg:-ml-6"
          >
            <span className="type-mono text-accent">{publicHost}</span>
            <span className="mt-10 flex items-end justify-between gap-6">
              <span>
                <span className="type-heading text-ink block text-[clamp(2rem,3vw,3.5rem)]">
                  {iffersPicturesPublicProof.linkLabel}
                </span>
                <span className="type-body-small text-muted mt-3 block">
                  {iffersPicturesPublicProof.linkNote}
                </span>
              </span>
              <svg
                viewBox="0 0 24 24"
                className="text-accent h-8 w-8 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-focus-visible:translate-x-1 group-focus-visible:-translate-y-1 group-active:translate-x-0 group-active:translate-y-0"
                aria-hidden="true"
              >
                <path
                  d="M7 17 17 7M9 7h8v8"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="square"
                  strokeWidth="1.5"
                />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
