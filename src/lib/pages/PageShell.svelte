<script lang="ts">
	import SearchPanel from '$lib/container/SearchPanel.svelte';
	import Skeleton from '$lib/ui/Skeleton.svelte';
	import { PageState } from './PageState';
	import { LOCALES, localeStore } from '../i18n';
	import type { PageShellProps } from './pagesTypes';

	let {
		title = '',
		onSearch,
		onClear,
		filter,
		content,
		detailContent,
		filterOpen = $bindable(true),
		skeletonVariant = 'table',
		skeletonRows = 5
	}: PageShellProps = $props();

	const instance = new PageState();

	// Reactive state that mirrors PageState via subscription
	let _loading = $state(false);
	let _error = $state('');
	let _showDetail = $state(false);
	let _detailKey = $state(0);

	$effect(() => {
		const unsubscribe = instance.subscribe(() => {
			_loading = instance.loading;
			_error = instance.error;
			_showDetail = instance.showDetail;
			_detailKey = instance.detailKey;
		});
		// Initial sync
		_loading = instance.loading;
		_error = instance.error;
		_showDetail = instance.showDetail;
		_detailKey = instance.detailKey;
		return unsubscribe;
	});

	const isLoading = $derived(_loading && !_error);
	const hasError = $derived(!isLoading && !!_error);
	const renderDetail = $derived(_showDetail && !!detailContent);

	export function showDetail(row: Record<string, unknown>): void {
		instance.show(row);
	}

	export function closeDetail(): void {
		instance.close();
	}

	/**
	 * Sets loading to true, then back to false after `ms` milliseconds.
	 * Useful for demoing the loading state with synchronous/mock data.
	 */
	export function setLoadingFor(ms: number): void {
		instance.setLoadingFor(ms);
	}
</script>

<div class="page-shell">
	{#if filter}
		<SearchPanel {title} {onSearch} {onClear} bind:isOpen={filterOpen}>
			{@render filter(instance)}
		</SearchPanel>
	{/if}

	<main class="shell-content">
		<!-- Global loading state -->
		{#if isLoading}
			<div class="loading">
				<Skeleton variant={skeletonVariant} rows={skeletonRows} />
			</div>
		{:else if hasError}
			<div class="error">{_error}</div>
		{:else}
			<!-- Main content (table/list) -->
			{#if content}
				{@render content(instance)}
			{:else if !filter && !content}
				<p class="empty-state">{LOCALES[$localeStore].empty}</p>
			{/if}

			<!-- Side panel for details when selected — keyed by detailKey so the content
				remounts fresh on every show/edit/delete (e.g.: deep-link /users/3 → /users/5). -->
			{#if renderDetail && detailContent}
				{#key _detailKey}
					{@render detailContent(instance)}
				{/key}
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
