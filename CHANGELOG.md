## [22.1.0] - 2026-06-24

### Changed

- Lower `peerDependencies` for `@angular/core` and `@angular/common` to `>=21.0.0`. The library now supports Angular 21 and later.

## [22.0.1] - 2026-06-24

### Changed

- Generate the built-in semantic colour rules (`primary`, `secondary`, `success`, `danger`, `warning`, `info`) with a single `@each` loop over the public `hub-badge-variant-rules` mixin, instead of hand-written per-colour blocks. A `hub-badge-on-accent()` helper standardises the on-accent text to black or white per colour (light accents like `warning`/`info` get black). Built-ins now share the exact selector shape and token contract used by consumer-registered colours.

## [22.0.0] - 2026-06-24

### Added

- Initial release of `ng-hub-ui-badges`.
- `HubBadgeComponent` with semantic colour variants, size scale, shape options, status dots, counters and removable tags.
- Projected content layout themed through `--hub-badge-gap`, `--hub-badge-direction` and `--hub-badge-align` (icons are projected as content, not an input).
- `HubBadgeGroupComponent` for row/column compositions with wrapping and alignment controls.
- Public SCSS mixins at `ng-hub-ui-badges/styles` for registering custom semantic colours.
- CSS custom property theming through the `--hub-badge-*` token family.
