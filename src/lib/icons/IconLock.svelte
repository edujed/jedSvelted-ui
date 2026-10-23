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
		<rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
	</slot>
	<slot name="secondary">
		<path d="M7 11V7a5 5 0 0 1 10 0v4" />
	</slot>
</IconSvg>
