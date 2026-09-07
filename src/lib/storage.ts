/**
 * Shared localStorage prefix helper.
 *
 * Both the theme and i18n modules persist their state to localStorage with a
 * configurable prefix (to support multiple lib instances on the same page).
 * This module centralizes the prefix management and key-building logic.
 *
 * Usage:
 * ```ts
 * import { setPrefix, buildKey } from '../storage';
 * setPrefix('app1');
 * buildKey('theme'); // → 'app1-theme'
 * ```
 */

/** Default prefix used for localStorage keys (`s-theme`, `s-mode`, `s-locale`). */
const DEFAULT_PREFIX = 's-';

let _prefix = DEFAULT_PREFIX;

/**
 * Sets the prefix used in localStorage keys.
 * Useful when a page has multiple instances of the lib.
 * E.g.: `setPrefix('app2')` → uses `app2-theme` / `app2-mode` / `app2-locale`
 */
export function setPrefix(prefix?: string): void {
	_prefix = prefix ?? DEFAULT_PREFIX;
}

/**
 * Returns the current prefix.
 */
export function getPrefix(): string {
	return _prefix;
}

/**
 * Builds a localStorage key from the current prefix and a suffix.
 * Ensures consistent hyphen separation.
 * E.g.: `buildKey('theme')` → `'s-theme'` (default) or `'app1-theme'` (custom).
 */
export function buildKey(suffix: string): string {
	const sep = _prefix.endsWith('-') ? '' : '-';
	return `${_prefix}${sep}${suffix}`;
}
