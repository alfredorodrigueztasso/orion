/**
 * Field Component - Text input with label, validation, and icons.
 *
 * @example
 * ```tsx
 * import { Field } from '@orion-ds/react';
 * import { Mail, Eye } from 'lucide-react';
 *
 * <Field label="Email" type="email" placeholder="you@example.com" />
 * <Field label="Password" type="password" error="Required" />
 * <Field label="Search" icon={<Search size={18} />} />
 * ```
 */
export { Field } from "./Field";
export type { FieldProps } from "./Field.types";
