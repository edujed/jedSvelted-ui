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
		<Icon name={iconName} class="panel-icon" />
		<span class="panel-title">{title}</span>
		<ChevronDownIcon class="panel-chevron" />
	</button>

	{#if isOpen}
		<div class="panel-content">
			{@render children?.()}
		</div>
	{/if}
</div>

<style>
	.panel {
		background: var(--color-card-bg);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		box-shadow: var(--color-card-shadow);
		overflow: hidden;
		min-width: 60%;
	}

	:global(.panel-header) {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		width: 100%;
		padding: var(--spacing-md);
		background: transparent;
		border: none;
		color: var(--color-on-surface);
		font-size: var(--font-size-sm);
		font-weight: 600;
		font-family: inherit;
		cursor: pointer;
		text-align: left;
		transition: background var(--transition-fast);
	}

	.panel-header:hover {
		background: var(--color-sidenav-hover);
	}

	:global(.panel-icon) {
		width: 18px;
		height: 18px;
		color: var(--color-primary);
		flex-shrink: 0;
	}

	.panel-title {
		flex: 1;
	}

	:global(.panel-chevron) {
		width: 16px;
		height: 16px;
		color: var(--color-on-surface);
		opacity: 0.5;
		transition: transform var(--transition-fast);
		flex-shrink: 0;
	}

	.panel-header:hover :global(.panel-chevron) {
		opacity: 0.8;
	}

	.panel-content {
		padding: 0 var(--spacing-md) var(--spacing-md);
		border-top: 1px solid var(--color-border);
	}
</style>
