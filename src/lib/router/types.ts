/** Optional metadata associated with a registered route. */
export interface RouteMetadata {
	/**
	 * Title displayed in the navbar when this route is active.
	 * Accepts a string (resolved once) or a getter (resolved at read time,
	 * so it stays in sync with the current locale).
	 */
	title?: string | (() => string);
	/** Identifier of the corresponding module/page */
	moduleName?: string;
	/** Visual icon (emoji or name) used in the side menu */
	icon?: string;
	/** If true, the route appears in the side menu (Sidenav). Defaults to false — only explicitly registered routes are shown. */
	showInMenu?: boolean;
}

export type RouteHandler = (params: Record<string, string>) => void;

/** Complete state of a route — useful for grouping everything together in the App */
export interface RouteState {
	currentPage: string;
	routeParams: Record<string, string>;
	/** Resolved title (string). */
	title: string;
	/** Raw title as registered (may be a getter for locale reactivity). */
	rawTitle?: string | (() => string);
	path: string;
	moduleName?: string;
}

export interface Route extends RouteMetadata {
	pattern: string; // e.g.: "/people/14/contact/3/edit"
	handler: RouteHandler;
	regex: RegExp;
	keys: string[];
}
