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

- One raised paper surface carries all four entries in chronological start-date order.
- One continuous rule and four registration points make the work read as one career story.
- EarthCam and MEMX remain plain paper entries; PixelVerse and Domani receive inset blueprint
  surfaces, filled registration points, and explicit after-hours labels.
- On narrow screens, every entry returns to the same single-column date-then-story order.

## Semantics and states

- The career chapter is one ordered list and every bounded date is represented by a semantic `time`
  element.
- The timeline remains a Server Component with no new dependency or client JavaScript.
- Loading, empty, error, success, hover, focus, active, and disabled states do not apply to this
  static chronology.

## Deferred

Resume delivery, a technology inventory, portraiture, contact actions, and the final About-to-Contact
close remain later tickets.
