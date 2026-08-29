<script lang="ts">
	import { HashRouter } from '../router';
	import Navbar from '../nav/Navbar.svelte';
	import Sidenav from '../nav/Sidenav.svelte';

	import type { Snippet } from 'svelte';

	let {
		title = '',
		children,
		router = new HashRouter()
	}: {
		title?: string;
		children?: Snippet;
		router: HashRouter;
	} = $props();

	let sidenavAberto = $state(false);

	function fecharSidenav(): void {
		sidenavAberto = false;
	}
</script>

<Sidenav isOpen={sidenavAberto} onOverlayClick={fecharSidenav} {router} />

<Navbar {title} onMenuClick={() => (sidenavAberto = !sidenavAberto)} />

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
