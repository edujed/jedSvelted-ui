<script lang="ts">
	import DetailPanel from '../container/DetailPanel.svelte';
	import { LOCALES, localeStore } from '../i18n';
	import type { DetailShellProps, DetailShellState } from './pagesTypes';

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

	let {
		item,
		mode = $bindable('detail' as const),
		entityName = 'Record',
		onClose,
		children
	}: DetailShellProps = $props();

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

	// Derived title (i18n)
	let title = $derived(
		_mode === 'detail'
			? LOCALES[$localeStore].viewTitle.replace('{entity}', entityName)
			: _mode === 'edit'
				? _selectedItem?.id
					? LOCALES[$localeStore].editTitle.replace('{entity}', entityName)
					: LOCALES[$localeStore].newTitle.replace('{entity}', entityName)
				: LOCALES[$localeStore].deleteTitle.replace('{entity}', entityName)
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
	function isMode(check: DetailShellProps['mode']): boolean {
		return _mode === check;
	}
</script>

<DetailPanel show={!!item} {title} onClose={wrappedOnClose}>
	{#if children}
		{@render children(detailState, isMode)}
	{/if}
</DetailPanel>
