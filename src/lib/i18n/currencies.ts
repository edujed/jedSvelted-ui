/**
 * Currency definitions for the lib.
 *
 * Each currency has a symbol that varies by locale:
 * - USD: "$" (en), "US$" (pt-BR)
 * - EUR: "€" (both)
 * - JPY: "¥" (both)
 * - GBP: "£" (both)
 * - AUD: "A$" (both)
 * - CAD: "C$" (both)
 * - CHF: "Fr" (en), "CHF" (pt-BR)
 * - CNY: "¥" (both)
 * - BRL: "R$" (both)
 * - BTC: "₿" (both)
 * - ETH: "Ξ" (both)
 *
 * The `code` is the ISO 4217 code (or ticker for crypto), used with
 * `Intl.NumberFormat` for proper locale-aware formatting.
 */

export type CurrencyCode =
	'USD' | 'EUR' | 'JPY' | 'GBP' | 'AUD' | 'CAD' | 'CHF' | 'CNY' | 'BRL' | 'BTC' | 'ETH';

export interface CurrencyDef {
	/** ISO 4217 code or crypto ticker. */
	code: CurrencyCode;
	/** Human-readable name (English). */
	name: string;
	/** Symbol per locale. */
	symbols: Record<string, string>;
	/** Default number of decimal places. */
	decimals: number;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyDef> = {
	USD: {
		code: 'USD',
		name: 'US Dollar',
		symbols: { en: '$', 'pt-BR': 'US$' },
		decimals: 2
	},
	EUR: {
		code: 'EUR',
		name: 'Euro',
		symbols: { en: '€', 'pt-BR': '€' },
		decimals: 2
	},
	JPY: {
		code: 'JPY',
		name: 'Japanese Yen',
		symbols: { en: '¥', 'pt-BR': '¥' },
		decimals: 0
	},
	GBP: {
		code: 'GBP',
		name: 'British Pound',
		symbols: { en: '£', 'pt-BR': '£' },
		decimals: 2
	},
	AUD: {
		code: 'AUD',
		name: 'Australian Dollar',
		symbols: { en: 'A$', 'pt-BR': 'A$' },
		decimals: 2
	},
	CAD: {
		code: 'CAD',
		name: 'Canadian Dollar',
		symbols: { en: 'C$', 'pt-BR': 'C$' },
		decimals: 2
	},
	CHF: {
		code: 'CHF',
		name: 'Swiss Franc',
		symbols: { en: 'Fr', 'pt-BR': 'CHF' },
		decimals: 2
	},
	CNY: {
		code: 'CNY',
		name: 'Chinese Yuan',
		symbols: { en: '¥', 'pt-BR': '¥' },
		decimals: 2
	},
	BRL: {
		code: 'BRL',
		name: 'Brazilian Real',
		symbols: { en: 'R$', 'pt-BR': 'R$' },
		decimals: 2
	},
	BTC: {
		code: 'BTC',
		name: 'Bitcoin',
		symbols: { en: '₿', 'pt-BR': '₿' },
		decimals: 8
	},
	ETH: {
		code: 'ETH',
		name: 'Ethereum',
		symbols: { en: 'Ξ', 'pt-BR': 'Ξ' },
		decimals: 6
	}
};

/**
 * Returns the symbol for a currency in the given locale.
 * Falls back to the English symbol if the locale is not found.
 */
export function getCurrencySymbol(code: CurrencyCode, locale: string): string {
	const currency = CURRENCIES[code];
	if (!currency) return code;
	return currency.symbols[locale] ?? currency.symbols.en ?? code;
}

/**
 * Returns the default number of decimal places for a currency.
 */
export function getCurrencyDecimals(code: CurrencyCode): number {
	return CURRENCIES[code]?.decimals ?? 2;
}

/**
 * Returns the list of supported currencies (for use in selectors).
 */
export function getSupportedCurrencies(): Array<{
	code: CurrencyCode;
	name: string;
	symbol: string;
}> {
	return Object.values(CURRENCIES).map((c) => ({
		code: c.code,
		name: c.name,
		symbol: c.symbols.en
	}));
}
