# PORT-905 - About career timeline motion

## Objective

Migrate the existing About career progression from bespoke scroll scheduling to the selected Motion
architecture without changing its content, chronology, visual composition, semantics, or final-step
behavior.

## Architecture

- `AboutNarrative` remains the Server Component content owner and passes typed, registry-backed
  career entries into the isolated `CareerJourney` Client Component.
- `CareerJourney` reuses the route-local `LazyMotion` feature bundle and imports animated elements
  from `motion/react-m`.
- `useScroll` and `useMotionValueEvent` replace the manual scroll listener and
  `requestAnimationFrame` scheduler.
- A `ResizeObserver` measures the list only when its layout changes. Milestone centers are cached in
  document coordinates, and continuous scroll updates read those cached values rather than measuring
  every chapter on every frame.
- Motion values drive the progress-line scale and progress-head translation outside React's render
  cycle. React state changes only when the active chapter changes.
- The existing first-to-last milestone calculation and explicit page-end resolution remain intact,
  so Domani becomes the active final step at every verified viewport height.

## Semantics and accessibility

- The chronology remains one ordered list with five list-item children. Decorative spine, progress,
  and progress-head layers are positioned siblings rather than invalid direct children of the list.
- `aria-current="step"`, semantic `time` elements, the timeline key, full-time circles, and
  after-hours diamonds are unchanged.
- All career content remains visible without Motion. Animation never gates reading or navigation.
- Reduced-motion mode keeps the progress line complete, removes the traveling head, and relies on the
  existing immediate chapter-state transitions.

## Responsive behavior

- Desktop preserves the 12-column chronology, midpoint spine, pinned active sheet, and 24rem chapter
  stage.
- Mobile preserves the single-column source order, left spine, full readable copy, and page-end final
  milestone at 320 x 720 without horizontal overflow.

## Bundle measurement

Measurements use the Node 24.14.1 / npm 11.11.0 production build and sum gzip-compressed chunks
referenced by each prerendered route.

| Route   | JavaScript |      CSS |
| ------- | ---------: | -------: |
| About   |  205,868 B | 12,904 B |
| Home    |  209,788 B | 12,951 B |
| Contact |  180,947 B | 12,724 B |

All emitted chunks total 246,954 bytes gzip of JavaScript and 13,351 bytes gzip of CSS. Compared with
the recorded PORT-904 build, the completed migration adds 5,073 bytes of emitted JavaScript and 128
bytes of CSS; Contact remains the unrelated static-route control and adds no referenced JavaScript.
Motion's feature bundle continues to load asynchronously rather than joining About's prerendered HTML
references.

## Runtime verification

The dedicated production probe scrolls from the career section's approach through the page end,
records frame intervals and long tasks, validates five direct `li` children, and requires Domani to
settle as the active final step. Repeated Chrome 152 runs at 1280 x 720 produced the following stable
result:

| Frames | p50 frame | p95 frame | Worst frame | Frames >20 ms | Long tasks | Final step  |
| -----: | --------: | --------: | ----------: | ------------: | ---------: | ----------- |
|    119 |   16.7 ms |   16.8 ms |     16.8 ms |             0 |          0 | Domani / 05 |

The same production scenario with forced reduced motion reports the same frame result, preserves the
final step, and confirms the traveling progress head is hidden.

```bash
MOTION_SCENARIO=about-career \
MOTION_TEST_URL=http://localhost:3019/about \
npm run measure:motion

MOTION_SCENARIO=about-career \
MOTION_REDUCED=1 \
MOTION_TEST_URL=http://localhost:3019/about \
npm run measure:motion
```

## Scope boundary

This ticket does not change career copy, dates, roles, project attribution, the About page layout,
navigation, case studies, page transitions, or the global motion boundary.
