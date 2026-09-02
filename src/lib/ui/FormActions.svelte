<script lang="ts">
	import Button from './Button.svelte';

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
		saveLabel = 'Save',
		cancelLabel = 'Cancel',
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

	$effect(() => {
		console.log('FormActions saveIcon:', saveIcon, 'cancelIcon:', cancelIcon);
	});
</script>

<div class="form-actions">
	{#if onSave}
		<Button variant="primary" icon={saveIcon} onclick={onSave}>{saveLabel}</Button>
	{/if}
	{#if showCancel && onCancel}
		<Button variant="secondary" icon={cancelIcon} onclick={onCancel}>{cancelLabel}</Button>
	{/if}
</div>
