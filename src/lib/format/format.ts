/**
 * Formatting utilities for display values.
 *
 * These functions are pure — they take a value and a locale, and return a
 * formatted string. They do NOT use runes or reactive state.
 */

import { getCurrencySymbol, getCurrencyDecimals, type CurrencyCode } from '../i18n/currencies';

/**
 * Format a number as currency (e.g. 1234.56 → "R$ 1.234,56" in pt-BR).
 * Always shows the configured number of decimal places.
 *
 * @param value - The number to format.
 * @param locale - The locale (e.g. 'en', 'pt-BR').
 * @param options - Optional overrides for decimals and currency code.
 */
export function formatCurrency(
	value: number | undefined | null,
	locale: string,
	options?: { decimals?: number; currency?: CurrencyCode }
): string {
	if (value === undefined || value === null) return '—';
	const currency = options?.currency ?? 'BRL';
	const decimals = options?.decimals ?? getCurrencyDecimals(currency);
	const localeStr = locale === 'pt-BR' ? 'pt-BR' : 'en-US';
	const symbol = getCurrencySymbol(currency, locale);

	// For crypto currencies, use plain number formatting (no Intl currency support)
	if (currency === 'BTC' || currency === 'ETH') {
		const formatted = value.toLocaleString(localeStr, {
			minimumFractionDigits: decimals,
			maximumFractionDigits: decimals
		});
		return `${symbol} ${formatted}`;
	}

	// For fiat currencies, use Intl.NumberFormat with currency style
	const formatted = value.toLocaleString(localeStr, {
		style: 'currency',
		currency,
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals
	});
	// Ensure a space between the currency symbol and the number (en-US doesn't add one)
	return formatted.replace(/([A-Z$€£])(\d)/, '$1 $2');
}

/**
 * Format a number with thousands separators and fixed decimal places
 * (e.g. 1234.56 → "1.234,56" in pt-BR, "1,234.56" in en-US).
 */
export function formatNumber(
	value: number | undefined | null,
	locale: string,
	decimals?: number
): string {
	if (value === undefined || value === null) return '—';
	const localeStr = locale === 'pt-BR' ? 'pt-BR' : 'en-US';
	return value.toLocaleString(localeStr, {
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals
	});
}

/**
 * Format a date as a locale-aware date string (e.g. "15/03/2024" in pt-BR).
 */
export function formatDate(value: string | Date | undefined | null, locale: string): string {
	if (!value) return '—';
	const date = value instanceof Date ? value : new Date(value);
	if (isNaN(date.getTime())) return '—';
	const localeStr = locale === 'pt-BR' ? 'pt-BR' : 'en-US';
	return date.toLocaleDateString(localeStr);
}

/**
 * Format a date and time as a locale-aware string (e.g. "15/03/2024 14:30" in pt-BR).
 */
export function formatDateTime(value: string | Date | undefined | null, locale: string): string {
	if (!value) return '—';
	const date = value instanceof Date ? value : new Date(value);
	if (isNaN(date.getTime())) return '—';
	const localeStr = locale === 'pt-BR' ? 'pt-BR' : 'en-US';
	return date.toLocaleString(localeStr, {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit'
	});
}

/**
 * Parse a formatted currency/number string back to a number.
 * Handles both pt-BR ("1.234,56") and en-US ("1,234.56") formats.
 */
export function parseCurrency(str: string | undefined | null): number {
	if (!str || str.trim() === '') return 0;
	// Remove all non-numeric characters except . and ,
	let cleaned = str.replace(/[^\d.,]/g, '');
	if (!cleaned) return 0;
	// Determine which is the decimal separator (the last one present)
	const lastDot = cleaned.lastIndexOf('.');
	const lastComma = cleaned.lastIndexOf(',');
	let decimalSep: string;
	let thousandsSep: string;
	if (lastDot > lastComma) {
		// . is decimal, , is thousands (e.g. "1,234.56")
		decimalSep = '.';
		thousandsSep = ',';
	} else if (lastComma > lastDot) {
		// , is decimal, . is thousands (e.g. "1.234,56")
		decimalSep = ',';
		thousandsSep = '.';
	} else {
		// Only one type of separator present — assume it's decimal
		if (lastDot >= 0) {
			decimalSep = '.';
			thousandsSep = ',';
		} else if (lastComma >= 0) {
			decimalSep = ',';
			thousandsSep = '.';
		} else {
			decimalSep = '.';
			thousandsSep = ',';
		}
	}
	// Remove thousands separators and convert decimal to dot
	cleaned = cleaned.split(thousandsSep).join('');
	cleaned = cleaned.split(decimalSep).join('.');
	const parsed = parseFloat(cleaned);
	return isNaN(parsed) ? 0 : parsed;
}

/**
 * Strip the thousands separator from a formatted string.
 * e.g. "2.100.000,00" (pt-BR) → "2100000,00"
 *      "2,100,000.00" (en-US) → "2100000.00"
 */
export function stripThousands(str: string, locale: string): string {
	const thousandsSep = locale === 'pt-BR' ? '.' : ',';
	return str.split(thousandsSep).join('');
}
