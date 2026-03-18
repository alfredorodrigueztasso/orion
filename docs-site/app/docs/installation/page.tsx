import { CheckCircle, AlertTriangle, Code2, Settings, Download, Layers } from 'lucide-react';
import DocsPageHero from '@/components/DocsPageHero';
import DocsNextStepsGrid from '@/components/DocsNextStepsGrid';
import PackageManagerTabs from '@/components/PackageManagerTabs';
import CodeBlockSimple from '@/components/CodeBlockSimple';
import { Alert, Tabs, Accordion, Link, Timeline } from '@/components/ClientComponents';

export const metadata = {
  title: 'Installation',
  description: 'Complete setup guide for Orion across different frameworks',
};

const REACT_VITE_SETUP = `import { ThemeProvider } from '@orion-ds/react/client';
import '@orion-ds/react/styles.css';
import App from './App';

export default function Root() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}`;

const NEXTJS_APP_SETUP = `// app/layout.tsx
import { ThemeProvider } from '@orion-ds/react/client';
import '@orion-ds/react/styles.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}`;

const NEXTJS_PAGES_SETUP = `// pages/_app.tsx
import { ThemeProvider } from '@orion-ds/react/client';
import '@orion-ds/react/styles.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}`;

const REMIX_SETUP = `// root.tsx
import { ThemeProvider } from '@orion-ds/react/client';
import '@orion-ds/react/styles.css';

export default function App() {
  return (
    <ThemeProvider>
      <Outlet />
    </ThemeProvider>
  );
}`;

const USING_COMPONENTS = `import { Button, Card, Badge } from '@orion-ds/react';

export default function MyPage() {
  return (
    <Card>
      <Card.Header>
        <h1>Welcome</h1>
      </Card.Header>
      <Card.Body>
        <p>You're ready to build with Orion!</p>
        <Button variant="primary">Get Started</Button>
      </Card.Body>
    </Card>
  );
}`;

const CLI_SETUP = `npx @orion-ds/cli init
npx @orion-ds/cli add button card badge alert`;

const NEXT_STEPS = [
  {
    icon: <Download size={20} />,
    title: 'Getting Started',
    description: 'Overview and core concepts',
    href: '/docs/getting-started',
  },
  {
    icon: <Settings size={20} />,
    title: 'Theming',
    description: 'Brands, colors, and dark mode',
    href: '/docs/theming',
  },
  {
    icon: <Code2 size={20} />,
    title: 'Components',
    description: 'Browse all 69+ components',
    href: '/components',
  },
  {
    icon: <CheckCircle size={20} />,
    title: 'CLI',
    description: 'Copy components into your project',
    href: '/docs/cli',
  },
];

export default function InstallationPage() {
  return (
    <div className="docs-content">
      <DocsPageHero
        title="Installation"
        subtitle="Complete setup guide for Orion Design System across different frameworks and environments."
        badges={[
          { label: 'Node.js 18+', variant: 'secondary' },
          { label: 'React 19+', variant: 'secondary' },
          { label: 'TypeScript', variant: 'secondary' },
        ]}
      />

      {/* Prerequisites */}
      <section style={{ marginBottom: 'var(--spacing-12)' }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 600,
          marginBottom: 'var(--spacing-6)',
          color: 'var(--text-primary)',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: 'var(--spacing-3)',
        }}>
          Prerequisites
        </h2>
        <Alert variant="warning" title="System requirements">
          <ul style={{
            margin: 'var(--spacing-2) 0 0 0',
            paddingLeft: 'var(--spacing-4)',
            color: 'var(--text-secondary)',
            fontSize: '0.95rem',
          }}>
            <li>Node.js 18 or higher</li>
            <li>npm, pnpm, yarn, or bun package manager</li>
            <li>React 19+ (for @orion-ds/react)</li>
          </ul>
        </Alert>
      </section>

      {/* Installation Steps Stepper */}
      <section style={{ marginBottom: 'var(--spacing-12)' }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 600,
          marginBottom: 'var(--spacing-6)',
          color: 'var(--text-primary)',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: 'var(--spacing-3)',
        }}>
          Installation Steps
        </h2>
        <Timeline
          orientation="vertical"
          showConnector={true}
          background="none"
          align="left"
          events={[
            {
              id: 1,
              date: 'Step 1',
              title: 'Install the Package',
              description: 'Choose your preferred package manager:',
              status: 'default',
              icon: <Download size={20} />,
              content: <PackageManagerTabs packageName="@orion-ds/react" noPanelPadding />,
            },
            {
              id: 2,
              date: 'Step 2',
              title: 'Import Styles',
              description: 'Add the CSS import to your root layout or app component:',
              status: 'default',
              icon: <Layers size={20} />,
              content: (
                <>
                  <CodeBlockSimple
                    code={`import '@orion-ds/react/styles.css';`}
                    language="tsx"
                  />
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
                      <li>Theme support (light/dark)</li>
                      <li>Brand overrides (orion, red, deepblue, orange)</li>
                    </ul>
                  </Alert>
                </>
              ),
            },
            {
              id: 3,
              date: 'Step 3',
              title: 'Wrap with ThemeProvider',
              description: 'The ThemeProvider enables theme switching, brand management, and global style control.',
              status: 'default',
              icon: <Settings size={20} />,
              content: (
                <>
                  <Tabs
                    defaultTab="react"
                    noPanelPadding
                    tabs={[
                      {
                        id: 'react',
                        label: 'React',
                        content: <CodeBlockSimple code={REACT_VITE_SETUP} language="tsx" />,
                      },
                      {
                        id: 'nextjs-app',
                        label: 'Next.js App Router',
                        content: <CodeBlockSimple code={NEXTJS_APP_SETUP} language="tsx" />,
                      },
                      {
                        id: 'nextjs-pages',
                        label: 'Next.js Pages Router',
                        content: <CodeBlockSimple code={NEXTJS_PAGES_SETUP} language="tsx" />,
                      },
                      {
                        id: 'remix',
                        label: 'Remix',
                        content: <CodeBlockSimple code={REMIX_SETUP} language="tsx" />,
                      },
                    ]}
                  />
                  <Alert
                    variant="info"
                    title="Key points"
                    style={{ marginTop: 'var(--spacing-4)' }}
                  >
                    <ul style={{
                      margin: 'var(--spacing-2) 0 0 0',
                      paddingLeft: 'var(--spacing-4)',
                      color: 'var(--text-secondary)',
                      fontSize: '0.95rem',
                    }}>
                      <li>Use <code style={{
                        background: 'var(--surface-layer)',
                        padding: '0.2em 0.4em',
                        borderRadius: 'var(--radius-sm)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.9em',
                      }}>@orion-ds/react/client</code> entry point (SSR-safe)</li>
                      <li>Add <code style={{
                        background: 'var(--surface-layer)',
                        padding: '0.2em 0.4em',
                        borderRadius: 'var(--radius-sm)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.9em',
                      }}>suppressHydrationWarning</code> to <code style={{
                        background: 'var(--surface-layer)',
                        padding: '0.2em 0.4em',
                        borderRadius: 'var(--radius-sm)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.9em',
                      }}>&lt;html&gt;</code> in Next.js</li>
                      <li>Fonts load automatically — no Google Fonts setup needed</li>
                    </ul>
                  </Alert>
                </>
              ),
            },
            {
              id: 4,
              date: 'Step 4',
              title: 'Use Components',
              description: 'Start using Orion components:',
              status: 'default',
              icon: <Code2 size={20} />,
              content: <CodeBlockSimple code={USING_COMPONENTS} language="tsx" />,
            },
          ]}
        />
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
          Using the CLI (Alternative)
        </h2>
        <p style={{
          color: 'var(--text-secondary)',
          marginBottom: 'var(--spacing-4)',
          lineHeight: 1.6,
        }}>
          For faster component installation, use the Orion CLI:
        </p>
        <CodeBlockSimple code={CLI_SETUP} language="bash" />
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '0.875rem',
          marginTop: 'var(--spacing-3)',
          lineHeight: 1.5,
        }}>
          Components are copied directly into your project with zero dependencies. Learn more in <Link href="/docs/cli" variant="brand">CLI Documentation</Link>.
        </p>
      </section>

      {/* Troubleshooting */}
      <section style={{ marginBottom: 'var(--spacing-12)' }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 600,
          marginBottom: 'var(--spacing-6)',
          color: 'var(--text-primary)',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: 'var(--spacing-3)',
        }}>
          Troubleshooting
        </h2>
        <Accordion
          variant="separated"
          items={[
            {
              id: 'styles',
              title: 'Styles not applying',
              icon: <AlertTriangle size={18} />,
              content: (
                <ul style={{
                  margin: 0,
                  paddingLeft: 'var(--spacing-4)',
                  color: 'var(--text-secondary)',
                  fontSize: '0.95rem',
                }}>
                  <li>Verify <code style={{
                    background: 'var(--surface-layer)',
                    padding: '0.2em 0.4em',
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.9em',
                  }}>import '@orion-ds/react/styles.css'</code> is in your root layout</li>
                  <li>Check that <code style={{
                    background: 'var(--surface-layer)',
                    padding: '0.2em 0.4em',
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.9em',
                  }}>&lt;ThemeProvider&gt;</code> wraps your entire app</li>
                  <li>Ensure <code style={{
                    background: 'var(--surface-layer)',
                    padding: '0.2em 0.4em',
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.9em',
                  }}>suppressHydrationWarning</code> is on <code style={{
                    background: 'var(--surface-layer)',
                    padding: '0.2em 0.4em',
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.9em',
                  }}>&lt;html&gt;</code> in Next.js</li>
                </ul>
              ),
            },
            {
              id: 'typescript',
              title: 'TypeScript errors',
              icon: <AlertTriangle size={18} />,
              content: (
                <ul style={{
                  margin: 0,
                  paddingLeft: 'var(--spacing-4)',
                  color: 'var(--text-secondary)',
                  fontSize: '0.95rem',
                }}>
                  <li>Update <code style={{
                    background: 'var(--surface-layer)',
                    padding: '0.2em 0.4em',
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.9em',
                  }}>@orion-ds/react</code> to the latest version</li>
                  <li>Run <code style={{
                    background: 'var(--surface-layer)',
                    padding: '0.2em 0.4em',
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.9em',
                  }}>npm install</code> to ensure all type definitions are installed</li>
                  <li>Check <code style={{
                    background: 'var(--surface-layer)',
                    padding: '0.2em 0.4em',
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.9em',
                  }}>tsconfig.json</code> has <code style={{
                    background: 'var(--surface-layer)',
                    padding: '0.2em 0.4em',
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.9em',
                  }}>"moduleResolution": "bundler"</code></li>
                </ul>
              ),
            },
            {
              id: 'fonts',
              title: 'Fonts not loading',
              icon: <AlertTriangle size={18} />,
              content: (
                <ul style={{
                  margin: 0,
                  paddingLeft: 'var(--spacing-4)',
                  color: 'var(--text-secondary)',
                  fontSize: '0.95rem',
                }}>
                  <li>Fonts load automatically via <code style={{
                    background: 'var(--surface-layer)',
                    padding: '0.2em 0.4em',
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.9em',
                  }}>ThemeProvider</code></li>
                  <li>If fonts don't appear, check network tab in DevTools</li>
                  <li>Fallback system fonts will display if Google Fonts CDN is unavailable</li>
                </ul>
              ),
            },
            {
              id: 'nextjs-build',
              title: 'Build errors in Next.js',
              icon: <AlertTriangle size={18} />,
              content: (
                <ul style={{
                  margin: 0,
                  paddingLeft: 'var(--spacing-4)',
                  color: 'var(--text-secondary)',
                  fontSize: '0.95rem',
                }}>
                  <li>For App Router, use <code style={{
                    background: 'var(--surface-layer)',
                    padding: '0.2em 0.4em',
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.9em',
                  }}>@orion-ds/react/client</code> entry point (not main)</li>
                  <li>For Pages Router, use the main entry point</li>
                  <li>Ensure <code style={{
                    background: 'var(--surface-layer)',
                    padding: '0.2em 0.4em',
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.9em',
                  }}>suppressHydrationWarning</code> is set on <code style={{
                    background: 'var(--surface-layer)',
                    padding: '0.2em 0.4em',
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.9em',
                  }}>&lt;html&gt;</code> tag</li>
                </ul>
              ),
            },
          ]}
        />
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
