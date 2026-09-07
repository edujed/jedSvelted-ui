<script lang="ts">
	import ThemeSelector from '../theme/ThemeSelector.svelte';
	import LangSelector from '../i18n/LangSelector.svelte';
	import { toggleMode as switchThemeMode, modeStore } from '../theme';
	import { SearchIcon } from '../icons';
	import Button from '../ui/Button.svelte';
	import { LOCALES, localeStore } from '../i18n';
	import type { TopbarProps } from './navTypes';

	let {
		title = '',
		showQuickSearch = false,
		showHamburguer = false,
		onMenuClick = () => {},
		onSearch = () => {},
		onSearchKeydown = () => {}
	}: TopbarProps = $props();

	// Syncs theme mode via reactive store (auto-subscription in Svelte 5)
	let currentMode = $derived($modeStore);

	function toggleMode(): void {
		switchThemeMode();
	}
</script>

<nav class="topbar" aria-label={LOCALES[$localeStore].mainNav}>
	<div class="topbar-left">
		{#if showHamburguer}
			<Button
				variant="ghost"
				icon="menu"
				iconSize={22}
				aria-label={LOCALES[$localeStore].openSideMenu}
				onclick={() => onMenuClick()}
			/>
		{/if}

		{#if showQuickSearch}
			<div class="search-box">
				<SearchIcon size={16} class="search-icon" />
				<input
					class="search-input"
					placeholder={LOCALES[$localeStore].quickSearch}
					aria-label={LOCALES[$localeStore].quickSearch}
					oninput={(e) => onSearch((e.target as HTMLInputElement).value)}
					onkeydown={(e) => onSearchKeydown(e)}
				/>
			</div>
		{/if}
	</div>

	<div class="topbar-center">
		<h1 class="topbar-title">{title}</h1>
	</div>

	<div class="topbar-right">
		<LangSelector />
		<ThemeSelector />

		<Button
			variant="ghost"
			icon={currentMode === 'dark' ? 'sun' : 'moon'}
			iconSize={18}
			aria-label={currentMode === 'dark'
				? LOCALES[$localeStore].lightMode
				: LOCALES[$localeStore].darkMode}
			onclick={toggleMode}
		/>
	</div>
</nav>

<style>
	.topbar {
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

	.topbar-left {
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

	.topbar-center {
		flex: 0 1 auto;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.topbar-title {
		font-size: var(--font-size-md);
		font-weight: 600;
		margin: 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 300px;
		text-align: center;
	}

	.topbar-right {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		flex: 1;
		justify-content: flex-end;
		min-width: 0;
	}

	/* Mobile: hides the theme label */
	@media (max-width: 600px) {
		.topbar-title {
			max-width: 160px;
			font-size: var(--font-size-sm);
		}

		.search-box {
			max-width: 150px;
		}
	}

	/* Desktop: expands layout */
	@media (min-width: 1024px) {
		.topbar-title {
			max-width: 500px;
		}

		.search-box {
			max-width: 500px;
		}
	}
</style>
