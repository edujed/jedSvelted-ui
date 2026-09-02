<script lang="ts">
	import type { Snippet } from 'svelte';
	import Icon from '../icons/Icon.svelte';
	import { ChevronDownIcon } from '../icons';

	let {
		title = '',
		iconName = 'search',
		isOpen = $bindable(true),
		children,
		onToggle
	}: {
		title?: string;
		iconName?: string;
		isOpen?: boolean;
		children?: Snippet;
		onToggle?: () => void;
	} = $props();
</script>

<div class="panel">
	<button
		class="panel-header"
		onclick={() => {
			isOpen = !isOpen;
			onToggle?.();
		}}
	>
		<Icon name={iconName} />
		<span class="panel-title">{title}</span>
		<ChevronDownIcon />
	</button>

	{#if isOpen}
		<div class="panel-content">
			{@render children?.()}
		</div>
	{/if}
</div>

<style>
	.panel {
		border-radius: var(--radius-md);
		overflow: hidden;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
	}

	.panel-header {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		padding: var(--spacing-md) var(--spacing-lg);
		background: var(--color-surface-2);
		color: var(--color-on-surface);
		cursor: pointer;
		width: 100%;
		text-align: left;
		font-weight: 600;
	}

	.panel-title {
		flex: 1;
		text-align: left;
	}

	.panel-content {
		padding: var(--spacing-md) var(--spacing-lg);
	}
</style>
