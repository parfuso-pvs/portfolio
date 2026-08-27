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

- Node.js 24.x
- npm 11.11

The repository includes an `.nvmrc`; run `nvm use` before installing dependencies when using nvm.

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
- `npm run format` formats supported repository files with Prettier.
- `npm run format:check` checks formatting without modifying files.
- `npm run typecheck` checks TypeScript without emitting files.
- `npm test` runs the dependency-free scaffold smoke tests with Node.js.
- `npm run build` creates a production build.
- `npm run verify` runs formatting, linting, type checking, tests, and a production build in sequence.
- `npm run start` serves a completed production build.

Component, accessibility, visual-regression, and end-to-end coverage will be introduced in their dedicated testing tickets.

## Continuous integration

GitHub Actions runs `npm ci` followed by `npm run verify` for every pull request and every push to `main`. Local and CI validation therefore share the same quality gate.
