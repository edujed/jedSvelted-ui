/**
 * Generic handler for detail actions (save, delete, etc.).
 * Centralizes common logic for create/update/delete operations in lists.
 *
 * Usage:
 * ```ts
 * const { handleSave, handleDelete, handleDetailAction } = createHandleDetail({
 *   dataRef: handlerRef,
 *   toast,
 *   itemName: 'Person',
 *   displayFields: ['name']
 * });
 * ```
 *
 * Toast messages are translated via the i18n module (`t()`), so they
 * update automatically when the locale changes.
 */

import { t } from './i18n';

/**
 * Unified event contract for CRUD actions emitted by panels (CrudPanel,
 * DetailShell) and consumed by pages. This is the single vocabulary for
 * create/update/delete/cancel — independent of the panel's display mode.
 */
export type ActionEvent = 'create' | 'update' | 'delete' | 'cancel';

export interface HandleDetailOptions<T extends { id?: number }> {
	/** Mutable reference to the data array — allows updates without recreating the handler. */
	dataRef: { data: T[] };
	/** Toast function for user-facing feedback messages. */
	toast: { success: (msg: string) => void; warning: (msg: string) => void };
	/**
	 * Item name used in confirmation messages.
	 * Accepts a string (resolved once) or a getter (resolved at event time,
	 * so it stays in sync with the current locale).
	 */
	itemName: string | (() => string);
	/** Fields displayed in message (e.g., ['name', 'label']). */
	displayFields?: string[];
}

/**
 * Creates a generic handler for detail actions.
 * Returns handleSave, handleDelete and handleDetailAction (unified wrapper).
 */
export function createHandleDetail<T extends { id?: number }>(
	options: HandleDetailOptions<T>
): {
	handleSave: (item: T) => void;
	handleDelete: (item: T) => void;
	handleDetailAction: (action: ActionEvent, item: T | undefined) => void;
	/** Exposed for unit tests — not part of the public API. */
	dataRef: (typeof options)['dataRef'];
} {
	const { toast, displayFields = [] } = options;
	const dataRef = options.dataRef;

	/** Resolves the item name at event time (supports locale-reactive getters). */
	function resolveItemName(): string {
		return typeof options.itemName === 'function' ? options.itemName() : options.itemName;
	}

	function getDisplayValue(item: T): string {
		if (displayFields.length > 0) {
			const parts = displayFields
				.map((field) => String((item as Record<string, unknown>)?.[String(field)]))
				.filter(Boolean);
			return parts.join(' ') || `#${item.id}`;
		}
		return `#${item.id}`;
	}

	function handleDelete(item: T): void {
		try {
			const data = dataRef.data;
			const filtered = data.filter((i) => i.id !== item.id);
			data.splice(0, data.length, ...filtered);
			toast.warning(t('itemDeleted', { item: resolveItemName(), value: getDisplayValue(item) }));
		} catch {
			// Silently ignore errors during delete operations
		}
	}

	/** Unified wrapper that dispatches actions to the correct handlers. */
	function handleDetailAction(action: ActionEvent, item: T | undefined): void {
		if (!item) return;
		if (action === 'create' || action === 'update') return handleSave(item);
		if (action === 'delete') return handleDelete(item);
	}

	function handleSave(item: T): void {
		try {
			const data = dataRef.data;
			if (item.id) {
				const idx = data.findIndex((i) => i.id === item.id);
				if (idx !== -1) {
					data[idx] = { ...data[idx], ...item } as T;
				}
				toast.success(t('itemUpdated', { item: resolveItemName(), value: getDisplayValue(item) }));
			} else {
				const newItem = { ...item, id: Date.now() } as T;
				data.unshift(newItem);
				toast.success(
					t('itemCreated', { item: resolveItemName(), value: getDisplayValue(newItem) })
				);
			}
		} catch {
			// Silently ignore errors during save operations
		}
	}

	return {
		handleSave,
		handleDelete,
		handleDetailAction,
		// Exposed for unit tests — not part of the public API.
		dataRef
	};
}
