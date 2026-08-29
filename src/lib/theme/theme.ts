/**
 * Theme manager for themes and mode (light/dark)
 * Persists to localStorage with prefix `'s-'` by default.
 * Applies data-* attributes to <html>
 *
 * Usage:
 * ```ts
 * import { initTheme } from 'jedsvelted-ui/theme';
 * // Default prefix: s-theme / s-mode
 * // For multiple instances, pass another prefix:
 * initTheme('app1'); // → app1-theme / app1-mode
 * ```
 */

import { writable } from 'svelte/store';

export const THEMES = [
	{ id: 'material-blue', label: 'Material Blue', icon: '🔵' },
	{ id: 'humanity', label: 'Humanity', icon: '🟠' },
	{ id: 'rose', label: 'Rose', icon: '🌸' },
	{ id: 'relax', label: 'Relax', icon: '🌿' }
] as const;

export type ThemeId = (typeof THEMES)[number]['id'];
export type Mode = 'light' | 'dark';

//** Default prefix used for localStorage keys (`s-theme`, `s-mode`). */
const DEFAULT_PREFIX = 's-';

let _prefix = DEFAULT_PREFIX;

/** Sets the prefix used in localStorage keys.
 * Útil quando uma página tem múltiplas instâncias da lib.
 * Ex: `setThemeKeyPrefix('app2')` → usa `app2-theme` / `app2-mode`
 */
export function setThemeKeyPrefix(prefix?: string): void {
	_prefix = prefix ?? DEFAULT_PREFIX;
}

/** Returns object with current key names. Useful for internal tests. */
export const getKeys = (): { THEME_KEY: string; MODE_KEY: string } => {
	// Garante separação consistente por hífen
	const sep = _prefix.endsWith('-') ? '' : '-';
	return {
		THEME_KEY: `${_prefix}${sep}theme`,
		MODE_KEY: `${_prefix}${sep}mode`
	};
};

/** Reactive store for current theme */
export const themeStore = writable<ThemeId>('material-blue');

/** Reactive store for current mode (light/dark). */
export const modeStore = writable<Mode>('light');

/** List of valid themes for validation */
const VALID_THEMES = THEMES.map((t) => t.id) as ThemeId[];

function getStored(key: string, fallback: string): string {
	const stored = localStorage.getItem(key);
	return stored ?? fallback;
}

export function applyTheme(theme: ThemeId): void {
	document.documentElement.setAttribute('data-theme', theme);
	const keys = getKeys();
	localStorage.setItem(keys.THEME_KEY, theme);
	themeStore.set(theme);
}

export function applyMode(mode: Mode): void {
	document.documentElement.setAttribute('data-mode', mode);
	const keys = getKeys();
	localStorage.setItem(keys.MODE_KEY, mode);
	modeStore.set(mode);
}

/**
 * Initializes theme and mode from localStorage.
 * Applies data-* attributes on <html> and returns current values.
 * Validates stored theme — resets to 'material-blue' if corrupted.
 *
 * @param prefix - Optional prefix to avoid key collisions between app instances.
 *                 E.g., `initTheme('app1')` uses `app1-theme` / `app1-mode`
 */
export function initTheme(prefix?: string): { theme: ThemeId; mode: Mode } {
	if (prefix !== undefined) setThemeKeyPrefix(prefix);
	const keys = getKeys();
	const storedTheme = getStored(keys.THEME_KEY, '');
	const theme = VALID_THEMES.includes(storedTheme as ThemeId)
		? (storedTheme as ThemeId)
		: 'material-blue';
	const mode = (getStored(keys.MODE_KEY, 'light') as Mode) || 'light';
	applyTheme(theme);
	themeStore.set(theme);
	applyMode(mode);
	return { theme, mode };
}

/**
 * Toggles between light and dark modes, persists selection,
 * and returns the new value.
 */
export function toggleMode(): Mode {
	const keys = getKeys();
	const current = (getStored(keys.MODE_KEY, 'light') as Mode) || 'light';
	const next = current === 'light' ? 'dark' : 'light';
	applyMode(next);
	return next;
}

/**
 * Gets the current theme without persistence (DOM read-only).
 */
export function getCurrentTheme(): ThemeId {
	return (document.documentElement.getAttribute('data-theme') as ThemeId) || 'material-blue';
}

/**
 * Gets the current mode without persistence (DOM read-only).
 */
export function getCurrentMode(): Mode {
	return (document.documentElement.getAttribute('data-mode') as Mode) || 'light';
}
