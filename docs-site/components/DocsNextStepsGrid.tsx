'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { Card } from '@/components/ClientComponents';
import { ChevronRight } from 'lucide-react';

interface NextStep {
  icon: ReactNode;
  title: string;
  description: string;
  href: string;
}

interface DocsNextStepsGridProps {
  items: NextStep[];
}

export default function DocsNextStepsGrid({ items }: DocsNextStepsGridProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 'var(--spacing-4)',
        marginBottom: 'var(--spacing-8)',
      }}
    >
      {items.map((item, idx) => (
        <Link
          key={idx}
          href={item.href}
          style={{ textDecoration: 'none' }}
        >
          <Card variant="base" interactive style={{ height: '100%' }}>
            <Card.Body>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-3)',
                height: '100%',
              }}>
                <div style={{
                  color: 'var(--text-brand)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  height: '32px',
                }}>
                  {item.icon}
                </div>

                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    margin: 0,
                    marginBottom: 'var(--spacing-2)',
                    lineHeight: 1.3,
                  }}>
                    {item.title}
                  </h3>

                  <p style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)',
                    margin: 0,
                    lineHeight: 1.5,
                  }}>
                    {item.description}
                  </p>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-1)',
                  color: 'var(--text-brand)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                }}>
                  Learn more
                  <ChevronRight size={16} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Link>
      ))}
    </div>
  );
}
