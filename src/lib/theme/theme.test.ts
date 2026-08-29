import { describe, it, expect, beforeEach } from 'vitest';
import * as themeModule from '../theme';

// Mock localStorage globalmente para testes de tema
const storage = new Map<string, string>();
globalThis.localStorage = {
	getItem(key) {
		return storage.get(key) ?? null;
	},
	setItem(key, value) {
		storage.set(key, value);
	},
	removeItem(key) {
		storage.delete(key);
	},
	clear() {
		storage.clear();
	}
} as Storage;

describe('theme', () => {
	beforeEach(() => {
		storage.clear();
		document.documentElement.removeAttribute('data-theme');
		document.documentElement.removeAttribute('data-mode');
	});

	describe('initTheme', () => {
		it('should use default prefix "s-" for localStorage keys', () => {
			const keys = themeModule.getKeys();
			expect(keys.THEME_KEY).toBe('s-theme');
			expect(keys.MODE_KEY).toBe('s-mode');
		});

		it('should accept custom prefix via initTheme()', () => {
			themeModule.initTheme('app1');
			const keys = themeModule.getKeys();
			expect(keys.THEME_KEY).toBe('app1-theme');
			expect(keys.MODE_KEY).toBe('app1-mode');
		});

		it('should return default values when nothing is stored', () => {
			const result = themeModule.initTheme();
			expect(result.theme).toBe('material-blue');
			expect(result.mode).toBe('light');
		});

		it('should apply data attributes on init', () => {
			themeModule.initTheme();
			expect(document.documentElement.getAttribute('data-theme')).toBe('material-blue');
			expect(document.documentElement.getAttribute('data-mode')).toBe('light');
		});

		it('should use stored theme if valid', () => {
			const keys = themeModule.getKeys();
			localStorage.setItem(keys.THEME_KEY, 'rose');
			localStorage.setItem(keys.MODE_KEY, 'dark');

			const result = themeModule.initTheme();
			expect(result.theme).toBe('rose');
			expect(result.mode).toBe('dark');
		});

		it('should reset invalid stored theme to default', () => {
			const keys = themeModule.getKeys();
			localStorage.setItem(keys.THEME_KEY, 'invalid-theme-id');
			const result = themeModule.initTheme();
			expect(result.theme).toBe('material-blue');
		});

		it('should update stores after init', () => {
			const keys = themeModule.getKeys();
			localStorage.setItem(keys.THEME_KEY, 'relax');
			localStorage.setItem(keys.MODE_KEY, 'dark');

			themeModule.initTheme();
			expect(themeModule.themeStore.get()).toBe('relax');
			expect(themeModule.modeStore.get()).toBe('dark');
		});
	});

	describe('applyTheme', () => {
		it('should set attribute and store with correct key', () => {
			themeModule.applyTheme('humanity');
			expect(document.documentElement.getAttribute('data-theme')).toBe('humanity');
			const keys = themeModule.getKeys();
			expect(localStorage.getItem(keys.THEME_KEY)).toBe('humanity');
			expect(themeModule.themeStore.get()).toBe('humanity');
		});
	});

	describe('toggleMode', () => {
		it('should toggle between light and dark', () => {
			let mode = themeModule.toggleMode();
			expect(mode).toBe('dark');
			mode = themeModule.toggleMode();
			expect(mode).toBe('light');
		});

		it('should persist the new mode with correct key', () => {
			themeModule.toggleMode();
			const keys = themeModule.getKeys();
			expect(localStorage.getItem(keys.MODE_KEY)).toBe('dark');
		});
	});

	describe('getCurrentTheme / getCurrentMode', () => {
		it('should read from DOM with fallbacks', () => {
			expect(themeModule.getCurrentTheme()).toBe('material-blue');
			expect(themeModule.getCurrentMode()).toBe('light');
		});

		it('should return current values when attributes are set', () => {
			document.documentElement.setAttribute('data-theme', 'rose');
			document.documentElement.setAttribute('data-mode', 'dark');
			expect(themeModule.getCurrentTheme()).toBe('rose');
			expect(themeModule.getCurrentMode()).toBe('dark');
		});
	});
});
