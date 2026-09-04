import { domaniCaseStudy } from "@/content/case-studies/domani";

export function DomaniPlanningLoop() {
  return (
    <figure className="domani-planning-loop" data-reveal="scale" data-reveal-group data-reveal-stagger="80" id="planning-loop">
      <figcaption data-reveal="soft">
        <span>Daily planning loop</span>
        <strong>Three small decisions, in order</strong>
      </figcaption>
      <p className="sr-only">
        The loop begins by planning tonight, continues by choosing one top
        priority, and ends by carrying unfinished work forward intentionally.
      </p>

      <ol data-reveal="soft" data-reveal-group data-reveal-stagger="70" aria-hidden="true">
        {domaniCaseStudy.principles.map((principle) => (
          <li data-reveal="soft" key={principle.title}>
            <small>{principle.label}</small>
            <strong>{principle.title}</strong>
            <p>{principle.body}</p>
          </li>
        ))}
      </ol>
    </figure>
  );
}

export function DomaniOwnershipFlow() {
  return (
    <figure className="domani-ownership-flow" data-reveal="scale" data-reveal-group data-reveal-stagger="70" id="ownership-flow">
      <figcaption className="sr-only">
        Shared product ownership moves through planning and design, then into
        building, releasing, and learning.
      </figcaption>
      <ol data-reveal="soft" data-reveal-group data-reveal-stagger="60" aria-hidden="true">
        {domaniCaseStudy.ownership.stages.map((stage) => (
          <li data-reveal="soft" key={stage}>
            <strong>{stage}</strong>
          </li>
        ))}
      </ol>
      <p data-reveal="soft" aria-hidden="true">Feedback returns to the next decision ↺</p>
    </figure>
  );
}
