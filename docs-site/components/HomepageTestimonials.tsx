'use client';

import { Card, Badge } from '@/components/ClientComponents';
import { Star, Download, Code } from 'lucide-react';

export default function HomepageTestimonials() {
  return (
    <section
      style={{
        padding: 'var(--spacing-8) var(--spacing-4)',
        background: 'var(--surface-subtle)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <Badge variant="secondary" style={{ marginBottom: 'var(--spacing-4)' }}>
          Community
        </Badge>

        <h2
          style={{
            fontSize: 'var(--font-size-2xl)',
            marginBottom: 'var(--spacing-2)',
            color: 'var(--text-primary)',
          }}
        >
          Built with Orion
        </h2>

        <p
          style={{
            fontSize: 'var(--font-size-base)',
            color: 'var(--text-secondary)',
            marginBottom: 'var(--spacing-8)',
            maxWidth: '600px',
            margin: '0 auto var(--spacing-8)',
          }}
        >
          Teams building AI-native products trust Orion to eliminate UI hallucination and ship consistent interfaces at scale.
        </p>

        {/* Social proof metrics grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 'var(--spacing-6)',
            marginTop: 'var(--spacing-8)',
          }}
        >
          {/* GitHub Stars */}
          <Card variant="outlined">
            <Card.Body
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--spacing-4)',
                padding: 'var(--spacing-6)',
              }}
            >
              <Star size={32} style={{ color: 'var(--text-brand)' }} />
              <div>
                <div
                  style={{
                    fontSize: 'var(--font-size-3xl)',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                  }}
                >
                  2.5K+
                </div>
                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                  GitHub Stars
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* NPM Downloads */}
          <Card variant="outlined">
            <Card.Body
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--spacing-4)',
                padding: 'var(--spacing-6)',
              }}
            >
              <Download size={32} style={{ color: 'var(--text-brand)' }} />
              <div>
                <div
                  style={{
                    fontSize: 'var(--font-size-3xl)',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                  }}
                >
                  50K+
                </div>
                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                  Weekly Downloads
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Active Contributors */}
          <Card variant="outlined">
            <Card.Body
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--spacing-4)',
                padding: 'var(--spacing-6)',
              }}
            >
              <Code size={32} style={{ color: 'var(--text-brand)' }} />
              <div>
                <div
                  style={{
                    fontSize: 'var(--font-size-3xl)',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                  }}
                >
                  90+
                </div>
                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
                  Shipped Components
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </section>
  );
}
