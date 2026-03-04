import Link from 'next/link';
import { getAllSections, getCategoriesByType } from '@/lib/registry';
import { Card, Badge } from '@/components/ClientComponents';
import SectionPreview from '@/components/SectionPreview';

export const metadata = {
  title: 'Sections',
  description: 'Pre-built page sections for rapid development',
};

export default async function SectionsListPage() {
  const sections = await getAllSections();
  const categories = getCategoriesByType('registry:section');

  const sectionsByCategory = categories.reduce((acc, category) => {
    acc[category] = sections.filter(s => s.category === category);
    return acc;
  }, {} as Record<string, typeof sections>);

  return (
    <div style={{ padding: 'var(--spacing-8)' }}>
      {/* Hero Section */}
      <section style={{
        textAlign: 'center',
        marginBottom: 'var(--spacing-16)',
        paddingTop: 'var(--spacing-8)',
      }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: 800,
          marginBottom: 'var(--spacing-3)',
        }}>
          Building Blocks for the Web
        </h1>
        <p style={{
          fontSize: '1.125rem',
          color: 'var(--text-secondary)',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: 1.6,
        }}>
          {sections.length} pre-built sections. Copy, paste, customize. No dependencies.
        </p>
      </section>

      {/* Sections by Category */}
      {categories.map((category) => (
        <section key={category} style={{ marginBottom: 'var(--spacing-16)' }}>
          <h2 style={{
            textTransform: 'capitalize',
            marginBottom: 'var(--spacing-6)',
            fontSize: '1.5rem',
            fontWeight: 600,
          }}>
            {category}
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: 'var(--spacing-6)',
          }}>
            {sectionsByCategory[category]?.map((section) => (
              <Link
                key={section.name}
                href={`/sections/${section.name}`}
                style={{ textDecoration: 'none' }}
              >
                <Card variant="base" style={{ height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
                  {/* Preview */}
                  <div style={{
                    height: '240px',
                    overflow: 'hidden',
                    borderBottom: '1px solid var(--border-subtle)',
                    background: 'var(--surface-subtle)',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.875rem',
                    color: 'var(--text-tertiary)',
                  }}>
                    <div style={{
                      transform: 'scale(0.35)',
                      transformOrigin: 'top center',
                      width: '286%',
                      height: '286%',
                      pointerEvents: 'none',
                    }}>
                      <SectionPreview sectionName={section.name} />
                    </div>
                  </div>

                  {/* Info */}
                  <div style={{ padding: 'var(--spacing-4)', flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 'var(--spacing-2)' }}>
                      <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600 }}>
                        {section.title}
                      </h3>
                      <Badge variant="secondary" size="sm" style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
                        {category}
                      </Badge>
                    </div>
                    <p style={{
                      margin: 0,
                      color: 'var(--text-secondary)',
                      fontSize: '0.875rem',
                      flex: 1,
                    }}>
                      {section.description}
                    </p>
                    <code style={{
                      background: 'var(--surface-layer)',
                      padding: 'var(--spacing-2) var(--spacing-3)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.75rem',
                      color: 'var(--text-secondary)',
                      marginTop: 'var(--spacing-2)',
                      overflow: 'auto',
                    }}>
                      npx @orion-ds/cli add {section.name}
                    </code>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
