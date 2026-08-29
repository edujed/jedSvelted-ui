<script lang="ts">
	let {
		items
	}: {
		items: Array<{ label: string; value: string | number | undefined | null }>;
	} = $props();
</script>

<div class="info-grid">
	{#each items as item (item.label)}
		<div class="info-item">
			<span class="info-label">{item.label}</span>
			<span class="info-value">{item.value ?? '—'}</span>
		</div>
	{/each}
</div>
