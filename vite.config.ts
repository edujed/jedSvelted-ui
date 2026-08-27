import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: [], // Sem arquivos externos — usamos mocks inline nos testes
		include: ['src/**/*.test.{ts,tsx,vue,svelte}', 'src/**/*Spec.{ts,tsx,vue,svelte}']
	}
});
