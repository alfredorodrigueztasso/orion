'use client';

import Link from 'next/link';
import { Card } from '@/components/ClientComponents';
import CodeBlock from '@/components/CodeBlock';
import PropsTable from '@/components/PropsTable';
import TemplatePreview from '@/components/TemplatePreview';
import PackageManagerTabs from '@/components/PackageManagerTabs';

interface TemplateDetailProps {
  template: any;
}

export default function TemplateDetail({ template }: TemplateDetailProps) {
  return (
    <>
      {/* Section 1: Preview */}
      <section style={{ marginBottom: 'var(--spacing-12)' }}>
        <h2>Template Preview</h2>
        <TemplatePreview templateName={template.name} />
      </section>

      {/* Section 2: Installation */}
      <section style={{ marginBottom: 'var(--spacing-12)' }}>
        <h2>Installation</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-4)' }}>
          Install this template using the CLI or add the package to your project.
        </p>

        <Card variant="base" style={{ marginBottom: 'var(--spacing-4)' }}>
          <Card.Header>
            <h3 style={{ margin: 0, fontSize: '0.95rem' }}>Using CLI</h3>
          </Card.Header>
          <Card.Body style={{ padding: 0 }}>
            <CodeBlock
              code={`npx @orion-ds/cli add ${template.name}`}
              language="bash"
            />
          </Card.Body>
        </Card>

        {template.import && (
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
      {template.import && (
        <section style={{ marginBottom: 'var(--spacing-12)' }}>
          <h2>Usage</h2>
          <Card variant="base">
            <Card.Header>
              <h3 style={{ margin: 0, fontSize: '0.95rem' }}>Basic Example</h3>
            </Card.Header>
            <Card.Body style={{ padding: 0 }}>
              <CodeBlock
                code={`${template.import}${template.cssImport ? `\n${template.cssImport}` : ''}\n\nexport default function MyPage() {\n  return <${template.title} />;\n}`}
                language="tsx"
              />
            </Card.Body>
          </Card>
        </section>
      )}

      {/* Section 4: Props */}
      {template.props && template.props.length > 0 && (
        <section style={{ marginBottom: 'var(--spacing-12)' }}>
          <h2>Props</h2>
          <PropsTable props={template.props} />
        </section>
      )}

      {/* Section 5: Dependencies */}
      {(template.dependencies || template.registryDependencies) && (
        <section style={{ marginBottom: 'var(--spacing-12)' }}>
          <h2>Dependencies</h2>

          {template.dependencies && template.dependencies.length > 0 && (
            <div style={{ marginBottom: 'var(--spacing-6)' }}>
              <h3 style={{ fontSize: '0.95rem', marginBottom: 'var(--spacing-3)' }}>npm packages:</h3>
              <ul style={{ margin: 0, paddingLeft: 'var(--spacing-6)' }}>
                {template.dependencies.map((dep: string) => (
                  <li key={dep} style={{ marginBottom: 'var(--spacing-2)' }}>
                    <code>{dep}</code>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {template.registryDependencies && template.registryDependencies.length > 0 && (
            <div>
              <h3 style={{ fontSize: '0.95rem', marginBottom: 'var(--spacing-3)' }}>Registry dependencies:</h3>
              <ul style={{ margin: 0, paddingLeft: 'var(--spacing-6)' }}>
                {template.registryDependencies.map((dep: string) => (
                  <li key={dep} style={{ marginBottom: 'var(--spacing-2)' }}>
                    <Link href={`/templates/${dep}`}>
                      <code>{dep}</code>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {/* Section 6: Preview Link */}
      {template.preview && (
        <section style={{ marginBottom: 'var(--spacing-12)' }}>
          <h2>Preview</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            View the live preview:{' '}
            <a href={template.preview.url} target="_blank" rel="noopener noreferrer">
              {template.preview.url}
            </a>
          </p>
        </section>
      )}
    </>
  );
}
