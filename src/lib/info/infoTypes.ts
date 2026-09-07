import type { Snippet } from 'svelte';
import type { Toast } from './toast';

/**
 * Shared types for info components.
 *
 * `MessageVariant` is the single vocabulary for visual variants — `Message`
 * uses it, and `ToastType` mirrors it (toasts reuse the same four states).
 */

/** Visual variants for `Message` (and, by mirror, toasts). */
export type MessageVariant = 'info' | 'success' | 'warning' | 'error';

/**
 * Props for `Message` — an inline status/alert box.
 */
export interface MessageProps {
	/** Visual variant — controls text and border color. */
	variant?: MessageVariant;
	/** Optional bold title shown before the message content. */
	title?: string;
	/** Show a close button. */
	dismissible?: boolean;
	/** Called when the close button is clicked. */
	onDismiss?: () => void;
	/** Message content. */
	children?: Snippet;
	/** Additional CSS classes. */
	class?: string;
}

/**
 * Props for `Toast` — a single toast item.
 */
export interface ToastProps {
	/** The toast data to render. */
	toast: Toast;
	/** Called when the toast is closed (receives the toast id). */
	onClose?: (id: string) => void;
}
