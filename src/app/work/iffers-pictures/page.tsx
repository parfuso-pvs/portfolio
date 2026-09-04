import type { Metadata } from "next";
import Image from "next/image";
import { CaseStudyNavigator } from "@/components/case-study/case-study-navigator";
import { IffersGallery } from "@/components/case-study/iffers-gallery";
import { SiteHeader } from "@/components/site-header";
import { iffersPicturesCaseStudy as study } from "@/content/case-studies/iffers-pictures";

export const metadata: Metadata = {
  title: "Iffer’s Pictures case study",
  description:
    "How Phil Arfuso handled discovery, copy, visual design, development, and client collaboration for the Iffer’s Pictures photography portfolio.",
};

export default function IffersPicturesCaseStudyPage() {
  return (
    <main className="case-study case-study-iffers" id="main-content">
      <section className="iffers-case-hero" aria-labelledby="iffers-title">
        <SiteHeader tone="dark" />

        <div className="iffers-hero-layout" data-reveal-group data-reveal-stagger="110">
          <div className="iffers-hero-copy" data-reveal="left" data-reveal-group data-reveal-stagger="70">
            <p className="case-kicker" data-reveal="soft">{study.hero.kicker}</p>
            <h1 id="iffers-title" data-reveal="soft">{study.hero.title}</h1>
            <p data-reveal="soft">{study.hero.lede}</p>
          </div>

          <div className="iffers-hero-images" data-reveal="right" data-reveal-group data-reveal-stagger="90" aria-label="Selected Iffer’s Pictures photography">
            <figure className="iffers-hero-main" data-reveal="scale">
              <Image
                src="/images/iffers-pictures/maternity-session.jpg"
                alt="Expectant mother in a pale pink dress standing in a tree-lined garden."
                width={1080}
                height={720}
                sizes="(max-width: 760px) calc(100vw - 40px), 48vw"
                priority
              />
              <figcaption>Maternity / environment</figcaption>
            </figure>
            <figure className="iffers-hero-detail" data-reveal="scale">
              <Image
                src="/images/iffers-pictures/engagement-detail.jpg"
                alt="Engaged couple holding hands in front of softly lit holiday greenery."
                width={2048}
                height={1365}
                sizes="(max-width: 760px) 54vw, 22vw"
              />
              <figcaption>Engagement / detail</figcaption>
            </figure>
          </div>
        </div>

        <dl className="iffers-meta" data-reveal-group data-reveal-stagger="55">
          {study.hero.meta.map((item) => (
            <div data-reveal="soft" key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="iffers-origin" aria-labelledby="iffers-origin-title">
        <div className="iffers-origin-intro" data-reveal-group data-reveal-stagger="105">
          <div className="iffers-origin-sheet" data-reveal="left" data-reveal-group data-reveal-stagger="65">
            <p data-reveal="soft">{study.origin.eyebrow}</p>
            <h2 id="iffers-origin-title" data-reveal="soft">{study.origin.title}</h2>
            <p data-reveal="soft">{study.origin.body[0]}</p>
          </div>
          <aside data-reveal="right" aria-label="Project attribution">
            <p>Gift / collaboration / authorship</p>
            <strong>{study.origin.body[1]}</strong>
          </aside>
        </div>

        <div className="iffers-process" data-reveal-group data-reveal-stagger="100" aria-labelledby="iffers-process-title">
          <header data-reveal="left" data-reveal-group data-reveal-stagger="65">
            <p>Designing the frame</p>
            <h2 id="iffers-process-title">The site should support the work without competing with it</h2>
          </header>
          <ol data-reveal="right" data-reveal-group data-reveal-stagger="70">
            {study.principles.map((principle) => (
              <li data-reveal="soft" key={principle.title}>
                <h3>{principle.title}</h3>
                <p>{principle.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="iffers-media" aria-labelledby="iffers-media-title">
        <header data-reveal-group data-reveal-stagger="90">
          <div data-reveal="left">
            <p>{study.media.eyebrow}</p>
            <h2 id="iffers-media-title">{study.media.title}</h2>
          </div>
          <p data-reveal="right">{study.media.body}</p>
        </header>
        <IffersGallery />
        <p className="iffers-media-note" data-reveal="soft">{study.media.sourceNote}</p>
      </section>

      <section
        className="iffers-ownership"
        id="ownership"
        aria-labelledby="iffers-ownership-title"
      >
        <div className="iffers-ownership-copy" data-reveal="left" data-reveal-group data-reveal-stagger="65">
          <p data-reveal="soft">{study.ownership.eyebrow}</p>
          <h2 id="iffers-ownership-title" data-reveal="soft">{study.ownership.title}</h2>
          <p data-reveal="soft">{study.ownership.body}</p>
        </div>
        <ol data-reveal="right" data-reveal-group data-reveal-stagger="70" aria-label="Phil’s project scope">
          {study.ownership.scope.map((item) => (
            <li data-reveal="soft" key={item}>
              <strong>{item}</strong>
            </li>
          ))}
        </ol>
      </section>

      <section
        className="iffers-public-proof"
        id="live-site"
        aria-labelledby="iffers-proof-title"
      >
        <article data-reveal="left" data-reveal-group data-reveal-stagger="65">
          <p data-reveal="soft">{study.proof.eyebrow}</p>
          <h2 id="iffers-proof-title" data-reveal="soft">{study.proof.title}</h2>
          <p data-reveal="soft">{study.proof.body}</p>
        </article>

        <a
          className="iffers-live-link"
          data-reveal="right"
          href={study.publicUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${study.proof.linkLabel} (opens in a new tab)`}
        >
          <span>ifferspictures.com</span>
          <strong>{study.proof.linkLabel}</strong>
          <small>Opens the original project in a new tab.</small>
          <i aria-hidden="true">↗</i>
        </a>
      </section>

      <CaseStudyNavigator currentProjectId="iffers-pictures" />
    </main>
  );
}
