# Contributing

## Setup

1. Use the Node.js version in `.nvmrc`.
2. Enable Corepack and install dependencies with `pnpm install`.
3. Start the app with `pnpm dev`.

## Change workflow

1. Create a short-lived branch from `main`.
2. Keep changes scoped to one behavior or engineering concern.
3. Add or update tests when behavior changes.
4. Run `pnpm quality` and `pnpm build` before opening a pull request.
5. Run relevant E2E tests for routing or user-flow changes.

Use clear commit messages that describe the behavior being changed. Pull
requests should include a summary, verification evidence, and any rollout or
compatibility risk.

## Code conventions

Formatting and lint rules live in `apps/web/.editorconfig`,
`apps/web/.prettierrc.json`, `apps/web/.oxlintrc.json`, and
`apps/web/eslint.config.ts`. Run the formatter and linter rather than correcting
style manually.
