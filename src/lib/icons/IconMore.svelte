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
	<circle cx="12" cy="12" r="1" />
	<circle cx="12" cy="5" r="1" />
	<circle cx="12" cy="19" r="1" />
</svg>

<style>
	svg {
		display: block;
	}
</style>
