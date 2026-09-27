<script lang="ts">
	import type { RouteState } from '../router';
	import type { MenuItem, SidenavProps } from './navTypes';
	import { cleanPattern, isRouteActive } from './navUtils';
	import { IconX } from '../icons';
	import { LOCALES, localeStore } from '../i18n';

	let {
		title = 'DemoApp',
		logo = '💼',
		isOpen = false,
		onOverlayClick = () => {},
		router,
		mode = 'overlay',
		footer
	}: SidenavProps = $props();

	// Local snapshot of the route state, kept in sync via a router listener
	// (mirrors the demo-app pattern) — a plain $derived would not re-evaluate
	// on hash changes, leaving the active item stale.
	let routeState: RouteState = $state(router?.getState() ?? {});
	$effect(() => {
		if (!router) return;
		const listener = () => {
			routeState = router.getState();
		};
		router.addRouterListener(listener);
		return () => router.removeRouterListener(listener);
	});
	let opened = $state(false);

	// In fixed mode the menu is always visible; in overlay mode it follows `isOpen`.
	const visible = $derived(mode === 'fixed' || opened);

	// Syncs local state with external prop (overlay mode only).
	// $derived reactivity already listens to router changes — no manual listeners needed.
	$effect(() => {
		if (mode === 'fixed') return;
		if (isOpen && !opened) opened = true;
		else if (!isOpen && opened) close();
	});

	let currentPage = $derived(routeState?.currentPage || '');

	/**
	 * Auto-scroll to the active item:
	 * - When the menu is opened
	 * - When the current module changes (e.g.: navigating between pages)
	 */
	$effect(() => {
		if (!visible || !routeState?.currentPage) return;
		requestAnimationFrame(() => {
			const activeItem = document.querySelector('.menu-item.active');
			activeItem?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
		});
	});

	function close(): void {
		if (mode === 'fixed') return;
		opened = false;
		onOverlayClick();
	}

	const menuItems = $derived.by((): MenuItem[] => {
		// Read $localeStore so this derived re-evaluates on locale change
		// (route titles may be getters that resolve via the locale store).
		void $localeStore;
		// Read routeState so this derived re-evaluates on every route change —
		// registeredRoutes is a plain class property (non-reactive), so without
		// this the list would stay stale when routes are registered after mount.
		void routeState;
		const items = router?.registeredRoutes ?? [];
		if (!items.length) return [];
		return items.map((r): MenuItem => {
			const resolvedTitle = router.resolveTitle(r.title);
			return {
				pattern: r.pattern,
				path: r.pattern === '/' ? '/' : cleanPattern(r.pattern),
				title: resolvedTitle,
				moduleName: r.moduleName,
				label: resolvedTitle,
				icon: r.icon ?? ''
			};
		});
	});

	function navigate(path: string): void {
		router?.navigate(path);
		close();
	}
</script>

{#if visible}
	{#if mode === 'fixed'}
		<aside class="sidenav sidenav-fixed" aria-label={LOCALES[$localeStore].navigationMenu}>
			<div class="sidenav-header">
				<span
					role="link"
					tabindex="0"
					class="sidenav-brand"
					onclick={() => navigate('/')}
					onkeydown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') navigate('/');
					}}
				>
					<span class="sidenav-logo">{logo}</span>
					<span class="sidenav-title">{title}</span>
				</span>
			</div>

			<nav class="sidenav-content">
				<ul class="menu-list">
					{#each menuItems as item, i (i)}
						<li>
							<a
								class={'menu-item' + (isRouteActive(item.path, currentPage) ? ' active' : '')}
								href="#{item.path}"
								onclick={(e) => {
									e.preventDefault();
									navigate(item.path);
								}}
							>
								<span class="menu-icon">{item.icon}</span>
								<span class="menu-label">{item.label}</span>
							</a>
						</li>
					{/each}
				</ul>
			</nav>

			{#if footer}
				<div class="sidenav-footer">
					{@render footer()}
				</div>
			{/if}
		</aside>
	{:else}
		<div class="sidenav-overlay" role="presentation" onclick={close}>
			<div class="sidenav" role="dialog" aria-label={LOCALES[$localeStore].navigationMenu}>
				<div class="sidenav-header">
					<span
						role="link"
						tabindex="0"
						class="sidenav-brand"
						onclick={() => navigate('/')}
						onkeydown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') navigate('/');
						}}
					>
						<span class="sidenav-logo">{logo}</span>
						<span class="sidenav-title">{title}</span>
					</span>
					<button class="sidenav-close" aria-label={LOCALES[$localeStore].closeMenu} onclick={close}>
						<IconX size={18} />
					</button>
				</div>

				<nav class="sidenav-content">
					<ul class="menu-list">
						{#each menuItems as item, i (i)}
							<li>
								<a
									class={'menu-item' + (isRouteActive(item.path, currentPage) ? ' active' : '')}
									href="#{item.path}"
									onclick={(e) => {
										e.preventDefault();
										navigate(item.path);
								}}
								>
									<span class="menu-icon">{item.icon}</span>
									<span class="menu-label">{item.label}</span>
								</a>
							</li>
						{/each}
					</ul>
				</nav>
			</div>
		</div>
	{/if}
{/if}

<style>
	.sidenav-overlay {
		position: fixed;
		inset: 0;
		background: var(--color-overlay);
		z-index: 90;
		animation: fadeIn 0.2s ease;
	}

	.sidenav {
		position: fixed;
		top: 0;
		left: 0;
		width: var(--sidenav-width);
		height: 100vh;
		background: var(--color-sidenav-bg);
		color: var(--color-on-surface);
		z-index: 100;
		display: flex;
		flex-direction: column;
		box-shadow: 4px 0 16px var(--color-shadow);
		animation: slideIn 0.3s ease;
		overflow: hidden;
	}

	/* Fixed mode: always-visible sidebar (no slide-in, no shadow).
	   Uses static positioning so it occupies space in the layout flow
	   (the parent Layout uses flexbox) instead of floating over content. */
	.sidenav-fixed {
		position: static;
		animation: none;
		box-shadow: none;
		border-right: 1px solid var(--color-border);
		height: 100vh;
		flex-shrink: 0;
	}

	.sidenav-footer {
		padding: var(--spacing-md);
		border-top: 1px solid var(--color-border);
		flex-shrink: 0;
	}

	.sidenav-brand {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		flex: 1;
		color: inherit;
		cursor: pointer;
		padding: calc(var(--spacing-xs) / 2) 0;
		margin-left: calc(-1 * var(--spacing-xs));
		border-radius: var(--radius-sm);
		transition: background var(--transition-fast);
	}
	.sidenav-brand:hover,
	.sidenav-brand:focus-visible {
		outline: none;
		background: var(--color-sidenav-hover);
	}

	.sidenav-header {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		padding: var(--spacing-md);
		border-bottom: 1px solid var(--color-border);
		flex-shrink: 0;
	}

	.sidenav-logo {
		font-size: 1.5rem;
	}

	.sidenav-title {
		flex: 1;
		font-size: var(--font-size-lg);
		font-weight: 700;
		color: var(--color-primary);
	}

	.sidenav-close {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		background: transparent;
		border: none;
		color: var(--color-on-surface);
		cursor: pointer;
		border-radius: var(--radius-sm);
		transition: background var(--transition-fast);
	}

	.sidenav-close:hover {
		background: var(--color-sidenav-hover);
	}

	.sidenav-content {
		flex: 1;
		overflow-y: auto;
		padding: var(--spacing-sm) 0;
		-webkit-overflow-scrolling: touch;
	}

	.menu-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.menu-item {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		padding: var(--spacing-sm) var(--spacing-md);
		color: var(--color-on-surface);
		text-decoration: none;
		font-size: var(--font-size-sm);
		transition: background var(--transition-fast);
		border-radius: 0;
	}

	.menu-item:hover {
		background: var(--color-sidenav-hover);
	}

	.menu-item.active {
		background: color-mix(in srgb, var(--color-primary) 15%, transparent);
		border-left: 3px solid var(--color-primary);
		padding-left: calc(var(--spacing-md) - 3px);
		font-weight: 600;
	}

	.menu-icon {
		font-size: 1.1rem;
		width: 24px;
		text-align: center;
		flex-shrink: 0;
	}

	.menu-label {
		flex: 1;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes slideIn {
		from {
			transform: translateX(-100%);
		}
		to {
			transform: translateX(0);
		}
	}
</style>
