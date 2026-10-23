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
	 * Primary color — icon outline/structure (`<g stroke={primaryColor}>` groups).
	 * Default: `var(--icon-color-primary, currentColor)` — follows the active
	 * theme's palette (each theme defines `--icon-color-primary`), falling back
	 * to `currentColor`.
	 */
	primaryColor?: string;
	/**
	 * Secondary color — icon accent/detail (`<g stroke={secondaryColor}>` groups).
	 * Default: `var(--icon-color-accent, currentColor)` — follows the active
	 * theme's palette (each theme defines `--icon-color-accent`), falling back
	 * to `currentColor`.
	 */
	secondaryColor?: string;
}

/**
 * Icon names supported by the `Icon` component.
 * Keep in sync with the `ICON_MAP` registry in `Icon.svelte`.
 */
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
	| 'map'
	| 'database';
