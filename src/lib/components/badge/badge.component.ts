import {
	afterNextRender,
	ChangeDetectionStrategy,
	Component,
	computed,
	effect,
	ElementRef,
	HostBinding,
	inject,
	input,
	OnDestroy,
	output,
	signal,
	viewChild,
	ViewEncapsulation
} from '@angular/core';
import { HUB_BADGE_TOOLTIP_ADAPTER, HubBadgeTooltipHandle } from '../../badge-tooltip';
import { HubBadgeColor, HubBadgeShape, HubBadgeSize, HubBadgeVariant } from '../../models/badge.types';

/**
 * Semantic badge primitive for compact statuses, counters, labels and removable
 * filter tags.
 *
 * The component owns no hard-coded colour values. It exposes a semantic
 * `color` input that maps to the host application's `--hub-sys-color-*` token
 * families, then derives every visual role from that accent.
 *
 * Long content is truncated with an ellipsis (bounded by `--hub-badge-max-width`)
 * and exposed through a tooltip: the native `title` attribute by default, or the
 * richer hub-ui tooltip when a {@link HUB_BADGE_TOOLTIP_ADAPTER} is provided (see
 * `provideHubBadgeTooltip`).
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
export class HubBadgeComponent implements OnDestroy {
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

	/**
	 * Explicit tooltip text. When set it always wins; when empty the badge shows
	 * its own content as a tooltip only if that content is truncated.
	 */
	readonly tooltip = input('');

	/** Emits when the dismiss button is activated. */
	readonly removed = output<void>();

	/** Reference to the clipping content wrapper, used to detect truncation. */
	private readonly contentRef = viewChild<ElementRef<HTMLElement>>('content');

	private readonly hostRef = inject<ElementRef<HTMLElement>>(ElementRef);

	/** Optional hub-ui tooltip adapter; absent means native `title` fallback. */
	private readonly tooltipAdapter = inject(HUB_BADGE_TOOLTIP_ADAPTER, { optional: true });

	/** Whether the rendered content is wider than its clipping box. */
	private readonly isOverflowing = signal(false);

	/** Trimmed text content of the badge, used as the auto tooltip source. */
	private readonly contentText = signal('');

	/** Becomes true once the browser-only overflow tracking is wired. */
	private readonly ready = signal(false);

	/**
	 * The tooltip text actually shown: the explicit {@link tooltip} input when
	 * provided, otherwise the badge content but only while it is truncated.
	 */
	private readonly effectiveTooltip = computed(() => {
		const explicit = this.tooltip().trim();
		if (explicit) {
			return explicit;
		}
		return this.isOverflowing() ? this.contentText() : '';
	});

	private resizeObserver: ResizeObserver | null = null;
	private mutationObserver: MutationObserver | null = null;
	private tooltipHandle: HubBadgeTooltipHandle | null = null;

	constructor() {
		afterNextRender(() => this.initOverflowTracking());

		effect(() => {
			if (!this.ready()) {
				return;
			}
			this.applyTooltip(this.effectiveTooltip());
		});
	}

	ngOnDestroy(): void {
		this.resizeObserver?.disconnect();
		this.mutationObserver?.disconnect();
		this.tooltipHandle?.destroy();
		this.tooltipHandle = null;
	}

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

	/**
	 * Wires browser-only observers that keep {@link isOverflowing} and
	 * {@link contentText} in sync with the rendered content and available width.
	 */
	private initOverflowTracking(): void {
		const el = this.contentRef()?.nativeElement;
		if (!el) {
			return;
		}

		this.measure(el);

		if (typeof ResizeObserver !== 'undefined') {
			this.resizeObserver = new ResizeObserver(() => this.measure(el));
			this.resizeObserver.observe(el);
			this.resizeObserver.observe(this.hostRef.nativeElement);
		}

		if (typeof MutationObserver !== 'undefined') {
			this.mutationObserver = new MutationObserver(() => this.measure(el));
			this.mutationObserver.observe(el, { childList: true, characterData: true, subtree: true });
		}

		this.ready.set(true);
	}

	/** Reads the content element's text and truncation state into the signals. */
	private measure(el: HTMLElement): void {
		this.contentText.set((el.textContent ?? '').trim());
		this.isOverflowing.set(el.scrollWidth > el.clientWidth + 1);
	}

	/**
	 * Applies the effective tooltip text through the hub-ui adapter when present,
	 * or the native `title` attribute otherwise. An empty text removes both.
	 */
	private applyTooltip(text: string): void {
		const host = this.hostRef.nativeElement;

		if (this.tooltipAdapter) {
			host.removeAttribute('title');
			if (text) {
				if (this.tooltipHandle) {
					this.tooltipHandle.update(text);
				} else {
					this.tooltipHandle = this.tooltipAdapter.attach(host, text);
				}
			} else if (this.tooltipHandle) {
				this.tooltipHandle.destroy();
				this.tooltipHandle = null;
			}
			return;
		}

		if (text) {
			host.setAttribute('title', text);
		} else {
			host.removeAttribute('title');
		}
	}
}
