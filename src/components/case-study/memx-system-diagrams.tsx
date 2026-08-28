import { memxSystemDiagrams } from "@/content/case-studies/memx-diagrams";
import { MemxDiagramTrace } from "@/components/motion/memx-diagram-trace";

type FlowNodeProps = {
  detail: string;
  index: string;
  label: string;
  tone?: "dark" | "light";
};

function FlowNode({ detail, index, label, tone = "light" }: FlowNodeProps) {
  const dark = tone === "dark";

  return (
    <div
      className={`relative border-t pt-4 ${dark ? "border-media-foreground/25" : "border-line-strong"}`}
    >
      <p className={`type-mono ${dark ? "text-accent-on-dark" : "text-accent"}`}>{index}</p>
      <p className={`type-label mt-5 ${dark ? "text-media-foreground" : "text-ink"}`}>{label}</p>
      <p className={`type-body-small mt-3 ${dark ? "text-media-foreground/60" : "text-muted"}`}>
        {detail}
      </p>
    </div>
  );
}

export function MemxSystemDiagrams() {
  const { configuration, realtime } = memxSystemDiagrams;

  return (
    <section className="px-page-gutter pb-section" aria-labelledby="memx-system-diagrams">
      <div className="mx-auto w-full max-w-[90rem] border-t border-line-strong pt-6">
        <header className="grid gap-8 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-3">
            <p className="type-label text-accent">System diagrams</p>
            <p className="type-mono text-muted mt-3">Original abstractions / 01—02</p>
          </div>
          <div className="lg:col-span-7 lg:col-start-5">
            <h2 id="memx-system-diagrams" className="type-heading text-ink max-w-[12ch]">
              The architecture, without the private interface.
            </h2>
            <p className="type-body text-muted mt-7 max-w-2xl">
              Two bounded views of how market configuration and real-time delivery moved through the
              platform.
            </p>
          </div>
        </header>

        <figure
          className="material-blueprint mt-16 px-6 py-9 sm:px-10 sm:py-12 lg:mt-24 lg:px-14 lg:py-16"
          aria-labelledby="memx-configuration-title"
          aria-describedby="memx-configuration-summary memx-configuration-description"
        >
          <figcaption className="grid gap-8 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-3">
              <p className="type-mono text-accent">{configuration.index}</p>
              <p className="type-label text-muted mt-3">{configuration.eyebrow}</p>
            </div>
            <div className="lg:col-span-7 lg:col-start-5">
              <h3 id="memx-configuration-title" className="type-heading text-ink max-w-[14ch]">
                {configuration.title}
              </h3>
              <p id="memx-configuration-summary" className="type-body text-ink mt-6 max-w-2xl">
                {configuration.summary}
              </p>
            </div>
          </figcaption>

          <p id="memx-configuration-description" className="sr-only">
            {configuration.accessibleDescription}
          </p>

          <div
            className="relative mt-14 grid gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-6"
            aria-hidden="true"
          >
            <MemxDiagramTrace variant="configuration" tone="light" />
            <div className="material-sheet material-sheet-raised relative z-10 px-5 py-6 lg:col-span-2 lg:self-center">
              <FlowNode index="01" {...configuration.activeMarket} />
            </div>

            <div className="relative z-10 grid gap-6 border-l border-accent pl-6 lg:col-span-3">
              {configuration.inputs.map((step) => (
                <FlowNode key={step.index} {...step} />
              ))}
            </div>

            <ol className="relative z-10 grid gap-6 lg:col-span-7 lg:grid-cols-3">
              {configuration.output.map((step) => (
                <li
                  key={step.index}
                  className="relative border-l border-line-strong pl-6 lg:border-l-0 lg:pl-0"
                >
                  <FlowNode {...step} />
                </li>
              ))}
            </ol>
          </div>
        </figure>

        <figure
          className="bg-media-backdrop text-media-foreground relative mt-8 overflow-hidden px-6 py-9 sm:px-10 sm:py-12 lg:px-14 lg:py-16"
          aria-labelledby="memx-realtime-title"
          aria-describedby="memx-realtime-summary memx-realtime-description"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-15 [background-image:linear-gradient(color-mix(in_srgb,var(--paper-raised)_18%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_srgb,var(--paper-raised)_18%,transparent)_1px,transparent_1px)] [background-size:4rem_4rem]"
            aria-hidden="true"
          />
          <figcaption className="relative grid gap-8 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-3">
              <p className="type-mono text-accent-on-dark">{realtime.index}</p>
              <p className="type-label text-media-foreground/60 mt-3">{realtime.eyebrow}</p>
            </div>
            <div className="lg:col-span-7 lg:col-start-5">
              <h3
                id="memx-realtime-title"
                className="type-heading text-media-foreground max-w-[14ch]"
              >
                {realtime.title}
              </h3>
              <p
                id="memx-realtime-summary"
                className="type-body text-media-foreground/70 mt-6 max-w-2xl"
              >
                {realtime.summary}
              </p>
            </div>
          </figcaption>

          <p id="memx-realtime-description" className="sr-only">
            {realtime.accessibleDescription}
          </p>

          <div className="relative mt-14">
            <MemxDiagramTrace variant="realtime" tone="dark" />
            <ol className="relative z-10 grid gap-8 lg:grid-cols-5 lg:gap-6" aria-hidden="true">
              {realtime.steps.map((step) => (
                <li
                  key={step.index}
                  className="relative border-l border-accent-on-dark pl-6 lg:border-l-0 lg:pl-0"
                >
                  <FlowNode {...step} tone="dark" />
                </li>
              ))}
            </ol>
          </div>
        </figure>
      </div>
    </section>
  );
}
