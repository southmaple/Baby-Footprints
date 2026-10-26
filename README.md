# Baby Footprints

Baby Footprints is a pnpm monorepo for the web application and shared packages.
The current application is an engineering baseline built with Vue 3, TypeScript,
Vite, Vue Router, Pinia, Vitest, and Playwright.

## Requirements

- Node.js `^22.18.0` or `>=24.12.0` (`24.12.0` is the recommended version in `.nvmrc`)
- pnpm `10.28.0`

Enable Corepack or install the pinned pnpm version before installing dependencies.

```sh
corepack enable
pnpm install
```

## Commands

Run all commands from the repository root.

| Command         | Purpose                                                   |
| --------------- | --------------------------------------------------------- |
| `pnpm dev`      | Start the web app at `http://localhost:5173`              |
| `pnpm format`   | Format supported source and documentation files           |
| `pnpm lint`     | Apply automatic lint fixes                                |
| `pnpm quality`  | Check formatting and lint, type-check, and run unit tests |
| `pnpm test:e2e` | Run Playwright tests (install its browsers first)         |
| `pnpm build`    | Create the production bundle in `apps/web/dist`           |
| `pnpm verify`   | Run the build-blocking checks used before E2E             |

The first E2E run needs a Playwright browser:

```sh
pnpm --filter web exec playwright install chromium
pnpm test:e2e
```

The E2E runner starts and stops Vite automatically. Use
`pnpm test:e2e:chrome` to run the suite with an installed Google Chrome.

## Repository layout

```text
apps/
  web/          Vue application
packages/       Reserved for shared packages
```

Each workspace owns its tooling. Root commands provide a stable entry point for
developers and CI.

## Environment

Browser variables must use the `VITE_` prefix. Copy values from
`apps/web/.env.example` into a local `.env.local` file when needed. Do not commit
secrets; Vite embeds `VITE_` values into the browser bundle.

## Continuous integration and deployment

`.github/workflows/ci.yml` runs formatting, lint, type-check, unit tests, a
production build, and Chromium E2E tests for pull requests and pushes to `main`.
Main branch runs are deployed to GitHub Pages after verification and a
base-path E2E test. See
[GitHub Pages deployment](docs/deployment-github-pages.md) for repository setup,
verification, and rollback steps.

## Delivery gaps

The engineering guardrails are in place, but the repository still contains the
starter screens and no product specification. Before feature delivery, define:

- target users and core product workflows
- API, authentication, and data storage contracts
- backend API, data storage, secrets, and service availability requirements
- analytics, error reporting, privacy, and accessibility requirements
- repository ownership, license, and protected-branch policy
