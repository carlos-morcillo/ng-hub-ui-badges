/**
 * Built-in semantic colour families backed by the design-system
 * `--hub-sys-color-*` tokens.
 */
export type HubBadgeBuiltinColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

/**
 * Semantic colour name accepted by the badge primitives.
 * The open string branch lets host applications register additional semantic
 * colours through the public SCSS mixins and the `--hub-sys-color-<name>*`
 * token family.
 */
export type HubBadgeColor = HubBadgeBuiltinColor | (string & {});

/**
 * Visual treatment of a badge.
 * Each variant derives its final colours from the semantic colour family
 * selected through {@link HubBadgeColor}.
 */
export type HubBadgeVariant = 'solid' | 'soft' | 'outline' | 'ghost' | 'subtle' | 'surface';

/**
 * Size scale exposed by `hub-badge`.
 */
export type HubBadgeSize = 'xs' | 'sm' | 'md' | 'lg';

/**
 * Shape treatment of a badge.
 */
export type HubBadgeShape = 'pill' | 'rounded' | 'square';

/**
 * Flow direction supported by `hub-badge-group`.
 */
export type HubBadgeGroupDirection = 'row' | 'column';

/**
 * Cross-axis alignment options supported by `hub-badge-group`.
 */
export type HubBadgeGroupAlign = 'start' | 'center' | 'end' | 'stretch';
