/**
 * Shared types for navigation components.
 *
 * `RegisteredRouteItem` mirrors the shape of `HashRouter.registeredRoutes`
 * (see `router/HashRouter.ts`), and `MenuItem` is the resolved, renderable
 * form used by `Sidenav`.
 */
import type { HashRouter, RegisteredRouteItem } from '../router';

/**
 * A route as exposed by `HashRouter.registeredRoutes`.
 * Note: `title` may be a getter (for locale reactivity) — consumers should
 * resolve it before rendering.
 *
 * Re-exported from `router` (the source of truth) for convenience — nav
 * consumers can import it from either barrel.
 */
export type { RegisteredRouteItem };

/**
 * A resolved menu item ready to render (title/label already resolved to strings).
 */
export interface MenuItem extends RegisteredRouteItem {
	/** Clean version of the pattern (no parameters/wildcard). */
	path: string;
	/** Resolved label (same as the resolved title). */
	label: string;
}

/**
 * Props for `Navbar` — the top bar wrapper (delegates to `Topbar`).
 */
export interface NavbarProps {
	/** Router instance (drives the dynamic title). */
	router?: HashRouter;
	/** Called when the hamburger button is clicked. */
	onMenuClick?: () => void;
}

/**
 * Props for `Topbar` — the top bar (search, title, language/theme selectors).
 */
export interface TopbarProps {
	/** Title displayed in the center. */
	title?: string;
	/** Show the quick search input. */
	showQuickSearch?: boolean;
	/** Show the hamburger button. */
	showHamburguer?: boolean;
	/** Called when the hamburger button is clicked. */
	onMenuClick?: () => void;
	/** Called on every keystroke in the quick search input. */
	onSearch?: (value: string) => void;
	/** Called on keydown in the quick search input. */
	onSearchKeydown?: (event: KeyboardEvent) => void;
}

/**
 * Props for `Sidenav` — the slide-in navigation menu (overlay).
 */
export interface SidenavProps {
	/** Application title shown in the menu header. */
	title?: string;
	/** Logo (emoji or short text) shown next to the title. */
	logo?: string;
	/** Whether the menu is open (controlled by the parent). */
	isOpen?: boolean;
	/** Called when the overlay is clicked (to close the menu). */
	onOverlayClick?: () => void;
	/** Router instance (drives the menu items and active state). */
	router: HashRouter;
}
