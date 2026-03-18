import DocsPageHero from '@/components/DocsPageHero';
import DocsNextStepsGrid from '@/components/DocsNextStepsGrid';
import CodeBlockSimple from '@/components/CodeBlockSimple';
import { Card, CardBody, Alert, Tabs, Badge } from '@/components/ClientComponents';
import { Palette, BookOpen, Wrench, ChevronDown } from 'lucide-react';

export const metadata = {
  title: 'Design Tokens',
  description: 'Complete reference for all Orion design tokens and the Chain of Truth',
};

const TOKENS_PRIMITIVES = `// tokens/primary.json — raw immutable values
{
  "color.brand.500": "#1B5BFF",
  "spacing.4": "16px",
  "radius.control": "12px",
  "font.secondary": "DM Sans"
}`;

const TOKENS_SEMANTICS = `:root {
  /* Layer 1 → Layer 2: aliased as intent-based names */
  --interactive-primary: var(--color-brand-500);
  --surface-base: #FFFFFF;
  --text-primary: #111827;
  --radius-control: 12px;
  --font-secondary: "DM Sans";
}

[data-theme="dark"] {
  --surface-base: #0F172A;
  --text-primary: #F8FAFC;
  /* --interactive-primary stays the same (works in all themes) */
}`;

const TOKENS_COMPONENTS = `/* Button.module.css — consumes semantics, never primitives */
.button {
  background: var(--interactive-primary);
  color: var(--interactive-primary-text);
  border-radius: var(--radius-control);
  padding: var(--spacing-3) var(--spacing-5);
  font-family: var(--font-secondary);
}

/* Switch brand or theme → all buttons update. No code changes. */
/* ❌ Never: background: #1B5BFF (hardcoded = UI hallucination) */`;

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
          The Orion token system is built on a three-layer architecture. Tokens flow from raw primitives, through semantic intent, into components that remain blind to their source. This separation ensures zero visual drift across brands and themes.
        </p>

        {/* Layer 1: Primitives */}
        <Card variant="base">
          <CardBody>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-3)' }}>
              <Badge variant="info" size="sm">Layer 1</Badge>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Primitives — the source of truth</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: 'var(--spacing-3)' }}>
              Raw values in <code style={{ background: 'var(--surface-layer)', padding: '0.2em 0.4em', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: '0.85em' }}>tokens/primary.json</code> — immutable, named after appearance (color-blue, spacing-4, not primary-accent or large-padding).
            </p>
            <CodeBlockSimple code={TOKENS_PRIMITIVES} language="json" />
          </CardBody>
        </Card>

        {/* Connector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', padding: 'var(--spacing-3) var(--spacing-4)', color: 'var(--text-tertiary)', fontSize: '0.8rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          <ChevronDown size={16} />
          aliased as intent-based names
        </div>

        {/* Layer 2: Semantics */}
        <Card variant="base">
          <CardBody>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-3)' }}>
              <Badge variant="warning" size="sm">Layer 2</Badge>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Semantics — intent-based aliases</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: 'var(--spacing-3)' }}>
              CSS custom properties in <code style={{ background: 'var(--surface-layer)', padding: '0.2em 0.4em', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: '0.85em' }}>theme.css</code> — named after purpose (interactive-primary, surface-base, text-secondary). Support light/dark themes and multi-brand variants.
            </p>
            <CodeBlockSimple code={TOKENS_SEMANTICS} language="css" />
          </CardBody>
        </Card>

        {/* Connector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', padding: 'var(--spacing-3) var(--spacing-4)', color: 'var(--text-tertiary)', fontSize: '0.8rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          <ChevronDown size={16} />
          consumed by components
        </div>

        {/* Layer 3: Components */}
        <Card variant="base">
          <CardBody>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-3)' }}>
              <Badge variant="success" size="sm">Layer 3</Badge>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Components — blind consumers</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: 'var(--spacing-3)' }}>
              Styles in <code style={{ background: 'var(--surface-layer)', padding: '0.2em 0.4em', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: '0.85em' }}>*.module.css</code> reference only semantic tokens. They never know about primitives or brand details. Switch brand → all components update automatically.
            </p>
            <CodeBlockSimple code={TOKENS_COMPONENTS} language="css" />
          </CardBody>
        </Card>

        <Alert variant="info" style={{ marginTop: 'var(--spacing-8)' }}>
          <strong>This separation prevents UI hallucination.</strong> Because components are blind to raw values, no accidental hardcoding can occur. Brand switching, dark mode, and design updates flow through the token layers automatically.
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
                  {['--surface-base', '--surface-subtle', '--surface-layer', '--surface-glass'].map((token, idx) => (
                    <tr key={token} style={{ borderBottom: idx < 3 ? '1px solid var(--border-subtle)' : 'none' }}>
                      <td style={{ padding: 'var(--spacing-2)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                          <span style={{
                            display: 'inline-block',
                            width: 16, height: 16,
                            borderRadius: '50%',
                            background: `var(${token})`,
                            border: '1px solid var(--border-subtle)',
                            flexShrink: 0,
                          }} />
                          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-brand)', fontSize: '0.85rem' }}>{token}</span>
                        </div>
                      </td>
                      <td style={{ padding: 'var(--spacing-2)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                        {token === '--surface-base' && 'Main background'}
                        {token === '--surface-subtle' && 'Subtle background'}
                        {token === '--surface-layer' && 'Layered surface'}
                        {token === '--surface-glass' && 'Frosted glass'}
                      </td>
                    </tr>
                  ))}
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
                  {['--text-primary', '--text-secondary', '--text-tertiary', '--text-brand'].map((token, idx) => (
                    <tr key={token} style={{ borderBottom: idx < 3 ? '1px solid var(--border-subtle)' : 'none' }}>
                      <td style={{ padding: 'var(--spacing-2)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                          <span style={{
                            display: 'inline-block',
                            width: 16, height: 16,
                            borderRadius: '50%',
                            background: `var(${token})`,
                            border: '1px solid var(--border-subtle)',
                            flexShrink: 0,
                          }} />
                          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-brand)', fontSize: '0.85rem' }}>{token}</span>
                        </div>
                      </td>
                      <td style={{ padding: 'var(--spacing-2)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                        {token === '--text-primary' && 'Main content'}
                        {token === '--text-secondary' && 'Descriptions'}
                        {token === '--text-tertiary' && 'Captions'}
                        {token === '--text-brand' && 'Brand accent'}
                      </td>
                    </tr>
                  ))}
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
                  {['--interactive-primary', '--interactive-primary-hover', '--interactive-secondary', '--interactive-disabled'].map((token, idx) => (
                    <tr key={token} style={{ borderBottom: idx < 3 ? '1px solid var(--border-subtle)' : 'none' }}>
                      <td style={{ padding: 'var(--spacing-2)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                          <span style={{
                            display: 'inline-block',
                            width: 16, height: 16,
                            borderRadius: '50%',
                            background: `var(${token})`,
                            border: '1px solid var(--border-subtle)',
                            flexShrink: 0,
                          }} />
                          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-brand)', fontSize: '0.85rem' }}>{token}</span>
                        </div>
                      </td>
                      <td style={{ padding: 'var(--spacing-2)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                        {token === '--interactive-primary' && 'Primary buttons'}
                        {token === '--interactive-primary-hover' && 'Primary hover'}
                        {token === '--interactive-secondary' && 'Secondary buttons'}
                        {token === '--interactive-disabled' && 'Disabled state'}
                      </td>
                    </tr>
                  ))}
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
                  {['--border-subtle', '--border-strong', '--border-focus'].map((token, idx) => (
                    <tr key={token} style={{ borderBottom: idx < 2 ? '1px solid var(--border-subtle)' : 'none' }}>
                      <td style={{ padding: 'var(--spacing-2)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
                          <span style={{
                            display: 'inline-block',
                            width: 16, height: 16,
                            borderRadius: '50%',
                            background: `var(${token})`,
                            border: '1px solid var(--border-subtle)',
                            flexShrink: 0,
                          }} />
                          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-brand)', fontSize: '0.85rem' }}>{token}</span>
                        </div>
                      </td>
                      <td style={{ padding: 'var(--spacing-2)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                        {token === '--border-subtle' && 'Thin borders'}
                        {token === '--border-strong' && 'Strong borders'}
                        {token === '--border-focus' && 'Focus indicators'}
                      </td>
                    </tr>
                  ))}
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
                  <th style={{ padding: 'var(--spacing-3)', textAlign: 'left', fontWeight: 600, color: 'var(--text-primary)' }}>Scale</th>
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
                    <td style={{ padding: 'var(--spacing-3)' }}>
                      <div style={{
                        height: 12,
                        background: 'var(--interactive-primary)',
                        borderRadius: 'var(--radius-sm)',
                        width: `var(${row.token})`,
                        maxWidth: '100%',
                        opacity: 0.7,
                      }} />
                    </td>
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
                <div>
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
                  <div style={{ marginTop: 'var(--spacing-4)', padding: 'var(--spacing-4)', background: 'var(--surface-subtle)', borderRadius: 'var(--radius-control)' }}>
                    <p style={{ fontFamily: 'var(--font-primary)', fontSize: '1.25rem', margin: '0 0 var(--spacing-2)', color: 'var(--text-primary)' }}>Libre Baskerville — heading font</p>
                    <p style={{ fontFamily: 'var(--font-secondary)', margin: '0 0 var(--spacing-2)', color: 'var(--text-primary)' }}>DM Sans — body text font</p>
                    <p style={{ fontFamily: 'var(--font-mono)', margin: 0, fontSize: '0.9rem', color: 'var(--text-primary)' }}>JetBrains Mono — code font</p>
                  </div>
                </div>
              ),
            },
            {
              id: 'sizes',
              label: 'Sizes',
              content: (
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
              ),
            },
            {
              id: 'weights',
              label: 'Weights',
              content: (
                <CodeBlockSimple
                  code={`--font-weight-regular:   400   /* Regular */
--font-weight-medium:    500   /* Medium */
--font-weight-semibold: 600   /* Semi-bold */
--font-weight-bold:     700   /* Bold */`}
                  language="css"
                />
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
                <CodeBlockSimple
                  code={`.card {
  background: var(--surface-base);
  border: 1px solid var(--border-subtle);
  padding: var(--spacing-4);
  border-radius: 12px;
}`}
                  language="css"
                />
              ),
            },
            {
              id: 'css-modules',
              label: 'CSS Modules',
              content: (
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
              ),
            },
            {
              id: 'react-inline',
              label: 'React Inline',
              content: (
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
              ),
            },
            {
              id: 'tailwind',
              label: 'Tailwind CSS',
              content: (
                <CodeBlockSimple
                  code={`<div className="bg-[var(--surface-base)] border border-[var(--border-subtle)] p-4 rounded">
  Content
</div>`}
                  language="html"
                />
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
            <strong>Always use CSS variables</strong>
            <div style={{ marginTop: 'var(--spacing-2)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              background: <code style={{ background: 'var(--surface-layer)', padding: '0.2em 0.4em', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)' }}>var(--surface-base)</code>
            </div>
          </Alert>

          <Alert variant="error">
            <strong>Never hardcode values</strong>
            <div style={{ marginTop: 'var(--spacing-2)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              background: <code style={{ background: 'var(--surface-layer)', padding: '0.2em 0.4em', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)' }}>#FFFFFF</code> breaks dark mode
            </div>
          </Alert>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-4)' }}>
          <Alert variant="success">
            <strong>Use semantic tokens</strong>
            <div style={{ marginTop: 'var(--spacing-2)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              color: <code style={{ background: 'var(--surface-layer)', padding: '0.2em 0.4em', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)' }}>var(--text-primary)</code> adapts to theme
            </div>
          </Alert>

          <Alert variant="error">
            <strong>Avoid primitive tokens</strong>
            <div style={{ marginTop: 'var(--spacing-2)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              color: <code style={{ background: 'var(--surface-layer)', padding: '0.2em 0.4em', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)' }}>var(--color-blue-500)</code> is too specific
            </div>
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
