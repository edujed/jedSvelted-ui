# jedSvelted-ui

A collection of reusable UI components built for applications using **Svelte 5**.

## 📦 Installation

```bash
npm install jedsvelted-ui
# ou
pnpm add jedsvelted-ui
# ou
yarn add jedsvelted-ui
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
	import { CrudPanel } from 'jedsvelted-ui/ui/CrudPanel';
	import { Navbar } from 'jedsvelted-ui/nav/Navbar';
</script>

<Navbar />
<CrudPanel title="Example" />
```

## 🔗 Individual imports

Each component can be imported individually:

```ts
import { Table } from 'jedsvelted-ui/table/Table';
import { ToastContainer } from 'jedsvelted-ui/info/ToastContainer';
```

## 🛠 Local development

```bash
git clone https://github.com/edujed/jedSvelted-ui.git
cd jedSvelted-ui
npm install
npm run dev        # start development server
npm run build      # compile the library into dist/
npm run check      # type-check
```

## 📄 Licência
## 📄 License

This project is licensed under the [GNU General Public License v3](./LICENSE).

---

Developed by **Eduardo Jedliczka** — [edujed@gmail.com](mailto:edujed@gmail.com)
