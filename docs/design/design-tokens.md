# Human Assembly design tokens

PORT-201 translates the approved Human Assembly mockup into semantic values for Tailwind CSS 4. Runtime values live in `src/app/globals.css`; the `@theme inline` bridge exposes them as utilities without duplicating their values.

## Color

| Runtime token        | Tailwind role      | Value     | Intended use                                    |
| -------------------- | ------------------ | --------- | ----------------------------------------------- |
| `--paper-canvas`     | `canvas`           | `#f1eee6` | Site background and the lowest paper plane      |
| `--paper-base`       | `paper`            | `#f8f5ed` | Default sheets and editorial panels             |
| `--paper-raised`     | `paper-raised`     | `#fcfaf5` | Foreground notes and pinned overlays            |
| `--paper-deep`       | `paper-deep`       | `#e7e1d6` | Recessed paper, tabs, and tonal separators      |
| `--graphite`         | `ink`              | `#20201d` | Primary text and strong registration marks      |
| `--ink-muted`        | `muted`            | `#625e56` | Supporting copy and metadata                    |
| `--blueprint`        | `accent`, `focus`  | `#1259c3` | Links, active tabs, diagrams, and focus         |
| `--blueprint-strong` | `accent-strong`    | `#0a3f99` | Pressed accent states and dense blueprint marks |
| `--rule`             | `line`             | `#c9c2b5` | Hairlines, sheet edges, and quiet dividers      |
| `--rule-strong`      | `line-strong`      | `#9f9789` | Structural rules that need more definition      |
| `--media-backdrop`   | `media-backdrop`   | `#121722` | Neutral framing behind approved project media   |
| `--media-foreground` | `media-foreground` | `#f8f5ed` | Text or controls placed on the media backdrop   |

Cobalt is the sole interface accent. Project photography and product screenshots may retain their natural colors, but their framing UI must use these semantic roles.

### Contrast evidence

Ratios use WCAG relative luminance calculations.

| Pair                               |   Ratio |
| ---------------------------------- | ------: |
| Graphite on canvas                 | 14.09:1 |
| Graphite on paper                  | 14.99:1 |
| Muted ink on canvas                |  5.56:1 |
| Muted ink on paper                 |  5.92:1 |
| Blueprint/focus on canvas          |  5.59:1 |
| Blueprint/focus on paper           |  5.94:1 |
| Media foreground on media backdrop | 16.46:1 |

Primary, secondary, accent, and focus colors clear the 4.5:1 normal-text threshold on their intended light surfaces. Rules are non-text decoration and must not communicate state by themselves.

## Fluid spacing

| Runtime token            | Tailwind utility suffix | Range    | Intended use                                 |
| ------------------------ | ----------------------- | -------- | -------------------------------------------- |
| `--layout-gutter`        | `page-gutter`           | 20–56px  | Responsive page-edge protection              |
| `--layout-section`       | `section`               | 80–176px | Major narrative section rhythm               |
| `--layout-sheet-inset`   | `sheet-inset`           | 20–48px  | Interior padding for paper surfaces          |
| `--layout-content-stack` | `content-stack`         | 32–72px  | Large content-group separation               |
| `--layout-cluster`       | `cluster`               | 12–24px  | Compact related-control and metadata spacing |

Use the semantic fluid values for page composition. Tailwind's numeric spacing scale remains available for small internal relationships such as icon gaps and label offsets.

## Display scale

`text-display` ranges from 52px to 136px with a `0.88` line-height and `-0.055em` tracking. It is reserved for the vertical name treatment, homepage thesis, and similarly rare editorial moments. PORT-202 will supply the final font families and the remaining type roles.

## Radius

| Token             | Value | Intended use                                                      |
| ----------------- | ----: | ----------------------------------------------------------------- |
| `rounded-paper`   |   2px | Paper sheets, image mounts, and diagram frames                    |
| `rounded-control` |   4px | Buttons, compact inputs, and interactive tabs                     |
| `rounded-pill`    | 999px | Circular hardware and controls whose shape has functional meaning |

Do not apply pill radius to cards, panels, project tiles, or decorative containers.

## Shadow

`shadow-sheet` creates the shallow lift of a loose sheet. `shadow-pinned` adds a slightly deeper ambient shadow and a restrained inset highlight for a foreground note or pinned overlay. These are the only general-purpose elevation levels; components must not introduce one-off shadow values.

## Engineering rules

- Components consume semantic Tailwind utilities instead of raw hex, RGB, or HSL colors.
- New system colors require an explicit token addition and contrast review.
- Natural colors may appear inside approved media assets, never as competing interface accents.
- Material textures and blueprint patterns belong to PORT-203 and must reuse these colors.
- Token changes must keep the contrast tests green and be visually checked on desktop and mobile.
