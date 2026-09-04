import type { Metadata } from "next";

import { SelectedWork } from "@/components/selected-work";
import { SiteHeader } from "@/components/site-header";
import { portfolioProjects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "A growing collection of products, platforms, and client work by Phil Arfuso.",
};

export default function WorkPage() {
  return (
    <main className="work-page" id="main-content">
      <section className="work-page-hero" aria-labelledby="work-page-title">
        <SiteHeader current="work" tone="dark" />

        <div
          className="work-page-hero-inner"
          data-reveal-group
          data-reveal-stagger="95"
        >
          <p data-reveal="soft">Portfolio</p>
          <h1 id="work-page-title" data-reveal="left">Work</h1>
          <p data-reveal="right">
            A growing collection of products, platforms, and client work—built
            across frontend, backend, design, and everything between.
          </p>
        </div>
      </section>

      <SelectedWork
        anchorId="projects"
        projects={portfolioProjects}
        showHeading={false}
        title="Portfolio projects"
      />
    </main>
  );
}
