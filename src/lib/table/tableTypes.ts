import type { IconName } from '../icons';

/** Sort direction for table columns. */
export type SortDirection = 'asc' | 'desc' | 'none';

/** Type definition for a table action button. */
export interface TableAction<T extends Record<string, unknown> = Record<string, unknown>> {
	title: string;
	hint?: string;
	icon?: IconName;
	onClick?: (row: T) => void;
}

/** Re-export alias for direct import convenience. */
export type TableCol<T extends Record<string, unknown> = Record<string, unknown>> = TableColBase<T>;

export interface TableColBase<T = unknown> {
	key: keyof T | number;
	title: string;
	align?: 'left' | 'right' | 'center';
	sortable?: boolean;
	filterable?: boolean;
	exportable?: boolean;
	formatter?: (value: unknown, row: T, index: number) => string;
	width?: string;
}

/**
 * Behavior mode for table features.
 * - `'native'`: the table handles it internally (JS).
 * - `'wasm'`: the consumer delegates via callbacks (e.g. WASM bridge).
 */
export type TableMode = 'native' | 'wasm';

/**
 * Configuration for table behavior (export, sort, filter, pagination).
 * Each feature can be switched between native JS and delegated (wasm) mode.
 * Defaults preserve the current native behavior.
 */
export interface TableConfig {
	/** Export mode. `'native'` = CSV via JS (default). `'wasm'` = delegates to `onExport`. */
	exportMode?: TableMode;
	/** Called when export is delegated (exportMode === 'wasm'). */
	onExport?: (format: 'csv' | 'xlsx' | 'pdf') => void;

	/** Sort mode. `'native'` = internal sort (default). `'wasm'` = delegates to `onSortChange`. */
	sortMode?: TableMode;
	/** Called when sort is delegated (sortMode === 'wasm'). */
	onSortChange?: (column: string, direction: 'asc' | 'desc') => void;

	/** Filter mode. `'native'` = internal filter (default). `'wasm'` = delegates to `onFilterChange`. */
	filterMode?: TableMode;
	/** Called when filter is delegated (filterMode === 'wasm'). */
	onFilterChange?: (column: string, value: string) => void;

	/** Pagination. `'native'` = shows footer with page controls. `'off'` = no pagination (default). */
	pagination?: 'native' | 'off';
	/** Current page (1-based). Required when pagination === 'native'. */
	page?: number;
	/** Page size. Required when pagination === 'native'. */
	pageSize?: number;
	/** Total records (after filters). Required when pagination === 'native'. */
	total?: number;
	/** Called when page changes. Required when pagination === 'native'. */
	onPageChange?: (page: number) => void;
}
