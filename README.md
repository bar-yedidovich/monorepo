# monorepo

Learning monorepo for **microfrontends** and **microservices** with different stacks (React, Next, Express, Nest, Tailwind, Vanilla Extract, etc.).

**Setup guide:** [SETUP.md](./SETUP.md)

## Layout

| Folder                     | What goes here                                          |
| -------------------------- | ------------------------------------------------------- |
| [`apps/`](./apps/)         | Runnable apps (frontend, backend, any framework)        |
| [`packages/`](./packages/) | Installable shared libs (`@monorepo/errors`, logger, …) |
| [`tooling/`](./tooling/)   | Shared config only (ESLint, Prettier, TypeScript)       |
| [`shared/`](./shared/)     | Shared source imported directly (utils, formats, …)     |

Workspaces are defined in `pnpm-workspace.yaml` (not `package.json` → `"workspaces"`).

## Commands

| Command             | Description                           |
| ------------------- | ------------------------------------- |
| `pnpm install`      | Install deps and set up Husky         |
| `pnpm dev`          | Web app dev server                    |
| `pnpm build`        | Build all workspace packages          |
| `pnpm lint`         | ESLint (whole repo)                   |
| `pnpm type-check`   | TypeScript (`tsc -b`) in all packages |
| `pnpm format`       | Prettier write                        |
| `pnpm format:check` | Prettier check                        |
