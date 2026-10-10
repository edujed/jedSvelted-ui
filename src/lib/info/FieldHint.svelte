<script lang="ts">
	import { Popover } from 'bits-ui';
	import { IconHelp } from '../icons';
	import type { FieldHintProps } from '../forms/formsTypes';

	let {
		hint = '',
		hintTitle = '',
		hintImpact = '',
		label = '',
		labelFor = ''
	}: FieldHintProps = $props();

	/** Whether the hint is "rich" (has title or impact sections). */
</script>

<div class="field-header">
	{#if label}
		<label for={labelFor} class="field-label">{label}</label>
	{/if}
	{#if hint || hintTitle || hintImpact}
		<Popover.Root>
			<Popover.Trigger class="hint-trigger" aria-label="Hint">
				<IconHelp size={18} class="hint-icon" />
			</Popover.Trigger>
			<Popover.Content class="popover" side="top" align="center" sideOffset={6}>
				{#if hintTitle || label}
					<div class="hint-title">{hintTitle || label}</div>
				{/if}
				{#if hint}
					<p class="hint-text">{hint}</p>
				{/if}
				{#if hintImpact}
					<div class="hint-impact">{hintImpact}</div>
				{/if}
			</Popover.Content>
		</Popover.Root>
	{/if}
</div>

<style>
	.field-header {
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
	}

	:global(.hint-trigger) {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: none;
		color: var(--color-primary);
		cursor: help;
		transition: all var(--transition-fast);
		padding: 0;
		line-height: 1;
		border: none;
	}

	:global(.hint-icon) {
		width: 18px;
		height: 18px;
		display: block;
	}

	:global(.hint-trigger:hover) {
		color: var(--color-primary-dark);
		transform: scale(1.1);
	}

	:global(.popover) {
		width: auto;
		max-width: 350px;
		min-width: 200px;
		padding: 0.75rem 1rem;
		background: var(--color-surface);
		border: 1px solid var(--color-primary);
		border-radius: var(--radius-md);
		color: var(--color-on-surface);
		font-size: var(--font-size-sm);
		font-family: inherit;
		outline: none;
		box-shadow: 0 4px 16px var(--color-shadow);
	}

	.hint-title {
		color: var(--color-primary);
		font-weight: bold;
		font-size: var(--font-size-base);
		margin-bottom: var(--spacing-xs);
		padding-bottom: var(--spacing-xs);
		border-bottom: 1px solid var(--color-border);
	}

	.hint-text {
		margin: 0;
		color: var(--color-on-surface);
		font-size: var(--font-size-sm);
		line-height: 1.5;
	}

	.hint-text:not(:last-child) {
		margin-bottom: var(--spacing-sm);
	}

	.hint-impact {
		margin-top: var(--spacing-sm);
		color: var(--color-accent);
		font-size: var(--font-size-xs);
		line-height: 1.4;
		background: var(--color-card-bg);
		padding: var(--spacing-xs) var(--spacing-sm);
		border-radius: var(--radius-sm);
		border-left: 3px solid var(--color-primary);
	}
</style>
