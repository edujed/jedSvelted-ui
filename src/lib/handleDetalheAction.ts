/**
 * Generic handler for detail actions (save, delete, etc.).
 * Centralizes common logic for create/update/delete operations in lists.
 *
 * Usage:
 * ```ts
 * const { handleSave, handleDelete, handleDetalheAction } = createHandleDetalhe({
 *   dataRef: handlerRef,
 *   toast,
 *   itemName: 'Pessoa',
 *   displayFields: ['nome']
 * });
 * ```
 */

export interface HandleDetalheOptions<T extends { id?: number }> {
	/** Mutable reference to the data array — allows updates without recreating the handler. */
	dataRef: { data: T[] };
	/** Toast function for user-facing feedback messages. */
	toast: { success: (msg: string) => void; warning: (msg: string) => void };
	/** Item name used in confirmation messages. */
	itemName: string;
	/** Fields displayed in message (e.g., ['nome', 'label']). */
	displayFields?: string[];
}

/**
 * Creates a generic handler for detail actions.
 * Returns handleSave, handleDelete and handleDetalheAction (unified wrapper).
 */
export function createHandleDetalhe<T extends { id?: number }>(
	options: HandleDetalheOptions<T>
): {
	handleSave: (item: T) => void;
	handleDelete: (item: T) => void;
	handleDetalheAction: (action: string, item: T | undefined) => void;
	/** Exposed for unit tests — not part of the public API. */
	dataRef: (typeof options)['dataRef'];
} {
	const { toast, itemName, displayFields = [] } = options;
	const dataRef = options.dataRef;

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
			toast.warning(`${itemName} "${getDisplayValue(item)}" deleted`);
		} catch {
			// Silently ignore errors during delete operations
		}
	}

	/** Unified wrapper that dispatches actions to the correct handlers. */
	function handleDetalheAction(action: string, item: T | undefined): void {
		if (!item) return;
		if (action === 'save') return handleSave(item);
		if (action === 'confirm-delete') return handleDelete(item);
	}

	function handleSave(item: T): void {
		try {
			const data = dataRef.data;
			if (item.id) {
				const idx = data.findIndex((i) => i.id === item.id);
				if (idx !== -1) {
					data[idx] = { ...data[idx], ...item } as T;
				}
				toast.success(`${itemName} "${getDisplayValue(item)}" updated successfully`);
			} else {
				const newItem = { ...item, id: Date.now() } as T;
				data.unshift(newItem);
				toast.success(`${itemName} "${getDisplayValue(newItem)}" created successfully`);
			}
		} catch {
			// Silently ignore errors during save operations
		}
	}

	return {
		handleSave,
		handleDelete,
		handleDetalheAction,
		// Exposed for unit tests — not part of the public API.
		dataRef
	};
}
