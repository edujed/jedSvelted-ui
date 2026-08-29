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

	/** Registry de ícones — adicione novos ícones aqui */
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
		clock: IconClock
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

	// Seleciona o componente do ícone baseado no nome
	const IconComponent = $derived(ICON_MAP[name as keyof typeof ICON_MAP] ?? IconEye);
</script>

<IconComponent {size} class={className} />
