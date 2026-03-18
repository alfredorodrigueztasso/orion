'use client';

import Link from 'next/link';
import type { RegistryItem } from '@/lib/registry';
import { Card, Badge } from '@/components/ClientComponents';
import CodeBlock from '@/components/CodeBlock';
import PropsTable from '@/components/PropsTable';
import SectionPreview from '@/components/SectionPreview';
import PackageManagerTabs from '@/components/PackageManagerTabs';

interface SectionDetailProps {
  section: RegistryItem;
}

export default function SectionDetail({ section }: SectionDetailProps) {
  return (
    <>
      {/* Section 1: Preview */}
      <section style={{ marginBottom: 'var(--spacing-12)' }}>
        <h2>Live Preview</h2>
        <SectionPreview sectionName={section.name} />
      </section>

      {/* Section 2: Installation */}
      <section style={{ marginBottom: 'var(--spacing-12)' }}>
        <h2>Installation</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-4)' }}>
          Install this section using the CLI or add the package to your project.
        </p>

        <Card variant="base" style={{ marginBottom: 'var(--spacing-4)' }}>
          <Card.Header>
            <h3 style={{ margin: 0, fontSize: '0.95rem' }}>Using CLI</h3>
          </Card.Header>
          <Card.Body style={{ padding: 0 }}>
            <CodeBlock
              code={`npx @orion-ds/cli add ${section.name}`}
              language="bash"
            />
          </Card.Body>
        </Card>

        {section.import && (
          <Card variant="base">
            <Card.Header>
              <h3 style={{ margin: 0, fontSize: '0.95rem' }}>Using npm Package</h3>
            </Card.Header>
            <Card.Body style={{ paddingBottom: 0 }}>
              <PackageManagerTabs packageName="@orion-ds/react" />
            </Card.Body>
          </Card>
        )}
      </section>

      {/* Section 3: Usage */}
      {section.import && (
        <section style={{ marginBottom: 'var(--spacing-12)' }}>
          <h2>Usage</h2>
          <Card variant="base">
            <Card.Header>
              <h3 style={{ margin: 0, fontSize: '0.95rem' }}>Basic Example</h3>
            </Card.Header>
            <Card.Body style={{ padding: 0 }}>
              <CodeBlock
                code={`${section.import}${section.cssImport ? `\n${section.cssImport}` : ''}\n\nexport default function Example() {\n  return <${section.title} />;\n}`}
                language="tsx"
              />
            </Card.Body>
          </Card>
        </section>
      )}

      {/* Section 4: Props */}
      {section.props && section.props.length > 0 && (
        <section style={{ marginBottom: 'var(--spacing-12)' }}>
          <h2>Props</h2>
          <PropsTable props={section.props} />
        </section>
      )}

      {/* Section 5: Dependencies */}
      {(section.dependencies || section.registryDependencies) && (
        <section style={{ marginBottom: 'var(--spacing-12)' }}>
          <h2>Dependencies</h2>

          {section.dependencies && section.dependencies.length > 0 && (
            <div style={{ marginBottom: 'var(--spacing-6)' }}>
              <h3 style={{ fontSize: '0.95rem', marginBottom: 'var(--spacing-3)' }}>npm packages:</h3>
              <ul style={{ margin: 0, paddingLeft: 'var(--spacing-6)' }}>
                {section.dependencies.map((dep: string) => (
                  <li key={dep} style={{ marginBottom: 'var(--spacing-2)' }}>
                    <code>{dep}</code>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {section.registryDependencies && section.registryDependencies.length > 0 && (
            <div>
              <h3 style={{ fontSize: '0.95rem', marginBottom: 'var(--spacing-3)' }}>Registry dependencies:</h3>
              <ul style={{ margin: 0, paddingLeft: 'var(--spacing-6)' }}>
                {section.registryDependencies.map((dep: string) => (
                  <li key={dep} style={{ marginBottom: 'var(--spacing-2)' }}>
                    <Link href={`/sections/${dep}`}>
                      <code>{dep}</code>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}
    </>
  );
}
