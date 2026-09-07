/**
 * Shared types for UI components.
 *
 * Each `*Props` interface is the public "contract" for its component:
 * consumers can use them to build objects for binding/aggregating props,
 * and to compose new components on top of the lib's primitives.
 */
import type { Snippet } from 'svelte';
import type { IconName } from '../icons';

/** Color variants for `Badge`. */
export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error';

/**
 * Props for `Badge` — a small colored label.
 */
export interface BadgeProps {
	/** Color variant. */
	variant?: BadgeVariant;
	/** Show a dismiss (×) button. */
	dismissible?: boolean;
	/** Called when the dismiss button is clicked. */
	onDismiss?: () => void;
	/** Badge content. */
	children?: Snippet;
	/** Extra classes. */
	class?: string;
}

/** Color variants for `Button`. */
export type ButtonVariant =
	'primary' | 'secondary' | 'danger' | 'warning' | 'ghost' | 'search' | 'clear';

/** Sizes for `Button`. */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Props for `Button` — a styled action button with optional icon.
 */
export interface ButtonProps {
	/** Color variant. */
	variant?: ButtonVariant;
	/** Size. */
	size?: ButtonSize;
	/** Icon name (rendered via the `Icon` component). */
	icon?: IconName;
	/** Icon position relative to the label. */
	iconPosition?: 'left' | 'right';
	/** Icon size in px. */
	iconSize?: number;
	/** Whether the button is disabled. */
	disabled?: boolean;
	/** Extra classes. */
	class?: string;
	/** Button content. */
	children?: Snippet;
	/** Any additional native button attributes (spread onto the element). */
	[key: string]: unknown;
}

/**
 * A single option for `ButtonGroup`.
 */
export interface ButtonGroupOption {
	value: string;
	label: string;
	disabled?: boolean;
}

/**
 * Props for `ButtonGroup` — a segmented set of toggle buttons.
 */
export interface ButtonGroupProps {
	/** Available options. When empty, `children` is rendered instead. */
	options?: ButtonGroupOption[];
	/** Selected value (bindable). */
	value?: string;
	/** Size. */
	size?: ButtonSize;
	/** Extra classes. */
	class?: string;
	/** Called when the selected value changes. */
	onchange?: (value: string) => void;
	/** Fallback content rendered when `options` is empty. */
	children?: Snippet;
}

/**
 * Props for `DeleteConfirm` — the delete confirmation body.
 */
export interface DeleteConfirmProps {
	/** Main confirmation message. Defaults to the localized `deleteMessage`. */
	message?: string;
	/** Secondary warning line (rendered in the error color). Defaults to the localized `deleteWarning`. */
	warning?: string;
	/** Heading. Defaults to the localized `confirmDeletion`. */
	title?: string;
	/** Called when the user confirms the deletion. */
	onConfirm?: () => void;
	/** Called when the user cancels. */
	onCancel?: () => void;
	/** Optional content rendered above the message (e.g., the record being deleted). */
	children?: Snippet;
}

/**
 * A single node of the file tree.
 */
export interface FileNode {
	/** Display name (file or folder). */
	name: string;
	/** Full path — used as the selection key and passed to callbacks. */
	path: string;
	/** Whether the node is a directory. */
	is_dir: boolean;
	/** Child nodes (directories only). */
	children?: FileNode[];
}

/**
 * Props for `FileTree` — a recursive file/folder tree with checkboxes.
 */
export interface FileTreeProps {
	/** The tree node to render (and its children, recursively). */
	node: FileNode;
	/** Called when the user toggles a file's checkbox. */
	toggleFile?: (path: string) => void;
	/** Called when the user clicks a file. */
	onViewFile?: (path: string, name: string) => void;
	/** Paths of the currently selected files (drives the checkboxes). */
	selectedFiles?: string[];
	/** Whether folders start expanded. */
	defaultExpanded?: boolean;
	/** Extra classes for the root node. */
	class?: string;
}

/** A single label/value pair for `InfoGrid`. */
export interface InfoGridItem {
	label: string;
	value: string | number | undefined | null;
}

/**
 * Props for `InfoGrid` — a responsive grid of label/value pairs.
 */
export interface InfoGridProps {
	/** Items to display. */
	items: InfoGridItem[];
}
