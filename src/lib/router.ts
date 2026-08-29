/**
 * Hash-based router simples para Svelte 5 (sem SvelteKit)
 * Suporta rotas aninhadas: /Pessoas/14/Contato/3/edit
 */

type RouteHandler = (params: Record<string, string>) => void;

interface Route {
	pattern: string; // ex: "/Pessoas/:id/Contato/:cid/edit"
	handler: RouteHandler;
	regex: RegExp;
	keys: string[];
}

export class HashRouter {
	private routes: Route[] = [];
	private currentPath = '';
	private listeners: (() => void)[] = [];

	/** Registers a route with named parameters. */
	add(pattern: string, handler: RouteHandler): void {
		const keys: string[] = [];
		let regexSource = pattern;
		// 1) Parâmetros opcionais :param?
		regexSource = regexSource.replace(/:(\w+)\?/g, (match, key) => {
			keys.push(key);
			return '__OPT__';
		});
		// 2) Parâmetros obrigatórios :param
		regexSource = regexSource.replace(/:(\w+)/g, (match, key) => {
			keys.push(key);
			return '__REQ__';
		});
		// 3) Wildcard *
		regexSource = regexSource.replace(/\*/g, '__WILD__');
		// 4) Converter marcadores para regex
		regexSource = regexSource
			.replace(/__OPT__/g, '(?:\\/([^/]*))?') // segmento /:param opcional inteiro
			.replace(/__REQ__/g, '([^/]+)') // valor do param
			.replace(/__WILD__/g, '(.*)'); // wildcard

		this.routes.push({
			pattern,
			handler,
			regex: new RegExp(`^${regexSource}$`, 'i'),
			keys
		});
	}

	private _pendingNavigate?: string;

	/** Navigates to a path. */
	navigate(path: string): void {
		const currentHash = window.location.hash.slice(1);
		if (currentHash !== path) {
			// Guarda destino antes de mudar hash — assim emit() sempre usa o valor mais recente.
			this._pendingNavigate = path;
			try {
				window.location.hash = path;
			} catch (e) {
				console.warn('[HashRouter] Failed to set hash:', e);
			}
			// Dispara manualmente o handler e listeners — necessário pois navegação
			// programática pode não disparar 'hashchange' no JSDOM.
			this.emit();
		}
	}

	/** Gets the current path without the leading '#'. */
	getCurrentPath(): string {
		// Prioriza destino pendente se houver — evita problemas quando hashchange
		// ainda não propagou ao ambiente (ex: JSDOM).
		let path = this._pendingNavigate ?? '';
		if (!path) {
			const hash = window.location.hash.slice(1);
			path = hash || '';
		}
		// Normaliza: removes trailing slash (except root "/")
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
	onRouteChange(listener: () => void): void {
		this.listeners.push(listener);
	}

	/** Triggers all listeners and the matched route's handler. */
	private emit(): void {
		// Resolve a rota atual antes de emitir
		const path = this.getCurrentPath();
		this.currentPath = path;

		// Chama o handler da rota matched
		let found = false;
		for (const route of this.routes) {
			const match = path.match(route.regex);
			if (match) {
				const params: Record<string, string> = {};
				route.keys.forEach((key, i) => {
					params[key] = match[i + 1] ?? '';
				});
				route.handler(params);
				found = true;
				break;
			}
		}
		// Chama listeners sempre, independente se uma rota foi encontrada
		this.listeners.forEach((fn) => fn());
	}

	/** Initializes the router and listens for hash changes. */
	init(): void {
		const handleHashChange = () => {
			this.emit();
		};

		try {
			window.addEventListener('hashchange', handleHashChange);
		} catch (e) {
			console.warn('[HashRouter] Failed to add hashchange listener:', e);
		}
		// Também reage a mudanças manuais na barra de URL (pushState/replaceState)
		try {
			window.addEventListener('popstate', handleHashChange);
		} catch (e) {
			console.warn('[HashRouter] Failed to add popstate listener:', e);
		}

		// Tenta resolver imediatamente ao carregar
		const initialPath = this.getCurrentPath();
		if (initialPath && initialPath !== '/') {
			window.history.pushState({}, '', `#${initialPath}`);
		}

		this.emit();
	}

	/** Returns the current path string. */
	getPath(): string {
		return this.currentPath || '';
	}

	// Clears all internal state — useful for test isolation.
	_resetForTests(): void {
		this.routes = [];
		this.listeners = [];
		this._pendingNavigate = undefined;
		this.currentPath = '';
	}
}

export const router = new HashRouter();
