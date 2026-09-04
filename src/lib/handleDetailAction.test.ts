import { describe, it, expect, beforeEach } from 'vitest';
import type { HandleDetailOptions } from './handleDetailAction';
import { createHandleDetail } from './handleDetailAction';

interface Item extends Record<string, unknown> {
	id?: number;
	name: string;
}

describe('createHandleDetail', () => {
	let opts: HandleDetailOptions<Item>;
	let handler: ReturnType<typeof createHandleDetail<Item>>;

	beforeEach(() => {
		opts = {
			dataRef: { data: [] as unknown as Item[] },
			toast: { success: vi.fn(), warning: vi.fn() },
			itemName: 'Person'
		};
		handler = createHandleDetail(opts);
		vi.clearAllMocks();
	});

	describe('handleSave (new item)', () => {
		it('should add a new item without id', () => {
			const h = createHandleDetail<Item>({ ...opts, displayFields: ['name'] });
			h.handleSave({ name: 'New Person' });
			expect(h.dataRef.data.length).toBe(1);
			expect((h.dataRef.data[0] as Item).name).toBe('New Person');
			expect(typeof (h.dataRef.data[0] as Item).id).toBe('number');
			expect(opts.toast.success.mock.calls[0][0]).toContain('New Person');
		});

		it('prepends new item via unshift', () => {
			handler.dataRef.data.push({ id: 99, name: 'Previous' });
			handler.handleSave({ name: 'First' });
			expect(handler.dataRef.data[0].name).toBe('First');
		});
	});

	describe('handleSave (update existing)', () => {
		it('should update an existing item by id', () => {
			const original = { id: 5, name: 'Original' };
			handler.dataRef.data.push(original);
			handler.handleSave({ id: 5, name: 'Updated' });
			expect(handler.dataRef.data[0].name).toBe('Updated');
			expect(opts.toast.success.mock.calls[0][0]).toContain('updated');
		});
	});

	describe('handleDelete', () => {
		it('should remove the item with matching id', () => {
			handler.dataRef.data.push({ id: 1, name: 'A' }, { id: 2, name: 'B' });
			handler.handleDelete({ id: 1 } as Item);
			expect(handler.dataRef.data.length).toBe(1);
			expect(handler.dataRef.data[0].name).toBe('B');
		});

		it('does nothing if id not found in array', () => {
			handler.dataRef.data.push({ id: 1, name: 'A' });
			handler.handleDelete({ id: 999 } as Item);
			expect(handler.dataRef.data.length).toBe(1);
		});

		it('calls toast.warning on delete', () => {
			handler.dataRef.data.push({ id: 1, name: 'X' });
			handler.handleDelete({ id: 1 } as Item);
			expect(opts.toast.warning.mock.calls[0][0]).toContain('deleted');
		});
	});

	describe('handleDetailAction', () => {
		it('routes create action to handleSave (new item)', () => {
			const h = createHandleDetail<Item>({ ...opts, displayFields: ['name'] });
			h.handleDetailAction('create', { name: 'Item' });
			expect(opts.toast.success.mock.calls[0][0]).toContain('Item');
		});

		it('routes update action to handleSave (existing item)', () => {
			const h = createHandleDetail<Item>({ ...opts, displayFields: ['name'] });
			h.dataRef.data.push({ id: 1, name: 'Original' });
			h.handleDetailAction('update', { id: 1, name: 'Item' });
			expect(opts.toast.success.mock.calls[0][0]).toContain('Item');
		});

		it('routes delete action to handleDelete', () => {
			handler.dataRef.data.push({ id: 1, name: 'To delete' });
			handler.handleDetailAction('delete', { id: 1 } as Item);
			expect(handler.dataRef.data.length).toBe(0);
		});

		it('ignores unknown actions', () => {
			handler.handleDetailAction('unknown-action', {} as Record<string, unknown>);
			expect(opts.toast.success.mock.calls.length).toBe(0);
		});

		it('returns early when item is undefined', () => {
			handler.handleDetailAction('save', undefined);
			expect(opts.toast.success.mock.calls.length).toBe(0);
		});
	});

	describe('getDisplayValue fallbacks', () => {
		it('uses displayFields when provided and present', () => {
			const h = createHandleDetail<Item>({ ...opts, displayFields: ['name'] });
			h.handleSave({ name: 'Test' });
			expect(opts.toast.success.mock.calls[0][0]).toContain('Test');
		});

		it('falls back to #id when no fields available', () => {
			const h = createHandleDetail<Item>({ ...opts, displayFields: [] });
			h.handleSave({ id: 42 } as Item);
			expect(opts.toast.success.mock.calls[0][0]).toContain('#42');
		});
	});
});
