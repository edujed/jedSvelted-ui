import { writable } from 'svelte/store';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
	id: string;
	type: ToastType;
	message: string;
	duration?: number;
}

const toasts = writable<Toast[]>([]);

let idCounter = 0;

function generateId(): string {
	return `toast-${Date.now()}-${idCounter++}`;
}

/**
 * Adds a toast to the top of the stack.
 * If there's already a toast of the same type within the last 2 seconds,
 * it updates the message instead of creating a new one.
 */
const lastToastByType: Record<ToastType, number> = {
	success: 0,
	error: 0,
	info: 0,
	warning: 0
};

export function addToast(message: string, type: ToastType = 'info', duration: number = 4000): void {
	const now = Date.now();
	const lastTime = lastToastByType[type] || 0;

	// If same type within the last 2s, updates the existing toast and returns
	if (now - lastTime < 2000) {
		toasts.update((t) => {
			const existing = t.find((toast) => toast.type === type);
			if (existing) {
				return t.map((toast) => (toast.type === type ? { ...toast, message } : toast));
			}
			return t;
		});
		lastToastByType[type] = now;
		return;
	}

	lastToastByType[type] = now;

	const toast: Toast = {
		id: generateId(),
		type,
		message,
		duration
	};
	toasts.update((t) => [toast, ...t]);

	// Auto-remove after duration
	setTimeout(() => {
		removeToast(toast.id);
	}, duration);
}

/**
 * Removes a toast by its ID.
 */
export function removeToast(id: string): void {
	toasts.update((t) => t.filter((toast) => toast.id !== id));
}

/**
 //** Shortcut methods for common toast types. */
export const toast = {
	success(message: string, duration?: number) {
		addToast(message, 'success', duration);
	},
	error(message: string, duration?: number) {
		addToast(message, 'error', duration);
	},
	info(message: string, duration?: number) {
		addToast(message, 'info', duration);
	},
	warning(message: string, duration?: number) {
		addToast(message, 'warning', duration);
	}
};

/** Getter for retrieving the current list of toasts (useful for testing). */
// We use subscribe here because Svelte stores do not expose .get() directly.
// The callback receives the initial value synchronously on the first subscription.
export function getToasts(): Toast[] {
	let current: Toast[] | undefined;
	const unsub = toasts.subscribe((val) => {
		current = val;
	});
	unsub(); // unsubscribe immediately — we only want the snapshot
	return current ?? [];
}

//** Clears internal timestamp cache — useful for test isolation. */
export function _resetLastToastTimestamps() {
	for (const key in lastToastByType) {
		(lastToastByType as Record<string, number>)[key] = 0;
	}
}

//** Clears all toasts and timestamps — useful for test isolation. */
export function _clearAllToastsForTests() {
	toasts.set([]);
	_resetLastToastTimestamps();
}

export { toasts };
