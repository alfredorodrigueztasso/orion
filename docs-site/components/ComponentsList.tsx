'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card, Badge, SearchInput, Chip } from '@/components/ClientComponents';
import styles from './ComponentsList.module.css';

interface Component {
  name: string;
  title: string;
  description: string;
  category: string;
  modeAware?: boolean;
  props?: Array<unknown>;
  accessibility?: object;
}

interface ComponentsListProps {
  components: Component[];
  categories: string[];
  title: string;
  subtitle: string;
}

export default function ComponentsList({ components, categories, title, subtitle }: ComponentsListProps) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Compute filtered components
  const filtered = useMemo(() => {
    let result = components;

    if (activeCategory !== 'all') {
      result = result.filter(c => c.category === activeCategory);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q)
      );
    }

    return result;
  }, [components, activeCategory, query]);

  // Group filtered components by category (only when viewing all + no search)
  const shouldGroup = activeCategory === 'all' && !query.trim();
  const filteredByCategory = useMemo(() => {
    if (!shouldGroup) return {};
    return categories.reduce((acc, category) => {
      acc[category] = filtered.filter(c => c.category === category);
      return acc;
    }, {} as Record<string, Component[]>);
  }, [filtered, shouldGroup, categories]);

  // Count components per category for filter pills
  const categoryCounts = useMemo(() => {
    return categories.reduce((acc, cat) => {
      acc[cat] = components.filter(c => c.category === cat).length;
      return acc;
    }, {} as Record<string, number>);
  }, [components, categories]);

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
          {title}
        </h1>
        <p style={{
          fontSize: '1.125rem',
          color: 'var(--text-secondary)',
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: 1.6,
          marginBottom: 'var(--spacing-8)',
        }}>
          {subtitle}
        </p>

        {/* Search Bar */}
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <SearchInput
            size="xl"
            fullWidth
            placeholder="Search components by name or description..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onClear={() => setQuery('')}
            disabled={false}
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className={styles.filterRow}>
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
        <div className={styles.resultsCount}>
          Showing {filtered.length} of {components.length} components
        </div>
      )}

      {/* Empty State */}
      {filtered.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyTitle}>No components found</div>
          <div className={styles.emptyDescription}>
            {query.trim()
              ? `No components match "${query}". Try a different search.`
              : `No components in the "${activeCategory}" category.`}
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
        // Grouped View
        <>
          {categories.map((category) => {
            const categoryComponents = filteredByCategory[category] || [];
            if (categoryComponents.length === 0) return null;

            return (
              <section key={category} className={styles.categorySection}>
                <h2 className={styles.categoryTitle}>{category}</h2>
                <div className={styles.componentGrid}>
                  {categoryComponents.map((component) => (
                    <ComponentCard key={component.name} component={component} />
                  ))}
                </div>
              </section>
            );
          })}
        </>
      ) : (
        // Flat Grid View (when filtering or searching)
        <div className={styles.componentGrid}>
          {filtered.map((component) => (
            <ComponentCard key={component.name} component={component} />
          ))}
        </div>
      )}
    </>
  );
}

// Extracted component card for reusability
function ComponentCard({ component }: { component: Component }) {
  return (
    <Link
      href={`/components/${component.name}`}
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
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              flex: 1,
            }}
          >
            {component.title}
          </h3>
          {component.modeAware && (
            <Badge variant="info" size="sm" style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
              Mode Aware
            </Badge>
          )}
        </Card.Header>

        {/* Description */}
        <Card.Body style={{ flex: 1 }}>
          <p className={styles.description}
            style={{
              margin: 0,
              color: 'var(--text-secondary)',
              fontSize: '0.875rem',
              lineHeight: 1.5,
            }}
          >
            {component.description}
          </p>
        </Card.Body>

        {/* Footer: Component Name + Props + Accessibility */}
        <Card.Footer
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 'var(--spacing-2)',
            fontSize: '0.75rem',
          }}
        >
          <code
            style={{
              background: 'var(--surface-layer)',
              padding: 'var(--spacing-1) var(--spacing-2)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-tertiary)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {component.name}
          </code>

          <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
            {component.props && component.props.length > 0 && (
              <Badge variant="secondary" size="sm">
                {component.props.length} props
              </Badge>
            )}
            {component.accessibility && (
              <Badge variant="success" size="sm">
                A11y
              </Badge>
            )}
          </div>
        </Card.Footer>
      </Card>
    </Link>
  );
}
