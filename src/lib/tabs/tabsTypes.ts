/**
 * Shared types for the `Tabs` component.
 */
import type { Snippet } from 'svelte';

/** A single tab definition. */
export interface TabItem {
	/** Tab value (used as the selection key). */
	value: string;
	/** Tab label. */
	label: string;
}

/**
 * Props for `Tabs` — a tab list with optional content area.
 */
export interface TabsProps {
	/** Available tabs. */
	tabs?: TabItem[];
	/** Active tab value (bindable). */
	activeTab?: string;
	/** Whether the content area is shown (default: true). */
	showContent?: boolean;
	/** Fallback content rendered in the content area. */
	children?: Snippet;
	/** Content snippet. Receives the active tab value. */
	tabContent?: Snippet<[string]>;
}
