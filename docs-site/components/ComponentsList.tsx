'use client';

import Link from 'next/link';
import { Card, Badge } from '@/components/ClientComponents';

interface Component {
  name: string;
  title: string;
  description: string;
  category: string;
  modeAware?: boolean;
}

interface ComponentsListProps {
  components: Component[];
  categories: string[];
}

export default function ComponentsList({ components, categories }: ComponentsListProps) {
  // Group components by category
  const componentsByCategory = categories.reduce((acc, category) => {
    acc[category] = components.filter(c => c.category === category);
    return acc;
  }, {} as Record<string, Component[]>);

  return (
    <>
      {categories.map((category) => (
        <section key={category} style={{ marginBottom: 'var(--spacing-12)' }}>
          <h2 style={{
            textTransform: 'capitalize',
            marginBottom: 'var(--spacing-6)',
            fontSize: '1.5rem',
            fontWeight: 600,
          }}>
            {category}
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 'var(--spacing-4)'
          }}>
            {componentsByCategory[category]?.map((component) => (
              <Link
                key={component.name}
                href={`/components/${component.name}`}
                style={{ textDecoration: 'none' }}
              >
                <Card
                  variant="base"
                  interactive
                  style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* Header with Title and Badge */}
                  <Card.Header style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: 'var(--spacing-2)',
                  }}>
                    <h3 style={{
                      margin: 0,
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      flex: 1,
                    }}>
                      {component.title}
                    </h3>
                    {component.modeAware && (
                      <Badge variant="info" size="sm" style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
                        Mode Aware
                      </Badge>
                    )}
                  </Card.Header>

                  {/* Description */}
                  <Card.Body style={{ flex: 1 }}>
                    <p style={{
                      margin: 0,
                      color: 'var(--text-secondary)',
                      fontSize: '0.875rem',
                      lineHeight: 1.5,
                    }}>
                      {component.description}
                    </p>
                  </Card.Body>

                  {/* Footer: Component Name as Code */}
                  <div style={{
                    paddingTop: 'var(--spacing-3)',
                    borderTop: '1px solid var(--border-subtle)',
                    fontSize: '0.75rem',
                    color: 'var(--text-tertiary)',
                  }}>
                    <code style={{
                      background: 'var(--surface-layer)',
                      padding: 'var(--spacing-1) var(--spacing-2)',
                      borderRadius: 'var(--radius-sm)',
                    }}>
                      {component.name}
                    </code>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
