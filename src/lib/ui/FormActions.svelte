<script lang="ts">
	import Button from './Button.svelte';
	import { LOCALES, localeStore } from '../i18n';

	type IconName =
		| 'eye'
		| 'edit'
		| 'trash'
		| 'user'
		| 'more'
		| 'chevron-right'
		| 'check'
		| 'x'
		| 'wallet'
		| 'bank'
		| 'clock'
		| 'menu'
		| 'download'
		| 'sun'
		| 'moon'
		| 'sort'
		| 'plus'
		| 'chevron-down'
		| 'circle'
		| 'filter'
		| 'search'
		| 'settings'
		| 'user-alt';

	let {
		onSave,
		onCancel,
		saveLabel,
		cancelLabel,
		showCancel = true,
		saveIcon = 'check',
		cancelIcon = 'x'
	}: {
		onSave?: () => void;
		onCancel?: () => void;
		saveLabel?: string;
		cancelLabel?: string;
		showCancel?: boolean;
		saveIcon?: IconName;
		cancelIcon?: IconName;
	} = $props();

	const resolvedSaveLabel = $derived(saveLabel ?? LOCALES[$localeStore].save);
	const resolvedCancelLabel = $derived(cancelLabel ?? LOCALES[$localeStore].cancel);
</script>

<div class="form-actions">
	{#if onSave}
		<Button variant="primary" icon={saveIcon} onclick={onSave}>{resolvedSaveLabel}</Button>
	{/if}
	{#if showCancel && onCancel}
		<Button variant="secondary" icon={cancelIcon} onclick={onCancel}>{resolvedCancelLabel}</Button>
	{/if}
</div>

<style>
	.form-actions {
		display: flex;
		gap: var(--spacing-sm);
		justify-content: flex-end;
	}
</style>
