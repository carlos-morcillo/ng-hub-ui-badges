import { ChangeDetectionStrategy, Component, HostBinding, input, output, ViewEncapsulation } from '@angular/core';
import { HubBadgeColor, HubBadgeShape, HubBadgeSize, HubBadgeVariant } from '../../models/badge.types';

/**
 * Semantic badge primitive for compact statuses, counters, labels and removable
 * filter tags.
 *
 * The component owns no hard-coded colour values. It exposes a semantic
 * `color` input that maps to the host application's `--hub-sys-color-*` token
 * families, then derives every visual role from that accent.
 */
@Component({
	selector: 'hub-badge',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './badge.component.html',
	styleUrl: './badge.component.scss',
	// Styles are authored as a global, token-driven contract (`.hub-badge*` selectors)
	// so that built-in colours and the public `hub-badge-color-rules` mixin share the
	// exact same selector shape. Emulated encapsulation would scope the host rules away.
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'hub-badge'
	}
})
export class HubBadgeComponent {
	/** Visual treatment of the badge. */
	readonly variant = input<HubBadgeVariant>('solid');

	/** Semantic accent driving the badge colours. */
	readonly color = input<HubBadgeColor>('primary');

	/** Size token controlling the typography and spacing scale. */
	readonly size = input<HubBadgeSize>('md');

	/** Corner treatment of the badge shell. */
	readonly shape = input<HubBadgeShape>('pill');

	/** Whether a leading status dot is rendered. */
	readonly dot = input(false);

	/** Enables the dismiss affordance, turning the badge into a removable tag. */
	readonly removable = input(false);

	/** Accessible label of the dismiss button. */
	readonly removeLabel = input('Remove badge');

	/** Disables only the dismiss action; the badge content remains visible. */
	readonly disabled = input(false);

	/** Emits when the dismiss button is activated. */
	readonly removed = output<void>();

	/** Host CSS classes computed from the signal inputs. */
	@HostBinding('class')
	protected get hostClass(): string {
		return [
			`hub-badge--${this.variant()}`,
			`hub-badge--${this.size()}`,
			`hub-badge--${this.shape()}`,
			this.dot() ? 'hub-badge--dot' : '',
			this.removable() ? 'hub-badge--removable' : '',
			this.disabled() ? 'hub-badge--disabled' : ''
		]
			.filter(Boolean)
			.join(' ');
	}

	/** Semantic colour name exposed as a data attribute for SCSS variant rules. */
	@HostBinding('attr.data-variant')
	protected get variantAttr(): string {
		return this.color();
	}

	/**
	 * The single semantic accent consumed by the stylesheet.
	 * Exact built-in colour roles are still refined in SCSS; custom colours fall
	 * back to the generic open-set derivation.
	 */
	@HostBinding('style.--hub-badge-accent')
	protected get accentVar(): string {
		return `var(--hub-sys-color-${this.color()}, var(--hub-sys-color-primary, #0d6efd))`;
	}

	/**
	 * Emits the public `removed` output when the dismiss button is activated.
	 * Disabled removable badges ignore the interaction.
	 */
	protected handleRemove(): void {
		if (this.disabled()) {
			return;
		}

		this.removed.emit();
	}
}
