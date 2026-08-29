import { describe, it, expect, beforeEach } from 'vitest';
import type { HandleDetalheOptions } from './handleDetalheAction';
import { createHandleDetalhe } from './handleDetalheAction';

interface Item extends Record<string, unknown> {
	id?: number;
	nome: string;
}

describe('createHandleDetalhe', () => {
	let opts: HandleDetalheOptions<Item>;
	let handler: ReturnType<typeof createHandleDetalhe<Item>>;

	beforeEach(() => {
		opts = {
			dataRef: { data: [] as unknown as Item[] },
			toast: { success: vi.fn(), warning: vi.fn() },
			itemName: 'Pessoa'
		};
		handler = createHandleDetalhe(opts);
		vi.clearAllMocks();
	});

	describe('handleSave (new item)', () => {
		it('should add a new item without id', () => {
			handler.handleSave({ nome: 'Nova Pessoa' });
			expect(handler.dataRef.data.length).toBe(1);
			expect((handler.dataRef.data[0] as Item).nome).toBe('Nova Pessoa');
			expect(typeof (handler.dataRef.data[0] as Item).id).toBe('number');
			expect(opts.toast.success.mock.calls[0][0]).toContain('Nova Pessoa');
		});

		it('prepends new item via unshift', () => {
			handler.dataRef.data.push({ id: 99, nome: 'Anterior' });
			handler.handleSave({ nome: 'Primeiro' });
			expect(handler.dataRef.data[0].nome).toBe('Primeiro');
		});
	});

	describe('handleSave (update existing)', () => {
		it('should update an existing item by id', () => {
			const original = { id: 5, nome: 'Original' };
			handler.dataRef.data.push(original);
			handler.handleSave({ id: 5, nome: 'Atualizado' });
			expect(handler.dataRef.data[0].nome).toBe('Atualizado');
			expect(opts.toast.success.mock.calls[0][0]).toContain('atualizada');
		});
	});

	describe('handleDelete', () => {
		it('should remove the item with matching id', () => {
			handler.dataRef.data.push({ id: 1, nome: 'A' }, { id: 2, nome: 'B' });
			handler.handleDelete({ id: 1 } as Item);
			expect(handler.dataRef.data.length).toBe(1);
			expect(handler.dataRef.data[0].nome).toBe('B');
		});

		it('does nothing if id not found in array', () => {
			handler.dataRef.data.push({ id: 1, nome: 'A' });
			handler.handleDelete({ id: 999 } as Item);
			expect(handler.dataRef.data.length).toBe(1);
		});

		it('calls toast.warning on delete', () => {
			handler.dataRef.data.push({ id: 1, nome: 'X' });
			handler.handleDelete({ id: 1 } as Item);
			expect(opts.toast.warning.mock.calls[0][0]).toContain('excluída');
		});
	});

	describe('handleDetalheAction', () => {
		it('routes save action to handleSave', () => {
			handler.handleDetalheAction('save', { id: 1, nome: 'Item' });
			expect(opts.toast.success.mock.calls[0][0]).toContain('Item');
		});

		it('routes confirm-delete action to handleDelete', () => {
			handler.dataRef.data.push({ id: 1, nome: 'Para eliminar' });
			handler.handleDetalheAction('confirm-delete', { id: 1 } as Item);
			expect(handler.dataRef.data.length).toBe(0);
		});

		it('ignores unknown actions', () => {
			handler.handleDetalheAction('unknown-action', {} as Record<string, unknown>);
			expect(opts.toast.success.mock.calls.length).toBe(0);
		});

		it('returns early when item is undefined', () => {
			handler.handleDetalheAction('save', undefined);
			expect(opts.toast.success.mock.calls.length).toBe(0);
		});
	});

	describe('getDisplayValue fallbacks', () => {
		it('uses displayFields when provided and present', () => {
			const h = createHandleDetalhe<Item>({ ...opts, displayFields: ['nome'] });
			h.handleSave({ nome: 'Teste' });
			expect(opts.toast.success.mock.calls[0][0]).toContain('Teste');
		});

		it('falls back to #id when no fields available', () => {
			const h = createHandleDetalhe<Item>({ ...opts, displayFields: [] });
			h.handleSave({ id: 42 } as Item);
			expect(opts.toast.success.mock.calls[0][0]).toContain('#42');
		});
	});
});
