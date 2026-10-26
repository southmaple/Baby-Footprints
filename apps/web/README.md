# Web app

Vue 3 application for Baby Footprints. Use the repository root as the command
entry point; setup, quality checks, architecture, and known delivery gaps are
documented in the root `README.md`.

For app-only development:

```sh
pnpm --filter web dev
```

HTTP routing uses Vue Router history mode. The GitHub Pages workflow generates
`404.html` from `index.html` so deep links can boot the application.

Install Playwright Chromium before running the default E2E suite, or run the
installed browser profile with `pnpm --filter web test:e2e:chrome`.
