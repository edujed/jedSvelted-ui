<script lang="ts">
	import Button from '../ui/Button.svelte';
	import { LOCALES, localeStore } from '../i18n';
	import type { FormActionsProps } from './formsTypes';

	let {
		onSave,
		onCancel,
		saveLabel,
		cancelLabel,
		showCancel = true,
		saveIcon = 'check',
		cancelIcon = 'x'
	}: FormActionsProps = $props();

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
