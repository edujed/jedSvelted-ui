<script lang="ts">
	import IconEye from './IconEye.svelte';
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
	import ChevronDownIcon from './ChevronDownIcon.svelte';
	import CircleIcon from './CircleIcon.svelte';
	import FilterIcon from './FilterIcon.svelte';
	import SearchIcon from './SearchIcon.svelte';
	import SettingsIcon from './SettingsIcon.svelte';
	import UserIcon from './UserIcon.svelte';

	/** Icon registry — add new icons here */
	const ICON_MAP = {
		eye: IconEye,
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
		'chevron-down': ChevronDownIcon,
		circle: CircleIcon,
		filter: FilterIcon,
		search: SearchIcon,
		settings: SettingsIcon,
		'user-alt': UserIcon
	} as const;

	let {
		name = 'eye',
		size = 16,
		class: className = ''
	}: {
		name?: string;
		size?: number;
		class?: string;
	} = $props();

	// Selects the icon component based on the name
	const IconComponent = $derived(ICON_MAP[name as keyof typeof ICON_MAP] ?? IconEye);
</script>

<IconComponent {size} class={className} />
