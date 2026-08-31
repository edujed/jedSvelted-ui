/** Tipos compartilhados entre router e componentes de navegação. */

export interface RegisteredRouteItem {
	/** Padrão original da rota (ex: "/users/:id") */
	pattern: string;
	/** Título exibido no menu */
	title?: string;
	/** Identificador do módulo/página correspondente */
	moduleName?: string;
	/** Ícone opcional para renderização no menu */
	icon?: string;
}

export interface MenuItem extends RegisteredRouteItem {
	path: string; // versão limpa do pattern (sem parâmetros/wildcard)
	label: string;
}
