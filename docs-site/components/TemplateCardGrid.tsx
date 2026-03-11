'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card, Badge, SearchInput, Chip } from '@/components/ClientComponents';

interface Template {
  name: string;
  title: string;
  description: string;
  category: string;
}

interface TemplateCardGridProps {
  templates: Template[];
  categories: string[];
}

export default function TemplateCardGrid({ templates, categories }: TemplateCardGridProps) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Compute filtered templates
  const filtered = useMemo(() => {
    let result = templates;

    if (activeCategory !== 'all') {
      result = result.filter(t => t.category === activeCategory);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(t =>
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.name.toLowerCase().includes(q)
      );
    }

    return result;
  }, [templates, activeCategory, query]);

  // Group filtered templates by category (only when viewing all + no search)
  const shouldGroup = activeCategory === 'all' && !query.trim();
  const filteredByCategory = useMemo(() => {
    if (!shouldGroup) return {};
    return categories.reduce((acc, category) => {
      acc[category] = filtered.filter(t => t.category === category);
      return acc;
    }, {} as Record<string, Template[]>);
  }, [filtered, shouldGroup, categories]);

  // Count templates per category for filter pills
  const categoryCounts = useMemo(() => {
    return categories.reduce((acc, cat) => {
      acc[cat] = templates.filter(t => t.category === cat).length;
      return acc;
    }, {} as Record<string, number>);
  }, [templates, categories]);

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
          fontSize: 'clamp(var(--font-size-2xl), 4vw, var(--font-size-3xl))',
          fontWeight: 800,
          marginBottom: 'var(--spacing-3)',
        }}>
          Templates
        </h1>
        <p style={{
          fontSize: 'var(--font-size-lg)',
          color: 'var(--text-secondary)',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: 1.6,
          marginBottom: 'var(--spacing-8)',
        }}>
          {templates.length} complete page templates ready to use
        </p>

        {/* Search Bar */}
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <SearchInput
            size="xl"
            fullWidth
            placeholder="Search templates by name or description..."
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
          fontSize: 'var(--font-size-sm)',
          color: 'var(--text-tertiary)',
          marginBottom: 'var(--spacing-6)',
        }}>
          Showing {filtered.length} of {templates.length} templates
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
            fontSize: 'var(--font-size-lg)',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: 'var(--spacing-2)',
          }}>
            No templates found
          </div>
          <div style={{
            color: 'var(--text-secondary)',
            fontSize: 'var(--font-size-sm)',
            marginBottom: 'var(--spacing-4)',
          }}>
            {query.trim()
              ? `No templates match "${query}". Try a different search.`
              : `No templates in the "${activeCategory}" category.`}
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
                fontSize: 'var(--font-size-sm)',
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
            const categoryTemplates = filteredByCategory[category] || [];
            if (categoryTemplates.length === 0) return null;

            return (
              <section key={category} style={{ marginBottom: 'var(--spacing-16)' }}>
                <h2 style={{
                  textTransform: 'capitalize',
                  marginBottom: 'var(--spacing-6)',
                  fontSize: 'var(--font-size-2xl)',
                  fontWeight: 600,
                }}>
                  {category}
                </h2>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                  gap: 'var(--spacing-4)',
                }}>
                  {categoryTemplates.map((template) => (
                    <TemplateCard key={template.name} template={template} />
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
          gap: 'var(--spacing-4)',
        }}>
          {filtered.map((template) => (
            <TemplateCard key={template.name} template={template} />
          ))}
        </div>
      )}
    </>
  );
}

// Template Card Component
function TemplateCard({ template }: { template: Template }) {
  return (
    <Link
      href={`/templates/${template.name}`}
      style={{ textDecoration: 'none' }}
    >
      <Card
        variant="base"
        interactive
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header with Title and Badge */}
        <Card.Header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 'var(--spacing-2)',
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: 'var(--font-size-md)',
              fontWeight: 600,
              color: 'var(--text-primary)',
              flex: 1,
            }}
          >
            {template.title}
          </h3>
          <Badge variant="secondary" size="sm" style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
            {template.category}
          </Badge>
        </Card.Header>

        {/* Description */}
        <Card.Body style={{ flex: 1 }}>
          <p
            style={{
              margin: 0,
              color: 'var(--text-secondary)',
              fontSize: 'var(--font-size-sm)',
              lineHeight: 1.5,
            }}
          >
            {template.description}
          </p>
        </Card.Body>

        {/* Footer: Template Name */}
        <Card.Footer>
          <code
            style={{
              background: 'var(--surface-layer)',
              padding: 'var(--spacing-1) var(--spacing-2)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-tertiary)',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--font-size-xs)',
            }}
          >
            {template.name}
          </code>
        </Card.Footer>
      </Card>
    </Link>
  );
}
