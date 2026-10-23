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

<IconSvg {size} class={className} {primaryColor} {secondaryColor} secondaryOpacity="0.3">
	<slot name="primary">
		<polyline points="6 9 12 15 18 9" />
	</slot>
	<slot name="secondary">
		<polyline points="6 15 12 9 18 15" />
	</slot>
</IconSvg>
