<script lang="ts">
	import type { EmptyStateProps } from './uiTypes';

	let { message = '', icon = null, class: className = '' }: EmptyStateProps = $props();
</script>

<div class="empty-state {className}">
	{#if icon}
		<span class="empty-state-icon">{icon}</span>
	{/if}
	{#if message}
		<p class="empty-state-message">{message}</p>
	{/if}
</div>

<style>
	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-sm);
		height: 300px;
		background: var(--color-card-bg);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		color: var(--color-on-surface);
		opacity: 0.6;
		font-size: var(--font-size-md);
	}

	.empty-state-icon {
		font-size: 2rem;
	}

	.empty-state-message {
		margin: 0;
	}
</style>
