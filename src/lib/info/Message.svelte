<script lang="ts">
	import type { MessageProps } from './infoTypes';

	let {
		variant = 'info',
		title = '',
		dismissible = false,
		onDismiss,
		children,
		class: className = ''
	}: MessageProps = $props();

	const icons: Record<string, string> = {
		success: '✓',
		error: '✕',
		info: 'ℹ',
		warning: '⚠'
	};
</script>

<div role={variant === 'error' ? 'alert' : 'status'} class="message {className} message-{variant}">
	<div class="message-content">
		{#if title}
			<span class="message-title">{title}</span>
		{/if}
		{@render children?.()}
	</div>
	<span class="message-icon">{icons[variant]}</span>
	{#if dismissible}
		<button class="message-close" onclick={onDismiss} aria-label="Close">✕</button>
	{/if}
</div>

<style>
	.message {
		display: flex;
		align-items: flex-start;
		gap: var(--spacing-sm);
		padding: var(--spacing-sm) var(--spacing-md);
		border-radius: var(--radius-sm);
		border: 1px solid var(--color-border);
		background: var(--color-card-bg);
		color: var(--color-on-surface);
		font-size: var(--font-size-sm);
		font-weight: 600;
		font-family: inherit;
		line-height: 1.4;
	}

	.message-icon {
		flex-shrink: 0;
		font-size: 0.85rem;
		line-height: 1.4;
		margin-left: auto;
	}

	.message-content {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xxs);
		word-break: break-word;
		min-width: 0;
	}

	.message-title {
		font-weight: 700;
	}

	.message-close {
		flex-shrink: 0;
		background: none;
		border: none;
		color: inherit;
		opacity: 0.5;
		cursor: pointer;
		padding: 0;
		font-size: 0.85rem;
		line-height: 1.4;
		transition: opacity var(--transition-fast);
	}

	.message-close:hover {
		opacity: 1;
	}

	/* Info */
	.message-info {
		border-color: var(--color-info, var(--color-accent));
		color: var(--color-info, var(--color-accent));
		background: color-mix(in srgb, var(--color-info, var(--color-accent)) 8%, transparent);
	}

	/* Success */
	.message-success {
		border-color: var(--color-success);
		color: var(--color-success);
		background: color-mix(in srgb, var(--color-success) 8%, transparent);
	}

	/* Warning */
	.message-warning {
		border-color: var(--color-warning);
		color: var(--color-warning);
		background: color-mix(in srgb, var(--color-warning) 8%, transparent);
	}

	/* Error */
	.message-error {
		border-color: var(--color-error);
		color: var(--color-error);
		background: color-mix(in srgb, var(--color-error) 8%, transparent);
	}
</style>
