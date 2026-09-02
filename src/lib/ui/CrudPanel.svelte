<script lang="ts">
	import type { Snippet } from 'svelte';
	import Table from '../table/Table.svelte';
	import DetailPanel from './DetailPanel.svelte';
	import type { TableCol, TableAction } from '../table';

	let {
		title = '',
		addLabel,
		csvFileName,
		onClose,
		inline = false,
		columns,
		data,
		onAdd,
		onEdit,
		onDelete,
		onView,
		onSave: childOnSave,
		onCancel: childOnCancel,
		renderForm,
		renderView
	}: {
		title?: string;
		addLabel: string;
		csvFileName: string;
		onClose?: () => void;
		inline?: boolean;
		columns: TableCol[];
		data: Record<string, unknown>[];
		onAdd?: () => void;
		onEdit?: (...args: unknown[]) => void;
		onDelete?: (...args: unknown[]) => void;
		onView?: (...args: unknown[]) => void;
		onSave?: () => void;
		onCancel?: () => void;
		renderForm: (props: {
			showForm: boolean;
			editId: number | null;
			onSave: () => void;
			onCancel: () => void;
		}) => Snippet;
		renderView?: (row: Record<string, unknown>) => Snippet;
	} = $props();

	let showForm = $state(false);
	let editId: number | null = $state(null);
	let viewRowData: Record<string, unknown> | null = $state(null);
	let deleteRowData: Record<string, unknown> | null = $state(null);

	function handleAdd(): void {
		showForm = true;
		editId = null;
		viewRowData = null;
		deleteRowData = null;
		onAdd?.();
	}

	function handleEdit(row: Record<string, unknown>): void {
		showForm = true;
		if ('id' in row) {
			editId = Number((row as { id?: unknown }).id ?? 0);
		} else {
			editId = Date.now();
		}
		viewRowData = null;
		deleteRowData = null;
		onEdit?.(row);
	}

	function handleDelete(row: Record<string, unknown>): void {
		deleteRowData = row;
		viewRowData = null;
		showForm = false;
		onDelete?.(row);
	}

	function confirmDelete(): void {
		if (deleteRowData) {
			onDelete?.(deleteRowData);
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
		onView?.(row);
	}

	function onSave(): void {
		// No-op: child component handles its own save logic
	}

	function onCancel(): void {
		showForm = false;
		editId = null;
	}

	const _onSave = () => childOnSave?.() ?? onSave();
	const _onCancel = () => {
		childOnCancel?.();
		showForm = false;
		editId = null;
	};

	const actions: TableAction[] = [
		{ title: 'View', hint: 'View details', icon: 'eye' as const, onClick: handleView },
		{ title: 'Edit', hint: 'Edit', icon: 'edit' as const, onClick: handleEdit },
		{ title: 'Delete', hint: 'Delete', icon: 'trash' as const, onClick: handleDelete }
	];
</script>

{#if inline}
	<div class="crud-panel inline-mode">
		<header class="crud-header">
			<h2 class="crud-title">{title}</h2>
		</header>
		<main class="crud-content">
			<Table
				id={`table-${title.toLowerCase().replace(/\s+/g, '-')}`}
				caption={title}
				{data}
				{columns}
				actions={actions}
				rowKey="id"
				{csvFileName}
				{addLabel}
				onAdd={handleAdd}
			/>
		</main>
	</div>

	{#if viewRowData && renderView}
		<DetailPanel
			show={true}
			title={`View ${title}`}
			onClose={() => {
				viewRowData = null;
			}}
		>
			{renderView(viewRowData)}
		</DetailPanel>
	{/if}

	{#if deleteRowData}
		<DetailPanel show={true} title={`Delete ${title}`} onClose={cancelDelete}>
			<div class="delete-confirm">
				<div class="delete-icon">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						width="48"
						height="48"
					>
						<polyline points="3 6 5 6 21 6" />
						<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
						<line x1="10" y1="11" x2="10" y2="17" />
						<line x1="14" y1="11" x2="14" y2="17" />
					</svg>
				</div>
				<div class="delete-content">
					<h3 class="delete-title">Confirm Deletion</h3>
					<p class="delete-message">Are you sure you want to delete this record?</p>
					<p class="delete-warning">This action cannot be undone.</p>
				</div>
				<div class="delete-actions">
					<button class="btn btn-danger" onclick={confirmDelete}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							width="16"
							height="16"
						>
							<polyline points="3 6 5 6 21 6" />
							<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
							<line x1="10" y1="11" x2="10" y2="17" />
							<line x1="14" y1="11" x2="14" y2="17" />
						</svg>
						Delete
					</button>
					<button class="btn btn-secondary" onclick={cancelDelete}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							width="16"
							height="16"
						>
							<line x1="18" y1="6" x2="6" y2="18" />
							<line x1="6" y1="6" x2="18" y2="18" />
						</svg>
						Cancel
					</button>
				</div>
			</div>
		</DetailPanel>
	{/if}

	{#if showForm && renderForm}
		<!-- eslint-disable-next-line no-constant-binary-expression -->
		<DetailPanel show={true} title={editId ? `Edit ${title}` : `New ${title}`} onClose={_onCancel}>
			{renderForm({ showForm, editId: Number(editId) || 0, onSave: _onSave, onCancel: _onCancel })}
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
				actions={actions}
				rowKey="id"
				{csvFileName}
				{addLabel}
				onAdd={handleAdd}
			/>
			<!-- eslint-disable-next-line no-constant-binary-expression -->
			{renderForm({ showForm, editId: Number(editId) ?? 0, onSave: _onSave, onCancel: _onCancel })}
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

	.delete-confirm {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-lg);
		padding: var(--spacing-lg);
		text-align: center;
	}

	.delete-icon {
		color: var(--color-error);
		opacity: 0.8;
	}

	.delete-title {
		font-size: var(--font-size-lg);
		font-weight: 600;
		margin: 0;
		color: var(--color-error);
	}

	.delete-message {
		font-size: var(--font-size-md);
		margin: var(--spacing-sm) 0;
		color: var(--color-on-surface);
	}

	.delete-warning {
		font-size: var(--font-size-sm);
		color: var(--color-error);
		opacity: 0.8;
		margin: 0;
	}

	.delete-actions {
		display: flex;
		gap: var(--spacing-md);
		margin-top: var(--spacing-md);
	}

	.btn-danger {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: var(--spacing-sm) var(--spacing-md);
		border: 1px solid var(--color-error);
		border-radius: var(--radius-sm);
		background: var(--color-error);
		color: white;
		font-size: var(--font-size-md);
		font-weight: 600;
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.btn-danger:hover {
		background: color-mix(in srgb, var(--color-error) 80%, transparent);
		border-color: var(--color-error);
	}
</style>
