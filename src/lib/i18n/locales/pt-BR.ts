import type { Messages } from '../i18n';

/** Brazilian Portuguese messages. */
const ptBR: Messages = {
	// Common actions
	save: 'Salvar',
	cancel: 'Cancelar',
	delete: 'Excluir',
	edit: 'Editar',
	view: 'Visualizar',
	search: 'Buscar',
	clear: 'Limpar',
	close: 'Fechar',
	add: 'Adicionar',
	loading: 'Carregando...',
	empty: 'Nada para exibir.',

	// Table
	exportCsv: 'Exportar CSV',
	csv: 'CSV',
	addNewRecord: 'Adicionar novo registro',
	sort: 'Ordenar',
	filter: 'Filtrar...',
	actions: 'Ações',
	rows: '{count} linha(s)',

	// CRUD panel titles
	viewTitle: 'Visualizar {entity}',
	editTitle: 'Editar {entity}',
	newTitle: 'Novo {entity}',
	deleteTitle: 'Excluir {entity}',
	viewDetails: 'Ver detalhes',

	// Delete confirmation
	confirmDeletion: 'Confirmar Exclusão',
	deleteMessage: 'Tem certeza de que deseja excluir este registro?',
	deleteWarning: 'Esta ação não pode ser desfeita.',

	// Toast labels
	toastSuccess: 'Sucesso',
	toastError: 'Erro',
	toastInfo: 'Info',
	toastWarning: 'Aviso',

	// Navigation
	mainNav: 'Barra de navegação principal',
	openSideMenu: 'Abrir menu lateral',
	quickSearch: 'Busca rápida (AI Agent)...',
	lightMode: 'Modo claro',
	darkMode: 'Modo escuro',
	navigationMenu: 'Menu de navegação',
	closeMenu: 'Fechar menu',

	// Theme
	theme: 'Tema',

	// Form fields
	selectPlaceholder: 'Selecione...',

	// Toast messages (handleDetailAction)
	itemDeleted: '{item} "{value}" excluído',
	itemUpdated: '{item} "{value}" atualizado com sucesso',
	itemCreated: '{item} "{value}" criado com sucesso'
};

export default ptBR;
