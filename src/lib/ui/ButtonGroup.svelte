<script lang="ts">
	import type { Snippet } from 'svelte';

	export interface ButtonGroupOption {
		value: string;
		label: string;
		disabled?: boolean;
	}

	let {
		options = [],
		value = $bindable(),
		size = 'md',
		class: className = '',
		onchange,
		children
	}: {
		options?: ButtonGroupOption[];
		value?: string;
		size?: 'sm' | 'md';
		class?: string;
		onchange?: (value: string) => void;
		children?: Snippet;
	} = $props();

	function handleClick(opt: ButtonGroupOption) {
		if (opt.disabled) return;
		value = opt.value;
		onchange?.(opt.value);
	}
</script>

<div class="btn-group btn-group-{size} {className}" role="group">
	{#if options.length > 0}
		{#each options as opt (opt.value)}
			<button
				class="btn-group-item"
				class:active={value === opt.value}
				disabled={opt.disabled}
				onclick={() => handleClick(opt)}
			>
				{opt.label}
			</button>
		{/each}
	{:else}
		{@render children?.()}
	{/if}
</div>

<style>
	.btn-group {
		display: inline-flex;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		overflow: hidden;
		background: var(--color-input-bg);
		margin-bottom: var(--spacing-md);
	}

	.btn-group-item {
		padding: var(--spacing-sm) var(--spacing-md);
		font-size: var(--font-size-sm);
		font-weight: 500;
		font-family: inherit;
		color: var(--color-on-surface);
		background: transparent;
		border: none;
		border-right: 1px solid var(--color-border);
		cursor: pointer;
		transition: all var(--transition-fast);
		white-space: nowrap;
	}

	.btn-group-item:last-child {
		border-right: none;
	}

	.btn-group-item:hover:not(:disabled):not(.active) {
		background: var(--color-sidenav-hover);
	}

	.btn-group-item.active {
		background: var(--color-primary);
		color: var(--color-on-primary);
		font-weight: 600;
	}

	.btn-group-item:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	/* Sizes */
	.btn-group-sm .btn-group-item {
		padding: var(--spacing-xs) var(--spacing-sm);
		font-size: var(--font-size-xs);
	}
</style>
