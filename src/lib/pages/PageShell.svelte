<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		title = '',
		autoOpenId,
		// Optional snippets — each section is independent
		filter,
		content,
		detailContent
	}: {
		title?: string;
		/** ID of record to open detail panel on mount — externally controlled. */
		autoOpenId?: number;
		/** Optional section for filters/search above table. */
		filter?: Snippet<[PageState]>;
		/** Main content (table/list). */
		content?: Snippet<[PageState]>;
		/** Optional side panel content when a detail item is selected. */
		detailContent?: Snippet<[PageState]>;
	} = $props();

	export interface PageState {
		showDetail: boolean;
		selectedItem: Record<string, unknown> | undefined;
		detailAction: 'detail' | 'edit' | 'delete';
		loading: boolean;
		setLoading: (value: boolean) => void;
		error: string;
		setError: (value: string) => void;
		handleDetail: (row: Record<string, unknown>) => void;
		handleEdit: (row: Record<string, unknown>) => void;
		handleDelete: (row: Record<string, unknown>) => void;
		closeDetail: () => void;
	}

	// Exposed reactive properties as public props.
	// The page can read directly: shell.showDetail, shell.selectedItem, etc.
	let showDetail = $state(false);
	let selectedItem = $state<Record<string, unknown> | undefined>(undefined);
	let detailAction = $state<'detail' | 'edit' | 'delete'>('detail');
	let loading = $state(false);
	let error = $state('');

	/** Opens the details panel for a table row. */
	function handleDetail(row: Record<string, unknown>): void {
		selectedItem = row;
		detailAction = 'detail';
		showDetail = true;
	}

	/** Prepares the item for editing in the side panel. */
	function handleEdit(row: Record<string, unknown>): void {
		selectedItem = row;
		detailAction = 'edit';
		showDetail = true;
	}

	/** Prepares the item for deletion confirmation. */
	function handleDelete(row: Record<string, unknown>): void {
		selectedItem = row;
		detailAction = 'delete';
		showDetail = true;
	}

	/** Closes the detail panel. */
	function closeDetail(): void {
		showDetail = false;
		selectedItem = undefined;
		detailAction = 'detail';
	}

	// Track IDs that have been processed to avoid re-triggering
	const handledAutoOpenIds = $state(new Set<number>());

	/** Automatically opens the detail panel when an ID is passed externally.
	 * Only runs once per ID — won't reopen after closing even if the ID remains on the prop.
	 */
	$effect(() => {
		if (autoOpenId !== undefined && autoOpenId > 0) {
			if (!handledAutoOpenIds.has(autoOpenId)) {
				console.log('[PageShell] Auto-opening detail for id:', autoOpenId);
				// The page must ensure selectedItem is populated before this runs.
				// This typically happens in the page's own $effect after receiving getById().
				if (selectedItem && Number(selectedItem.id) === autoOpenId) {
					handleDetail(selectedItem);
					handledAutoOpenIds.add(autoOpenId);
				}
			}
		}
	});

	// Object exposed as parameter for content snippets.
	const pageState: PageState = {
		get showDetail() {
			return showDetail;
		},
		get selectedItem() {
			return selectedItem;
		},
		get detailAction() {
			return detailAction;
		},
		get loading() {
			return loading;
		},
		setLoading(v: boolean) {
			loading = v;
		},
		get error() {
			return error;
		},
		setError(v: string) {
			error = v;
		},
		handleDetail,
		handleEdit,
		handleDelete,
		closeDetail
	};
</script>

<div class="page-shell">
	<header class="shell-header">
		<h1>{title}</h1>
		{#if showDetail}
			<button class="btn-close" onclick={closeDetail}>&times;</button>
		{/if}
	</header>

	<main class="shell-content">
		<!-- Global loading state -->
		{#if loading}
			<div class="loading">Loading...</div>
		{:else if error}
			<div class="error">{error}</div>
		{:else}
			<!-- Optional filter/search section -->
			{#if filter}
				{@render filter(pageState)}
			{/if}

			<!-- Main content (table/list) -->
			{#if content}
				{@render content(pageState)}
			{:else if !filter && !content}
				<p class="empty-state">Nothing to display.</p>
			{/if}

			<!-- Side panel for details when selected -->
			{#if showDetail && selectedItem}
				<aside class="detail-panel">
					{#if detailContent}
						{@render detailContent(pageState)}
					{:else}
						<p class="empty-state">No detail content configured.</p>
					{/if}
				</aside>
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

	.shell-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 1.5rem;
		border-bottom: 1px solid var(--border);
		background-color: var(--bg-surface);
	}

	.btn-close {
		background: none;
		border: none;
		font-size: 1.5rem;
		cursor: pointer;
		color: var(--text-main);
		opacity: 0.7;
		transition: opacity 0.2s ease;
	}
	.btn-close:hover {
		opacity: 1;
	}

	.shell-content {
		flex: 1;
		overflow-y: auto;
		padding: 1rem;
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
			grid-template-columns: minmax(300px, 1fr) minmax(400px, 1fr);
			gap: 1rem;
		}

		.detail-panel {
			position: sticky;
			top: 0;
			max-height: calc(100vh - 80px);
			overflow-y: auto;
			border-left: 1px solid var(--border);
			padding-left: 1rem;
		}
	}
</style>
