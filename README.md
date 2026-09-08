# jedSvelted-ui

A collection of reusable UI components built for applications using **Svelte 5**.

## 📦 Installation

```bash
npm install @edujed/jedsvelted-ui
# or
pnpm add @edujed/jedsvelted-ui
# or
yarn add @edujed/jedsvelted-ui
```

## ⚙️ Requirements

- Node.js >= 18
- npm/pnpm/yarn
- Peer dependencies (automatic): `svelte ^5`, `bits-ui ^2.19`

## 🚀 Setup

The library ships its own design tokens (CSS custom properties) and built-in
translations. Initialize them once at app startup:

```ts
// main.ts
import { initTheme } from '@edujed/jedsvelted-ui/theme';
import { initI18n } from '@edujed/jedsvelted-ui/i18n';
import '@edujed/jedsvelted-ui/theme/theme.css';

initTheme(); // reads localStorage (s-theme / s-mode), applies data-* to <html>
initI18n(); // reads localStorage (s-locale), default 'en'
```

Both accept an optional prefix to support multiple lib instances on the same
page: `initTheme('app1')` → `app1-theme` / `app1-mode`, `initI18n('app1')`
→ `app1-locale`.

Available themes: `material-blue` (default), `humanity`, `rose`, `relax`,
`office`, `candy`. Mode: `light` / `dark`.

## 🧩 Modules

| Module      | Description                                                                                       |
| ----------- | ------------------------------------------------------------------------------------------------- |
| `actions`   | CRUD action handlers (`createHandleDetail`)                                                       |
| `chat`      | Chat UI (`ChatPanel`, `ChatMessage`)                                                              |
| `container` | Panels and CRUD (`Panel`, `SearchPanel`, `DetailPanel`, `CrudPanel`)                              |
| `format`    | Formatting utilities (`formatCurrency`, `formatNumber`, `formatDate`, `parseCurrency`)            |
| `forms`     | Form controls (`EditField`, `NumericField`, `SelectField`, `SliderField`, `DateField`, `CurrencyField`, `FormActions`) |
| `i18n`      | Built-in translations (`initI18n`, `t`, `localeStore`, `LangSelector`) + currency definitions     |
| `icons`     | SVG icons (`Icon`, `IconCheck`, `ChevronDownIcon`, etc.)                                          |
| `info`      | Visual feedback (`ToastContainer`, `toast`, `Message`, `FieldHint`)                               |
| `nav`       | Navigation (`Navbar`, `Topbar`, `Sidenav`)                                                        |
| `pages`     | Page shells (`PageShell`, `DetailShell`, `PageState`)                                             |
| `router`    | Routing and app layout (`HashRouter`, `Layout`)                                                   |
| `table`     | Interactive tables (`Table`)                                                                      |
| `tabs`      | Tab system (`Tabs`)                                                                               |
| `theme`     | Theme management (`initTheme`, `ThemeSelector`)                                                   |
| `ui`        | General UI components (`Button`, `ButtonGroup`, `Badge`, `InfoGrid`, `DeleteConfirm`, `FileTree`, `Skeleton`) |

### Import styles

Three levels of granularity are available:

```ts
// 1. Package root — everything in one import (convenience)
import { Button, Table, toast, HashRouter } from '@edujed/jedsvelted-ui';

// 2. Module barrel (recommended) — scoped to one module
import { Button, Badge } from '@edujed/jedsvelted-ui/ui';
import { Table } from '@edujed/jedsvelted-ui/table';
import { toast, ToastContainer } from '@edujed/jedsvelted-ui/info';

// 3. Individual file (where available) — most granular
import { Button } from '@edujed/jedsvelted-ui/ui/Button';
import { Table } from '@edujed/jedsvelted-ui/table/Table';
```

Module barrels are recommended for readability and tree-shaking; the root
import is a convenience for quick prototypes.

> **Note:** `actions`, `format`, `i18n` and `router` only expose the barrel
> export — use `import { ... } from '@edujed/jedsvelted-ui/<module>'` for those.

### Public type contracts

Every module exports the **props interfaces** of its components (plus the
data shapes they work with), so you can build objects for binding/aggregating
props and compose new components on top of the lib's primitives:

```ts
import type { ButtonProps, BadgeProps, FileNode } from '@edujed/jedsvelted-ui/ui';
import type { TableCol, TableAction } from '@edujed/jedsvelted-ui/table';
import type { CrudPanelProps } from '@edujed/jedsvelted-ui/container';
import type { EditFieldProps, SelectOption, CurrencyFieldProps, DateFieldProps } from '@edujed/jedsvelted-ui/forms';
import type { ChatMessageType, ChatPanelProps } from '@edujed/jedsvelted-ui/chat';
import type { PageShellProps, DetailAction } from '@edujed/jedsvelted-ui/pages';
import type { IconName } from '@edujed/jedsvelted-ui/icons';
import type { CurrencyCode, CurrencyDef } from '@edujed/jedsvelted-ui/i18n';
import type { SkeletonProps, SkeletonVariant } from '@edujed/jedsvelted-ui/ui';
```

Each module's types live in a dedicated file (`uiTypes`, `formsTypes`,
`chatTypes`, …) and are re-exported from the module barrel.

## 📖 Usage

### App shell (router + layout)

```svelte
<script lang="ts">
	import { HashRouter, Layout } from '@edujed/jedsvelted-ui/router';
	import { t } from '@edujed/jedsvelted-ui/i18n';

	const router = new HashRouter();
	router.add('/users', () => {}, {
		moduleName: 'users',
		title: () => t('users'),
		icon: '👥',
		showInMenu: true
	});
	router.init();
</script>

<Layout {router}>
	<!-- page content -->
</Layout>
```

`RouteMetadata` options: `title` (string or getter for locale reactivity),
`moduleName`, `icon`, `showInMenu`. The menu-relevant subset of a registered
route is typed as `RegisteredRouteItem` (exported by both `router` and `nav`).

### Buttons & badges

```svelte
<script lang="ts">
	import { Button, Badge } from '@edujed/jedsvelted-ui/ui';
</script>

<Button variant="primary" icon="plus">Add</Button>
<Button variant="danger" icon="trash">Delete</Button>
<Badge variant="primary" dismissible onDismiss={() => {}}>label</Badge>
```

### Panels

```svelte
<script lang="ts">
	import { Panel, SearchPanel, DetailPanel } from '@edujed/jedsvelted-ui/container';
</script>

<!-- Collapsible panel -->
<Panel title="Settings" iconName="settings" bind:isOpen>
	<!-- content -->
</Panel>

<!-- Slide-in detail panel -->
<DetailPanel show={true} title="Details" onClose={() => (show = false)}>
	<!-- content -->
</DetailPanel>
```

### CRUD panel

`CrudPanel` combines a `Table` with form/view/delete detail panels. It fires a
single `onAction` event on confirmed mutations only:

```svelte
<script lang="ts">
	import { CrudPanel } from '@edujed/jedsvelted-ui/container';
	import { FormActions } from '@edujed/jedsvelted-ui/forms';
	import type { TableCol } from '@edujed/jedsvelted-ui/table';

	const columns: TableCol[] = [
		{ key: 'name', title: 'Name', sortable: true, filterable: true },
		{ key: 'email', title: 'Email' }
	];
</script>

<CrudPanel title="Users" csvFileName="users.csv" {columns} {data} onAction={handleAction}>
	{#snippet renderForm(onComplete)}
		<!-- form fields -->
		<FormActions onSave={() => save(onComplete)} onCancel={() => cancel(onComplete)} />
	{/snippet}
</CrudPanel>
```

`onAction` receives `(action: 'create' | 'update' | 'delete', item)`.

### Table

```svelte
<script lang="ts">
	import { Table } from '@edujed/jedsvelted-ui/table';
	import type { TableCol, TableAction } from '@edujed/jedsvelted-ui/table';

	const columns: TableCol[] = [
		{ key: 'name', title: 'Name', sortable: true, filterable: true, exportable: true },
		{ key: 'age', title: 'Age', align: 'right', formatter: (v) => String(v) }
	];
	const actions: TableAction[] = [{ title: 'View', icon: 'eye', onClick: (row) => view(row) }];
</script>

<Table
	id="users"
	caption="Users"
	{data}
	{columns}
	{actions}
	rowKey="id"
	csvFileName="users.csv"
	onAdd={handleAdd}
/>
```

### Forms

```svelte
<script lang="ts">
	import {
		EditField,
		NumericField,
		SelectField,
		SliderField,
		DateField,
		CurrencyField,
		FormActions
	} from '@edujed/jedsvelted-ui/forms';
</script>

<EditField label="Name" bind:value={name} placeholder="Full name" />
<NumericField label="Top K" bind:value={topK} min={0} step={1} />
<SelectField
	label="Role"
	bind:value={role}
	options={[
		{ key: 'admin', label: 'Admin' },
		{ key: 'user', label: 'User' }
	]}
/>
<SliderField label="Temperature" bind:value={temp} min={0.1} max={2} step={0.1} decimals={2} />
<DateField label="Hiring Date" bind:value={hiringDate} />
<CurrencyField label="Annual Budget" bind:value={budget} currency="BRL" />
<FormActions onSave={save} onCancel={cancel} />
```

### DateField

A date picker (built on `bits-ui` `DatePicker`) with a native `Date` value
(date-only, no time component). The calendar is portaled to `<body>` so it
is never clipped by parent overflow.

```svelte
<script lang="ts">
	import { DateField } from '@edujed/jedsvelted-ui/forms';

	let hiringDate = $state<Date | undefined>(undefined);
</script>

<DateField
	label="Hiring Date"
	bind:value={hiringDate}
	min={new Date(2000, 0, 1)}
	max={new Date()}
/>
```

### CurrencyField

A monetary value input with locale-aware formatting. The bound `value` is a
plain `number` (e.g. `1234.56`); the display is formatted with the locale's
currency symbol, thousands separator, and fixed decimal places.

```svelte
<script lang="ts">
	import { CurrencyField } from '@edujed/jedsvelted-ui/forms';
	import type { CurrencyCode } from '@edujed/jedsvelted-ui/i18n';

	let budget = $state(0);
	let currency = $state<CurrencyCode>('BRL');
</script>

<CurrencyField label="Annual Budget" bind:value={budget} {currency} />
<CurrencyField label="Price (USD)" bind:value={price} currency="USD" />
<CurrencyField label="BTC" bind:value={btc} currency="BTC" />
```

Behavior:
- **On focus** — the thousands mask is stripped so the user sees a clean number to edit (e.g. `2.100.000,00` → `2100000,00` in pt-BR).
- **On input** — the bound `value` updates in real time; the display is not re-formatted while typing.
- **On blur** — the value is committed and the display is re-formatted with thousands separators and fixed decimals.
- **`decimals`** is optional — defaults to the currency's standard (e.g. `2` for BRL, `0` for JPY, `8` for BTC).
- **`currency`** accepts any `CurrencyCode` (`USD`, `EUR`, `JPY`, `GBP`, `AUD`, `CAD`, `CHF`, `CNY`, `BRL`, `BTC`, `ETH`).
- The symbol is reactive to locale changes (e.g. USD shows `$` in en, `US$` in pt-BR).

All form fields support an optional **rich hint** (3-part popover: title, description, impact):

```svelte
<SliderField
	label="Temperature"
	hintTitle="Temperature"
	hint="Controls randomness of the output."
	hintImpact="Lower values make output more focused and deterministic."
	bind:value={temp}
	min={0.1}
	max={2}
	step={0.1}
/>
```

The hint renders as a `?` icon next to the label. On hover (desktop) or click (mobile) it opens a popover with the three sections. Fields without a hint show a plain label.

### Chat

```svelte
<script lang="ts">
	import { ChatPanel } from '@edujed/jedsvelted-ui/chat';
	import type { ChatMessageType } from '@edujed/jedsvelted-ui/chat';

	let messages = $state<ChatMessageType[]>([]);
</script>

<ChatPanel
	title="Chat"
	{messages}
	{loading}
	renderContent={(msg) => marked.parse(msg.content || '') as string}
	onFork={(i) => fork(i)}
	onDelete={(i) => del(i)}
>
	<!-- input area as children snippet -->
</ChatPanel>
```

`ChatMessageType`:

```ts
{
	role: 'user' | 'assistant' | 'tool' | 'system' | 'error';
	content: string;
	attachedFiles?: string[];
	metrics?: { prompt_tokens?; completion_tokens?; total_tokens?; total_time_ms?; token_speed? };
	isStreaming?: boolean;
	thoughtContent?: string;
	textHtml?: string;   // pre-rendered HTML (streaming)
	toolName?: string;
}
```

### FileTree

```svelte
<script lang="ts">
	import { FileTree } from '@edujed/jedsvelted-ui/ui';
	import type { FileNode } from '@edujed/jedsvelted-ui/ui';

	const root: FileNode = {
		name: 'project',
		path: '/project',
		is_dir: true,
		children: [{ name: 'main.ts', path: '/project/main.ts', is_dir: false }]
	};
</script>

<FileTree
	node={root}
	selectedFiles={selected}
	toggleFile={toggle}
	onViewFile={(path, name) => open(path)}
/>
```

### Toasts

```svelte
<script lang="ts">
	import { toast, ToastContainer } from '@edujed/jedsvelted-ui/info';
</script>

<!-- render once in App -->
<ToastContainer />
```

```ts
toast.success('Saved!');
toast.warning('Item deleted');
toast.error('Something went wrong');
```

`FieldHint` renders a label with a `?` popover hint (used internally by form fields):

```svelte
<FieldHint label="Temperature" hint="Sampling temperature" labelFor="temp" />

<!-- Rich variant (title + description + impact) -->
<FieldHint
	label="Temperature"
	hintTitle="Temperature"
	hint="Controls randomness of the output."
	hintImpact="Lower values make output more focused."
	labelFor="temp"
/>
```

### Navigation

```svelte
<script lang="ts">
	import { Navbar, Sidenav, Topbar } from '@edujed/jedsvelted-ui/nav';
</script>

<Navbar {router} onMenuClick={toggleSidenav} />
<Sidenav {router} isOpen={sidenavOpen} onOverlayClick={closeSidenav} />
```

`Navbar` wraps `Topbar` (title from the router, theme/lang selectors, mode
toggle) and receives the `router` instance. `Sidenav` renders the menu from
routes registered with `showInMenu: true`.

### Page shells

```svelte
<script lang="ts">
	import { PageShell, DetailShell } from '@edujed/jedsvelted-ui/pages';
</script>

<PageShell title="Users" onSearch={search} onClear={clear} skeletonVariant="table" skeletonRows={5}>
	{#snippet content(state)}
		<!-- table / list — state.show(row) opens the detail panel -->
	{/snippet}
	{#snippet detailContent(state)}
		<!-- detail / edit / delete content -->
	{/snippet}
</PageShell>
```

`PageShell` owns a `PageState` instance (passed to the snippets) holding
`loading`, `error`, `showDetail`, `selectedItem`, `detailAction` — with
`show()`, `edit()`, `deleteRow()`, `close()`, `setLoading()`, `setError()`,
`setLoadingFor(ms)` and `subscribe()`.

While `loading` is true, `PageShell` renders a `Skeleton` placeholder
(configurable via `skeletonVariant` and `skeletonRows`). `setLoadingFor(ms)`
is a convenience for demoing the loading state with synchronous/mock data.

`DetailShell` is a standalone detail panel manager (modes: `detail` / `edit`
/ `delete`) with title derivation and close delegation. It also supports a
`loading` prop that renders a `Skeleton` (default variant: `list`) while the
detail content is being fetched.

### Skeleton

A placeholder block shown while content is loading. Supports five variants:
`text`, `circle`, `rect`, `list`, and `table`.

```svelte
<script lang="ts">
	import { Skeleton } from '@edujed/jedsvelted-ui/ui';
</script>

<!-- Single text line -->
<Skeleton variant="text" width="60%" />

<!-- Circular avatar placeholder -->
<Skeleton variant="circle" height={40} />

<!-- List of rows (avatar + two text lines) -->
<Skeleton variant="list" rows={4} />

<!-- Table placeholder (header + rows) -->
<Skeleton variant="table" rows={5} />

<!-- Static (no shimmer) -->
<Skeleton variant="text" animated={false} />
```

All variants support `width`, `height`, `rows` (for `list`/`table`),
`circular`, `animated` (default: `true`), and `class`.

### Tabs

```svelte
<script lang="ts">
	import { Tabs } from '@edujed/jedsvelted-ui/tabs';
	import type { TabItem } from '@edujed/jedsvelted-ui/tabs';

	const tabs: TabItem[] = [
		{ value: 'chat', label: '💬 Chat' },
		{ value: 'terminal', label: '🖥️ Terminal' }
	];
	let active = $state('chat');
</script>

<Tabs {tabs} bind:activeTab={active}>
	{#snippet tabContent(tab)}
		<!-- per-tab content -->
	{/snippet}
</Tabs>
```

### Theme & language selectors

```svelte
<script lang="ts">
	import { ThemeSelector } from '@edujed/jedsvelted-ui/theme';
	import { LangSelector } from '@edujed/jedsvelted-ui/i18n';
</script>

<ThemeSelector />
<LangSelector />
```

### i18n

```ts
import { t, localeStore, setLocale, LOCALES } from '@edujed/jedsvelted-ui/i18n';

t('add'); // "Add" (en) / "Adicionar" (pt-BR)
t('rows', { count: 5 }); // parameterized
setLocale('pt-BR'); // runtime switch — UI reacts automatically
```

`t()` reads `localeStore` on every call, so it stays in sync with the current
locale (components that render `t(...)` inside `$derived`/templates re-evaluate
on locale change).

### Currencies

The lib ships a built-in currency registry (`i18n/currencies.ts`) with 11
global currencies. Each currency has a per-locale symbol and a default
decimal count:

| Code | Name              | en     | pt-BR  | Decimals |
| ---- | ----------------- | ------ | ------ | -------- |
| USD  | US Dollar         | `$`    | `US$`  | 2        |
| EUR  | Euro              | `€`    | `€`    | 2        |
| JPY  | Japanese Yen      | `¥`    | `¥`    | 0        |
| GBP  | British Pound     | `£`    | `£`    | 2        |
| AUD  | Australian Dollar | `A$`   | `A$`   | 2        |
| CAD  | Canadian Dollar   | `C$`   | `C$`   | 2        |
| CHF  | Swiss Franc       | `Fr`   | `CHF`  | 2        |
| CNY  | Chinese Yuan      | `¥`    | `¥`    | 2        |
| BRL  | Brazilian Real    | `R$`   | `R$`   | 2        |
| BTC  | Bitcoin           | `₿`    | `₿`    | 8        |
| ETH  | Ethereum          | `Ξ`    | `Ξ`    | 6        |

```ts
import { getCurrencySymbol, getCurrencyDecimals, getSupportedCurrencies, CURRENCIES } from '@edujed/jedsvelted-ui/i18n';
import type { CurrencyCode } from '@edujed/jedsvelted-ui/i18n';

getCurrencySymbol('USD', 'pt-BR'); // "US$"
getCurrencySymbol('USD', 'en');    // "$"
getCurrencyDecimals('JPY');        // 0
getSupportedCurrencies();          // [{ code: 'USD', name: 'US Dollar', symbol: '$' }, …]
```

`CurrencyField` and `formatCurrency` both use this registry, so the symbol
and decimal count stay consistent across the app and react to locale changes.

### Formatting utilities

Pure functions for locale-aware display formatting (no reactive state):

```ts
import { formatCurrency, formatNumber, formatDate, formatDateTime, parseCurrency, stripThousands } from '@edujed/jedsvelted-ui/format';
import { localeStore } from '@edujed/jedsvelted-ui/i18n';

const locale = $localeStore; // reactive in components

formatCurrency(1234.56, locale);                          // "R$ 1.234,56" (pt-BR) / "$1,234.56" (en)
formatCurrency(1234.56, locale, { currency: 'USD' });     // "US$ 1.234,56" (pt-BR) / "$ 1,234.56" (en)
formatCurrency(0.00123456, locale, { currency: 'BTC' });  // "₿ 0,00000012" (pt-BR)
formatNumber(1234.56, locale, 2);                         // "1.234,56" (pt-BR) / "1,234.56" (en)
formatDate('2024-03-15', locale);                         // "15/03/2024" (pt-BR) / "3/15/2024" (en)
formatDateTime('2024-03-15T14:30:00Z', locale);           // "15/03/2024 14:30" (pt-BR)
parseCurrency('1.234,56');                                // 1234.56
parseCurrency('1,234.56');                                // 1234.56
stripThousands('2.100.000,00', 'pt-BR');                  // "2100000,00"
```

All functions return `'—'` for `undefined`/`null`/invalid values.

Use them in `Table` column formatters and `InfoGrid` items for consistent
display:

```svelte
<script lang="ts">
	import { Table } from '@edujed/jedsvelted-ui/table';
	import { formatCurrency, formatDate } from '@edujed/jedsvelted-ui/format';
	import { localeStore } from '@edujed/jedsvelted-ui/i18n';

	const columns = [
		{ key: 'name', title: 'Name' },
		{ key: 'budget', title: 'Budget', align: 'right', formatter: (v: number) => formatCurrency(v, $localeStore, { currency: 'BRL' }) },
		{ key: 'hiringDate', title: 'Hired', formatter: (v: string) => formatDate(v, $localeStore) }
	];
</script>

<Table {columns} {data} />
```

### CRUD action handler

```ts
import { createHandleDetail } from '@edujed/jedsvelted-ui/actions';
import { toast } from '@edujed/jedsvelted-ui/info';

const { handleDetailAction } = createHandleDetail<Permission>({
	dataRef: { data: rawPermissions },
	toast,
	itemName: () => t('permissions'),
	displayFields: ['module', 'action']
});

// wire to CrudPanel:
<CrudPanel ... onAction={handleDetailAction} />
```

`handleDetailAction(action, item)` handles `'create' | 'update' | 'delete'`
and fires the appropriate toast. `createHandleDetail` also returns
`handleSave` and `handleDelete` for direct use.

### Icons

```svelte
<script lang="ts">
	import { Icon, IconCheck, IconTrash } from '@edujed/jedsvelted-ui/icons';
</script>

<Icon name="user" size={16} />
<IconCheck size={16} />
```

`Icon` accepts a `name` from the registry (`user`, `trash`, `edit`, `eye`,
`plus`, `search`, `settings`, `sun`, `moon`, `filter`, `sort`, `download`,
`menu`, `more`, `check`, `x`, `wallet`, `bank`, `clock`, `file`, `folder`,
`folder-open`, `chevron-right`, `chevron-down`, `circle`, `user-alt`,
`calendar`).
Individual icon components are also exported (`IconCheck`, `IconTrash`,
`IconCalendar`, …).

## 🛠 Local development

```bash
git clone https://github.com/edujed/jedSvelted-ui.git
cd jedsvelted-ui
npm install

npm run build        # compile the library into dist/ (svelte-package)
npm run dev:lib      # watch mode — rebuilds on change
npm run check        # type-check (svelte-check)
npm run check:watch  # type-check in watch mode
npm run lint         # prettier --check + eslint
npm run format       # prettier --write
npm run test         # vitest (UI)
npm run test:run     # vitest (single run, CI)
```

### Demo Application

```bash
git clone https://github.com/edujed/jedSvelted-demo-app.git
```

## 🌐 Live Demo

> To open a Live Demo for this lib:
> [![Live Demo](https://shields.io)](https://edujed.github.io/jedSvelted-demo-app/)

## 📄 License

This project is licensed under the [GNU General Public License v3](./LICENSE).

---

Developed by **Eduardo Jedliczka** — [edujed@gmail.com](mailto:edujed@gmail.com)
