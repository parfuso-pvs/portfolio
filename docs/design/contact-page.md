# PORT-801 - Contact page

## Objective

Replace the Contact placeholder with a direct, recruiter-oriented contact experience that completes
the portfolio journey without adding a form, backend service, or unsupported availability claim.

## Source boundary

- Professional email, LinkedIn, and GitHub destinations are verified against Phil's August 25, 2026
  resume.
- The public page intentionally excludes Phil's phone number, municipality, postal code, and street
  address.
- The supplied resume PDF is not published in this ticket because it contains private contact details
  and claims that are intentionally excluded from the portfolio. Sanitized resume delivery remains a
  separate task.

## Composition

- The opening statement speaks to senior full-stack, product-engineering, frontend-platform, and
  systems-oriented work without claiming current availability.
- A dark signal sheet presents email, LinkedIn, and GitHub as three large, direct actions.
- The sheet uses the established cobalt registration bar, technical grid, editorial type, and
  numbered-ledger language instead of generic social cards.
- A final working-fit ledger describes the kinds of problems where Phil is most useful.

## Interaction and accessibility

- Every contact method is a native link and works without JavaScript.
- External destinations identify new-tab behavior in their accessible names and use `rel=noreferrer`.
- Rows maintain large touch targets and equivalent hover and focus-visible treatments.
- Decorative grids, marks, and directional glyphs are hidden from assistive technology.
- The page remains a Server Component with no new runtime dependency.

## Deferred

- A sanitized downloadable resume.
- Optional copy-to-clipboard enhancement and its accessible status announcement.
- Availability language, which requires explicit approval before publication.
