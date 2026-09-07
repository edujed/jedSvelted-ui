<script lang="ts">
	import FileTree from './FileTree.svelte';
	import IconFolder from '../icons/IconFolder.svelte';
	import IconFolderOpen from '../icons/IconFolderOpen.svelte';
	import IconFile from '../icons/IconFile.svelte';
	import type { FileTreeProps } from './uiTypes';

	let {
		node,
		toggleFile,
		onViewFile,
		selectedFiles = [],
		defaultExpanded = true,
		class: className = ''
	}: FileTreeProps = $props();

	let expanded = $state(true);

	function toggleExpand() {
		expanded = !expanded;
	}

	function handleFileClick() {
		if (!node.is_dir && onViewFile) {
			onViewFile(node.path, node.name);
		}
	}

	function handleCheck() {
		if (toggleFile && node.path) {
			toggleFile(node.path);
		}
	}
</script>

<div class="tree-node {className}">
	{#if node.is_dir}
		<div
			class="folder-header"
			role="button"
			tabindex="0"
			onclick={toggleExpand}
			onkeydown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					toggleExpand();
				}
			}}
		>
			{#if expanded}
				<IconFolderOpen size={16} class="folder-icon" />
			{:else}
				<IconFolder size={16} class="folder-icon" />
			{/if}
			<span class="folder-name">{node.name}</span>
		</div>

		{#if expanded && node.children}
			<div class="children">
				{#each node.children as child (child.path)}
					<FileTree node={child} {toggleFile} {onViewFile} {selectedFiles} {defaultExpanded} />
				{/each}
			</div>
		{/if}
	{:else}
		<div
			class="file-item"
			role="button"
			tabindex="0"
			onclick={handleFileClick}
			onkeydown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					handleFileClick();
				}
			}}
			title={node.path}
		>
			<input
				type="checkbox"
				checked={selectedFiles.includes(node.path)}
				onchange={handleCheck}
				onclick={(e) => e.stopPropagation()}
			/>
			<IconFile size={14} class="file-icon" />
			<span class="file-name">{node.name}</span>
		</div>
	{/if}
</div>

<style>
	.tree-node {
		font-size: var(--font-size-sm);
		user-select: none;
	}

	.folder-header {
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
		padding: var(--spacing-xxs) 0;
		color: var(--color-on-surface);
		border-radius: var(--radius-sm);
		transition: color var(--transition-fast);
	}

	.folder-header:hover {
		color: var(--color-primary);
	}

	.folder-icon {
		flex-shrink: 0;
	}

	.folder-name {
		font-weight: 400;
	}

	.children {
		padding-left: var(--spacing-md);
		border-left: 1px dashed var(--color-border);
		margin-left: var(--spacing-xxs);
	}

	.file-item {
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
		padding: var(--spacing-xxs) var(--spacing-xs);
		cursor: pointer;
		color: var(--color-on-surface);
		border-radius: var(--radius-sm);
		margin: 0 var(--spacing-xs);
		transition:
			color var(--transition-fast),
			background var(--transition-fast);
	}

	.file-item:hover {
		color: var(--color-primary);
		background: var(--color-sidenav-hover);
	}

	.file-item input[type='checkbox'] {
		margin: 0;
		accent-color: var(--color-primary);
		flex-shrink: 0;
	}

	.file-icon {
		flex-shrink: 0;
		opacity: 0.7;
	}

	.file-name {
		word-break: break-all;
	}
</style>
