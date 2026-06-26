## [22.3.0] - 2026-06-26

### Added

- New on-accent contrast pair `--hub-badge-accent-on`: a grayscale contrast flip of the accent (`oklch(from … clamp(0, (0.62 - l) * 1000, 1) 0 h)`) that picks white or near-black text automatically from the accent's own lightness. Replaces the hard-coded per-colour `--hub-badge-accent-contrast` (and the `$hub-badge-light-accents` / `hub-badge-on-accent()` helper that listed `warning`/`info` by hand).
- Open-set theming at runtime: any new accent (e.g. `brand`) works with a single CSS rule that points the slot at a colour — `.hub-badge[data-variant='brand'] { --hub-badge-accent: var(--hub-sys-color-brand); }` — and emphasis / subtle / border / on derive themselves. The open path no longer depends on the `@each` or on recompiling the library.

### Changed

- The local accent slot `--hub-badge-accent` now derives its whole role family at runtime from the slot itself (recomputed live whenever the accent changes), instead of reading per-type `--hub-sys-color-{type}-*` tokens:
    - `--hub-badge-accent-emphasis` = `color-mix(in oklch, accent 80%, var(--hub-sys-color-ink))`.
    - `--hub-badge-accent-subtle` = `color-mix(in oklch, accent 12%, var(--hub-sys-surface-page))`.
    - `--hub-badge-accent-border` = `color-mix(in oklch, accent 35%, var(--hub-sys-surface-page))`.
    - `--hub-badge-accent-on` = grayscale contrast flip of the accent.
- Known-variant loop expanded from 6 to the 9 canonical accents — `primary, secondary, success, danger, warning, info, neutral, light, dark` — where each `[data-variant]` only points `--hub-badge-accent` at its `--hub-sys-color-{variant}`.
- `hub-badge-variant-rules($type, $accent)` simplified: it now only sets the local accent slot for a variant (no role/contrast parameters); the role family is derived in the component.
- Migrated every `color-mix(in srgb, …)` to `in oklch` (soft/subtle borders and the remove-button hover overlay).

### Removed

- Hard-coded `--hub-badge-accent-contrast` token and the `$hub-badge-light-accents` list / `hub-badge-on-accent()` helper; on-accent text is now derived from the accent via `--hub-badge-accent-on`.
- Duplicated per-`[data-variant]` role derivations (previously re-declared in `srgb`); the single slot-derived family now covers every variant.

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
