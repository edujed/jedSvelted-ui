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
>
	{#if label || hasHint}
		{#if hasHint}
			<FieldHint {hint} {hintTitle} {hintImpact} {label} labelFor={generatedId} />
		{:else}
			<label for={generatedId} class="field-label">{label}</label>
		{/if}
	{/if}

	{@render children(generatedId)}
</div>
