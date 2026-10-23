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
		<path d="M4 21V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16" />
		<path d="M2 21h20" />
	{/snippet}
	{#snippet secondary()}
		<path d="M9 7h1" />
		<path d="M14 7h1" />
		<path d="M9 11h1" />
		<path d="M14 11h1" />
		<path d="M9 15h1" />
		<path d="M14 15h1" />
	{/snippet}
</IconSvg>
