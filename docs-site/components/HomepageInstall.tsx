'use client';

import { useState } from 'react';
import { Card } from '@/components/ClientComponents';
import { Terminal, Copy, Check } from 'lucide-react';

type PM = 'npm' | 'pnpm' | 'yarn';

const COMMANDS: Record<PM, string> = {
  npm: 'npm install @orion-ds/react @orion-ds/blocks',
  pnpm: 'pnpm add @orion-ds/react @orion-ds/blocks',
  yarn: 'yarn add @orion-ds/react @orion-ds/blocks',
};

export default function HomepageInstall() {
  const [pm, setPm] = useState<PM>('pnpm');
  const [copied, setCopied] = useState(false);
  const command = COMMANDS[pm];

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      style={{
        padding: 'var(--spacing-8) var(--spacing-8)',
        maxWidth: '800px',
        margin: '0 auto',
        marginTop: 'var(--spacing-8)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-2)',
          marginBottom: 'var(--spacing-4)',
          justifyContent: 'center',
        }}
      >
        <Terminal size={16} style={{ color: 'var(--text-tertiary)' }} />
        <span style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)' }}>
          Install
        </span>
      </div>

      <Card variant="base">
        <Card.Body style={{ padding: 'var(--spacing-4)' }}>
          {/* Package manager tabs */}
          <div
            style={{
              display: 'flex',
              gap: 'var(--spacing-2)',
              marginBottom: 'var(--spacing-4)',
              borderBottom: '1px solid var(--border-subtle)',
              paddingBottom: 'var(--spacing-3)',
            }}
          >
            {(['pnpm', 'npm', 'yarn'] as PM[]).map((p) => (
              <button
                key={p}
                onClick={() => setPm(p)}
                style={{
                  padding: 'var(--spacing-2) var(--spacing-3)',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  background: pm === p ? 'var(--interactive-primary)' : 'transparent',
                  color:
                    pm === p
                      ? 'var(--interactive-primary-text)'
                      : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: '0.8125rem',
                  fontWeight: pm === p ? 600 : 400,
                  fontFamily: 'var(--font-secondary)',
                  transition: 'all 0.15s',
                }}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Command display */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-3)',
            }}
          >
            <span
              style={{
                color: 'var(--text-tertiary)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.875rem',
                userSelect: 'none',
              }}
            >
              $
            </span>
            <code
              style={{
                flex: 1,
                fontFamily: 'var(--font-mono)',
                fontSize: '0.875rem',
                color: 'var(--text-primary)',
                background: 'none',
                padding: 0,
                margin: 0,
              }}
            >
              {command}
            </code>
            <button
              onClick={handleCopy}
              style={{
                padding: 'var(--spacing-2)',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-1)',
                fontSize: '0.75rem',
                transition: 'color 0.15s',
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget as HTMLButtonElement;
                target.style.color = 'var(--text-brand)';
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget as HTMLButtonElement;
                target.style.color = 'var(--text-secondary)';
              }}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
        </Card.Body>
      </Card>
    </section>
  );
}
