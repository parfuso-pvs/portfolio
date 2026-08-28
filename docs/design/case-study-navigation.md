# PORT-404 - Case-study closing navigation

## Objective

Close a completed case study with a clear transition back to the Work Index and forward to the next
featured project without turning the ending into a generic pagination control.

## Composition

- The close uses the dark media surface to create a deliberate end-state after the MEMX diagrams.
- The current case label and next-project content come from the typed project registry.
- The next case is the dominant action; returning to the complete Work Index remains available as a
  quieter secondary path.
- The component is reusable for later completed case studies, but PORT-404 mounts it only on MEMX.

## Interaction and accessibility

- Both destinations are native links with targets at least 44px tall.
- Hover, keyboard-focus, and active states use the established light-cobalt dark-surface treatment.
- The section has its own heading and labelled landmark relationship.
- Decorative grid and registration elements are hidden from assistive technology.
- The two-column next-project row becomes one clear vertical sequence on small screens.

## State coverage

The component is server rendered from static registry content. Loading, empty, error, success,
disabled, and asynchronous states do not apply.

## Deferred

Domani and Iffer's Pictures receive the component when their case-study narratives are completed.
