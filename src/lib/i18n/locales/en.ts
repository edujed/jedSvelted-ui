/**
 * English messages — the source of truth for the message keys.
 * Other locales must provide every key defined here (enforced by the
 * `Messages` type in i18n.ts).
 */
export default {
	// Common actions
	save: 'Save',
	cancel: 'Cancel',
	delete: 'Delete',
	edit: 'Edit',
	view: 'View',
	search: 'Search',
	clear: 'Clear',
	close: 'Close',
	add: 'Add',
	loading: 'Loading...',
	empty: 'Nothing to display.',

	// Table
	exportCsv: 'Export CSV',
	csv: 'CSV',
	addNewRecord: 'Add new record',
	sort: 'Sort',
	filter: 'Filter...',
	actions: 'Actions',
	rows: '{count} row(s)',

	// CRUD panel titles
	viewTitle: 'View {entity}',
	editTitle: 'Edit {entity}',
	newTitle: 'New {entity}',
	deleteTitle: 'Delete {entity}',
	viewDetails: 'View details',

	// Delete confirmation
	confirmDeletion: 'Confirm Deletion',
	deleteMessage: 'Are you sure you want to delete this record?',
	deleteWarning: 'This action cannot be undone.',

	// Toast labels
	toastSuccess: 'Success',
	toastError: 'Error',
	toastInfo: 'Info',
	toastWarning: 'Warning',

	// Navigation
	mainNav: 'Main navigation bar',
	openSideMenu: 'Open side menu',
	quickSearch: 'Quick search (AI Agent)...',
	lightMode: 'Light mode',
	darkMode: 'Dark mode',
	navigationMenu: 'Navigation menu',
	closeMenu: 'Close menu',

	// Theme
	theme: 'Theme',

	// Form fields
	selectPlaceholder: 'Select...',

	// Toast messages (handleDetailAction)
	itemDeleted: '{item} "{value}" deleted',
	itemUpdated: '{item} "{value}" updated successfully',
	itemCreated: '{item} "{value}" created successfully'
} as const;
