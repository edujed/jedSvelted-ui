/** Types shared between the router and navigation components. */

export interface RegisteredRouteItem {
	/** Original route pattern (e.g.: "/users/:id") */
	pattern: string;
	/** Title displayed in the menu */
	title?: string;
	/** Identifier of the corresponding module/page */
	moduleName?: string;
	/** Optional icon for rendering in the menu */
	icon?: string;
}

export interface MenuItem extends RegisteredRouteItem {
	path: string; // clean version of the pattern (no parameters/wildcard)
	label: string;
}
