<script lang="ts">
	import type { Snippet } from 'svelte';
	import Button from './Button.svelte';
	import { IconTrash } from '../icons';

	let {
		message = 'Are you sure you want to delete this record?',
		warning = 'This action cannot be undone.',
		title = 'Confirm Deletion',
		onConfirm,
		onCancel,
		children
	}: {
		/** Main confirmation message. */
		message?: string;
		/** Secondary warning line (rendered in the error color). */
		warning?: string;
		/** Heading. */
		title?: string;
		/** Called when the user confirms the deletion. */
		onConfirm?: () => void;
		/** Called when the user cancels. */
		onCancel?: () => void;
		/** Optional content rendered above the message (e.g., the record being deleted). */
		children?: Snippet;
	} = $props();
</script>

<div class="delete-confirm">
	<div class="delete-icon">
		<IconTrash size={48} />
	</div>
	<div class="delete-content">
		<h3 class="delete-title">{title}</h3>
		{#if children}
			<div class="delete-record">
				{@render children()}
			</div>
		{/if}
		<p class="delete-message">{message}</p>
		{#if warning}
			<p class="delete-warning">{warning}</p>
		{/if}
	</div>
	<div class="delete-actions">
		<Button variant="danger" icon="trash" onclick={onConfirm}>Delete</Button>
		<Button variant="secondary" icon="x" onclick={onCancel}>Cancel</Button>
	</div>
</div>

<style>
	.delete-confirm {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-lg);
		padding: var(--spacing-lg);
		text-align: center;
	}

	.delete-icon {
		color: var(--color-error);
		opacity: 0.8;
	}

	.delete-title {
		font-size: var(--font-size-lg);
		font-weight: 600;
		margin: 0;
		color: var(--color-error);
	}

	.delete-record {
		width: 100%;
		margin: var(--spacing-sm) 0;
		text-align: left;
	}

	.delete-message {
		font-size: var(--font-size-md);
		margin: var(--spacing-sm) 0;
		color: var(--color-on-surface);
	}

	.delete-warning {
		font-size: var(--font-size-sm);
		color: var(--color-error);
		opacity: 0.8;
		margin: 0;
	}

	.delete-actions {
		display: flex;
		gap: var(--spacing-md);
		margin-top: var(--spacing-md);
	}
</style>
