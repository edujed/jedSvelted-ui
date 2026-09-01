/** Metadados opcionais associados a uma rota registrada. */
export interface RouteMetadata {
	/** Título exibido na navbar quando esta rota está ativa */
	title?: string;
	/** Identificador do módulo/página correspondente */
	moduleName?: string;
	/** Ícono visual (emoji ou nome) usado no menu lateral */
	icon?: string;
	/** Se true, a rota aparece no menu lateral (Sidenav). Por padrão é false — só registra explicitamente o que quer mostrar. */
	showInMenu?: boolean;
}

export type RouteHandler = (params: Record<string, string>) => void;

/** Estado completo de uma rota — útil para agrupar tudo junto ao App */
export interface RouteState {
	paginaAtual: string;
	rotaParams: Record<string, string>;
	title: string;
	path: string;
	moduleName?: string;
}

export interface Route extends RouteMetadata {
	pattern: string; // ex: "/Pessoas/14/Contato/3/edit"
	handler: RouteHandler;
	regex: RegExp;
	keys: string[];
}
