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
	<rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
	<line x1="1" y1="10" x2="23" y2="10" />
</svg>

<style>
	svg {
		display: block;
	}
</style>
