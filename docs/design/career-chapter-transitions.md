# PORT-1003 - Career chapter transitions

## Objective

Connect the Living Career Thread to its detail routes with a restrained shared-element transition.
The selected project name should remain recognizable as the visitor moves into a chapter, while
navigation, deep links, history, focus handling, and content rendering remain native.

## Decision

Use React's `ViewTransition` component around the project name on both the homepage and the matching
detail page. Next.js App Router navigation activates the browser transition automatically. This adds
no dependency, click interception, timer, pending overlay, global route animation, or page-wide
Client Component.

The closed PORT-906 experiment remains historical evidence only. Its directional page slides,
persistent-header snapshot, peer-route transitions, and global route wrapper are intentionally not
restored.

## Interaction model

- EarthCam, MEMX, Domani, and Iffer's Pictures use stable transition names derived from their typed
  project IDs.
- Homepage detail links retain real URLs and declare a `career-detail` transition type for explicit
  hierarchy, without changing their native behavior.
- Detail-page return links declare `career-return` and target a stable project-specific homepage
  anchor.
- Browser back and forward navigation remains browser-owned. Supporting browsers may pair the same
  shared elements; unsupported browsers perform the normal immediate route change.
- Only the selected project name morphs. The page surface, career thread, navigation controls, and
  detail content do not slide, pin, or wait.

## Return behavior

Each routed homepage entry owns a stable `experience-{project-id}` anchor. A detail page returns to
that exact chapter rather than the top of the broader Experience section. Native hash scrolling
provides a useful result with or without JavaScript, and the target uses scroll margin so its heading
does not sit against the viewport edge.

## Accessibility and performance

- The transition layer never captures pointer events.
- Reduced motion sets the shared transition duration and delay to zero.
- The project name remains real heading or link text; `ViewTransition` adds no substitute content.
- Next.js continues to own route announcements, focus behavior, prefetching, modifier-clicks, and
  browser history.
- Animation is bounded to 320ms and uses the browser's compositor-managed shared-element geometry.
- Direct loads, reloads, hash-only navigation, unsupported browsers, and unrelated route changes
  remain functional without the enhancement.

## Scope boundary

This ticket does not add global page slides, custom scroll restoration state, loading animation,
route blockers, pending indicators, analytics, new content, or changes to case-study sequencing.
