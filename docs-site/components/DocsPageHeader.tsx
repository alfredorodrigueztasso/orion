'use client';

import React from 'react';

interface DocsPageHeaderProps {
  title: string;
  description?: string;
  badge?: React.ReactNode;
}

export default function DocsPageHeader({ title, description, badge }: DocsPageHeaderProps) {
  return (
    <div
      style={{
        paddingBottom: 'var(--spacing-6)',
        marginBottom: 0,
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      {badge && (
        <div style={{ marginBottom: 'var(--spacing-2)', display: 'flex', gap: 'var(--spacing-2)', flexWrap: 'wrap' }}>
          {badge}
        </div>
      )}

      <h1
        style={{
          fontFamily: 'var(--font-secondary)',
          fontSize: '48px',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          lineHeight: 'var(--line-height-tight)',
          color: 'var(--text-primary)',
          margin: 0,
        }}
      >
        {title}
      </h1>

      {description && (
        <p
          style={{
            fontFamily: 'var(--font-secondary)',
            fontSize: 'var(--font-size-md)',
            color: 'var(--text-secondary)',
            marginTop: 'var(--spacing-2)',
            marginBottom: 0,
            lineHeight: 'var(--line-height-relaxed)',
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
