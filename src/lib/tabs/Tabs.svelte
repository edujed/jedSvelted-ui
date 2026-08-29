<script lang="ts">
	import { Tabs } from 'bits-ui';
	import type { Snippet } from 'svelte';

	let {
		tabs = [],
		activeTab = $bindable(),
		children,
		tabContent
	}: {
		tabs?: Array<{ value: string; label: string }>;
		activeTab?: string;
		children?: Snippet;
		tabContent?: Snippet<[string]>;
	} = $props();

	let internalAtiva = $state('');
	let currentValue = $derived(activeTab ?? internalAtiva);

	$effect(() => {
		if (activeTab === undefined && tabs.length > 0 && !internalAtiva) {
			internalAtiva = tabs[0].value;
		}
	});

	function handleValueChange(newValue: string): void {
		if (activeTab !== undefined) {
			activeTab = newValue;
		} else {
			internalAtiva = newValue;
		}
	}
</script>

<Tabs.Root value={currentValue} onValueChange={handleValueChange} class="ui-tabs">
	<Tabs.List class="ui-tabs-list">
		{#each tabs as tab (tab.value)}
			<Tabs.Trigger value={tab.value} class="ui-tabs-btn">
				{tab.label}
			</Tabs.Trigger>
		{/each}
	</Tabs.List>

	<div class="ui-tabs-content">
		{@render tabContent?.(currentValue)}
		{@render children?.()}
	</div>
</Tabs.Root>
