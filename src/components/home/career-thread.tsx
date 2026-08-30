import Link from "next/link";

import { CareerThreadMotion } from "@/components/home/career-thread-motion";
import styles from "@/components/home/career-thread.module.css";
import { CareerChapterTitle } from "@/components/motion/career-chapter-title";
import { careerOrigin, employmentHistory, independentPractice } from "@/content/experience";
import { getProject } from "@/content/projects";

function Period({
  end,
  start,
}: {
  end?: { dateTime: string; label: string };
  start: { dateTime: string; label: string };
}) {
  return (
    <span className="type-mono text-muted">
      <time dateTime={start.dateTime}>{start.label}</time>
      <span aria-hidden="true"> — </span>
      {end ? <time dateTime={end.dateTime}>{end.label}</time> : <span>Present</span>}
    </span>
  );
}

function Arrow() {
  return (
    <span
      className="transition-transform group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none"
      aria-hidden="true"
    >
      →
    </span>
  );
}

export function CareerThread() {
  const earthcam = getProject("earthcam");
  const memx = getProject("memx");
  const pixelverse = getProject("pixelverse-studios");
  const domani = getProject("domani");
  const iffers = getProject("iffers-pictures");

  return (
    <section
      id="experience"
      className="px-page-gutter scroll-mt-8 pb-section"
      aria-labelledby="experience-title"
    >
      <div className="mx-auto w-full max-w-[90rem]">
        <header className="grid gap-7 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-3">
            <p className="type-label text-accent">Experience</p>
            <p className="type-mono text-muted mt-3">A career still in motion</p>
          </div>
          <div className="lg:col-span-7 lg:col-start-5">
            <h2 id="experience-title" className="type-heading text-ink max-w-[11ch] text-pretty">
              The work, in order.
            </h2>
            <p className="type-body text-muted mt-6 max-w-[62ch]">
              I found coding before it was my job. Each role after that widened the work—from
              frontend implementation to team leadership, platform architecture, and full-stack
              ownership.
            </p>
          </div>
        </header>

        <CareerThreadMotion>
          <ol className={styles.timeline}>
            <li className={styles.entry}>
              <span className={styles.marker} aria-hidden="true" />
              <div className={styles.meta}>
                <p className="type-label text-accent">{careerOrigin.context}</p>
                <p className="type-mono text-muted mt-3">Before engineering</p>
              </div>
              <article className={styles.content}>
                <p className="type-mono text-muted">Origin / 00</p>
                <h3 className="type-heading text-ink mt-4 text-[clamp(2.75rem,5vw,5rem)]">
                  {careerOrigin.company}
                </h3>
                <p className="type-label text-ink mt-4">{careerOrigin.role}</p>
                <p className="type-body-small text-muted mt-5 max-w-[58ch]">
                  {careerOrigin.summary}
                </p>
              </article>
            </li>

            {employmentHistory.map((company, companyIndex) => {
              const project = company.projectId === "earthcam" ? earthcam : memx;
              const firstRole = company.roles[0];
              const finalRole = company.roles.at(-1);

              if (!firstRole || !finalRole || !project.href) return null;

              return (
                <li
                  key={company.projectId}
                  id={`experience-${company.projectId}`}
                  className={`${styles.entry} ${styles.entryLarge} scroll-mt-8`}
                >
                  <span className={styles.marker} aria-hidden="true" />
                  <div className={styles.meta}>
                    <Period start={firstRole.start} end={finalRole.end} />
                    <p className="type-label text-accent mt-4">Full-time</p>
                  </div>
                  <article className={styles.content}>
                    <p className="type-mono text-muted">
                      Company / {String(companyIndex + 1).padStart(2, "0")}
                    </p>
                    <Link
                      href={project.href}
                      transitionTypes={["career-detail"]}
                      className="group mt-4 block rounded-control focus-visible:outline-offset-8"
                      aria-label={`Read more about ${project.name}`}
                    >
                      <CareerChapterTitle projectId={project.id}>
                        <span className="type-heading text-ink group-hover:text-accent group-focus-visible:text-accent block text-[clamp(3.25rem,7vw,6.5rem)] transition-colors motion-reduce:transition-none">
                          {project.name}
                        </span>
                      </CareerChapterTitle>
                      <span className="type-body-small text-muted mt-4 block max-w-[58ch]">
                        {project.summary}
                      </span>
                      <span className="type-label text-ink group-hover:text-accent group-focus-visible:text-accent mt-6 inline-flex min-h-11 items-center gap-3 py-3 transition-colors active:translate-y-px">
                        Open the chapter <Arrow />
                      </span>
                    </Link>

                    <ol className={styles.roleList} aria-label={`${project.name} roles`}>
                      {company.roles.map((role) => (
                        <li key={role.title} className={`${styles.role} px-5 py-6 sm:px-7 sm:py-7`}>
                          <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start sm:gap-8">
                            <h4 className="type-heading text-ink text-[clamp(1.6rem,2.6vw,2.3rem)]">
                              {role.title}
                            </h4>
                            <Period start={role.start} end={role.end} />
                          </div>
                          <p className="type-body-small text-muted mt-4 max-w-[60ch]">
                            {role.summary}
                          </p>
                        </li>
                      ))}
                    </ol>

                    {company.projectId === "memx" ? (
                      <section
                        className={`${styles.branch} px-5 py-7 sm:px-8 sm:py-9`}
                        aria-labelledby="independent-work-title"
                      >
                        <p className="type-label text-accent">Parallel practice</p>
                        <h4
                          id="independent-work-title"
                          className="type-heading text-ink mt-3 text-[clamp(2.25rem,4vw,3.75rem)]"
                        >
                          {independentPractice.context}
                        </h4>
                        <div className="mt-8 grid gap-8 xl:grid-cols-2">
                          {independentPractice.entries.map((entry) => {
                            const sideProject = entry.projectId === "domani" ? domani : pixelverse;

                            return (
                              <article
                                key={entry.projectId}
                                id={`experience-${entry.projectId}`}
                                className="scroll-mt-8"
                              >
                                <Period start={entry.start} />
                                {sideProject.href ? (
                                  <Link
                                    href={sideProject.href}
                                    transitionTypes={["career-detail"]}
                                    className="group mt-3 block rounded-control focus-visible:outline-offset-6"
                                  >
                                    <CareerChapterTitle projectId={sideProject.id}>
                                      <h5 className="type-heading text-ink group-hover:text-accent group-focus-visible:text-accent text-[clamp(2rem,3vw,3rem)] transition-colors motion-reduce:transition-none">
                                        {sideProject.name}
                                      </h5>
                                    </CareerChapterTitle>
                                    <p className="type-label text-ink mt-3 leading-[1.5]">
                                      {entry.role}
                                    </p>
                                    <p className="type-body-small text-muted mt-4">
                                      {entry.summary}
                                    </p>
                                    <span className="type-label text-ink group-hover:text-accent group-focus-visible:text-accent mt-4 inline-flex min-h-11 items-center gap-3 py-3">
                                      View the product <Arrow />
                                    </span>
                                  </Link>
                                ) : (
                                  <div className="mt-3">
                                    <h5 className="type-heading text-ink text-[clamp(2rem,3vw,3rem)]">
                                      {sideProject.name}
                                    </h5>
                                    <p className="type-label text-ink mt-3 leading-[1.5]">
                                      {entry.role}
                                    </p>
                                    <p className="type-body-small text-muted mt-4">
                                      {entry.summary}
                                    </p>
                                  </div>
                                )}
                              </article>
                            );
                          })}
                        </div>
                        <p
                          id={`experience-${iffers.id}`}
                          className="type-body-small text-muted mt-8 scroll-mt-8"
                        >
                          Related client work:{" "}
                          <Link
                            href={iffers.href}
                            transitionTypes={["career-detail"]}
                            className="text-ink underline decoration-line-strong underline-offset-4 hover:text-accent focus-visible:text-accent active:text-accent-strong"
                          >
                            <CareerChapterTitle projectId={iffers.id}>
                              {iffers.name}
                            </CareerChapterTitle>
                          </Link>
                          , where I owned discovery, copy, visual design, implementation, and client
                          collaboration.
                        </p>
                      </section>
                    ) : null}
                  </article>
                </li>
              );
            })}
          </ol>
        </CareerThreadMotion>
      </div>
    </section>
  );
}
