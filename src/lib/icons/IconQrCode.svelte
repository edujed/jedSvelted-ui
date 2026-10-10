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
		<rect x="3" y="3" width="5" height="5" rx="1" />
		<rect x="16" y="3" width="5" height="5" rx="1" />
		<rect x="3" y="16" width="5" height="5" rx="1" />
	</g>
	<g stroke={secondaryColor}>
		<rect x="16" y="16" width="2" height="2" />
		<rect x="20" y="16" width="2" height="2" />
		<rect x="16" y="20" width="2" height="2" />
		<rect x="20" y="20" width="2" height="2" />
		<rect x="12" y="12" width="2" height="2" />
		<rect x="12" y="16" width="2" height="2" />
		<rect x="12" y="20" width="2" height="2" />
		<rect x="16" y="12" width="2" height="2" />
	</g>
</svg>

<style>
	svg {
		display: block;
	}
</style>
