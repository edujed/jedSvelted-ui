<script lang="ts">
	import IconSvg from './IconSvg.svelte';
	import type { IconProps } from './iconsTypes';

	let {
		size = 16,
		class: className = '',
		primaryColor = 'var(--icon-color-primary, currentColor)',
		secondaryColor = 'var(--icon-color-accent, currentColor)'
	}: IconProps = $props();
</script>

<IconSvg {size} class={className} {primaryColor} {secondaryColor}>
	<slot name="primary">
		<path d="M3 11V9a4 4 0 0 1 4-4h14" />
		<path d="M21 13v2a4 4 0 0 1-4 4H3" />
	</slot>
	<slot name="secondary">
		<polyline points="17 1 21 5 17 9" />
		<polyline points="7 23 3 19 7 15" />
	</slot>
</IconSvg>
