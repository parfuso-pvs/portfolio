import Link from "next/link";

import { careerOrigin, employmentHistory, independentPractice } from "@/content/experience";
import type { ProjectRecord } from "@/content/projects";

type CareerMapProps = {
  projects: readonly ProjectRecord[];
};

function ArrowRight() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 16 16">
      <path d="M2.5 8h10M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

function Period({
  end,
  start,
}: {
  end?: { dateTime: string; label: string };
  start: { dateTime: string; label: string };
}) {
  return (
    <span className="type-mono text-muted whitespace-nowrap">
      <time dateTime={start.dateTime}>{start.label}</time>
      <span aria-hidden="true"> — </span>
      {end ? <time dateTime={end.dateTime}>{end.label}</time> : <span>Present</span>}
    </span>
  );
}

export function CareerMap({ projects }: CareerMapProps) {
  function project(projectId: ProjectRecord["id"]) {
    const record = projects.find(({ id }) => id === projectId);

    if (!record) throw new Error(`Missing homepage career project: ${projectId}`);

    return record;
  }

  return (
    <section
      id="experience"
      className="px-page-gutter scroll-mt-24 pb-section"
      aria-labelledby="experience-title"
    >
      <div className="mx-auto grid w-full max-w-[90rem] gap-12 border-t border-line-strong pt-6 lg:grid-cols-12 lg:gap-6">
        <header className="lg:col-span-3">
          <p className="type-label text-accent">Experience</p>
          <p className="type-mono text-muted mt-3">2018 — 2026 / plus independent work</p>
        </header>

        <div className="lg:col-span-8 lg:col-start-5">
          <h2 id="experience-title" className="type-heading text-ink max-w-[13ch] text-pretty">
            The work, in order.
          </h2>
          <p className="type-body text-muted mt-6 max-w-2xl">
            I found coding before it was my job. Each role after that added more responsibility,
            from frontend implementation to team leadership and full-stack ownership.
          </p>

          <article className="mt-12 border-y border-line-strong py-7 sm:grid sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-8">
            <div>
              <p className="type-label text-accent">{careerOrigin.context}</p>
              <p className="type-mono text-muted mt-3">Before engineering</p>
            </div>
            <div className="mt-6 sm:mt-0">
              <h3 className="type-heading text-ink text-[clamp(2.25rem,4vw,3.75rem)]">
                {careerOrigin.company}
              </h3>
              <p className="type-label text-ink mt-3">{careerOrigin.role}</p>
              <p className="type-body-small text-muted mt-4 max-w-[62ch]">{careerOrigin.summary}</p>
            </div>
          </article>

          <ol className="relative border-b border-line-strong before:absolute before:top-0 before:bottom-0 before:left-[0.3125rem] before:w-px before:bg-line-strong">
            {employmentHistory.map((company) => {
              const record = project(company.projectId);
              const firstRole = company.roles[0];
              const lastRole = company.roles.at(-1);

              if (!firstRole || !lastRole) return null;

              return (
                <li key={company.projectId} className="relative py-12 pl-8 sm:py-14 sm:pl-10">
                  <span
                    className="absolute top-[4.15rem] left-0 size-2.5 rounded-pill bg-accent shadow-[0_0_0_5px_var(--paper-canvas)] sm:top-[4.65rem]"
                    aria-hidden="true"
                  />

                  <header className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
                    <div>
                      <p className="type-label text-accent">Full-time</p>
                      <h3 className="type-heading text-ink mt-3 text-[clamp(2.5rem,5vw,4.5rem)]">
                        {record.name}
                      </h3>
                    </div>
                    <Period start={firstRole.start} end={lastRole.end} />
                  </header>

                  <ol className="mt-9 border-t border-line">
                    {company.roles.map((role, roleIndex) => (
                      <li
                        key={role.title}
                        className="grid gap-5 border-b border-line py-7 last:border-b-0 sm:grid-cols-[2rem_minmax(0,1fr)]"
                      >
                        <span className="type-mono text-accent" aria-hidden="true">
                          {String(roleIndex + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-8">
                            <h4 className="type-heading text-ink text-[clamp(1.6rem,2.5vw,2.25rem)]">
                              {role.title}
                            </h4>
                            <Period start={role.start} end={role.end} />
                          </div>
                          <p className="type-body-small text-muted mt-4 max-w-[62ch]">
                            {role.summary}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>

                  <Link
                    href={company.detailHref}
                    className="type-label text-ink group mt-6 inline-flex min-h-11 items-center gap-3 border-b border-ink py-3 transition-colors hover:text-accent focus-visible:text-accent active:text-accent-strong"
                  >
                    {company.projectId === "memx"
                      ? "Read the MEMX case study"
                      : "More about EarthCam"}
                    <span className="transition-transform group-hover:translate-x-1 group-focus-visible:translate-x-1">
                      <ArrowRight />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>

          <section
            className="mt-14 border-l-2 border-accent bg-paper/55 px-6 py-8 sm:px-8 sm:py-10"
            aria-labelledby="independent-work-title"
          >
            <header className="border-b border-line pb-6">
              <p className="type-label text-accent">Parallel track</p>
              <h3
                id="independent-work-title"
                className="type-heading text-ink mt-3 text-[clamp(2.25rem,4vw,3.75rem)]"
              >
                {independentPractice.context}
              </h3>
            </header>

            <ol className="divide-y divide-line">
              {independentPractice.entries.map((entry, index) => {
                const record = project(entry.projectId);

                return (
                  <li
                    key={entry.projectId}
                    className="grid gap-5 py-7 sm:grid-cols-[2rem_minmax(0,1fr)]"
                  >
                    <span className="type-mono text-accent" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-8">
                        <div>
                          <h4 className="type-heading text-ink text-[clamp(2rem,3vw,3rem)]">
                            {record.name}
                          </h4>
                          <p className="type-label text-ink mt-3 leading-[1.5]">{entry.role}</p>
                        </div>
                        <Period start={entry.start} />
                      </div>
                      <p className="type-body-small text-muted mt-4 max-w-[62ch]">
                        {entry.summary}
                      </p>
                      <Link
                        href={entry.detailHref}
                        className="type-label text-ink mt-5 inline-flex min-h-11 items-center border-b border-line-strong py-3 transition-colors hover:border-accent hover:text-accent focus-visible:border-accent focus-visible:text-accent active:text-accent-strong"
                      >
                        {entry.projectId === "domani" ? "View Domani" : "More about PixelVerse"}
                      </Link>
                      {entry.projectId === "pixelverse-studios" ? (
                        <p className="type-body-small text-muted mt-4">
                          Related work:{" "}
                          <Link
                            href={project("iffers-pictures").href ?? "/work/iffers-pictures"}
                            className="text-ink underline decoration-line-strong underline-offset-4 hover:text-accent focus-visible:text-accent"
                          >
                            Iffer&apos;s Pictures
                          </Link>
                        </p>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
        </div>
      </div>
    </section>
  );
}
