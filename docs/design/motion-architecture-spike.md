# PORT-901 - Motion architecture spike

## Decision

Use `motion` 13 as the portfolio's only JavaScript animation engine. Keep Motion inside small,
route-local Client Components, import animated elements from `motion/react-m`, and lazy-load the
`domAnimation` feature bundle. CSS remains the default for simple hover, focus, and one-shot
transitions.

The selected version is compatible with the repository's React 19 runtime. Motion values update
animated styles outside React render state, `useScroll` provides a cleanup-safe scroll source, and
`MotionConfig reducedMotion="user"` establishes the accessibility policy for every Motion subtree.

References:

- [Motion installation and Next.js guidance](https://motion.dev/docs/react-installation)
- [Motion bundle-size guidance](https://motion.dev/docs/react-reduce-bundle-size)
- [Motion reduced-motion guidance](https://motion.dev/docs/react-accessibility)
- [Motion scroll values](https://motion.dev/docs/react-use-scroll)

## Production prototype

The homepage hero is the representative motion seam:

- two decorative paper layers respond to a fine mouse pointer with opposing, bounded depth;
- the layers settle vertically as the hero moves through the viewport;
- pointer and scroll updates use Motion values rather than React state;
- touch pointers do not activate parallax;
- reduced-motion users receive the final static composition;
- the headline, links, project content, and main sheet remain server rendered and motion-independent.

The prototype deliberately does not convert the hero, page, or root layout into a Client Component.

## Bundle measurement

Measurements were taken from clean Next.js 16.3.3 production builds using Node 24.14.1 and npm
11.11.0. Values are the summed gzip sizes of JavaScript chunks referenced by each prerendered HTML
route; they are comparison data, not network-transfer telemetry.

| Build                         |      Home |   Contact | All emitted chunks |
| ----------------------------- | --------: | --------: | -----------------: |
| Static baseline at PR #29     | 180,608 B | 180,608 B |          192,169 B |
| Rejected global boundary      | 212,618 B | 198,145 B |          240,076 B |
| Selected route-local boundary | 207,866 B | 180,609 B |          228,864 B |

The route-local architecture keeps an unrelated static route effectively at baseline while adding
27,258 bytes gzip to the homepage's initial referenced chunks. The lazy feature chunk accounts for
the remainder of the 36,695-byte emitted-build delta and loads after the initial render.

## Runtime frame measurement

The production prototype was measured on an arm64 Mac running macOS 26.5.2 and Chrome
152.0.7977.64 at a 1280 × 720 viewport. Each probe drives 120 consecutive animation frames after a
one-second page warmup and records `requestAnimationFrame` intervals plus browser long-task entries.
Pointer movement crosses and oscillates through the hero; scrolling traverses the full homepage.

| Interaction | Frames | p50 frame | p95 frame | Worst frame | Frames >20 ms | Long tasks |
| ----------- | -----: | --------: | --------: | ----------: | ------------: | ---------: |
| Pointer     |    119 |   16.7 ms |   16.7 ms |     16.8 ms |             0 |          0 |
| Scroll      |    119 |   16.7 ms |   16.8 ms |     16.8 ms |             0 |          0 |

The trace was captured from a clean `next build` served by `next start`, not the development server.
It validates a sustained 60 fps cadence in this test environment without observed main-thread long
tasks. The pointer handler also caches its hero rectangle once per pointer entry; continuous pointer
events update Motion values without repeating layout measurement.

To reproduce against a running production build:

```bash
MOTION_TEST_URL=http://localhost:3017/ npm run measure:motion
```

`CHROME_PATH` can override the default macOS Chrome executable. The probe prints JSON so later motion
tickets can compare frame percentiles, dropped-frame counts, and long tasks under the same scenario.

## Alternatives evaluated

### Global Motion boundary and route trace — rejected

A non-blocking cobalt route trace was prototyped in the root template. It added about 17.5 KB gzip
to Contact before any page-specific animation. That cost was not justified by a decorative signal,
so the template and global boundary were removed.

PORT-906 evaluates page transitions as an independent progressive enhancement. It adopts React View
Transitions rather than the global Motion trace, preserving native navigation and adding no global
animation runtime.

### CSS and hand-written observers only — not selected as the primary engine

The current site proves this approach can remain small, but the career journey already contains
manual requestAnimationFrame scheduling, measurements, cleanup, and state synchronization. Repeating
that infrastructure for shared layout, scroll-linked diagrams, and interrupted transitions would
increase bespoke lifecycle code and review risk. CSS remains appropriate for simple states.

### GSAP — rejected

GSAP would be capable, but it would introduce a second, imperative animation model without solving a
requirement Motion cannot cover. It must not be added alongside Motion.

## Rules for later tickets

1. Keep Server Components as the content owner and pass rendered children through client motion
   leaves.
2. Load Motion only on routes that use it; do not add a root provider without a new measurement.
3. Use transform and opacity for continuous work. Do not animate layout properties.
4. Use Motion values or scoped animation APIs instead of frame-by-frame React state.
5. Stop parallax for touch/coarse pointers and for reduced-motion users.
6. Navigation must happen immediately and must never wait for animation completion.
7. Remove `will-change` from elements that do not animate continuously or remain visible.
8. Re-measure route chunks when motion is introduced to another route.

## Deferred work

- PORT-902 completes the bounded homepage hero sequence while preserving this architecture.
- PORT-903 adds bounded navigation-tab and mobile-sheet motion without expanding the JavaScript
  animation boundary.
- PORT-904 adds route-local drawing to the two MEMX editorial diagrams while preserving their Server
  Component content.
- PORT-905 migrates the About career chronology from bespoke scroll scheduling to route-local Motion
  values while preserving its milestone-center and page-end behavior.
- PORT-906 adopts typed React View Transitions for route hierarchy with a zero-duration
  reduced-motion result; the rejected global Motion trace remains outside the architecture.
