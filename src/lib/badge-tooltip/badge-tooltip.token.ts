import { InjectionToken } from '@angular/core';
import { HubBadgeTooltipAdapter } from './badge-tooltip.types';

/**
 * Injection token resolving the optional tooltip adapter used by `hub-badge`.
 *
 * Inject it with `{ optional: true }`; a `null` value means "use the native
 * `title` fallback". Register it through {@link provideHubBadgeTooltip}.
 */
export const HUB_BADGE_TOOLTIP_ADAPTER = new InjectionToken<HubBadgeTooltipAdapter>('HUB_BADGE_TOOLTIP_ADAPTER');
