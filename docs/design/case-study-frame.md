# PORT-401 - Case-study page frame

## Objective

Replace the featured-project route placeholders with a shared editorial frame that establishes
hierarchy, attribution, responsive behavior, and a stable seam for project-specific chapters.

## Shared composition

- Every featured route receives the same structural sequence: case-file header, project identity,
  registry-backed artifact note, ownership, and attribution.
- The frame uses the existing 12-column Human Assembly grid and material primitives without making
  every project look like a generic card.
- The artifact note consumes each project's centralized copy and remains an abstract composition,
  not a screenshot or reconstructed product interface.
- The optional `children` seam allows later case-study tickets to append project-specific narrative,
  media, metrics, and diagrams without replacing the page foundation.

## Content boundaries

- Names, disciplines, roles, summaries, ownership, attribution, and artifact copy come from the
  typed project registry.
- MEMX remains limited to original, non-proprietary abstraction.
- This ticket does not mark any case study as published or add detailed outcome claims.

## Interaction and accessibility

- The frame is a Server Component with one page heading and a labelled foundation section.
- The Work Index return path has a 44px target and distinct hover, keyboard-focus, and active states.
- Desktop asymmetry collapses into a deliberate single-column reading order on small screens.
- Loading, empty, error, success, and disabled states do not apply to static registry content.

## Deferred

MEMX system chapters and diagrams, Domani product media and metrics, Iffer's Pictures photography,
cross-case navigation, and case-study completion status belong to subsequent tickets.
