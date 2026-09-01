import type { Route, RouteHandler, RouteMetadata, RouteState } from './types';

export class HashRouter {
	private routes: Route[] = [];
	private _pendingNavigate?: string;
	private _isEmitting = false; // evita reentrada quando popstate + hashchange colidem
	private currentPath = '';
	private listeners: (() => void)[] = [];
	private registeredEvents: Set<string> = new Set();

	// Propriedades públicas expostas ao template — atualizadas em cada emit().
	public path = '';
	public params: Record<string, string> = {};
	public title = '';

	/**
	 * Registra uma rota com parâmetros nomeados e metadados opcionais.
	 * @param pattern   Padrão de rota (ex: "/users/:id")
	 * @param handler   Callback executado ao navegar para essa rota
	 * @param options   Metadados opcionais (title, moduleName)
	 */
	add(pattern: string, handler: RouteHandler, options: RouteMetadata = {}): void {
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
			keys,
			...options
		});
	}

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
		// Prioriza hash cru do DOM como fonte única de verdade.
		// _pendingNavigate existe só para casos onde o hash ainda não chegou
		// ao ambiente (ex: JSDOM). Em produção real, o hash sempre vence.
		let path = window.location.hash.slice(1);
		if (!path && this._pendingNavigate) {
			path = this._pendingNavigate;
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
		if (this._isEmitting) return; // protege contra reentrada
		try {
			this._isEmitting = true;
			this.doEmit();
		} finally {
			this._isEmitting = false;
		}
	}

	private doEmit(): void {
		console.log('[Router.emit()] START, currentPath:', this.currentPath);
		// Resolve a rota atual antes de emitir
    this.resolve();


    /*
		const path = this.getCurrentPath();
		this.currentPath = path;
    // console.log('[Router.emit()]', 'path:', path, 'routes.length:', this.routes.length);
		// Chama o handler da rota matched
		let found = false;
		for (const route of this.routes) {
			const match = path.match(route.regex);
			if (match) {
				found = true;
				const params: Record<string, string> = {};
				route.keys.forEach((key, i) => {
					params[key] = match[i + 1] ?? '';
				});
				// Exponha os valores públicos para consumo externo
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

		// Chama listeners sempre, independente se uma rota foi encontrada
		this.listeners.forEach((fn) => console.log('calling:', fn, fn()));
	}

	private register(event: string) {
		// Evita duplicação se init() é chamado múltiplas vezes (ex: HMR)
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

		// Tenta resolver imediatamente ao carregar
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
	 * Resolve o moduleName da página atual baseado nas rotas registradas.
	 * Útil para carregamento condicional de componentes/páginas.
	 */
  public getRouteByName(path?: string) : Route | undefined {
    const p = path ?? this.getCurrentPath();
		for (const route of this.routes)
      if (route.regex.test(p))
        return route;
    return undefined;
	}

	/**
	 * Retorna os itens do menu derivados das rotas registradas.
	 * Filtra automaticamente rotas marcadas como não-mostráveis no menu.
	 * Cada item inclui pattern limpo, título e ícone se disponível.
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
	 * Retorna o estado atual da aplicação como um único objeto.
	 * Útil para centralizar a inicialização e atualização do estado no App.
	 */
  public getState(): RouteState {
    const path = this.getPath();
    const route = this.getRouteByName();

    const result: RouteState = {
      path,
      paginaAtual: route?.moduleName || 'home',
      title: route?.title || '',
      moduleName: route?.moduleName,
      rotaParams: this.resolve() ?? {}
    }
    console.log('getState: ', JSON.stringify(result));
    return result;
		}
}
