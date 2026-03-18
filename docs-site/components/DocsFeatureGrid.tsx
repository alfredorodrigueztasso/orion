'use client';

import { ReactNode } from 'react';
import { Card } from '@/components/ClientComponents';

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

interface DocsFeatureGridProps {
  features: Feature[];
}

export default function DocsFeatureGrid({ features }: DocsFeatureGridProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 'var(--spacing-4)',
        marginBottom: 'var(--spacing-8)',
      }}
    >
      {features.map((feature, idx) => (
        <Card key={idx} variant="base" interactive>
          <Card.Body>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--spacing-3)',
            }}>
              <div style={{
                color: 'var(--text-brand)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                height: '32px',
              }}>
                {feature.icon}
              </div>

              <h3 style={{
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                margin: 0,
                lineHeight: 1.3,
              }}>
                {feature.title}
              </h3>

              <p style={{
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
                margin: 0,
                lineHeight: 1.5,
              }}>
                {feature.description}
              </p>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
