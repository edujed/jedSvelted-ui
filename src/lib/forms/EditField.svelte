<script lang="ts">
	import FieldHint from '../info/FieldHint.svelte';

	let {
		label = '',
		hint = '',
		type = 'text',
		placeholder = '',
		value = $bindable(''),
		id,
		colSpan = 4
	} = $props<{
		label?: string;
		hint?: string;
		type?: string;
		placeholder?: string;
		value?: string;
		id?: string;
		colSpan?: number;
	}>();

	const generatedId = $derived(id ?? `field-${Math.random().toString(36).slice(2, 9)}`);
</script>

<div
	class="form-group"
	class:grid-col-1={colSpan === 1}
	class:grid-col-2={colSpan === 2}
	class:grid-col-3={colSpan === 3}
	class:grid-col-4={colSpan === 4}
>
	{#if label || hint}
		{#if hint}
			<FieldHint {hint} {label} labelFor={generatedId} />
		{:else}
			<label for={generatedId} class="field-label">{label}</label>
		{/if}
	{/if}

	<div class="field-wrapper">
		<input id={generatedId} {type} {placeholder} class="field-input" bind:value />
	</div>
</div>

<style>
	.field-wrapper {
		position: relative;
	}
</style>
