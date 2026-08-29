import { defineConfig } from 'vitest/config';
import sveltePreprocess from 'svelte-preprocess';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
	plugins: [
		svelte({
			preprocess: sveltePreprocess()
		})
	],
	test: {
		globals: true,
		environment: 'jsdom',
		include: ['src/**/*.{test,spec}.{ts,tsx,vue}', 'tests/**/*.{test,spec}.{ts,tsx,vue}'],
		css: {
			injectStyles: true
		}
	}
});
