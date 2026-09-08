/** Simple state holder for page-level UI behavior (detail panel, loading, errors). */
import type { DetailAction } from './pagesTypes';

type Listener = () => void;

export class PageState {
	private _loading = false;
	private _error = '';
	private _showDetail = false;
	private _selectedItem: Record<string, unknown> | undefined;
	private _detailAction: DetailAction = 'detail';
	private _detailKey = 0;
	private listeners = new Set<Listener>();

	get loading() {
		return this._loading;
	}
	get error() {
		return this._error;
	}
	get showDetail() {
		return this._showDetail;
	}
	get selectedItem() {
		return this._selectedItem;
	}
	get detailAction() {
		return this._detailAction;
	}
	/** Increments on every show/edit/deleteRow — used as a key to force remount of the detail content. */
	get detailKey() {
		return this._detailKey;
	}

	subscribe(listener: Listener): () => void {
		this.listeners.add(listener);
		return () => this.listeners.delete(listener);
	}

	private notify() {
		this.listeners.forEach((l) => l());
	}

	setLoading(value: boolean) {
		this._loading = value;
		this.notify();
	}

	/**
	 * Sets loading to true, then back to false after `ms` milliseconds.
	 * Useful for demoing the loading state with synchronous/mock data.
	 */
	setLoadingFor(ms: number) {
		this._loading = true;
		this.notify();
		setTimeout(() => {
			this._loading = false;
			this.notify();
		}, ms);
	}

	setError(message: string) {
		this._error = message;
		this.notify();
	}

	private doAction(action: DetailAction, row: Record<string, unknown>) {
		if (!row || typeof row !== 'object') return;
		this._selectedItem = row;
		this._detailAction = action;
		this._showDetail = true;
		this._detailKey++;
		this.notify();
	}

	show(row: Record<string, unknown>) {
		this.doAction('detail', row);
	}

	edit(row: Record<string, unknown>) {
		this.doAction('edit', row);
	}

	deleteRow(row: Record<string, unknown>) {
		this.doAction('delete', row);
	}

	close() {
		this._showDetail = false;
		this._selectedItem = undefined;
		this._detailAction = 'detail';
		this.notify();
	}
}
