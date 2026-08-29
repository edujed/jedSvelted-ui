/**
 * Centralized navigation menu configuration
 * SINGLE source of truth for sidebar menu items definition
 */

export interface MenuItem {
	label: string;
	path: string;
	icon: string;
}

export interface MenuGroup {
	group: string;
	items: MenuItem[];
}

// Example — adjust as needed
export const MENU_CONFIG: MenuGroup[] = [
	{
		group: 'Main',
		items: [{ label: 'Home', path: '/', icon: '🏠' }]
	}
];
