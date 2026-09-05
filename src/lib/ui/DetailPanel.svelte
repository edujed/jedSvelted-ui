<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import Button from './Button.svelte';
	import type { Snippet } from 'svelte';
	import { LOCALES, localeStore } from '../i18n';

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
				<Button
					variant="ghost"
					icon="chevron-right"
					iconSize={20}
					onclick={onClose}
					title={LOCALES[$localeStore].close}
				/>
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
		background: rgba(0, 0, 0, 0.5);
		z-index: 1000;
		display: flex;
		justify-content: flex-end;
	}

	.detail-panel {
		width: 100%;
		max-width: 75%;
		min-width: 40%;
		background: var(--color-surface);
		display: flex;
		flex-direction: column;
	}

	.detail-header {
		display: flex;
		align-items: center;
		padding: var(--spacing-md);
		border-bottom: 1px solid var(--color-border);
		background: var(--color-card-bg);
	}
	:global(.btn-back) {
		background: transparent;
		border: none;
		color: var(--color-on-surface);
		cursor: pointer;
		padding: var(--spacing-sm);
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: var(--radius-sm);
		transition: background var(--transition-fast);
	}

	:global(.btn-back:hover) {
		background: var(--color-sidenav-hover);
	}

	.detail-title {
		margin: 0;
		margin-left: var(--spacing-md);
		font-size: var(--font-size-lg);
		font-weight: 600;
		color: var(--color-on-surface);
		flex: 1;
	}

	.header-actions {
		display: flex;
		gap: var(--spacing-sm);
		margin-left: auto;
	}

	.detail-content {
		flex: 1;
		overflow-y: auto;
		padding: 0;
	}

	@media (min-width: 1024px) {
		.detail-panel {
			max-width: 600px;
		}
	}

	@media (max-width: 600px) {
		.detail-panel {
			max-width: 100%;
		}
	}
</style>
