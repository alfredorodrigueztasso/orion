'use client';

import { Table, Badge } from '@/components/ClientComponents';
import type { TableColumn } from '@orion-ds/react';

interface Prop {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
  values?: string[];
}

interface PropsTableProps {
  props: Prop[];
}

export default function PropsTable({ props }: PropsTableProps) {
  const columns: TableColumn<Prop>[] = [
    {
      key: 'name',
      header: 'Prop',
      cell: (prop) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>
            {prop.name}
          </code>
          {prop.required && (
            <Badge variant="error" size="sm">
              Required
            </Badge>
          )}
        </div>
      ),
    },
    {
      key: 'type',
      header: 'Type',
      cell: (prop) => (
        <>
          <code
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.875rem',
              color: 'var(--text-brand)',
            }}
          >
            {prop.type}
          </code>
          {prop.values && prop.values.length > 0 && (
            <div
              style={{
                marginTop: 'var(--spacing-1)',
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--spacing-1)',
              }}
            >
              {prop.values.map((value) => (
                <Badge key={value} variant="secondary" size="sm">
                  {value}
                </Badge>
              ))}
            </div>
          )}
        </>
      ),
    },
    {
      key: 'default',
      header: 'Default',
      cell: (prop) =>
        prop.default ? (
          <code
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.875rem',
              color: 'var(--text-secondary)',
            }}
          >
            {prop.default}
          </code>
        ) : (
          <span style={{ color: 'var(--text-tertiary)' }}>-</span>
        ),
    },
    {
      key: 'description',
      header: 'Description',
      cell: (prop) => (
        <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          {prop.description}
        </span>
      ),
    },
  ];

  return <Table columns={columns} data={props} borderless />;
}
