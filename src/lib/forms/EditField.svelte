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
		colSpan = 4
	}: EditFieldProps = $props();
</script>

<FormField {label} {hint} {hintTitle} {hintImpact} {id} {colSpan}>
	{#snippet children(fieldId)}
		<div class="field-wrapper">
			<input id={fieldId} {type} {placeholder} class="field-input" bind:value />
		</div>
	{/snippet}
</FormField>

<style>
	.field-wrapper {
		position: relative;
	}
</style>
