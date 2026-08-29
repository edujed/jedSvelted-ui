import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
	// Substituído sveltePreprocess por vitePreprocess
	preprocess: vitePreprocess(),

	onwarn: (warning, handler) => {
		const code = warning.code;
		// Ignora avisos específicos de acessibilidade (a11y)
		if (code === 'a11y-no-static-interact' || code === 'a11y-label-has-associated-control') return;
		handler(warning);
	}
};
