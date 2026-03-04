import { Suspense } from 'react';
import { AlertCircle, Zap, Package, Layers, Palette, Moon, Terminal, ArrowRight, BookOpen, Lightbulb, HelpCircle } from 'lucide-react';
import DocsPageHero from '@/components/DocsPageHero';
import DocsFeatureGrid from '@/components/DocsFeatureGrid';
import DocsBrandGrid from '@/components/DocsBrandGrid';
import DocsNextStepsGrid from '@/components/DocsNextStepsGrid';
import PackageManagerTabs from '@/components/PackageManagerTabs';
import CodeBlock from '@/components/CodeBlock';
import CodeBlockSimple from '@/components/CodeBlockSimple';
import { Card, CardBody, Alert, Badge, Tabs, Link } from '@/components/ClientComponents';

export const metadata = {
  title: 'Getting Started',
  description: 'Get started with Orion Design System in minutes',
};

const FEATURES = [
  {
    icon: <Package size={24} />,
    title: '69+ Components',
    description: 'Buttons, cards, modals, forms, tables, charts, and more',
  },
  {
    icon: <Layers size={24} />,
    title: '44 Sections',
    description: 'Hero, features, pricing, team, testimonials, and more',
  },
  {
    icon: <Package size={24} />,
    title: '12 Templates',
    description: 'Complete landing pages, dashboards, and auth flows',
  },
  {
    icon: <Palette size={24} />,
    title: 'Multi-Brand',
    description: 'Switch between brands without changing code',
  },
  {
    icon: <Moon size={24} />,
    title: 'Dark Mode',
    description: 'Light/dark themes with automatic persistence',
  },
  {
    icon: <Zap size={24} />,
    title: 'Type-Safe',
    description: 'Full TypeScript support with auto-generated types',
  },
];

const REACT_SETUP = `import { ThemeProvider } from '@orion-ds/react';
import '@orion-ds/react/styles.css';

export default function App() {
  return (
    <ThemeProvider>
      <YourContent />
    </ThemeProvider>
  );
}`;

const NEXTJS_SETUP = `import { ThemeProvider } from '@orion-ds/react';
import '@orion-ds/react/styles.css';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}`;

const USING_COMPONENTS = `import { Button, Card, Badge, Alert } from '@orion-ds/react';

export default function MyComponent() {
  return (
    <div>
      <Card>
        <Card.Header>
          <h2>Welcome</h2>
        </Card.Header>
        <Card.Body>
          <p>Build amazing UIs with Orion.</p>
          <Button variant="primary">Get Started</Button>
        </Card.Body>
      </Card>
    </div>
  );
}`;

const BRAND_SWITCHER = `import { useThemeContext } from '@orion-ds/react';

export function BrandSwitcher() {
  const { brand, setBrand } = useThemeContext();

  return (
    <div>
      <p>Current brand: {brand}</p>
      <button onClick={() => setBrand('red')}>Switch to Red</button>
      <button onClick={() => setBrand('orion')}>Back to Orion</button>
    </div>
  );
}`;

const THEME_TOGGLE = `import { useThemeContext } from '@orion-ds/react';

export function ThemeToggle() {
  const { theme, setTheme } = useThemeContext();

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </button>
  );
}`;

const NEXT_STEPS = [
  {
    icon: <BookOpen size={20} />,
    title: 'Installation Guide',
    description: 'Detailed setup for different frameworks',
    href: '/docs/installation',
  },
  {
    icon: <Palette size={20} />,
    title: 'Theming',
    description: 'Customize brands, colors, and modes',
    href: '/docs/theming',
  },
  {
    icon: <Package size={20} />,
    title: 'Components',
    description: 'Browse all 69+ components',
    href: '/components',
  },
  {
    icon: <Terminal size={20} />,
    title: 'CLI Docs',
    description: 'Copy components into your project',
    href: '/docs/cli',
  },
  {
    icon: <Lightbulb size={20} />,
    title: 'Token Reference',
    description: 'Understand the token system',
    href: '/docs/tokens',
  },
];

export default function GettingStartedPage() {
  return (
    <div className="docs-content">
      <DocsPageHero
        title="Getting Started"
        subtitle="Welcome to Orion Design System — an AI-first design system built on the Chain of Truth principle. Get up and running in minutes."
        badges={[
          { label: 'v4.0+', variant: 'brand' },
          { label: 'TypeScript', variant: 'secondary' },
        ]}
      />

      {/* What is Orion */}
      <section style={{ marginBottom: 'var(--spacing-12)' }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 600,
          marginBottom: 'var(--spacing-6)',
          color: 'var(--text-primary)',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: 'var(--spacing-3)',
        }}>
          What is Orion?
        </h2>
        <DocsFeatureGrid features={FEATURES} />
      </section>

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
        <p style={{
          color: 'var(--text-secondary)',
          marginBottom: 'var(--spacing-4)',
          lineHeight: 1.6,
        }}>
          Orion eliminates UI hallucination by enforcing strict separation between <strong>primitives</strong>, <strong>semantics</strong>, and <strong>components</strong>:
        </p>
        <Card variant="elevated" style={{ marginBottom: 'var(--spacing-4)' }}>
          <CardBody>
            <div style={{ marginBottom: 'var(--spacing-3)' }}>
              <Badge variant="info" size="sm">Layer 1: Primitives</Badge>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
              <CodeBlock
              language="text"
              code={`Layer 1: Primitives (source truth)
├─ Colors: #1B5BFF, #FFFFFF, #000000, etc.
├─ Spacing: 4px, 8px, 12px, 16px, etc.
├─ Typography: Libre Baskerville, DM Sans, JetBrains Mono
└─ Radius: 6px, 12px, 16px, 9999px

      ↓ (aliased as)

Layer 2: Semantics (intent-based tokens)
├─ --interactive-primary → uses brand color
├─ --surface-base → uses light/dark background
├─ --text-secondary → uses contrast-adjusted text
└─ --radius-control → uses radius scale

      ↓ (consumed by)

Layer 3: Components (blind consumers)
├─ Button: uses --interactive-primary, --radius-control, --font-secondary
├─ Card: uses --surface-base, --border-subtle
└─ All components automatically adapt to brand/theme/mode changes`}
            />
            </Suspense>
          </CardBody>
        </Card>
      </section>

      {/* Installation */}
      <section style={{ marginBottom: 'var(--spacing-12)' }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 600,
          marginBottom: 'var(--spacing-6)',
          color: 'var(--text-primary)',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: 'var(--spacing-3)',
        }}>
          Installation
        </h2>
        <p style={{
          color: 'var(--text-secondary)',
          marginBottom: 'var(--spacing-4)',
          lineHeight: 1.6,
        }}>
          Install Orion and its dependencies:
        </p>
        <Card variant="base" style={{ marginBottom: 'var(--spacing-4)' }}>
          <CardBody>
            <PackageManagerTabs packageName="@orion-ds/react" />
          </CardBody>
        </Card>
        <p style={{
          color: 'var(--text-secondary)',
          marginBottom: 'var(--spacing-4)',
          lineHeight: 1.6,
        }}>
          Next, import the CSS file in your root layout or app component:
        </p>
        <CodeBlockSimple code={`import '@orion-ds/react/styles.css';`} language="typescript" />
        <Alert
          variant="success"
          title="Single import includes everything"
          style={{ marginTop: 'var(--spacing-4)' }}
        >
          <ul style={{
            margin: 'var(--spacing-2) 0 0 0',
            paddingLeft: 'var(--spacing-4)',
            color: 'var(--text-secondary)',
            fontSize: '0.95rem',
          }}>
            <li>All design tokens (colors, spacing, typography)</li>
            <li>All component styles</li>
            <li>Light/dark theme support</li>
            <li>All brand overrides (orion, red, deepblue, orange)</li>
          </ul>
        </Alert>
      </section>

      {/* Setup: ThemeProvider */}
      <section style={{ marginBottom: 'var(--spacing-12)' }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 600,
          marginBottom: 'var(--spacing-6)',
          color: 'var(--text-primary)',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: 'var(--spacing-3)',
        }}>
          Setup: ThemeProvider
        </h2>
        <p style={{
          color: 'var(--text-secondary)',
          marginBottom: 'var(--spacing-4)',
          lineHeight: 1.6,
        }}>
          Wrap your app with the <code style={{
            background: 'var(--surface-layer)',
            padding: '0.2em 0.4em',
            borderRadius: 'var(--radius-sm)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.9em',
          }}>ThemeProvider</code> at the root level:
        </p>
        <Tabs
          defaultTab="react"
          tabs={[
            {
              id: 'react',
              label: 'React',
              content: <CodeBlockSimple code={REACT_SETUP} language="tsx" />,
            },
            {
              id: 'nextjs',
              label: 'Next.js',
              content: <CodeBlockSimple code={NEXTJS_SETUP} language="tsx" />,
            },
          ]}
        />
        <Alert
          variant="info"
          title="Fonts load automatically"
          style={{ marginTop: 'var(--spacing-4)' }}
        >
          No manual Google Fonts setup needed.
        </Alert>
      </section>

      {/* Using Components */}
      <section style={{ marginBottom: 'var(--spacing-12)' }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 600,
          marginBottom: 'var(--spacing-6)',
          color: 'var(--text-primary)',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: 'var(--spacing-3)',
        }}>
          Using Components
        </h2>
        <p style={{
          color: 'var(--text-secondary)',
          marginBottom: 'var(--spacing-4)',
          lineHeight: 1.6,
        }}>
          Import components directly from <code style={{
            background: 'var(--surface-layer)',
            padding: '0.2em 0.4em',
            borderRadius: 'var(--radius-sm)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.9em',
          }}>@orion-ds/react</code>:
        </p>
        <CodeBlockSimple code={USING_COMPONENTS} language="tsx" />
        <Alert
          variant="info"
          title="No brand prop needed"
          style={{ marginTop: 'var(--spacing-4)' }}
        >
          Components automatically inherit the current brand (via <code style={{
            background: 'var(--surface-layer)',
            padding: '0.2em 0.4em',
            borderRadius: 'var(--radius-sm)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.9em',
          }}>data-brand</code> attribute), theme (light/dark), and mode (display/product/app).
        </Alert>
      </section>

      {/* Multi-Brand Support */}
      <section style={{ marginBottom: 'var(--spacing-12)' }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 600,
          marginBottom: 'var(--spacing-6)',
          color: 'var(--text-primary)',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: 'var(--spacing-3)',
        }}>
          Multi-Brand Support
        </h2>
        <p style={{
          color: 'var(--text-secondary)',
          marginBottom: 'var(--spacing-6)',
          lineHeight: 1.6,
        }}>
          Orion ships with 4 built-in brands. Switch at runtime using the <code style={{
            background: 'var(--surface-layer)',
            padding: '0.2em 0.4em',
            borderRadius: 'var(--radius-sm)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.9em',
          }}>useThemeContext()</code> hook:
        </p>
        <DocsBrandGrid />
        <CodeBlockSimple code={BRAND_SWITCHER} language="tsx" />
      </section>

      {/* Dark Mode */}
      <section style={{ marginBottom: 'var(--spacing-12)' }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 600,
          marginBottom: 'var(--spacing-6)',
          color: 'var(--text-primary)',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: 'var(--spacing-3)',
        }}>
          Dark Mode
        </h2>
        <p style={{
          color: 'var(--text-secondary)',
          marginBottom: 'var(--spacing-4)',
          lineHeight: 1.6,
        }}>
          Orion supports light and dark themes out of the box. Switch themes using <code style={{
            background: 'var(--surface-layer)',
            padding: '0.2em 0.4em',
            borderRadius: 'var(--radius-sm)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.9em',
          }}>useThemeContext()</code>:
        </p>
        <CodeBlockSimple code={THEME_TOGGLE} language="tsx" />
        <Alert
          variant="success"
          title="Preferences auto-persist"
          style={{ marginTop: 'var(--spacing-4)' }}
        >
          The theme preference is automatically saved to localStorage.
        </Alert>
      </section>

      {/* Using the CLI */}
      <section style={{ marginBottom: 'var(--spacing-12)' }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 600,
          marginBottom: 'var(--spacing-6)',
          color: 'var(--text-primary)',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: 'var(--spacing-3)',
        }}>
          Using the CLI
        </h2>
        <p style={{
          color: 'var(--text-secondary)',
          marginBottom: 'var(--spacing-4)',
          lineHeight: 1.6,
        }}>
          For faster setup, use the CLI to copy components directly into your project (shadcn-style):
        </p>
        <Card variant="base">
          <CardBody>
            <div style={{ marginBottom: 'var(--spacing-3)', display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
              <Terminal size={18} style={{ color: 'var(--text-brand)' }} />
              <Badge variant="secondary" size="sm">CLI Alternative</Badge>
            </div>
            <CodeBlockSimple
              code={`npx @orion-ds/cli init
npx @orion-ds/cli add button card modal`}
              language="bash"
            />
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '0.875rem',
              marginTop: 'var(--spacing-3)',
              margin: 0,
              lineHeight: 1.5,
            }}>
              Learn more in the <Link href="/docs/cli" variant="brand">CLI documentation</Link>.
            </p>
          </CardBody>
        </Card>
      </section>

      {/* Next Steps */}
      <section style={{ marginBottom: 'var(--spacing-12)' }}>
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

      {/* Getting Help */}
      <section style={{ marginBottom: 'var(--spacing-12)' }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 600,
          marginBottom: 'var(--spacing-6)',
          color: 'var(--text-primary)',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: 'var(--spacing-3)',
        }}>
          Getting Help
        </h2>
        <Alert
          variant="info"
          title="Need assistance?"
        >
          <ul style={{
            margin: 'var(--spacing-2) 0 0 0',
            paddingLeft: 'var(--spacing-4)',
            color: 'var(--text-secondary)',
            fontSize: '0.95rem',
          }}>
            <li>Browse component examples on the <Link href="/components" variant="brand">Components page</Link></li>
            <li>Check <Link href="/docs/theming" variant="brand">Theming</Link> for customization guides</li>
            <li>Report issues on <Link href="https://github.com/anthropics/claude-code" external showExternalIcon variant="brand">GitHub</Link></li>
          </ul>
        </Alert>
      </section>
    </div>
  );
}
