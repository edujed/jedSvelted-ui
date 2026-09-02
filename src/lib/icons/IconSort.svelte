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
	<polyline points="6 9 12 15 18 9" />
	<polyline points="6 15 12 9 18 15" opacity="0.3" />
</svg>

<style>
	svg {
		display: block;
	}
</style>
