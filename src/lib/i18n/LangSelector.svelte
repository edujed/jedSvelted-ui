<script lang="ts">
	import { DropdownMenu } from 'bits-ui';
	import { localeStore, setLocale, LOCALE_OPTIONS, type Locale } from './index';
	import { ChevronDownIcon } from '../icons';

	let currentLocale = $derived($localeStore);

	function selectLocale(id: Locale): void {
		setLocale(id);
	}

	const localeInfo = $derived(LOCALE_OPTIONS.find((l) => l.id === currentLocale));
</script>

<div class="lang-selector">
	<DropdownMenu.Root>
		<DropdownMenu.Trigger class="lang-btn">
			<span class="lang-icon">{localeInfo?.icon ?? '🌐'}</span>
			<span class="lang-label">{localeInfo?.label ?? 'Language'}</span>
			<ChevronDownIcon size={14} class="chevron" />
		</DropdownMenu.Trigger>

		<DropdownMenu.Content class="lang-list">
			{#each LOCALE_OPTIONS as locale (locale.id)}
				<DropdownMenu.Item class="lang-item" onSelect={() => selectLocale(locale.id)}>
					<span class="item-icon">{locale.icon}</span>
					<span class="item-label">{locale.label}</span>
					{#if currentLocale === locale.id}
						<span class="item-check">✓</span>
					{/if}
				</DropdownMenu.Item>
			{/each}
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</div>

<style>
	.lang-selector {
		position: relative;
	}

	:global(.lang-btn) {
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

	:global(.lang-btn:hover) {
		background: color-mix(in srgb, var(--color-navbar-text) 15%, transparent);
	}

	.lang-icon {
		font-size: 1rem;
	}

	:global(.lang-list) {
		background: var(--color-popover-bg);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		box-shadow: 0 4px 16px var(--color-shadow);
		padding: var(--spacing-xs);
		min-width: 180px;
		z-index: 100;
	}

	:global(.lang-item) {
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

	:global(.lang-item:hover) {
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
