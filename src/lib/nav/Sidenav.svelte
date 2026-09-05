<script lang="ts">
	import type { HashRouter, RouteState } from '../router';
	import type { MenuItem } from './types';
	import { IconX } from '../icons';
	import { LOCALES, localeStore } from '../i18n';

	let {
		title = 'DemoApp',
		logo = '💼',
		isOpen = false,
		onOverlayClick = () => {},
		router
	}: {
		title?: string;
		logo?: string;
		isOpen?: boolean;
		onOverlayClick?: () => void;
		router: HashRouter;
	} = $props();

	let routeState: RouteState = $derived(router?.getState() ?? {});
	let opened = $state(false);

	// Syncs local state with external prop.
	// $derived reactivity already listens to router changes — no manual listeners needed.
	$effect(() => {
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
		if (!opened || !routeState?.currentPage) return;
		requestAnimationFrame(() => {
			const activeItem = document.querySelector('.menu-item.active');
			activeItem?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
		});
	});

	function close(): void {
		opened = false;
		onOverlayClick();
	}

	/**
	 * Checks if a path matches a registered route,
	 * considering parameters and wildcards.
	 */
	function isRouteActive(pattern: string, currentPath: string): boolean {
		const cleanPattern = pattern.replace(/(\/:\w+\??)*$/g, ''); // removes params/wildcard from the end
		const normalizedCurrent =
			currentPath.endsWith('/') && currentPath !== '/' ? currentPath.slice(0, -1) : currentPath;
		return (
			normalizedCurrent.toLowerCase() === cleanPattern.toLowerCase() ||
			normalizedCurrent.toLowerCase().startsWith(cleanPattern.toLowerCase() + '/')
		);
	}

	/**
	 * Cleans route patterns by removing segments with parameters (:id) and wildcards (*).
	 * Example: "/users/:id/posts" → "/users"
	 */
	function cleanPattern(pattern: string): string {
		return pattern
			.replace(/(\/:\w+\??|\*)/g, '')
			.replace(/\/+(?!$)/g, '/')
			.slice(0, 1) === '/'
			? pattern
			: pattern.startsWith('/')
				? pattern
				: '/' + pattern;
	}

	const menuItems = $derived.by((): MenuItem[] => {
		// Read $localeStore so this derived re-evaluates on locale change
		// (route titles may be getters that resolve via the locale store).
		const _locale = $localeStore;
		if (!router?.registeredRoutes.length) return [];
		return router.registeredRoutes.map((r): MenuItem => {
			const resolvedTitle = typeof r.title === 'function' ? r.title() : (r.title ?? '');
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

{#if opened}
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
