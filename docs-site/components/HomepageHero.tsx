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
          ✦ MCP Server included — Claude Code ready
        </Badge>
      }
      title={
        <>
          The design system
          <br />
          <Hero.Highlight>
            your AI agent
          </Hero.Highlight>
          <br />
          already knows.
        </>
      }
      description="Install components with a single instruction to Claude Code. 72 components, 26 sections, 10 templates — governed by Chain of Truth."
      primaryAction={
        <Link href="/docs/getting-started">
          <Button
            size="lg"
            variant="primary"
            iconRight={<ArrowRight size={20} />}
          >
            Get Started Free
          </Button>
        </Link>
      }
      secondaryAction={
        <Link
          href="https://github.com/alfredorodrigueztasso/orion"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button size="lg" variant="ghost">
            View on GitHub
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
          <Badge variant="secondary" size="sm">↗ 72 components</Badge>
          <Badge variant="secondary" size="sm">↗ MCP Server</Badge>
          <Badge variant="secondary" size="sm">↗ MIT License</Badge>
        </div>
      }
    />
  );
}
