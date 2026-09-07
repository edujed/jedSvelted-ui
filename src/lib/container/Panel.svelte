<script lang="ts">
	import { fade } from 'svelte/transition';
	import Icon from '../icons/Icon.svelte';
	import { IconChevronDown } from '../icons';
	import type { PanelProps } from './containerTypes';

	let {
		title = '',
		iconName = 'search',
		isOpen = $bindable(true),
		children,
		onToggle
	}: PanelProps = $props();
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
		<IconChevronDown class="panel-chevron" />
	</button>

	{#if isOpen}
		<div class="panel-content" in:fade={{ duration: 150 }} out:fade={{ duration: 150 }}>
			{@render children?.()}
		</div>
	{/if}
</div>

<style>
	.panel {
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
		background: var(--color-primary-light);
		border: none;
		color: var(--color-primary);
		font-size: var(--font-size-sm);
		font-weight: 600;
		font-family: inherit;
		cursor: pointer;
		text-align: left;
		transition: background var(--transition-fast);
	}

	.panel-header:hover {
		background: color-mix(in srgb, var(--color-primary-light) 85%, var(--color-primary) 15%);
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
		padding-top: 0.5em;
		background: color-mix(in srgb, var(--color-card-bg) 95%, var(--color-on-background) 5%);
	}
</style>
