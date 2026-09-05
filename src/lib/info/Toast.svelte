<script lang="ts">
	import type { Toast } from './toast';
	import { LOCALES, localeStore } from '../i18n';

	let { toast, onClose }: { toast: Toast; onClose?: (id: string) => void } = $props();

	const icons: Record<string, string> = {
		success: '✓',
		error: '✕',
		info: 'ℹ',
		warning: '⚠'
	};

	const labels = $derived<Record<string, string>>({
		success: LOCALES[$localeStore].toastSuccess,
		error: LOCALES[$localeStore].toastError,
		info: LOCALES[$localeStore].toastInfo,
		warning: LOCALES[$localeStore].toastWarning
	});

	let pauseTimer: ReturnType<typeof setTimeout> | null = null;

	function handleMouseEnter() {
		if (pauseTimer) clearTimeout(pauseTimer);
	}

	function handleMouseLeave() {
		if (onClose) {
			pauseTimer = setTimeout(() => onClose(toast.id), 300);
		}
	}
</script>

<div
	role="status"
	class="toast"
	class:toast-success={toast.type === 'success'}
	class:toast-error={toast.type === 'error'}
	class:toast-info={toast.type === 'info'}
	class:toast-warning={toast.type === 'warning'}
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
>
	<span class="toast-icon">{icons[toast.type]}</span>
	<div class="toast-content">
		<span class="toast-label">{labels[toast.type]}</span>
		<span class="toast-message">{toast.message}</span>
	</div>
	{#if onClose}
		<button class="toast-close" onclick={() => onClose(toast.id)}>✕</button>
	{/if}
</div>

<style>
	.toast {
		display: flex;
		align-items: flex-start;
		gap: var(--spacing-md);
		padding: var(--spacing-md);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		box-shadow: var(--color-card-shadow);
		background: var(--color-card-bg);
		color: var(--color-on-surface);
		font-size: var(--font-size-sm);
		font-family: inherit;
		animation: toast-in 0.3s ease-out;
		max-width: 380px;
		min-width: 280px;
		word-break: break-word;
	}

	.toast-icon {
		flex-shrink: 0;
		width: 20px;
		height: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		font-size: 0.75rem;
		font-weight: 700;
	}

	.toast-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xxs);
	}

	.toast-close {
		flex-shrink: 0;
		background: none;
		border: none;
		color: var(--color-on-surface);
		opacity: 0.4;
		cursor: pointer;
		padding: 0;
		font-size: 0.85rem;
		line-height: 1;
		transition: opacity var(--transition-fast);
	}

	.toast-close:hover {
		opacity: 0.8;
	}

	.toast-label {
		font-weight: 600;
		font-size: var(--font-size-xs);
		text-transform: uppercase;
		letter-spacing: 0.03em;
		opacity: 0.7;
	}

	.toast-message {
		line-height: 1.4;
	}

	/* Success */
	.toast-success {
		border-left: 3px solid var(--color-primary);
	}
	.toast-success .toast-icon {
		color: var(--color-primary);
		background: var(--color-primary-light);
	}

	/* Error */
	.toast-error {
		border-left: 3px solid var(--color-error);
	}
	.toast-error .toast-icon {
		color: var(--color-error);
		background: color-mix(in srgb, var(--color-error) 10%, transparent);
	}

	/* Info */
	.toast-info {
		border-left: 3px solid var(--color-accent);
	}
	.toast-info .toast-icon {
		color: var(--color-accent);
		background: var(--color-primary-light);
	}

	/* Warning */
	.toast-warning {
		border-left: 3px solid var(--color-warning);
	}
	.toast-warning .toast-icon {
		color: var(--color-warning);
		background: color-mix(in srgb, var(--color-warning) 10%, transparent);
	}

	@keyframes toast-in {
		from {
			opacity: 0;
			transform: translateX(100%);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}
</style>
