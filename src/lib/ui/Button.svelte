<script lang="ts">
	import Icon from '../icons/Icon.svelte';
	import type { ButtonProps } from './uiTypes';

	let {
		variant = 'primary',
		size = 'md',
		icon,
		iconPosition = 'left',
		iconSize = 16,
		iconPrimaryColor,
		iconSecondaryColor,
		disabled = false,
		class: className = '',
		children,
		...restProps
	}: ButtonProps = $props();
</script>

<button class="btn btn-{variant} btn-{size} {className}" {disabled} {...restProps}>
	{#if icon && iconPosition === 'left'}
		<Icon
			name={icon}
			size={iconSize}
			class="btn-icon"
			{...iconPrimaryColor !== undefined ? { primaryColor: iconPrimaryColor } : {}}
			{...iconSecondaryColor !== undefined ? { secondaryColor: iconSecondaryColor } : {}}
		/>
	{/if}
	{@render children?.()}
	{#if icon && iconPosition === 'right'}
		<Icon
			name={icon}
			size={iconSize}
			class="btn-icon"
			{...iconPrimaryColor !== undefined ? { primaryColor: iconPrimaryColor } : {}}
			{...iconSecondaryColor !== undefined ? { secondaryColor: iconSecondaryColor } : {}}
		/>
	{/if}
</button>
