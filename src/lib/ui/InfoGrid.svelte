<script lang="ts">
	let {
		items
	}: {
		items: Array<{ label: string; value: string | number | undefined | null }>;
	} = $props();
</script>

<div class="info-grid">
	{#each items as item (item.label)}
		<div class="info-item">
			<span class="info-label">{item.label}</span>
			<span class="info-value">{item.value ?? '—'}</span>
		</div>
	{/each}
</div>

<style>
	.info-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: var(--spacing-md);
	}

	.info-item {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
	}

	.info-value {
		font-size: var(--font-size-sm);
		color: var(--color-on-surface);
		padding: var(--spacing-xs) var(--spacing-sm);
		background: var(--color-input-bg);
		border: 1px solid var(--color-input-border);
		border-radius: var(--radius-sm);
		min-height: 1.75rem;
		display: flex;
		align-items: center;
	}

	@media (max-width: 600px) {
		.info-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
