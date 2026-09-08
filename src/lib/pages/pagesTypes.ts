/**
 * Shared types for page shell components.
 *
 * `DetailAction` is the single vocabulary for detail-panel modes
 * (detail/edit/delete) — shared by `PageState`, `DetailShell` and consumers.
 */
import type { Snippet } from 'svelte';
import type { SkeletonVariant } from '../ui/uiTypes';
import type { PageState } from './PageState';

/** Detail-panel mode. */
export type DetailAction = 'detail' | 'edit' | 'delete';

/**
 * State exposed by `DetailShell` to its content snippet.
 *
 * The parent renders the mode-specific content (detail/edit/delete sections)
 * via the children snippet, receiving this state and an `isMode` helper.
 */
export interface DetailShellState<T extends Record<string, unknown> = Record<string, unknown>> {
	/** Current mode. */
	mode: DetailAction;
	/** Selected item (undefined when creating a new record). */
	selectedItem: T | undefined;
	/** Resolved (localized) panel title. */
	title: string;
	/** Cancels the current mode (closes the panel). */
	onCancel: () => void;
}

/**
 * Props for `PageShell` — the page-level layout (filter + content + detail).
 *
 * The snippets receive the page's `PageState` instance so they can drive
 * loading/error/detail behavior.
 */
export interface PageShellProps {
	/** Page title (also used as the filter panel title). */
	title?: string;
	/** Called when the filter's search button is clicked. */
	onSearch?: () => void;
	/** Called when the filter's clear button is clicked. */
	onClear?: () => void;
	/** Filter fields snippet. Receives the page's `PageState`. */
	filter?: Snippet<[PageState]>;
	/** Main content snippet (table/list). Receives the page's `PageState`. */
	content?: Snippet<[PageState]>;
	/** Detail content snippet. Receives the page's `PageState`. */
	detailContent?: Snippet<[PageState]>;
	/** Whether the filter panel is expanded (bindable). */
	filterOpen?: boolean;
	/** Skeleton variant shown while the page is loading. Defaults to `'table'`. */
	skeletonVariant?: SkeletonVariant;
	/** Number of skeleton rows (for `list`/`table` variants). Defaults to `5`. */
	skeletonRows?: number;
}

/**
 * Props for `DetailShell` — the generic detail manager (detail/edit/delete modes).
 *
 * Manages only the panel chrome (title + close); the parent renders the
 * mode-specific content via `children`, receiving the current
 * `DetailShellState` and an `isMode` helper.
 */
export interface DetailShellProps {
	/** Data item for display. */
	item?: Record<string, unknown>;
	/** Current mode (detail/edit/delete, bindable). */
	mode?: DetailAction;
	/** Entity name for titles (e.g., "Person", "Wallet"). */
	entityName?: string;
	/** Called when the panel is closed. */
	onClose?: () => void;
	/** Custom content (detail/edit/delete sections). */
	children?: Snippet<[DetailShellState, (section: DetailAction) => boolean]>;
	/** Show a skeleton placeholder while the detail content is loading. */
	loading?: boolean;
	/** Skeleton variant shown while loading. Defaults to `'list'`. */
	skeletonVariant?: SkeletonVariant;
	/** Number of skeleton rows (for `list`/`table` variants). Defaults to `4`. */
	skeletonRows?: number;
}
