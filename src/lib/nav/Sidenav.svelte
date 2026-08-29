<script lang="ts">
	import { HashRouter } from '../router';
	import type { MenuGroup } from './menuConfig';

	let {
		isOpen = false,
		onOverlayClick = () => {},
		menuConfig = [] as unknown as MenuGroup[],
		router
	}: {
		isOpen?: boolean;
		onOverlayClick?: () => void;
		menuConfig?: MenuGroup[];
		router: HashRouter;
	} = $props();

	let opened = $state(false);

	$effect(() => {
		if (isOpen && !opened) {
			opened = true;
		}
	});

	function fechar(): void {
		opened = false;
		onOverlayClick();
	}

	const menuItems = $derived.by(() => menuConfig);

	function navegar(path: string): void {
		if (router) router.navigate(path);
		fechar();
	}
</script>

{#if opened}
	<div class="sidenav-overlay" role="presentation" onclick={fechar}>
		<div class="sidenav" role="dialog" aria-label="Navigation menu">
			<div class="sidenav-header">
				<span
					role="link"
					tabindex="0"
					class="sidenav-brand"
					onclick={() => navegar('/')}
					onkeydown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') navegar('/');
					}}
				>
					<span class="sidenav-logo">💼</span>
					<span class="sidenav-title">Financeiro</span>
				</span>
				<button class="sidenav-close" aria-label="Close menu" onclick={fechar}>
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<line x1="18" y1="6" x2="6" y2="18" />
						<line x1="6" y1="6" x2="18" y2="18" />
					</svg>
				</button>
			</div>

			<nav class="sidenav-content">
				{#each menuItems as group (group.group)}
					<div class="menu-group">
						<h3 class="menu-group-title">{group.group}</h3>
						<ul class="menu-list">
							{#each group.items as item (item.path)}
								<li>
									<a
										class="menu-item"
										href="#{item.path}"
										onclick={(e) => {
											e.preventDefault();
											navegar(item.path);
										}}
									>
										<span class="menu-icon">{item.icon}</span>
										<span class="menu-label">{item.label}</span>
									</a>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
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

	.sidenav-close svg {
		width: 18px;
		height: 18px;
	}

	.sidenav-content {
		flex: 1;
		overflow-y: auto;
		padding: var(--spacing-sm) 0;
		-webkit-overflow-scrolling: touch;
	}

	.menu-group {
		margin-bottom: var(--spacing-sm);
	}

	.menu-group-title {
		font-size: var(--font-size-xs);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-on-surface);
		opacity: 0.6;
		padding: var(--spacing-sm) var(--spacing-md);
		margin: 0;
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
