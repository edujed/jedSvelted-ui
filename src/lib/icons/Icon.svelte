<script lang="ts">
	import IconEye from './IconEye.svelte';
	import IconFile from './IconFile.svelte';
	import IconFolder from './IconFolder.svelte';
	import IconFolderOpen from './IconFolderOpen.svelte';
	import IconEdit from './IconEdit.svelte';
	import IconTrash from './IconTrash.svelte';
	import IconUser from './IconUser.svelte';
	import IconMore from './IconMore.svelte';
	import IconChevronRight from './IconChevronRight.svelte';
	import IconCheck from './IconCheck.svelte';
	import IconX from './IconX.svelte';
	import IconWallet from './IconWallet.svelte';
	import IconBank from './IconBank.svelte';
	import IconClock from './IconClock.svelte';
	import IconMenu from './IconMenu.svelte';
	import IconDownload from './IconDownload.svelte';
	import IconSun from './IconSun.svelte';
	import IconMoon from './IconMoon.svelte';
	import IconSort from './IconSort.svelte';
	import IconPlus from './IconPlus.svelte';
	import IconChevronDown from './IconChevronDown.svelte';
	import IconCircle from './IconCircle.svelte';
	import IconFilter from './IconFilter.svelte';
	import IconSearch from './IconSearch.svelte';
	import IconSettings from './IconSettings.svelte';
	import IconUserAlt from './IconUserAlt.svelte';
	import IconTree from './IconTree.svelte';
	import IconBuilding from './IconBuilding.svelte';
	import type { IconName } from './iconsTypes';

	/** Icon registry — add new icons here (and in `iconsTypes.ts`) */
	const ICON_MAP = {
		eye: IconEye,
		file: IconFile,
		folder: IconFolder,
		'folder-open': IconFolderOpen,
		edit: IconEdit,
		trash: IconTrash,
		user: IconUser,
		more: IconMore,
		'chevron-right': IconChevronRight,
		check: IconCheck,
		x: IconX,
		wallet: IconWallet,
		bank: IconBank,
		clock: IconClock,
		menu: IconMenu,
		download: IconDownload,
		sun: IconSun,
		moon: IconMoon,
		sort: IconSort,
		plus: IconPlus,
		'chevron-down': IconChevronDown,
		circle: IconCircle,
		filter: IconFilter,
		search: IconSearch,
		settings: IconSettings,
		'user-alt': IconUserAlt,
		tree: IconTree,
		building: IconBuilding
	} as const;

	let {
		name = 'eye',
		size = 16,
		class: className = ''
	}: {
		name?: IconName;
		size?: number;
		class?: string;
	} = $props();

	// Selects the icon component based on the name
	const IconComponent = $derived(ICON_MAP[name] ?? IconEye);
</script>

<IconComponent {size} class={className} />
