import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
	// Replaced sveltePreprocess with vitePreprocess
	preprocess: vitePreprocess(),

	onwarn: (warning, handler) => {
		const code = warning.code;
		// Ignore specific accessibility (a11y) warnings
		if (code === 'a11y-no-static-interact' || code === 'a11y-label-has-associated-control') return;
		handler(warning);
	}
};
