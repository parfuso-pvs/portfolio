import Link from "next/link";

import { HomeAssemblyMotion } from "@/components/motion/home-assembly-motion";
import { MaterialSurface, RegistrationMark } from "@/components/ui/material-surface";
import type { FeaturedProjectRecord } from "@/content/projects";

type HomeHeroProps = {
  featuredProject: FeaturedProjectRecord;
};

function ArrowRight() {
  return (
    <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 20 20">
      <path d="M3 10h13M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function SystemAssembly({ project }: { project: FeaturedProjectRecord }) {
  return (
    <figure
      className="material-blueprint home-assembly-diagram relative min-h-80 overflow-hidden lg:min-h-[30rem]"
      aria-labelledby="system-assembly-caption"
    >
      <div className="absolute top-[9%] left-[10%] w-[58%] border border-accent/35 bg-paper-raised/86 p-5 shadow-sheet">
        <span className="type-mono text-accent">Shared platform / configured per market</span>
        <div className="mt-6 grid grid-cols-3 gap-3" aria-hidden="true">
          <span className="h-16 border border-line bg-paper/70" />
          <span className="h-16 border border-line bg-paper/70" />
          <span className="h-16 border border-line bg-paper/70" />
        </div>
      </div>

      <div className="absolute right-[8%] bottom-[10%] w-[72%] border border-accent/45 bg-paper-raised/92 p-5 shadow-pinned">
        <p className="type-label text-accent">System layers</p>
        <ol className="mt-4 divide-y divide-line">
          {project.approvedFeatures.slice(0, 4).map((feature, index) => (
            <li
              key={feature}
              className="grid grid-cols-[2rem_1fr] gap-3 py-2.5 first:pt-0 last:pb-0"
            >
              <span className="type-mono text-accent" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="type-body-small text-ink">{feature}</span>
            </li>
          ))}
        </ol>
      </div>

      <figcaption id="system-assembly-caption" className="sr-only">
        Original diagram of four connected MEMX platform layers:{" "}
        {project.approvedFeatures.slice(0, 4).join(", ")}.
      </figcaption>
    </figure>
  );
}

export function HomeHero({ featuredProject }: HomeHeroProps) {
  return (
    <section
      className="px-page-gutter relative isolate flex min-h-[100dvh] items-center overflow-hidden pt-28 pb-10 sm:pt-32 sm:pb-14"
      aria-labelledby="hero-title"
    >
      <HomeAssemblyMotion
        identityRail={
          <p className="type-display text-ink text-[clamp(2.75rem,5vw,5.5rem)] lg:[writing-mode:vertical-rl] lg:rotate-180">
            Phil Arfuso
          </p>
        }
      >
        <MaterialSurface
          as="div"
          elevation="pinned"
          className="home-assembly-sheet relative grid min-h-[41rem] overflow-hidden lg:grid-cols-12"
        >
          <span
            className="material-tab type-label absolute top-0 left-8 z-[1] sm:left-12"
            aria-hidden="true"
          >
            Home / Assembly 00
          </span>
          <RegistrationMark className="absolute top-5 right-5 sm:top-7 sm:right-7" />

          <div className="px-sheet-inset flex flex-col pt-20 pb-8 lg:col-span-7 lg:pt-24 lg:pb-12">
            <p className="type-label text-accent">Full-Stack Software Engineer</p>
            <h1 id="hero-title" className="type-heading text-ink mt-6 max-w-[12ch] text-balance">
              I turn complex systems into products that feel simple.
            </h1>
            <p className="type-body text-muted mt-7 max-w-[58ch]">
              Full-stack engineering across market infrastructure, independent products, and crafted
              web experiences.
            </p>

            <Link
              href={featuredProject.href}
              transitionTypes={["route-forward"]}
              className="group material-vellum mt-9 block max-w-xl px-5 py-5 transition-transform duration-300 ease-out hover:-translate-y-1 focus-visible:-translate-y-1 active:translate-y-0 sm:px-6"
            >
              <span className="type-label text-muted">Selected work</span>
              <span className="mt-3 flex items-end justify-between gap-5 border-b border-line pb-2">
                <span className="type-heading text-ink text-[clamp(2.25rem,4vw,3.75rem)]">
                  {featuredProject.name}
                </span>
                <span className="text-accent grid size-11 shrink-0 place-items-center transition-transform duration-300 ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1">
                  <ArrowRight />
                </span>
              </span>
              <span className="type-body-small text-ink mt-3 block">{featuredProject.summary}</span>
            </Link>

            <nav
              className="mt-auto flex flex-wrap gap-x-7 gap-y-3 pt-8"
              aria-label="Homepage actions"
            >
              <Link
                href="/work"
                transitionTypes={["route-switch"]}
                className="type-label text-ink min-h-11 border-b border-ink py-3 transition-colors hover:text-accent focus-visible:text-accent active:text-accent-strong"
              >
                View work index
              </Link>
              <Link
                href="/contact"
                transitionTypes={["route-switch"]}
                className="type-label text-muted min-h-11 border-b border-line-strong py-3 transition-colors hover:text-accent focus-visible:text-accent active:text-accent-strong"
              >
                Start a conversation
              </Link>
            </nav>
          </div>

          <div className="border-line bg-paper-deep/55 relative border-t p-4 sm:p-6 lg:col-span-5 lg:border-t-0 lg:border-l lg:p-8 lg:pt-20">
            <SystemAssembly project={featuredProject} />
          </div>
        </MaterialSurface>
      </HomeAssemblyMotion>
    </section>
  );
}
