import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: [], // No external setup files — using inline mocks in tests
		include: ['src/**/*.test.{ts,tsx,vue,svelte}', 'src/**/*Spec.{ts,tsx,vue,svelte}']
	}
});
