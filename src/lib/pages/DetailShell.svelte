<script lang="ts">
	import type { Snippet } from 'svelte';
	import Icon from '../icons/Icon.svelte';
	import DetailPanel from '../ui/DetailPanel.svelte';

	/**
	 * DetailShell — Generic detail manager component (detail/edit/delete modes).
	 *
	 * Internalized responsibilities:
	 * - State management: mode, selectedItem, formState
	 * - Synchronization: derives form state from selected item via $effect
	 * - Title derivation: computed from mode and item.id
	 * - Action delegation: delegates action handling to parent via onAction callback
	 *
	 * Parent component renders:
	 * - Header actions (edit/delete buttons)
	 * - Detail mode content (InfoGrid, Tabs, etc.)
	 * - Edit mode content (specific form fields)
	 * - Delete mode content (confirmation dialog)
	 */

	export interface DetailShellState<T extends Record<string, unknown> = Record<string, unknown>> {
		mode: 'detail' | 'edit' | 'delete';
		selectedItem: T | undefined;
		formState: Record<string, unknown>;
		setFormState: (updates: Record<string, unknown>) => void;
		title: string;
		onSave: () => void;
		onCancel: () => void;
	}

	let {
		item,
		mode = $bindable('detail' as 'detail' | 'edit' | 'delete'),
		formFields = {},
		entityName = 'Record',
		onClose,
		onAction,
		children
	}: {
		/** Data item for display */
		item?: Record<string, unknown>;
		/** Current mode (detail/edit/delete) */
		mode?: 'detail' | 'edit' | 'delete';
		/** Initial form fields */
		formFields?: Record<string, unknown>;
		/** Entity name for titles (e.g., "Person", "Wallet") */
		entityName?: string;
		/** Callback when closing */
		onClose?: () => void;
		/** Callback when executing action (save, delete, etc.) */
		onAction?: (action: string, data?: unknown) => void;
		/** Custom content (detail/edit/delete sections) */
		children?: Snippet<[DetailShellState, (section: 'detail' | 'edit' | 'delete') => boolean]>;
	} = $props();

	// Internal derived state from props — avoids redundant state+effect.
	let _mode = $derived(mode ?? ('detail' as const));
	let _selectedItem = $derived(item);
	let _formState = $derived(formFields ? structuredClone(formFields) : {});

	// Internal show state — allows the close button to hide the overlay
	// without removing the DetailShell from the DOM (which would skip the
	// exit transition). Resets to true whenever a new item is selected.
	let _show = $state(true);
	$effect(() => {
		// Reseta para true quando um item é selecionado OU quando o item
		// é limpo (close) — garante que a próxima abertura funcione.
		_show = !!item;
	});

	// Garante que qualquer onClose (botão chevron, Cancel, etc.)
	// passe pelo _show = false antes de notificar o parent.
	function wrappedOnClose() {
		_show = false;
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

	function setFormState(updates: Record<string, unknown>): void {
		_formState = { ..._formState, ...updates };
	}

	function handleAction(actionType: string): void {
		const data = _selectedItem ?? item;
		if (onAction) {
			onAction(actionType, data);
		}
	}

	function handleSave(): void {
		handleAction('save');
	}

	function handleCancel() {
		wrappedOnClose();
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	function _handleDelete(): void {
		handleAction('confirm-delete');
	}

	// State exposed to parent via snippet
	const detailState: DetailShellState = {
		get mode() {
			return _mode;
		},
		get selectedItem() {
			return _selectedItem;
		},
		get formState() {
			return _formState;
		},
		setFormState,
		get title() {
			return title;
		},
		onSave: handleSave,
		onCancel: handleCancel
	};

	// Helper to check current mode (used in snippet)
	function isMode(check: 'detail' | 'edit' | 'delete'): boolean {
		return _mode === check;
	}
</script>

<DetailPanel show={_show && !!item} {title} onClose={wrappedOnClose}>
	{#if children}
		{@render children(detailState, isMode)}
	{/if}
</DetailPanel>
