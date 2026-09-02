/** Simple state holder for page-level UI behavior (detail panel, loading, errors). */
export type DetailAction = 'detail' | 'edit' | 'delete';

export class PageState {
	loading = $state(false);
	error = $state('');
	showDetail = $state(false);
	selectedItem = $state<Record<string, unknown> | undefined>(undefined);
	detailAction = $state<DetailAction>('detail');

	setLoading(value: boolean) {
		this.loading = value;
	}
	setError(message: string) {
		this.error = message;
	}

	private doAction(action: DetailAction, row: Record<string, unknown>): void {
		if (!row || typeof row !== 'object') return;
		this.selectedItem = row;
		this.detailAction = action;
		this.showDetail = true;
	}

	show(row: Record<string, unknown>): void {
		this.doAction('detail', row);
	}

	edit(row: Record<string, unknown>): void {
		this.doAction('edit', row);
	}

	deleteRow(row: Record<string, unknown>): void {
		this.doAction('delete', row);
	}

	close(): void {
		this.showDetail = false;
		this.selectedItem = undefined;
		this.detailAction = 'detail';
	}
}
