/**
 * Props for `Layout` — the app shell (sidenav + navbar + content).
 */
import type { Snippet } from 'svelte';
import type { HashRouter } from './HashRouter';

export interface LayoutProps {
	/** Router instance (drives the sidenav menu and navbar title). */
	router?: HashRouter;
	/** Main content. */
	children?: Snippet;
	/**
	 * Sidenav display mode:
	 * - 'overlay' (default): slide-in panel with backdrop (mobile-first).
	 * - 'fixed': always-visible sidebar.
	 */
	sidenavMode?: 'overlay' | 'fixed';
	/** Title shown in the sidenav header (defaults to 'DemoApp'). */
	sidenavTitle?: string;
	/** Logo (emoji or short text) shown in the sidenav header. */
	sidenavLogo?: string;
	/** Extra content rendered at the bottom of the sidenav. */
	sidenavFooter?: Snippet;
}
