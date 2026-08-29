/**
 * Centralized route configuration.
 * SINGLE source of truth for route definitions — adding a new module requires just one line here.
 */

export interface RouteConfig {
	/** Padrão de rota (suporta ":param" e "*") */
	pattern: string;
	/** Module name used for conditional rendering */
	moduleName: string;
	/** Título exibido na navbar */
	title: string;
}

/**
 * Route map array — single source of truth.
 * Add a new route by simply inserting an object into this array.
 */

/**
 * Mapa de rotas — 1 fonte de verdade
 * Adicionar nova rota: basta inserir um objeto neste array
 */
export const ROUTE_MAP: RouteConfig[] = [
	{ pattern: '/', moduleName: 'home', title: 'Home' }
] as const;

/**
 * Resolves the moduleName based on a given path.
 */
export function resolveModuleName(path: string): string {
	const lower = path.toLowerCase().replace(/\/$/, ''); // remove trailing slash
	for (const route of ROUTE_MAP) {
		const pattern = route.pattern.toLowerCase();
		if (pattern.endsWith('*')) {
			const withoutStar = pattern.slice(0, -1);
			// Strip trailing :param segments and optional trailing slash
			const prefix = withoutStar.replace(/(\/:\w+\??)*\/?$/, '');
			if (lower === prefix || lower.startsWith(prefix + '/')) {
				return route.moduleName;
			}
		} else {
			// Strip params from end: /pessoas/:id → /pessoas
			const prefix = pattern.replace(/(\/:\w+\??)*$/, '');
			if (lower === prefix || lower.startsWith(prefix + '/')) {
				return route.moduleName;
			}
		}
	}
	return 'home';
}
