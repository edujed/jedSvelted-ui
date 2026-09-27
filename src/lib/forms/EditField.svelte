<script lang="ts">
	import FormField from './FormField.svelte';
	import type { EditFieldProps } from './formsTypes';

	let {
		label = '',
		hint = '',
		hintTitle = '',
		hintImpact = '',
		type = 'text',
		placeholder = '',
		value = $bindable(''),
		id,
		colSpan = 4,
		disabled = false,
		required = false,
		error = '',
		onValueChange
	}: EditFieldProps = $props();
</script>

<FormField {label} {hint} {hintTitle} {hintImpact} {id} {colSpan} {disabled} {required} {error}>
	{#snippet children(fieldId)}
		<div class="field-wrapper">
			<input
				id={fieldId}
				{type}
				{placeholder}
				{disabled}
				class="field-input"
				bind:value
				oninput={() => onValueChange?.(value)}
			/>
		</div>
	{/snippet}
</FormField>

<style>
	.field-wrapper {
		position: relative;
	}
</style>
