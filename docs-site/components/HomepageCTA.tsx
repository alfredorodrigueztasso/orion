'use client';

import { CTA, Button } from '@/components/ClientComponents';
import { Github, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HomepageCTA() {
  return (
    <>
      <CTA
        title="Start building with Orion today"
        description="Join developers building AI-first interfaces. Free, open-source, and ready to ship."
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
            <Link href="/docs/getting-started">
              <Button
                size="lg"
                variant="primary"
                iconRight={<ArrowRight size={20} />}
              >
                Get Started Free
              </Button>
            </Link>
            <Link
              href="https://github.com/orion-ds/orion"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="ghost" icon={<Github size={20} />}>
                View on GitHub
              </Button>
            </Link>
          </div>
        }
        footnote="Open source · MIT License · No credit card required"
      />

      {/* Simple footer — Footer block causes SSR error with AgentWorkspace */}
      <footer
        style={{
          padding: 'var(--spacing-12) var(--spacing-8)',
          borderTop: '1px solid var(--border-subtle)',
          marginTop: 'var(--spacing-12)',
          textAlign: 'center',
          color: 'var(--text-secondary)',
          fontSize: '0.875rem',
          background: 'var(--surface-subtle)',
        }}
      >
        <p style={{ marginBottom: 'var(--spacing-4)' }}>
          © 2024 Orion Design System. Built with AI-first principles.
        </p>
        <div style={{ display: 'flex', gap: 'var(--spacing-6)', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="https://github.com/orion-ds/orion" style={{ color: 'var(--text-secondary)' }}>GitHub</Link>
          <Link href="https://npmjs.com/package/@orion-ds/react" style={{ color: 'var(--text-secondary)' }}>NPM</Link>
          <Link href="/docs/getting-started" style={{ color: 'var(--text-secondary)' }}>Docs</Link>
        </div>
      </footer>
    </>
  );
}
