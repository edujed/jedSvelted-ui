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
		<circle cx="11" cy="11" r="8" />
	{/snippet}
	{#snippet secondary()}
		<line x1="21" y1="21" x2="16.65" y2="16.65" />
	{/snippet}
</IconSvg>
