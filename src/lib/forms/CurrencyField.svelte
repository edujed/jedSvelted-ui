<script lang="ts">
	import FormField from './FormField.svelte';
	import { localeStore, getCurrencySymbol, getCurrencyDecimals, type CurrencyCode } from '../i18n';
	import { formatNumber, parseCurrency, stripThousands as stripThousandsUtil } from '../format';
	import type { CurrencyFieldProps } from './formsTypes';

	let {
		label = '',
		hint = '',
		hintTitle = '',
		hintImpact = '',
		value = $bindable(0),
		decimals,
		currency = 'BRL' as CurrencyCode,
		min,
		max,
		disabled = false,
		id,
		colSpan = 2
	}: CurrencyFieldProps = $props();

	const locale = $derived($localeStore);
	const effectiveDecimals = $derived(decimals ?? getCurrencyDecimals(currency));
	const symbol = $derived(getCurrencySymbol(currency, locale));

	// Format the number for display (e.g. 1234.56 → "1.234,56" for pt-BR)
	// Always shows the configured number of decimal places (e.g. 0 → "0,00")
	function formatDisplay(num: number | undefined | null): string {
		if (num === undefined || num === null) return '';
		return formatNumber(num, locale, effectiveDecimals);
	}

	// Strip the thousands separator from a formatted string (e.g. "2.100.000,00" → "2100000,00" in pt-BR)
	// Used when focusing so the user sees a clean number to edit.
	function stripThousands(str: string): string {
		return stripThousandsUtil(str, locale);
	}

	// Parse the display string back to a number (e.g. "1.234,56" → 1234.56)
	function parseInput(str: string): number {
		return parseCurrency(str);
	}

	// Display value (formatted string) — only updated on blur or external change
	let displayValue = $state(formatDisplay(value));
	let isFocused = $state(false);

	// Sync external value → display (only when not focused).
	// Guarded by displayValue so the effect doesn't re-run on its own writes.
	$effect(() => {
		if (!isFocused && displayValue !== formatDisplay(value)) {
			displayValue = formatDisplay(value);
		}
	});

	// Handle focus: strip the thousands mask so the user sees a clean number.
	// e.g. "2,100,000.00" → "2100000.00" (en-US) or "2.100.000,00" → "2100000,00" (pt-BR)
	function handleFocus(e: Event) {
		const input = e.target as HTMLInputElement;
		isFocused = true;
		const stripped = stripThousands(input.value);
		if (stripped !== input.value) {
			displayValue = stripped;
			input.value = stripped;
		}
		input.select();
	}

	// Handle input: update the bound value without re-formatting the display.
	// The raw string stays in the input so the user can keep typing freely
	// (e.g. "1.23" stays "1.23" while typing, even in pt-BR).
	function handleInput(e: Event) {
		const input = e.target as HTMLInputElement;
		value = parseInput(input.value);
	}

	// Handle blur: commit the parsed value and re-format the display.
	function handleBlur(e: Event) {
		const input = e.target as HTMLInputElement;
		isFocused = false;
		const parsed = parseInput(input.value);
		value = parsed;
		displayValue = formatDisplay(parsed);
		input.value = displayValue;
	}
</script>

<FormField {label} {hint} {hintTitle} {hintImpact} {id} {colSpan} class="currency-field">
	{#snippet children(fieldId)}
		<div class="field-wrapper">
			<span class="currency-symbol">
				{symbol}
			</span>
			<input
				id={fieldId}
				type="text"
				inputmode="decimal"
				{disabled}
				class="field-input currency-input"
				bind:value={displayValue}
				oninput={handleInput}
				onblur={handleBlur}
				onfocus={handleFocus}
				autocomplete="off"
			/>
		</div>
	{/snippet}
</FormField>

<style>
	.field-wrapper {
		position: relative;
		display: flex;
		align-items: center;
	}

	.currency-symbol {
		position: absolute;
		left: 0.75rem;
		font-size: var(--font-size-sm);
		color: var(--color-on-surface);
		opacity: 0.6;
		pointer-events: none;
	}

	.currency-input {
		width: 100%;
		padding: 0.5rem 0.75rem 0.5rem 2.25rem;
		background: var(--color-input-bg);
		border: 1px solid var(--color-input-border);
		border-radius: var(--radius-sm);
		color: var(--color-on-surface);
		font-size: var(--font-size-sm);
		font-family: inherit;
		font-variant-numeric: tabular-nums;
		text-align: right;
		outline: none;
		transition:
			border-color var(--transition-fast),
			box-shadow var(--transition-fast);
	}

	.currency-input:hover {
		border-color: var(--color-input-focus);
	}

	.currency-input:focus-visible {
		border-color: var(--color-input-focus);
		box-shadow: 0 0 0 3px var(--color-primary-light);
	}

	.currency-input:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
</style>
