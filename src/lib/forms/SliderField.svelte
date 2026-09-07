<script lang="ts">
	import FormField from './FormField.svelte';
	import type { SliderFieldProps } from './formsTypes';

	let {
		label = '',
		hint = '',
		hintTitle = '',
		hintImpact = '',
		value = $bindable(0),
		min = 0,
		max = 1,
		step = 0.01,
		id,
		colSpan = 4,
		decimals = 2,
		format
	}: SliderFieldProps = $props();

	const displayValue = $derived(format ? format(value) : value.toFixed(decimals));
</script>

<FormField {label} {hint} {hintTitle} {hintImpact} {id} {colSpan} class="slider-field">
	{#snippet children(fieldId)}
		<div class="slider-wrapper">
			<input id={fieldId} type="range" {min} {max} {step} class="slider-input" bind:value />
			<span class="slider-value">{displayValue}</span>
		</div>
	{/snippet}
</FormField>

<style>
	.slider-wrapper {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
	}

	.slider-input {
		flex: 1;
		width: 100%;
		height: 6px;
		appearance: none;
		-webkit-appearance: none;
		background: var(--color-input-bg);
		border: 1px solid var(--color-input-border);
		border-radius: var(--radius-sm);
		outline: none;
		cursor: pointer;
		transition: border-color var(--transition-fast);
	}

	.slider-input:hover {
		border-color: var(--color-input-focus);
	}

	.slider-input:focus-visible {
		border-color: var(--color-input-focus);
		box-shadow: 0 0 0 3px var(--color-primary-light);
	}

	/* Thumb — WebKit */
	.slider-input::-webkit-slider-thumb {
		appearance: none;
		-webkit-appearance: none;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: var(--color-primary);
		border: 2px solid var(--color-surface);
		box-shadow: 0 1px 3px var(--color-shadow);
		cursor: pointer;
		transition:
			transform var(--transition-fast),
			box-shadow var(--transition-fast);
	}

	.slider-input::-webkit-slider-thumb:hover {
		transform: scale(1.15);
		box-shadow: 0 2px 6px var(--color-shadow);
	}

	.slider-input::-webkit-slider-thumb:active {
		transform: scale(1.05);
	}

	/* Thumb — Firefox */
	.slider-input::-moz-range-thumb {
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: var(--color-primary);
		border: 2px solid var(--color-surface);
		box-shadow: 0 1px 3px var(--color-shadow);
		cursor: pointer;
		transition:
			transform var(--transition-fast),
			box-shadow var(--transition-fast);
	}

	.slider-input::-moz-range-thumb:hover {
		transform: scale(1.15);
		box-shadow: 0 2px 6px var(--color-shadow);
	}

	.slider-input::-moz-range-thumb:active {
		transform: scale(1.05);
	}

	/* Track — Firefox */
	.slider-input::-moz-range-track {
		height: 6px;
		background: var(--color-input-bg);
		border-radius: var(--radius-sm);
	}

	.slider-value {
		min-width: 3.5rem;
		text-align: right;
		font-size: var(--font-size-sm);
		font-weight: 600;
		font-variant-numeric: tabular-nums;
		color: var(--color-primary);
	}
</style>
