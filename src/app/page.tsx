import Link from "next/link";
import { HeroArtwork } from "@/components/hero-artwork";
import { SelectedWork } from "@/components/selected-work";
import { SiteHeader } from "@/components/site-header";
import { featuredProjects } from "@/content/projects";

export default function Home() {
  return (
    <main className="portfolio-home" id="main-content">
      <section className="hero" aria-labelledby="hero-title">
        <SiteHeader />

        <div className="hero-stage">
          <HeroArtwork />

          <div className="hero-copy">
            <h1 id="hero-title" aria-label="Hey, I’m Phil">
              <span aria-hidden="true">Hey, I’m</span>{" "}
              <span aria-hidden="true">Phil</span>
            </h1>
            <p className="hero-intro">
              I’m a full-stack developer who likes solving messy problems and
              building useful things.
            </p>
            <p className="hero-aside">I try to have a good time doing it.</p>

            <div className="hero-actions" aria-label="Portfolio actions">
              <a className="primary-action" href="#work">
                Explore work
              </a>
              <a className="secondary-action" href="/resume.pdf" download>
                Download resume <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>

        <nav
          className="project-rail"
          data-reveal-group
          data-reveal-stagger="60"
          aria-label="Selected work"
        >
          {featuredProjects.map((project) => (
            <a data-reveal="soft" href={`#${project.id}`} key={project.name}>
              <span className="project-rail-label">
                <span>{project.name}</span>
                <span className="project-rail-divider" aria-hidden="true" />
                <span>{project.discipline}</span>
              </span>
            </a>
          ))}
        </nav>
      </section>
      <SelectedWork />
      <section
        className="home-close"
        data-reveal-group
        data-reveal-stagger="100"
        aria-labelledby="home-close-title"
      >
        <p data-reveal="soft">What’s next</p>
        <div data-reveal="left" data-reveal-group data-reveal-stagger="75">
          <h2 id="home-close-title" data-reveal="soft" aria-label="Working on something tricky">
            <span aria-hidden="true">Working on</span>
            <span aria-hidden="true">something tricky</span>
          </h2>
          <p data-reveal="soft">
            If you need a frontend or full-stack developer, tell me what you’re
            working on.
          </p>
          <Link className="primary-action" data-reveal="soft" href="/contact">
            Say hello
          </Link>
        </div>
      </section>
    </main>
  );
}
