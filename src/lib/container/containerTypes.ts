import type { Snippet } from 'svelte';
import type { TableCol } from '../table';
import type { ActionEvent } from '../actions';
import type { IconName } from '../icons';

/** Row shape used across container components. */
export type Row = Record<string, unknown>;

/**
 * Props for `Panel` — the base collapsible panel (header + content).
 */
export interface PanelProps {
	/** Panel title. */
	title?: string;
	/** Icon name for the header. */
	iconName?: IconName;
	/** Whether the panel is open (collapsible). */
	isOpen?: boolean;
	/** Custom content. */
	children?: Snippet;
	/** Called when the header toggles the panel. */
	onToggle?: () => void;
}

/**
 * Props for `SearchPanel` — a `Panel` preset with search/clear actions.
 */
export interface SearchPanelProps {
	/** Panel title (defaults to the localized "search" label). */
	title?: string;
	/** Called when the search button is clicked. */
	onSearch?: () => void;
	/** Called when the clear button is clicked. */
	onClear?: () => void;
	/** Whether the panel is open (collapsible). */
	isOpen?: boolean;
	/** Filter fields rendered inside the panel. */
	children?: Snippet;
}

/**
 * Props for `DetailPanel` — the overlay side panel (chrome only).
 */
export interface DetailPanelProps {
	/** Whether the panel is shown. */
	show?: boolean;
	/** Panel title. */
	title?: string;
	/** Called when the close button is clicked. */
	onClose?: () => void;
	/** Extra actions rendered in the header. */
	headerActions?: Snippet;
	/** Panel content. */
	children?: Snippet;
}

/**
 * Props for `CrudPanel` — table + form/view/delete panels.
 *
 * The `onAction` contract is the single event vocabulary for CRUD
 * mutations: it fires only on confirmed mutations ('create'/'update'
 * when the form is saved, 'delete' when the user confirms the deletion).
 * Opening a panel does NOT fire an event.
 */
export interface CrudPanelProps {
	/** Entity title (used in panel titles and the table caption). */
	title?: string;
	/** CSV file name for table export. */
	csvFileName: string;
	/** Called when the panel is closed (overlay mode only). */
	onClose?: () => void;
	/** Render inline (no overlay) instead of inside a `DetailPanel`. */
	inline?: boolean;
	/** Table columns. */
	columns: TableCol[];
	/** Table rows. */
	data: Row[];
	/**
	 * Single event contract: (action, item). Fired only on confirmed
	 * mutations — 'create'/'update' when the form is saved, 'delete'
	 * when the user confirms the deletion. Opening a panel does NOT
	 * fire an event.
	 */
	onAction?: (action: ActionEvent, item: Row) => void;
	/** Form snippet. Receives a callback to close the panel after save/cancel. */
	renderForm: Snippet<[onComplete: () => void]>;
	/** View snippet. Receives the selected row. */
	renderView?: Snippet<[row: Row]>;
	/** Record ID to open automatically (deep-link). */
	autoOpenId?: number;
	/** Called when autoOpenId is set but the record is not found in data. */
	onAutoOpenError?: (id: number) => void;
}
