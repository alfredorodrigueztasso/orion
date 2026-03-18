'use client';

import { ReactNode } from 'react';
import { Card, Badge } from '@/components/ClientComponents';

interface DocsStepCardProps {
  stepNumber: number;
  title: string;
  description?: string;
  children: ReactNode;
}

export default function DocsStepCard({
  stepNumber,
  title,
  description,
  children,
}: DocsStepCardProps) {
  return (
    <div style={{ marginBottom: 'var(--spacing-8)' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-3)',
        marginBottom: 'var(--spacing-3)',
      }}>
        <Badge variant="primary" size="sm">
          Step {stepNumber}
        </Badge>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: 600,
          color: 'var(--text-primary)',
          margin: 0,
        }}>
          {title}
        </h3>
      </div>

      {description && (
        <p style={{
          color: 'var(--text-secondary)',
          marginBottom: 'var(--spacing-3)',
          margin: 0,
          fontSize: '0.95rem',
          lineHeight: 1.6,
        }}>
          {description}
        </p>
      )}

      <Card variant="base">
        <Card.Body>
          {children}
        </Card.Body>
      </Card>
    </div>
  );
}
