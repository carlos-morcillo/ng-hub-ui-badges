## [22.2.1] - 2026-06-25

### Fixed

- Design-token consistency pass: aligned inline fallback defaults with the canonical `ng-hub-ui-ds` values and routed hardcoded literals (z-index, font-weight, line-height, radii and theme-aware colours) through their `--hub-sys-*` / `--hub-ref-*` tokens, so they follow the active theme. No visual change when the ds tokens are loaded.

## [22.2.0] - 2026-06-25

### Changed

- Consolidated every badge dimension token onto the shared `--hub-ref-*` reference scale (a compact mapping that keeps the badge chip-sized), so sizing resolves through the design-system tokens instead of hand-tuned rem literals — matching the Figma `ff/badge` variable layer:
    - Base: `--hub-badge-padding-x` `0.625rem` → `var(--hub-ref-space-2)`, `--hub-badge-padding-y` `0.375rem` → `var(--hub-ref-space-1)`, `--hub-badge-gap` `0.375rem` → `var(--hub-ref-space-1)`, `--hub-badge-dot-size` `0.5rem` → `var(--hub-ref-space-2)`.
    - Size ramp `xs` / `sm` / `md` / `lg` now references `--hub-ref-space-*` and `--hub-ref-font-size-*`.
- Visual note: `md` padding tightens (10→8px / 6→4px) so the chip stays compact; the other steps land on the nearest reference token. Behaviour is unchanged.

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
