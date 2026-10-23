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
		<rect x="3" y="3" width="5" height="5" rx="1" />
		<rect x="16" y="3" width="5" height="5" rx="1" />
		<rect x="3" y="16" width="5" height="5" rx="1" />
	{/snippet}
	{#snippet secondary()}
		<rect x="16" y="16" width="2" height="2" />
		<rect x="20" y="16" width="2" height="2" />
		<rect x="16" y="20" width="2" height="2" />
		<rect x="20" y="20" width="2" height="2" />
		<rect x="12" y="12" width="2" height="2" />
		<rect x="12" y="16" width="2" height="2" />
		<rect x="12" y="20" width="2" height="2" />
		<rect x="16" y="12" width="2" height="2" />
	{/snippet}
</IconSvg>
