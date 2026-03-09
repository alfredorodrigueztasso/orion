'use client';

import React, { useEffect, useState } from 'react';
import { Card, Alert } from '@/components/ClientComponents';

interface SectionPreviewProps {
  sectionName: string;
  title?: string;
}

interface PreviewModule {
  title: string;
  render: React.ComponentType;
}

export default function SectionPreview({ sectionName, title }: SectionPreviewProps) {
  const [previews, setPreviews] = useState<PreviewModule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark that we're on the client side
    setIsClient(true);

    // Dynamically import preview modules at runtime only
    const importModule = async () => {
      try {
        // @ts-ignore - registry is loaded dynamically at runtime
        const module = await import('../../registry/preview-modules/index');
        const previewModules = module.previewModules as Record<string, PreviewModule[]>;
        const previewModule = previewModules[sectionName];
        if (previewModule && previewModule.length > 0) {
          setPreviews(previewModule);
        }
      } catch (err) {
        console.error('Failed to load preview module:', err);
        setError('Failed to load preview');
      } finally {
        setLoading(false);
      }
    };

    importModule();
  }, [sectionName]);

  const content = !isClient ? (
    // During prerender/build, show a simple placeholder
    <div style={{ padding: 'var(--spacing-4)', color: 'var(--text-secondary)' }}>
      Preview will load when you visit this page in the browser.
    </div>
  ) : loading ? (
    <div style={{ padding: 'var(--spacing-4)', textAlign: 'center', color: 'var(--text-secondary)' }}>
      Loading preview...
    </div>
  ) : previews.length > 0 ? (
    <div style={{ display: 'grid', gap: 'var(--spacing-6)' }}>
      {previews.map((preview, idx) => {
        const PreviewComponent = preview.render;
        return (
          <div key={idx}>
            {preview.title && (
              <h4
                style={{
                  marginBottom: 'var(--spacing-3)',
                  color: 'var(--text-secondary)',
                  fontSize: '0.875rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontWeight: 600,
                }}
              >
                {preview.title}
              </h4>
            )}
            <div
              style={{
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-control)',
                padding: 'var(--spacing-6)',
                background: 'var(--surface-base)',
              }}
            >
              <PreviewComponent />
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <Alert variant="info">
      <p>
        Preview not yet available for <strong>{sectionName}</strong>. This section requires custom
        configuration.
      </p>
      <p style={{ marginTop: 'var(--spacing-2)', fontSize: '0.875rem' }}>
        Install it with: <code>npx @orion-ds/cli add {sectionName}</code>
      </p>
    </Alert>
  );

  return (
    <Card variant="base" style={{ marginTop: 'var(--spacing-4)' }}>
      <Card.Header>
        <h3 style={{ margin: 0 }}>{title || 'Live Preview'}</h3>
      </Card.Header>
      <Card.Body style={{ padding: 'var(--spacing-6)' }}>{content}</Card.Body>
    </Card>
  );
}
