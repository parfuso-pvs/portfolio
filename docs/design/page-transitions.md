# PORT-906 - Page-transition progressive enhancement

## Decision

Adopt React View Transitions for typed, same-origin route changes. Next.js 16.3.3 activates the
browser API during App Router navigation without configuration, another animation dependency, a
root Client Component, or a custom navigation lifecycle. Browsers without the required API retain
the existing immediate Next.js navigation.

This replaces the rejected PORT-901 global Motion trace with a smaller platform-native seam. Motion
13 remains the only JavaScript animation engine for component-level orchestration; the route change
itself uses React and CSS because Next.js already owns its transition lifecycle.

## Navigation language

| Transition type | Meaning                                  | Motion                                               |
| --------------- | ---------------------------------------- | ---------------------------------------------------- |
| `route-forward` | Open a case study from an index or hero  | Old page registers left; destination enters right    |
| `route-back`    | Return to an index or the homepage       | Old page registers right; destination enters left    |
| `route-switch`  | Move between peer routes or case studies | Short vertical registration and restrained crossfade |

Browser back and forward actions carry no authored transition type and remain immediate. Direct
loads, reloads, hash navigation, unsupported browsers, and unrelated React updates also receive no
route animation.

## Architecture

- Every published page keeps its Server Component and wraps its existing content in the shared
  `RouteViewTransition` Server Component.
- `RouteViewTransition` maps the three explicit navigation types to CSS view-transition classes and
  sets `default="none"`, preventing unrelated updates from animating.
- Existing `next/link` elements retain their URLs, prefetching, modifier-key behavior, and native
  semantics. Their `transitionTypes` describe hierarchy without intercepting clicks or delaying
  navigation.
- The persistent header receives the stable `site-header` view-transition name. Its snapshot does
  not animate, preserving the navigation as a spatial anchor and preventing duplicate-header flash.
- The transition overlay passes pointer events through to the live page. No timeout, pending state,
  global provider, or exit-before-navigation sequence is introduced.

## Accessibility and responsive behavior

- Next.js route announcements, unique document titles, one `main#main-content` landmark, current-page
  `aria-current`, skip-link behavior, mobile disclosure focus, and Escape restoration remain intact.
- `prefers-reduced-motion: reduce` sets every view-transition group, old snapshot, and new snapshot
  to zero duration and delay, producing the browser's immediate content swap.
- The animation uses only transform and opacity. It changes no layout dimensions and introduces no
  horizontal overflow at 320 x 720.
- The transition is supplementary: content, navigation, and focus do not wait for it to complete.

## Bundle measurement

Measurements use the Node 24.14.1 / npm 11.11.0 production build and sum gzip-compressed chunks
referenced by each prerendered route.

| Route   | JavaScript |      CSS |
| ------- | ---------: | -------: |
| Home    |  209,830 B | 13,186 B |
| Work    |  180,989 B | 12,959 B |
| MEMX    |  199,082 B | 13,179 B |
| About   |  205,910 B | 13,139 B |
| Contact |  180,989 B | 12,959 B |

All emitted chunks total 246,996 bytes gzip of JavaScript and 13,586 bytes gzip of CSS. Compared with
the recorded PORT-905 build, the adopted spike adds 42 bytes of emitted JavaScript and 235 bytes of
CSS. No dependency or asynchronously loaded runtime chunk is added.

## Runtime verification

The production probe activates the typed Home-to-Work transition and verifies the final URL,
heading, active primary destination, single shared header, and single main landmark. Chrome 152 at
1280 x 720 produced:

| Frames | p50 frame | p95 frame | Worst frame | Frames >20 ms | Long tasks |
| -----: | --------: | --------: | ----------: | ------------: | ---------: |
|    119 |   16.7 ms |   16.8 ms |     16.8 ms |             0 |          0 |

The same production scenario with forced reduced motion completes with a 16.7ms p95, a 16.8ms worst
frame, no frames above 20ms, and no long tasks.

```bash
MOTION_SCENARIO=route-navigation \
MOTION_TEST_URL=http://localhost:3019/ \
npm run measure:motion

MOTION_SCENARIO=route-navigation \
MOTION_REDUCED=1 \
MOTION_TEST_URL=http://localhost:3019/ \
npm run measure:motion
```

## Scope boundary

This ticket does not add shared-element media morphs, loading-state animation, a pending-route
indicator, route content changes, analytics, new destinations, or deployment configuration.
