'use client';

import { Features } from '@/components/ClientComponents';
import { Zap, Package, Layers, Palette, Moon, Bot } from 'lucide-react';

interface HomepageFeaturesSectionProps {
  componentCount?: number;
  sectionCount?: number;
}

export default function HomepageFeaturesSection({
  componentCount = 39,
  sectionCount = 41,
}: HomepageFeaturesSectionProps) {
  return (
    <Features
      eyebrow="Why Orion"
      title="Built for the AI era"
      description="Every design decision in Orion is governed by tokens, validated by automation, and consumable by AI agents."
      columns={3}
      background="base"
      interactive={true}
      centered={true}
      items={[
        {
          icon: <Zap size={24} />,
          title: 'Chain of Truth',
          description:
            'Token-governed architecture eliminates UI hallucination. Primitives, semantics, and components stay strictly separated.',
        },
        {
          icon: <Package size={24} />,
          title: `${componentCount} Components`,
          description:
            'Production-ready React components with full TypeScript support, built-in accessibility, and Storybook coverage.',
        },
        {
          icon: <Layers size={24} />,
          title: `${sectionCount} Sections`,
          description:
            'Pre-built page blocks for hero sections, features grids, pricing tables, and more — ready to compose.',
        },
        {
          icon: <Palette size={24} />,
          title: '4 Brands',
          description:
            'Multi-brand architecture via data-brand. Switch between orion, red, deepblue, and orange with a single attribute.',
        },
        {
          icon: <Moon size={24} />,
          title: 'Dark Mode',
          description:
            'Full light/dark theme support with semantic token mappings. No hardcoded colors, zero visual drift.',
        },
        {
          icon: <Bot size={24} />,
          title: 'AI-Native',
          description:
            'MCP server, CLI installer, HTTP registry API, and validation tools purpose-built for AI-assisted development.',
        },
      ]}
    />
  );
}
