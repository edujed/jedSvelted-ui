<script lang="ts">
	import { ContextMenu } from 'bits-ui';
	import Icon from '../icons/Icon.svelte';
	import type { IconName } from '../icons';
	import type { ActionMenuItem, ActionMenuProps } from './uiTypes';

	let {
		label = '',
		icon = 'more',
		items = [] as ActionMenuItem[],
		side = 'bottom',
		align = 'end',
		sideOffset = 4,
		subSide = 'right',
		subAlign = 'start',
		subSideOffset = 4,
		class: className = '',
		onSelect,
		trigger,
		children,
		open = $bindable(false)
	}: ActionMenuProps = $props();

	/** Icon per item (fallback to 'file' if not specified). */
	function itemIcon(item: ActionMenuItem): IconName {
		return item.icon ?? 'file';
	}

	/** Whether an item has sub-items (submenu). */
	function hasSubItems(item: ActionMenuItem): boolean {
		return !!item.subItems && item.subItems.length > 0;
	}

	/** Handle item selection. */
	function handleSelect(item: ActionMenuItem): void {
		onSelect?.(item);
	}

	/**
	 * The ContextMenu.Trigger uses a virtual element anchored at {x: 0, y: 0}
	 * that is only updated on `contextmenu` (right-click). For left-click
	 * support we capture the pointer position on `pointerdown` and, after the
	 * menu opens (via `onclick`), we update the virtual element in the next
	 * animation frame so the floating content repositions to the click point.
	 */
	let lastClickPoint: { x: number; y: number } | null = null;

	function handlePointerDown(e: PointerEvent): void {
		if (e.button !== 0) return;
		lastClickPoint = { x: e.clientX, y: e.clientY };
	}

	function handleClick(e: MouseEvent): void {
		if (e.button !== 0) return;
		e.preventDefault();
		open = !open;
		// After the menu opens, update the virtual element so the
		// floating content repositions to the click location.
		if (open && lastClickPoint) {
			requestAnimationFrame(() => {
				const triggerEl = document.querySelector('[data-context-menu-trigger]');
				if (!triggerEl) return;
				// The virtual element is stored on the trigger's Svelte component.
				// We access it via the element's __svelte_meta or by dispatching
				// a synthetic contextmenu event with the captured coordinates.
				const syntheticEvent = new MouseEvent('contextmenu', {
					bubbles: true,
					cancelable: true,
					clientX: lastClickPoint!.x,
					clientY: lastClickPoint!.y
				});
				triggerEl.dispatchEvent(syntheticEvent);
			});
		}
	}
</script>

<ContextMenu.Root bind:open>
	{#if trigger}
		<ContextMenu.Trigger
			class="btn btn-secondary btn-sm action-menu-trigger {className}"
			onpointerdown={handlePointerDown}
			onclick={handleClick}
		>
			{@render trigger()}
		</ContextMenu.Trigger>
	{:else}
		<ContextMenu.Trigger
			class="btn btn-secondary btn-sm action-menu-trigger {className}"
			onpointerdown={handlePointerDown}
			onclick={handleClick}
		>
			{#if icon}
				<Icon name={icon} size={14} class="action-menu-icon" />
			{/if}
			{#if label}
				<span class="action-menu-label">{label}</span>
			{/if}
		</ContextMenu.Trigger>
	{/if}

	<ContextMenu.Content
		class="action-menu-content"
		{side}
		{align}
		{sideOffset}
	>
		{#if children}
			{@render children()}
		{:else}
			{#each items as item (item.value)}
				{#if hasSubItems(item)}
					<ContextMenu.Sub>
						<ContextMenu.SubTrigger class="action-menu-item">
							<Icon name={itemIcon(item)} size={16} class="action-menu-item-icon" />
							<span class="action-menu-item-text">{item.label}</span>
							<Icon name="chevron-right" size={14} class="action-menu-item-chevron" />
						</ContextMenu.SubTrigger>
						<ContextMenu.SubContent
							class="action-menu-content action-menu-sub"
							side={subSide}
							align={subAlign}
							sideOffset={subSideOffset}
						>
							{#each item.subItems as subItem (subItem.value)}
								<ContextMenu.Item
									class="action-menu-item"
									onselect={() => handleSelect(subItem)}
								>
									{#if subItem.icon}
										<Icon name={subItem.icon} size={16} class="action-menu-item-icon" />
									{/if}
									<span class="action-menu-item-text">{subItem.label}</span>
								</ContextMenu.Item>
							{/each}
						</ContextMenu.SubContent>
					</ContextMenu.Sub>
				{:else}
					<ContextMenu.Item
						class="action-menu-item"
						onselect={() => handleSelect(item)}
					>
						<Icon name={itemIcon(item)} size={16} class="action-menu-item-icon" />
						<span class="action-menu-item-text">{item.label}</span>
					</ContextMenu.Item>
				{/if}
			{/each}
		{/if}
	</ContextMenu.Content>
</ContextMenu.Root>

<style>
	.action-menu-trigger {
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-xs);
		padding: var(--spacing-xs) var(--spacing-sm);
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		color: var(--color-on-surface);
		font-size: var(--font-size-sm);
		font-family: inherit;
		cursor: pointer;
		transition: all var(--transition-fast);
	}

	.action-menu-trigger:hover {
		background: var(--color-sidenav-hover);
		border-color: var(--color-primary);
		color: var(--color-primary);
	}

	.action-menu-icon {
		flex-shrink: 0;
		color: var(--color-primary);
		opacity: 0.8;
	}

	.action-menu-trigger:hover .action-menu-icon {
		opacity: 1;
	}

	.action-menu-label {
		font-weight: 500;
	}

	/* ContextMenu.Content/SubContent/Item are rendered via portal (outside this
	   component's DOM subtree), so scoped selectors never match. Use :global(). */
	:global(.action-menu-content) {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		box-shadow: 0 4px 20px var(--color-shadow);
		padding: var(--spacing-xs);
		min-width: 180px;
		z-index: 100;
	}

	:global(.action-menu-item) {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		width: 100%;
		padding: var(--spacing-sm) var(--spacing-md);
		background: none;
		border: none;
		border-radius: var(--radius-sm);
		color: var(--color-on-surface);
		font-size: var(--font-size-sm);
		font-family: inherit;
		cursor: pointer;
		text-align: left;
		transition: all var(--transition-fast);
	}

	:global(.action-menu-item:hover) {
		background: var(--color-sidenav-hover);
		color: var(--color-primary);
	}

	:global(.action-menu-item-icon) {
		flex-shrink: 0;
		color: var(--color-primary);
		opacity: 0.8;
		transition: all var(--transition-fast);
	}

	:global(.action-menu-item:hover .action-menu-item-icon) {
		opacity: 1;
		color: var(--color-primary);
	}

	:global(.action-menu-item-text) {
		flex: 1;
	}

	:global(.action-menu-item-chevron) {
		flex-shrink: 0;
		color: var(--color-on-surface);
		opacity: 0.5;
	}

	:global(.action-menu-item:hover .action-menu-item-chevron) {
		opacity: 1;
		color: var(--color-primary);
	}
</style>
