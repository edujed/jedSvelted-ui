<script lang="ts">
	import type { Snippet } from 'svelte';
	import Panel from './Panel.svelte';
	import Button from '../ui/Button.svelte';
	import { LOCALES, localeStore } from '../i18n';

	let {
		title,
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

	const resolvedTitle = $derived(title ?? LOCALES[$localeStore].search);
</script>

<Panel title={resolvedTitle} iconName="filter" {isOpen}>
	<div class="search-fields grid">
		{@render children?.()}
	</div>

	<div class="search-actions">
		<Button variant="search" size="md" icon="search" iconSize={14} onclick={onSearch}
			>{LOCALES[$localeStore].search}</Button
		>
		<Button variant="clear" size="md" icon="x" iconSize={14} onclick={onClear}
			>{LOCALES[$localeStore].clear}</Button
		>
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
