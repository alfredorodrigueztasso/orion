import DocsPageHero from '@/components/DocsPageHero';
import DocsFeatureGrid from '@/components/DocsFeatureGrid';
import DocsNextStepsGrid from '@/components/DocsNextStepsGrid';
import CodeBlockSimple from '@/components/CodeBlockSimple';
import { Card, CardBody, Alert, Accordion } from '@/components/ClientComponents';
import { Bot, Zap, Package, Code2, BookOpen, Layers, Settings, GitBranch, Terminal } from 'lucide-react';

export const metadata = {
  title: 'MCP Server Documentation',
  description: 'AI-native component discovery and validation using Model Context Protocol',
};

const FEATURES = [
  {
    icon: <Bot size={24} />,
    title: 'AI-Native Integration',
    description: 'Direct access to component registry, tokens, and validation from Claude, Cursor, Cline.',
  },
  {
    icon: <Zap size={24} />,
    title: 'Live Registry Data',
    description: 'No hallucination. AI fetches exact props, types, and examples in real-time.',
  },
  {
    icon: <Code2 size={24} />,
    title: 'Code Validation',
    description: 'Validate TSX/CSS against Orion rules: no hardcoded colors, pixels, or fonts.',
  },
  {
    icon: <Package size={24} />,
    title: 'Token Introspection',
    description: 'Browse all design tokens by category (colors, spacing, typography, etc.).',
  },
  {
    icon: <Settings size={24} />,
    title: 'Setup Guides',
    description: 'Framework-specific setup for Vite, Next.js, and React with auto-generated code.',
  },
  {
    icon: <BookOpen size={24} />,
    title: 'Multi-Tool Support',
    description: 'Works with Claude Desktop, Claude Code, Cursor, Cline, Continue.dev, and more.',
  },
];

const TOOLS = [
  {
    id: 'list-components',
    title: 'list-components',
    content: (
      <div>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-3)', fontSize: '0.95rem' }}>
          List all components, sections, and templates. Filter by category or type.
        </p>
        <CodeBlockSimple
          code={`// Show all form components
list-components(category: 'forms')

// Show only sections
list-components(type: 'registry:section')`}
          language="typescript"
        />
        <p style={{ color: 'var(--text-tertiary)', marginTop: 'var(--spacing-2)', fontSize: '0.9rem' }}>
          Returns: Grouped list with counts (e.g., "39 components | 41 sections | 10 templates")
        </p>
      </div>
    ),
  },
  {
    id: 'get-component',
    title: 'get-component',
    content: (
      <div>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-3)', fontSize: '0.95rem' }}>
          Get complete details: props with types, defaults, code examples, tokens, accessibility, files.
        </p>
        <CodeBlockSimple
          code={`// Get Button props and examples
get-component(name: 'button')

// Get complex component
get-component(name: 'data-table')`}
          language="typescript"
        />
        <p style={{ color: 'var(--text-tertiary)', marginTop: 'var(--spacing-2)', fontSize: '0.9rem' }}>
          Returns: Full API documentation with examples and accessibility details
        </p>
      </div>
    ),
  },
  {
    id: 'search-components',
    title: 'search-components',
    content: (
      <div>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-3)', fontSize: '0.95rem' }}>
          Semantic search with keyword matching and synonym mapping.
        </p>
        <CodeBlockSimple
          code={`// Find form inputs
search-components(query: 'form input')

// Find anything popup-like
search-components(query: 'dialog popup')`}
          language="typescript"
        />
        <p style={{ color: 'var(--text-tertiary)', marginTop: 'var(--spacing-2)', fontSize: '0.9rem' }}>
          Returns: Ranked results (15 max) with descriptions
        </p>
      </div>
    ),
  },
  {
    id: 'list-tokens',
    title: 'list-tokens',
    content: (
      <div>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-3)', fontSize: '0.95rem' }}>
          List design tokens by category (surface, text, interactive, spacing, radius, shadow, font, color).
        </p>
        <CodeBlockSimple
          code={`// Show color tokens
list-tokens(category: 'color')

// Show spacing scale
list-tokens(category: 'spacing')

// Show all categories
list-tokens()`}
          language="typescript"
        />
        <p style={{ color: 'var(--text-tertiary)', marginTop: 'var(--spacing-2)', fontSize: '0.9rem' }}>
          Returns: Tokens per category with light/dark values
        </p>
      </div>
    ),
  },
];

const SETUP_GUIDES = [
  {
    id: 'claude-code',
    title: 'Claude Code',
    content: (
      <div>
        <ol style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.8, paddingLeft: 'var(--spacing-5)' }}>
          <li>Open Claude Code extension settings</li>
          <li>Create <code style={{ background: 'var(--surface-layer)', padding: '0.2em 0.4em', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: '0.9em' }}>.claude.json</code></li>
          <li>Add the config (see below)</li>
          <li>Reload extension</li>
          <li>Ask: "What components do you have?"</li>
        </ol>
      </div>
    ),
  },
  {
    id: 'cursor',
    title: 'Cursor IDE',
    content: (
      <div>
        <ol style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.8, paddingLeft: 'var(--spacing-5)' }}>
          <li>Open Cursor settings</li>
          <li>Search for "MCP"</li>
          <li>Add to settings (see below)</li>
          <li>Restart Cursor</li>
          <li>In Composer, ask: "Button component?"</li>
        </ol>
      </div>
    ),
  },
];

const TROUBLESHOOTING = [
  {
    id: 'not-found',
    title: 'MCP server not found',
    content: (
      <div>
        <ol style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.8, paddingLeft: 'var(--spacing-5)' }}>
          <li>Verify npx is installed</li>
          <li>Check config file location</li>
          <li>Reload your editor</li>
        </ol>
      </div>
    ),
  },
];

const NEXT_STEPS = [
  {
    icon: <BookOpen size={20} />,
    title: 'Getting Started',
    description: 'Install @orion-ds/react and wrap your app with ThemeProvider.',
    href: '/docs/getting-started',
  },
  {
    icon: <Code2 size={20} />,
    title: 'Component Library',
    description: 'Browse all 69+ components with live previews and prop documentation.',
    href: '/components',
  },
];

export default function McpPage() {
  return (
    <div className="docs-content">
      <DocsPageHero
        title="MCP Server — AI-Native Component Discovery"
        subtitle="Give Claude, Cursor, and other AI tools direct access to your component library with zero hallucination."
        badges={[
          { label: 'Model Context Protocol', variant: 'brand' },
          { label: 'AI-First', variant: 'secondary' },
          { label: '9 Tools', variant: 'secondary' },
        ]}
      />

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

      <section style={{ marginBottom: 'var(--spacing-12)' }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 600,
          marginBottom: 'var(--spacing-6)',
          color: 'var(--text-primary)',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: 'var(--spacing-3)',
        }}>
          Quick Start (30 seconds)
        </h2>
        <CodeBlockSimple
          code={`npx @orion-ds/mcp

# Configure your editor (.claude.json, settings.json, etc.)
# Then ask Claude: "What components do you have?"
# Done! Claude now has access to the registry.`}
          language="bash"
        />
      </section>

      <section style={{ marginBottom: 'var(--spacing-12)' }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 600,
          marginBottom: 'var(--spacing-6)',
          color: 'var(--text-primary)',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: 'var(--spacing-3)',
        }}>
          The 9 Tools
        </h2>
        <Accordion variant="separated" items={TOOLS} />
      </section>

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
