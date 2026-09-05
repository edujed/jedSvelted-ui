<script lang="ts">
	import { Popover } from 'bits-ui';
	import type { Snippet } from 'svelte';
	import Icon from '../icons/Icon.svelte';
	import { IconSort } from '../icons';
	import Button from '../ui/Button.svelte';
	import { filterData, sortData } from './tableTypes';
	import type { TableAction, TableCol } from './tableTypes';
	import { LOCALES, localeStore } from '../i18n';

	let {
		caption = '',
		data = [] as Record<string, unknown>[],
		id = '',
		columns = [] as TableCol[],
		actions = [] as TableAction[],
		rowKey = '',
		csvFileName = 'export.csv',
		onAdd = () => {},
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
					<Button
						variant="secondary"
						size="sm"
						icon="download"
						onclick={exportCSV}
						title={LOCALES[$localeStore].exportCsv}>{LOCALES[$localeStore].csv}</Button
					>
				{/if}
				<Button
					variant="primary"
					size="sm"
					icon="plus"
					iconSize={14}
					onclick={onAdd}
					title={LOCALES[$localeStore].addNewRecord}>{LOCALES[$localeStore].add}</Button
				>
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
									<button
										class="th-sort"
										class:sort-active={sortColumnIndex === idx && sortDirection !== 'none'}
										onclick={() => handleSort(idx)}
										title={LOCALES[$localeStore].sort}
									>
										<IconSort size={14} />
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
									placeholder={LOCALES[$localeStore].filter}
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
												<Popover.Trigger type="button" title={LOCALES[$localeStore].actions}>
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
					<span class="">{LOCALES[$localeStore].rows.replace('{count}', String(data.length))}</span>
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

	.table-caption {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--spacing-md);
		background: var(--color-primary-light);
		border-bottom: 1px solid var(--color-border);
		font-weight: 600;
		font-size: var(--font-size-sm);
		color: var(--color-primary);
		transition: background var(--transition-fast);
	}

	.table-caption:hover {
		background: color-mix(in srgb, var(--color-primary-light) 85%, var(--color-primary) 15%);
	}

	.caption-actions {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
	}

	.filter-input {
		width: 100%;
		padding: var(--spacing-xs) var(--spacing-sm);
		background: var(--color-input-bg);
		border: 1px solid var(--color-input-border);
		border-radius: var(--radius-sm);
		color: var(--color-on-surface);
		font-size: var(--font-size-xs);
		font-family: inherit;
		outline: none;
		transition:
			border-color var(--transition-fast),
			box-shadow var(--transition-fast);
	}

	.filter-input:hover {
		border-color: var(--color-input-focus);
		box-shadow: 0 2px 4px var(--color-shadow);
	}

	.filter-input:focus {
		border-color: var(--color-input-focus);
	}

	:global(.actions-popover) {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		box-shadow: 0 4px 20px var(--color-shadow);
		padding: var(--spacing-xs);
		min-width: 160px;
		z-index: 100;
	}

	:global(.actions-popover .action-item) {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		width: 100%;
		padding: var(--spacing-sm) var(--spacing-md);
		background: none;
		border: none;
		border-radius: var(--radius-sm);
		color: var(--color-on-surface);
		font-size: var(--font-size-sm);
		font-family: inherit;
		cursor: pointer;
		text-align: left;
		transition: all var(--transition-fast);
	}

	:global(.actions-popover .action-item:hover) {
		background: var(--color-sidenav-hover);
		color: var(--color-primary);
	}

	:global(.actions-popover .action-icon) {
		flex-shrink: 0;
		color: var(--color-on-surface);
		opacity: 0.6;
		transition: all var(--transition-fast);
	}

	:global(.actions-popover .action-item:hover .action-icon) {
		opacity: 1;
		color: var(--color-primary);
	}

	:global(.actions-popover .action-text) {
		flex: 1;
	}

	thead {
		background: var(--color-background);
	}

	thead th {
		padding: var(--spacing-sm) var(--spacing-md);
		border-bottom: 2px solid var(--color-border);
		border-right: 1px solid var(--color-border);
		text-align: left;
		font-weight: 600;
		font-size: var(--font-size-xs);
		text-transform: uppercase;
		letter-spacing: 0.03em;
		color: var(--color-on-surface);
		opacity: 0.8;
		white-space: nowrap;
	}

	.th-label {
		display: inline;
	}

	.th-sort {
		display: inline-flex;
		align-items: center;
		margin-left: var(--spacing-xs);
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		color: var(--color-primary);
		opacity: 0.5;
		transition: opacity var(--transition-fast);
	}

	.th-sort:hover {
		opacity: 1;
	}

	.th-sort.sort-active {
		opacity: 1;
		color: var(--color-primary);
	}

	.filter-row th {
		padding: var(--spacing-xs) var(--spacing-sm);
		border-bottom: 1px solid var(--color-border);
		border-right: 1px solid var(--color-border);
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

	.col-actions-cell {
		width: 48px;
		min-width: 48px;
		padding: var(--spacing-sm);
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

	tfoot td {
		padding: var(--spacing-sm) var(--spacing-md);
		border-top: 2px solid var(--color-border);
		background: var(--color-background);
		font-size: var(--font-size-xs);
		color: var(--color-on-surface);
		opacity: 0.7;
	}

	.tfoot-cell {
		justify-content: space-between;
		align-items: center;
	}

	@media (max-width: 600px) {
		.data-table {
			font-size: var(--font-size-xs);
		}

		thead th,
		tbody td {
			padding: var(--spacing-xs) var(--spacing-sm);
		}
	}
</style>
