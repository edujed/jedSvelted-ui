<script lang="ts">
	import Icon from '../icons/Icon.svelte';

	let { onFork, onDelete, index, forkLabel, deleteLabel }: {
		onFork?: (index: number) => void;
		onDelete?: (index: number) => void;
		index: number;
		forkLabel: string;
		deleteLabel: string;
	} = $props();
</script>

{#if onFork || onDelete}
	<div class="chat-msg-actions">
		{#if onFork}
			<button class="chat-action-btn" title={forkLabel} onclick={() => onFork(index)}>
				<Icon name="more" size={14} />
			</button>
		{/if}
		{#if onDelete}
			<button class="chat-action-btn" title={deleteLabel} onclick={() => onDelete(index)}>
				<Icon name="trash" size={14} />
			</button>
		{/if}
	</div>
{/if}

<style>
	.chat-msg-actions {
		display: flex;
		gap: var(--spacing-xxs);
	}

	.chat-action-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: none;
		border: none;
		color: inherit;
		opacity: 0.5;
		cursor: pointer;
		padding: var(--spacing-xxs);
		border-radius: var(--radius-sm);
		transition:
			opacity var(--transition-fast),
			background var(--transition-fast);
	}

	.chat-action-btn:hover {
		opacity: 1;
		background: color-mix(in srgb, currentColor 10%, transparent);
	}
</style>
