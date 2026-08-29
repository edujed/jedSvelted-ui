<script lang="ts">
	import { Popover } from 'bits-ui';

	let {
		hint = '',
		label = '',
		labelFor = ''
	} = $props<{
		hint?: string;
		label?: string;
		labelFor?: string;
	}>();
</script>

<div class="field-header">
	{#if label}
		<label for={labelFor} class="field-label">{label}</label>
	{/if}
	<Popover.Root>
		<Popover.Trigger>?</Popover.Trigger>
		<Popover.Content class="popover" side="top" align="center" sideOffset={3}>
			<p class="hint-text">{hint}</p>
		</Popover.Content>
	</Popover.Root>
</div>

<style>
	:global(.popover) {
		width: 100%;
		padding: 0.5rem 0.75rem;
		background: var(--color-sidenav-hover);
		opacity: 0.85;
		border: 1px solid var(--color-input-border);
		border-radius: var(--radius-sm);
		color: var(--color-on-surface);
		font-size: var(--font-size-sm);
		font-family: inherit;
		font-weight: 600;
		outline: none;
		transition: border-color var(--transition-fast);
		box-shadow: 2px 2px 4px var(--color-shadow);
	}

	.field-header {
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
	}

	:global(div.field-header button) {
		width: 18px;
		height: 18px;
		border-radius: 50%;
		border: 1px solid var(--color-border);
		background: transparent;
		color: var(--color-on-surface);
		opacity: 0.5;
		font-size: 0.75rem;
		font-weight: 600;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all var(--transition-fast);
		padding: 0;
		line-height: 1;
	}

	:global(div.field-header button:hover) {
		opacity: 1;
		border-color: var(--color-primary);
		color: var(--color-primary);
	}
</style>
