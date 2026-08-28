# PORT-904 - MEMX diagram drawing

## Objective

Add explanatory path drawing to the two existing MEMX system figures without hiding their content,
changing their factual model, or moving confidential exchange behavior into the portfolio.

## Sequence

- Figure 01 draws the active-market trunk, branches toward database configuration and market-specific
  classes, rejoins at shared platform context, and continues through the reusable UI and sanitized
  request path.
- Figure 02 draws one continuous delivery line with registration ticks between the exchange event,
  backend handler, WebSocket delivery, field handling, and live UI update.
- Each figure starts once when roughly 35% of its trace enters the viewport and remains settled after
  completion. The paths use one restrained 720ms segment cadence rather than continuous motion.
- Mobile receives purpose-built vertical paths that preserve the source order instead of compressing
  the desktop traces.

## Architecture

- `MemxSystemDiagrams` remains a Server Component and continues to own every heading, summary, node,
  text equivalent, and confidentiality boundary.
- `MemxDiagramTrace` is a route-local Client Component that renders only `aria-hidden` SVG paths.
- The leaf reuses the selected Motion 13 `LazyMotion` feature bundle and imports animated elements
  from `motion/react-m`.
- Existing borders and every content node remain visible before, during, and after drawing. Motion is
  an explanatory overlay, never a content gate.
- The observer runs once per responsive trace and stops after entry through Motion's `viewport`
  policy. There is no pointer tracking, React state, or continuous animation loop.

## Accessibility and responsive behavior

- The original figure captions and concise text equivalents remain the accessible representation;
  the trace layer is decorative and hidden from assistive technology.
- Reduced-motion users receive the complete trace immediately. The Motion hook skips the initial
  draw target after hydration, while a CSS media-query override guarantees a complete server-rendered
  stroke before hydration.
- Desktop and mobile traces are separate SVG compositions. Only the composition for the current
  breakpoint is displayed.
- No interactive states are introduced. Navigation, selection, and reading order remain unchanged.

## Confidentiality boundary

The paths describe only the already approved configuration and delivery relationships. They contain
no field names, payload shapes, prices, quantities, market data, private screenshots, or reconstructed
interfaces.

## Scope boundary

This ticket does not animate the homepage schematic, reveal text nodes, migrate the About career
timeline, add page transitions, or change case-study content.

## Verification

- The clean production build references 199,029 bytes gzip of JavaScript and 12,996 bytes gzip of
  CSS from the prerendered MEMX HTML. The route-local Motion feature bundle remains lazy and is not
  part of those initial HTML references.
- The same build references 209,383 bytes gzip of JavaScript on Home and 180,947 bytes on Contact;
  the unrelated Contact route remains within 82 bytes of the PORT-903 baseline.
- All emitted chunks total 241,881 bytes gzip of JavaScript and 13,223 bytes gzip of CSS.
- Browser inspection covered both figures at the default desktop viewport and at 320 x 720. The
  horizontal traces recompose into vertical mobile guides without clipping, content obstruction, or
  horizontal overflow.
- `npm run verify` passes all 108 tests and the static production build.

The dedicated production probe scrolls through both MEMX figures while they draw, records animation
frames and long tasks, then confirms every visible path reaches its settled state. It was run against
the production build in Chrome 152 at 1280 x 720.

| Frames | p50 frame | p95 frame | Worst frame | Frames >20 ms | Long tasks | Settled paths |
| -----: | --------: | --------: | ----------: | ------------: | ---------: | ------------: |
|    119 |   16.7 ms |   16.8 ms |     16.8 ms |             0 |          0 |           6/6 |

To reproduce against a running production build:

```bash
MOTION_SCENARIO=memx-diagrams \
MOTION_TEST_URL=http://localhost:3019/work/memx \
npm run measure:motion
```
