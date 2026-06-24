# ng-hub-ui-badges

[Español](./README.es.md) | **English**

[![NPM Version](https://img.shields.io/npm/v/ng-hub-ui-badges.svg)](https://www.npmjs.com/package/ng-hub-ui-badges)
[![Angular](https://img.shields.io/badge/Angular-22%2B-red.svg)](https://angular.dev)
[![License](https://img.shields.io/npm/l/ng-hub-ui-badges.svg)](LICENSE)

Semantic Angular badges for statuses, counters and removable filter tags, with CSS variables and public SCSS mixins for custom colour families.

## Documentation and Live Examples

This package is part of [Hub UI](https://hubui.dev/), a collection of Angular component libraries for standalone apps.

- Docs: https://hubui.dev/badges/overview/
- Live examples: https://hubui.dev/badges/examples/
- Hub UI: https://hubui.dev/

## Library Family `ng-hub-ui`

This library is part of the **Hub UI** ecosystem:

- [ng-hub-ui-accordion](https://www.npmjs.com/package/ng-hub-ui-accordion) (deprecated — use ng-hub-ui-panels)
- [ng-hub-ui-action-sheet](https://www.npmjs.com/package/ng-hub-ui-action-sheet)
- [ng-hub-ui-avatar](https://www.npmjs.com/package/ng-hub-ui-avatar)
- [ng-hub-ui-badges](https://www.npmjs.com/package/ng-hub-ui-badges) ← You are here
- [ng-hub-ui-board](https://www.npmjs.com/package/ng-hub-ui-board)
- [ng-hub-ui-breadcrumbs](https://www.npmjs.com/package/ng-hub-ui-breadcrumbs)
- [ng-hub-ui-buttons](https://www.npmjs.com/package/ng-hub-ui-buttons)
- [ng-hub-ui-calendar](https://www.npmjs.com/package/ng-hub-ui-calendar)
- [ng-hub-ui-dropdown](https://www.npmjs.com/package/ng-hub-ui-dropdown)
- [ng-hub-ui-ds](https://www.npmjs.com/package/ng-hub-ui-ds)
- [ng-hub-ui-forms](https://www.npmjs.com/package/ng-hub-ui-forms)
- [ng-hub-ui-history](https://www.npmjs.com/package/ng-hub-ui-history)
- [ng-hub-ui-milestones](https://www.npmjs.com/package/ng-hub-ui-milestones)
- [ng-hub-ui-modal](https://www.npmjs.com/package/ng-hub-ui-modal)
- [ng-hub-ui-nav](https://www.npmjs.com/package/ng-hub-ui-nav)
- [ng-hub-ui-paginable](https://www.npmjs.com/package/ng-hub-ui-paginable)
- [ng-hub-ui-panels](https://www.npmjs.com/package/ng-hub-ui-panels)
- [ng-hub-ui-portal](https://www.npmjs.com/package/ng-hub-ui-portal)
- [ng-hub-ui-skeleton](https://www.npmjs.com/package/ng-hub-ui-skeleton)
- [ng-hub-ui-sortable](https://www.npmjs.com/package/ng-hub-ui-sortable)
- [ng-hub-ui-stepper](https://www.npmjs.com/package/ng-hub-ui-stepper)
- [ng-hub-ui-toast](https://www.npmjs.com/package/ng-hub-ui-toast)
- [ng-hub-ui-utils](https://www.npmjs.com/package/ng-hub-ui-utils)

## Features

- `HubBadgeComponent` for labels, counters, status pills and removable tags.
- Six visual treatments: `solid`, `soft`, `outline`, `ghost`, `subtle`, `surface`.
- Six built-in semantic colours plus open custom semantic names.
- Size scale `xs`–`lg` and shapes `pill`, `rounded`, `square`.
- Optional status dot and accessible dismiss action; icons are projected as content.
- `HubBadgeGroupComponent` for wrapped rows and stacked badge layouts.
- Public SCSS mixins at `ng-hub-ui-badges/styles` for custom semantic colour registration.

## Installation

```bash
npm install ng-hub-ui-badges
```

Optional shared tokens:

```bash
npm install ng-hub-ui-ds
```

```css
@import 'ng-hub-ui-ds/styles/tokens/hub-tokens.css';
```

## Quick Start

```typescript
import { Component } from '@angular/core';
import { HubBadgeComponent, HubBadgeGroupComponent } from 'ng-hub-ui-badges';

@Component({
	standalone: true,
	imports: [HubBadgeComponent, HubBadgeGroupComponent],
	template: `
		<hub-badge-group>
			<hub-badge color="success" [dot]="true">Online</hub-badge>
			<hub-badge variant="soft" color="danger" [removable]="true" removeLabel="Remove urgent filter">
				Urgent
			</hub-badge>
		</hub-badge-group>
	`
})
export class ExampleComponent {}
```

## API

### `HubBadgeComponent`

| Input | Type | Default |
|---|---|---|
| `variant` | `HubBadgeVariant` | `'solid'` |
| `color` | `HubBadgeColor` | `'primary'` |
| `size` | `HubBadgeSize` | `'md'` |
| `shape` | `HubBadgeShape` | `'pill'` |
| `dot` | `boolean` | `false` |
| `removable` | `boolean` | `false` |
| `removeLabel` | `string` | `'Remove badge'` |
| `disabled` | `boolean` | `false` |

Output: `removed`.

Icons are not an input — project them as content next to the label. The internal layout
(`--hub-badge-gap`, `--hub-badge-direction`, `--hub-badge-align`) keeps them aligned:

```html
<hub-badge color="danger"><i class="fa-solid fa-bell"></i> 5 alerts</hub-badge>
```

### `HubBadgeGroupComponent`

| Input | Type | Default |
|---|---|---|
| `direction` | `'row' \| 'column'` | `'row'` |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch'` | `'center'` |
| `gap` | `string` | `'0.5rem'` |
| `wrap` | `boolean` | `true` |

## Custom semantic colours

Every built-in colour — and any custom one — derives from a single semantic accent. There
are three ways to register a custom colour, from simplest to most explicit.

### 1. Accent token only (no SCSS)

Set `--hub-sys-color-<name>` in any scope. The badge derives the `soft`, `outline`,
`subtle`, … role colours from it automatically, across every variant:

```scss
:root {
	--hub-sys-color-brand: #7c3aed;
}
```

```html
<hub-badge color="brand">Brand</hub-badge>
<hub-badge variant="soft" color="brand">Brand soft</hub-badge>
```

### 2. `hub-badge-color-rules` — full design-system family

When you already publish the complete `--hub-sys-color-<name>-*` token family, this helper
pins every role to it. Run it inside a selector that targets `.hub-badge`:

```scss
@use 'ng-hub-ui-badges/styles' as hub;

:root {
	--hub-sys-color-brand: #7c3aed;
	--hub-sys-color-brand-subtle: #ede9fe;
	--hub-sys-color-brand-emphasis: #5b21b6;
	--hub-sys-color-brand-border-subtle: #c4b5fd;
}

.hub-badge {
	@include hub.hub-badge-color-rules('brand');
}
```

### 3. `hub-badge-variant-rules` — explicit values

To pin the role colours without declaring the token family, pass them directly. Provide
every role you want to control:

```scss
@use 'ng-hub-ui-badges/styles' as hub;

.hub-badge {
	@include hub.hub-badge-variant-rules(
		'brand',
		$accent: #7c3aed,
		$accent-emphasis: #5b21b6,
		$accent-subtle: #ede9fe,
		$accent-border: #c4b5fd,
		$accent-contrast: #fff
	);
}
```

Then use any of them from Angular with `color="brand"`.

## Styling

The public token family includes:

- `--hub-badge-font-size`
- `--hub-badge-padding-x`
- `--hub-badge-padding-y`
- `--hub-badge-border-radius`
- `--hub-badge-gap`
- `--hub-badge-direction`
- `--hub-badge-align`
- `--hub-badge-accent`
- `--hub-badge-accent-subtle`
- `--hub-badge-accent-emphasis`
- `--hub-badge-accent-border`
- `--hub-badge-dot-size`
- `--hub-badge-remove-size`

See [`docs/css-variables-reference.md`](./docs/css-variables-reference.md) for the full reference.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md).

## Contributing

Contributions and collaboration are welcome.

- Fork the repository.
- Create a feature branch.
- Commit and push your changes.
- Open a pull request.

## Support

If you find this project helpful and would like to support its development, you can buy me a coffee:

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://buymeacoffee.com/carlosmorcillo)

- **Issues**: [GitHub Issues](https://github.com/carlos-morcillo/ng-hub-ui-badges/issues)
- **Author**: [Carlos Morcillo](https://www.carlosmorcillo.com)

## License

This project is licensed under the MIT License.
