import { BackToJourney } from "@/components/layout/back-to-journey";
import { CareerChapterTitle } from "@/components/motion/career-chapter-title";
import { employmentHistory } from "@/content/experience";
import type { FeaturedProjectRecord } from "@/content/projects";

function getMemxExperience() {
  const experience = employmentHistory.find(({ projectId }) => projectId === "memx");
  if (!experience) throw new Error("Missing MEMX experience chronology");
  return experience;
}

const experience = getMemxExperience();

export function MemxChapterIntro({ project }: { project: FeaturedProjectRecord }) {
  const firstRole = experience.roles[0];
  const finalRole = experience.roles.at(-1);

  if (!firstRole || !finalRole) throw new Error("Missing MEMX role chronology");

  return (
    <>
      <section
        className="px-page-gutter pt-7 pb-[clamp(5rem,11vw,10rem)] sm:pt-9"
        aria-labelledby="case-study-title"
      >
        <div className="mx-auto w-full max-w-[90rem]">
          <header className="flex min-h-11 items-center justify-between gap-6">
            <p className="type-label text-ink">Phil Arfuso</p>
            <BackToJourney projectId={project.id} />
          </header>

          <div className="mt-[clamp(4rem,9vw,8rem)] grid gap-12 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-3 lg:pt-3">
              <p className="type-label text-accent">Full-time / market infrastructure</p>
              <p className="type-mono text-muted mt-4">
                <time dateTime={firstRole.start.dateTime}>{firstRole.start.label}</time>
                <span aria-hidden="true"> — </span>
                <time dateTime={finalRole.end.dateTime}>{finalRole.end.label}</time>
              </p>
            </div>

            <div className="lg:col-span-7 lg:col-start-5">
              <CareerChapterTitle projectId={project.id}>
                <h1
                  id="case-study-title"
                  className="type-heading text-ink max-w-[10ch] text-[clamp(4.5rem,9vw,8.5rem)]"
                >
                  {project.name}
                </h1>
              </CareerChapterTitle>
              <p className="type-heading text-ink mt-8 max-w-[15ch] text-[clamp(2.25rem,4vw,4rem)] text-pretty">
                {project.summary}
              </p>
              <p className="type-body text-muted mt-8 max-w-[62ch]">{project.ownership}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-page-gutter pb-section" aria-labelledby="memx-role-progression">
        <div className="mx-auto grid w-full max-w-[90rem] gap-10 lg:grid-cols-12 lg:gap-6">
          <header className="lg:col-span-3">
            <p className="type-label text-accent">Role progression</p>
            <p className="type-mono text-muted mt-3">Frontend foundation / full stack</p>
          </header>

          <div className="lg:col-span-7 lg:col-start-5">
            <h2 id="memx-role-progression" className="type-heading text-ink max-w-[12ch]">
              The role grew with the system.
            </h2>
            <ol className="mt-10 grid gap-4 sm:mt-14">
              {experience.roles.map((role, index) => (
                <li
                  key={role.title}
                  className="rounded-[1.25rem] bg-paper-raised px-6 py-7 shadow-sheet sm:px-8 sm:py-9"
                >
                  <p className="type-mono text-accent">
                    Role / {String(index + 1).padStart(2, "0")}
                  </p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start sm:gap-8">
                    <h3 className="type-heading text-ink text-[clamp(2rem,3.5vw,3.5rem)]">
                      {role.title}
                    </h3>
                    <p className="type-mono text-muted">
                      <time dateTime={role.start.dateTime}>{role.start.label}</time>
                      <span aria-hidden="true"> — </span>
                      <time dateTime={role.end.dateTime}>{role.end.label}</time>
                    </p>
                  </div>
                  <p className="type-body text-muted mt-6 max-w-[62ch]">{role.summary}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
