import type { Metadata } from "next";

import { BackToJourney } from "@/components/layout/back-to-journey";
import { CareerChapterTitle } from "@/components/motion/career-chapter-title";
import { employmentHistory } from "@/content/experience";
import { getProject } from "@/content/projects";

const project = getProject("earthcam");

function getEarthcamExperience() {
  const experience = employmentHistory.find(({ projectId }) => projectId === "earthcam");
  if (!experience) throw new Error("Missing EarthCam experience chronology");
  return experience;
}

const experience = getEarthcamExperience();

export const metadata: Metadata = {
  title: project.name,
  description: project.metaDescription,
};

export default function EarthcamPage() {
  return (
    <main id="main-content" tabIndex={-1} className="overflow-hidden">
      <section className="px-page-gutter pt-7 pb-[clamp(5rem,10vw,9rem)] sm:pt-9">
        <div className="mx-auto w-full max-w-[90rem]">
          <header className="flex min-h-11 items-center justify-between gap-6">
            <p className="type-label text-ink">Phil Arfuso</p>
            <BackToJourney projectId={project.id} />
          </header>

          <div className="mt-[clamp(4rem,9vw,8rem)] grid gap-14 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-3">
              <p className="type-label text-accent">Earlier career</p>
              <p className="type-mono text-muted mt-3">
                <time dateTime="2018-03">March 2018</time>
                <span aria-hidden="true"> — </span>
                <time dateTime="2019-12">December 2019</time>
              </p>
            </div>
            <div className="lg:col-span-7 lg:col-start-5">
              <CareerChapterTitle projectId={project.id}>
                <h1 className="type-heading text-ink max-w-[10ch] text-[clamp(4rem,9vw,8rem)]">
                  {project.name}
                </h1>
              </CareerChapterTitle>
              <p className="type-heading text-ink mt-8 max-w-[15ch] text-[clamp(2.25rem,4vw,4rem)] text-pretty">
                My first engineering role—and my first opportunity to lead a frontend team.
              </p>
              <p className="type-body text-muted mt-8 max-w-[62ch]">{project.summary}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-page-gutter pb-section" aria-labelledby="earthcam-progression">
        <div className="mx-auto grid w-full max-w-[90rem] gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-3">
            <p className="type-label text-accent">Progression</p>
            <p className="type-mono text-muted mt-3">Two roles / one company</p>
          </div>
          <div className="lg:col-span-7 lg:col-start-5">
            <h2 id="earthcam-progression" className="type-heading text-ink max-w-[12ch]">
              From learning the product to helping lead the work.
            </h2>
            <ol className="mt-10 grid gap-4 sm:mt-14">
              {experience.roles.map((role, index) => (
                <li
                  key={role.title}
                  className="rounded-[1.25rem] border border-line/70 bg-paper-raised px-6 py-7 shadow-sheet sm:px-8 sm:py-9"
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

      <section className="px-page-gutter pb-section" aria-labelledby="earthcam-work">
        <div className="mx-auto w-full max-w-[90rem] rounded-[clamp(2rem,6vw,5rem)] bg-accent px-6 py-10 text-paper-raised sm:px-10 sm:py-14 lg:px-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-3">
              <p className="type-label text-paper-raised/70">What the work covered</p>
            </div>
            <div className="lg:col-span-7 lg:col-start-5">
              <h2
                id="earthcam-work"
                className="type-heading max-w-[12ch] text-[clamp(2.75rem,5vw,5rem)] text-paper-raised"
              >
                Live media, reusable interfaces, and a wider responsibility for the team.
              </h2>
              <ul className="mt-10 grid gap-5" aria-label="Approved EarthCam work">
                {project.approvedFeatures.map((feature) => (
                  <li key={feature} className="type-body flex gap-4 text-paper-raised/82">
                    <span
                      className="mt-[0.7em] h-2 w-2 shrink-0 rounded-full bg-paper-raised"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <p className="type-body mt-10 max-w-[62ch] text-paper-raised/82">
                {project.ownership}
              </p>
              <p className="type-body-small mt-6 max-w-[62ch] text-paper-raised/62">
                {project.attribution}
              </p>
              <div className="mt-10">
                <BackToJourney projectId={project.id} tone="dark" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
