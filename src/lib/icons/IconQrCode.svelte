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
	<rect x="3" y="3" width="5" height="5" rx="1" />
	<rect x="16" y="3" width="5" height="5" rx="1" />
	<rect x="3" y="16" width="5" height="5" rx="1" />
	<rect x="16" y="16" width="2" height="2" />
	<rect x="20" y="16" width="2" height="2" />
	<rect x="16" y="20" width="2" height="2" />
	<rect x="20" y="20" width="2" height="2" />
	<rect x="12" y="12" width="2" height="2" />
	<rect x="12" y="16" width="2" height="2" />
	<rect x="12" y="20" width="2" height="2" />
	<rect x="16" y="12" width="2" height="2" />
</svg>

<style>
	svg {
		display: block;
	}
</style>
