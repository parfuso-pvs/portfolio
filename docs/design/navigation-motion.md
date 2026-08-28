# PORT-903 - Navigation tab motion

## Objective

Add restrained registration motion to the persistent desktop index and mobile navigation sheet
without delaying native Next.js navigation, changing focus behavior, or expanding the global motion
runtime.

## Motion sequence

- Desktop hover and keyboard focus lift only the label by one pixel and draw a cobalt registration
  rule from left to right.
- The newly current desktop destination registers its persistent bottom rule with the same transform
  language. The cobalt plane and `aria-current="page"` remain the primary state indicators.
- Opening the mobile disclosure assembles the paper sheet with a six-pixel vertical settle and a
  restrained scale change while remaining fully visible. The current row's square registration mark
  resolves at the end of that entrance, then releases its animation transform so hover and focus
  feedback remain available.
- Closing is immediate. Escape, link activation, history restoration, and route changes never wait
  for an exit animation.

## Architecture and performance

- `PrimaryNavigation` remains the only navigation Client Component and keeps using `next/link` and
  `usePathname` according to the installed Next.js 16.3.3 guidance.
- Motion is implemented as a colocated CSS module because these one-shot and interaction states need
  no orchestration, measurement, or React render state.
- The ticket does not add Motion's layout-animation feature bundle to the shared header. Motion 13
  remains the only JavaScript animation engine elsewhere in the site.
- Every continuous effect and the bounded mobile entrance use transform only.
- Hover treatments are restricted to fine pointers. Keyboard focus receives equivalent feedback,
  while touch input retains the existing 44px targets without sticky hover-dependent state.

## Accessibility behavior

- `prefers-reduced-motion: reduce` receives every final state directly because all keyframes are
  declared only inside `prefers-reduced-motion: no-preference` and the global baseline collapses
  transitions.
- Current-page state continues to use `aria-current="page"`, a cobalt plane, and a persistent bottom
  rule so meaning is not color-only or motion-only.
- The closed mobile navigation remains absent through the native `hidden` attribute. Opening still
  moves focus to the first link, which remains visible throughout the entrance; Escape still closes
  and restores focus to the trigger.
- Navigation remains a collection of real, immediately actionable links.

## Production verification

Measurements use the Node 24.14.1 / npm 11.11.0 production build and sum gzip-compressed chunks
referenced by each prerendered route.

| Build                       | Home JavaScript | Contact JavaScript | All JavaScript |
| --------------------------- | --------------: | -----------------: | -------------: |
| PORT-902 completed sequence |       208,176 B |          180,609 B |      229,174 B |
| PORT-903 navigation motion  |       208,432 B |          180,865 B |      229,430 B |

The shared navigation's CSS-module class wiring adds 256 bytes gzip to referenced JavaScript without
adding a runtime or dependency. The completed build references 13,021 bytes gzip of CSS on Home and
12,774 bytes on Contact; all emitted CSS is 13,021 bytes gzip.

## Scope boundary

This ticket does not add page transitions, pending-route indicators, a focus trap, route content
motion, new navigation destinations, or navigation content changes.
