import DocsPageHero from '@/components/DocsPageHero';
import DocsNextStepsGrid from '@/components/DocsNextStepsGrid';
import DocsBrandGrid from '@/components/DocsBrandGrid';
import DocsFeatureGrid from '@/components/DocsFeatureGrid';
import CodeBlockSimple from '@/components/CodeBlockSimple';
import { Card, CardBody, Alert, Accordion } from '@/components/ClientComponents';
import { Palette, Moon, Zap } from 'lucide-react';

export const metadata = {
  title: 'Theming',
  description: 'Brands, dark mode, and visual modes in Orion Design System',
};

const VISUAL_MODES_GRID = [
  {
    icon: <Zap size={32} />,
    title: 'Display',
    description: 'Atmospheric & narrative for marketing pages',
  },
  {
    icon: <Zap size={32} />,
    title: 'Product',
    description: 'Geometric precision for SaaS dashboards',
  },
  {
    icon: <Zap size={32} />,
    title: 'App',
    description: 'Tactile elevation for mobile interfaces',
  },
];

const VISUAL_MODES_ACCORDION = [
  {
    id: 'display',
    title: 'Display Mode',
    content: (
      <div style={{ color: 'var(--text-primary)', lineHeight: 1.6 }}>
        <p style={{ marginBottom: 'var(--spacing-3)' }}>
          <strong>Philosophy:</strong> Atmospheric & Narrative (Apple-style)
        </p>
        <p style={{ marginBottom: 'var(--spacing-3)' }}>
          <strong>Visual Characteristics:</strong>
        </p>
        <ul style={{ marginLeft: 'var(--spacing-4)', marginBottom: 'var(--spacing-3)' }}>
          <li>✅ Glassmorphism enabled (backdrop-filter: blur)</li>
          <li>Generous shadows (shadow-md to shadow-lg)</li>
          <li>Large hover lifts (-4px translateY)</li>
          <li>Expansive typography (20px+ body)</li>
        </ul>
        <p>
          <strong>Use When:</strong> Marketing pages, landing pages, hero sections
        </p>
      </div>
    ),
  },
  {
    id: 'product',
    title: 'Product Mode',
    content: (
      <div style={{ color: 'var(--text-primary)', lineHeight: 1.6 }}>
        <p style={{ marginBottom: 'var(--spacing-3)' }}>
          <strong>Philosophy:</strong> Geometric Precision (Linear/Figma-style)
        </p>
        <p style={{ marginBottom: 'var(--spacing-3)' }}>
          <strong>Visual Characteristics:</strong>
        </p>
        <ul style={{ marginLeft: 'var(--spacing-4)', marginBottom: 'var(--spacing-3)' }}>
          <li>❌ Glassmorphism disabled (solid backgrounds)</li>
          <li>Minimal shadows (shadow-flat to shadow-sm)</li>
          <li>No hover lifts (0px - background color change only)</li>
          <li>Compact typography (14px body)</li>
        </ul>
        <p>
          <strong>Use When:</strong> Dashboards, admin panels, data-heavy interfaces
        </p>
      </div>
    ),
  },
  {
    id: 'app',
    title: 'App Mode',
    content: (
      <div style={{ color: 'var(--text-primary)', lineHeight: 1.6 }}>
        <p style={{ marginBottom: 'var(--spacing-3)' }}>
          <strong>Philosophy:</strong> Tactile Elevation (Material 3-style)
        </p>
        <p style={{ marginBottom: 'var(--spacing-3)' }}>
          <strong>Visual Characteristics:</strong>
        </p>
        <ul style={{ marginLeft: 'var(--spacing-4)', marginBottom: 'var(--spacing-3)' }}>
          <li>❌ Glassmorphism disabled (native feel)</li>
          <li>Native shadows (shadow-md hover: shadow-lg)</li>
          <li>Subtle hover lifts (-2px translateY)</li>
          <li>Mobile-legible typography (16px+ body)</li>
        </ul>
        <p>
          <strong>Use When:</strong> Mobile apps, touch interfaces, native feel required
        </p>
      </div>
    ),
  },
];

const THEME_PROVIDER_PROPS = [
  { prop: 'disableAutoFontLoading', type: 'boolean', default: 'false', description: 'Disable automatic font loading' },
  { prop: 'disableFontWarnings', type: 'boolean', default: 'false', description: 'Disable console warnings for missing fonts' },
];

const NEXT_STEPS = [
  {
    icon: <Zap size={24} />,
    title: 'Design Tokens',
    description: 'Understand the 3-layer token system',
    href: '/docs/tokens',
  },
  {
    icon: <Palette size={24} />,
    title: 'Components',
    description: 'Browse all 90+ components',
    href: '/docs/components',
  },
  {
    icon: <Moon size={24} />,
    title: 'CLI',
    description: 'Install components instantly',
    href: '/docs/cli',
  },
  {
    icon: <Zap size={24} />,
    title: 'Getting Started',
    description: 'Project setup and first steps',
    href: '/docs/getting-started',
  },
];

export default function ThemingPage() {
  return (
    <div style={{ paddingBottom: 'var(--spacing-16)' }}>
      <DocsPageHero
        title="Theming"
        subtitle="Multi-brand, dark mode, and three visual modes — all without touching components."
        badges={[
          { label: 'Multi-Brand', variant: 'brand' },
          { label: 'Dark Mode', variant: 'secondary' },
          { label: '3 Visual Modes', variant: 'secondary' },
        ]}
      />

      {/* Brands Section */}
      <section style={{ marginBottom: 'var(--spacing-16)' }}>
        <h2 style={{
          fontSize: '1.75rem',
          fontWeight: 600,
          color: 'var(--text-primary)',
          marginBottom: 'var(--spacing-6)',
          marginTop: 0,
        }}>
          Brands
        </h2>

        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1rem',
          lineHeight: 1.6,
          marginBottom: 'var(--spacing-6)',
        }}>
          Orion supports multiple brands out of the box. Switch brands globally without changing a single component.
        </p>

        <DocsBrandGrid />

        <div style={{ marginBottom: 'var(--spacing-6)' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-3)' }}>
            Switch brands with the ThemeContext:
          </p>
          <CodeBlockSimple
            code={`import { useThemeContext } from '@orion-ds/react';

function BrandSwitcher() {
  const { brand, setBrand } = useThemeContext();

  return (
    <button onClick={() => setBrand('red')}>
      Switch to Red Brand
    </button>
  );
}`}
            language="tsx"
          />
        </div>
      </section>

      {/* Dark Mode Section */}
      <section style={{ marginBottom: 'var(--spacing-16)' }}>
        <h2 style={{
          fontSize: '1.75rem',
          fontWeight: 600,
          color: 'var(--text-primary)',
          marginBottom: 'var(--spacing-6)',
          marginTop: 0,
        }}>
          Dark Mode
        </h2>

        <Alert variant="info" style={{ marginBottom: 'var(--spacing-6)' }}>
          <p style={{ margin: 0 }}>
            Dark mode is controlled globally via the <code style={{ backgroundColor: 'var(--surface-layer)' }}>data-theme</code> attribute on <code style={{ backgroundColor: 'var(--surface-layer)' }}>&lt;html&gt;</code>. Change it to switch all components instantly.
          </p>
        </Alert>

        <div style={{ marginBottom: 'var(--spacing-6)' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-3)' }}>
            Toggle dark mode:
          </p>
          <CodeBlockSimple
            code={`import { useThemeContext } from '@orion-ds/react';

function ThemeToggle() {
  const { theme, setTheme } = useThemeContext();

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}`}
            language="tsx"
          />
        </div>

        <Card variant="base">
          <CardBody>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              margin: '0 0 var(--spacing-4) 0',
            }}>
              Token Differences by Theme
            </h3>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.875rem',
            }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <th style={{
                    textAlign: 'left',
                    padding: 'var(--spacing-3)',
                    color: 'var(--text-secondary)',
                    fontWeight: 500,
                  }}>
                    Token
                  </th>
                  <th style={{
                    textAlign: 'left',
                    padding: 'var(--spacing-3)',
                    color: 'var(--text-secondary)',
                    fontWeight: 500,
                  }}>
                    Light Theme
                  </th>
                  <th style={{
                    textAlign: 'left',
                    padding: 'var(--spacing-3)',
                    color: 'var(--text-secondary)',
                    fontWeight: 500,
                  }}>
                    Dark Theme
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: 'var(--spacing-3)', color: 'var(--text-primary)' }}>--surface-base</td>
                  <td style={{ padding: 'var(--spacing-3)', color: 'var(--text-secondary)' }}>#FFFFFF</td>
                  <td style={{ padding: 'var(--spacing-3)', color: 'var(--text-secondary)' }}>--gray-950</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: 'var(--spacing-3)', color: 'var(--text-primary)' }}>--text-primary</td>
                  <td style={{ padding: 'var(--spacing-3)', color: 'var(--text-secondary)' }}>--gray-950</td>
                  <td style={{ padding: 'var(--spacing-3)', color: 'var(--text-secondary)' }}>#FFFFFF</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: 'var(--spacing-3)', color: 'var(--text-primary)' }}>--surface-layer</td>
                  <td style={{ padding: 'var(--spacing-3)', color: 'var(--text-secondary)' }}>--gray-100</td>
                  <td style={{ padding: 'var(--spacing-3)', color: 'var(--text-secondary)' }}>--gray-800</td>
                </tr>
                <tr>
                  <td style={{ padding: 'var(--spacing-3)', color: 'var(--text-primary)' }}>--border-subtle</td>
                  <td style={{ padding: 'var(--spacing-3)', color: 'var(--text-secondary)' }}>--gray-200</td>
                  <td style={{ padding: 'var(--spacing-3)', color: 'var(--text-secondary)' }}>--gray-700</td>
                </tr>
              </tbody>
            </table>
          </CardBody>
        </Card>
      </section>

      {/* Visual Modes Section */}
      <section style={{ marginBottom: 'var(--spacing-16)' }}>
        <h2 style={{
          fontSize: '1.75rem',
          fontWeight: 600,
          color: 'var(--text-primary)',
          marginBottom: 'var(--spacing-3)',
          marginTop: 0,
        }}>
          Visual Modes
        </h2>

        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1rem',
          lineHeight: 1.6,
          marginBottom: 'var(--spacing-6)',
        }}>
          Three distinct visual modes adapt components to different contexts: Display (marketing), Product (SaaS), and App (mobile).
        </p>

        <DocsFeatureGrid features={VISUAL_MODES_GRID} />

        <Accordion
          items={VISUAL_MODES_ACCORDION}
          variant="separated"
        />

        <div style={{ marginTop: 'var(--spacing-8)', marginBottom: 'var(--spacing-6)' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-3)' }}>
            Set visual mode with ThemeContext:
          </p>
          <CodeBlockSimple
            code={`import { useThemeContext } from '@orion-ds/react';

function ModeSwitcher() {
  const { mode, setMode } = useThemeContext();

  return (
    <div>
      <button onClick={() => setMode('display')}>Display</button>
      <button onClick={() => setMode('product')}>Product</button>
      <button onClick={() => setMode('app')}>App</button>
    </div>
  );
}`}
            language="tsx"
          />
        </div>
      </section>

      {/* ThemeProvider Section */}
      <section style={{ marginBottom: 'var(--spacing-16)' }}>
        <h2 style={{
          fontSize: '1.75rem',
          fontWeight: 600,
          color: 'var(--text-primary)',
          marginBottom: 'var(--spacing-6)',
          marginTop: 0,
        }}>
          ThemeProvider Setup
        </h2>

        <div style={{ marginBottom: 'var(--spacing-6)' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-3)' }}>
            Wrap your app with ThemeProvider at the root level:
          </p>
          <CodeBlockSimple
            code={`import { ThemeProvider } from '@orion-ds/react';
import '@orion-ds/react/styles.css';

export default function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}`}
            language="tsx"
          />
        </div>

        <Card variant="base">
          <CardBody>
            <h3 style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              margin: '0 0 var(--spacing-4) 0',
            }}>
              ThemeProvider Props
            </h3>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.875rem',
            }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <th style={{
                    textAlign: 'left',
                    padding: 'var(--spacing-3)',
                    color: 'var(--text-secondary)',
                    fontWeight: 500,
                  }}>
                    Prop
                  </th>
                  <th style={{
                    textAlign: 'left',
                    padding: 'var(--spacing-3)',
                    color: 'var(--text-secondary)',
                    fontWeight: 500,
                  }}>
                    Type
                  </th>
                  <th style={{
                    textAlign: 'left',
                    padding: 'var(--spacing-3)',
                    color: 'var(--text-secondary)',
                    fontWeight: 500,
                  }}>
                    Default
                  </th>
                  <th style={{
                    textAlign: 'left',
                    padding: 'var(--spacing-3)',
                    color: 'var(--text-secondary)',
                    fontWeight: 500,
                  }}>
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {THEME_PROVIDER_PROPS.map((prop, idx) => (
                  <tr key={idx} style={{ borderBottom: idx < THEME_PROVIDER_PROPS.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                    <td style={{ padding: 'var(--spacing-3)', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{prop.prop}</td>
                    <td style={{ padding: 'var(--spacing-3)', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>{prop.type}</td>
                    <td style={{ padding: 'var(--spacing-3)', color: 'var(--text-secondary)' }}>{prop.default}</td>
                    <td style={{ padding: 'var(--spacing-3)', color: 'var(--text-secondary)' }}>{prop.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </section>

      {/* Combining Everything Section */}
      <section style={{ marginBottom: 'var(--spacing-16)' }}>
        <h2 style={{
          fontSize: '1.75rem',
          fontWeight: 600,
          color: 'var(--text-primary)',
          marginBottom: 'var(--spacing-6)',
          marginTop: 0,
        }}>
          Combining Everything
        </h2>

        <Card variant="elevated">
          <CardBody>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-3)' }}>
              Use brand, theme, and mode together for complete visual control:
            </p>
            <CodeBlockSimple
              code={`<!-- HTML attribute example -->
<html
  data-brand="orange"
  data-theme="dark"
  data-mode="display"
>

<!-- React example -->
import { useThemeContext } from '@orion-ds/react';

function App() {
  const { setBrand, setTheme, setMode } = useThemeContext();

  return (
    <button onClick={() => {
      setBrand('red');
      setTheme('dark');
      setMode('product');
    }}>
      Dark Red Product Mode
    </button>
  );
}`}
              language="jsx"
            />
          </CardBody>
        </Card>
      </section>

      {/* Next Steps */}
      <section>
        <h2 style={{
          fontSize: '1.75rem',
          fontWeight: 600,
          color: 'var(--text-primary)',
          marginBottom: 'var(--spacing-6)',
          marginTop: 0,
        }}>
          Next Steps
        </h2>
        <DocsNextStepsGrid items={NEXT_STEPS} />
      </section>
    </div>
  );
}
