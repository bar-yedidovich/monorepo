import globals from 'globals';
import { createBaseConfig } from './index.js';

/**
 * Node / tooling files preset (no React). Use in backends or config-only packages:
 *   export { default } from '@monorepo/eslint-config/node';
 * Or compose: export default defineConfig(...(await import('@monorepo/eslint-config/node')).default);
 */
export default createBaseConfig({
	files: ['**/*.ts'],
	globals: globals.node,
});
