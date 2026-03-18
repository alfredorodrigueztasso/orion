'use client';

import { Badge } from '@/components/ClientComponents';

interface BadgeItem {
  label: string;
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'brand' | 'inverse';
}

interface DocsPageHeroProps {
  title: string;
  subtitle: string;
  badges?: BadgeItem[];
}

export default function DocsPageHero({ title, subtitle, badges }: DocsPageHeroProps) {
  return (
    <div style={{ marginBottom: 'var(--spacing-12)' }}>
      <h1 style={{
        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
        fontWeight: 700,
        marginBottom: 'var(--spacing-4)',
        color: 'var(--text-primary)',
        lineHeight: 1.2,
      }}>
        {title}
      </h1>

      <p style={{
        fontSize: 'clamp(1rem, 2vw, 1.25rem)',
        color: 'var(--text-secondary)',
        marginBottom: 'var(--spacing-6)',
        lineHeight: 1.6,
        maxWidth: '800px',
      }}>
        {subtitle}
      </p>

      {badges && badges.length > 0 && (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--spacing-2)',
        }}>
          {badges.map((badge, idx) => (
            <Badge
              key={idx}
              variant={badge.variant || 'secondary'}
              size="md"
            >
              {badge.label}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
