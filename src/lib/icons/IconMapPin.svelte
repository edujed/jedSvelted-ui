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
		<path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
	</g>
	<g stroke={secondaryColor}>
		<path d="M22 12A10 10 0 0 0 12 2v10z" />
	</g>
</svg>

<style>
	svg {
		display: block;
	}
</style>
