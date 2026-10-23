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
		<rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
	{/snippet}
	{#snippet secondary()}
		<line x1="1" y1="10" x2="23" y2="10" />
	{/snippet}
</IconSvg>
