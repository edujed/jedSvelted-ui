import { defineConfig } from 'vitest/config';
import { svelte, vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
	plugins: [
		svelte({
			preprocess: vitePreprocess()
		})
	],
	resolve: {
		conditions: ['svelte', 'browser', 'module', 'import', 'default']
	},
	test: {
		globals: true,
		environment: 'jsdom',
		include: ['src/**/*.test.{ts,tsx,vue,svelte}', 'src/**/*Spec.{ts,tsx,vue,svelte}'],
		server: {
			deps: {
				inline: ['bits-ui']
			}
		}
	}
});
