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
}
