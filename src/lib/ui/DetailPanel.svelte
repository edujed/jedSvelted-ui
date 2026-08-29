<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import Icon from '../icons/Icon.svelte';
	import type { Snippet } from 'svelte';

	let {
		show = $bindable(false),
		title = '',
		onClose,
		headerActions,
		children
	}: {
		show?: boolean;
		title?: string;
		onClose?: () => void;
		headerActions?: Snippet;
		children?: Snippet;
	} = $props();
</script>

{#if show}
	<div class="detail-overlay" transition:fade={{ duration: 200 }}>
		<div class="detail-panel" transition:fly={{ x: '100%', duration: 300 }}>
			<header class="detail-header">
				<button class="btn-back" onclick={onClose} title="Close">
					<Icon name="chevron-right" size={20} />
				</button>
				<h2 class="detail-title">{title}</h2>
				{#if headerActions}
					<div class="header-actions">
						{@render headerActions?.()}
					</div>
				{/if}
			</header>

			<main class="detail-content">
				{@render children?.()}
			</main>
		</div>
	</div>
{/if}

<style>
	.detail-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.4);
		display: flex;
		align-items: stretch;
		justify-content: flex-end;
		z-index: 1000;
	}

	.detail-panel {
		width: 70%;
		min-width: 60%;
		max-width: 90%;
		height: 100%;
		background: var(--color-surface);
		border-left: 1px solid var(--color-border);
		display: flex;
		flex-direction: column;
		overflow: hidden;
		box-shadow: -4px 0 16px var(--color-shadow);
	}

	.detail-header {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		padding: var(--spacing-md);
		background: var(--color-navbar-bg);
		color: var(--color-navbar-text);
		border-bottom: 1px solid var(--color-border);
		flex-shrink: 0;
	}

	.btn-back {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		background: transparent;
		border: none;
		color: var(--color-navbar-text);
		cursor: pointer;
		border-radius: var(--radius-sm);
		transition: background var(--transition-fast);
	}

	.btn-back:hover {
		background: color-mix(in srgb, var(--color-navbar-text) 15%, transparent);
	}

	.detail-title {
		font-size: var(--font-size-md);
		font-weight: 600;
		margin: 0;
		flex: 1;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.header-actions {
		display: flex;
		gap: var(--spacing-xs);
	}

	.detail-content {
		flex: 1;
		overflow-y: auto;
		padding: var(--spacing-md);
	}
</style>
