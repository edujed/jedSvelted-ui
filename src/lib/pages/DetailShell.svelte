<script lang="ts">
	import type { Snippet } from 'svelte';
	import DetailPanel from '../ui/DetailPanel.svelte';

	/**
	 * DetailShell — Generic detail manager component (detail/edit/delete modes).
	 *
	 * Responsibilities:
	 * - Title derivation: computed from mode and item.id
	 * - Close delegation: notifies parent via onClose
	 *
	 * The parent renders the mode-specific content (detail/edit/delete sections)
	 * via the children snippet, receiving the current mode and an isMode helper.
	 *
	 * Form state and action handling (save/delete) are owned by the parent —
	 * this component only manages the panel chrome (title + close).
	 */

	export interface DetailShellState<T extends Record<string, unknown> = Record<string, unknown>> {
		mode: 'detail' | 'edit' | 'delete';
		selectedItem: T | undefined;
		title: string;
		onCancel: () => void;
	}

	let {
		item,
		mode = $bindable('detail' as 'detail' | 'edit' | 'delete'),
		entityName = 'Record',
		onClose,
		children
	}: {
		/** Data item for display */
		item?: Record<string, unknown>;
		/** Current mode (detail/edit/delete) */
		mode?: 'detail' | 'edit' | 'delete';
		/** Entity name for titles (e.g., "Person", "Wallet") */
		entityName?: string;
		/** Callback when closing */
		onClose?: () => void;
		/** Custom content (detail/edit/delete sections) */
		children?: Snippet<[DetailShellState, (section: 'detail' | 'edit' | 'delete') => boolean]>;
	} = $props();

	// Internal derived state from props — avoids redundant state+effect.
	let _mode = $derived(mode ?? ('detail' as const));
	let _selectedItem = $derived(item);

	// The DetailShell is only mounted when the parent (PageShell) decides to
	// show it (via {#if renderDetail}). The close button simply notifies the
	// parent via onClose, which sets PageState.showDetail = false, causing the
	// PageShell to unmount this component. No internal _show state is needed.
	function wrappedOnClose() {
		onClose?.();
	}

	// Derived title
	let title = $derived(
		_mode === 'detail'
			? `${entityName} Details`
			: _mode === 'edit'
				? _selectedItem?.id
					? `Edit ${entityName}`
					: `New ${entityName}`
				: `Delete ${entityName}`
	);

	function handleCancel() {
		wrappedOnClose();
	}

	// State exposed to parent via snippet
	const detailState: DetailShellState = {
		get mode() {
			return _mode;
		},
		get selectedItem() {
			return _selectedItem;
		},
		get title() {
			return title;
		},
		onCancel: handleCancel
	};

	// Helper to check current mode (used in snippet)
	function isMode(check: 'detail' | 'edit' | 'delete'): boolean {
		return _mode === check;
	}
</script>

<DetailPanel show={!!item} {title} onClose={wrappedOnClose}>
	{#if children}
		{@render children(detailState, isMode)}
	{/if}
</DetailPanel>
