# Homepage practice context

PORT-306 adds concise supporting context for PixelVerse Studios and EarthCam after the three featured projects.

## Hierarchy

1. PixelVerse Studios appears as an after-hours studio for local businesses and experimentation outside full-time product work.
2. EarthCam appears as an earlier-career foundation in frontend development and team leadership.
3. Both remain secondary to MEMX, Domani, and Iffer's Pictures and do not receive standalone case-study links in v1.
4. About is the single onward path for the broader career narrative.

## Composition

- The section avoids another pair of elevated project cards.
- One ruled editorial ledger contains two supporting entries, keeping the visual density lower than the featured-work sequence.
- PixelVerse and EarthCam share consistent structure without implying equal prominence to the flagship case studies.
- Desktop uses an offset 12-column layout; mobile preserves a direct PixelVerse-to-EarthCam reading order.

## Content boundaries

- Names, labels, roles, disciplines, summaries, ownership, and proof points come from `src/content/projects.ts`.
- PixelVerse copy explicitly preserves its after-hours, small-business, and experimentation framing.
- The ownership note states that Phil leads all coding while administrative, sales, and general client support are shared.
- EarthCam uses one leadership proof point and remains intentionally concise.
- Neither supporting project receives invented metrics, media, routes, or expanded feature lists.

## Interaction and performance

- The section is a Server Component and adds no dependency or client JavaScript.
- About is a real link with hover, focus, active, and 44px touch behavior.
- Static registry content has no loading, empty, error, or success runtime state.
