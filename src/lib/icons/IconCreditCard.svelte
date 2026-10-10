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
		<rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
	</g>
	<g stroke={secondaryColor}>
		<line x1="1" y1="10" x2="23" y2="10" />
	</g>
</svg>

<style>
	svg {
		display: block;
	}
</style>
