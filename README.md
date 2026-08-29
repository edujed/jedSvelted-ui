# jedSvelted-ui

A collection of reusable UI components built for applications using **Svelte 5**.

## 📦 Installation

```bash
npm install @edujed/jedsvelted-ui
# ou
pnpm add @edujed/jedsvelted-ui
# ou
yarn add @edujed/jedsvelted-ui
```

## ⚙️ Requisitos

- Node.js >= 18
- npm/pnpm/yarn
- Peer dependencies (automatic): `svelte ^5`, `bits-ui ^2.19`

## 🧩 Available Components

| Module        | Description                                                                   |
| ------------- | ----------------------------------------------------------------------------- |
| `container/*` | Layout and panels (`Layout`, `Panel`, `SearchPanel`)                          |
| `forms/*`     | Form controls (`EditField`, `SelectField`)                                    |
| `icons/*`     | SVG icons (`Icon`, `IconCheck`, etc.)                                         |
| `info/*`      | Visual feedback (`ToastContainer`, `Toast`, `FieldHint`)                      |
| `nav/*`       | Navigation (`Navbar`, `Sidenav`, `menuConfig`, `routeMap`)                    |
| `pages/*`     | Page shells (`PageShell`, `DetailShell`)                                      |
| `table/*`     | Interactive tables (`Table`)                                                  |
| `tabs/*`      | Tab system (`Tabs`)                                                           |
| `ui/*`        | General UI components (`CrudPanel`, `InfoGrid`, `FormActions`, `DetailPanel`) |
| `theme/*`     | Theme management (`ThemeSelector`)                                            |

### Usage example

```svelte
<script lang="ts">
	import { CrudPanel } from '@edujed/jedsvelted-ui/ui/CrudPanel';
	import { Navbar } from '@edujed/jedsvelted-ui/nav/Navbar';
</script>

<Navbar />
<CrudPanel title="Example" />
```

## 🔗 Individual imports

Each component can be imported individually:

```ts
import { Table } from '@edujed/jedsvelted-ui/table/Table';
import { ToastContainer } from '@edujed/jedsvelted-ui/info/ToastContainer';
```

## 🛠 Local development

```bash
git clone https://github.com/edujed/jedSvelted-ui.git
cd jedSvelted-ui
npm install
npm run build      # compile the library into dist/
npm run check      # type-check
```

## 📄 License

This project is licensed under the [GNU General Public License v3](./LICENSE).

---

Developed by **Eduardo Jedliczka** — [edujed@gmail.com](mailto:edujed@gmail.com)
