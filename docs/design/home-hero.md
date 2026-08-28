# Homepage hero

PORT-304 turns the homepage's material-system placeholder into the first production hero for the Human Assembly direction.

## Content hierarchy

1. Phil's name and full-stack role establish identity.
2. The approved statement, “I turn complex systems into products that feel simple,” carries the primary positioning.
3. MEMX is the selected-work entry point and consumes its name, route, summary, and system content from the project registry.
4. Work Index and Contact remain clear secondary paths.

The ticket deliberately stops after the first viewport. Broader career narrative, the other featured projects, supporting experience, and a final contact section remain later homepage tickets.

## Composition

- Desktop uses a vertical identity rail beside one pinned editorial sheet.
- Blueprint and raised-paper back layers establish assembly order without becoming generic cards.
- The content sheet pairs the positioning statement with an original MEMX system-layer diagram.
- Mobile changes the identity rail to a horizontal line, places the MEMX action before the diagram, and uses one reading column.

## Diagram and content safety

- The system diagram consumes four approved MEMX feature descriptions from the registry.
- It contains no screenshots, reconstructed exchange interface, order book, matching engine, or fake market data.
- A real `figure` and visually hidden caption provide a complete text equivalent.
- Generated concept-board imagery is not used as production evidence.

## Interaction and performance

- The hero, diagram, navigation, and primary content remain Server Components. PORT-901 adds one
  route-local Client Component around the two decorative back layers only.
- Links are real Next.js links with hover, visible focus, active, and 44px touch behavior.
- The primary content sheet renders immediately; only supporting paper layers fade into place.
- Assembly motion uses transform and opacity, preserves the layers' authored rotation, and resolves
  immediately when reduced motion is requested.
- The hero uses `min-height: 100dvh` and contains every layer to prevent horizontal overflow.
