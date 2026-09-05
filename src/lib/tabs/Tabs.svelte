<script lang="ts">
	import { Tabs } from 'bits-ui';
	import type { Snippet } from 'svelte';

	let {
		tabs = [],
		activeTab = $bindable(),
		children,
		tabContent
	}: {
		tabs?: Array<{ value: string; label: string }>;
		activeTab?: string;
		children?: Snippet;
		tabContent?: Snippet<[string]>;
	} = $props();

	let internalActive = $state('');
	let currentValue = $derived(activeTab ?? internalActive);

	$effect(() => {
		if (activeTab === undefined && tabs.length > 0 && !internalActive) {
			internalActive = tabs[0].value;
		}
	});

	function handleValueChange(newValue: string): void {
		if (activeTab !== undefined) {
			activeTab = newValue;
		} else {
			internalActive = newValue;
		}
	}
</script>

<Tabs.Root value={currentValue} onValueChange={handleValueChange} class="ui-tabs">
	<Tabs.List class="ui-tabs-list">
		{#each tabs as tab (tab.value)}
			<Tabs.Trigger value={tab.value} class="ui-tabs-btn">
				{tab.label}
			</Tabs.Trigger>
		{/each}
	</Tabs.List>

	<div class="ui-tabs-content">
		{@render tabContent?.(currentValue)}
		{@render children?.()}
	</div>
</Tabs.Root>

<style>
	:global(.ui-tabs) {
		display: flex;
		flex-direction: column;
		background: var(--color-card-bg);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		box-shadow: var(--color-card-shadow);
		overflow: hidden;
	}

	:global(.ui-tabs-list) {
		display: flex;
		border-bottom: 2px solid var(--color-border);
		background: var(--color-background);
		overflow-x: auto;
		-webkit-overflow-scrolling: touch;
	}

	:global(.ui-tabs-btn),
	:global(.themed-tab-btn) {
		background: none;
		border: none;
		padding: var(--spacing-md) var(--spacing-lg);
		color: var(--color-on-surface);
		cursor: pointer;
		transition: all var(--transition-fast);
		font-size: var(--font-size-xs);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.03em;
		white-space: nowrap;
		position: relative;
		opacity: 0.7;
	}

	:global(.ui-tabs-btn:hover),
	:global(.themed-tab-btn:hover) {
		opacity: 1;
		background: var(--color-sidenav-hover);
	}

	:global(.ui-tabs-btn[data-state='active']),
	:global(.themed-tab-btn[data-state='active']) {
		opacity: 1;
		color: var(--color-primary);
		background: var(--color-surface);
		font-weight: 700;
	}

	:global(.ui-tabs-btn[data-state='active']::after),
	:global(.themed-tab-btn[data-state='active']::after) {
		content: '';
		position: absolute;
		bottom: -2px;
		left: 0;
		right: 0;
		height: 2px;
		background: var(--color-primary);
	}

	:global(.ui-tabs-content) {
		padding: var(--spacing-md);
		background: var(--color-surface);
		min-height: 200px;
	}

	@media (max-width: 600px) {
		:global(.ui-tabs-btn),
		:global(.themed-tab-btn) {
			padding: var(--spacing-sm) var(--spacing-md);
			font-size: var(--font-size-xs);
		}
	}
</style>
