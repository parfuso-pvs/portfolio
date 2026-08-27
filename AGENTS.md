# Portfolio Project Operator Manual

This file defines the working rules for all agents and contributors in this repository. It applies to the entire repository unless a more specific nested `AGENTS.md` overrides it.

## Project overview

This repository contains Phil Arfuso's personal portfolio. The site is intended primarily for recruiters and hiring managers evaluating senior full-stack, product-engineering, frontend-platform, and systems-oriented roles.

The portfolio itself is part of the evidence. Implementation quality, responsiveness, accessibility, performance, content accuracy, and interaction polish are product requirements rather than optional cleanup.

The selected visual direction is **Human Assembly**:

- warm chalk and paper surfaces;
- graphite typography;
- cobalt as the primary system accent;
- vellum layers, blueprints, index tabs, registration marks, pins, and threads;
- asymmetric editorial layouts on larger screens;
- deliberate single-column recomposition on small screens;
- motion that assembles complicated parts into a clear whole.

Do not replace this direction with generic SaaS cards, purple gradients, glassmorphism, terminal styling, or an unrelated dark developer aesthetic.

## Sources of truth

Before beginning work, read:

1. this `AGENTS.md`;
2. `docs/planning/repository-audit.md`;
3. the current ticket description and acceptance criteria;
4. any repository files directly affected by the ticket.

The current approved project narrative is:

1. MEMX - flagship systems and platform-engineering case study;
2. Domani - flagship independent product and mobile-engineering case study;
3. Iffer's Pictures - featured visual project demonstrating complete creative and technical ownership;
4. PixelVerse Studios - supporting after-hours studio and experimentation story;
5. EarthCam - concise earlier-career foundation.

Do not infer public claims from generated mockup boards. Generated dates, metrics, portraits, diagrams, screenshots, and contact details are illustrative only.

## Ticket workflow

Work one ticket at a time.

Do not begin the next ticket while the current ticket is awaiting review, unless the user explicitly authorizes parallel work.

For every ticket:

1. update local `main` from `origin/main`;
2. create a short-lived branch from updated `main`;
3. restate the ticket objective, scope, dependencies, and acceptance criteria;
4. inspect relevant code before editing;
5. implement only the ticket scope;
6. run proportional verification;
7. inspect the complete diff for unrelated changes;
8. commit with the ticket ID;
9. push the branch;
10. open or update a pull request;
11. wait for review before merging or starting the next ticket.

This project uses Linear-style ticket IDs for planning, but no Linear records or API actions should be created unless the user explicitly requests them.

### Branch naming

- `feat/port-###-short-description`
- `fix/port-###-short-description`
- `chore/port-###-short-description`
- `test/port-###-short-description`

### Commit format

Use a conventional commit with the ticket ID:

- `feat(PORT-101): scaffold Next.js application`
- `fix(PORT-402): restore focus after closing mobile navigation`
- `docs(PORT-001): document repository rules`
- `test(PORT-1302): add keyboard and axe coverage`

Keep commits scoped and reviewable. Do not combine unrelated refactors, dependency upgrades, or formatting rewrites with feature work.

### Pull requests

Every implementation ticket should have a pull request containing:

- ticket objective;
- concise change summary;
- verification performed;
- screenshots or preview URL for visual work;
- known limitations or deferred work;
- explicit confirmation that no generated or confidential content was published accidentally.

Do not merge a pull request without user approval unless the user has explicitly delegated merge authority for that ticket.

## Technology baseline

Primary stack:

- React;
- Next.js App Router;
- TypeScript;
- Tailwind CSS.

Proposed supporting tools must be verified against `package.json` before use. Do not assume a dependency is installed.

Preserve the repository's package manager and lockfile after scaffolding. Do not introduce a second lockfile.

Use Server Components by default. Add `'use client'` only to small interactive leaf components that genuinely need browser APIs, local interactive state, or animation.

Do not move whole pages or layouts into Client Components to simplify one interaction.

## Proposed routes

```text
/
/work
/work/memx
/work/domani
/work/iffers-pictures
/about
/contact
/resume.pdf
```

PixelVerse and EarthCam remain supporting Home/About content in v1 unless a ticket explicitly adds a route.

## Proposed source structure

Adapt this to the scaffold rather than forcing it blindly:

```text
src/
  app/
  components/
    case-study/
    diagrams/
    home/
    layout/
    motion/
    navigation/
    ui/
  content/
  lib/
  styles/
tests/
public/
  documents/
  fonts/
  images/
```

Prefer feature-oriented components with clear names. Avoid a large undifferentiated `components` folder and avoid one-off page markup when a pattern genuinely repeats.

## Design-system rules

### Color

Use semantic tokens rather than arbitrary inline values.

The expected roles are:

- chalk or warm paper background;
- raised paper surface;
- graphite primary text;
- muted ink secondary text;
- cobalt accent;
- restrained borders and registration marks;
- natural project colors inside approved media.

Cobalt is the primary interface accent. Do not add additional competing system accents without an explicit design decision.

### Typography

The design calls for:

- a humanist or characterful grotesk for interface and body content;
- a restrained editorial serif for selected major statements;
- a mono face for technical labels, figure numbers, and metadata.

Do not default to Inter, Arial, Roboto, or an unconsidered system stack for the final design.

All fonts must have confirmed web licensing. Prefer self-hosting through `next/font/local` when allowed.

Control line length and wrapping deliberately. Desktop spectacle does not justify unreadable mobile typography.

### Layout and surfaces

- Use a consistent underlying grid.
- Prefer negative space, alignment, hairline rules, tabs, and layer offsets over generic card containers.
- Overlap must communicate hierarchy or assembly.
- Do not use three equal feature cards as a default layout.
- Keep border radii restrained and material-specific.
- Use shadows sparingly to indicate a lifted sheet or pinned overlay.
- Decorative textures must not reduce contrast or cause continuous repainting.

### Responsive behavior

Mobile is a separate composition, not a scaled desktop layout.

- Collapse asymmetric desktop structures into an intentional single-column reading order below the selected breakpoint.
- Avoid horizontal overflow at 320px.
- Keep touch targets at least 44px.
- Preserve the project hierarchy and primary action in the initial mobile viewport.
- Recompose decorative layers instead of merely hiding all art direction.

## Content rules

Content accuracy outranks visual convenience.

- Keep shared project metadata typed and centralized.
- Do not duplicate project names, roles, dates, metrics, or canonical URLs across pages.
- Mark future features clearly as roadmap content.
- Add snapshot dates to production metrics where context matters.
- Do not publish unsupported percentages or inferred performance claims.
- Do not expose personal phone numbers or street addresses without explicit approval.
- Ensure the resume and portfolio do not contradict each other.

### MEMX confidentiality

- Do not use private screenshots, reconstructed interfaces, order books, matching-engine displays, or fake exchange data.
- Use original, non-proprietary diagrams for configuration, feature flags, reusable UI, entitlements, and WebSocket flow.
- Attribute the initial database-driven scaffold accurately to Phil's boss/team.
- Present Phil's frontend configuration architecture and later full-stack ownership accurately.
- Do not claim the unsupported 35% rollout improvement.

### Domani accuracy

- Use real production screenshots or faithful code-native compositions.
- Confirm shipped features before displaying them.
- Analytics and intentional rollover are currently shipped.
- Nested checklists, bullet lists, and templates are roadmap items.
- Do not publish shared/staging identifier counts as downloads.
- Do not publish an unsupported conversion rate.
- Use approved metrics with the August 26, 2026 production snapshot context.

### Iffer's Pictures attribution

Phil independently owned discovery, copy, visual design, implementation, and client collaboration for this project.

Use approved real photography in production. Do not substitute generated family, maternity, couple, portrait, or event images.

### PixelVerse attribution

PixelVerse is an after-hours side studio. Phil and Sami share administration, sales, and general client support. Phil leads coding; Sami leads design. Iffer's Pictures is the exception and was designed by Phil.

## Asset rules

- Preserve original source assets.
- Keep production derivatives under stable, descriptive paths.
- Use `next/image` for raster media unless a documented reason requires otherwise.
- Provide explicit dimensions and prevent layout shift.
- Supply meaningful alt text for informative images and empty alt text for decorative images.
- Record source and usage permission for project imagery.
- Never ship an AI-generated portrait as Phil.
- Never treat generated concept-board UI as a real project screenshot.

## Motion rules

Motion must explain assembly, hierarchy, or navigation.

- Select one primary motion engine after a technical spike.
- Do not mix GSAP and Motion in the same component tree.
- Prefer transform and opacity animation.
- Do not animate `top`, `left`, `width`, or `height` for continuous effects.
- Keep pointer tracking outside React render cycles.
- Isolate interactive motion in small Client Components.
- Stop observers and animation when components unmount or move offscreen.
- Every motion sequence must have a deliberate `prefers-reduced-motion` result.
- Navigation and content must not wait for animation to complete.
- Avoid constant decorative motion across every section.

## Accessibility requirements

Target WCAG 2.2 AA.

Every ticket affecting UI must consider:

- semantic landmarks and heading structure;
- keyboard navigation;
- visible focus;
- screen-reader labels and announcements;
- contrast;
- touch target size;
- 200% zoom and increased text size;
- reduced motion;
- coarse-pointer and touch behavior;
- text equivalents for diagrams;
- non-color indicators for state.

Use real links for navigation. Hover-only interactions are not acceptable.

## Performance requirements

The art direction does not override performance.

- Keep Server Components as the default.
- Lazy-load below-the-fold media and ticket-approved animation code.
- Avoid unnecessary client providers and global state.
- Use CSS or SVG before adding canvas or WebGL.
- Do not load desktop-scale imagery on mobile when a smaller source is available.
- Keep decorative grain isolated to a fixed, pointer-events-none layer or lightweight asset.
- Avoid layout shift from fonts, images, or animated layers.

Target budgets:

- LCP below 2.5 seconds at the 75th percentile when field data is available;
- CLS below 0.1;
- INP below 200 milliseconds;
- repeatable Lighthouse mobile Performance of at least 90;
- Lighthouse Accessibility 100;
- Lighthouse Best Practices at least 95;
- Lighthouse SEO 100.

Document any approved exception and its remediation plan.

## Testing and verification

The repository should converge on these commands:

```text
npm run dev
npm run lint
npm run typecheck
npm run test
npm run build
npm run verify
```

Use the repository's actual package manager after scaffolding.

Verification should be proportional to risk:

- TypeScript and lint for every implementation ticket;
- production build for structural, routing, configuration, and dependency work;
- browser inspection for every visual ticket;
- Playwright for critical navigation and case-study workflows;
- axe automation plus manual accessibility review;
- deterministic screenshots for visual-regression coverage;
- current Chrome, Safari, Firefox, and Edge before launch;
- iOS Safari and Android Chrome before launch.

Do not declare visual work complete without inspecting it in a real browser at desktop and mobile sizes.

## Development-server behavior

- Use the repository's documented development command.
- Reuse an existing healthy server instead of starting duplicates.
- Record the selected local port when it differs from the default.
- Shut down any server started solely for verification when the ticket is complete.
- Do not change application behavior merely to work around a stale development cache; diagnose the cache first.

## Deployment and environments

- Preview deployments should be available for visual tickets.
- Preview and staging deployments must be non-indexable.
- Production should use one canonical HTTPS host.
- Environment variables must be documented and scoped correctly.
- Never expose secrets through `NEXT_PUBLIC_*` variables.
- Analytics failure must never affect navigation or content rendering.
- Do not add a cookie banner unless the selected analytics or third-party behavior actually requires one.

## Definition of ready

A ticket is ready when:

- dependencies are complete;
- scope and acceptance criteria are explicit;
- affected files are identified from the actual repository;
- content and assets are available or clearly marked as non-production placeholders;
- responsive, accessibility, confidentiality, and attribution constraints are known.

## Definition of done

A ticket is done when:

- only the approved scope changed;
- desktop and mobile behavior are complete where applicable;
- keyboard, touch, screen-reader, and reduced-motion behavior are handled where relevant;
- proportional tests and verification pass;
- the complete diff has been reviewed;
- no fake metric, generated copy, private screenshot, or temporary asset remains;
- visual work has been inspected in a real browser;
- the branch is committed, pushed, and represented by an updated pull request;
- known limitations and next dependencies are documented.

## Safety and repository hygiene

- Preserve unrelated user changes.
- Do not use destructive Git commands unless explicitly requested.
- Do not rewrite or force-push shared history without approval.
- Do not commit secrets, local environment files, build output, screenshots from private systems, or dependency directories.
- Prefer small reversible changes.
- Stop and request direction when a choice materially expands scope, changes public claims, or introduces a new external service.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
