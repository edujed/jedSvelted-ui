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
		entityName = 'Registro',
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

	function handleCancel(): void {
		onClose?.();
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

<DetailPanel show={true} {title} {onClose}>
	{#snippet headerActions()}
		{#if _mode === 'detail' && _selectedItem?.id}
			<button class="btn-action btn-edit" onclick={() => handleAction('edit')} title="Edit">
				<Icon name="edit" size={16} />
				<span>Edit</span>
			</button>
			<button class="btn-action btn-delete" onclick={() => handleAction('delete')} title="Delete">
				<Icon name="trash" size={16} />
				<span>Delete</span>
			</button>
		{/if}
	{/snippet}

	{#if children}
		{@render children(detailState, isMode)}
	{/if}
</DetailPanel>

<style>
	.btn-action {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		padding: 0.375rem 0.75rem;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		background: var(--color-surface);
		color: var(--color-on-surface);
		font-size: var(--font-size-sm);
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.btn-action:hover {
		background: var(--color-primary-light);
		border-color: var(--color-primary);
		color: var(--color-primary);
	}

	.btn-action.btn-delete:hover {
		background: var(--color-error);
		border-color: var(--color-error);
		color: white;
	}
</style>
