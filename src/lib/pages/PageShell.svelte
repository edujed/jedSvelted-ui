<script lang="ts">
	import SearchPanel from '$lib/container/SearchPanel.svelte';
	import type { Snippet } from 'svelte';
	import { PageState } from './PageState.svelte';

	let {
		title = '',
		onSearch,
		onClear,
		filter,
		content,
		detailContent
	}: {
		title?: string;
		onSearch?: () => void;
		onClear?: () => void;
		/** Called by child when it wants to open detail panel automatically (e.g., after loading a single row). */
		filter?: Snippet<[PageState]> | undefined;
		content?: Snippet<[PageState]> | undefined;
		detailContent?: Snippet<[PageState]> | undefined;
	} = $props();

	const instance = new PageState();

	// Derive reactive bindings so the template sees updates automatically.
	const showLoading = $derived(instance.loading);
	const showError = $derived(instance.error);
	const isLoading = $derived(showLoading && !showError);
	const hasError = $derived(!isLoading && !!instance.error);
	const renderDetail = $derived(instance.showDetail && !!detailContent);

	export function showDetail(row: Record<string, unknown>): void {
		instance.show(row);
	}

	export function closeDetail(): void {
		instance.close();
	}
</script>

<div class="page-shell">
	{#if filter}
		<SearchPanel {title} {onSearch} {onClear}>
			{@render filter(instance)}
		</SearchPanel>
	{/if}

	<main class="shell-content">
		<!-- Global loading state -->
		{#if isLoading}
			<div class="loading">Loading...</div>
		{:else if hasError}
			<div class="error">{instance.error}</div>
		{:else}
			<!-- Main content (table/list) -->
			{#if content}
				{@render content(instance)}
			{:else if !filter && !content}
				<p class="empty-state">Nothing to display.</p>
			{/if}

			<!-- Side panel for details when selected -->
			{#if detailContent && renderDetail}
				{@render detailContent(instance)}
			{/if}
		{/if}
	</main>
</div>

<style>
	.page-shell {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.shell-content {
		flex: 1;
		overflow-y: auto;
		padding-top: 1rem;
		width: 100%;
	}

	.loading,
	.error {
		text-align: center;
		padding: 2rem;
		margin-top: 1rem;
	}
	.loading {
		color: var(--color-on-surface);
		opacity: 0.6;
	}
	.error {
		color: var(--color-error);
	}

	.empty-state {
		text-align: center;
		padding: 2rem;
		color: var(--text-muted);
	}

	/* Responsive layout for detail side panel */
	@media (min-width: 1024px) {
		.shell-content {
			display: grid;
			grid-template-columns: 1fr;
			gap: 1rem;
		}
	}
</style>
