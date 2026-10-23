<script lang="ts">
	import { ICON_MAP } from './iconMap';
	import IconEye from './IconEye.svelte';
	import type { IconName, IconProps } from './iconsTypes';

	let {
		name = 'eye',
		size = 16,
		class: className = '',
		primaryColor = 'var(--icon-color-primary, currentColor)',
		secondaryColor = 'var(--icon-color-accent, currentColor)'
	}: IconProps & { name?: IconName } = $props();

	// Selects the icon component based on the name
	const IconComponent = $derived(ICON_MAP[name] ?? IconEye);
</script>

<IconComponent {size} class={className} {primaryColor} {secondaryColor} />

<style>
	:global(svg) {
		display: block;
	}
</style>
