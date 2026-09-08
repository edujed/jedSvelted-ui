/**
 * Root barrel for `@edujed/jedsvelted-ui`.
 *
 * Re-exports every module's public API so consumers can either import from
 * the package root (`import { Button } from '@edujed/jedsvelted-ui'`) or from
 * a module subpath (`import { Button } from '@edujed/jedsvelted-ui/ui'`).
 *
 * Subpath imports are recommended for readability and tree-shaking; the root
 * barrel is a convenience for quick prototypes.
 */

// actions
export { createHandleDetail } from './actions';
export type { ActionEvent, HandleDetailOptions } from './actions';

// chat
export { ChatPanel, ChatMessage } from './chat';
export type { ChatMessageProps, ChatMessageRole, ChatMessageType, ChatPanelProps } from './chat';

// container
export { CrudPanel, DetailPanel, Panel, SearchPanel } from './container';
export type {
	CrudPanelProps,
	DetailPanelProps,
	PanelProps,
	Row,
	SearchPanelProps
} from './container';

// format
export {
	formatCurrency,
	formatNumber,
	formatDate,
	formatDateTime,
	parseCurrency,
	stripThousands
} from './format';

// forms
export { CurrencyField, DateField, EditField, FormActions, FormField, NumericField, SelectField, SliderField } from './forms';
export type { FormFieldProps } from './forms';
export type {
	CurrencyFieldProps,
	DateFieldProps,
	EditFieldProps,
	FieldHintProps,
	FormActionsProps,
	NumericFieldProps,
	SelectFieldProps,
	SelectOption,
	SliderFieldProps
} from './forms';

// i18n
export {
	CURRENCIES,
	DEFAULT_LOCALE,
	LOCALE_OPTIONS,
	LOCALES,
	LangSelector,
	getCurrencyDecimals,
	getCurrencySymbol,
	getSupportedCurrencies,
	initI18n,
	localeStore,
	setI18nKeyPrefix,
	setLocale,
	getLocaleKey,
	t
} from './i18n';
export type { CurrencyCode, CurrencyDef, Locale, MessageKey, Messages } from './i18n';

// icons
export {
	Icon,
	IconBank,
	IconBuilding,
	IconCheck,
	IconChevronDown,
	IconChevronRight,
	IconCalendar,
	IconCircle,
	IconClock,
	IconDownload,
	IconEdit,
	IconEye,
	IconFile,
	IconFilter,
	IconFolder,
	IconFolderOpen,
	IconMenu,
	IconMoon,
	IconMore,
	IconPlus,
	IconSearch,
	IconSettings,
	IconSort,
	IconSun,
	IconTrash,
	IconTree,
	IconUser,
	IconUserAlt,
	IconWallet,
	IconX
} from './icons';
export type { IconName } from './icons';

// info
export {
	FieldHint,
	Message,
	Toast,
	ToastContainer,
	addToast,
	getToasts,
	removeToast,
	toast,
	toasts
} from './info';
export type {
	MessageProps,
	MessageVariant,
	Toast as ToastData,
	ToastProps,
	ToastType
} from './info';

// nav
export { Navbar, Sidenav, Topbar } from './nav';
export type { MenuItem, NavbarProps, RegisteredRouteItem, SidenavProps, TopbarProps } from './nav';

// pages
export { DetailShell, PageShell, PageState } from './pages';
export type { DetailAction, DetailShellProps, DetailShellState, PageShellProps } from './pages';

// router
export { HashRouter, Layout } from './router';
export type {
	LayoutProps,
	RegisteredRouteItem as RouterRegisteredRouteItem,
	Route,
	RouteHandler,
	RouteMetadata,
	RouteState
} from './router';

// table
export { Table } from './table';
export type { SortDirection, TableAction, TableCol, TableColBase } from './table';
export { buildCsv, filterData, sortData } from './table';

// tabs
export { Tabs } from './tabs';
export type { TabItem, TabsProps } from './tabs';

// theme
export {
	THEMES,
	applyMode,
	applyTheme,
	getCurrentMode,
	getCurrentTheme,
	initTheme,
	modeStore,
	setThemeKeyPrefix,
	themeStore,
	toggleMode,
	ThemeSelector
} from './theme';
export type { Mode, Theme, ThemeId } from './theme';

// ui
export { Badge, Button, ButtonGroup, DeleteConfirm, FileTree, InfoGrid, Skeleton } from './ui';
export type {
	BadgeProps,
	BadgeVariant,
	ButtonGroupOption,
	ButtonGroupProps,
	ButtonProps,
	ButtonSize,
	ButtonVariant,
	DeleteConfirmProps,
	FileNode,
	FileTreeProps,
	InfoGridItem,
	InfoGridProps,
	SkeletonProps,
	SkeletonVariant
} from './ui';
