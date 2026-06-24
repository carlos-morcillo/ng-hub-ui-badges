# ng-hub-ui-badges

**Español** | [English](./README.md)

[![NPM Version](https://img.shields.io/npm/v/ng-hub-ui-badges.svg)](https://www.npmjs.com/package/ng-hub-ui-badges)
[![Angular](https://img.shields.io/badge/Angular-22%2B-red.svg)](https://angular.dev)
[![License](https://img.shields.io/npm/l/ng-hub-ui-badges.svg)](LICENSE)

Badges semánticos para Angular orientados a estados, contadores y tags removibles, con variables CSS y mixins SCSS públicos para familias de color personalizadas.

## Documentación y ejemplos

Este paquete forma parte de [Hub UI](https://hubui.dev/), una colección de librerías de componentes Angular para aplicaciones standalone.

- Docs: https://hubui.dev/badges/overview/
- Ejemplos: https://hubui.dev/badges/examples/
- Hub UI: https://hubui.dev/

## Familia de librerías `ng-hub-ui`

Esta librería forma parte del ecosistema **Hub UI**:

- [ng-hub-ui-accordion](https://www.npmjs.com/package/ng-hub-ui-accordion) (obsoleta — usa ng-hub-ui-panels)
- [ng-hub-ui-action-sheet](https://www.npmjs.com/package/ng-hub-ui-action-sheet)
- [ng-hub-ui-avatar](https://www.npmjs.com/package/ng-hub-ui-avatar)
- [ng-hub-ui-badges](https://www.npmjs.com/package/ng-hub-ui-badges) ← Estás aquí
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

## Características

- `HubBadgeComponent` para etiquetas, contadores, pills de estado y tags removibles.
- Seis tratamientos visuales: `solid`, `soft`, `outline`, `ghost`, `subtle`, `surface`.
- Seis colores semánticos integrados más nombres semánticos personalizados.
- Escala de tamaños `xs`–`lg` y formas `pill`, `rounded`, `square`.
- Dot de estado opcional y acción de cierre accesible; los iconos se proyectan como contenido.
- `HubBadgeGroupComponent` para filas con wrap y composiciones apiladas.
- Mixins SCSS públicos en `ng-hub-ui-badges/styles` para registrar colores semánticos personalizados.

## Instalación

```bash
npm install ng-hub-ui-badges
```

Tokens compartidos opcionales:

```bash
npm install ng-hub-ui-ds
```

```css
@import 'ng-hub-ui-ds/styles/tokens/hub-tokens.css';
```

## Inicio rápido

```typescript
import { Component } from '@angular/core';
import { HubBadgeComponent, HubBadgeGroupComponent } from 'ng-hub-ui-badges';

@Component({
	standalone: true,
	imports: [HubBadgeComponent, HubBadgeGroupComponent],
	template: `
		<hub-badge-group>
			<hub-badge color="success" [dot]="true">Online</hub-badge>
			<hub-badge variant="soft" color="danger" [removable]="true" removeLabel="Quitar filtro urgente">
				Urgente
			</hub-badge>
		</hub-badge-group>
	`
})
export class ExampleComponent {}
```

## API

### `HubBadgeComponent`

| Input | Tipo | Por defecto |
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

El icono no es un input: proyéctalo como contenido junto a la etiqueta. El layout interno
(`--hub-badge-gap`, `--hub-badge-direction`, `--hub-badge-align`) los mantiene alineados:

```html
<hub-badge color="danger"><i class="fa-solid fa-bell"></i> 5 alertas</hub-badge>
```

### `HubBadgeGroupComponent`

| Input | Tipo | Por defecto |
|---|---|---|
| `direction` | `'row' \| 'column'` | `'row'` |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch'` | `'center'` |
| `gap` | `string` | `'0.5rem'` |
| `wrap` | `boolean` | `true` |

## Colores semánticos personalizados

Cada color integrado —y cualquiera personalizado— se deriva de un único acento semántico.
Hay tres formas de registrar un color personalizado, de la más simple a la más explícita.

### 1. Solo el token de acento (sin SCSS)

Define `--hub-sys-color-<nombre>` en cualquier ámbito. El badge deriva automáticamente los
colores de los roles `soft`, `outline`, `subtle`, … en todas las variantes:

```scss
:root {
	--hub-sys-color-brand: #7c3aed;
}
```

```html
<hub-badge color="brand">Brand</hub-badge>
<hub-badge variant="soft" color="brand">Brand soft</hub-badge>
```

### 2. `hub-badge-color-rules` — familia completa del design system

Cuando ya publicas la familia completa de tokens `--hub-sys-color-<nombre>-*`, este helper
fija cada rol a ella. Ejecútalo dentro de un selector que apunte a `.hub-badge`:

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

### 3. `hub-badge-variant-rules` — valores explícitos

Para fijar los colores de los roles sin declarar la familia de tokens, pásalos directamente.
Proporciona cada rol que quieras controlar:

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

Y úsalo desde Angular con `color="brand"`.

## Estilado

La familia pública de tokens incluye:

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

Consulta [`docs/css-variables-reference.md`](./docs/css-variables-reference.md) para la referencia completa.

## Changelog

Consulta [CHANGELOG.md](./CHANGELOG.md).

## Contribuir

Las contribuciones y la colaboración son bienvenidas.

- Haz un fork del repositorio.
- Crea una rama de funcionalidad.
- Haz commit y push de tus cambios.
- Abre un pull request.

## Apoyo

Si este proyecto te resulta útil y quieres apoyar su desarrollo, puedes invitarme a un café:

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://buymeacoffee.com/carlosmorcillo)

- **Incidencias**: [GitHub Issues](https://github.com/carlos-morcillo/ng-hub-ui-badges/issues)
- **Autor**: [Carlos Morcillo](https://www.carlosmorcillo.com)

## Licencia

Este proyecto está licenciado bajo la licencia MIT.
