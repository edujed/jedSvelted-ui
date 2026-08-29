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
	<path d="M3 21h18" />
	<path d="M5 21V7l8-4 8 4v14" />
	<path d="M17 9h-4v4h-2v-4H7V9" />
	<path d="M9 12h2v2h-2z" />
	<path d="M13 12h2v2h-2z" />
</svg>

<style>
	svg {
		display: block;
	}
</style>
