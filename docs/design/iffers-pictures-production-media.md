# PORT-602 - Iffer's Pictures production photography

## Objective

Add a verified set of real project photography to the Iffer's Pictures case study and present it as
editorial evidence of the public portfolio's photography-first direction.

## Source and usage

All four files are original public production images from the Iffer's Pictures media library. The
portfolio owner approved real Iffer's Pictures client photography for this case study. The files are
self-hosted at stable paths under `public/images/iffers-pictures/`; no generated or reconstructed
photography is used.

| Portfolio asset           | Original public source                                                   | Intrinsic size |
| ------------------------- | ------------------------------------------------------------------------ | -------------- |
| `maternity-session.jpg`   | `https://media.ifferspictures.com/maternity/maternity-08.jpg`            | 1080 × 720     |
| `family-session.jpg`      | `https://media.ifferspictures.com/family/family-25.jpg`                  | 1365 × 2048    |
| `engagement-detail.jpg`   | `https://media.ifferspictures.com/events/engagement/engagement-14.jpg`   | 2048 × 1365    |
| `baby-shower-details.jpg` | `https://media.ifferspictures.com/events/baby-shower/baby-shower-02.jpg` | 1333 × 2000    |

Photography remains the client's creative work. Phil's case-study claim is limited to discovery,
copy, visual direction, interface design, implementation, and direct client collaboration for the
site that presents it.

## Composition

- Four frames establish range across maternity, family, engagement, and event work.
- Desktop uses a twelve-column editorial assembly with varied scale, offsets, and one restrained
  overlap. The composition supports the Human Assembly direction without imitating a generic card
  gallery.
- Mobile returns every frame to document order in one column, preserving the subject matter and
  captions without overlap.
- Natural photographic color stays bounded inside the approved images; cobalt remains the interface
  accent.

## Accessibility and performance

- Every photograph has a specific text alternative describing the visible subject and setting.
- Captions communicate collection and framing intent without repeating the alternative text.
- `next/image`, explicit intrinsic dimensions, and responsive `sizes` prevent layout shift and avoid
  sending desktop widths to smaller viewports.
- The section is below the fold and intentionally uses lazy loading rather than `priority`.
- The gallery remains a Server Component and adds no animation or runtime dependency.

## Deferred

An external project link, closing case-study navigation, published project status, and any additional
photography remain follow-up work.
