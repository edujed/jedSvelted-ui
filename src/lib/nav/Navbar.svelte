<script lang="ts">
	import Topbar from './Topbar.svelte';
	import type { HashRouter } from '../router';
	import { localeStore } from '../i18n';

	let {
		router,
		onMenuClick = () => {}
	}: {
		router?: HashRouter;
		onMenuClick?: () => void;
	} = $props();

	// Dynamic title — derived from the router when available.
	// Reads rawTitle (which may be a getter) so it re-resolves on locale change.
	const currentTitle = $derived.by(() => {
		// Read $localeStore so this derived re-evaluates on locale change.
		void $localeStore;
		const state = router?.getState();
		if (!state) return '';
		const raw = state.rawTitle ?? state.title;
		return typeof raw === 'function' ? raw() : raw;
	});
</script>

<Topbar title={currentTitle || 'DemoApp'} showQuickSearch showHamburguer {onMenuClick} />
