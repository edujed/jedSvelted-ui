<script lang="ts">
	import FieldHint from '../info/FieldHint.svelte';

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
	} = $props<{
		label?: string;
		hint?: string;
		hintTitle?: string;
		hintImpact?: string;
		value?: number;
		min?: number;
		max?: number;
		step?: number;
		id?: string;
		colSpan?: number;
	}>();

	const generatedId = $derived(id ?? `numeric-${Math.random().toString(36).slice(2, 9)}`);
	const hasHint = $derived(!!hint || !!hintTitle || !!hintImpact);
</script>

<div
	class="numeric-field form-group"
	class:grid-col-1={colSpan === 1}
	class:grid-col-2={colSpan === 2}
	class:grid-col-3={colSpan === 3}
	class:grid-col-4={colSpan === 4}
>
	{#if label || hasHint}
		{#if hasHint}
			<FieldHint {hint} {hintTitle} {hintImpact} {label} labelFor={generatedId} />
		{:else}
			<label for={generatedId} class="field-label">{label}</label>
		{/if}
	{/if}

	<div class="field-wrapper">
		<input
			id={generatedId}
			type="number"
			{min}
			{max}
			{step}
			class="field-input numeric-input"
			bind:value
		/>
	</div>
</div>

<style>
	.numeric-field {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
		min-width: 0;
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
