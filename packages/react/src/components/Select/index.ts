/**
 * Select Component - Dropdown selection input.
 *
 * @example
 * ```tsx
 * import { Select } from '@orion-ds/react';
 *
 * <Select
 *   label="Country"
 *   placeholder="Select a country"
 *   options={[
 *     { value: 'us', label: 'United States' },
 *     { value: 'uk', label: 'United Kingdom' },
 *     { value: 'ca', label: 'Canada' },
 *   ]}
 *   onChange={(value) => setCountry(value)}
 * />
 * ```
 */
export { Select } from "./Select";
export type { SelectProps, SelectOption } from "./Select.types";
