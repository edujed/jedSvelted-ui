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
	{#snippet primary()}
		<ellipse cx="12" cy="5" rx="9" ry="3" />
		<path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
		<path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
	{/snippet}
</IconSvg>
