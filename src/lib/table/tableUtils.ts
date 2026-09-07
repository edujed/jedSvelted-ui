/**
 * Pure utilities for table sorting, filtering, and CSV export.
 *
 * NOTE: This file does NOT use runes — it contains pure logic only.
 * Reactive state must be created in the calling .svelte component.
 */
import type { SortDirection, TableCol } from './tableTypes';

/**
 * Filters data based on per-column filter values.
 */
export function filterData(
	data: Record<string, unknown>[],
	columns: TableCol<Record<string, unknown>>[],
	filterValues: Record<number, string>,
	filterFn?: (
		row: Record<string, unknown>,
		filterValues: Record<number, string>,
		columns: TableCol<Record<string, unknown>>[]
	) => boolean
): unknown[] {
	if (columns.length === 0) return [];

	if (filterValues && Object.keys(filterValues).length > 0) {
		return data.filter((row) => {
			// Custom filterFn always runs first — allows filtering without relying on individual columns.
			if (filterFn !== undefined) {
				if (filterFn(row, filterValues, columns) === false) return false;
			} else if (columns.length > 0) {
				// If there is no custom filter, applies per-column text.
				let hasAnyFilter = false;
				for (const idx in filterValues) {
					const col = columns[Number(idx)];
					if (!col || !col.filterable) continue;

					const filterText = filterValues[idx]?.toLowerCase();
					if (!filterText) continue;
					hasAnyFilter = true;

					// Default filter: case-insensitive search on the column value
					const value = String(
						col.key != null ? ((row as Record<string, unknown>)?.[String(col.key)] ?? '') : ''
					).toLowerCase();
					if (!value.includes(filterText)) {
						return false;
					}
				}
				// If no column had an active filter AND there is no global filter → keeps the list.
				if (!hasAnyFilter && filterFn === undefined) return true;
			}
			return true;
		});
	}

	return data;
}

/**
 * Sorts data based on the specified column and sort direction.
 */
export function sortData(
	data: Record<string, unknown>[],
	columns: TableCol<Record<string, unknown>>[],
	sortColumnIndex: number,
	sortDirection: SortDirection,
	sortFn?: (
		a: Record<string, unknown>,
		b: Record<string, unknown>,
		column: TableCol<Record<string, unknown>>,
		direction: SortDirection
	) => number
): unknown[] {
	if (sortColumnIndex < 0 || sortDirection === 'none') return data;

	const col = columns[sortColumnIndex];
	if (!col || !col.sortable) return data;

	const direction = sortDirection === 'asc' ? 1 : -1;

	return [...data].sort((a, b) => {
		// Uses the custom function if provided
		if (sortFn) {
			return sortFn(a, b, col, sortDirection);
		}

		const aVal =
			typeof col.key === 'number'
				? (a as Record<number | string, unknown>)[col.key]
				: (a as Record<string, unknown>)?.[String(col.key)];
		const bVal =
			typeof col.key === 'number'
				? (b as Record<number | string, unknown>)[col.key]
				: (b as Record<string, unknown>)?.[String(col.key)];

		if (aVal == null && bVal == null) return 0;
		if (aVal == null) return -1 * direction;
		if (bVal == null) return 1 * direction;

		if (typeof aVal === 'number' && typeof bVal === 'number') {
			return (aVal - bVal) * direction;
		}

		// Uses 'en-US' for consistent behavior across environments (PT-BR sorts differently).
		// Forces numeric comparison when both are numeric-looking strings.
		const strA = String(aVal);
		const strB = String(bVal);
		const numA = parseFloat(strA);
		const numB = parseFloat(strB);
		if (!isNaN(numA) && !isNaN(numB) && strA !== '') {
			return (numA - numB) * direction;
		}
		return strA.localeCompare(strB, 'en-US') * direction;
	});
}

/**
 * Builds a CSV string from the exportable columns and rows.
 * Columns with `exportable === false` are skipped.
 */
export function buildCsv(
	columns: TableCol<Record<string, unknown>>[],
	rows: Record<string, unknown>[]
): string {
	const exportCols = columns.filter((c) => c.exportable !== false);
	const headers = exportCols.map((c) => `"${c.title}"`).join(';');
	const body = rows
		.map((row) =>
			exportCols
				.map((c) => {
					const val = row[c.key as string] ?? '';
					return `"${String(val).replace(/"/g, "'")}"`;
				})
				.join(';')
		)
		.join('\n');
	return [headers, body].join('\n');
}
