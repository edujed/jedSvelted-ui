<script lang="ts">
	import type { SkeletonProps } from './uiTypes';

	let {
		variant = 'text',
		rows = 1,
		width,
		height,
		circular = false,
		animated = true,
		class: className = ''
	}: SkeletonProps = $props();

	const sizeStyle = $derived(
		circular
			? `width: ${height ?? 24}px; height: ${height ?? 24}px;`
			: `width: ${width ?? '100%'}; height: ${height ?? (variant === 'text' ? '1rem' : '2rem')};`
	);
</script>

{#if variant === 'list'}
	<div class="skeleton-list {className}">
		{#each Array.from({ length: rows }, (_, i) => i) as i (i)}
			<div class="skeleton-row">
				<div
					class="skeleton skeleton-circle {animated ? 'skeleton-animated' : ''}"
					style="width: 36px; height: 36px;"
				></div>
				<div class="skeleton-lines">
					<div
						class="skeleton skeleton-text {animated ? 'skeleton-animated' : ''}"
						style="width: 60%; height: 16px;"
					></div>
					<div
						class="skeleton skeleton-text {animated ? 'skeleton-animated' : ''}"
						style="width: 40%; height: 16px;"
					></div>
				</div>
			</div>
		{/each}
	</div>
{:else if variant === 'table'}
	<div class="skeleton-table {className}">
		<div class="skeleton-table-header">
			{#each Array.from({ length: 5 }, (_, i) => i) as i (i)}
				<div
					class="skeleton skeleton-text {animated ? 'skeleton-animated' : ''}"
					style="width: 100%; height: 20px;"
				></div>
			{/each}
		</div>
		{#each Array.from({ length: rows }, (_, i) => i) as i (i)}
			<div class="skeleton-table-row">
				{#each Array.from({ length: 5 }, (_, j) => j) as j (j)}
					<div
						class="skeleton skeleton-text {animated ? 'skeleton-animated' : ''}"
						style="width: {j === 0 ? '30%' : '80%'}; height: 24px;"
					></div>
				{/each}
			</div>
		{/each}
	</div>
{:else}
	<div
		class="skeleton skeleton-{variant} {circular ? 'skeleton-circle' : ''} {animated
			? 'skeleton-animated'
			: ''} {className}"
		style={sizeStyle}
	></div>
{/if}

<style>
	.skeleton {
		background: var(--color-skeleton-bg, var(--color-input-bg, #e2e8f0));
		border: 1px solid var(--color-border, #cbd5e1);
		border-radius: var(--radius-sm, 4px);
		min-height: 16px;
	}

	.skeleton-circle {
		border-radius: 50%;
	}

	.skeleton-animated {
		position: relative;
		overflow: hidden;
	}

	.skeleton-animated::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(
			90deg,
			transparent,
			color-mix(in srgb, var(--color-on-surface, #000) 15%, transparent),
			transparent
		);
		animation: skeleton-shimmer 1.5s ease-in-out infinite;
	}

	@keyframes skeleton-shimmer {
		0% {
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(100%);
		}
	}

	.skeleton-list {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
		width: 100%;
	}

	.skeleton-row {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
	}

	.skeleton-lines {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
	}

	.skeleton-table {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
	}

	.skeleton-table-header {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: var(--spacing-sm);
		padding-bottom: var(--spacing-sm);
		border-bottom: 1px solid var(--color-border);
	}

	.skeleton-table-row {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: var(--spacing-sm);
	}
</style>
