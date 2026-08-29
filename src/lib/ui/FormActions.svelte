<script lang="ts">
	import Icon from '../icons/Icon.svelte';

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
		saveIcon?: string;
		cancelIcon?: string;
	} = $props();
</script>

<div class="form-actions">
	{#if onSave}
		<button class="btn btn-primary" onclick={onSave}>
			<Icon name={saveIcon} size={16} />
			{saveLabel}
		</button>
	{/if}
	{#if showCancel && onCancel}
		<button class="btn btn-secondary" onclick={onCancel}>
			<Icon name={cancelIcon} size={16} />
			{cancelLabel}
		</button>
	{/if}
</div>
