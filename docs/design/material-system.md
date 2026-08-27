# Human Assembly material system

PORT-203 translates the approved concept board's physical construction language into lightweight, reusable browser primitives. The system is intentionally quiet: material establishes depth and authorship while content remains the focus.

## Visual reference decisions

The approved board consistently uses five ideas worth carrying into production:

1. Warm paper planes create hierarchy through small tonal shifts rather than generic cards.
2. Blueprint grids appear as working context behind content, never as the reading surface for long copy.
3. Lifted sheets use hairline edges and shallow shadows; depth communicates assembly order.
4. Cobalt index tabs identify a system or section without introducing a second accent color.
5. Registration marks behave like print-production artifacts and remain strictly decorative.

The implementation uses CSS gradients, borders, tokenized colors, and one fixed inline SVG noise layer. It adds no raster request, client JavaScript, animation loop, canvas, or WebGL dependency.

## Primitives

| Primitive            | Contract                                                              | Intended use                                                      |
| -------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `MaterialSurface`    | Base paper with `flat`, `raised`, or `pinned` elevation               | Editorial sheets, project summaries, and assembled content planes |
| `material-vellum`    | Translucent raised-paper mixture with a quiet edge                    | Annotations and small overlays, not full reading sections         |
| `material-blueprint` | Major and minor cobalt grid over warm paper                           | Decorative system diagrams and bounded working areas              |
| `material-tab`       | Cobalt label with a restrained control radius                         | Section identity and active assembly layers                       |
| `RegistrationMark`   | Circular crosshair exposed to assistive technology as decoration only | Corners and alignment points used sparingly                       |

`MaterialSurface` remains a Server Component and accepts `div`, `section`, or `article` semantics. Consumers are responsible for supplying the appropriate accessible name when the chosen element requires one.

## Performance and accessibility rules

- Grain is a fixed, pointer-events-none pseudo-element at 2.5% opacity. It must never contain information or reduce text contrast materially.
- Grid and registration marks are decorative and must use `aria-hidden="true"` at the component boundary.
- Material effects are static. Do not animate grain, background position, blur, shadow, or filter.
- Use existing paper, line, graphite, cobalt, radius, and elevation tokens; do not add one-off component colors or shadows.
- Keep blueprint planes behind or beside content. Do not place paragraphs directly on a dense grid.
- Recompose background sheets at the mobile breakpoint and verify no horizontal overflow at 320px.
- Use `pinned` elevation once per composition by default. Too many lifted surfaces flatten the hierarchy.
