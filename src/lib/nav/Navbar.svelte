<script lang="ts">
	import Topbar from './Topbar.svelte';
	import { localeStore } from '../i18n';
	import type { NavbarProps } from './navTypes';

	let { router, onMenuClick = () => {}, showHamburguer = true }: NavbarProps = $props();

	// Dynamic title — derived from the router when available.
	// Reads rawTitle (which may be a getter) so it re-resolves on locale change.
	// A listener keeps a local snapshot of the route state in sync with
	// hash changes (mirrors the demo-app pattern) — without it the title
	// would only update on locale changes.
	let routeState = $state(null);
	$effect(() => {
		const r = router;
		if (!r) return;
		const listener = () => {
			routeState = r.getState();
		};
		routeState = r.getState();
		r.addRouterListener(listener);
		return () => r.removeRouterListener(listener);
	});

	const currentTitle = $derived.by(() => {
		// Read $localeStore so this derived re-evaluates on locale change.
		void $localeStore;
		const state = routeState;
		if (!state) return '';
		const raw = state.rawTitle ?? state.title;
		return typeof raw === 'function' ? raw() : raw;
	});
</script>

<Topbar title={currentTitle || 'DemoApp'} showQuickSearch showHamburguer={showHamburguer} {onMenuClick} />
