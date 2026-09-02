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
		justify-content: center;
		gap: 0.5rem;
		border: none;
		border-radius: var(--radius-sm);
		font-family: inherit;
		font-weight: 600;
		cursor: pointer;
		transition: all var(--transition-fast);
		padding: 6px 12px;
	}

	.btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	/* Sizes */
	.btn-sm {
		font-size: 0.75rem;
	}

	.btn-md {
		font-size: 0.85rem;
	}

	.btn-lg {
		font-size: 1rem;
	}

	/* Variants */
	.btn-primary {
		background: var(--color-primary);
		color: var(--color-on-primary, white);
	}

	.btn-primary:hover:not(:disabled) {
		background: color-mix(in srgb, var(--color-primary) 85%, transparent);
	}

	.btn-secondary {
		background: var(--color-surface, var(--color-card-bg));
		color: var(--color-on-surface);
		border: 1px solid var(--color-border);
	}

	.btn-secondary:hover:not(:disabled) {
		background: var(--color-sidenav-hover);
	}

	.btn-danger {
		background: var(--color-error);
		color: white;
		border: 1px solid var(--color-error);
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
		color: var(--color-on-primary, white);
	}

	.btn-search:hover:not(:disabled) {
		background: color-mix(in srgb, var(--color-primary) 85%, transparent);
	}

	.btn-clear {
		background: transparent;
		color: var(--color-on-surface);
		border: 1px solid var(--color-border);
	}

	.btn-clear:hover:not(:disabled) {
		background: var(--color-sidenav-hover);
	}

	.btn-icon {
		flex-shrink: 0;
	}
</style>
