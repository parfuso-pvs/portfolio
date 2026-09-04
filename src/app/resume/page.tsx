import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { resumeContent as resume } from "@/content/resume";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Phil Arfuso's full-stack software engineering experience, technologies, products, and ventures.",
};

export default function ResumePage() {
  return (
    <main className="resume-page" id="main-content">
      <section className="resume-hero" aria-labelledby="resume-title">
        <SiteHeader current="resume" tone="dark" />

        <div className="resume-hero-layout" data-reveal-group data-reveal-stagger="110">
          <div data-reveal="left">
            <h1 id="resume-title">Full-stack software engineer</h1>
          </div>

          <div className="resume-hero-summary" data-reveal="right" data-reveal-group data-reveal-stagger="75">
            <p data-reveal="soft">{resume.profile}</p>
            <a
              className="primary-action"
              data-reveal="soft"
              href="/resume.pdf"
              download="Phil-Arfuso-Resume.pdf"
            >
              Download PDF <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <address className="resume-contact" data-reveal-group data-reveal-stagger="55">
          <span data-reveal="soft">{resume.location}</span>
          <a data-reveal="soft" href={resume.phoneHref}>{resume.phone}</a>
          <a data-reveal="soft" href={`mailto:${resume.email}`}>{resume.email}</a>
          <a data-reveal="soft" href={resume.linkedIn} target="_blank" rel="noopener noreferrer">
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
          <a data-reveal="soft" href={resume.github} target="_blank" rel="noopener noreferrer">
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </address>
      </section>

      <section className="resume-technologies" aria-labelledby="technologies-title">
        <header data-reveal-group data-reveal-stagger="70">
          <p data-reveal="soft">Skills</p>
          <h2 id="technologies-title" data-reveal="left">Core technologies</h2>
        </header>

        <div className="resume-technology-grid" data-reveal-group data-reveal-stagger="85">
          {resume.technologies.map((group) => (
            <article data-reveal-group data-reveal-stagger="45" key={group.label}>
              <h3 data-reveal="soft">{group.label}</h3>
              <ul data-reveal-group data-reveal-stagger="42">
                {group.items.map((item) => (
                  <li data-reveal="soft" key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="resume-experience" aria-labelledby="experience-title">
        <header className="resume-section-heading" data-reveal-group data-reveal-stagger="70">
          <p data-reveal="soft">Experience</p>
          <h2 id="experience-title" data-reveal="left">Work history</h2>
        </header>

        <div className="resume-company-list" data-reveal-group data-reveal-stagger="110">
          {resume.experience.map((company) => (
            <article className="resume-company" data-reveal-group data-reveal-stagger="70" key={company.company}>
              <header data-reveal="left">
                <h3>{company.company}</h3>
                <p>{company.location}</p>
              </header>

              <div className="resume-role-list" data-reveal-group data-reveal-stagger="80">
                {company.roles.map((role) => (
                  <section className="resume-role" data-reveal-group data-reveal-stagger="60" key={role.title}>
                    <header data-reveal="left">
                      <h4>{role.title}</h4>
                      <p>{role.dates}</p>
                    </header>
                    <ul data-reveal-group data-reveal-stagger="55">
                      {role.bullets.map((bullet) => (
                        <li data-reveal="soft" key={bullet}>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="resume-ventures" aria-labelledby="ventures-title">
        <header className="resume-section-heading" data-reveal-group data-reveal-stagger="70">
          <p data-reveal="soft">Products &amp; ventures</p>
          <h2 id="ventures-title" data-reveal="left">Domani and agency work</h2>
        </header>

        <div className="resume-venture-grid" data-reveal-group data-reveal-stagger="95">
          {resume.ventures.map((venture) => (
            <article data-reveal-group data-reveal-stagger="65" key={venture.company}>
              <header data-reveal="soft">
                <div>
                  <h3>{venture.company}</h3>
                  <p>{venture.location}</p>
                </div>
                <p>{venture.dates}</p>
              </header>
              <h4 data-reveal="soft">{venture.title}</h4>
              <ul data-reveal-group data-reveal-stagger="55">
                {venture.bullets.map((bullet) => (
                  <li data-reveal="soft" key={bullet}>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <footer className="resume-footer" data-reveal-group data-reveal-stagger="100">
        <div data-reveal="left" data-reveal-group data-reveal-stagger="65">
          <p data-reveal="soft">PDF version</p>
          <h2 data-reveal="soft">Download a copy</h2>
        </div>
        <div data-reveal="right" data-reveal-group data-reveal-stagger="65">
          <a
            className="primary-action"
            data-reveal="soft"
            href="/resume.pdf"
            download="Phil-Arfuso-Resume.pdf"
          >
            Download PDF <span aria-hidden="true">↓</span>
          </a>
          <Link className="secondary-action" data-reveal="soft" href="/contact">
            Say hello
          </Link>
        </div>
      </footer>
    </main>
  );
}
