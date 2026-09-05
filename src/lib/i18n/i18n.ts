/**
 * i18n manager for the lib's built-in messages.
 * Follows the same pattern as the theme module: a global store,
 * an init function, and a localStorage prefix to support multiple
 * lib instances on the same page.
 *
 * Usage:
 * ```ts
 * import { initI18n, setLocale } from 'jedsvelted-ui/i18n';
 * initI18n();            // default prefix: s-locale
 * initI18n('app1');      // → app1-locale (multiple instances)
 * setLocale('pt-BR');    // switch at runtime — the UI reacts automatically
 * ```
 *
 * Inside components, use `t()` for translations:
 * ```svelte
 * <script>
 *   import { t } from 'jedsvelted-ui/i18n';
 * </script>
 * <button title={t('addNewRecord')}>{t('add')}</button>
 * <span>{t('rows', { count: 5 })}</span>
 * ```
 *
 * `t()` is reactive — it reads `localeStore` internally, so the UI
 * updates automatically when the locale changes.
 */

import { writable, get } from 'svelte/store';
import en from './locales/en';
import ptBR from './locales/pt-BR';

/** Message keys — derived from the English locale (source of truth). */
export type MessageKey = keyof typeof en;

/** Shape every locale must satisfy (all keys present). */
export type Messages = Record<MessageKey, string>;

export type Locale = 'en' | 'pt-BR';

/** All locales — exported for reactive access in components. */
export const LOCALES: Record<Locale, Messages> = { en, 'pt-BR': ptBR };

/** Display metadata for each locale (used by the LangSelector). */
export const LOCALE_OPTIONS: Array<{ id: Locale; label: string; icon: string }> = [
	{ id: 'en', label: 'English', icon: '🇺🇸' },
	{ id: 'pt-BR', label: 'Português (Brasil)', icon: '🇧🇷' }
];

export const DEFAULT_LOCALE: Locale = 'en';

/** Default prefix used for the localStorage key (`s-locale`). */
const DEFAULT_PREFIX = 's-';

let _prefix = DEFAULT_PREFIX;

/** Reactive store for the current locale. */
export const localeStore = writable<Locale>(DEFAULT_LOCALE);

/** Sets the prefix used in the localStorage key.
 * Useful when a page has multiple instances of the lib.
 * E.g.: `setI18nKeyPrefix('app2')` → uses `app2-locale`
 */
export function setI18nKeyPrefix(prefix?: string): void {
	_prefix = prefix ?? DEFAULT_PREFIX;
}

/** Returns the current localStorage key name. Useful for internal tests. */
export function getLocaleKey(): string {
	const sep = _prefix.endsWith('-') ? '' : '-';
	return `${_prefix}${sep}locale`;
}

function getStoredLocale(fallback: Locale): Locale {
	try {
		const stored = localStorage.getItem(getLocaleKey());
		if (stored && stored in LOCALES) return stored as Locale;
	} catch {
		// localStorage unavailable (SSR, privacy mode) — fall through
	}
	return fallback;
}

/**
 * Initializes the locale from localStorage and returns the current value.
 * @param prefix - Optional prefix to avoid key collisions between app instances.
 */
export function initI18n(prefix?: string): Locale {
	if (prefix !== undefined) setI18nKeyPrefix(prefix);
	const locale = getStoredLocale(DEFAULT_LOCALE);
	localeStore.set(locale);
	return locale;
}

/**
 * Switches the locale at runtime and persists the choice.
 * Components reading `localeStore` (or `$localeStore`) update automatically.
 */
export function setLocale(locale: Locale): void {
	try {
		localStorage.setItem(getLocaleKey(), locale);
	} catch {
		// localStorage unavailable — still update the store
	}
	localeStore.set(locale);
}

/**
 * Translates a message key for the current locale, with optional
 * `{placeholder}` substitution. Safe to call outside components
 * (reads the store via `get`).
 *
 * Unknown keys fall back to English, then to the key itself.
 *
 * NOTE: This function is NOT reactive. For reactive translations in
 * Svelte components, use `$localeStore` in the template:
 * ```svelte
 * <script>
 *   import { localeStore, LOCALES } from 'jedsvelted-ui/i18n';
 * </script>
 * <button>{LOCALES[$localeStore].add}</button>
 * ```
 */
export function t(key: MessageKey, params?: Record<string, string | number>): string {
	const locale = get(localeStore);
	const template = LOCALES[locale][key] ?? LOCALES[DEFAULT_LOCALE][key] ?? key;
	if (!params) return template;
	const result = template.replace(/\{(\w+)\}/g, (match, name: string) =>
		name in params ? String(params[name]) : match
	);
	return result;
}
