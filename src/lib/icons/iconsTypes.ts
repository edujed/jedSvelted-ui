/**
 * Shared types for the icon components.
 *
 * `IconName` is the single source of truth for icon names — keep it in sync
 * with the `ICON_MAP` registry in `Icon.svelte`.
 */

/**
 * Common props shared by all individual icon components (e.g. `IconEye`, `IconWallet`).
 *
 * Follows the same pattern as `FieldHintProps`, `ButtonProps`, etc. —
 * an explicit interface so consumers can compose and type-check props.
 */
export interface IconProps {
	/** Rendered width/height in px. */
	size?: number;
	/** Extra classes applied to the root `<svg>`. */
  class?: string;

  	/**
	 * Cor principal — contorno/estrutura do ícone (grupos `<g stroke={primaryColor}>`).
	 * Padrão: `var(--icon-color-primary, currentColor)` — segue a paleta do tema ativo
	 * (cada tema define `--icon-color-primary`), com fallback para `currentColor`.
	 */
	primaryColor?: string;
	/**
	 * Cor de destaque — detalhes/acento do ícone (grupos `<g stroke={secondaryColor}>`).
	 * Padrão: `var(--icon-color-accent, currentColor)` — segue a paleta do tema ativo
	 * (cada tema define `--icon-color-accent`), com fallback para `currentColor`.
	 */
	secondaryColor?: string;
}

/** Icon names supported by the `Icon` component. */
export type IconName =
	| 'eye'
	| 'file'
	| 'folder'
	| 'folder-open'
	| 'edit'
	| 'trash'
	| 'user'
	| 'users'
	| 'more'
	| 'chevron-right'
	| 'chevron-left'
	| 'check'
	| 'x'
	| 'wallet'
	| 'bank'
	| 'clock'
	| 'menu'
	| 'download'
	| 'sun'
	| 'moon'
	| 'sort'
	| 'plus'
	| 'chevron-down'
	| 'circle'
	| 'filter'
	| 'help'
	| 'search'
	| 'settings'
	| 'user-alt'
	| 'tree'
	| 'building'
	| 'calendar'
	| 'file-text'
	| 'arrows-swap'
	| 'map-pin'
	| 'pie-chart'
	| 'file-signature'
	| 'tag'
	| 'credit-card'
	| 'qr-code'
	| 'shield'
	| 'lock'
	| 'phone'
	| 'map';
