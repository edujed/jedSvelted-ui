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
		<rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
	</g>
	<g stroke={secondaryColor}>
		<path d="M7 11V7a5 5 0 0 1 10 0v4" />
	</g>
</svg>

<style>
	svg {
		display: block;
	}
</style>
