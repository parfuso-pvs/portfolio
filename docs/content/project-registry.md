# Project content registry

PORT-302 establishes `src/content/projects.ts` as the source of truth for shared portfolio-project facts. Navigation, route metadata, page introductions, work indexes, home features, case studies, and future structured data must consume this registry instead of duplicating names, paths, roles, summaries, metrics, or attribution.

## Model boundaries

The registry uses a discriminated union:

- `featured` projects have a canonical `/work/...` route, navigation label, case index, and case-study status;
- `supporting` projects have no route and remain concise Home/About context in v1;
- all projects carry approved features, proof points, ownership, attribution, media rules, roadmap items, and approved public metrics;
- featured projects also carry the concise artifact copy used by visual index compositions.

The ordered project hierarchy is MEMX, Domani, Iffer's Pictures, PixelVerse Studios, and EarthCam. Only the first three feed primary navigation.

## Publishing rules encoded in data

### MEMX

- Use original non-proprietary diagrams only.
- Never publish private screenshots, reconstructed exchange interfaces, order books, matching-engine displays, or fake exchange data.
- Attribute the initial database-driven architecture to Phil's manager and the frontend configuration foundation to Phil.
- Treat the eight-market scope and approximate 70% portal-work share as proof points, not invented performance metrics.

### Domani

- Every production metric retains the August 26, 2026 snapshot date and evidence-source category.
- Shared Apple/Android analytics identifiers are not downloads.
- The registry excludes the non-cohort conversion calculation and does not present it as a product metric.
- Nested checklists, bullet lists, and templates remain roadmap items, not shipped features.
- Only real production screenshots or faithful code-native compositions are approved.

### Iffer's Pictures

- Phil's independent ownership of discovery, copy, visual design, implementation, and client collaboration must remain explicit.
- Use only approved real client photography; generated family, maternity, couple, portrait, or event images are prohibited.

### PixelVerse Studios

- PixelVerse remains an after-hours studio and supporting narrative, not a flagship employer-equivalent case study.
- Phil leads development; Sami leads design; both share administration, sales, and general client support.
- Iffer's Pictures remains the explicit design-ownership exception.

### EarthCam

- EarthCam remains concise earlier-career context.
- Public player imagery and original component-system diagrams are allowed; private streams and unsupported historical performance claims are not.

## Engineering contract

- Keep IDs and canonical routes unique.
- Add public figures only when their source, context, and snapshot date are defensible.
- Put future functionality in `roadmap`, never `approvedFeatures`.
- Keep media permissions and prohibitions explicit enough for later design tickets to consume without guessing.
- Keep visible project-specific artifact copy and its concise assistive-technology equivalent in `artifactCopy`; do not hard-code factual labels in presentation components.
- Do not add page-layout or presentation concerns to the registry.
- A supporting project cannot acquire a route without an explicit information-architecture decision.
