import DocsPageHero from '@/components/DocsPageHero';
import DocsFeatureGrid from '@/components/DocsFeatureGrid';
import DocsNextStepsGrid from '@/components/DocsNextStepsGrid';
import CodeBlockSimple from '@/components/CodeBlockSimple';
import { Card, CardBody, Alert, Tabs, Link } from '@/components/ClientComponents';
import { Layers, Zap, Palette, BookOpen, Wrench } from 'lucide-react';

export const metadata = {
  title: 'Design Tokens',
  description: 'Complete reference for all Orion design tokens and the Chain of Truth',
};

const CHAIN_OF_TRUTH_FEATURES = [
  {
    icon: <Palette size={24} />,
    title: 'Layer 1: Primitives',
    description: 'Raw values in tokens/primary.json — the immutable source of all design decisions.',
  },
  {
    icon: <Layers size={24} />,
    title: 'Layer 2: Semantics',
    description: 'Intent-based aliases that describe what values do, not what they look like.',
  },
  {
    icon: <Zap size={24} />,
    title: 'Layer 3: Components',
    description: 'Blind consumers that reference semantic tokens via CSS variables.',
  },
];

const NEXT_STEPS = [
  {
    icon: <BookOpen size={20} />,
    title: 'Components',
    description: 'See tokens in action within 39+ Orion components.',
    href: '/components',
  },
  {
    icon: <Palette size={20} />,
    title: 'Theming',
    description: 'Customize tokens with brands, dark mode, and visual modes.',
    href: '/docs/theming',
  },
  {
    icon: <Wrench size={20} />,
    title: 'CLI',
    description: 'Copy components with their token dependencies.',
    href: '/docs/cli',
  },
  {
    icon: <BookOpen size={20} />,
    title: 'Getting Started',
    description: 'Learn the fundamentals of Orion.',
    href: '/docs/getting-started',
  },
];

export default function TokensPage() {
  return (
    <div className="docs-content">
      <DocsPageHero
        title="Design Tokens"
        subtitle="The CSS variable system that guarantees visual consistency across all components and brands."
        badges={[
          { label: 'Chain of Truth', variant: 'brand' },
          { label: 'CSS Variables', variant: 'secondary' },
          { label: 'TypeScript', variant: 'secondary' },
        ]}
      />

      {/* The Chain of Truth */}
      <section style={{ marginBottom: 'var(--spacing-12)' }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 600,
          marginBottom: 'var(--spacing-6)',
          color: 'var(--text-primary)',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: 'var(--spacing-3)',
        }}>
          The Chain of Truth
        </h2>

        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-6)', lineHeight: 1.6 }}>
          The Orion token system is built on a three-layer architecture. This separation eliminates visual drift and ensures consistency across all components and brands.
        </p>

        <DocsFeatureGrid features={CHAIN_OF_TRUTH_FEATURES} />

        <Alert variant="info" style={{ marginTop: 'var(--spacing-8)' }}>
          <strong>Components never hardcode values.</strong> They use CSS variables exclusively, referencing semantic tokens. This enables seamless brand switching and dark mode support without touching component code.
        </Alert>
      </section>

      {/* Color Tokens */}
      <section style={{ marginBottom: 'var(--spacing-12)' }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 600,
          marginBottom: 'var(--spacing-6)',
          color: 'var(--text-primary)',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: 'var(--spacing-3)',
        }}>
          Color Tokens
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'var(--spacing-4)',
          marginBottom: 'var(--spacing-4)',
        }}>
          {/* Surface Colors */}
          <Card variant="base">
            <CardBody>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginTop: 0, marginBottom: 'var(--spacing-3)', color: 'var(--text-primary)' }}>Surface</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: 'var(--spacing-2)', fontFamily: 'var(--font-mono)', color: 'var(--text-brand)', fontSize: '0.85rem' }}>--surface-base</td>
                    <td style={{ padding: 'var(--spacing-2)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Main background</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: 'var(--spacing-2)', fontFamily: 'var(--font-mono)', color: 'var(--text-brand)', fontSize: '0.85rem' }}>--surface-subtle</td>
                    <td style={{ padding: 'var(--spacing-2)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Subtle background</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: 'var(--spacing-2)', fontFamily: 'var(--font-mono)', color: 'var(--text-brand)', fontSize: '0.85rem' }}>--surface-layer</td>
                    <td style={{ padding: 'var(--spacing-2)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Layered surface</td>
                  </tr>
                  <tr>
                    <td style={{ padding: 'var(--spacing-2)', fontFamily: 'var(--font-mono)', color: 'var(--text-brand)', fontSize: '0.85rem' }}>--surface-glass</td>
                    <td style={{ padding: 'var(--spacing-2)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Frosted glass</td>
                  </tr>
                </tbody>
              </table>
            </CardBody>
          </Card>

          {/* Text Colors */}
          <Card variant="base">
            <CardBody>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginTop: 0, marginBottom: 'var(--spacing-3)', color: 'var(--text-primary)' }}>Text</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: 'var(--spacing-2)', fontFamily: 'var(--font-mono)', color: 'var(--text-brand)', fontSize: '0.85rem' }}>--text-primary</td>
                    <td style={{ padding: 'var(--spacing-2)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Main content</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: 'var(--spacing-2)', fontFamily: 'var(--font-mono)', color: 'var(--text-brand)', fontSize: '0.85rem' }}>--text-secondary</td>
                    <td style={{ padding: 'var(--spacing-2)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Descriptions</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: 'var(--spacing-2)', fontFamily: 'var(--font-mono)', color: 'var(--text-brand)', fontSize: '0.85rem' }}>--text-tertiary</td>
                    <td style={{ padding: 'var(--spacing-2)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Captions</td>
                  </tr>
                  <tr>
                    <td style={{ padding: 'var(--spacing-2)', fontFamily: 'var(--font-mono)', color: 'var(--text-brand)', fontSize: '0.85rem' }}>--text-brand</td>
                    <td style={{ padding: 'var(--spacing-2)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Brand accent</td>
                  </tr>
                </tbody>
              </table>
            </CardBody>
          </Card>

          {/* Interactive Colors */}
          <Card variant="base">
            <CardBody>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginTop: 0, marginBottom: 'var(--spacing-3)', color: 'var(--text-primary)' }}>Interactive</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: 'var(--spacing-2)', fontFamily: 'var(--font-mono)', color: 'var(--text-brand)', fontSize: '0.85rem' }}>--interactive-primary</td>
                    <td style={{ padding: 'var(--spacing-2)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Primary buttons</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: 'var(--spacing-2)', fontFamily: 'var(--font-mono)', color: 'var(--text-brand)', fontSize: '0.85rem' }}>--interactive-primary-hover</td>
                    <td style={{ padding: 'var(--spacing-2)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Primary hover</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: 'var(--spacing-2)', fontFamily: 'var(--font-mono)', color: 'var(--text-brand)', fontSize: '0.85rem' }}>--interactive-secondary</td>
                    <td style={{ padding: 'var(--spacing-2)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Secondary buttons</td>
                  </tr>
                  <tr>
                    <td style={{ padding: 'var(--spacing-2)', fontFamily: 'var(--font-mono)', color: 'var(--text-brand)', fontSize: '0.85rem' }}>--interactive-disabled</td>
                    <td style={{ padding: 'var(--spacing-2)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Disabled state</td>
                  </tr>
                </tbody>
              </table>
            </CardBody>
          </Card>

          {/* Border Colors */}
          <Card variant="base">
            <CardBody>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginTop: 0, marginBottom: 'var(--spacing-3)', color: 'var(--text-primary)' }}>Borders</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: 'var(--spacing-2)', fontFamily: 'var(--font-mono)', color: 'var(--text-brand)', fontSize: '0.85rem' }}>--border-subtle</td>
                    <td style={{ padding: 'var(--spacing-2)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Thin borders</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: 'var(--spacing-2)', fontFamily: 'var(--font-mono)', color: 'var(--text-brand)', fontSize: '0.85rem' }}>--border-strong</td>
                    <td style={{ padding: 'var(--spacing-2)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Strong borders</td>
                  </tr>
                  <tr>
                    <td style={{ padding: 'var(--spacing-2)', fontFamily: 'var(--font-mono)', color: 'var(--text-brand)', fontSize: '0.85rem' }}>--border-focus</td>
                    <td style={{ padding: 'var(--spacing-2)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Focus indicators</td>
                  </tr>
                </tbody>
              </table>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* Spacing Tokens */}
      <section style={{ marginBottom: 'var(--spacing-12)' }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 600,
          marginBottom: 'var(--spacing-6)',
          color: 'var(--text-primary)',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: 'var(--spacing-3)',
        }}>
          Spacing Tokens
        </h2>

        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-4)', lineHeight: 1.6 }}>
          Base unit: <strong>4px</strong>. All spacing scales from this fundamental unit.
        </p>

        <Card variant="base">
          <CardBody>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <th style={{ padding: 'var(--spacing-3)', textAlign: 'left', fontWeight: 600, color: 'var(--text-primary)' }}>Token</th>
                  <th style={{ padding: 'var(--spacing-3)', textAlign: 'left', fontWeight: 600, color: 'var(--text-primary)' }}>Value</th>
                  <th style={{ padding: 'var(--spacing-3)', textAlign: 'left', fontWeight: 600, color: 'var(--text-primary)' }}>Usage</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { token: '--spacing-1', value: '4px', usage: 'Small gaps' },
                  { token: '--spacing-2', value: '8px', usage: 'Component padding' },
                  { token: '--spacing-3', value: '12px', usage: 'Section padding' },
                  { token: '--spacing-4', value: '16px', usage: 'Default padding' },
                  { token: '--spacing-6', value: '24px', usage: 'Large padding' },
                  { token: '--spacing-8', value: '32px', usage: 'Section gaps' },
                  { token: '--spacing-12', value: '48px', usage: 'Large sections' },
                  { token: '--spacing-16', value: '64px', usage: 'Generous spacing' },
                  { token: '--spacing-32', value: '128px', usage: 'Hero sections' },
                ].map((row) => (
                  <tr key={row.token} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: 'var(--spacing-3)', fontFamily: 'var(--font-mono)', color: 'var(--text-brand)', fontSize: '0.85rem' }}>{row.token}</td>
                    <td style={{ padding: 'var(--spacing-3)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{row.value}</td>
                    <td style={{ padding: 'var(--spacing-3)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{row.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </section>

      {/* Typography Tokens */}
      <section style={{ marginBottom: 'var(--spacing-12)' }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 600,
          marginBottom: 'var(--spacing-6)',
          color: 'var(--text-primary)',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: 'var(--spacing-3)',
        }}>
          Typography Tokens
        </h2>

        <Tabs
          defaultTab="fonts"
          tabs={[
            {
              id: 'fonts',
              label: 'Fonts',
              content: (
                <Card variant="base">
                  <CardBody>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                          <th style={{ padding: 'var(--spacing-3)', textAlign: 'left', fontWeight: 600, color: 'var(--text-primary)' }}>Token</th>
                          <th style={{ padding: 'var(--spacing-3)', textAlign: 'left', fontWeight: 600, color: 'var(--text-primary)' }}>Font Family</th>
                          <th style={{ padding: 'var(--spacing-3)', textAlign: 'left', fontWeight: 600, color: 'var(--text-primary)' }}>Usage</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                          <td style={{ padding: 'var(--spacing-3)', fontFamily: 'var(--font-mono)', color: 'var(--text-brand)', fontSize: '0.85rem' }}>--font-primary</td>
                          <td style={{ padding: 'var(--spacing-3)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Libre Baskerville</td>
                          <td style={{ padding: 'var(--spacing-3)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Headings</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                          <td style={{ padding: 'var(--spacing-3)', fontFamily: 'var(--font-mono)', color: 'var(--text-brand)', fontSize: '0.85rem' }}>--font-secondary</td>
                          <td style={{ padding: 'var(--spacing-3)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>DM Sans</td>
                          <td style={{ padding: 'var(--spacing-3)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Body text</td>
                        </tr>
                        <tr>
                          <td style={{ padding: 'var(--spacing-3)', fontFamily: 'var(--font-mono)', color: 'var(--text-brand)', fontSize: '0.85rem' }}>--font-mono</td>
                          <td style={{ padding: 'var(--spacing-3)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>JetBrains Mono</td>
                          <td style={{ padding: 'var(--spacing-3)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Code blocks</td>
                        </tr>
                      </tbody>
                    </table>
                  </CardBody>
                </Card>
              ),
            },
            {
              id: 'sizes',
              label: 'Sizes',
              content: (
                <Card variant="base">
                  <CardBody>
                    <CodeBlockSimple
                      code={`--font-size-12: 12px   /* Captions */
--font-size-14: 14px   /* Small text */
--font-size-16: 16px   /* Body text */
--font-size-20: 20px   /* Large body */
--font-size-24: 24px   /* Heading */
--font-size-32: 32px   /* Large heading */
--font-size-48: 48px   /* Display text */`}
                      language="css"
                    />
                  </CardBody>
                </Card>
              ),
            },
            {
              id: 'weights',
              label: 'Weights',
              content: (
                <Card variant="base">
                  <CardBody>
                    <CodeBlockSimple
                      code={`--font-weight-regular:   400   /* Regular */
--font-weight-medium:    500   /* Medium */
--font-weight-semibold: 600   /* Semi-bold */
--font-weight-bold:     700   /* Bold */`}
                      language="css"
                    />
                  </CardBody>
                </Card>
              ),
            },
          ]}
        />
      </section>

      {/* Using Tokens */}
      <section style={{ marginBottom: 'var(--spacing-12)' }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 600,
          marginBottom: 'var(--spacing-6)',
          color: 'var(--text-primary)',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: 'var(--spacing-3)',
        }}>
          Using Tokens in Your Code
        </h2>

        <Tabs
          defaultTab="css"
          tabs={[
            {
              id: 'css',
              label: 'CSS',
              content: (
                <Card variant="base">
                  <CardBody style={{ padding: 0 }}>
                    <CodeBlockSimple
                      code={`.card {
  background: var(--surface-base);
  border: 1px solid var(--border-subtle);
  padding: var(--spacing-4);
  border-radius: 12px;
}`}
                      language="css"
                    />
                  </CardBody>
                </Card>
              ),
            },
            {
              id: 'css-modules',
              label: 'CSS Modules',
              content: (
                <Card variant="base">
                  <CardBody style={{ padding: 0 }}>
                    <CodeBlockSimple
                      code={`.card {
  background: var(--surface-base);
  border: 1px solid var(--border-subtle);
  padding: var(--spacing-4);
}

.card:hover {
  box-shadow: var(--shadow-md);
}`}
                      language="css"
                    />
                  </CardBody>
                </Card>
              ),
            },
            {
              id: 'react-inline',
              label: 'React Inline',
              content: (
                <Card variant="base">
                  <CardBody style={{ padding: 0 }}>
                    <CodeBlockSimple
                      code={`<div style={{
  background: 'var(--surface-base)',
  border: '1px solid var(--border-subtle)',
  padding: 'var(--spacing-4)',
  borderRadius: '12px',
}}>
  Content
</div>`}
                      language="tsx"
                    />
                  </CardBody>
                </Card>
              ),
            },
            {
              id: 'tailwind',
              label: 'Tailwind CSS',
              content: (
                <Card variant="base">
                  <CardBody style={{ padding: 0 }}>
                    <CodeBlockSimple
                      code={`<div className="bg-[var(--surface-base)] border border-[var(--border-subtle)] p-4 rounded">
  Content
</div>`}
                      language="html"
                    />
                  </CardBody>
                </Card>
              ),
            },
          ]}
        />
      </section>

      {/* Best Practices */}
      <section style={{ marginBottom: 'var(--spacing-12)' }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 600,
          marginBottom: 'var(--spacing-6)',
          color: 'var(--text-primary)',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: 'var(--spacing-3)',
        }}>
          Best Practices
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-4)', marginBottom: 'var(--spacing-4)' }}>
          <Alert variant="success">
            <strong>✓ Always use CSS variables</strong>
            <div style={{ marginTop: 'var(--spacing-2)', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Reference semantic tokens, never hardcode colors or spacing.</div>
          </Alert>

          <Alert variant="error">
            <strong>✗ Never hardcode values</strong>
            <div style={{ marginTop: 'var(--spacing-2)', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Colors like #1B5BFF or spacing like 16px break the Chain of Truth.</div>
          </Alert>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-4)' }}>
          <Alert variant="success">
            <strong>✓ Use semantic tokens</strong>
            <div style={{ marginTop: 'var(--spacing-2)', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>`--text-primary`, `--surface-base`, `--interactive-primary` — they adapt to theme and brand.</div>
          </Alert>

          <Alert variant="error">
            <strong>✗ Avoid primitive tokens</strong>
            <div style={{ marginTop: 'var(--spacing-2)', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>`--color-blue-500` — semantics describe purpose, not appearance.</div>
          </Alert>
        </div>
      </section>

      {/* Next Steps */}
      <section>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 600,
          marginBottom: 'var(--spacing-6)',
          color: 'var(--text-primary)',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: 'var(--spacing-3)',
        }}>
          Next Steps
        </h2>

        <DocsNextStepsGrid items={NEXT_STEPS} />
      </section>
    </div>
  );
}
