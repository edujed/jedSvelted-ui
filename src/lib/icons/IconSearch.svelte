<script lang="ts">
	import type { IconProps } from './iconsTypes';

	let {
		size = 16,
		class
: className = '',
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
		<circle cx="11" cy="11" r="8" />
	</g>
	<g stroke={secondaryColor} stroke-width="3">
		<line x1="21" y1="21" x2="16.65" y2="16.65" />
	</g>
</svg>

<style>
	svg {
		display: block;
	}
</style>
