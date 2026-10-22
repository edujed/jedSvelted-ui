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
 * - `'internal'`: the table handles it internally (JS).
 * - `'custom'`: the consumer takes over via callbacks (`onExport` / `onSortChange` / `onFilterChange`).
 */
export type TableMode = 'internal' | 'custom';

/** File formats available for delegated export (`exportMode: 'custom'`). */
export type ExportFormat = 'csv' | 'xlsx' | 'pdf' | 'parquet' | 'feather' | 'dbf';

/**
 * Compression method for export payloads that are not natively compressed.
 * `'none'` = no compression (plain file).
 */
export type ExportCompression = 'none' | 'lz4' | 'zstd' | 'gzip';

/**
 * Configuration for table behavior (export, sort, filter, pagination).
 * Each feature can be switched between internal JS and custom (consumer-driven) mode.
 * Defaults preserve the current internal behavior.
 */
export interface TableConfig {
	/**
	 * Export mode.
	 * - `'internal'` (default): CSV via JS.
	 * - `'custom'`: delegates to `onExport` (formats from `exportFormats`, default `['csv', 'xlsx', 'pdf']`).
	 */
	exportMode?: TableMode;
	/**
	 * Formats offered by the export UI when `exportMode` is `'custom'`.
	 * One format → single button; more than one → "Export" popover.
	 * Default: `['csv', 'xlsx', 'pdf']`.
	 */
	exportFormats?: ExportFormat[];
	/**
	 * Called when export is delegated (exportMode === 'custom').
	 * `compression` is only provided for formats that are not natively
	 * compressed (csv, dbf, feather); it is `undefined` for parquet/xlsx/pdf.
	 */
	onExport?: (format: ExportFormat, compression?: ExportCompression) => void;

	/** Sort mode. `'internal'` = internal sort (default). `'custom'` = delegates to `onSortChange`. */
	sortMode?: TableMode;
	/** Called when sort is delegated (sortMode === 'custom'). */
	onSortChange?: (column: string, direction: 'asc' | 'desc') => void;

	/** Filter mode. `'internal'` = internal filter (default). `'custom'` = delegates to `onFilterChange`. */
	filterMode?: TableMode;
	/** Called when filter is delegated (filterMode === 'custom'). */
	onFilterChange?: (column: string, value: string) => void;

	/**
	 * Pagination mode.
	 * - `'off'` (default): no pagination, renders all data.
	 * - `'internal'`: the table slices data internally (uses `pageSize`, manages page state).
	 * - `'custom'`: the consumer controls pagination (provides `page`, `total`, `onPageChange`).
	 */
	pagination?: 'off' | 'internal' | 'custom';
	/** Current page (1-based). Initial page in `'internal'` mode; required in `'custom'` mode. */
	page?: number;
	/** Page size. Used in `'internal'` and `'custom'` modes. Default: 25. */
	pageSize?: number;
	/** Total records (after filters). Required in `'custom'` mode. */
	total?: number;
	/** Called when page changes. Optional in `'internal'` mode; required in `'custom'` mode. */
	onPageChange?: (page: number) => void;
}
