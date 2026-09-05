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

<div
	class="detail-overlay"
	class:hidden={!show}
	in:fade={{ duration: 150 }}
	out:fade={{ duration: 150 }}
>
	{#if show}
		<div
			class="detail-panel"
			in:fly={{ x: '100%', duration: 300 }}
			out:fly={{ x: '100%', duration: 300 }}
		>
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
	{/if}
</div>

<style>
	.detail-overlay {
		position: fixed;
		inset: 0;
		background: var(--color-overlay);
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
		box-shadow: -4px 0 16px var(--color-shadow);
		overflow: hidden;
	}

	.detail-header {
		display: flex;
		align-items: center;
		padding: var(--spacing-md);
		border-bottom: 1px solid var(--color-border);
		background: var(--color-primary-light);
		transition: background var(--transition-fast);
	}

	.detail-header:hover {
		background: color-mix(in srgb, var(--color-primary-light) 85%, var(--color-primary) 15%);
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
		color: var(--color-primary);
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
