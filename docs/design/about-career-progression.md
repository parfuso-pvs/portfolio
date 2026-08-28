# PORT-702 - About career progression

## Objective

Turn the About page's selected-context ledger into one resume-verified career chronology that shows
how Phil's responsibilities expanded while keeping concurrent after-hours work visibly distinct.

## Source boundary

- Dates and role progression come from Phil's August 25, 2026 resume.
- EarthCam runs from March 2018 through December 2019, including the July 2019 move into frontend
  leadership.
- MEMX runs from December 2019 to present, with the January 2023 move from frontend engineering to
  senior full-stack engineering.
- PixelVerse Studios is part-time from January 2024 to present.
- Domani runs from December 2025 to present and launched publicly in May 2026.
- Project names and hierarchy continue to resolve through the typed project registry.
- Unsupported resume percentages, private contact details, and a generated portrait remain
  excluded.

## Composition

- A scroll-driven editorial journey carries all four entries in chronological start-date order.
- Five milestones represent four organizations. MEMX is intentionally split into its frontend and
  senior full-stack positions, with an explicit two-position sequence tying them together.
- The chronology spine sits at the metadata/story boundary on desktop and fills in cobalt as the
  viewport advances through the list. A visible progress head travels continuously at the leading
  edge of the fill.
- Progress is measured between the first and last milestone centers rather than the decorative ends
  of the spine. Reaching the page end resolves the final milestone explicitly so Domani can enter
  focus at every supported viewport height.
- One chapter is in focus at a time. Its story lifts into a pinned paper sheet while the surrounding
  chapters stay readable but visually recede.
- Full-time milestones use circular points; after-hours milestones use diamond points and retain an
  explicit label. When an after-hours chapter is active, its sheet reveals the blueprint material.
- Desktop chapters use a compact 24rem stage: enough room for a focused transition without making
  the chronology feel monumental or sparse.
- On narrow screens, the spine moves left and every entry returns to the same
  metadata-project-detail order without horizontal overflow.

## Research decisions

- [Nielsen Norman Group's company-information research](https://media.nngroup.com/media/reports/free/Presenting_Company_Information_on_Corporate_Websites_3rd_Edition.pdf)
  favors a simple vertical chronology with short, informative milestones because it matches normal
  page scrolling and improves scanning.
- Its [layer-cake scanning research](https://www.nngroup.com/articles/layer-cake-pattern-scanning/)
  supports consistent, descriptive headings with tightly associated body copy rather than wide gaps
  between a title and its explanation.
- [Material Design's print-derived layout guidance](https://m1.material.io/layout/principles.html)
  reinforces the use of a repeated grid, baseline alignment, restrained paper language, and scalable
  spacing.
- Current editorial portfolio references were used for restraint rather than copied literally: large
  type remains characterful, but the chronology now uses one repeatable ledger system.

## Semantics and states

- The career chapter is one ordered list and every bounded date is represented by a semantic `time`
  element.
- The About narrative remains server rendered; only the isolated career journey is a Client
  Component.
- Scroll work is throttled through `requestAnimationFrame`. The progress transform is updated
  directly so continuous scrolling does not trigger React renders; React state changes only when the
  active chapter changes.
- The focused list item exposes `aria-current="step"`. The progress line is decorative, and all
  content remains present and readable without relying on animation.
- Reduced-motion users receive effectively instant state changes through the global motion baseline.

## Deferred

Resume delivery, a technology inventory, portraiture, contact actions, and the final About-to-Contact
close remain later tickets.
