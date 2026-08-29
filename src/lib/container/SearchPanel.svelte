<script lang="ts">
	import type { Snippet } from 'svelte';
	import Panel from './Panel.svelte';

	let {
		title = 'Search',
		onSearch = () => {},
		onClear = () => {},
		isOpen = $bindable(true),
		children
	}: {
		title?: string;
		onSearch?: () => void;
		onClear?: () => void;
		isOpen?: boolean;
		children?: Snippet;
	} = $props();
</script>

<Panel {title} iconName="filter" {isOpen}>
	<div class="search-fields grid">
		{@render children?.()}
	</div>

	<div class="search-actions">
		<button class="btn btn-search" onclick={onSearch}>
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="btn-icon">
				<circle cx="11" cy="11" r="8" />
				<line x1="21" y1="21" x2="16.65" y2="16.65" />
			</svg>
			Search
		</button>
		<button class="btn btn-clear" onclick={onClear}>
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="btn-icon">
				<line x1="18" y1="6" x2="6" y2="18" />
				<line x1="6" y1="6" x2="18" y2="18" />
			</svg>
			Clear
		</button>
	</div>
</Panel>

<style>
	.search-fields {
		margin-bottom: var(--spacing-md);
	}

	.search-actions {
		display: flex;
		gap: var(--spacing-sm);
		justify-content: flex-end;
	}

	.btn-icon {
		width: 16px;
		height: 16px;
	}
</style>
