<script lang="ts">
	import Icon from '../icons/Icon.svelte';
	import type { IconName } from '../icons';

	let { icon, label, variant, toolName }: { icon: IconName; label: string; variant: string; toolName?: string } =
		$props();
</script>

<span class="chat-role-badge {variant}">
	<Icon name={icon} size={14} />
	{label}
	{#if toolName}<span class="tool-name">{toolName}</span>{/if}
</span>

<style>
	.chat-role-badge {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-xxs);
		font-size: var(--font-size-xs);
		font-weight: 600;
	}

	.chat-role-badge.user {
		color: var(--color-on-primary);
		opacity: 0.9;
	}

	.chat-role-badge.assistant {
		color: var(--color-primary);
	}

	.chat-role-badge.tool {
		color: var(--color-success);
	}

	.chat-role-badge.error {
		color: var(--color-error);
	}

	.chat-role-badge.system {
		color: var(--color-primary);
	}

	.tool-name {
		font-weight: 400;
		opacity: 0.8;
	}
</style>
