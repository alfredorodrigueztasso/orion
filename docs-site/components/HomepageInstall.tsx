'use client';

import { useState } from 'react';
import { Card } from '@/components/ClientComponents';
import { Terminal, Copy, Check } from 'lucide-react';

type Tab = 'package' | 'mcp';
type PM = 'npm' | 'pnpm' | 'yarn';

const PACKAGE_COMMANDS: Record<PM, string> = {
  npm: 'npm install @orion-ds/react',
  pnpm: 'pnpm add @orion-ds/react',
  yarn: 'yarn add @orion-ds/react',
};

const MCP_COMMAND = 'npx @orion-ds/mcp';

export default function HomepageInstall() {
  const [tab, setTab] = useState<Tab>('package');
  const [pm, setPm] = useState<PM>('pnpm');
  const [copied, setCopied] = useState(false);
  const command = tab === 'package' ? PACKAGE_COMMANDS[pm] : MCP_COMMAND;

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
          {/* Main tabs: Package vs MCP */}
          <div
            style={{
              display: 'flex',
              gap: 'var(--spacing-2)',
              marginBottom: 'var(--spacing-4)',
              borderBottom: '1px solid var(--border-subtle)',
              paddingBottom: 'var(--spacing-3)',
            }}
          >
            {(['package', 'mcp'] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  padding: 'var(--spacing-2) var(--spacing-3)',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  background: tab === t ? 'var(--interactive-primary)' : 'transparent',
                  color:
                    tab === t
                      ? 'var(--interactive-primary-text)'
                      : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: '0.8125rem',
                  fontWeight: tab === t ? 600 : 400,
                  fontFamily: 'var(--font-secondary)',
                  transition: 'all 0.15s',
                  textTransform: 'capitalize',
                }}
              >
                {t === 'package' ? 'Package' : 'MCP Server'}
              </button>
            ))}
          </div>

          {/* Package manager sub-tabs (only show for package tab) */}
          {tab === 'package' && (
            <div
              style={{
                display: 'flex',
                gap: 'var(--spacing-2)',
                marginBottom: 'var(--spacing-4)',
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
                    background: pm === p ? 'var(--surface-layer)' : 'transparent',
                    color:
                      pm === p
                        ? 'var(--text-primary)'
                        : 'var(--text-tertiary)',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    fontWeight: pm === p ? 600 : 400,
                    fontFamily: 'var(--font-secondary)',
                    transition: 'all 0.15s',
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          )}

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

          {/* MCP note */}
          {tab === 'mcp' && (
            <div
              style={{
                marginTop: 'var(--spacing-4)',
                padding: 'var(--spacing-3)',
                backgroundColor: 'var(--surface-layer)',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
              }}
            >
              Claude Code can then install any Orion component directly from your conversation.
            </div>
          )}
        </Card.Body>
      </Card>
    </section>
  );
}
