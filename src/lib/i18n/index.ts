// Barrel export for the i18n module
export {
	localeStore,
	initI18n,
	setLocale,
	setI18nKeyPrefix,
	getLocaleKey,
	t,
	LOCALES,
	DEFAULT_LOCALE,
	LOCALE_OPTIONS
} from './i18n';
export type { Locale, MessageKey, Messages } from './i18n';
export { default as LangSelector } from './LangSelector.svelte';

// Currencies
export {
	CURRENCIES,
	getCurrencySymbol,
	getCurrencyDecimals,
	getSupportedCurrencies
} from './currencies';
export type { CurrencyCode, CurrencyDef } from './currencies';
