# Phil Arfuso Portfolio

Personal portfolio website for Phil Arfuso.

## Status

The application foundation is in place. Visual-system and page implementation will continue through the ticket-by-ticket workflow documented in [AGENTS.md](./AGENTS.md).

## Stack

- React
- Next.js App Router
- TypeScript
- Tailwind CSS

## Prerequisites

- Node.js 20.19 or newer
- npm 9 or newer

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

- `npm run dev` starts the local development server.
- `npm run lint` runs ESLint with the Next.js Core Web Vitals and TypeScript rules.
- `npm run lint:fix` applies safe ESLint fixes.
- `npm run typecheck` checks TypeScript without emitting files.
- `npm run build` creates a production build.
- `npm run verify` runs linting, type checking, and a production build in sequence.
- `npm run start` serves a completed production build.

Automated component and end-to-end testing will be introduced in their dedicated quality-foundation ticket.
