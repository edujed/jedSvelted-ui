<script lang="ts">
	import Panel from './Panel.svelte';
	import Button from '../ui/Button.svelte';
	import { LOCALES, localeStore } from '../i18n';
	import type { SearchPanelProps } from './containerTypes';

	let {
		title,
		onSearch = () => {},
		onClear = () => {},
		isOpen = $bindable(true),
		children,
		autofocusAfter = 0
	}: SearchPanelProps = $props();

	const resolvedTitle = $derived(title ?? LOCALES[$localeStore].search);

	// Foco programático no primeiro campo após refresh (autofocusAfter)
	let panelEl: HTMLDivElement | undefined = $state();
	let lastToken = 0;
	$effect(() => {
		if (!autofocusAfter || autofocusAfter === lastToken) return;
		lastToken = autofocusAfter;
		// Usa rAF + timeout para garantir que o DOM está renderizado
		requestAnimationFrame(() => {
			setTimeout(() => {
				const input = panelEl?.querySelector('input, select, textarea');
				input?.focus();
			}, 50);
		});
	});
</script>

<div bind:this={panelEl}>
	<Panel title={resolvedTitle} iconName="filter" {isOpen}>
	<div class="search-fields grid">
		{@render children?.()}
	</div>

	<div class="search-actions">
		<Button variant="search" size="md" icon="search" iconSize={14} iconPrimaryColor="var(--color-on-primary)" iconSecondaryColor="var(--color-on-accent)" onclick={onSearch}
			>{LOCALES[$localeStore].search}</Button
		>
		<Button variant="clear" size="md" icon="x" iconSize={14} onclick={onClear}
			>{LOCALES[$localeStore].clear}</Button
		>
	</div>
	</Panel>
</div>

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
