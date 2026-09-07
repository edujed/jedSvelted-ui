/**
 * Shared types for form controls.
 *
 * The `FieldHintProps` contract is the "pseudo-inheritance" base: every
 * field component (EditField, NumericField, SelectField, SliderField)
 * extends it, so consumers can compose/aggregate field props from a single
 * vocabulary.
 */
import type { Snippet } from 'svelte';
import type { IconName } from '../icons';

/**
 * Hint/label contract shared by all field components (and `FieldHint`).
 */
export interface FieldHintProps {
	/** Field label. */
	label?: string;
	/** Short hint text (shown in the popover). */
	hint?: string;
	/** Optional title for the hint popover (bold, primary color). */
	hintTitle?: string;
	/** Optional impact/tip text (shown in a highlighted box). */
	hintImpact?: string;
	/** The `for` attribute of the associated input (links the label to the field). */
	labelFor?: string;
}

/**
 * Props for `FormField` — the shared wrapper that owns the label/hint
 * header, the generated input id, and the grid column span for every
 * field component (EditField, NumericField, SelectField, SliderField).
 */
export interface FormFieldProps extends FieldHintProps {
	/** Input id (generated when omitted). */
	id?: string;
	/** Grid column span (1-4). */
	colSpan?: number;
	/** Extra classes for the wrapper. */
	class?: string;
	/** The field's input/control. */
	children: Snippet<[id: string]>;
}

/**
 * Props for `EditField` — a text input with label/hint.
 */
export interface EditFieldProps extends FieldHintProps {
	/** Input type (default: 'text'). */
	type?: string;
	/** Input placeholder. */
	placeholder?: string;
	/** Input value (bindable). */
	value?: string;
	/** Input id (generated when omitted). */
	id?: string;
	/** Grid column span (1-4). */
	colSpan?: number;
}

/**
	 * Props for `FormField` — the shared wrapper that owns the label/hint
	 * header, the generated input id, and the grid column span for every
	 * field component (EditField, NumericField, SelectField, SliderField).
	 */
	export interface FormFieldProps extends FieldHintProps {
		/** Input id (generated when omitted). */
		id?: string;
		/** Grid column span (1-4). */
		colSpan?: number;
		/** Extra classes for the wrapper. */
		class?: string;
		/** The field's input/control. */
		children: Snippet<[id: string]>;
	}


/**
 * Props for `NumericField` — a number input with label/hint.
 */
export interface NumericFieldProps extends FieldHintProps {
	/** Input value (bindable). */
	value?: number;
	/** Minimum value. */
	min?: number;
	/** Maximum value. */
	max?: number;
	/** Step increment (default: 1). */
	step?: number;
	/** Input id (generated when omitted). */
	id?: string;
	/** Grid column span (1-4). */
	colSpan?: number;
}

/**
 * A single option for `SelectField`.
 */
export interface SelectOption {
	key: string;
	label: string;
}

/**
 * Props for `SelectField` — a select dropdown with label/hint.
 */
export interface SelectFieldProps extends FieldHintProps {
	/** Selected value (bindable). */
	value?: string;
	/** Available options. */
	options?: SelectOption[];
	/** Placeholder shown when nothing is selected. */
	placeholder?: string;
	/** Whether the select is disabled. */
	disabled?: boolean;
	/** Grid column span (1-4). */
	colSpan?: number;
	/** Called when the value changes. */
	onValueChange?: (value: string) => void;
}

/**
 * Props for `SliderField` — a range input with label/hint.
 */
export interface SliderFieldProps extends FieldHintProps {
	/** Slider value (bindable). */
	value?: number;
	/** Minimum value (default: 0). */
	min?: number;
	/** Maximum value (default: 1). */
	max?: number;
	/** Step increment (default: 0.01). */
	step?: number;
	/** Input id (generated when omitted). */
	id?: string;
	/** Grid column span (1-4). */
	colSpan?: number;
	/** Number of decimal places to display (default: 2). */
	decimals?: number;
	/** Optional formatter. Receives the raw value, returns the display string. */
	format?: (value: number) => string;
}

/**
 * Props for `FormActions` — the save/cancel button row.
 */
export interface FormActionsProps {
	/** Called when the save button is clicked. */
	onSave?: () => void;
	/** Called when the cancel button is clicked. */
	onCancel?: () => void;
	/** Save button label (defaults to the localized "save"). */
	saveLabel?: string;
	/** Cancel button label (defaults to the localized "cancel"). */
	cancelLabel?: string;
	/** Whether the cancel button is shown (default: true). */
	showCancel?: boolean;
	/** Save button icon (default: 'check'). */
	saveIcon?: IconName;
	/** Cancel button icon (default: 'x'). */
	cancelIcon?: IconName;
}
