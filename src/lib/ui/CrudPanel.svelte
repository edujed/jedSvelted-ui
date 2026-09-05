<script lang="ts">
	import type { Snippet } from 'svelte';
	import Table from '../table/Table.svelte';
	import DetailPanel from './DetailPanel.svelte';
	import DeleteConfirm from './DeleteConfirm.svelte';
	import type { TableCol, TableAction } from '../table';
	import type { ActionEvent } from '../handleDetailAction';
	import { LOCALES, localeStore } from '../i18n';

	let {
		title = '',
		csvFileName,
		onClose,
		inline = false,
		columns,
		data,
		onAction,
		renderForm,
		renderView,
		children
	}: {
		title?: string;
		csvFileName: string;
		onClose?: () => void;
		inline?: boolean;
		columns: TableCol[];
		data: Record<string, unknown>[];
		/**
		 * Single event contract: (action, item). Fired only on confirmed
		 * mutations — 'create'/'update' when the form is saved, 'delete'
		 * when the user confirms the deletion. Opening a panel does NOT
		 * fire an event.
		 */
		onAction?: (action: ActionEvent, item: Record<string, unknown>) => void;
		/** Form snippet. Receives a callback to close the panel after save/cancel. */
		renderForm: Snippet<[onComplete: () => void]>;
		renderView?: Snippet<[row: Record<string, unknown>]>;
		/** Default slot — used to pass the renderForm snippet. */
		children?: Snippet;
	} = $props();

	// Panel visibility state
	let showForm = $state(false);
	let editId: number | null = $state(null);
	let viewRowData = $state<Record<string, unknown> | null>(null);
	let deleteRowData = $state<Record<string, unknown> | null>(null);

	function handleAdd(): void {
		showForm = true;
		editId = null;
		viewRowData = null;
		deleteRowData = null;
	}

	function handleEdit(row: Record<string, unknown>): void {
		showForm = true;
		editId = row.id != null ? Number(row.id) : null;
		viewRowData = null;
		deleteRowData = null;
	}

	function handleDelete(row: Record<string, unknown>): void {
		deleteRowData = row;
		viewRowData = null;
		showForm = false;
	}

	function confirmDelete(): void {
		if (deleteRowData) {
			onAction?.('delete', deleteRowData);
		}
		deleteRowData = null;
	}

	function cancelDelete(): void {
		deleteRowData = null;
	}

	function handleView(row: Record<string, unknown>): void {
		viewRowData = row;
		showForm = false;
		deleteRowData = null;
	}

	function _onCancel(): void {
		showForm = false;
		editId = null;
	}

	/** Called by the form (via FormActions) to close the panel after save/cancel. */
	function _onFormComplete(): void {
		showForm = false;
		editId = null;
	}

	const actions = $derived<TableAction[]>([
		{
			title: LOCALES[$localeStore].view,
			hint: LOCALES[$localeStore].viewDetails,
			icon: 'eye' as const,
			onClick: handleView
		},
		{
			title: LOCALES[$localeStore].edit,
			hint: LOCALES[$localeStore].edit,
			icon: 'edit' as const,
			onClick: handleEdit
		},
		{
			title: LOCALES[$localeStore].delete,
			hint: LOCALES[$localeStore].delete,
			icon: 'trash' as const,
			onClick: handleDelete
		}
	]);

	const viewTitle = $derived(LOCALES[$localeStore].viewTitle.replace('{entity}', title));
	const deleteTitle = $derived(LOCALES[$localeStore].deleteTitle.replace('{entity}', title));
	const formTitle = $derived(
		editId
			? LOCALES[$localeStore].editTitle.replace('{entity}', title)
			: LOCALES[$localeStore].newTitle.replace('{entity}', title)
	);
</script>

{#if inline}
	<div class="crud-panel inline-mode">
		<header class="crud-header">
			<h2 class="crud-title">{title}</h2>
		</header>
		<main class="crud-content">
			<Table
				id={csvFileName.replace('.csv', '')}
				caption={title}
				{data}
				{columns}
				{actions}
				rowKey="id"
				{csvFileName}
				onAdd={handleAdd}
			/>
		</main>
	</div>

	{#if viewRowData && renderView}
		<DetailPanel
			show={true}
			title={viewTitle}
			onClose={() => {
				viewRowData = null;
			}}
		>
			{@render renderView(viewRowData)}
		</DetailPanel>
	{/if}

	{#if deleteRowData}
		<DetailPanel show={true} title={deleteTitle} onClose={cancelDelete}>
			<DeleteConfirm onConfirm={confirmDelete} onCancel={cancelDelete}>
				{#if renderView}
					{@render renderView(deleteRowData)}
				{/if}
			</DeleteConfirm>
		</DetailPanel>
	{/if}

	{#if showForm && renderForm}
		<DetailPanel show={true} title={formTitle} onClose={_onCancel}>
			{@render renderForm(_onFormComplete)}
		</DetailPanel>
	{/if}
{:else}
	<DetailPanel show={true} {title} {onClose}>
		<main class="crud-content">
			<Table
				id={`table-${title.toLowerCase().replace(/\s+/g, '-')}`}
				caption={title}
				{data}
				{columns}
				{actions}
				rowKey="id"
				{csvFileName}
				onAdd={handleAdd}
			/>
			{@render renderForm(_onFormComplete)}
		</main>
	</DetailPanel>
{/if}

<style>
	:global(.view-fields) {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}

	:global(.view-row) {
		display: flex;
		align-items: baseline;
		gap: var(--spacing-sm);
		padding: var(--spacing-xs) 0;
		border-bottom: 1px solid var(--color-border);
	}

	:global(.view-label) {
		font-weight: 600;
		min-width: 140px;
		color: var(--color-on-surface);
	}

	:global(.view-value) {
		color: var(--color-on-surface);
		opacity: 0.85;
		flex: 1;
	}

	.crud-panel.inline-mode {
		width: 100%;
		max-width: none;
		min-width: 0;
		height: auto;
		box-shadow: none;
		background: transparent;
	}

	.inline-mode .crud-header {
		padding: var(--spacing-md) var(--spacing-md);
		background: transparent;
		border-bottom: none;
	}

	.inline-mode .crud-content {
		padding: 0;
	}

	.crud-header {
		display: flex;
		align-items: center;
		padding: var(--spacing-md);
		border-bottom: 1px solid var(--color-border);
		background: var(--color-card-bg);
	}

	.crud-title {
		margin: 0;
		margin-left: var(--spacing-md);
		font-size: var(--font-size-lg);
		font-weight: 600;
		color: var(--color-on-surface);
	}

	.crud-content {
		flex: 1;
		overflow-y: auto;
		padding: 0;
	}
</style>
