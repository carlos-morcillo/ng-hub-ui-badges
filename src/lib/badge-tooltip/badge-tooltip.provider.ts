import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { HUB_BADGE_TOOLTIP_ADAPTER } from './badge-tooltip.token';
import { HubBadgeTooltipAdapter } from './badge-tooltip.types';

/**
 * Registers a tooltip adapter so every `hub-badge` renders the rich hub-ui
 * tooltip instead of the native `title` fallback.
 *
 * ```ts
 * import { provideHubBadgeTooltip } from 'ng-hub-ui-badges';
 * import { hubTooltipAdapter } from 'ng-hub-ui-utils';
 *
 * providers: [provideHubBadgeTooltip(hubTooltipAdapter)];
 * ```
 *
 * @param adapter Tooltip adapter implementation (e.g. `hubTooltipAdapter` from
 *                `ng-hub-ui-utils`).
 * @returns Environment providers to add to the application config.
 */
export function provideHubBadgeTooltip(adapter: HubBadgeTooltipAdapter): EnvironmentProviders {
	return makeEnvironmentProviders([
		{
			provide: HUB_BADGE_TOOLTIP_ADAPTER,
			useValue: adapter
		}
	]);
}
