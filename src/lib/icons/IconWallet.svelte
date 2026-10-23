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
		<rect x="2" y="5" width="20" height="14" rx="2" />
	{/snippet}
	{#snippet secondary()}
		<line x1="2" y1="10" x2="22" y2="10" />
	{/snippet}
</IconSvg>
