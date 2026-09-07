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
	<path d="M12 22v-7" />
	<path d="M9 9 5 13h14l-4-4" />
	<path d="M12 2 7 7h10l-5-5z" />
</svg>

<style>
	svg {
		display: block;
	}
</style>
