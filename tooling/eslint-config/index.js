import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import security from 'eslint-plugin-security';
import { defineConfig } from 'eslint/config';

/** Shared rule sets for all TypeScript projects (no React). */
export const baseExtends = [
	js.configs.recommended, // ESLint JS best practices (unused vars, unreachable code, etc.)
	...tseslint.configs.recommended, // TypeScript type safety rules
	prettierConfig, // Disables formatting conflicts with Prettier
];

/**
 * Base ESLint config for TypeScript (no React).
 * @param {{ files: string | string[], globals?: import('globals').Globals }} options
 */
export function createBaseConfig({ files, globals: envGlobals = globals.node }) {
	return defineConfig({
		files,
		languageOptions: {
			globals: envGlobals,
		},
		extends: [
			...baseExtends,
			security.configs.recommended, // Security best practices
		],
	});
}
