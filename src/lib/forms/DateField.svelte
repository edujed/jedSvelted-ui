<script lang="ts">
	import { DatePicker } from 'bits-ui';
	import { Portal } from 'bits-ui';
	import { CalendarDate } from '@internationalized/date';
	import FormField from './FormField.svelte';
	import { IconCalendar } from '../icons';
	import { LOCALES, localeStore } from '../i18n';
	import type { DateFieldProps } from './formsTypes';

	let {
		label = '',
		hint = '',
		hintTitle = '',
		hintImpact = '',
		value = $bindable(),
		min,
		max,
		disabled = false,
		id,
		colSpan = 2
	}: DateFieldProps = $props();

	const locale = $derived($localeStore);

	// --- Date ↔ CalendarDate conversion (bits-ui uses @internationalized/date) ---
	function toDate(cd: CalendarDate | undefined): Date | undefined {
		if (!cd) return undefined;
		return new Date(Date.UTC(cd.year, cd.month - 1, cd.day));
	}

	function toCalendarDate(d: Date | undefined): CalendarDate | undefined {
		if (!d) return undefined;
		return new CalendarDate(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate());
	}

	// Sync external `value` (Date) → internal `calValue` (CalendarDate)
	let calValue = $state(toCalendarDate(value));
	$effect(() => {
		const external = toCalendarDate(value);
		if (JSON.stringify(external) !== JSON.stringify(calValue)) {
			calValue = external;
		}
	});

	// Sync internal `calValue` (CalendarDate) → external `value` (Date)
	$effect(() => {
		const converted = toDate(calValue);
		if (JSON.stringify(converted?.toISOString()) !== JSON.stringify(value?.toISOString())) {
			value = converted;
		}
	});

	const resolvedPlaceholder = $derived(LOCALES[locale].datePlaceholder);
</script>

<FormField {label} {hint} {hintTitle} {hintImpact} {colSpan} class="date-field">
	{#snippet children(fieldId)}
		<div class="field-wrapper">
			<DatePicker.Root
				bind:value={calValue}
				{disabled}
				minValue={toCalendarDate(min)}
				maxValue={toCalendarDate(max)}
				{locale}
				granularity="day"
				weekStartsOn={1}
				weekdayFormat="narrow"
				calendarLabel={label || resolvedPlaceholder}
			>
				<div class="date-trigger-wrapper" id={fieldId}>
					<DatePicker.Trigger class="date-trigger">
						<span class="date-value">
							{calValue
								? new Date(
										Date.UTC(calValue.year, calValue.month - 1, calValue.day)
									).toLocaleDateString(locale === 'pt-BR' ? 'pt-BR' : 'en-US', {
										day: '2-digit',
										month: '2-digit',
										year: 'numeric'
									})
								: resolvedPlaceholder}
						</span>
						<IconCalendar size={16} class="date-icon" />
					</DatePicker.Trigger>
				</div>

				<Portal to="body">
					<DatePicker.Content class="date-content">
						<DatePicker.Calendar>
							{#snippet children({ months, weekdays })}
								<DatePicker.Header>
									<DatePicker.PrevButton class="date-nav-btn" aria-label="Previous month">
										<svg
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
											width="14"
											height="14"
										>
											<path d="M15 18l-6-6 6-6" />
										</svg>
									</DatePicker.PrevButton>
									<DatePicker.Heading class="date-heading" />
									<DatePicker.NextButton class="date-nav-btn" aria-label="Next month">
										<svg
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
											width="14"
											height="14"
										>
											<path d="M9 18l6-6-6-6" />
										</svg>
									</DatePicker.NextButton>
								</DatePicker.Header>

								<DatePicker.Grid>
									<DatePicker.GridHead>
										<DatePicker.GridRow>
											{#each weekdays as day}
												<DatePicker.HeadCell class="date-weekday">{day}</DatePicker.HeadCell>
											{/each}
										</DatePicker.GridRow>
									</DatePicker.GridHead>
									<DatePicker.GridBody>
										{#each months as month}
											{#each month.weeks as week}
												<DatePicker.GridRow>
													{#each week as date}
														<DatePicker.Cell {date} month={month.value}>
															{#snippet children({ selected })}
																<DatePicker.Day
																	class={`date-day${selected ? ' day-selected' : ''}${date.month !== month.value.month ? ' day-outside' : ''}`}
																/>
															{/snippet}
														</DatePicker.Cell>
													{/each}
												</DatePicker.GridRow>
											{/each}
										{/each}
									</DatePicker.GridBody>
								</DatePicker.Grid>
							{/snippet}
						</DatePicker.Calendar>
					</DatePicker.Content>
				</Portal>
			</DatePicker.Root>
		</div>
	{/snippet}
</FormField>

<style>
	.field-wrapper {
		position: relative;
		width: 100%;
	}

	.date-trigger-wrapper {
		width: 100%;
		display: block;
	}

	:global(.date-trigger-wrapper [data-select-trigger]),
	:global(.date-trigger-wrapper [data-popover-trigger]) {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
		padding: 0.5rem 0.75rem;
		background: var(--color-input-bg);
		border: 1px solid var(--color-input-border);
		border-radius: var(--radius-sm);
		color: var(--color-on-surface);
		font-size: var(--font-size-sm);
		font-family: inherit;
		cursor: pointer;
		width: 100%;
		text-align: left;
		transition:
			border-color var(--transition-fast),
			box-shadow var(--transition-fast);
		box-shadow: 0 1px 2px var(--color-shadow);
	}

	:global(.date-trigger-wrapper [data-popover-trigger]:disabled) {
		opacity: 0.5;
		cursor: not-allowed;
	}

	:global(.date-trigger-wrapper [data-popover-trigger]:hover:not(:disabled)) {
		border-color: var(--color-input-focus);
		box-shadow: 0 2px 4px var(--color-shadow);
	}

	:global(.date-trigger-wrapper [data-popover-trigger]:focus-visible) {
		border-color: var(--color-input-focus);
		box-shadow:
			0 2px 6px var(--color-shadow),
			0 0 0 3px var(--color-primary-light);
	}

	.date-value {
		flex: 1;
		font-variant-numeric: tabular-nums;
	}

	:global(.date-icon) {
		width: 16px;
		height: 16px;
		flex-shrink: 0;
		opacity: 0.6;
	}

	/* --- Popover / Calendar --- */

	:global(.date-content) {
		background: var(--color-popover-bg);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		box-shadow: 0 4px 16px var(--color-shadow);
		padding: 0.75rem;
		min-width: 280px;
		z-index: 1100;
	}

	:global(.date-content [data-calendar-header]) {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.5rem;
	}

	:global(.date-nav-btn) {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		border: none;
		background: none;
		border-radius: var(--radius-sm);
		color: var(--color-on-surface);
		cursor: pointer;
		transition: background var(--transition-fast);
	}

	:global(.date-nav-btn:hover) {
		background: var(--color-sidenav-hover);
	}

	:global(.date-heading) {
		font-size: var(--font-size-sm);
		font-weight: 600;
		color: var(--color-on-surface);
	}

	:global(.date-content table) {
		width: 100%;
		border-collapse: collapse;
	}

	:global(.date-weekday) {
		padding: 0.375rem 0.25rem;
		font-size: var(--font-size-xs);
		font-weight: 600;
		color: var(--color-on-surface);
		opacity: 0.6;
		text-align: center;
	}

	:global(.date-day) {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		margin: 0 auto;
		font-size: var(--font-size-sm);
		color: var(--color-on-surface);
		border-radius: var(--radius-sm);
		cursor: pointer;
		transition: background var(--transition-fast);
		font-variant-numeric: tabular-nums;
	}

	:global(.date-day:hover) {
		background: var(--color-sidenav-hover);
	}

	:global(.date-day.day-selected) {
		background: var(--color-primary);
		color: var(--color-on-primary);
		font-weight: 600;
	}

	:global(.date-day.day-selected:hover) {
		background: var(--color-primary-dark);
	}

	:global(.date-day.day-outside) {
		opacity: 0.4;
	}

	:global(.date-day.day-today:not(.day-selected)) {
		border: 1px solid var(--color-primary);
	}
</style>
