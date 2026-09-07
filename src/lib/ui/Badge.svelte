<script lang="ts">
	import IconX from '../icons/IconX.svelte';
	import { LOCALES, localeStore } from '../i18n';
	import type { BadgeProps } from './uiTypes';

	let {
		variant = 'primary',
		dismissible = false,
		onDismiss,
		children,
		class: className = ''
	}: BadgeProps = $props();
</script>

<span class="badge badge-{variant} {className}">
	{@render children?.()}
	{#if dismissible}
		<button class="badge-dismiss" onclick={onDismiss} aria-label="Remove">
			<IconX size={12} />
		</button>
	{/if}
</span>

<style>
	.badge {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-xs);
		padding: var(--spacing-xxs) var(--spacing-sm);
		border-radius: 999px;
		font-size: var(--font-size-xs);
		font-weight: 500;
		line-height: 1.4;
		max-width: 100%;
	}

	.badge :global(svg) {
		flex-shrink: 0;
	}

	.badge-primary {
		background: var(--color-primary);
		color: var(--color-on-primary);
	}

	.badge-secondary {
		background: var(--color-primary-light);
		color: var(--color-primary-dark);
	}

	.badge-success {
		background: var(--color-success);
		color: var(--color-on-primary);
	}

	.badge-warning {
		background: var(--color-warning);
		color: var(--color-on-primary);
	}

	.badge-error {
		background: var(--color-error);
		color: var(--color-on-error);
	}

	.badge-dismiss {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: none;
		border: none;
		padding: 0;
		margin-left: var(--spacing-xxs);
		color: inherit;
		opacity: 0.7;
		cursor: pointer;
		transition: opacity var(--transition-fast);
	}

	.badge-dismiss:hover {
		opacity: 1;
	}
</style>
