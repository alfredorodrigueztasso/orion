'use client';

import { Card, Badge } from '@/components/ClientComponents';

const BRANDS = [
  {
    name: 'orion',
    color: '#1B5BFF',
    radiusStyle: '12px radius',
    useCase: 'Default, professional',
  },
  {
    name: 'red',
    color: '#D7282F',
    radiusStyle: '9999px (pill)',
    useCase: 'Bold, energetic',
  },
  {
    name: 'deepblue',
    color: '#006FBA',
    radiusStyle: '12px radius',
    useCase: 'Conservative, corporate',
  },
  {
    name: 'orange',
    color: '#F15D22',
    radiusStyle: '9999px (pill)',
    useCase: 'Warm, modern',
  },
];

export default function DocsBrandGrid() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 'var(--spacing-4)',
        marginBottom: 'var(--spacing-8)',
      }}
    >
      {BRANDS.map((brand) => (
        <Card key={brand.name} variant="base">
          <Card.Body>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)', marginBottom: 'var(--spacing-3)' }}>
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: brand.color,
                  flexShrink: 0,
                }}
              />
              <h4 style={{
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                margin: 0,
                textTransform: 'capitalize',
              }}>
                {brand.name}
              </h4>
            </div>

            <div style={{ marginBottom: 'var(--spacing-2)' }}>
              <Badge variant="secondary" size="sm">
                {brand.radiusStyle}
              </Badge>
            </div>

            <p style={{
              fontSize: '0.875rem',
              color: 'var(--text-secondary)',
              margin: 0,
              lineHeight: 1.5,
            }}>
              {brand.useCase}
            </p>

            <p style={{
              fontSize: '0.75rem',
              color: 'var(--text-tertiary)',
              margin: 'var(--spacing-2) 0 0 0',
              fontFamily: 'var(--font-mono)',
            }}>
              {brand.color}
            </p>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
