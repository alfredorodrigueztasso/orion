'use client';

import { useState } from 'react';
import ComponentPreview from './ComponentPreview';

type Brand = 'orion' | 'red' | 'deepblue' | 'orange';
type Mode = 'display' | 'product' | 'app';

interface PreviewBrandModeBarProps {
  componentName: string;
}

const BRANDS: Array<{ id: Brand; label: string; color: string }> = [
  { id: 'orion', label: 'Orion', color: '#1B5BFF' },
  { id: 'red', label: 'Red', color: '#D7282F' },
  { id: 'deepblue', label: 'Deep Blue', color: '#006FBA' },
  { id: 'orange', label: 'Orange', color: '#F15D22' },
];

const MODES: Mode[] = ['display', 'product', 'app'];

export default function PreviewBrandModeBar({ componentName }: PreviewBrandModeBarProps) {
  const [brand, setBrand] = useState<Brand>('orion');
  const [mode, setMode] = useState<Mode>('display');

  return (
    <div style={{ marginBottom: 'var(--spacing-8)' }}>
      {/* Toolbar */}
      <div
        style={{
          display: 'flex',
          gap: 'var(--spacing-4)',
          padding: 'var(--spacing-3) var(--spacing-4)',
          background: 'var(--surface-subtle)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-control) var(--radius-control) 0 0',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        {/* Brand selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase' }}>
            Brand
          </span>
          <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
            {BRANDS.map((b) => (
              <button
                key={b.id}
                onClick={() => setBrand(b.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-1)',
                  padding: 'var(--spacing-1) var(--spacing-2)',
                  border: brand === b.id ? '2px solid var(--interactive-primary)' : '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  background: brand === b.id ? 'var(--surface-layer)' : 'transparent',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  fontWeight: brand === b.id ? '600' : '500',
                  color: 'var(--text-primary)',
                  transition: 'all 0.2s',
                }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: b.color,
                    display: 'inline-block',
                    border: '2px solid var(--surface-base)',
                  }}
                />
                {b.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mode selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase' }}>
            Mode
          </span>
          <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
            {MODES.map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                style={{
                  padding: 'var(--spacing-1) var(--spacing-2)',
                  border: mode === m ? '2px solid var(--interactive-primary)' : '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  background: mode === m ? 'var(--surface-layer)' : 'transparent',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  fontSize: '0.75rem',
                  fontWeight: mode === m ? '600' : '500',
                  color: 'var(--text-primary)',
                  transition: 'all 0.2s',
                }}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Preview wrapper with brand/mode injected */}
      <div
        data-brand={brand}
        data-mode={mode}
        style={{
          border: '1px solid var(--border-subtle)',
          borderTop: 'none',
          borderRadius: '0 0 var(--radius-control) var(--radius-control)',
          padding: 'var(--spacing-8)',
          background: 'var(--surface-base)',
          minHeight: '200px',
        }}
      >
        <ComponentPreview componentName={componentName} />
      </div>
    </div>
  );
}
