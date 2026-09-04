import Link from "next/link";
import { featuredProjects, type FeaturedProject } from "@/content/projects";

type SelectedWorkProps = {
  anchorId?: string;
  description?: string;
  projects?: readonly FeaturedProject[];
  showHeading?: boolean;
  title?: string;
};

type ArtworkProps = {
  reveal: "left" | "right";
};

function MemxArtwork({ reveal }: ArtworkProps) {
  return (
    <div
      className="work-art work-art-memx"
      data-reveal={reveal}
      role="img"
      aria-label="One shared platform supports many markets through member, trading, and operations tools."
    >
      <div className="memx-simple" aria-hidden="true">
        <div className="memx-simple-frame memx-simple-frame-one" />
        <div className="memx-simple-frame memx-simple-frame-two" />
        <div className="memx-simple-type">
          <span>One platform</span>
          <strong>Many markets</strong>
        </div>
        <div className="memx-simple-tools">
          <span>Member tools</span>
          <span>Trading tools</span>
          <span>Operations tools</span>
        </div>
      </div>
    </div>
  );
}

function DomaniArtwork({ reveal }: ArtworkProps) {
  return (
    <div
      className="work-art work-art-domani"
      data-reveal={reveal}
      aria-hidden="true"
    >
      <div className="domani-orbit domani-orbit-one" />
      <div className="domani-orbit domani-orbit-two" />
      <div className="domani-device">
        <div className="domani-status">
          <span>Tomorrow</span>
          <span>8:42</span>
        </div>
        <p className="domani-date">Make room for what matters.</p>
        <div className="domani-priority">
          <span>Top priority</span>
          <strong>One clear thing</strong>
        </div>
        <div className="domani-task"><span />Plan before the day begins</div>
        <div className="domani-task"><span />Carry forward with intent</div>
        <div className="domani-progress"><span /></div>
      </div>
      <p className="domani-caption">PLAN / PRIORITIZE / FOLLOW THROUGH</p>
    </div>
  );
}

function IffersArtwork({ reveal }: ArtworkProps) {
  return (
    <div
      className="work-art work-art-iffers"
      data-reveal={reveal}
      aria-hidden="true"
    >
      <div className="iffers-frame iffers-frame-one" />
      <div className="iffers-frame iffers-frame-two" />
      <div className="iffers-type">
        <span>Light</span>
        <span>Composition</span>
        <span>Story</span>
      </div>
      <p>FULL OWNERSHIP / COPY · DESIGN · CODE</p>
    </div>
  );
}

function ProjectArtwork({
  artwork,
  reveal,
}: Pick<FeaturedProject, "artwork"> & ArtworkProps) {
  if (artwork === "memx") return <MemxArtwork reveal={reveal} />;
  if (artwork === "domani") return <DomaniArtwork reveal={reveal} />;
  return <IffersArtwork reveal={reveal} />;
}

export function SelectedWork({
  anchorId = "work",
  description =
    "A mix of work from my day job, a product I co-own, and a client site I designed and built.",
  projects = featuredProjects,
  showHeading = true,
  title = "See my work",
}: SelectedWorkProps = {}) {
  const titleId = `${anchorId}-title`;

  return (
    <section
      className="selected-work"
      aria-label={showHeading ? undefined : title}
      aria-labelledby={showHeading ? titleId : undefined}
    >
      {showHeading ? (
        <header className="work-heading" id={anchorId}>
          <div
            className="work-heading-inner"
            data-reveal-group
            data-reveal-stagger="90"
          >
            <h2 id={titleId} data-reveal="left">{title}</h2>
            <p data-reveal="soft">{description}</p>
          </div>
        </header>
      ) : null}

      <div className="work-index" id={showHeading ? undefined : anchorId}>
        {projects.map((project, index) => {
          const artworkDirection = index % 2 === 0 ? "right" : "left";

          return (
          <article
            className={`work-entry work-entry-${project.id}`}
            data-reveal-group
            data-reveal-stagger="100"
            id={project.id}
            key={project.id}
            aria-labelledby={`${project.id}-title`}
          >
            <div
              className="work-entry-copy"
              data-reveal-group
              data-reveal-stagger="65"
            >
              {project.id === "memx" ? null : (
                <div className="work-entry-meta" data-reveal="soft">
                  <span>{project.discipline}</span>
                </div>
              )}
              <h3 id={`${project.id}-title`} data-reveal="soft">{project.name}</h3>
              {project.id === "memx" ? null : (
                <p className="work-role" data-reveal="soft">{project.role}</p>
              )}
              <p className="work-summary" data-reveal="soft">{project.summary}</p>
              <ul
                className="work-scope"
                data-reveal-group
                data-reveal-stagger="55"
                aria-label={`${project.name} scope`}
              >
                {project.scope.map((item) => <li data-reveal="soft" key={item}>{item}</li>)}
              </ul>
              {project.route ? (
                <Link className="work-case-link" data-reveal="soft" href={project.route}>
                  View case study <span aria-hidden="true">↗</span>
                </Link>
              ) : null}
            </div>
            <ProjectArtwork artwork={project.artwork} reveal={artworkDirection} />
          </article>
          );
        })}
      </div>
    </section>
  );
}
