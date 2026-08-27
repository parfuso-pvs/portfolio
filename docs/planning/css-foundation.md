# CSS foundation and ownership

PORT-102 establishes the styling boundaries that later Human Assembly tickets build on. It intentionally does not finalize the visual design system.

## Ownership model

### CSS custom properties

Runtime semantic values live in `src/app/globals.css` under `:root`. These variables describe roles such as canvas, surface, ink, accent, line, focus, and the active interface-font stack. Their values can be replaced by later design-system or theme work without changing component markup.

### Tailwind theme tokens

Tailwind CSS 4's `@theme inline` block maps the runtime variables to utilities such as `bg-canvas`, `text-ink`, `text-muted`, `text-accent`, and `border-line`. Components should use these semantic utilities instead of hard-coded palette values.

Spacing, radius, shadow, editorial type, and material-effect tokens remain deferred to PORT-201 through PORT-203.

### Global CSS

Global CSS is limited to behavior that truly applies across the application:

- the Tailwind import and Preflight;
- document canvas, default text, and rendering behavior;
- selection treatment;
- the shared `:focus-visible` indicator;
- the `prefers-reduced-motion` safety baseline.

Global CSS must not contain project-card geometry, page composition, one-off typography, decorative paper effects, or route-specific selectors.

### Component styling

Tailwind utilities own component layout and ordinary responsive styling. CSS Modules are reserved for a component whose effect cannot be expressed clearly with utilities, such as a complex texture or illustration. Those modules must remain colocated with the component they style.

## Accessibility baseline

The root layout provides a keyboard-visible skip link targeting each page's `main` landmark. All interactive elements inherit a high-contrast `:focus-visible` outline. Reduced-motion preferences collapse animation and transition durations while preserving the resulting interface state.
