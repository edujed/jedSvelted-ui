// src/lib/index.ts - exports principais (raíz)
// Para componentes Svelte, use importação direta pelo caminho completo:
//   import { CrudPanel } from 'jedsvelted-ui/ui/CrudPanel';
//   import { Layout }    from 'jedsvelted-ui/container/Layout.svelte';

// Utilitários globais (não conflitam com nenhum componente)
export * from './router';
export * from './theme';
export * from './toast';
// UseTableState já exporta TableCol
export * from './useTableState';
