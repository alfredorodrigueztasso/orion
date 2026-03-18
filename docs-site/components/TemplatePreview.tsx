'use client';

import React from 'react';
import { Card, Alert } from '@/components/ClientComponents';

interface TemplatePreviewProps {
  templateName: string;
  title?: string;
}

/**
 * Template previews are not yet available.
 * Templates are full-page compositions that require installation to preview.
 * This component shows an informational message.
 */
export default function TemplatePreview({ templateName, title }: TemplatePreviewProps) {
  return (
    <Card variant="elevated" style={{ marginBottom: 'var(--spacing-8)', overflow: 'hidden' }}>
      <Card.Header>
        <h2 style={{ margin: 0 }}>{title || 'Template Preview'}</h2>
      </Card.Header>
      <Card.Body style={{ padding: 'var(--spacing-6)' }}>
        <Alert variant="info">
          <p>
            <strong>Preview not available.</strong> This is a full-page template that requires installation to see in action.
          </p>
          <p style={{ marginTop: 'var(--spacing-3)', fontSize: '0.875rem' }}>
            Install it with: <code>npx @orion-ds/cli add {templateName}</code>
          </p>
          <p style={{ marginTop: 'var(--spacing-3)', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Learn more in the <a href="/docs/cli" style={{ color: 'var(--text-brand)' }}>CLI documentation</a>.
          </p>
        </Alert>
      </Card.Body>
    </Card>
  );
}
