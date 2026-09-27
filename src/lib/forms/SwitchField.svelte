<script lang="ts">
	import { Switch } from 'bits-ui';
	import FormField from './FormField.svelte';
	import { LOCALES, localeStore } from '../i18n';
	import type { SwitchFieldProps } from './formsTypes';

	let {
		label = '',
		hint = '',
		hintTitle = '',
		hintImpact = '',
		value = $bindable(false),
		id,
		colSpan = 4,
		disabled = false,
		required = false,
		error = '',
		onValueChange
	}: SwitchFieldProps = $props();

	const stateLabel = $derived(value ? LOCALES[$localeStore].yes : LOCALES[$localeStore].no);

	function handleChange(checked: boolean): void {
		value = checked;
		onValueChange?.(checked);
	}
</script>

<FormField {label} {hint} {hintTitle} {hintImpact} {id} {colSpan} {disabled} {required} {error} class="switch-field">
	{#snippet children(fieldId)}
		<div class="switch-wrapper">
			<Switch.Root {id} {disabled} {required} bind:checked={value} onCheckedChange={handleChange}>
				{#snippet child({ props })}
					<button {...props} class="switch-track">
						<span class="switch-thumb" />
					</button>
				{/snippet}
			</Switch.Root>
			<span class="switch-state">{stateLabel}</span>
		</div>
	{/snippet}
</FormField>

<style>
	:global(.switch-wrapper) {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		padding: 4px 0;
	}

	:global(.switch-track) {
		position: relative;
		display: inline-flex;
		align-items: center;
		width: 40px;
		height: 22px;
		border-radius: 9999px;
		background: var(--color-input-border);
		padding: 2px;
		border: none;
		cursor: pointer;
		transition: background var(--transition-fast);
	}

	:global(.switch-track[data-state='checked']) {
		background: var(--color-primary);
	}

	:global(.switch-track[disabled]) {
		opacity: 0.5;
		cursor: not-allowed;
	}

	:global(.switch-track:focus-visible) {
		outline: none;
		box-shadow: 0 0 0 3px var(--color-primary-light);
	}

	:global(.switch-thumb) {
		display: block;
		width: 18px;
		height: 18px;
		border-radius: 50%;
		background: var(--color-surface);
		box-shadow: 0 1px 2px var(--color-shadow);
		transition: transform var(--transition-fast);
	}

	:global(.switch-track[data-state='checked'] .switch-thumb) {
		transform: translateX(18px);
	}

	:global(.switch-state) {
		font-size: var(--font-size-sm);
		color: var(--color-on-surface);
	}
</style>
