import { ChangeDetectionStrategy, Component, HostBinding, input, ViewEncapsulation } from '@angular/core';
import { HubBadgeGroupAlign, HubBadgeGroupDirection } from '../../models/badge.types';

/**
 * Lightweight layout primitive for badge compositions.
 * Use it to arrange `hub-badge` instances in rows, columns, wrapped stacks or
 * compact filter bars without re-implementing spacing rules in every screen.
 */
@Component({
	selector: 'hub-badge-group',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `<ng-content></ng-content>`,
	// Global, class-qualified selectors (`.hub-badge-group`) target the host element;
	// Emulated encapsulation would scope these host rules away. All selectors are
	// prefixed/qualified so global exposure is safe.
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'hub-badge-group'
	},
	styles: [
		`
			:where(.hub-badge-group) {
				--hub-badge-group-gap: 0.5rem;
				--hub-badge-group-align: center;
			}

			.hub-badge-group {
				display: inline-flex;
				flex-wrap: wrap;
				gap: var(--hub-badge-group-gap);
				align-items: var(--hub-badge-group-align);
			}

			.hub-badge-group[data-direction='column'] {
				inline-size: 100%;
				align-items: flex-start;
				flex-direction: column;
			}

			.hub-badge-group[data-nowrap='true'] {
				flex-wrap: nowrap;
			}
		`
	]
})
export class HubBadgeGroupComponent {
	/** Main axis of the group layout. */
	readonly direction = input<HubBadgeGroupDirection>('row');

	/** Cross-axis alignment of the badge items. */
	readonly align = input<HubBadgeGroupAlign>('center');

	/** Spacing between badges. Accepts any CSS length value. */
	readonly gap = input('0.5rem');

	/** Whether the group wraps on overflow. */
	readonly wrap = input(true);

	@HostBinding('attr.data-direction')
	protected get directionAttr(): HubBadgeGroupDirection {
		return this.direction();
	}

	@HostBinding('attr.data-nowrap')
	protected get nowrapAttr(): string {
		return String(!this.wrap());
	}

	@HostBinding('style.--hub-badge-group-gap')
	protected get gapStyle(): string {
		return this.gap();
	}

	@HostBinding('style.--hub-badge-group-align')
	protected get alignStyle(): string {
		switch (this.align()) {
			case 'start':
				return 'flex-start';
			case 'end':
				return 'flex-end';
			default:
				return this.align();
		}
	}
}
