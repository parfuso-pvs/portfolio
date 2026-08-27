import Link from "next/link";

import type { ProjectRecord } from "@/content/projects";

type PixelVerseProjectRecord = Extract<ProjectRecord, { id: "pixelverse-studios" }>;
type EarthCamProjectRecord = Extract<ProjectRecord, { id: "earthcam" }>;

type HomePracticeContextProps = {
  projects: readonly [PixelVerseProjectRecord, EarthCamProjectRecord];
};

function SupportingProject({
  project,
}: {
  project: PixelVerseProjectRecord | EarthCamProjectRecord;
}) {
  return (
    <article className="grid gap-5 py-8 sm:grid-cols-[5rem_minmax(0,1fr)] sm:py-10">
      <p className="type-mono text-accent">{project.indexLabel.replace("Support ", "S/")}</p>
      <div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <h3 className="type-heading text-ink text-[clamp(2.25rem,4vw,4.25rem)]">
            {project.name}
          </h3>
          <div className="sm:max-w-52 sm:text-right">
            <p className="type-label text-muted">{project.discipline}</p>
            <p className="type-body-small text-ink mt-1">{project.role}</p>
          </div>
        </div>
        <p className="type-body text-ink mt-6 max-w-3xl">{project.summary}</p>
        <p className="type-body-small text-muted mt-5 max-w-3xl border-l border-line-strong pl-4">
          {project.id === "pixelverse-studios" ? project.ownership : project.proofPoints[0]}
        </p>
      </div>
    </article>
  );
}

export function HomePracticeContext({ projects }: HomePracticeContextProps) {
  return (
    <section
      className="px-page-gutter pb-section relative isolate"
      aria-labelledby="home-practice-title"
    >
      <div className="mx-auto grid w-full max-w-[90rem] gap-12 border-t border-line-strong pt-6 lg:grid-cols-12 lg:gap-6">
        <header className="lg:col-span-3">
          <p className="type-label text-accent">Practice / foundation</p>
          <p className="type-mono text-muted mt-3">Supporting context / 01—02</p>
        </header>

        <div className="lg:col-span-8 lg:col-start-5">
          <h2 id="home-practice-title" className="type-heading text-ink max-w-[14ch] text-pretty">
            The practice around the work.
          </h2>
          <p className="type-body text-muted mt-7 max-w-2xl border-l border-accent pl-5">
            An after-hours studio for local businesses and experimentation. An earlier chapter in
            frontend leadership.
          </p>

          <div className="mt-12 divide-y divide-line border-y border-line-strong sm:mt-16">
            {projects.map((project) => (
              <SupportingProject key={project.id} project={project} />
            ))}
          </div>

          <footer className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="type-mono text-muted">Concise by design / context, not case studies</p>
            <Link
              href="/about"
              className="type-label text-ink min-h-11 self-start border-b border-ink py-3 transition-colors hover:text-accent focus-visible:text-accent active:text-accent-strong sm:self-auto"
            >
              Read the full profile
            </Link>
          </footer>
        </div>
      </div>
    </section>
  );
}
