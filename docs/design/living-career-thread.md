# PORT-1002 - Living Career Thread

## Objective

Replace the project-gallery homepage with a navigation-free, recruiter-focused landing experience.
The page introduces Phil plainly, presents his full-time career in chronological order, and keeps
independent work visibly related without confusing it with employment.

## Product model

- `/` is the primary index and the only general navigation surface.
- The homepage has no conventional global navigation bar.
- MEMX, Domani, Iffer's Pictures, and EarthCam use real detail routes.
- Detail pages return to `/#experience`, preserving normal URL, history, and keyboard behavior.
- PixelVerse Studios remains supporting context rather than a standalone case study.
- The résumé link remains deferred until a public copy without private contact details exists.

## Content hierarchy

1. A concise introduction written in Phil's conversational voice.
2. MarketView as an undated origin note.
3. EarthCam as one company chapter with two non-overlapping role chapters.
4. MEMX as the next company chapter with two non-overlapping role chapters.
5. PixelVerse Studios, Domani, and Iffer's Pictures as work built alongside the later MEMX years.
6. A restrained contact close for frontend, full-stack web, and mobile roles.

## Visual direction

The approved direction is a softer expression of Human Assembly:

- warm paper, graphite, cobalt, Instrument Sans, Newsreader, and IBM Plex Mono remain;
- one gently curved cobalt career thread replaces blueprint grids and decorative rules;
- generous negative space and typography establish hierarchy;
- role chapters use quiet raised-paper insets rather than floating duration pills;
- company chapters never overlap or alternate sides;
- mobile becomes a deliberate single reading column beside the thread.

## Interaction boundary

- Every detail destination is a real link with a visible hover, focus, and active state.
- The thread fills with scroll progress as progressive enhancement only.
- Primary content is server rendered and never waits for motion.
- Reduced motion renders the complete cobalt thread immediately.
- Shared chapter-to-detail morphing and scroll-position restoration are deferred to the next motion
  ticket so the static information architecture can be reviewed independently.

## Factual boundary

- MarketView dates remain unpublished because the verified source does not include them.
- EarthCam and MEMX dates and role changes come from Phil's confirmed résumé chronology.
- MEMX ends in August 2026 based on Phil's later explicit confirmation.
- Project responsibilities and attribution continue to come from the typed project registry.
- No generated mockup text, unsupported metrics, private screenshots, phone number, or street
  address is published.
