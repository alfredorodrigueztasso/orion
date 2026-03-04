import DocsPageHero from '@/components/DocsPageHero';
import DocsFeatureGrid from '@/components/DocsFeatureGrid';
import DocsStepCard from '@/components/DocsStepCard';
import DocsNextStepsGrid from '@/components/DocsNextStepsGrid';
import CodeBlockSimple from '@/components/CodeBlockSimple';
import { Card, CardBody, Alert, Accordion, Link } from '@/components/ClientComponents';
import { Package, Zap, Settings, Layers, BookOpen, GitBranch } from 'lucide-react';

export const metadata = {
  title: 'CLI Documentation',
  description: 'Copy components into your project instantly with @orion-ds/cli',
};

const FEATURES = [
  {
    icon: <Zap size={24} />,
    title: 'Zero Install',
    description: 'No new dependencies in production. Components are copied directly to your project.',
  },
  {
    icon: <Package size={24} />,
    title: 'Auto-detect PM',
    description: 'Automatically detects your package manager (pnpm, npm, yarn) and uses it.',
  },
  {
    icon: <Layers size={24} />,
    title: 'Smart Dependencies',
    description: 'Automatically resolves and copies all component dependencies using BFS.',
  },
  {
    icon: <BookOpen size={24} />,
    title: 'TypeScript Ready',
    description: 'Full TypeScript support with auto-generated types for all components.',
  },
  {
    icon: <Settings size={24} />,
    title: 'CSS Modules',
    description: 'Encapsulated styles copied alongside components for zero conflicts.',
  },
  {
    icon: <GitBranch size={24} />,
    title: 'Monorepo Support',
    description: 'Works seamlessly with pnpm/npm workspaces and monorepo setups.',
  },
];

const COMMANDS = [
  {
    id: 'init',
    title: 'orion init',
    content: (
      <div>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-4)', fontSize: '0.95rem' }}>
          Initialize your project and create <code style={{ background: 'var(--surface-layer)', padding: '0.2em 0.4em', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: '0.9em' }}>orion.json</code> configuration.
        </p>
        <CodeBlockSimple
          code={`npx @orion-ds/cli init\n\n# Prompts for:\n# - Target directories (components, utils, etc.)\n# - Package manager preference\n# - TypeScript/CSS preferences`}
          language="bash"
        />
      </div>
    ),
  },
  {
    id: 'add',
    title: 'orion add',
    content: (
      <div>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-4)', fontSize: '0.95rem' }}>
          Copy components to your project. Dependencies are resolved automatically.
        </p>
        <CodeBlockSimple
          code={`# Add single component
npx @orion-ds/cli add button

# Add multiple components
npx @orion-ds/cli add button card modal alert

# All dependencies are automatically copied
npx @orion-ds/cli add theme-controller\n# Resolves 6 dependencies automatically`}
          language="bash"
        />
      </div>
    ),
  },
  {
    id: 'list',
    title: 'orion list',
    content: (
      <div>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-4)', fontSize: '0.95rem' }}>
          List all available components, sections, and templates in the registry.
        </p>
        <CodeBlockSimple
          code={`npx @orion-ds/cli list
# Shows all 90+ items with descriptions

npx @orion-ds/cli list --type=component
# Filter by type: component | section | template`}
          language="bash"
        />
      </div>
    ),
  },
  {
    id: 'search',
    title: 'orion search',
    content: (
      <div>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-4)', fontSize: '0.95rem' }}>
          Search for components by name or description.
        </p>
        <CodeBlockSimple
          code={`npx @orion-ds/cli search button
# Finds all button-related components

npx @orion-ds/cli search table --type=component
# Search within a specific type`}
          language="bash"
        />
      </div>
    ),
  },
];

const TROUBLESHOOTING = [
  {
    id: 'not-found',
    title: 'Component not found',
    content: (
      <div>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-3)', fontSize: '0.95rem' }}>
          Make sure the component name is spelled correctly. Use <code style={{ background: 'var(--surface-layer)', padding: '0.2em 0.4em', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: '0.9em' }}>orion list</code> to see all available components.
        </p>
        <CodeBlockSimple code={`npx @orion-ds/cli list`} language="bash" />
      </div>
    ),
  },
  {
    id: 'registry-access',
    title: 'Registry not accessible',
    content: (
      <div>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-3)', fontSize: '0.95rem' }}>
          If the HTTP registry is unavailable, use the <code style={{ background: 'var(--surface-layer)', padding: '0.2em 0.4em', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: '0.9em' }}>--local</code> flag.
        </p>
        <CodeBlockSimple
          code={`npx @orion-ds/cli add button --local\n# Uses local public/r/ instead of HTTP`}
          language="bash"
        />
      </div>
    ),
  },
  {
    id: 'dep-resolution',
    title: 'Dependency resolution failed',
    content: (
      <div>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-3)', fontSize: '0.95rem' }}>
          This usually means a circular dependency or missing component. Check your <code style={{ background: 'var(--surface-layer)', padding: '0.2em 0.4em', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: '0.9em' }}>orion.json</code> paths are correct.
        </p>
        <Alert variant="info" style={{ marginTop: 'var(--spacing-3)' }}>
          Open an issue on GitHub with the error trace.
        </Alert>
      </div>
    ),
  },
  {
    id: 'module-error',
    title: 'Cannot find module',
    content: (
      <div>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-3)', fontSize: '0.95rem' }}>
          Ensure all TypeScript paths in <code style={{ background: 'var(--surface-layer)', padding: '0.2em 0.4em', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: '0.9em' }}>tsconfig.json</code> match your <code style={{ background: 'var(--surface-layer)', padding: '0.2em 0.4em', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: '0.9em' }}>orion.json</code> configuration.
        </p>
        <CodeBlockSimple
          code={`// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/components/*": ["./src/components/*"]
    }
  }
}`}
          language="json"
        />
      </div>
    ),
  },
];

const NEXT_STEPS = [
  {
    icon: <BookOpen size={20} />,
    title: 'Getting Started',
    description: 'Learn the fundamentals of Orion and the Chain of Truth.',
    href: '/docs/getting-started',
  },
  {
    icon: <Layers size={20} />,
    title: 'Component Library',
    description: 'Browse all 39+ components with live previews.',
    href: '/components',
  },
  {
    icon: <Settings size={20} />,
    title: 'Design Tokens',
    description: 'Understand the token system and semantic design.',
    href: '/docs/tokens',
  },
  {
    icon: <GitBranch size={20} />,
    title: 'Theming',
    description: 'Multi-brand, dark mode, and visual modes.',
    href: '/docs/theming',
  },
];

export default function CliPage() {
  return (
    <div className="docs-content">
      <DocsPageHero
        title="CLI — Copy Components Instantly"
        subtitle="Install components individually into your project, shadcn-style, with zero configuration."
        badges={[
          { label: 'shadcn-style', variant: 'brand' },
          { label: 'Zero Config', variant: 'secondary' },
          { label: 'TypeScript', variant: 'secondary' },
        ]}
      />

      {/* What You Can Do */}
      <section style={{ marginBottom: 'var(--spacing-12)' }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 600,
          marginBottom: 'var(--spacing-6)',
          color: 'var(--text-primary)',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: 'var(--spacing-3)',
        }}>
          What You Can Do
        </h2>

        <DocsFeatureGrid features={FEATURES} />
      </section>

      {/* Quick Start */}
      <section style={{ marginBottom: 'var(--spacing-12)' }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 600,
          marginBottom: 'var(--spacing-6)',
          color: 'var(--text-primary)',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: 'var(--spacing-3)',
        }}>
          Quick Start
        </h2>

        <DocsStepCard
          stepNumber={1}
          title="Initialize Your Project"
          description="Set up orion.json configuration and target directories."
        >
          <CodeBlockSimple code={`npx @orion-ds/cli init`} language="bash" />
        </DocsStepCard>

        <DocsStepCard
          stepNumber={2}
          title="Add Components"
          description="Choose components to copy. Dependencies are resolved automatically."
        >
          <CodeBlockSimple code={`npx @orion-ds/cli add button card modal`} language="bash" />
        </DocsStepCard>

        <DocsStepCard
          stepNumber={3}
          title="Import & Use"
          description="Start using components in your application immediately."
        >
          <CodeBlockSimple code={`import { Button } from './components/Button';\n\nexport default function App() {\n  return <Button>Click me</Button>;\n}`} language="tsx" />
        </DocsStepCard>
      </section>

      {/* Commands */}
      <section style={{ marginBottom: 'var(--spacing-12)' }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 600,
          marginBottom: 'var(--spacing-6)',
          color: 'var(--text-primary)',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: 'var(--spacing-3)',
        }}>
          Commands
        </h2>

        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-4)', lineHeight: 1.6 }}>
          The CLI provides four main commands to manage your component library.
        </p>

        <Accordion variant="separated" items={COMMANDS} />
      </section>

      {/* Flags */}
      <section style={{ marginBottom: 'var(--spacing-12)' }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 600,
          marginBottom: 'var(--spacing-6)',
          color: 'var(--text-primary)',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: 'var(--spacing-3)',
        }}>
          Flags
        </h2>

        <Card variant="base">
          <CardBody>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.95rem',
              lineHeight: 1.6,
            }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <th style={{ padding: 'var(--spacing-3)', textAlign: 'left', fontWeight: 600, color: 'var(--text-primary)' }}>Flag</th>
                  <th style={{ padding: 'var(--spacing-3)', textAlign: 'left', fontWeight: 600, color: 'var(--text-primary)' }}>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: 'var(--spacing-3)', fontFamily: 'var(--font-mono)', color: 'var(--text-brand)' }}>--yes</td>
                  <td style={{ padding: 'var(--spacing-3)', color: 'var(--text-secondary)' }}>Skip all prompts and use defaults</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: 'var(--spacing-3)', fontFamily: 'var(--font-mono)', color: 'var(--text-brand)' }}>--overwrite</td>
                  <td style={{ padding: 'var(--spacing-3)', color: 'var(--text-secondary)' }}>Replace existing component files</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: 'var(--spacing-3)', fontFamily: 'var(--font-mono)', color: 'var(--text-brand)' }}>--local</td>
                  <td style={{ padding: 'var(--spacing-3)', color: 'var(--text-secondary)' }}>Use local registry (public/r/) instead of HTTP</td>
                </tr>
                <tr>
                  <td style={{ padding: 'var(--spacing-3)', fontFamily: 'var(--font-mono)', color: 'var(--text-brand)' }}>--type</td>
                  <td style={{ padding: 'var(--spacing-3)', color: 'var(--text-secondary)' }}>Filter by component | section | template</td>
                </tr>
              </tbody>
            </table>
          </CardBody>
        </Card>
      </section>

      {/* Configuration */}
      <section style={{ marginBottom: 'var(--spacing-12)' }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 600,
          marginBottom: 'var(--spacing-6)',
          color: 'var(--text-primary)',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: 'var(--spacing-3)',
        }}>
          Configuration (orion.json)
        </h2>

        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-4)', lineHeight: 1.6 }}>
          After running <code style={{ background: 'var(--surface-layer)', padding: '0.2em 0.4em', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: '0.9em' }}>orion init</code>, a configuration file is created.
        </p>

        <Card variant="base">
          <CardBody style={{ padding: 0 }}>
            <CodeBlockSimple code={`{
  "componentDirectory": "./src/components",
  "utilsDirectory": "./src/utils",
  "typeScript": true,
  "packageManager": "pnpm",
  "registryUrl": "https://orion-ds.dev/r"
}`} language="json" />
          </CardBody>
        </Card>

        <Alert variant="info" style={{ marginTop: 'var(--spacing-4)' }}>
          All paths are relative to the project root. Adjust them to match your project structure.
        </Alert>
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

        <Accordion variant="separated" items={TROUBLESHOOTING} />
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
