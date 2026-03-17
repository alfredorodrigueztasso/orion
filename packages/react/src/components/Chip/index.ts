/**
 * Chip Component - Tags and filter labels.
 *
 * @example
 * ```tsx
 * import { Chip } from '@orion-ds/react';
 *
 * <Chip>Default</Chip>
 * <Chip variant="brand">Featured</Chip>
 * <Chip onRemove={() => handleRemove()}>Removable</Chip>
 * <Chip selected onClick={() => toggle()}>Selectable</Chip>
 * ```
 */
export { Chip } from "./Chip";
export type { ChipProps, ChipVariant, ChipSize } from "./Chip.types";
