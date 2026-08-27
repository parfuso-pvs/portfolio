# Typography system

PORT-202 establishes the licensed type foundation for the Human Assembly direction. The system combines an approachable grotesk, an editorial serif, and a technical mono without using typography as decoration alone.

## Font selection

| Family          | Role                                              | Why it belongs                                                                                                                            |
| --------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Instrument Sans | Interface, body, labels, and Phil's name          | A characterful variable grotesk with adjustable width and weight. It feels precise without becoming anonymous or overly corporate.        |
| Newsreader      | Major statements and quotations                   | An optical-size-aware editorial serif that adds warmth and authorship to the most important narrative moments.                            |
| IBM Plex Mono   | Metadata, diagrams, figures, and numeric evidence | A highly legible technical voice that supports the blueprint and exchange-system language without turning the site into a terminal theme. |

All three families are distributed under the **SIL Open Font License 1.1**, which permits use and self-hosting on this commercial portfolio.

| Family          | Official license and metadata                                                                                                                                                   |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Instrument Sans | [OFL](https://github.com/google/fonts/blob/main/ofl/instrumentsans/OFL.txt) · [Google Fonts metadata](https://github.com/google/fonts/blob/main/ofl/instrumentsans/METADATA.pb) |
| Newsreader      | [OFL](https://github.com/google/fonts/blob/main/ofl/newsreader/OFL.txt) · [Google Fonts metadata](https://github.com/google/fonts/blob/main/ofl/newsreader/METADATA.pb)         |
| IBM Plex Mono   | [OFL](https://github.com/google/fonts/blob/main/ofl/ibmplexmono/OFL.txt) · [Google Fonts metadata](https://github.com/google/fonts/blob/main/ofl/ibmplexmono/METADATA.pb)       |

## Loading strategy

The fonts use `next/font/google`. Next.js downloads them at build time, emits self-hosted font assets, and serves no Google Fonts request from the browser. This preserves the privacy and performance properties of local hosting without committing upstream font binaries to the repository. See the [Next.js font documentation](https://nextjs.org/docs/app/api-reference/components/font).

- Only the Latin subset is included for the current English-language site.
- Instrument Sans variable roman and Newsreader variable roman are preloaded because both appear in the initial viewport.
- Newsreader italic and IBM Plex Mono are intentionally not preloaded. They load only where their lower-priority roles are used.
- `display: swap` and Next.js fallback metric adjustment reduce invisible text and layout shift while fonts resolve.
- Instrument Sans includes its width axis; Newsreader includes its optical-size axis.
- IBM Plex Mono is limited to the 400 and 600 roman files required by the role system.

## Semantic roles

| Utility           | Family            | Intended use                                                 |
| ----------------- | ----------------- | ------------------------------------------------------------ |
| `type-display`    | Instrument Sans   | Phil's name and rare identity-scale display text             |
| `type-heading`    | Newsreader        | Page theses, section titles, and major narrative statements  |
| `type-body`       | Instrument Sans   | Long-form primary reading copy                               |
| `type-body-small` | Instrument Sans   | Supporting descriptions and compact interface copy           |
| `type-label`      | Instrument Sans   | Navigation, tabs, eyebrow text, and compact uppercase labels |
| `type-mono`       | IBM Plex Mono     | Dates, metadata, diagram labels, and technical annotations   |
| `type-quote`      | Newsreader Italic | Pull quotes and personal asides used sparingly               |
| `type-numeric`    | IBM Plex Mono     | Metrics and prominent quantitative evidence                  |

Components should consume these roles instead of assembling local font size, weight, tracking, and line-height combinations. Color and spacing remain independent semantic concerns.

## Responsive composition rules

- Body copy should normally remain between 60 and 72 characters per line on wide screens.
- Major serif statements use a deliberate max width and `text-pretty`; they should form two to four balanced lines rather than a narrow editorial column.
- Display text may be oversized on desktop but must fit without horizontal scrolling at 320px.
- Mobile headline wraps must be checked at 320px and 390px instead of inferred from desktop behavior.
- Small labels may use uppercase and wider tracking, but body copy must never inherit that treatment.
- Numeric and mono roles use tabular alignment where comparison matters; they are not substitutes for body copy.
