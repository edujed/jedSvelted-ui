/**
 * Shared localStorage prefix helper.
 *
 * Both the theme and i18n modules persist their state to localStorage with a
 * configurable prefix (to support multiple lib instances on the same page).
 * This module centralizes the prefix management and key-building logic.
 *
 * Each module (theme, i18n) manages its own prefix independently, so
 * `initTheme('app1')` and `initI18n('app2')` don't collide.
 *
 * Usage:
 * ```ts
 * import { setPrefix, buildKey } from '../storage';
 * setPrefix('theme', 'app1');
 * buildKey('theme', 'theme'); // → 'app1-theme'
 * ```
 */

/** Default prefix used for localStorage keys (`s-theme`, `s-mode`, `s-locale`). */
const DEFAULT_PREFIX = 's-';

/** Per-module prefixes (theme and i18n are independent). */
const prefixes: Record<string, string> = {};

/**
 * Sets the prefix used in localStorage keys for a specific module.
 * Useful when a page has multiple instances of the lib.
 * E.g.: `setPrefix('theme', 'app2')` → uses `app2-theme` / `app2-mode`
 */
export function setPrefix(module: string, prefix?: string): void {
	prefixes[module] = prefix ?? DEFAULT_PREFIX;
}

/**
 * Builds a localStorage key from the module's prefix and a suffix.
 * Ensures consistent hyphen separation.
 * E.g.: `buildKey('theme', 'theme')` → `'s-theme'` (default) or `'app1-theme'` (custom).
 */
export function buildKey(module: string, suffix: string): string {
	const prefix = prefixes[module] ?? DEFAULT_PREFIX;
	const sep = prefix.endsWith('-') ? '' : '-';
	return `${prefix}${sep}${suffix}`;
}
