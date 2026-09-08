<script lang="ts">
	import type { InfoGridProps } from './uiTypes';

	let { items }: InfoGridProps = $props();
</script>

<div class="info-grid">
	{#each items as item (item.label)}
		<div class="info-item">
			<span class="info-label">{item.label}</span>
			<span class="info-value" class:info-value-right={item.align === 'right'}
				>{item.value ?? '—'}</span
			>
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

	.info-value-right {
		justify-content: flex-end;
		font-variant-numeric: tabular-nums;
	}

	@media (max-width: 600px) {
		.info-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
