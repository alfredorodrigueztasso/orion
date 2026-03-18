'use client';

import { useState } from 'react';

interface ExpandableExamplesProps {
  examples: Array<{ title: string; codeBlock: React.ReactNode }>;
}

export default function ExpandableExamples({ examples }: ExpandableExamplesProps) {
  const [expandedCodes, setExpandedCodes] = useState<Set<number>>(new Set());

  const toggleCodeExpanded = (idx: number) => {
    const newSet = new Set(expandedCodes);
    if (newSet.has(idx)) {
      newSet.delete(idx);
    } else {
      newSet.add(idx);
    }
    setExpandedCodes(newSet);
  };

  return (
    <>
      {examples.map(({ title, codeBlock }, idx) => (
        <div key={idx} style={{ marginBottom: 'var(--spacing-8)' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: 'var(--spacing-3)' }}>{title}</h3>
          <button
            onClick={() => toggleCodeExpanded(idx)}
            style={{
              marginBottom: 'var(--spacing-3)',
              padding: 'var(--spacing-2) var(--spacing-3)',
              background: 'var(--surface-layer)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              fontSize: '0.875rem',
              color: 'var(--text-secondary)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--surface-subtle)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--surface-layer)';
            }}
          >
            {expandedCodes.has(idx) ? '▼ Hide Code' : '▶ View Code'}
          </button>
          {expandedCodes.has(idx) && codeBlock}
        </div>
      ))}
    </>
  );
}
