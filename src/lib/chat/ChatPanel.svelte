<script lang="ts">
	import { fade } from 'svelte/transition';
	import Icon from '../icons/Icon.svelte';
	import ChevronDownIcon from '../icons/ChevronDownIcon.svelte';
	import ChatMessage from './ChatMessage.svelte';
	import { LOCALES, localeStore } from '../i18n';
	import type { ChatPanelProps } from './chatTypes';

	let {
		title = 'Chat',
		iconName = 'user',
		isOpen = $bindable(true),
		messages = [],
		loading = false,
		renderContent,
		onFork,
		onDelete,
		children,
		class: className = ''
	}: ChatPanelProps = $props();
</script>

<div class="chat-panel {className}">
	<button
		class="chat-panel-header"
		onclick={() => {
			isOpen = !isOpen;
		}}
	>
		<Icon name={iconName} class="chat-panel-icon" />
		<span class="chat-panel-title">{title}</span>
		<ChevronDownIcon class="chat-panel-chevron" />
	</button>

	{#if isOpen}
		<div class="chat-panel-body" in:fade={{ duration: 150 }} out:fade={{ duration: 150 }}>
			<div class="chat-messages">
				{#each messages as msg, i (i)}
					<ChatMessage {msg} {renderContent} {onFork} {onDelete} index={i} />
				{/each}

				{#if loading}
					<div class="chat-msg assistant loading">
						<span>⏳ {LOCALES[$localeStore].processing}</span>
					</div>
				{/if}
			</div>

			{#if children}
				<div class="chat-input-area">
					{@render children()}
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	.chat-panel {
		display: flex;
		flex-direction: column;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		box-shadow: var(--color-card-shadow);
		overflow: hidden;
		background: var(--color-surface);
		height: 100%;
	}

	.chat-panel-header {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		width: 100%;
		padding: var(--spacing-md);
		background: var(--color-primary-light);
		border: none;
		color: var(--color-primary);
		font-size: var(--font-size-sm);
		font-weight: 600;
		font-family: inherit;
		cursor: pointer;
		text-align: left;
		transition: background var(--transition-fast);
		flex-shrink: 0;
	}

	.chat-panel-header:hover {
		background: color-mix(in srgb, var(--color-primary-light) 85%, var(--color-primary) 15%);
	}

	.chat-panel-icon {
		width: 18px;
		height: 18px;
		color: var(--color-primary);
		flex-shrink: 0;
	}

	.chat-panel-title {
		flex: 1;
	}

	.chat-panel-chevron {
		width: 16px;
		height: 16px;
		color: var(--color-on-surface);
		opacity: 0.5;
		transition: transform var(--transition-fast);
		flex-shrink: 0;
	}

	.chat-panel-body {
		flex: 1;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.chat-messages {
		flex: 1;
		overflow-y: auto;
		padding: var(--spacing-md);
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}

	.chat-input-area {
		padding: var(--spacing-md);
		border-top: 1px solid var(--color-border);
		background: var(--color-surface);
		flex-shrink: 0;
	}
</style>
