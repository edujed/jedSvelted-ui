<script lang="ts">
	import { Popover } from 'bits-ui';
	import type { Snippet } from 'svelte';
	import Icon from '../icons/Icon.svelte';
	import { filterData, sortData } from './tableTypes';
	import type { TableAction, TableCol } from './tableTypes';

	let {
		caption = '',
		data = [] as Record<string, unknown>[],
		id = '',
		columns = [] as TableCol[],
		actions = [] as TableAction[],
		rowKey = '',
		csvFileName = 'export.csv',
		onAdd = () => {},
		addLabel = 'Add',
		header,
		footer
	}: {
		caption?: string;
		data?: Record<string, unknown>[];
		id?: string;
		columns?: TableCol[];

		actions?: TableAction[];
		rowKey?: string;
		csvFileName?: string;
		onAdd?: () => void;
		addLabel?: string;
		header?: Snippet;
		footer?: Snippet;
	} = $props();

	// Reactive state created locally (runes only in .svelte)
	let sortColumnIndex = $state(-1);
	let sortDirection = $state<'asc' | 'desc' | 'none'>('none');
	let filterValues = $state<Record<number, string>>({});

	/** Filtered data (reactive) */
	let filteredData = $derived.by(() => filterData(data, columns, filterValues)) as Record<
		string,
		unknown
	>[];

	//** Sorted data (reactive) */
	let sortedData = $derived.by(() =>
		sortData(filteredData, columns, sortColumnIndex, sortDirection)
	) as Record<string, unknown>[];

	/** Handlers */
	function handleSort(colIndex: number): void {
		if (sortColumnIndex === colIndex) {
			if (sortDirection === 'none') sortDirection = 'asc';
			else if (sortDirection === 'asc') sortDirection = 'desc';
			else sortDirection = 'none';
		} else {
			sortColumnIndex = colIndex;
			sortDirection = 'asc';
		}
	}

	function handleFilter(colIndex: number, value: string): void {
		filterValues = { ...filterValues, [colIndex]: value };
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	function _clearFilters(): void {
		filterValues = {};
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	function _clearSort(): void {
		sortColumnIndex = -1;
		sortDirection = 'none';
	}

	/** Exports data as a CSV file. */
	function exportCSV(): void {
		if (columns.length === 0 || filteredData.length === 0) return;
		const exportCols = columns.filter((c) => c.exportable !== false);
		const headers = exportCols.map((c) => `"${c.title}"`).join(';');
		const rows = filteredData.map((row) =>
			exportCols
				.map((c) => {
					const val = row[c.key as string] ?? '';
					return `"${String(val).replace(/"/g, "'")}"`;
				})
				.join(';')
		);
		const csv = [headers, ...rows].join('\n');
		const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = csvFileName;
		link.click();
		URL.revokeObjectURL(url);
	}

	function handleAction(action: TableAction, row: Record<string, unknown>): void {
		action.onClick?.(row);
	}
</script>

<div class="table-wrapper">
	{#if caption || data.length > 0}
		<div class="table-caption">
			<span class="caption-title">{caption}</span>
			<span class="caption-actions">
				{#if data.length > 0}
					<button class="btn-export" onclick={exportCSV} title="Export CSV">
						<svg
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							width="16"
							height="16"
						>
							<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
							<polyline points="7 10 12 15 17 10" />
							<line x1="12" y1="15" x2="12" y2="3" />
						</svg>
						CSV
					</button>
				{/if}
				<button class="btn-add" onclick={onAdd} title="Add new record">
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						width="14"
						height="14"
					>
						<line x1="12" y1="5" x2="12" y2="19" />
						<line x1="5" y1="12" x2="19" y2="12" />
					</svg>
					{addLabel}
				</button>
				{@render header?.()}
			</span>
		</div>
	{/if}

	<table {id} class="data-table">
		{#if columns.length > 0}
			<thead>
				<tr>
					{#each columns as col, idx (col.key)}
						{#if col.title}
							<th class:col-right={col.align === 'right'} class:col-center={col.align === 'center'}>
								<span class="th-label">{col.title}</span>
								{#if col.sortable}
									<button class="th-sort" onclick={() => handleSort(idx)} title="Sort">
										<svg
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											width="14"
											height="14"
										>
											{#if sortColumnIndex === idx && sortDirection === 'asc'}
												<polyline points="18 15 12 9 6 15" />
											{:else if sortColumnIndex === idx && sortDirection === 'desc'}
												<polyline points="6 9 12 15 18 9" />
											{:else}
												<polyline points="6 9 12 15 18 9" />
												<polyline points="6 15 12 9 18 15" opacity="0.3" />
											{/if}
										</svg>
									</button>
								{/if}
							</th>
						{/if}
					{/each}
				</tr>
				<tr class="filter-row">
					{#each columns as col, idx (col.key)}
						{#if col.filterable !== false}
							<th>
								<input
									type="search"
									placeholder="Filter..."
									class="filter-input"
									oninput={(e) => handleFilter(idx, (e.target as HTMLInputElement).value)}
								/>
							</th>
						{:else}
							<th></th>
						{/if}
					{/each}
				</tr>
			</thead>

			{#if data.length > 0}
				<tbody>
					{#each sortedData as row, line (rowKey ? String(row[rowKey]) : String(line))}
						<tr data-row={rowKey ? row[rowKey as string] : line}>
							{#each columns as col, idx (col.key ?? idx)}
								{#if col.title}
									<td
										class:col-right={col.align === 'right'}
										class:col-center={col.align === 'center'}
									>
										{#if col.formatter}
											{col.formatter(row[col.key as string] ?? '', row, line + 1)}
										{:else}
											{row[col.key as string] ?? ''}
										{/if}
									</td>
								{/if}
							{/each}

							{#if actions.length > 0}
								<td class="col-actions-cell">
									<div class="actions-wrapper">
										<Popover.Root>
											<div class="actions-trigger">
												<Popover.Trigger type="button" title="Actions">
													<Icon name="more" size={18} />
												</Popover.Trigger>
											</div>
											<Popover.Content
												class="actions-popover"
												side="right"
												align="start"
												sideOffset={4}
											>
												{#each actions as action (action.title)}
													<button
														class="action-item"
														onclick={() => handleAction(action, row)}
														title={action.hint}
													>
														{#if action.icon}
															<Icon name={action.icon} size={16} />
														{/if}
														<span class="action-text">{action.title}</span>
													</button>
												{/each}
											</Popover.Content>
										</Popover.Root>
									</div>
								</td>
							{/if}
						</tr>
					{/each}
				</tbody>
			{/if}
		{/if}

		<tfoot>
			<tr>
				<td class="tfoot-cell" colspan={columns.length}>
					<span class="">{data.length} row(s)</span>
					{@render footer?.()}
				</td>
			</tr>
		</tfoot>
	</table>
</div>

<style>
	.table-wrapper {
		width: 100%;
		overflow-x: auto;
		background: var(--color-card-bg);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		box-shadow: var(--color-card-shadow);
	}

	.data-table {
		width: 100%;
		border-collapse: collapse;
		font-size: var(--font-size-sm);
	}

	thead {
		background: var(--color-background);
	}

	.th-label {
		display: inline;
	}

	.th-sort:hover {
		opacity: 1;
	}

	.filter-input:focus {
		border-color: var(--color-input-focus);
	}

	tbody tr {
		transition: background var(--transition-fast);
	}

	tbody tr:hover {
		background: var(--color-sidenav-hover);
	}

	tbody tr:nth-child(even) {
		background: var(--color-background);
	}

	tbody tr:nth-child(even):hover {
		background: var(--color-sidenav-hover);
	}

	.col-right {
		text-align: right;
	}

	.col-center {
		text-align: center;
	}

	.actions-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.actions-trigger {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		background: none;
		border: none;
		border-radius: var(--radius-sm);
		color: var(--color-on-surface);
		opacity: 0.4;
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.actions-trigger:hover {
		opacity: 1;
		background: var(--color-primary-light);
		color: var(--color-primary);
	}

	.tfoot-cell {
		justify-content: space-between;
		align-items: center;
	}

	@media (max-width: 600px) {
		thead th,
		tbody td {
			padding: var(--spacing-xs) var(--spacing-sm);
		}
	}
</style>
