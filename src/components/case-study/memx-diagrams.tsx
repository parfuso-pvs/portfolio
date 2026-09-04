const configurationInputs = [
  {
    title: "Database configuration",
    detail: "Entities + feature flags",
  },
  {
    title: "Market-specific classes",
    detail: "Rules that cannot be shared",
  },
] as const;

export function MemxConfigurationDiagram() {
  return (
    <figure
      className="memx-system-figure memx-configuration-figure"
      data-reveal="scale"
      data-reveal-group
      data-reveal-stagger="90"
      id="configuration-diagram"
    >
      <figcaption>
        <span>Configuration flow</span>
        <strong>From active market to a valid request</strong>
      </figcaption>
      <p className="sr-only">
        The active market selects database configuration and market-specific
        classes. Both feed shared platform context, then a reusable frontend,
        and finally a sanitized request.
      </p>

      <div className="configuration-flow" data-reveal="soft" data-reveal-group data-reveal-stagger="80" aria-hidden="true">
        <div className="diagram-node configuration-active" data-reveal="soft">
          <span>Selection</span>
          <strong>Active market</strong>
        </div>

        <div className="configuration-branch" data-reveal="soft" data-reveal-group data-reveal-stagger="55" role="presentation">
          {configurationInputs.map((input) => (
            <div className="diagram-node" data-reveal="soft" key={input.title}>
              <span>Input</span>
              <strong>{input.title}</strong>
              <small>{input.detail}</small>
            </div>
          ))}
        </div>

        <div className="diagram-node configuration-context" data-reveal="soft">
          <i className="configuration-input-wire" />
          <span>Shared context</span>
          <strong>Shared platform context</strong>
          <small>One description of the current market</small>
        </div>

        <div className="configuration-output" data-reveal="soft" data-reveal-group data-reveal-stagger="65">
          <div className="diagram-node" data-reveal="soft">
            <span>Frontend</span>
            <strong>Reusable UI</strong>
            <small>Fields + visibility + validation</small>
          </div>
          <div className="diagram-node configuration-request" data-reveal="soft">
            <span>Output</span>
            <strong>Sanitized request</strong>
          </div>
        </div>
      </div>
    </figure>
  );
}
