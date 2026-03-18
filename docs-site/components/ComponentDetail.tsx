'use client';

import { Card, Alert, Badge } from '@/components/ClientComponents';
import CodeBlockSimple from '@/components/CodeBlockSimple';
import PropsTable from '@/components/PropsTable';
import PreviewBrandModeBar from '@/components/PreviewBrandModeBar';
import PackageManagerTabs from '@/components/PackageManagerTabs';
import ExpandableExamples from '@/components/ExpandableExamples';
import Link from 'next/link';
import styles from './ComponentDetail.module.css';

interface ComponentDetailProps {
  component: any;
}

export default function ComponentDetail({ component }: ComponentDetailProps) {
  return (
    <>
      {/* Mode Aware Alert */}
      {component.modeAware && (
        <Alert variant="info" style={{ marginBottom: 'var(--spacing-8)' }}>
          <strong>Mode Aware:</strong> This component adapts its styling based on the current mode
          (display, product, app).
        </Alert>
      )}

      {/* Section 1: Installation */}
      <section id="installation" className={styles.section}>
        <h2 className={styles.sectionTitle}>Installation</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-4)' }}>
          Install this component using the CLI or add the package to your project.
        </p>

        <div className={styles.installSection}>
          <div>
            <h4 className={styles.installLabel}>Using CLI</h4>
            <CodeBlockSimple code={`npx @orion-ds/cli add ${component.name}`} language="bash" />
          </div>

          {component.import && (
            <div>
              <h4 className={styles.installLabel}>Using npm Package</h4>
              <PackageManagerTabs packageName="@orion-ds/react" />
            </div>
          )}
        </div>
      </section>

      {/* Section 2: Preview */}
      <section id="preview" className={styles.section}>
        <h2 className={styles.sectionTitle}>Preview</h2>
        <PreviewBrandModeBar componentName={component.name} />
      </section>

      {/* Section 3: Usage */}
      {component.import && (
        <section id="usage" className={styles.section}>
          <h2 className={styles.sectionTitle}>Usage</h2>
          <CodeBlockSimple
            code={`${component.import}${
              component.cssImport ? `\n${component.cssImport}` : ''
            }\n\nexport default function Example() {\n  return <${component.title} />;\n}`}
            language="tsx"
          />
        </section>
      )}

      {/* Section 4: Examples */}
      {component.examples && component.examples.length > 1 && (
        <section id="examples" className={styles.section}>
          <h2 className={styles.sectionTitle}>Examples</h2>
          <ExpandableExamples
            examples={component.examples.map((example: any) => ({
              title: example.title,
              codeBlock: <CodeBlockSimple code={example.code} language="tsx" />,
            }))}
          />
        </section>
      )}

      {/* Section 5: Props */}
      {component.props && component.props.length > 0 && (
        <section id="props" className={styles.section}>
          <h2 className={styles.sectionTitle}>Props</h2>
          <PropsTable props={component.props} />
        </section>
      )}

      {/* Section 6: Design Tokens */}
      {component.tokens && component.tokens.length > 0 && (
        <section id="tokens" className={styles.section}>
          <h2 className={styles.sectionTitle}>Design Tokens</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-4)', fontSize: '0.9rem' }}>
            This component uses the following CSS tokens:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-2)' }}>
            {component.tokens.map((token: string) => (
              <Badge key={token} variant="secondary" size="sm">
                <code style={{ fontSize: '0.8rem' }}>{token}</code>
              </Badge>
            ))}
          </div>
        </section>
      )}

      {/* Section 7: Accessibility */}
      {component.accessibility && (
        <section id="accessibility" className={styles.section}>
          <h2 className={styles.sectionTitle}>Accessibility</h2>

          {component.accessibility.role && (
            <div style={{ marginBottom: 'var(--spacing-6)' }}>
              <h3 style={{ fontSize: '0.95rem', marginBottom: 'var(--spacing-2)' }}>Role</h3>
              <Badge variant="secondary">{component.accessibility.role}</Badge>
            </div>
          )}

          {component.accessibility.ariaAttributes && component.accessibility.ariaAttributes.length > 0 && (
            <div style={{ marginBottom: 'var(--spacing-6)' }}>
              <h3 style={{ fontSize: '0.95rem', marginBottom: 'var(--spacing-2)' }}>ARIA Attributes</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-2)' }}>
                {component.accessibility.ariaAttributes.map((attr: string) => (
                  <Badge key={attr} variant="secondary" size="sm">
                    {attr}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {component.accessibility.keyboardNav && component.accessibility.keyboardNav.length > 0 && (
            <div style={{ marginBottom: 'var(--spacing-6)' }}>
              <h3 style={{ fontSize: '0.95rem', marginBottom: 'var(--spacing-3)' }}>Keyboard Navigation</h3>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '0.9rem',
                }}
              >
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-subtle)' }}>
                    <th style={{ textAlign: 'left', padding: 'var(--spacing-2)', color: 'var(--text-secondary)' }}>
                      Key
                    </th>
                    <th style={{ textAlign: 'left', padding: 'var(--spacing-2)', color: 'var(--text-secondary)' }}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {component.accessibility.keyboardNav.map((item: any, idx: number) => (
                    <tr
                      key={idx}
                      style={{
                        borderBottom: '1px solid var(--border-subtle)',
                        background: idx % 2 === 0 ? 'transparent' : 'var(--surface-subtle)',
                      }}
                    >
                      <td style={{ padding: 'var(--spacing-3)', fontFamily: 'var(--font-mono)' }}>
                        <kbd style={{ background: 'var(--surface-layer)', padding: '2px 6px', borderRadius: '4px' }}>
                          {item.key}
                        </kbd>
                      </td>
                      <td style={{ padding: 'var(--spacing-3)' }}>{item.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {component.accessibility.notes && component.accessibility.notes.length > 0 && (
            <div>
              <h3 style={{ fontSize: '0.95rem', marginBottom: 'var(--spacing-2)' }}>Notes</h3>
              <ul style={{ margin: 0, paddingLeft: 'var(--spacing-6)' }}>
                {component.accessibility.notes.map((note: string, idx: number) => (
                  <li key={idx} style={{ marginBottom: 'var(--spacing-2)' }}>
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {/* Section 8: Dependencies */}
      {(component.dependencies || component.registryDependencies) && (
        <section id="dependencies" className={styles.section}>
          <h2 className={styles.sectionTitle}>Dependencies</h2>

          {component.dependencies && component.dependencies.length > 0 && (
            <div style={{ marginBottom: 'var(--spacing-6)' }}>
              <h3 style={{ fontSize: '0.95rem', marginBottom: 'var(--spacing-3)' }}>npm Packages</h3>
              <ul style={{ margin: 0, paddingLeft: 'var(--spacing-6)' }}>
                {component.dependencies.map((dep: string) => (
                  <li key={dep} style={{ marginBottom: 'var(--spacing-2)' }}>
                    <code>{dep}</code>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {component.registryDependencies && component.registryDependencies.length > 0 && (
            <div>
              <h3 style={{ fontSize: '0.95rem', marginBottom: 'var(--spacing-3)' }}>Registry Components</h3>
              <ul style={{ margin: 0, paddingLeft: 'var(--spacing-6)' }}>
                {component.registryDependencies.map((dep: string) => (
                  <li key={dep} style={{ marginBottom: 'var(--spacing-2)' }}>
                    <Link href={`/components/${dep}`}>
                      <code>{dep}</code>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {/* Section 9: Files */}
      {component.files && component.files.length > 0 && (
        <section id="files" className={styles.section}>
          <h2 className={styles.sectionTitle}>Files</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-4)', fontSize: '0.9rem' }}>
            Files copied to your project when using the CLI.
          </p>
          <ul style={{ margin: 0, paddingLeft: 'var(--spacing-6)' }}>
            {component.files.map((file: any, idx: number) => (
              <li key={idx} style={{ marginBottom: 'var(--spacing-3)' }}>
                <code>{file.path}</code> <Badge variant="secondary" size="sm">{file.type}</Badge>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
