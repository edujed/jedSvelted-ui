<script lang="ts">
	import type { Snippet } from 'svelte';
	import Icon from '../icons/Icon.svelte';

	type IconName =
		| 'eye'
		| 'edit'
		| 'trash'
		| 'user'
		| 'more'
		| 'chevron-right'
		| 'check'
		| 'x'
		| 'wallet'
		| 'bank'
		| 'clock'
		| 'menu'
		| 'download'
		| 'sun'
		| 'moon'
		| 'sort'
		| 'plus'
		| 'chevron-down'
		| 'circle'
		| 'filter'
		| 'search'
		| 'settings'
		| 'user-alt';

	let {
		variant = 'primary',
		size = 'md',
		icon,
		iconPosition = 'left',
		iconSize = 16,
		disabled = false,
		class: className = '',
		children,
		...restProps
	}: {
		variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'search' | 'clear';
		size?: 'sm' | 'md' | 'lg';
		icon?: IconName;
		iconPosition?: 'left' | 'right';
		iconSize?: number;
		disabled?: boolean;
		class?: string;
		children?: Snippet;
		[key: string]: unknown;
	} = $props();
</script>

<button class="btn btn-{variant} btn-{size} {className}" {disabled} {...restProps}>
	{#if icon && iconPosition === 'left'}
		<Icon name={icon} size={iconSize} class="btn-icon" />
	{/if}
	{@render children?.()}
	{#if icon && iconPosition === 'right'}
		<Icon name={icon} size={iconSize} class="btn-icon" />
	{/if}
</button>

<style>
	.btn {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-sm);
		padding: var(--spacing-sm) var(--spacing-md);
		border-radius: var(--radius-sm);
		font-size: var(--font-size-sm);
		font-weight: 600;
		font-family: inherit;
		cursor: pointer;
		border: 1px solid transparent;
		transition: all var(--transition-fast);
	}

	.btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	/* Sizes */
	.btn-sm {
		font-size: var(--font-size-xs);
	}

	.btn-md {
		font-size: var(--font-size-sm);
	}

	.btn-lg {
		font-size: var(--font-size-md);
	}

	/* Variants */
	.btn-primary {
		background: var(--color-primary);
		color: var(--color-on-primary);
		border-color: var(--color-primary);
	}

	.btn-primary:hover:not(:disabled) {
		background: var(--color-primary-dark);
		border-color: var(--color-primary-dark);
	}

	.btn-secondary {
		background: var(--color-input-bg);
		color: var(--color-on-surface);
	}

	.btn-secondary:hover:not(:disabled) {
		background: var(--color-sidenav-hover);
		border-color: var(--color-primary);
		color: var(--color-primary);
	}

	.btn-danger {
		background: var(--color-error);
		color: white;
		border-color: var(--color-error);
	}

	.btn-danger:hover:not(:disabled) {
		background: color-mix(in srgb, var(--color-error) 80%, transparent);
	}

	.btn-ghost {
		background: transparent;
		color: var(--color-on-surface);
	}

	.btn-ghost:hover:not(:disabled) {
		background: var(--color-sidenav-hover);
	}

	.btn-search {
		background: var(--color-primary);
		color: var(--color-on-primary);
		border-color: var(--color-primary);
	}

	.btn-search:hover:not(:disabled) {
		background: var(--color-primary-dark);
		border-color: var(--color-primary-dark);
	}

	.btn-clear {
		background: transparent;
		color: var(--color-on-surface);
		border-color: var(--color-border);
	}

	.btn-clear:hover:not(:disabled) {
		background: var(--color-sidenav-hover);
		border-color: var(--color-input-border);
	}

	.btn-icon {
		width: 16px;
		height: 16px;
		flex-shrink: 0;
	}
</style>
