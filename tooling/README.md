# tooling

Shared **presets** for the monorepo (not tied to any app or package).

| Package                     | Presets                                    |
| --------------------------- | ------------------------------------------ |
| `@monorepo/tsconfig`        | `base.json`, `node.json`, `react-app.json` |
| `@monorepo/eslint-config`   | `.` (base), `./react`, `./node`            |
| `@monorepo/prettier-config` | default export                             |

Children **extend** these; root does not import apps or packages.
