# PORT-502 - Domani production product media

## Objective

Add the first verified production view to Domani's case study without reconstructing the interface,
inventing product states, or mixing demonstration values with portfolio analytics.

## Source and asset handling

- `Today Screen` is a real public product image served by Domani's production website.
- The original 1008 × 2126 transparent PNG is self-hosted at
  `public/images/domani/today-screen.png` so the portfolio does not depend on another site's build
  hash or uptime.
- The visible person name, date, tasks, and values are part of the published demonstration image.
  They are not presented as production analytics or user records.

## Composition

- A dark, bounded product stage keeps the transparent phone image legible and visually connected to
  Domani's evening-planning chapter.
- A blueprint figure surface connects the media to the portfolio's Human Assembly system.
- The caption explains only visibly supported behavior: daily progress, one top priority, categories,
  and priority levels.
- Desktop uses a five-column product stage and six-column editorial caption. Mobile places the image
  before its explanation and constrains it to the available width.

## Accessibility and performance

- The screenshot has an informative alternative describing the visible screen and its hierarchy.
- Decorative rings and the cobalt registration strip are hidden from assistive technology.
- Explicit intrinsic dimensions prevent layout shift, and responsive `sizes` lets Next.js select an
  appropriate generated image width.
- The below-the-fold image is intentionally not marked `priority`.

## Interaction states

The figure is static product evidence. Loading, empty, error, success, hover, focus, disabled, and
active controls do not apply.

## Deferred

Dated product metrics, store evidence, any additional approved screens, closing navigation, and
Domani's published status remain follow-up tickets.
