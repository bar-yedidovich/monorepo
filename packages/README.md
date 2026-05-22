# packages

**Installable workspace libraries** — `"@monorepo/logger": "workspace:*"`.

Extend tooling presets, e.g.:

```json
// tsconfig.json
{ "extends": "@monorepo/tsconfig/base.json", "include": ["src"] }
```

```js
// eslint.config.js
import { createBaseConfig } from '@monorepo/eslint-config';

export default createBaseConfig({ files: ['**/*.ts'] });
```

```json
// package.json
{ "scripts": { "lint": "eslint ." } }
```
