'use client';

import { Hero, Badge, Button } from '@/components/ClientComponents';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface HomepageHeroProps {
  componentCount: number;
  sectionCount: number;
  templateCount: number;
}

export default function HomepageHero({
  componentCount,
  sectionCount,
  templateCount,
}: HomepageHeroProps) {
  return (
    <Hero
      layout="contained"
      size="lg"
      align="center"
      badge={
        <Badge variant="secondary" size="sm">
          ✨ Chain of Truth
        </Badge>
      }
      title={
        <>
          The{' '}
          <Hero.Highlight>
            AI-first
          </Hero.Highlight>
          <br />
          Design System
        </>
      }
      description="Token-governed components that eliminate UI hallucination. Build consistent interfaces at scale — without visual drift."
      primaryAction={
        <Link href="/docs/getting-started">
          <Button
            size="lg"
            variant="primary"
            iconRight={<ArrowRight size={20} />}
          >
            Get Started
          </Button>
        </Link>
      }
      secondaryAction={
        <Link
          href="https://github.com/orion-ds/orion"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button size="lg" variant="ghost">
            GitHub
          </Button>
        </Link>
      }
      trustIndicators={
        <div
          style={{
            display: 'flex',
            gap: 'var(--spacing-3)',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Link href="/components">
            <Badge variant="secondary" size="sm">↗ {componentCount} components</Badge>
          </Link>
          <Link href="/sections">
            <Badge variant="secondary" size="sm">↗ {sectionCount} sections</Badge>
          </Link>
          <Link href="/templates">
            <Badge variant="secondary" size="sm">↗ {templateCount} templates</Badge>
          </Link>
        </div>
      }
    />
  );
}
