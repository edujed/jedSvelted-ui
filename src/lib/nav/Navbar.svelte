<script lang="ts">
	import ThemeSelector from '../theme/ThemeSelector.svelte';
	import { toggleMode, modeStore } from '../theme';
	import type { HashRouter } from '../router';

	let {
		router,
		onMenuClick = () => {}
	}: {
		router?: HashRouter;
		onMenuClick?: () => void;
	} = $props();

	// Título dinâmico — derivado do router se disponível.
	const tituloAtual = $derived(router?.getState()?.title || '');

	// Syncs theme mode via reactive store (auto-subscription in Svelte 5)
	let modoAtual = $derived($modeStore);

	function alternarModo(): void {
		toggleMode();
	}
</script>

<nav class="navbar" aria-label="Main navigation bar">
	<div class="navbar-left">
		<button class="hamburger-btn" aria-label="Open side menu" onclick={() => onMenuClick()}>
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
			>
				<line x1="3" y1="6" x2="21" y2="6" />
				<line x1="3" y1="12" x2="21" y2="12" />
				<line x1="3" y1="18" x2="21" y2="18" />
			</svg>
		</button>

		<div class="search-box">
			<svg
				class="search-icon"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
			>
				<circle cx="11" cy="11" r="8" />
				<line x1="21" y1="21" x2="16.65" y2="16.65" />
			</svg>
			<input
				class="search-input"
				placeholder="Quick search (AI Agent)..."
				aria-label="Quick search"
			/>
		</div>
	</div>

	<div class="navbar-center">
		<h1 class="navbar-title">{tituloAtual || 'DemoApp'}</h1>
	</div>

	<div class="navbar-right">
		<ThemeSelector />

		<button
			class="mode-toggle"
			aria-label={modoAtual === 'dark' ? 'Light mode' : 'Dark mode'}
			onclick={alternarModo}
		>
			{#if modoAtual === 'dark'}
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<circle cx="12" cy="12" r="5" />
					<line x1="12" y1="1" x2="12" y2="3" />
					<line x1="12" y1="21" x2="12" y2="23" />
					<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
					<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
					<line x1="1" y1="12" x2="3" y2="12" />
					<line x1="21" y1="12" x2="23" y2="12" />
					<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
					<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
				</svg>
			{:else}
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
				</svg>
			{/if}
		</button>
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

	.hamburger-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		background: transparent;
		border: none;
		color: var(--color-navbar-text);
		cursor: pointer;
		border-radius: var(--radius-sm);
		transition: background var(--transition-fast);
		flex-shrink: 0;
	}

	.hamburger-btn:hover {
		background: color-mix(in srgb, var(--color-navbar-text) 15%, transparent);
	}

	.hamburger-btn svg {
		width: 22px;
		height: 22px;
	}

	.search-box {
		position: relative;
		flex: 1;
		max-width: 400px;
		min-width: 120px;
	}

	.search-icon {
		position: absolute;
		left: 10px;
		top: 50%;
		transform: translateY(-50%);
		width: 16px;
		height: 16px;
		color: var(--color-navbar-text);
		opacity: 0.7;
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
		flex-shrink: 0;
	}

	.mode-toggle {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		background: transparent;
		border: 1px solid color-mix(in srgb, var(--color-navbar-text) 30%, transparent);
		color: var(--color-navbar-text);
		cursor: pointer;
		border-radius: var(--radius-sm);
		transition: background var(--transition-fast);
	}

	.mode-toggle:hover {
		background: color-mix(in srgb, var(--color-navbar-text) 15%, transparent);
	}

	.mode-toggle svg {
		width: 18px;
		height: 18px;
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
