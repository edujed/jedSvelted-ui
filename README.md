# jedSvelted-ui

Uma coleção de componentes reutilizáveis para aplicações construídas com **Svelte 5**.

## 📦 Instalação

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
- Dependências peer (automáticas): `svelte ^5`, `bits-ui ^2.19`

## 🧩 Componentes disponíveis

| Módulo | Descrição |
|--------|-----------|
| `container/*` | Layout e paneles (`Layout`, `Panel`, `SearchPanel`) |
| `forms/*` | Controles de formulário (`EditField`, `SelectField`) |
| `icons/*` | Ícones SVG (`Icon`, `IconCheck`, etc.) |
| `info/*` | Feedback visual (`Toast`, `FieldHint`) |
| `nav/*` | Navegação (`Navbar`, `Sidenav`) |
| `pages/*` | Shell de páginas (`PageShell`, `DetailShell`) |
| `table/*` | Tabelas interativas |
| `tabs/*` | Sistema de tabs |
| `ui/*` | Componentes UI gerais (`CrudPanel`, `InfoGrid`, etc.) |

### Exemplo de uso

```svelte
<script lang="ts">
	import { CrudPanel } from 'jedsvelted-ui/ui/CrudPanel';
	import { Navbar } from 'jedsvelted-ui/nav/Navbar';
</script>

<Navbar />
<CrudPanel title="Exemplo" />
```

## 🔗 Imports individuais

Cada componente pode ser importado individualmente:

```ts
import { Table } from 'jedsvelted-ui/table/Table';
import { ToastContainer } from 'jedsvelted-ui/info/ToastContainer';
```

## 🛠 Desenvolvimento local

```bash
git clone https://github.com/jeddev/jedSvelted-ui.git
cd jedSvelted-ui
npm install
npm run dev        # desenvolvimento
npm run prepack    # compila a lib na pasta dist/
npm run check      # verifica tipos
```

## 📄 Licência

Este projeto está licenciado sob a [GNU General Public License v3](./LICENSE).

---

Desenvolvido por **Eduardo Jedliczka** — [jed@jed.dev](mailto:jed@jed.dev)
