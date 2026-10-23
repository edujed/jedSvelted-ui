<script lang="ts">
	import FormField from './FormField.svelte';
	import type { NumericFieldProps } from './formsTypes';

	let {
		label = '',
		hint = '',
		hintTitle = '',
		hintImpact = '',
		value = $bindable(0),
		min,
		max,
		step = 1,
		id,
		colSpan = 4,
		disabled = false,
		required = false,
		error = '',
		onValueChange
	}: NumericFieldProps = $props();
</script>

<FormField
	{label}
	{hint}
	{hintTitle}
	{hintImpact}
	{id}
	{colSpan}
	{disabled}
	{required}
	{error}
	class="numeric-field"
>
	{#snippet children(fieldId)}
		<div class="field-wrapper">
			<input
				id={fieldId}
				type="number"
				{min}
				{max}
				{step}
				{disabled}
				class="field-input numeric-input"
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

	.numeric-input {
		font-variant-numeric: tabular-nums;
	}
</style>
