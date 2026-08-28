# PORT-702 - About career progression

## Objective

Turn the About page's selected-context ledger into a resume-verified career chapter that shows how
Phil's responsibilities expanded while keeping concurrent after-hours work distinct from his
full-time path.

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

- One raised paper surface carries the primary EarthCam-to-MEMX path.
- A blueprint sheet overlaps it only at the desktop breakpoint and carries PixelVerse and Domani as
  explicitly parallel practice.
- The primary track uses one continuous rule with registration points rather than separate cards.
- On narrow screens, both tracks return to source-order columns and the overlap is removed.

## Semantics and states

- Both tracks are ordered lists and every bounded date is represented by a semantic `time` element.
- The timeline remains a Server Component with no new dependency or client JavaScript.
- Loading, empty, error, success, hover, focus, active, and disabled states do not apply to this
  static chronology.

## Deferred

Resume delivery, a technology inventory, portraiture, contact actions, and the final About-to-Contact
close remain later tickets.
