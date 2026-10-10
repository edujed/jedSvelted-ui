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
		<polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
	</g>
	<g stroke={secondaryColor}>
		<line x1="8" y1="2" x2="8" y2="18" />
		<line x1="16" y1="6" x2="16" y2="22" />
	</g>
</svg>

<style>
	svg {
		display: block;
	}
</style>
