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
	<path d="M4 21V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16" />
	<path d="M2 21h20" />
	<path d="M9 7h1" />
	<path d="M14 7h1" />
	<path d="M9 11h1" />
	<path d="M14 11h1" />
	<path d="M9 15h1" />
	<path d="M14 15h1" />
</svg>

<style>
	svg {
		display: block;
	}
</style>
