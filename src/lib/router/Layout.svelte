<script lang="ts">
	import Navbar from '../nav/Navbar.svelte';
	import Sidenav from '../nav/Sidenav.svelte';
	import { HashRouter } from './HashRouter';
	import type { LayoutProps } from './routerTypes';

	let {
		children,
		router = new HashRouter(),
		sidenavMode = 'overlay',
		sidenavTitle,
		sidenavLogo,
		sidenavFooter,
		sidenavHeader
	}: LayoutProps = $props();

	let sidenavOpen = $state(false);

	function closeSidenav(): void {
		sidenavOpen = false;
	}
</script>

<div class="layout-body">
	<Sidenav
		isOpen={sidenavOpen}
		onOverlayClick={closeSidenav}
		{router}
		mode={sidenavMode}
		title={sidenavTitle}
		logo={sidenavLogo}
		footer={sidenavFooter}
		header={sidenavHeader}
	/>

	<div class="layout-main">
		<Navbar
			{router}
			showHamburguer={sidenavMode !== 'fixed'}
			onMenuClick={() => (sidenavOpen = !sidenavOpen)}
		/>

		<main class="main-content">
			{@render children?.()}
		</main>
	</div>
</div>

<style>
	/* Shell: sidenav (fixed mode) sits in the flex flow; the rest of the
	   app (topbar + content) occupies the remaining width. */
	.layout-body {
		display: flex;
		min-height: 100vh;
	}

	.layout-main {
		flex: 1;
		display: flex;
		flex-direction: column;
		min-width: 0;
	}

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
