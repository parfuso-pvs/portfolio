import Link from "next/link";

import type { FeaturedProjectRecord } from "@/content/projects";

type ProjectIndexCardProps = {
  project: FeaturedProjectRecord;
  sequence: number;
};

function ArrowUpRight() {
  return (
    <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 20 20">
      <path d="M5 15 15 5M7 5h8v8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function MemxArtifact({ label }: { label: string }) {
  return (
    <div className="relative h-full min-h-64 overflow-hidden" aria-hidden="true">
      <div className="material-blueprint absolute inset-0" />
      <div className="border-accent/30 bg-paper/82 absolute top-[16%] left-[13%] h-[62%] w-[64%] border shadow-sheet transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 group-focus-within:-translate-y-1 group-focus-within:translate-x-1">
        <div className="border-line absolute inset-x-5 top-5 border-t" />
        <div className="border-line absolute inset-x-5 top-1/2 border-t" />
        <div className="border-line absolute inset-y-5 left-1/3 border-l" />
        <div className="bg-accent absolute top-[calc(50%-0.25rem)] left-[calc(33.333%-0.25rem)] size-2 rounded-pill" />
      </div>
      <div className="border-accent/45 bg-paper-raised/88 absolute right-[11%] bottom-[12%] h-[46%] w-[56%] border shadow-pinned transition-transform duration-500 ease-out group-hover:translate-y-1 group-hover:-translate-x-1 group-focus-within:translate-y-1 group-focus-within:-translate-x-1">
        <div className="border-accent/35 absolute top-1/2 right-5 left-5 border-t" />
        <div className="border-accent/35 absolute top-5 bottom-5 left-1/2 border-l" />
        <span className="type-mono text-accent absolute top-4 left-4">{label}</span>
      </div>
    </div>
  );
}

function DomaniArtifact({
  detail,
  label,
  secondaryLabel,
  statement,
}: {
  detail: string;
  label: string;
  secondaryLabel: string;
  statement: string;
}) {
  return (
    <div
      className="bg-media-backdrop text-media-foreground relative h-full min-h-64 overflow-hidden"
      aria-hidden="true"
    >
      <div className="border-media-foreground/20 absolute -top-[18%] -right-[18%] aspect-square w-[78%] rounded-pill border" />
      <div className="border-media-foreground/12 absolute -top-[5%] -right-[5%] aspect-square w-[58%] rounded-pill border" />
      <div className="absolute top-7 left-7">
        <span className="type-mono text-media-foreground/60">{label}</span>
        <p className="mt-3 max-w-44 font-serif text-3xl leading-[0.95] tracking-[-0.035em]">
          {statement}
        </p>
      </div>
      <div className="bg-paper text-ink absolute right-[10%] bottom-0 h-[68%] w-[42%] min-w-32 rounded-t-[1.75rem] border-[5px] border-b-0 border-ink px-4 pt-7 shadow-pinned transition-transform duration-500 ease-out group-hover:-translate-y-2 group-focus-within:-translate-y-2">
        <span className="type-label text-accent">{secondaryLabel}</span>
        <div className="border-line mt-4 border-t pt-3">
          <span className="type-mono text-muted">{detail}</span>
        </div>
        <div className="border-line mt-8 space-y-3 border-t pt-4">
          <span className="bg-accent/80 block h-1 w-3/4" />
          <span className="bg-line-strong block h-1 w-1/2" />
          <span className="bg-line block h-1 w-2/3" />
        </div>
      </div>
    </div>
  );
}

function IffersArtifact({
  detail,
  label,
  secondaryLabel,
}: {
  detail: string;
  label: string;
  secondaryLabel: string;
}) {
  return (
    <div className="bg-paper-deep relative h-full min-h-64 overflow-hidden" aria-hidden="true">
      <div className="material-blueprint absolute inset-y-0 right-0 w-[38%] opacity-60" />
      <div className="border-line-strong bg-paper-raised absolute top-[14%] bottom-[12%] left-[9%] w-[58%] border shadow-pinned transition-transform duration-500 ease-out group-hover:-rotate-1 group-hover:scale-[1.015] group-focus-within:-rotate-1 group-focus-within:scale-[1.015]">
        <div className="absolute inset-[8%] border border-line">
          <div className="absolute inset-x-0 top-1/2 border-t border-line" />
          <div className="absolute inset-y-0 left-1/2 border-l border-line" />
          <div className="absolute inset-[22%] rounded-pill border border-accent/50" />
        </div>
        <span className="type-mono text-muted absolute bottom-3 left-3">{label}</span>
      </div>
      <div className="material-vellum absolute right-[8%] bottom-[9%] w-[38%] p-4 shadow-sheet">
        <span className="type-label text-accent">{secondaryLabel}</span>
        <span className="type-mono text-ink mt-2 block">{detail}</span>
      </div>
    </div>
  );
}

function ProjectArtifact({ project }: { project: FeaturedProjectRecord }) {
  switch (project.id) {
    case "memx":
      return <MemxArtifact label={project.artifactCopy.primaryLabel} />;
    case "domani":
      return (
        <DomaniArtifact
          detail={project.artifactCopy.secondaryDetail}
          label={project.artifactCopy.primaryLabel}
          secondaryLabel={project.artifactCopy.secondaryLabel}
          statement={project.artifactCopy.statement}
        />
      );
    case "iffers-pictures":
      return (
        <IffersArtifact
          detail={project.artifactCopy.secondaryDetail}
          label={project.artifactCopy.primaryLabel}
          secondaryLabel={project.artifactCopy.secondaryLabel}
        />
      );
  }
}

export function ProjectIndexCard({ project, sequence }: ProjectIndexCardProps) {
  const artifactDescriptionId = `${project.id}-artifact-description`;

  return (
    <article
      className="work-index-entry group material-sheet material-sheet-raised relative overflow-hidden"
      style={{ animationDelay: `${sequence * 90}ms` }}
    >
      <Link
        href={project.href}
        transitionTypes={["route-forward"]}
        className="grid h-full min-h-[34rem] grid-rows-[minmax(16rem,1fr)_auto] focus-visible:outline focus-visible:-outline-offset-4 lg:min-h-[38rem]"
        aria-label={`View ${project.name} case study`}
        aria-describedby={artifactDescriptionId}
      >
        <ProjectArtifact project={project} />
        <span id={artifactDescriptionId} className="sr-only">
          {project.artifactCopy.accessibleDescription}
        </span>
        <div className="px-sheet-inset relative border-t border-line py-7 sm:py-8">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="type-mono text-accent">{project.indexLabel}</p>
              <h2 className="type-heading text-ink mt-2 text-[clamp(2.4rem,4vw,4.5rem)]">
                {project.name}
              </h2>
            </div>
            <span className="text-accent mt-1 grid size-11 shrink-0 place-items-center border border-accent transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1 group-focus-within:translate-x-1 group-focus-within:-translate-y-1 group-active:scale-[0.96]">
              <ArrowUpRight />
            </span>
          </div>
          <div className="mt-6 grid gap-4 border-t border-line pt-5 sm:grid-cols-[minmax(0,1fr)_minmax(11rem,0.65fr)]">
            <p className="type-body text-ink max-w-[52ch]">{project.summary}</p>
            <div className="sm:border-l sm:border-line sm:pl-5">
              <p className="type-label text-muted">{project.discipline}</p>
              <p className="type-body-small text-ink mt-2">{project.role}</p>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
