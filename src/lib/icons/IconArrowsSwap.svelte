<script lang="ts">
	import type { IconProps } from './iconsTypes';

	let {
		size = 16,
		class: className = '',
		primaryColor = 'var(--icon-color-primary, currentColor)',
		secondaryColor = 'var(--icon-color-accent, currentColor)'
	}: IconProps = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 24 24"
	fill="none"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	width={size}
	height={size}
	class={className}
>
	<g stroke={primaryColor}>
		<path d="M3 11V9a4 4 0 0 1 4-4h14" />
		<path d="M21 13v2a4 4 0 0 1-4 4H3" />
	</g>
	<g stroke={secondaryColor}>
		<polyline points="17 1 21 5 17 9" />
		<polyline points="7 23 3 19 7 15" />
	</g>
</svg>

<style>
	svg {
		display: block;
	}
</style>
