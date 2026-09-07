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
| `forms`     | Form controls (`EditField`, `NumericField`, `SelectField`, `SliderField`, `FormActions`)          |
| `i18n`      | Built-in translations (`initI18n`, `t`, `localeStore`, `LangSelector`)                            |
| `icons`     | SVG icons (`Icon`, `IconCheck`, `ChevronDownIcon`, etc.)                                          |
| `info`      | Visual feedback (`ToastContainer`, `toast`, `Message`, `FieldHint`)                               |
| `nav`       | Navigation (`Navbar`, `Topbar`, `Sidenav`)                                                        |
| `pages`     | Page shells (`PageShell`, `DetailShell`, `PageState`)                                             |
| `router`    | Routing and app layout (`HashRouter`, `Layout`)                                                   |
| `table`     | Interactive tables (`Table`)                                                                      |
| `tabs`      | Tab system (`Tabs`)                                                                               |
| `theme`     | Theme management (`initTheme`, `ThemeSelector`)                                                   |
| `ui`        | General UI components (`Button`, `ButtonGroup`, `Badge`, `InfoGrid`, `DeleteConfirm`, `FileTree`) |

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

> **Note:** `actions`, `i18n` and `router` only expose the barrel export —
> use `import { ... } from '@edujed/jedsvelted-ui/<module>'` for those.

### Public type contracts

Every module exports the **props interfaces** of its components (plus the
data shapes they work with), so you can build objects for binding/aggregating
props and compose new components on top of the lib's primitives:

```ts
import type { ButtonProps, BadgeProps, FileNode } from '@edujed/jedsvelted-ui/ui';
import type { TableCol, TableAction } from '@edujed/jedsvelted-ui/table';
import type { CrudPanelProps } from '@edujed/jedsvelted-ui/container';
import type { EditFieldProps, SelectOption } from '@edujed/jedsvelted-ui/forms';
import type { ChatMessageType, ChatPanelProps } from '@edujed/jedsvelted-ui/chat';
import type { PageShellProps, DetailAction } from '@edujed/jedsvelted-ui/pages';
import type { IconName } from '@edujed/jedsvelted-ui/icons';
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
<FormActions onSave={save} onCancel={cancel} />
```

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

<PageShell title="Users" onSearch={search} onClear={clear}>
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
`show()`, `edit()`, `deleteRow()`, `close()`, `setLoading()`, `setError()`
and `subscribe()`.

`DetailShell` is a standalone detail panel manager (modes: `detail` / `edit`
/ `delete`) with title derivation and close delegation.

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
`folder-open`, `chevron-right`, `chevron-down`, `circle`, `user-alt`).
Individual icon components are also exported (`IconCheck`, `IconTrash`, …).

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
