/**
 * Pure utilities for table sorting and filtering.
 *
 * NOTE: This file does NOT use runes — it contains pure logic only.
 * Reactive state must be created in the calling .svelte component.
 */

export interface TableCol<T = unknown> {
	key: keyof T | number;
	title: string;
	align?: 'left' | 'right' | 'center';
	sortable?: boolean;
	filterable?: boolean;
	exportable?: boolean;
	formatter?: (value: unknown, row: T, index: number) => string;
}

export interface UseTableStateOptions<T> {
	/** Chave única da linha para keyed each */
	rowKey?: keyof T;
	/** Custom filter function (optional). */
	filterFn?: (row: T, filterValues: Record<number, string>, columns: TableCol<T>[]) => boolean;
	/** Função customizada de ordenação */
	sortFn?: (a: T, b: T, column: TableCol<T>, direction: 'asc' | 'desc' | 'none') => number;
}

/**
 * Filters data based on per-column filter values.
 */

export function filterData<T>(
	data: T[],
	columns: TableCol<T>[],
	filterValues: Record<number, string>,
	filterFn?: (row: T, filterValues: Record<number, string>, columns: TableCol<T>[]) => boolean
): T[] {
	if (columns.length === 0) return [];

	if (filterValues && Object.keys(filterValues).length > 0) {
		return data.filter((row) => {
			// Custom filterFn sempre executado primeiro — permite filtrar sem depender de colunas individuais.
			if (filterFn !== undefined) {
				if (filterFn(row, filterValues, columns) === false) return false;
			} else if (columns.length > 0) {
				// Se não há filtro personalizado, aplica o texto por coluna.
				let hasAnyFilter = false;
				for (const idx in filterValues) {
					const col = columns[Number(idx)];
					if (!col || !col.filterable) continue;

					const filterText = filterValues[idx]?.toLowerCase();
					if (!filterText) continue;
					hasAnyFilter = true;

					// Filtro padrão: busca case-insensitive no valor da coluna
					const value = String(
						col.key != null ? ((row as Record<string, unknown>)?.[String(col.key)] ?? '') : ''
					).toLowerCase();
					if (!value.includes(filterText)) {
						return false;
					}
				}
				// Se nenhuma coluna tinha filtro ativo E não existe filtro global → mantém a fila.
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
export function sortData<T>(
	data: T[],
	columns: TableCol<T>[],
	sortColumnIndex: number,
	sortDirection: 'asc' | 'desc' | 'none',
	sortFn?: (a: T, b: T, column: TableCol<T>, direction: 'asc' | 'desc' | 'none') => number
): T[] {
	if (sortColumnIndex < 0 || sortDirection === 'none') return data;

	const col = columns[sortColumnIndex];
	if (!col || !col.sortable) return data;

	const direction = sortDirection === 'asc' ? 1 : -1;

	return [...data].sort((a, b) => {
		// Usa função customizada se fornecida
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

		// Usa 'en-US' para comportamento consistente entre ambientes (PT-BR ordena diferente).
		// Força comparação numérica quando ambos são números strings que parecem numéricos.
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
