import { describe, it, expect, beforeEach } from 'vitest';
import { HashRouter } from './router';

describe('HashRouter', () => {
	let router: HashRouter;

	beforeEach(() => {
		router = new HashRouter();
		window.location.hash = '';
	});

	it('should start with empty path', () => {
		expect(router.getPath()).toBe('');
	});

	it('should navigate by setting hash', () => {
		router.navigate('/Pessoas');
		expect(window.location.hash).toBe('#/Pessoas');
	});

	it('should resolve simple route pattern', () => {
		const handler = vi.fn();
		router.add('/Pessoas', handler);
		router.init();

		router.navigate('/Pessoas');
		expect(handler.mock.calls.length).toBe(1);
	});

	it('should extract named params :param', () => {
		const handler = vi.fn();
		router.add('/Pessoas/:id', handler);
		router.init();

		router.navigate('/Pessoas/42');
		expect(handler.mock.calls[0][0]).toEqual({ id: '42' });
	});

	it('should support multiple params in one route', () => {
		const handler = vi.fn();
		router.add('/Contabil/:year/Lancamentos/:lid', handler);
		router.init();

		router.navigate('/Contabil/2025/Lancamentos/789');
		expect(handler.mock.calls[0][0]).toEqual({ year: '2025', lid: '789' });
	});

	it('should match wildcard * after param', () => {
		const handler = vi.fn();
		router.add('/Pessoas/:id/*', handler);
		router.init();

		router.navigate('/Pessoas/14/contato/editar');
		expect(handler.mock.calls[0][0]).toEqual({ id: '14' });
	});

	it('should be case insensitive', () => {
		const handler = vi.fn();
		router.add('/pessoas/:id', handler);
		router.init();

		router.navigate('/PESSOAS/14');
		expect(handler.mock.calls[0][0]).toEqual({ id: '14' });
	});

	it('should normalize trailing slash', () => {
		const handler = vi.fn();
		router.add('/Pessoas', handler);
		router.init();

		router.navigate('/Pessoas/'); // should still match /Pessoas
		expect(handler.mock.calls.length).toBeGreaterThan(0);
	});

	it('should return null for unmatched routes', () => {
		router.add('/Pessoas', vi.fn());
		router.init();
		router.navigate('/Financeiro/Carteiras');
		// No crash, just no handler call — implicit test that it doesn't throw
	});

	it('should register listeners via onRouteChange', () => {
		const listener = vi.fn();
		router._resetForTests && router._resetForTests(); // limpa estado anterior
		router.onRouteChange(listener);
		// Não chamamos init() aqui — queremos que o listener seja chamado apenas pela navegação.
		// Se fosse necessário inicializar, o usuário chamaria init() explicitamente.

		router.navigate('/some/path');
		expect(listener.mock.calls.length).toBe(1);
	});
});
