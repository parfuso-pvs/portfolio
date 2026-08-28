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

- A borderless editorial ledger carries all four entries in chronological start-date order.
- One continuous rule and four registration points make the work read as one career story without
  enclosing the entire section in a large card.
- Every desktop row shares the same metadata, project, and role/detail columns for predictable
  scanning.
- EarthCam and MEMX remain plain paper entries; PixelVerse and Domani receive a quiet blueprint wash,
  filled registration points, and explicit after-hours labels without changing row geometry.
- Project titles use a restrained local scale so dates, role progression, and descriptions remain
  visible in the same scan.
- On narrow screens, every entry returns to the same single-column metadata-project-detail order.

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
- The timeline remains a Server Component with no new dependency or client JavaScript.
- Loading, empty, error, success, hover, focus, active, and disabled states do not apply to this
  static chronology.

## Deferred

Resume delivery, a technology inventory, portraiture, contact actions, and the final About-to-Contact
close remain later tickets.
