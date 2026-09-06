<script lang="ts">
	import Icon from '../icons/Icon.svelte';
	import Badge from '../ui/Badge.svelte';
	import type { ChatMessageType } from './ChatPanel.svelte';

	let {
		msg,
		renderContent,
		onFork,
		onDelete,
		index
	}: {
		msg: ChatMessageType;
		renderContent?: (msg: ChatMessageType) => string;
		onFork?: (index: number) => void;
		onDelete?: (index: number) => void;
		index: number;
	} = $props();

	// Derived para garantir reatividade
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

	const roleLabels: Record<string, string> = {
		user: 'Usuário',
		assistant: 'Assistente',
		tool: 'Ferramenta',
		error: 'Erro'
	};
</script>

{#if msg.role === 'assistant'}
	<div class="chat-msg assistant">
		<div class="chat-msg-header">
			<span class="chat-role-badge assistant">
				<Icon name="user" size={14} />
				{roleLabels.assistant}
			</span>
			<div class="chat-msg-actions">
				{#if onFork}
					<button class="chat-action-btn" title="Fork" onclick={() => onFork(index)}>
						<Icon name="more" size={14} />
					</button>
				{/if}
				{#if onDelete}
					<button class="chat-action-btn" title="Excluir" onclick={() => onDelete(index)}>
						<Icon name="trash" size={14} />
					</button>
				{/if}
			</div>
		</div>

		{#if msg.thoughtContent}
			<details class="chat-thought" open={true}>
				<summary class="chat-thought-summary">
					💭 Pensamento
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

		<div class="chat-msg-content">
			{#if msg.isStreaming}
				{#if msg.textHtml}
					{@html msg.textHtml}
				{:else}
					<span class="streaming-cursor">|</span>
				{/if}
			{:else}
				{@html contentHtml}
			{/if}
		</div>

		{#if msg.metrics}
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
{:else if msg.role === 'tool'}
	<div class="chat-msg tool">
		<div class="chat-msg-header">
			<span class="chat-role-badge tool">
				<Icon name="settings" size={14} />
				{roleLabels.tool}
				{#if msg.toolName}<span class="tool-name">{msg.toolName}</span>{/if}
			</span>
		</div>
		<div class="chat-msg-content">
			{@html contentHtml}
		</div>
	</div>
{:else if msg.role === 'error'}
	<div class="chat-msg error">
		<div class="chat-msg-header">
			<span class="chat-role-badge error">
				<Icon name="x" size={14} />
				{roleLabels.error}
			</span>
		</div>
		<div class="chat-msg-content">
			{@html contentHtml}
		</div>
	</div>
{:else}
	<div class="chat-msg user">
		<div class="chat-msg-header">
			<span class="chat-role-badge user">
				<Icon name="user" size={14} />
				{roleLabels.user}
			</span>
			<div class="chat-msg-actions">
				{#if onFork}
					<button class="chat-action-btn" title="Fork" onclick={() => onFork(index)}>
						<Icon name="more" size={14} />
					</button>
				{/if}
				{#if onDelete}
					<button class="chat-action-btn" title="Excluir" onclick={() => onDelete(index)}>
						<Icon name="trash" size={14} />
					</button>
				{/if}
			</div>
		</div>
		{#if msg.attachedFiles && msg.attachedFiles.length > 0}
			<div class="chat-attached">
				{#each msg.attachedFiles as file (file)}
					<Badge variant="secondary">{file}</Badge>
				{/each}
			</div>
		{/if}
		<div class="chat-msg-content">
			{@html contentHtml}
		</div>
	</div>
{/if}

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

	.chat-msg-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--spacing-xs);
		gap: var(--spacing-xs);
	}

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

	.tool-name {
		font-weight: 400;
		opacity: 0.8;
	}

	.chat-msg-actions {
		display: flex;
		gap: var(--spacing-xxs);
	}

	.chat-action-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: none;
		border: none;
		color: inherit;
		opacity: 0.5;
		cursor: pointer;
		padding: var(--spacing-xxs);
		border-radius: var(--radius-sm);
		transition:
			opacity var(--transition-fast),
			background var(--transition-fast);
	}

	.chat-action-btn:hover {
		opacity: 1;
		background: color-mix(in srgb, currentColor 10%, transparent);
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
