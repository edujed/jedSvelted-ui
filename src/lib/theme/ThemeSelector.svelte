<script lang="ts">
	import { DropdownMenu } from 'bits-ui';
	import { THEMES, applyTheme, themeStore, type ThemeId } from './index';
	import { ChevronDownIcon } from '../icons';

	let temaAtual = $derived($themeStore);

	function selecionarTema(id: ThemeId): void {
		applyTheme(id);
	}

	// Find current theme without using find (avoids type issues)
	const temaInfo = (() => {
		for (const t of THEMES) {
			if (t.id === temaAtual) return t;
		}
		return null;
	})();
</script>

<div class="theme-selector">
	<DropdownMenu.Root>
		<DropdownMenu.Trigger class="theme-btn">
			<span class="theme-icon">{temaInfo?.icon ?? '🔵'}</span>
			<span class="theme-label">{temaInfo?.label ?? 'Theme'}</span>
			<ChevronDownIcon size={14} class="chevron" />
		</DropdownMenu.Trigger>

		<DropdownMenu.Content class="theme-list">
			{#each THEMES as theme (theme.id)}
				<DropdownMenu.Item class="theme-item" onSelect={() => selecionarTema(theme.id)}>
					<span class="item-icon">{theme.icon}</span>
					<span class="item-label">{theme.label}</span>
					{#if temaAtual === theme.id}
						<span class="item-check">✓</span>
					{/if}
				</DropdownMenu.Item>
			{/each}
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</div>

<style>
	.theme-selector {
		position: relative;
	}

	:global(.theme-btn) {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		background: transparent;
		border: 1px solid color-mix(in srgb, var(--color-navbar-text) 30%, transparent);
		color: var(--color-navbar-text);
		padding: var(--spacing-xs) var(--spacing-sm);
		border-radius: var(--radius-sm);
		cursor: pointer;
		font-size: var(--font-size-sm);
		font-family: inherit;
		white-space: nowrap;
		transition: background var(--transition-fast);
	}

	:global(.theme-btn:hover) {
		background: color-mix(in srgb, var(--color-navbar-text) 15%, transparent);
	}

	.theme-icon {
		font-size: 1rem;
	}

	:global(.theme-list) {
		background: var(--color-popover-bg);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		box-shadow: 0 4px 16px var(--color-shadow);
		padding: var(--spacing-xs);
		min-width: 180px;
		z-index: 100;
	}

	:global(.theme-item) {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		padding: var(--spacing-sm) var(--spacing-md);
		border-radius: var(--radius-sm);
		cursor: pointer;
		font-size: var(--font-size-sm);
		color: var(--color-on-surface);
		border: none;
		background: none;
		width: 100%;
		text-align: left;
		font-family: inherit;
		transition: background var(--transition-fast);
	}

	:global(.theme-item:hover) {
		background: var(--color-sidenav-hover);
	}

	.item-icon {
		font-size: 1.1rem;
	}

	.item-label {
		flex: 1;
	}

	.item-check {
		color: var(--color-primary);
		font-weight: bold;
		font-size: 0.9rem;
	}
</style>
