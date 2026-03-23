'use client';

import { CTA, Button } from '@/components/ClientComponents';
import { Github, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HomepageCTA() {
  return (
    <>
      <CTA
        title="Ship AI-first products faster"
        description="Ship with components that work with Claude Code, Cursor, Cline. Free to start. Open source forever."
        variant="brand"
        size="lg"
        align="center"
        contained={true}
        actions={
          <div
            style={{
              display: 'flex',
              gap: 'var(--spacing-3)',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <Link href="/pricing">
              <Button
                size="lg"
                variant="primary"
                iconRight={<ArrowRight size={20} />}
              >
                Become a Founding Member
              </Button>
            </Link>
            <Link
              href="https://github.com/alfredorodrigueztasso/orion"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="ghostInverse" icon={<Github size={20} />}>
                View on GitHub
              </Button>
            </Link>
          </div>
        }
        footnote="MIT Licensed · Open Source · No credit card"
      />

      {/* Simple footer — Footer block causes SSR error with AgentWorkspace */}
      <footer
        style={{
          padding: 'var(--spacing-12) var(--spacing-8)',
          borderTop: '1px solid var(--border-subtle)',
          marginTop: 'var(--spacing-12)',
          textAlign: 'center',
          color: 'var(--text-secondary)',
          fontSize: 'var(--font-size-sm)',
          background: 'var(--surface-subtle)',
        }}
      >
        <p style={{ marginBottom: 'var(--spacing-4)' }}>
          © 2026 Orion Design System. Built for AI-first products.
        </p>
        <div style={{ display: 'flex', gap: 'var(--spacing-6)', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="https://github.com/alfredorodrigueztasso/orion" style={{ color: 'var(--text-secondary)' }}>GitHub</Link>
          <Link href="https://npmjs.com/package/@orion-ds/react" style={{ color: 'var(--text-secondary)' }}>NPM Registry</Link>
          <Link href="/docs/getting-started" style={{ color: 'var(--text-secondary)' }}>Documentation</Link>
          <Link href="/pricing" style={{ color: 'var(--text-secondary)' }}>Pricing</Link>
          <Link href="/privacy" style={{ color: 'var(--text-secondary)' }}>Privacy</Link>
        </div>
      </footer>
    </>
  );
}
