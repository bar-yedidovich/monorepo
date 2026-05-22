import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import { defineConfig } from 'eslint/config';
import { baseExtends, createBaseConfig } from './index.js';

/**
 * React + Vite app preset. Extend in apps/web/eslint.config.js:
 *   export { default } from '@monorepo/eslint-config/react';
 */
export default defineConfig(
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			globals: globals.browser,
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		// Extends configuration (rule sets) from various plugins
		// These automatically register the plugins
		extends: [
			...baseExtends,
			react.configs.flat.recommended, // React best practices (keys in lists, prop validation, etc.)
			reactHooks.configs.flat.recommended, // Hook rules (dependency arrays, hook call order)
			jsxA11y.flatConfigs.recommended, // Accessibility (alt text, form labels, etc.)
		],
		// Custom rule overrides
		rules: {
			'react/react-in-jsx-scope': 'off', // React 17+ doesn't need import React
			'react/prop-types': 'off', // Using TypeScript for type validation instead
		},
		// Plugin-specific settings
		settings: {
			react: {
				version: 'detect', // Auto-detect React version from package.json
			},
		},
	},
	// Vite config file — don't lint it with React rules
	createBaseConfig({
		files: ['vite.config.ts'],
		globals: globals.node,
	})
);
