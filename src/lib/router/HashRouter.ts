import type { Route, RouteHandler, RouteMetadata, RouteState } from './types';

export class HashRouter {
	private routes: Route[] = [];
	private _pendingNavigate?: string;
	private _isEmitting = false; // prevents re-entry when popstate + hashchange collide
	private currentPath = '';
	private listeners: (() => void)[] = [];
	private registeredEvents: Set<string> = new Set();

	// Public properties exposed to the template — updated on every emit().
	public path = '';
	public params: Record<string, string> = {};
	public title = '';

	/**
	 * Registers a route with named parameters and optional metadata.
	 * @param pattern   Route pattern (e.g.: "/users/:id")
	 * @param handler   Callback executed when navigating to this route
	 * @param options   Optional metadata (title, moduleName)
	 */
	add(pattern: string, handler: RouteHandler, options: RouteMetadata = {}): void {
		const keys: string[] = [];
		let regexSource = pattern;
		// 1) Optional parameters :param?
		regexSource = regexSource.replace(/:(\w+)\?/g, (match, key) => {
			keys.push(key);
			return '__OPT__';
		});
		// 2) Required parameters :param
		regexSource = regexSource.replace(/:(\w+)/g, (match, key) => {
			keys.push(key);
			return '__REQ__';
		});
		// 3) Wildcard *
		regexSource = regexSource.replace(/\*/g, '__WILD__');
		// 4) Convert markers to regex
		regexSource = regexSource
			.replace(/__OPT__/g, '(?:\\/([^/]*))?') // entire optional /:param segment
			.replace(/__REQ__/g, '([^/]+)') // param value
			.replace(/__WILD__/g, '(.*)'); // wildcard

		this.routes.push({
			pattern,
			handler,
			regex: new RegExp(`^${regexSource}$`, 'i'),
			keys,
			...options
		});
	}

	/** Navigates to a path. */
	navigate(path: string): void {
		const currentHash = window.location.hash.slice(1);
		if (currentHash !== path) {
			// Store destination before changing hash — so emit() always uses the latest value.
			this._pendingNavigate = path;
			try {
				window.location.hash = path;
			} catch (e) {
				console.warn('[HashRouter] Failed to set hash:', e);
			}
			// Manually trigger handler and listeners — necessary because programmatic
			// navigation may not fire 'hashchange' in JSDOM.
			this.emit();
		}
	}

	/** Gets the current path without the leading '#'. */
	getCurrentPath(): string {
		// Prioritizes the raw DOM hash as the single source of truth.
		// _pendingNavigate exists only for cases where the hash hasn't reached
		// the environment yet (e.g.: JSDOM). In real production, the hash always wins.
		let path = window.location.hash.slice(1);
		if (!path && this._pendingNavigate) {
			path = this._pendingNavigate;
		}
		// Normalize: removes trailing slash (except root "/")
		return path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
	}

	/** Resolves the current path against registered routes. */
	resolve(): Record<string, string> | null {
		const path = this.getCurrentPath();
		this.currentPath = path;

		for (const route of this.routes) {
			const match = path.match(route.regex);
			if (match) {
				const params: Record<string, string> = {};
				route.keys.forEach((key, i) => {
					params[key] = match[i + 1] ?? '';
				});
				return params;
			}
		}

		return null;
	}

	/** Registers a change listener for route changes. */
	addRouterListener(listener: () => void): void {
		if (!this.listeners.includes(listener)) {
			this.listeners.push(listener);
		}
	}

	/** Removes a previously registered router listener. */
	removeRouterListener(listener: () => void): void {
		const idx = this.listeners.indexOf(listener);
		if (idx !== -1) this.listeners.splice(idx, 1);
	}

	/** Triggers all listeners and the matched route's handler. */
	private emit(): void {
		if (this._isEmitting) return; // guards against re-entry
		try {
			this._isEmitting = true;
			this.doEmit();
		} finally {
			this._isEmitting = false;
		}
	}

	private doEmit(): void {
		console.log('[Router.emit()] START, currentPath:', this.currentPath);
		// Resolve the current route before emitting
		this.resolve();

		/*
		const path = this.getCurrentPath();
		this.currentPath = path;
    // console.log('[Router.emit()]', 'path:', path, 'routes.length:', this.routes.length);
		// Calls the handler of the matched route
		let found = false;
		for (const route of this.routes) {
			const match = path.match(route.regex);
			if (match) {
				found = true;
				const params: Record<string, string> = {};
				route.keys.forEach((key, i) => {
					params[key] = match[i + 1] ?? '';
				});
				// Exposes the public values for external consumption
				this.path = path;
				this.params = params;
				this.title = route.title || '';

				console.log(
					'[Router.emit()] MATCHED',
					'pattern:',
					route.pattern,
					'keys:',
					route.keys,
					'params:',
					JSON.stringify(params)
				);
				route.handler(params);
				break;
			}
		}
		*/

		// Always calls listeners, regardless of whether a route was found
		this.listeners.forEach((fn) => console.log('calling:', fn, fn()));
	}

	private register(event: string) {
		// Avoids duplication if init() is called multiple times (e.g.: HMR)
		if (this.registeredEvents.has(event)) return;
		this.registeredEvents.add(event);

		try {
			window.addEventListener(event, () => {
				console.log('[Router.init()] ' + event + ' fired');
				this.emit();
			});
		} catch (e) {
			console.warn('[HashRouter] Failed to add ' + event + ' listener:', e);
		}
	}

	/** Initializes the router and listens for hash changes. */
	init(): void {
		this.register('hashchange');
		this.register('popstate');

		// Tries to resolve immediately on load
		const initialPath = this.getCurrentPath();
		console.log('[Router.init()] initialPath:', initialPath);
		if (initialPath && initialPath !== '/') {
			window.history.pushState({}, '', `#${initialPath}`);
		}
		this.emit();
	}

	/** Returns the current path string. */
	getPath(): string {
		return this.currentPath || '';
	}

	/**
	 * Resolves the moduleName of the current page based on registered routes.
	 * Useful for conditional loading of components/pages.
	 */
	public getRouteByName(path?: string): Route | undefined {
		const p = path ?? this.getCurrentPath();
		for (const route of this.routes) if (route.regex.test(p)) return route;
		return undefined;
	}

	/**
	 * Returns menu items derived from registered routes.
	 * Automatically filters routes marked as not shown in the menu.
	 * Each item includes the clean pattern, title, and icon if available.
	 */
	public get registeredRoutes(): ReadonlyArray<{
		pattern: string;
		title?: string;
		moduleName?: string;
		icon?: string;
	}> {
		return this.routes
			.filter((r) => !(r as { showInMenu?: boolean })?.showInMenu === false)
			.map((r) => ({
				pattern: r.pattern,
				title: r.title,
				moduleName: r.moduleName,
				icon: (r as { icon?: string }).icon
			}));
	}

	/**
	 * Returns the current application state as a single object.
	 * Useful for centralizing state initialization and updates in the App.
	 */
	public getState(): RouteState {
		const path = this.getPath();
		const route = this.getRouteByName();

		const result: RouteState = {
			path,
			currentPage: route?.moduleName || 'home',
			title: route?.title || '',
			moduleName: route?.moduleName,
			routeParams: this.resolve() ?? {}
		};
		console.log('getState: ', JSON.stringify(result));
		return result;
	}
}
