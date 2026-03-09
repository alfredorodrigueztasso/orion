'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Badge, SearchInput, Chip } from '@/components/ClientComponents';
import SectionPreview from '@/components/SectionPreview';

interface Section {
  name: string;
  title: string;
  description: string;
  category: string;
}

interface SectionCardGridProps {
  sections: Section[];
  categories: string[];
}

export default function SectionCardGrid({ sections, categories }: SectionCardGridProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Prevent auto-scroll when previews load by restoring scroll position
  useEffect(() => {
    const scrollY = window.scrollY;
    const handleScroll = () => {
      // If page scrolled unexpectedly, restore previous position
      const diff = window.scrollY - scrollY;
      if (diff > 50 && scrollY < 100) {
        window.scrollTo(0, scrollY);
      }
    };

    window.addEventListener('scroll', handleScroll, { once: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute filtered sections
  const filtered = useMemo(() => {
    let result = sections;

    if (activeCategory !== 'all') {
      result = result.filter(s => s.category === activeCategory);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(s =>
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q)
      );
    }

    return result;
  }, [sections, activeCategory, query]);

  // Group filtered sections by category (only when viewing all + no search)
  const shouldGroup = activeCategory === 'all' && !query.trim();
  const filteredByCategory = useMemo(() => {
    if (!shouldGroup) return {};
    return categories.reduce((acc, category) => {
      acc[category] = filtered.filter(s => s.category === category);
      return acc;
    }, {} as Record<string, Section[]>);
  }, [filtered, shouldGroup, categories]);

  // Count sections per category for filter pills
  const categoryCounts = useMemo(() => {
    return categories.reduce((acc, cat) => {
      acc[cat] = sections.filter(s => s.category === cat).length;
      return acc;
    }, {} as Record<string, number>);
  }, [sections, categories]);

  return (
    <>
      {/* Hero Section with Search */}
      <div
        style={{
          marginBottom: 'var(--spacing-10)',
          padding: 'var(--spacing-12) 0',
          textAlign: 'center',
        }}
      >
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
          marginBottom: 'var(--spacing-8)',
        }}>
          {sections.length} pre-built sections. Copy, paste, customize. No dependencies.
        </p>

        {/* Search Bar */}
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <SearchInput
            size="xl"
            fullWidth
            placeholder="Search sections by name or description..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onClear={() => setQuery('')}
            disabled={false}
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div style={{
        display: 'flex',
        gap: 'var(--spacing-2)',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 'var(--spacing-8)',
      }}>
        <Chip
          size="lg"
          clickable
          selected={activeCategory === 'all'}
          onClick={() => setActiveCategory('all')}
        >
          All
        </Chip>

        {categories.map((category) => (
          <Chip
            size="lg"
            key={category}
            clickable
            selected={activeCategory === category}
            onClick={() => setActiveCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Chip>
        ))}
      </div>

      {/* Results Count */}
      {(query.trim() || activeCategory !== 'all') && (
        <div style={{
          fontSize: '0.875rem',
          color: 'var(--text-tertiary)',
          marginBottom: 'var(--spacing-6)',
        }}>
          Showing {filtered.length} of {sections.length} sections
        </div>
      )}

      {/* Empty State */}
      {filtered.length === 0 ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'var(--spacing-12)',
          textAlign: 'center',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-control)',
          background: 'var(--surface-subtle)',
        }}>
          <div style={{
            fontSize: '1.125rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: 'var(--spacing-2)',
          }}>
            No sections found
          </div>
          <div style={{
            color: 'var(--text-secondary)',
            fontSize: '0.875rem',
            marginBottom: 'var(--spacing-4)',
          }}>
            {query.trim()
              ? `No sections match "${query}". Try a different search.`
              : `No sections in the "${activeCategory}" category.`}
          </div>
          {(query.trim() || activeCategory !== 'all') && (
            <button
              onClick={() => {
                setQuery('');
                setActiveCategory('all');
              }}
              style={{
                cursor: 'pointer',
                background: 'none',
                border: 'none',
                color: 'var(--text-brand)',
                textDecoration: 'underline',
                fontSize: '0.875rem',
                fontWeight: 500,
                padding: 0,
              }}
            >
              Clear filters
            </button>
          )}
        </div>
      ) : shouldGroup ? (
        // Grouped View (by category)
        <>
          {categories.map((category) => {
            const categorySections = filteredByCategory[category] || [];
            if (categorySections.length === 0) return null;

            return (
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
                  {categorySections.map((section) => (
                    <SectionCard key={section.name} section={section} category={category} router={router} />
                  ))}
                </div>
              </section>
            );
          })}
        </>
      ) : (
        // Flat Grid View (when filtering or searching)
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: 'var(--spacing-6)',
        }}>
          {filtered.map((section) => (
            <SectionCard key={section.name} section={section} category={section.category} router={router} />
          ))}
        </div>
      )}
    </>
  );
}

// Section Card Component
function SectionCard({ section, category, router }: { section: Section; category: string; router: any }) {
  return (
    <div
      style={{ cursor: 'pointer' }}
      onClick={() => router.push(`/sections/${section.name}`)}
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
          <div
            style={{
              transform: 'scale(0.35)',
              transformOrigin: 'top center',
              width: '286%',
              height: '286%',
              pointerEvents: 'none',
            }}
            // @ts-ignore - inert is valid HTML but not in React types yet
            inert=""
          >
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
    </div>
  );
}
