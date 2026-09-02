<script lang="ts">
	import type { Snippet } from 'svelte';
	import Panel from './Panel.svelte';
	import Button from '../ui/Button.svelte';

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
		<Button variant="search" size="md" icon="search" iconSize={14} onclick={onSearch}>Search</Button
		>
		<Button variant="clear" size="md" icon="x" iconSize={14} onclick={onClear}>Clear</Button>
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
</style>
