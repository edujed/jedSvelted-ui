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
}
