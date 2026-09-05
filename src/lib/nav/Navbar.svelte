<script lang="ts">
	import ThemeSelector from '../theme/ThemeSelector.svelte';
	import LangSelector from '../i18n/LangSelector.svelte';
	import { toggleMode as switchThemeMode, modeStore } from '../theme';
	import type { HashRouter } from '../router';
	import { SearchIcon } from '../icons';
	import Button from '../ui/Button.svelte';
	import { LOCALES, localeStore } from '../i18n';

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
		const _locale = $localeStore;
		const state = router?.getState();
		if (!state) return '';
		const raw = state.rawTitle ?? state.title;
		return typeof raw === 'function' ? raw() : raw;
	});

	// Syncs theme mode via reactive store (auto-subscription in Svelte 5)
	let currentMode = $derived($modeStore);

	function toggleMode(): void {
		switchThemeMode();
	}
</script>

<nav class="navbar" aria-label={LOCALES[$localeStore].mainNav}>
	<div class="navbar-left">
		<Button
			variant="ghost"
			icon="menu"
			iconSize={22}
			aria-label={LOCALES[$localeStore].openSideMenu}
			onclick={() => onMenuClick()}
		/>

		<div class="search-box">
			<SearchIcon size={16} class="search-icon" />
			<input class="search-input" placeholder={LOCALES[$localeStore].quickSearch} aria-label={LOCALES[$localeStore].quickSearch} />
		</div>
	</div>

	<div class="navbar-center">
		<h1 class="navbar-title">{currentTitle || 'DemoApp'}</h1>
	</div>

	<div class="navbar-right">
		<LangSelector />
		<ThemeSelector />

		<Button
			variant="ghost"
			icon={currentMode === 'dark' ? 'sun' : 'moon'}
			iconSize={18}
			aria-label={currentMode === 'dark' ? LOCALES[$localeStore].lightMode : LOCALES[$localeStore].darkMode}
			onclick={toggleMode}
		/>
	</div>
</nav>

<style>
	.navbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: var(--navbar-height);
		background-color: var(--color-navbar-bg);
		color: var(--color-navbar-text);
		padding: 0 var(--spacing-md);
		position: sticky;
		top: 0;
		z-index: 50;
		box-shadow: 0 2px 4px var(--color-shadow);
		flex-shrink: 0;
	}

	.navbar-left {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		flex: 1;
		min-width: 0;
	}

	.search-box {
		position: relative;
		flex: 1;
		max-width: 400px;
		min-width: 120px;
	}

	:global(.search-icon) {
		position: absolute;
		left: var(--spacing-sm);
		top: 50%;
		transform: translateY(-50%);
		color: color-mix(in srgb, var(--color-navbar-text) 60%, transparent);
		pointer-events: none;
	}

	.search-input {
		width: 100%;
		padding: var(--spacing-sm) var(--spacing-md) var(--spacing-sm) 2rem;
		background: color-mix(in srgb, var(--color-navbar-text) 15%, transparent);
		border: 1px solid color-mix(in srgb, var(--color-navbar-text) 25%, transparent);
		border-radius: var(--radius-sm);
		color: var(--color-navbar-text);
		font-size: var(--font-size-sm);
		font-family: inherit;
		outline: none;
		transition:
			background var(--transition-fast),
			border-color var(--transition-fast);
	}

	.search-input::placeholder {
		color: color-mix(in srgb, var(--color-navbar-text) 60%, transparent);
	}

	.search-input:focus {
		background: color-mix(in srgb, var(--color-navbar-text) 20%, transparent);
		border-color: color-mix(in srgb, var(--color-navbar-text) 50%, transparent);
	}

	.navbar-center {
		flex: 0 1 auto;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.navbar-title {
		font-size: var(--font-size-md);
		font-weight: 600;
		margin: 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 300px;
		text-align: center;
	}

	.navbar-right {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		flex: 1;
		justify-content: flex-end;
		min-width: 0;
	}

	/* Mobile: hides the theme label */
	@media (max-width: 600px) {
		.navbar-title {
			max-width: 160px;
			font-size: var(--font-size-sm);
		}

		.search-box {
			max-width: 150px;
		}
	}

	/* Desktop: expands layout */
	@media (min-width: 1024px) {
		.navbar-title {
			max-width: 500px;
		}

		.search-box {
			max-width: 500px;
		}
	}
</style>
