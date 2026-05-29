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

| Preset           | Use for                                     |
| ---------------- | ------------------------------------------- |
| `base.json`      | Any TS package (strict defaults, no emit)   |
| `node.json`      | Node tooling files (`vite.config.ts`, etc.) |
| `node-app.json`  | Node backends that compile to `dist/`       |
| `react-app.json` | Browser React (`lib` DOM, `jsx`, Vite)      |

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
2. `eslint.config.js` — e.g. `export { default } from '@monorepo/eslint-config/react';` (or `/node` for backends).
3. `tsconfig` — extend `@monorepo/tsconfig/react-app.json`, `node-app.json`, or `node.json`.
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

---

## 8. Pinned toolchain (single base stack)

All workspaces share the same runtime and dev-tool versions. **Do not use loose ranges** (`>=20`, `^`, `~`) for core tooling.

| Tool       | Version   | Where enforced                            |
| ---------- | --------- | ----------------------------------------- |
| Node.js    | `24.0.0`  | `.node-version`, `engines.node`, `.npmrc` |
| pnpm       | `10.34.1` | `packageManager`, `engines.pnpm`          |
| TypeScript | `6.0.3`   | `pnpm-workspace.yaml` → `catalog`         |
| ESLint     | `9.39.4`  | `catalog`                                 |
| Prettier   | `3.8.3`   | `catalog`                                 |
| Vitest     | `4.1.7`   | `catalog`                                 |

### How versions are shared

1. **`pnpm-workspace.yaml` → `catalog`** — single source of truth for dev dependencies.
2. **`catalog:` protocol** — in each `package.json`: `"typescript": "catalog:"`.
3. **`.npmrc`** — `engine-strict=true`, `node-version=24.0.0`, `save-exact=true`.
4. **`.node-version`** — for nvm, fnm, asdf, etc.

To bump a shared version: edit the catalog entry once, then `pnpm install`.

### Adding a new app (minimal per-framework changes)

1. `package.json` — add `"engines"`, use `catalog:` for shared dev deps.
2. `eslint.config.js` — one line: `export { default } from '@monorepo/eslint-config/react'` (or `/node`).
3. `tsconfig.json` — `"extends": "@monorepo/tsconfig/react-app.json"` (or `node-app.json` for backends).
4. Optional: framework-specific `compilerOptions.types` (e.g. `"vite/client"`).
