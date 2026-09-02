<script lang="ts">
	import { Select } from 'bits-ui';
	import FieldHint from '../info/FieldHint.svelte';

	let {
		label = '',
		value = $bindable(''),
		options = [] as Array<{ key: string; label: string }>,
		placeholder = 'Selecione...',
		disabled = false,
		colSpan = 2,
		hint = '',
		onValueChange
	} = $props<{
		label?: string;
		value?: string;
		options?: Array<{ key: string; label: string }>;
		placeholder?: string;
		disabled?: boolean;
		colSpan?: number;
		hint?: string;
		onValueChange?: (value: string) => void;
	}>();

	const generatedId = $derived(`select-${Date.now().toString(36)}`);

	$effect(() => {
		if (onValueChange && value) {
			onValueChange(value);
		}
	});
</script>

<div
	class="select-field"
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

	<Select.Root type="single" bind:value>
		<div class="select-trigger-wrapper" id={generatedId}>
			<Select.Trigger {disabled}>
				<span class="select-value">
					{options.find((o: { key: string; label: string }) => o.key === value)?.label ??
						placeholder}
				</span>
				<svg
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					class="select-chevron"
				>
					<path d="M6 9l6 6 6-6" />
				</svg>
			</Select.Trigger>
		</div>

		<Select.Content class="select-content">
			<Select.Viewport class="select-viewport">
				{#each options as option (option.key)}
					<Select.Item class="select-item" value={option.key}>
						{option.label}
					</Select.Item>
				{/each}
			</Select.Viewport>
		</Select.Content>
	</Select.Root>
</div>

<style>
	.select-field {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
		min-width: 0;
	}

	.select-trigger-wrapper {
		width: 100%;
		display: block;
	}

	:global(.select-trigger-wrapper [data-select-trigger]) {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.5rem 0.75rem;
		background: var(--color-input-bg);
		border: 1px solid var(--color-input-border);
		border-radius: var(--radius-sm);
		color: var(--color-on-surface);
		font-size: var(--font-size-sm);
		font-family: inherit;
		cursor: pointer;
		width: 100%;
		text-align: left;
		transition:
			border-color var(--transition-fast),
			box-shadow var(--transition-fast);
		box-shadow: 0 1px 2px var(--color-shadow);
	}

	:global(.select-trigger-wrapper [data-select-trigger]:disabled) {
		opacity: 0.5;
		cursor: not-allowed;
	}

	:global(.select-trigger-wrapper [data-select-trigger]:hover:not(:disabled)) {
		border-color: var(--color-input-focus);
		box-shadow: 0 2px 4px var(--color-shadow);
	}

	:global(.select-trigger-wrapper [data-select-trigger]:focus-visible) {
		border-color: var(--color-input-focus);
		box-shadow:
			0 2px 6px var(--color-shadow),
			0 0 0 3px var(--color-primary-light);
	}

	.select-chevron {
		width: 16px;
		height: 16px;
		flex-shrink: 0;
		opacity: 0.6;
	}

	:global(.select-content) {
		background: var(--color-popover-bg);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		box-shadow: 0 4px 16px var(--color-shadow);
		padding: 0.25rem;
		min-width: 200px;
		z-index: 100;
	}

	:global(.select-viewport) {
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
	}

	:global(.select-item) {
		display: block;
		width: 100%;
		padding: 0.5rem 0.75rem;
		background: none;
		border: none;
		border-radius: var(--radius-sm);
		color: var(--color-on-surface);
		font-size: var(--font-size-sm);
		font-family: inherit;
		cursor: pointer;
		text-align: left;
		transition: background var(--transition-fast);
	}

	:global(.select-item:hover) {
		background: var(--color-sidenav-hover);
	}

	:global(.select-item[data-selected]) {
		font-weight: 600;
		color: var(--color-primary);
	}
</style>
