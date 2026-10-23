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
		<path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
	</slot>
	<slot name="secondary">
		<path d="M22 12A10 10 0 0 0 12 2v10z" />
	</slot>
</IconSvg>
