<script lang="ts">
	import { toasts, removeToast } from '../toast';
	import ToastComponent from './Toast.svelte';
</script>

<div class="toast-container">
	{#each $toasts as toast (toast.id)}
		<ToastComponent {toast} onClose={removeToast} />
	{/each}
</div>

<style>
	.toast-container {
		position: fixed;
		top: calc(var(--navbar-height, 56px) + var(--spacing-md));
		right: var(--spacing-md);
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
		z-index: 500;
		pointer-events: none;
	}

	.toast-container :global(*) {
		pointer-events: auto;
	}

	@media (max-width: 600px) {
		.toast-container {
			right: var(--spacing-sm);
			left: var(--spacing-sm);
			max-width: calc(100vw - var(--spacing-md));
		}
	}
</style>
