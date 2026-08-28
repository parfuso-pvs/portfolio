# PORT-902 - Homepage hero assembly motion

## Objective

Extend the validated PORT-901 motion architecture into a complete first-viewport assembly sequence
without delaying content, navigation, or accessibility semantics.

## Sequence

The hero now resolves in four restrained beats:

1. the blueprint back layer fades and scales into its authored position;
2. the identity rail settles vertically while remaining fully visible;
3. the raised backsheet follows with opposing pointer depth;
4. the primary sheet settles by ten pixels before the existing diagram reveal completes the sequence.

Only the two decorative back layers use opacity. The identity rail and primary sheet remain visible
throughout their transform-only settling motion, so the positioning statement, selected work, and
navigation never wait for animation.

## Architecture

- `HomeHero` remains a Server Component and owns all content-bearing markup.
- `HomeAssemblyMotion` accepts the identity rail and primary sheet as rendered React slots. Their
  source modules do not enter the client graph.
- The existing route-local `LazyMotion` boundary remains the only JavaScript animation boundary.
- Motion 13 remains the only JavaScript motion engine. The identity rail, primary sheet, and diagram
  use lightweight CSS one-shot motion because they do not need orchestration state.
- The identity and sheet CSS begins only inside `prefers-reduced-motion: no-preference`, leaving
  server-rendered HTML in its final position and avoiding a hydration-time snap for reduced-motion
  users.
- Pointer and scroll work continue to use Motion values outside React render state.

## Accessibility and input behavior

- `prefers-reduced-motion` receives the final static position immediately.
- Pointer parallax remains restricted to mouse pointer events and never activates for touch or pen
  input.
- All links remain native, immediately actionable links; animation does not intercept navigation.
- Decorative layers remain hidden from assistive technology.

## Production verification

Measurements use a clean Next.js 16.3.3 production build under Node 24.14.1 and npm 11.11.0.

| Build                          | Home route | Contact route | All emitted chunks |
| ------------------------------ | ---------: | ------------: | -----------------: |
| PORT-901 selected architecture |  207,866 B |     180,609 B |          228,864 B |
| PORT-902 completed sequence    |  208,176 B |     180,609 B |          229,174 B |

The completed sequence adds 310 bytes gzip to the homepage's referenced JavaScript and no measurable
JavaScript to Contact. Its primary-content settling keyframes are emitted as route-local CSS and do
not add another animation runtime.

The production Chrome 152 probe at 1280 × 720 recorded 119 pointer frames and 119 scroll frames. Both
interactions held a 16.7 ms median and 16.8 ms worst frame, with zero frames over 20 ms and zero long
tasks.

## Scope boundary

This ticket does not animate navigation tabs, draw the MEMX diagram, migrate the career timeline, or
introduce page transitions. Those remain independent tickets under the PORT-901 architecture rules.
