/**
 * Table Component - Tabular data display.
 *
 * @example
 * ```tsx
 * import { Table } from '@orion-ds/react';
 *
 * <Table
 *   columns={[
 *     { key: 'name', header: 'Name', sortable: true },
 *     { key: 'email', header: 'Email' },
 *     { key: 'role', header: 'Role' },
 *   ]}
 *   data={[
 *     { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
 *     { name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
 *   ]}
 * />
 * ```
 */
export { Table } from "./Table";
export type {
  TableProps,
  TableColumn,
  TableSize,
  SortDirection,
} from "./Table.types";
