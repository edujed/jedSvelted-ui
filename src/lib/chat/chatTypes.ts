import type { Snippet } from 'svelte';
import type { IconName } from '../icons';

export type ChatMessageRole = 'user' | 'assistant' | 'system' | 'tool' | 'error';

export interface ChatMessageType {
	role: ChatMessageRole;
	content: string;
	attachedFiles?: string[];
	metrics?: {
		prompt_tokens?: number;
		completion_tokens?: number;
		total_tokens?: number;
		total_time_ms?: number;
		token_speed?: number;
	};
	isStreaming?: boolean;
	thoughtContent?: string;
	textHtml?: string;
	toolName?: string;
}

export interface ChatPanelProps {
	/** Panel title. */
	title?: string;
	/** Icon name for the header. */
	iconName?: IconName;
	/** Whether the panel is open (collapsible). */
	isOpen?: boolean;
	/** Chat messages to render. */
	messages?: ChatMessageType[];
	/** Show loading indicator. */
	loading?: boolean;
	/** Custom content renderer. Receives the message, returns HTML string. */
	renderContent?: (msg: ChatMessageType) => string;
	/** Called when fork button is clicked. */
	onFork?: (index: number) => void;
	/** Called when delete button is clicked. */
	onDelete?: (index: number) => void;
	/** Custom input area (rendered below messages). */
	children?: Snippet;
	/** Extra classes. */
	class?: string;
}

export interface ChatMessageProps {
	msg: ChatMessageType;
	renderContent?: (msg: ChatMessageType) => string;
	onFork?: (index: number) => void;
	onDelete?: (index: number) => void;
	index: number;
}
