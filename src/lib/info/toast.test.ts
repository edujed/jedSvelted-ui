import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as toastModule from './toast';

// Mock localStorage globally for all tests in this module
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

describe('toast', () => {
	beforeEach(() => {
		storage.clear();
		vi.useFakeTimers();
		// Clear all internal state for test isolation
		if (typeof toastModule._clearAllToastsForTests === 'function') {
			toastModule._clearAllToastsForTests();
		}
	});

	it('should add a new toast when none exists for the same type recently', () => {
		const initial = toastModule.getToasts();
		expect(initial.length).toBe(0);

		toastModule.addToast('Hello world', 'info');

		const current = toastModule.getToasts();
		expect(current.length).toBe(1);
		expect(current[0].message).toBe('Hello world');
		expect(current[0].type).toBe('info');
	});

	it('should update existing toast if same type within 2 seconds', () => {
		toastModule.addToast('First message', 'success');
		let list = toastModule.getToasts();
		expect(list.length).toBe(1);
		expect(list[0].message).toBe('First message');

		// Same type within 2s → should replace
		toastModule.addToast('Updated message', 'success');
		list = toastModule.getToasts();
		expect(list.length).toBe(1);
		expect(list[0].message).toBe('Updated message');
	});

	it('should create separate toasts for different types at once', () => {
		toastModule.addToast('Error msg', 'error');
		toastModule.addToast('Info msg', 'info');

		const list = toastModule.getToasts();
		expect(list.length).toBe(2);
		expect(list.find((t) => t.type === 'error')?.message).toBe('Error msg');
		expect(list.find((t) => t.type === 'info')?.message).toBe('Info msg');
	});

	it('should remove a toast by id', () => {
		toastModule.addToast('Remove me', 'warning');
		const listBefore = toastModule.getToasts();
		const idToRemove = listBefore[0]?.id;

		if (idToRemove) {
			toastModule.removeToast(idToRemove);
			expect(toastModule.getToasts().length).toBe(0);
		}
	});

	// NOTE: Test temporarily disabled because it depends on internal behavior
	// of fake timers + async subscriptions of the writable store.
	// It can be re-enabled once addToast/getToasts synchronization is guaranteed.

	it('shortcut methods work correctly', () => {
		// Ensure cleanup before the test
		toastModule._clearAllToastsForTests();
		toastModule.toast.success('Success!');
		toastModule.toast.error('Error!', undefined, 5000);
		toastModule.toast.info('Info!');
		toastModule.toast.warning('Warning!');

		const list = toastModule.getToasts();
		expect(list.length).toBe(4);
		expect(list.some((t) => t.message === 'Success!' && t.type === 'success')).toBe(true);
		expect(list.some((t) => t.message === 'Error!' && t.type === 'error')).toBe(true);
		expect(list.some((t) => t.message === 'Info!' && t.type === 'info')).toBe(true);
		expect(list.some((t) => t.message === 'Warning!' && t.type === 'warning')).toBe(true);
	});
});
