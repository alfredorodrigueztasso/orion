/**
 * Combobox Component - Autocomplete/typeahead input.
 *
 * @example
 * ```tsx
 * import { Combobox } from '@orion-ds/react';
 *
 * <Combobox
 *   label="Select a country"
 *   placeholder="Search countries..."
 *   options={[
 *     { value: 'us', label: 'United States' },
 *     { value: 'uk', label: 'United Kingdom' },
 *     { value: 'ca', label: 'Canada' },
 *   ]}
 *   onSelect={(option) => setCountry(option.value)}
 * />
 * ```
 */
export { Combobox } from "./Combobox";
export type {
  ComboboxProps,
  ComboboxOption,
  ComboboxGroup,
  ComboboxSize,
} from "./Combobox.types";
