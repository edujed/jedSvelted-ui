<script lang="ts">
	import type { IconProps } from './iconsTypes';

	/**
	 * Generic SVG wrapper shared by all icon components.
	 *
	 * Centralizes the `<svg>` element, its attributes, and the two color
	 * groups (`primary` / `secondary`). Individual icons only provide the
	 * path content via named slots.
	 *
	 * - `secondaryOpacity` is optional (used by `IconSort` for its faded
	 *   secondary group). When omitted, the secondary group renders at full
	 *   opacity.
	 */
	let {
		size = 16,
		class: className = '',
		primaryColor = 'var(--icon-color-primary, currentColor)',
		secondaryColor = 'var(--icon-color-accent, currentColor)',
		secondaryOpacity
	}: IconProps & { secondaryOpacity?: string } = $props();
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
		<slot name="primary" />
	</g>
	<g stroke={secondaryColor} {...secondaryOpacity ? { opacity: secondaryOpacity } : {}}>
		<slot name="secondary" />
	</g>
</svg>

<style>
	svg {
		display: block;
	}
</style>
