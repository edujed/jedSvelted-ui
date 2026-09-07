/**
 * Pure utilities for navigation (route pattern matching and cleaning).
 *
 * NOTE: This file does NOT use runes — it contains pure logic only.
 */

/**
 * Cleans a route pattern by removing parameter (`:id`) and wildcard (`*`)
 * segments, leaving only the static path.
 * Example: "/users/:id/posts" → "/users"
 */
export function cleanPattern(pattern: string): string {
	return pattern
		.replace(/(\/:\w+\??|\*)/g, '')
		.replace(/\/+(?!$)/g, '/')
		.replace(/^\/+/, '/')
		.replace(/\/+$/, '');
}

/**
 * Checks if a current path matches a cleaned route pattern,
 * considering exact match or prefix (sub-routes).
 */
export function isRouteActive(pattern: string, currentPath: string): boolean {
	const normalizedCurrent =
		currentPath.endsWith('/') && currentPath !== '/' ? currentPath.slice(0, -1) : currentPath;
	const clean = pattern.toLowerCase();
	const current = normalizedCurrent.toLowerCase();
	return current === clean || current.startsWith(clean + '/');
}
