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
	<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
	<circle cx="12" cy="7" r="4" />
</svg>
