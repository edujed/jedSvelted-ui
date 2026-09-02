<script lang="ts">
	let { size = 16, class: className = '' }: { size?: number; class?: string } = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	width={size}
	height={size}
	class={className}
>
	<line x1="3" y1="6" x2="21" y2="6" />
	<line x1="3" y1="12" x2="21" y2="12" />
	<line x1="3" y1="18" x2="21" y2="18" />
</svg>

<style>
	svg {
		display: block;
	}
</style>
