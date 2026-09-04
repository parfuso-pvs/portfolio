import type { Metadata } from "next";
import Image from "next/image";
import { CaseStudyNavigator } from "@/components/case-study/case-study-navigator";
import { SiteHeader } from "@/components/site-header";
import {
  domaniCaseStudy as study,
  domaniSnapshotDate,
} from "@/content/case-studies/domani";

export const metadata: Metadata = {
  title: "Domani case study",
  description:
    "How Phil Arfuso co-owns and engineers Domani, a focused planning app for iOS and Android.",
};

export default function DomaniCaseStudyPage() {
  return (
    <main className="case-study case-study-domani" id="main-content">
      <section className="domani-case-hero" aria-labelledby="domani-title">
        <SiteHeader tone="dark" />

        <div className="domani-hero-layout" data-reveal-group data-reveal-stagger="110">
          <div className="domani-case-copy" data-reveal="left" data-reveal-group data-reveal-stagger="70">
            <p className="case-kicker" data-reveal="soft">{study.hero.kicker}</p>
            <h1 id="domani-title" data-reveal="soft">{study.hero.title}</h1>
            <p className="domani-case-lede" data-reveal="soft">{study.hero.lede}</p>
          </div>

          <aside className="domani-ritual" data-reveal="right" data-reveal-group data-reveal-stagger="70" aria-label="Domani planning ritual">
            <p data-reveal="soft">Tonight</p>
            <strong data-reveal="soft">Plan tomorrow, tonight.</strong>
            <div data-reveal="soft" aria-hidden="true">
              <span>Plan</span>
              <i />
              <span>Prioritize</span>
              <i />
              <span>Follow through</span>
            </div>
          </aside>
        </div>

        <dl className="domani-meta" data-reveal-group data-reveal-stagger="55">
          {study.hero.meta.map((item) => (
            <div data-reveal="soft" key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="domani-origin" data-reveal-group data-reveal-stagger="100" aria-labelledby="domani-origin-title">
        <div data-reveal="left" data-reveal-group data-reveal-stagger="65">
          <p data-reveal="soft">{study.origin.eyebrow}</p>
          <h2 id="domani-origin-title" data-reveal="soft">{study.origin.title}</h2>
        </div>
        <div data-reveal="right" data-reveal-group data-reveal-stagger="65">
          {study.origin.body.map((paragraph) => (
            <p data-reveal="soft" key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="domani-product-view" data-reveal-group data-reveal-stagger="110" aria-labelledby="domani-media-title">
        <div className="domani-product-copy" data-reveal="left" data-reveal-group data-reveal-stagger="65">
          <p data-reveal="soft">{study.media.eyebrow}</p>
          <h2 id="domani-media-title" data-reveal="soft">{study.media.title}</h2>
          <p data-reveal="soft">{study.media.body}</p>

          <ol className="domani-product-principles" data-reveal="soft" data-reveal-group data-reveal-stagger="75" aria-label="The daily planning loop">
            {study.principles.map((principle, index) => (
              <li data-reveal="soft" key={principle.title}>
                <span aria-hidden="true">0{index + 1}</span>
                <div>
                  <strong>{principle.label}</strong>
                  <h3>{principle.title}</h3>
                  <p>{principle.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <figure className="domani-product-stage" data-reveal="scale" id="product-view">
          <div aria-hidden="true" className="domani-product-orbit" />
          <Image
            src="/images/domani/today-screen.png"
            alt={study.media.alt}
            width={1008}
            height={2126}
            sizes="(max-width: 760px) 80vw, (max-width: 1100px) 46vw, 34vw"
          />
          <figcaption>
            Real public product media. Demonstration content only; no user records are shown.
          </figcaption>
        </figure>
      </section>

      <section className="domani-ownership" data-reveal-group data-reveal-stagger="105" aria-labelledby="domani-ownership-title">
        <div className="domani-ownership-copy" data-reveal="left" data-reveal-group data-reveal-stagger="65">
          <p data-reveal="soft">{study.ownership.eyebrow}</p>
          <h2 id="domani-ownership-title" data-reveal="soft">{study.ownership.title}</h2>
          <p data-reveal="soft">{study.ownership.body}</p>
        </div>

        <div className="domani-boundary" data-reveal="right" data-reveal-group data-reveal-stagger="75" aria-labelledby="domani-boundary-title">
          <header data-reveal="soft">
            <p>{study.boundary.eyebrow}</p>
            <h3 id="domani-boundary-title">{study.boundary.title}</h3>
          </header>
          <div className="domani-boundary-lists" data-reveal="soft" data-reveal-group data-reveal-stagger="65">
            <div data-reveal="soft">
              <h4>Shipped</h4>
              <ul>
                {study.boundary.shipped.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div data-reveal="soft">
              <h4>Exploring</h4>
              <ul>
                {study.boundary.exploring.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="domani-evidence" id="evidence" data-reveal-group data-reveal-stagger="95" aria-labelledby="domani-evidence-title">
        <header data-reveal="soft" data-reveal-group data-reveal-stagger="70">
          <div data-reveal="left">
            <p>{study.evidence.eyebrow}</p>
            <h2 id="domani-evidence-title">{study.evidence.title}</h2>
          </div>
          <p data-reveal="right">{study.evidence.body}</p>
        </header>

        <div className="domani-evidence-layout">
          <div className="domani-evidence-data">
            <div className="domani-ledger" data-reveal-group data-reveal-stagger="70" aria-label={`Primary production metrics as of ${domaniSnapshotDate}`}>
              {study.evidence.metrics.slice(0, 3).map((metric) => (
                <article data-reveal="soft" key={metric.label}>
                  <strong>{metric.value}</strong>
                  <div>
                    <h3>{metric.label}</h3>
                    <p>{metric.detail}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="domani-evidence-secondary" data-reveal-group data-reveal-stagger="70" aria-label="Additional production context">
              {study.evidence.metrics.slice(3).map((metric) => (
                <article data-reveal="soft" key={metric.label}>
                  <strong>{metric.value}</strong>
                  <div>
                    <h3>{metric.label}</h3>
                    <p>{metric.detail}</p>
                  </div>
                </article>
              ))}
            </div>

            <p className="domani-evidence-source" data-reveal="soft">
              Production Supabase, PostHog, and RevenueCat webhook ledger / {domaniSnapshotDate}
            </p>
          </div>

          <aside className="domani-evidence-limits" data-reveal="right" data-reveal-group data-reveal-stagger="60">
            <p data-reveal="soft">Read these as an early product signal</p>
            <ul data-reveal="soft">
              {study.evidence.caveats.map((caveat) => (
                <li key={caveat}>{caveat}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <CaseStudyNavigator currentProjectId="domani" />
    </main>
  );
}
