<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { IconProps } from './iconsTypes';

	/**
	 * Generic SVG wrapper shared by all icon components.
	 *
	 * Centralizes the `<svg>` element, its attributes, and the two color
	 * groups (`primary` / `secondary`). Individual icons only provide the
	 * path content via named snippets.
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
		secondaryOpacity,
		primary,
		secondary
	}: IconProps & {
		secondaryOpacity?: string;
		primary?: Snippet;
		secondary?: Snippet;
	} = $props();
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
		{@render primary?.()}
	</g>
	<g stroke={secondaryColor} {...secondaryOpacity ? { opacity: secondaryOpacity } : {}}>
		{@render secondary?.()}
	</g>
</svg>

<style>
	svg {
		display: block;
	}
</style>
