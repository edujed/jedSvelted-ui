/**
 * Shared types for table components.
 * SINGLE source of truth for table type definitions.
 */

import type { TableCol as TableColBase } from './useTableState';

/** Type definition for a table action button. */
export interface TableAction<T extends Record<string, unknown> = Record<string, unknown>> {
	title: string;
	hint?: string;
	icon?: string;
	onClick?: (row: T) => void;
}

/** Re-export alias for direct import convenience. */
export type TableCol<T extends Record<string, unknown> = Record<string, unknown>> = TableColBase<T>;
