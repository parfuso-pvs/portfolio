# Shared site shell and navigation

PORT-301 establishes the persistent navigation and route frame for the approved v1 information architecture. It borrows the concept board's index-tab language without turning the header into a conventional app toolbar.

## Route contract

| Route                   | Navigation label     | Purpose                                  |
| ----------------------- | -------------------- | ---------------------------------------- |
| `/`                     | Phil Arfuso wordmark | Homepage and primary positioning         |
| `/work`                 | Work                 | Selected-work index                      |
| `/work/memx`            | MEMX                 | Flagship platform-engineering case study |
| `/work/domani`          | Domani               | Flagship independent-product case study  |
| `/work/iffers-pictures` | Iffer's Pictures     | Featured design and development project  |
| `/about`                | About                | Career narrative and working style       |
| `/contact`              | Contact              | Contact methods and role fit             |

The route files currently provide factual introductory compositions. Their complete content belongs to later page and case-study tickets.

## Component contract

- `SiteHeader` is a shared Server Component mounted once in the root layout.
- `PrimaryNavigation` is the only Client Component. It owns pathname state, the mobile disclosure, focus movement, and Escape handling.
- `primaryNavigation` is the canonical ordered navigation data. Labels and canonical paths must not be duplicated in header components.
- `RouteIntro` gives unfinished routes a truthful, polished composition without introducing fake metrics, screenshots, or case-study detail.

## Desktop behavior

- The wordmark returns home and the six destinations form one raised paper index.
- The current destination uses `aria-current="page"`, a cobalt plane, and a bottom rule so state is not expressed by color alone.
- The shell remains visually light and absolute rather than consuming a large application-style toolbar.

## Mobile behavior

- The desktop index is replaced below the large breakpoint with a 44px paper control.
- Opening the menu moves focus to its first link.
- Escape closes the menu and restores focus to the trigger.
- Navigation closes on link activation. The stateful leaf is keyed by pathname for App Router transitions and resets on history traversal or browser-cache restoration so every route entry starts closed.
- Every destination is at least 44px tall, remains a real link, and exposes current-page state semantically.
- The menu width remains inside the 20px minimum page gutter at 320px.

## Accessibility and performance

- The skip link precedes the shared header and targets each page's `main` landmark.
- There is one labeled primary navigation at each responsive mode; CSS ensures only one is displayed.
- Focus appearance comes from the established global focus token and is pulled inside tightly bounded navigation sheets.
- The page and header remain Server Components; only the small navigation leaf ships client JavaScript.
- The menu uses no focus-trap dependency or animation library. Its two-line icon uses transform-only transitions and honors the global reduced-motion rule.
