<script lang="ts">
	import ChatRoleBadge from './ChatRoleBadge.svelte';
	import ChatMsgActions from './ChatMsgActions.svelte';
	import Badge from '../ui/Badge.svelte';
	import { LOCALES, localeStore } from '../i18n';
	import type { ChatMessageProps } from './chatTypes';

	let { msg, renderContent, onFork, onDelete, index }: ChatMessageProps = $props();

	let contentHtml = $derived.by(() => {
		if (msg.textHtml) return msg.textHtml;
		if (renderContent) return renderContent(msg);
		return msg.content || '';
	});

	let thoughtHtml = $derived.by(() => {
		if (!msg.thoughtContent) return '';
		if (renderContent) return renderContent({ ...msg, content: msg.thoughtContent });
		return msg.thoughtContent;
	});

	const t = $derived(LOCALES[$localeStore]);

	const roleIcon = $derived(
		msg.role === 'assistant' || msg.role === 'user'
			? ('user' as const)
			: msg.role === 'error'
				? ('x' as const)
				: ('settings' as const)
	);
</script>

<div class="chat-msg {msg.role}">
	<div class="chat-msg-header">
		<ChatRoleBadge
			icon={roleIcon}
			label={t[msg.role]}
			variant={msg.role}
			toolName={msg.toolName}
		/>
		<ChatMsgActions {onFork} {onDelete} {index} forkLabel={t.fork} deleteLabel={t.delete} />
	</div>

	{#if msg.role === 'assistant' && msg.thoughtContent}
		<details class="chat-thought" open={true}>
			<summary class="chat-thought-summary">
				💭 {t.thought}
				{#if msg.isStreaming}
					<span class="thinking-dots">
						<span class="dot"></span>
						<span class="dot"></span>
						<span class="dot"></span>
					</span>
				{/if}
			</summary>
			<div class="chat-thought-content">
				{@html thoughtHtml}
			</div>
		</details>
	{/if}

	{#if msg.role === 'user' && msg.attachedFiles && msg.attachedFiles.length > 0}
		<div class="chat-attached">
			{#each msg.attachedFiles as file (file)}
				<Badge variant="secondary">{file}</Badge>
			{/each}
		</div>
	{/if}

	<div class="chat-msg-content">
		{#if msg.role === 'assistant' && msg.isStreaming}
			{#if msg.textHtml}
				{@html msg.textHtml}
			{:else}
				<span class="streaming-cursor">|</span>
			{/if}
		{:else}
			{@html contentHtml}
		{/if}
	</div>

	{#if msg.role === 'assistant' && msg.metrics}
		<div class="chat-metrics">
			{#if msg.metrics.total_tokens}
				<span>📊 {msg.metrics.total_tokens} tokens</span>
			{/if}
			{#if msg.metrics.total_time_ms}
				<span>⏱️ {(msg.metrics.total_time_ms / 1000).toFixed(1)}s</span>
			{/if}
			{#if msg.metrics.token_speed}
				<span>🚀 {msg.metrics.token_speed.toFixed(1)} tok/s</span>
			{/if}
		</div>
	{/if}
</div>

<style>
	.chat-msg {
		max-width: 85%;
		padding: var(--spacing-sm) var(--spacing-md);
		border-radius: var(--radius-md);
		line-height: 1.5;
		font-size: var(--font-size-base);
	}

	.chat-msg.user {
		align-self: flex-end;
		background: var(--color-primary);
		color: var(--color-on-primary);
	}

	.chat-msg.assistant {
		align-self: flex-start;
		background: var(--color-card-bg);
		border: 1px solid var(--color-border);
		color: var(--color-on-surface);
	}

	.chat-msg.tool {
		align-self: flex-start;
		background: color-mix(in srgb, var(--color-success) 10%, var(--color-surface));
		border: 1px solid var(--color-success);
		color: var(--color-on-surface);
	}

	.chat-msg.error {
		align-self: flex-start;
		background: color-mix(in srgb, var(--color-error) 10%, var(--color-surface));
		border: 1px solid var(--color-error);
		color: var(--color-on-surface);
	}

	.chat-msg.system {
		align-self: center;
		background: color-mix(in srgb, var(--color-primary) 8%, var(--color-surface));
		border: 1px dashed var(--color-border);
		color: var(--color-on-surface);
		text-align: center;
		opacity: 0.85;
		font-size: var(--font-size-sm);
	}

	.chat-msg-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--spacing-xs);
		gap: var(--spacing-xs);
	}

	.chat-attached {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-xs);
		margin-bottom: var(--spacing-xs);
	}

	.chat-msg-content {
		word-break: break-word;
	}

	.chat-msg-content :global(p) {
		margin: 0 0 var(--spacing-xs);
	}

	.chat-msg-content :global(p:last-child) {
		margin-bottom: 0;
	}

	.chat-msg-content :global(pre) {
		background: color-mix(in srgb, var(--color-on-surface) 8%, transparent);
		padding: var(--spacing-sm);
		border-radius: var(--radius-sm);
		overflow-x: auto;
		font-size: var(--font-size-sm);
	}

	.chat-msg-content :global(code) {
		font-family: 'JetBrains Mono', 'Fira Code', monospace;
		font-size: 0.9em;
	}

	.chat-msg-content :global(:not(pre) > code) {
		background: color-mix(in srgb, var(--color-on-surface) 8%, transparent);
		padding: 0.1em 0.3em;
		border-radius: var(--radius-sm);
	}

	.chat-msg-content :global(ul),
	.chat-msg-content :global(ol) {
		margin: var(--spacing-xs) 0;
		padding-left: var(--spacing-md);
	}

	.chat-msg-content :global(a) {
		color: var(--color-primary);
	}

	.chat-metrics {
		margin-top: var(--spacing-sm);
		padding-top: var(--spacing-xs);
		border-top: 1px solid var(--color-border);
		font-size: var(--font-size-xs);
		opacity: 0.7;
		display: flex;
		gap: var(--spacing-sm);
		flex-wrap: wrap;
	}

	.chat-thought {
		margin-bottom: var(--spacing-sm);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		overflow: hidden;
	}

	.chat-thought-summary {
		padding: var(--spacing-xs) var(--spacing-sm);
		background: color-mix(in srgb, var(--color-primary-light) 50%, var(--color-surface));
		cursor: pointer;
		font-size: var(--font-size-xs);
		color: var(--color-primary);
		font-weight: 600;
		user-select: none;
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
	}

	.chat-thought-summary:hover {
		background: var(--color-primary-light);
	}

	.chat-thought-content {
		padding: var(--spacing-sm);
		font-size: var(--font-size-sm);
		color: var(--color-on-surface);
		opacity: 0.8;
		max-height: 300px;
		overflow-y: auto;
	}

	.thinking-dots {
		display: inline-flex;
		gap: 3px;
		margin-left: var(--spacing-xs);
		vertical-align: middle;
	}

	.dot {
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: var(--color-primary);
		animation: pulse 1.4s infinite ease-in-out;
	}

	.dot:nth-child(2) {
		animation-delay: 0.2s;
	}

	.dot:nth-child(3) {
		animation-delay: 0.4s;
	}

	@keyframes pulse {
		0%,
		80%,
		100% {
			opacity: 0.3;
			transform: scale(0.8);
		}
		40% {
			opacity: 1;
			transform: scale(1);
		}
	}

	.streaming-cursor {
		display: inline-block;
		width: 2px;
		height: 1em;
		background: var(--color-primary);
		animation: blink 1s step-end infinite;
		vertical-align: text-bottom;
		margin-left: 2px;
	}

	@keyframes blink {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
	}
</style>
