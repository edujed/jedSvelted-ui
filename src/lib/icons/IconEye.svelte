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
	<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
	<circle cx="12" cy="12" r="3" />
</svg>

<style>
	svg {
		display: block;
	}
</style>
