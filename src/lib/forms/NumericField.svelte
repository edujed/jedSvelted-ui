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
		colSpan = 4
	}: NumericFieldProps = $props();
</script>

<FormField {label} {hint} {hintTitle} {hintImpact} {id} {colSpan} class="numeric-field">
	{#snippet children(fieldId)}
		<div class="field-wrapper">
			<input
				id={fieldId}
				type="number"
				{min}
				{max}
				{step}
				class="field-input numeric-input"
				bind:value
			/>
		</div>
	{/snippet}
</FormField>

<style>
	.field-wrapper {
		position: relative;
	}

	.numeric-input {
		width: 100%;
		padding: 0.5rem 0.75rem;
		background: var(--color-input-bg);
		border: 1px solid var(--color-input-border);
		border-radius: var(--radius-sm);
		color: var(--color-on-surface);
		font-size: var(--font-size-sm);
		font-family: inherit;
		font-variant-numeric: tabular-nums;
		outline: none;
		transition:
			border-color var(--transition-fast),
			box-shadow var(--transition-fast);
	}

	.numeric-input:hover {
		border-color: var(--color-input-focus);
	}

	.numeric-input:focus-visible {
		border-color: var(--color-input-focus);
		box-shadow: 0 0 0 3px var(--color-primary-light);
	}
</style>
