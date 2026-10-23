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
		<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
	{/snippet}
	{#snippet secondary()}
		<circle cx="12" cy="12" r="3" />
	{/snippet}
</IconSvg>
