<script lang="ts">
	import Navbar from '../nav/Navbar.svelte';
	import Sidenav from '../nav/Sidenav.svelte';
	import { HashRouter } from '../router';
	import type { Snippet } from 'svelte';

	let {
		children,
		router = new HashRouter()
	}: {
		children?: Snippet;
		router?: HashRouter;
	} = $props();

	let sidenavOpen = $state(false);

	function closeSidenav(): void {
		sidenavOpen = false;
	}
</script>

<Sidenav isOpen={sidenavOpen} onOverlayClick={closeSidenav} {router} />

<Navbar {router} onMenuClick={() => (sidenavOpen = !sidenavOpen)} />

<main class="main-content">
	{@render children?.()}
</main>

<style>
	.main-content {
		flex: 1;
		padding: var(--spacing-md);
		overflow-y: auto;
		min-height: calc(100vh - var(--navbar-height));
		max-width: 90%;
		min-width: 40%;
	}

	/* Mobile: content takes full width */
	@media (max-width: 600px) {
		.main-content {
			padding: var(--spacing-sm);
		}
	}

	/* Desktop: centered content with max-width */
	@media (min-width: 1200px) {
		.main-content {
			margin: 0 auto;
			padding: var(--spacing-xl);
		}
	}
</style>
