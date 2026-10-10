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
		<path d="M12 22v-7" />
	</g>
	<g stroke={secondaryColor}>
		<path d="M9 9 5 13h14l-4-4" />
		<path d="M12 2 7 7h10l-5-5z" />
	</g>
</svg>

<style>
	svg {
		display: block;
	}
</style>
