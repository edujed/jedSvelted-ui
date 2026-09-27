<script lang="ts">
	import FieldHint from '../info/FieldHint.svelte';
	import type { FormFieldProps } from './formsTypes';

	let {
		label = '',
		hint = '',
		hintTitle = '',
		hintImpact = '',
		id,
		colSpan = 4,
		class: className = '',
		disabled = false,
		required = false,
		error = '',
		children
	}: FormFieldProps = $props();

	const generatedId = $derived(id ?? `field-${Math.random().toString(36).slice(2, 9)}`);
	const hasHint = $derived(!!hint || !!hintTitle || !!hintImpact);
</script>

<div
	class="form-group {className}"
	class:grid-col-1={colSpan === 1}
	class:grid-col-2={colSpan === 2}
	class:grid-col-3={colSpan === 3}
	class:grid-col-4={colSpan === 4}
	class:field-disabled={disabled}
>
	{#if label || hasHint}
		{#if hasHint}
			<FieldHint {hint} {hintTitle} {hintImpact} {label} labelFor={generatedId} />
		{:else}
			<label for={generatedId} class="field-label">
				{label}
				{#if required}<span class="required-marker">*</span>{/if}
			</label>
		{/if}
	{/if}

	{@render children(generatedId)}

	{#if error}
		<span class="field-error">{error}</span>
	{/if}
</div>

<style>
	.required-marker {
		color: var(--color-error, #ef4444);
		margin-left: 2px;
	}

	.field-error {
		display: block;
		margin-top: 4px;
		font-size: var(--font-size-xs);
		color: var(--color-error, #ef4444);
	}

	.field-disabled .field-input,
	.field-disabled [data-select-trigger] {
		opacity: 0.5;
		cursor: not-allowed;
	}
</style>
