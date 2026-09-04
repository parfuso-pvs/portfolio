import type { Metadata } from "next";
import { CaseStudyNavigator } from "@/components/case-study/case-study-navigator";
import { MemxConfigurationDiagram } from "@/components/case-study/memx-diagrams";
import { SiteHeader } from "@/components/site-header";
import { memxCaseStudy as study } from "@/content/case-studies/memx";

export const metadata: Metadata = {
  title: "MEMX case study",
  description:
    "How Phil Arfuso builds member and operations tools across reusable interfaces, APIs, data, and production systems at MEMX.",
};

export default function MemxCaseStudyPage() {
  return (
    <main className="case-study case-study-memx" id="main-content">
      <section className="case-hero" aria-labelledby="case-title">
        <SiteHeader tone="dark" />

        <div className="case-hero-layout" data-reveal-group data-reveal-stagger="110">
          <div className="case-hero-copy" data-reveal="left" data-reveal-group data-reveal-stagger="70">
            <p className="case-kicker" data-reveal="soft">{study.hero.kicker}</p>
            <h1 id="case-title" data-reveal="soft">{study.hero.title}</h1>
            <p className="case-lede" data-reveal="soft">{study.hero.lede}</p>
          </div>

          <aside className="case-contributions" data-reveal="right" aria-label="Areas of contribution">
            <p data-reveal="soft">Areas of contribution</p>
            <ol data-reveal-group data-reveal-stagger="65">
              {study.hero.contributions.map((contribution, index) => (
                <li data-reveal="soft" key={contribution.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <strong>{contribution.title}</strong>
                    <p>{contribution.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </aside>
        </div>

        <dl className="case-meta" data-reveal-group data-reveal-stagger="55">
          {study.hero.meta.map((item) => (
            <div data-reveal="soft" key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="case-section case-context" data-reveal-group data-reveal-stagger="100" aria-labelledby="context-title">
        <div className="case-section-heading" data-reveal="left" data-reveal-group data-reveal-stagger="65">
          <p data-reveal="soft">{study.context.eyebrow}</p>
          <h2 id="context-title" data-reveal="soft">{study.context.title}</h2>
        </div>
        <div className="case-body-copy" data-reveal="right" data-reveal-group data-reveal-stagger="65">
          {study.context.body.map((paragraph) => (
            <p data-reveal="soft" key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section
        className="case-portal"
        id="portal-tools"
        aria-labelledby="portal-title"
      >
        <header className="case-portal-heading" data-reveal-group data-reveal-stagger="70">
          <p data-reveal="soft">{study.portal.eyebrow}</p>
          <h2 id="portal-title" data-reveal="left">{study.portal.title}</h2>
          <p data-reveal="soft">{study.portal.body}</p>
        </header>

        <div className="case-portal-audiences" data-reveal-group data-reveal-stagger="85">
          {study.portal.audiences.map((audience) => (
            <article data-reveal="soft" key={audience.title}>
              <h3>{audience.title}</h3>
              <p>{audience.body}</p>
            </article>
          ))}
        </div>

        <div className="case-tool-groups" data-reveal-group data-reveal-stagger="80">
          {study.portal.groups.map((group) => (
            <article data-reveal="soft" key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="case-section case-progression" data-reveal-group data-reveal-stagger="100" aria-labelledby="progression-title">
        <div className="case-section-heading" data-reveal="left" data-reveal-group data-reveal-stagger="65">
          <p data-reveal="soft">Role progression</p>
          <h2 id="progression-title" data-reveal="soft">Frontend first then the rest of the stack</h2>
        </div>
        <div className="case-phase-list" data-reveal-group data-reveal-stagger="80">
          {study.phases.map((phase) => (
            <article className="case-phase" data-reveal="soft" key={phase.title}>
              <h3>{phase.title}</h3>
              <p>{phase.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="case-blueprint"
        id="configuration"
        aria-labelledby="configuration-title"
      >
        <div className="case-blueprint-copy" data-reveal-group data-reveal-stagger="75">
          <p data-reveal="soft">{study.configuration.eyebrow}</p>
          <h2 id="configuration-title" data-reveal="left">{study.configuration.title}</h2>
          <div className="case-blueprint-evidence" data-reveal="soft" data-reveal-group data-reveal-stagger="80">
            <p className="case-blueprint-body" data-reveal="soft">{study.configuration.body}</p>
            <aside
              className="case-configuration-scale"
              data-reveal="scale"
              aria-label="Market implementation scale"
            >
              <div className="case-configuration-scale-total">
                <strong>{study.scale.total}</strong>
                <span>{study.scale.label}</span>
              </div>
              <div className="case-configuration-scale-groups" data-reveal-group data-reveal-stagger="60">
                {study.scale.groups.map((group) => (
                  <div data-reveal="soft" key={group.label}>
                    <strong>{group.value}</strong>
                    <p>{group.label}</p>
                    <span>{group.detail}</span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
        <MemxConfigurationDiagram />
      </section>

      <CaseStudyNavigator currentProjectId="memx" />
    </main>
  );
}
