# monorepo

Monorepo structure for managing multiple applications and shared packages.

**Setup guide:** [SETUP.md](./SETUP.md)

## Layout

| Folder                     | What goes here                                   |
| -------------------------- | ------------------------------------------------ |
| [`apps/`](./apps/)         | Runnable apps (frontend, backend, any framework) |
| [`packages/`](./packages/) | Installable shared libraries                     |
| [`tooling/`](./tooling/)   | Shared configuration presets                     |
| [`shared/`](./shared/)     | Shared utilities imported directly               |

Workspaces are defined in `pnpm-workspace.yaml` (not `package.json` → `"workspaces"`).

## Commands

| Command             | Description                           |
| ------------------- | ------------------------------------- |
| `pnpm install`      | Install deps and set up Husky         |
| `pnpm dev`          | Development server                    |
| `pnpm build`        | Build all workspace packages          |
| `pnpm lint`         | ESLint (whole repo)                   |
| `pnpm type-check`   | TypeScript (`tsc -b`) in all packages |
| `pnpm format`       | Prettier write                        |
| `pnpm format:check` | Prettier check                        |
