# Monorepo setup guide

Read this before writing app code. This repo uses **pnpm workspaces only** (not `package.json` → `"workspaces"`).

## 1. Repository layout

```
monorepo/
├── apps/                 ← runnable apps (each extends tooling presets)
├── packages/             ← installable libraries
├── tooling/              ← shared presets (TS, ESLint, Prettier) — the “rulebook”
├── shared/               ← importable source
├── pnpm-workspace.yaml
└── package.json          ← orchestrator only (scripts, husky, prettier)
```

**Root is not coupled to children:** no `eslint.config.js` at root, no imports from `apps/web`, no hardcoded paths to `packages/*`. Root runs `pnpm -r run lint`; each child that lints defines its own `lint` script.

| Folder        | Role                                                                                             |
| ------------- | ------------------------------------------------------------------------------------------------ |
| **tooling/**  | Base standards: `@monorepo/tsconfig/*`, `@monorepo/eslint-config/*`, `@monorepo/prettier-config` |
| **apps/**     | Extends presets + adds `"lint": "eslint ."`                                                      |
| **packages/** | Extends `base` / `node` presets                                                                  |
| **shared/**   | Same as packages (source, not install-only)                                                      |

---

## 2. Tooling presets (children extend, root does not list them)

### TypeScript (`@monorepo/tsconfig`)

| Preset           | Use for                          |
| ---------------- | -------------------------------- |
| `base.json`      | Any TS package                   |
| `node.json`      | `vite.config.ts`, Node backends  |
| `react-app.json` | Browser React (`lib` DOM, `jsx`) |

Example (`apps/web/tsconfig.app.json`):

```json
{
	"extends": "@monorepo/tsconfig/react-app.json",
	"compilerOptions": { "types": ["vite/client"] },
	"include": ["src"]
}
```

### ESLint (`@monorepo/eslint-config`)

| Export    | Use for                                        |
| --------- | ---------------------------------------------- |
| `.`       | `createBaseConfig()` — libraries, custom globs |
| `./react` | Vite + React apps                              |
| `./node`  | Node-only TS                                   |

Example (`apps/web/eslint.config.js`):

```js
export { default } from '@monorepo/eslint-config/react';
```

### Prettier (`@monorepo/prettier-config`)

Root `package.json`: `"prettier": "@monorepo/prettier-config"` — applies repo-wide.

---

## 3. pnpm workspace

```yaml
packages:
    - 'apps/*'
    - 'packages/*'
    - 'tooling/*'
    - 'shared/*'
```

`workspace:*` in `package.json` links to local tooling packages.

---

## 4. Scripts (orchestrator)

| Command           | What it does                                             |
| ----------------- | -------------------------------------------------------- |
| `pnpm install`    | Install workspaces; `prepare` → Husky                    |
| `pnpm dev`        | `pnpm --filter web dev`                                  |
| `pnpm lint`       | `pnpm -r run lint` — each workspace with a `lint` script |
| `pnpm type-check` | `pnpm -r run type-check`                                 |
| `pnpm format`     | Prettier (shared config)                                 |

---

## 5. Git hooks (industry-standard monorepo pattern)

**There is no built-in lint-staged “per app” ESLint routing** that knows every framework. Common practice:

1. **lint-staged** — fast formatting on **staged** files only (Prettier).
2. **pre-commit** — `pnpm -r run lint` so each workspace runs `eslint .` with **its own** `eslint.config.js`.

`.husky/pre-commit`:

```sh
pnpm exec lint-staged
pnpm -r run lint
```

`.lintstagedrc.json`:

```json
{
	"*.{ts,tsx,js,jsx,json,css,md}": "prettier --write"
}
```

Larger repos often add **Turborepo** or **Nx** to lint only changed packages; that is optional later.

---

## 6. Adding a new app (`apps/admin`)

1. Create `package.json`, `"lint": "eslint ."`.
2. `eslint.config.js` — e.g. `export { default } from '@monorepo/eslint-config/react';` (or `/node` for Nest).
3. `tsconfig` — extend `@monorepo/tsconfig/react-app.json` or `base.json` / `node.json`.
4. **No root config edits** (only `pnpm --filter admin dev` when you add a script).

Delete `apps/web` → remove folder only; root and tooling unchanged.

---

## 7. Mental model

```text
tooling/     → publishes standards (base / node / react)
apps/*       → export { default } from '@monorepo/eslint-config/...'
root         → pnpm scripts + prettier + husky (orchestrator)
```

When in doubt: extend a preset in `tooling/`, don’t fork rules in the root.
