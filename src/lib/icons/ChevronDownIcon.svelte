<script lang="ts">
	let { size = '24' }: { size?: string } = $props();
</script>

<svg
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	class="chevron-down-icon"
	style="width:{size};height:{size}"
>
	<path d="M6 9l6 6 6-6" />
</svg>

<style>
	svg {
		display: block;
	}
</style>
