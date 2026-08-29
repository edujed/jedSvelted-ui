<script lang="ts">
	let { size = '24' }: { size?: string } = $props();
</script>

<svg
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	class="icon"
	style="width:{size};height:{size}"
>
	<circle cx="12" cy="12" r="10" />
</svg>

<style>
	.icon {
		display: block;
	}
</style>
