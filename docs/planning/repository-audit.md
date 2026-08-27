# PORT-001 - Repository Audit

Status: Complete  
Branch: `chore/port-001-repository-audit`  
Remote: `https://github.com/parfuso-pvs/portfolio.git`

## Ticket objective

Inspect the portfolio repository before implementation and record its actual starting state, constraints, likely extension points, and required workflow.

## Starting state

The remote repository was empty when cloned. It contained:

- no commits;
- no application source;
- no package manifest or lockfile;
- no framework configuration;
- no repository-specific `CODEX.md` or `AGENTS.md` instructions;
- no CI, deployment, testing, analytics, or environment configuration;
- no design tokens, assets, content, routes, or components.

A minimal root commit was added to establish the `main` branch before ticket branches could be created. That commit contains only the project README and the confirmed planned stack.

## Confirmed implementation baseline

- React
- Next.js App Router
- TypeScript
- Tailwind CSS
- Local, version-controlled content for v1
- No CMS for v1
- Human Assembly visual direction
- Small, independently verifiable tickets

## Repository constraints

There is no existing implementation to preserve or migrate. The project can use a clean App Router structure without compatibility work.

There are also no existing version or dependency decisions. Versions must be selected deliberately during scaffolding and recorded in the lockfile. No third-party UI or animation library should be assumed before `package.json` exists.

## Proposed source structure

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

The scaffolding ticket may adjust this structure if the selected Next.js version or tooling provides a stronger convention.

## Branch and ticket workflow

After the initial root commit, no planned implementation work should be committed directly to `main`.

Each ticket should use this workflow:

1. Update local `main` from `origin/main`.
2. Create one short-lived branch from `main`.
3. Implement only the ticket's defined scope.
4. Run ticket-appropriate lint, typecheck, tests, build, and browser checks.
5. Inspect the diff for unrelated changes and generated artifacts.
6. Commit with the ticket ID and a concise conventional-commit message.
7. Push the branch.
8. Review or open a pull request before merge.
9. Merge only after the ticket acceptance criteria pass.
10. Delete the merged ticket branch and start the next ticket from updated `main`.

Branch naming:

- `feat/port-###-short-description`
- `fix/port-###-short-description`
- `chore/port-###-short-description`
- `test/port-###-short-description`

Commit examples:

- `feat(PORT-101): scaffold Next.js application`
- `fix(PORT-402): restore focus after closing mobile navigation`
- `test(PORT-1302): add keyboard and axe coverage`

## Verification commands

The repository has no application scripts yet. PORT-101 must establish the initial commands. The target command contract is:

```text
npm run dev
npm run lint
npm run typecheck
npm run test
npm run build
npm run verify
```

The actual package manager will be chosen during scaffolding and should remain consistent afterward.

## Risks identified

1. An empty repository means foundational choices can spread quickly; the vertical-slice milestone must validate them early.
2. Font licensing and asset sourcing remain unresolved and should not be deferred until visual polish.
3. Generated concept-board images contain illustrative material and cannot be copied into production as factual project content.
4. Motion dependencies must be evaluated after the static system exists, not during scaffolding.
5. The Human Assembly direction depends on strong mobile recomposition; desktop overlap patterns cannot simply be scaled down.

## Recommended next ticket

`PORT-101 - Scaffold Next.js App Router application`

PORT-002 and PORT-003 from the original greenfield plan are effectively resolved by this audit because there is no existing package/runtime architecture to reconcile. Package versions and validation scripts should be selected as part of PORT-101, then documented in the repository.

## Acceptance criteria result

- Current stack, versions, scripts, and constraints documented: **Complete; none existed at audit time.**
- Existing user work identified and preserved: **Complete; repository was empty.**
- Proposed file map reconciled with the repository: **Complete; no conflicting structure exists.**
- Next ticket can start without structural uncertainty: **Complete.**

