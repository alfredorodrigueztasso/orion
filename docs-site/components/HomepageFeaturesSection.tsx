'use client';

import { Features } from '@/components/ClientComponents';
import { Zap, Package, Layers, Palette, Moon, Bot } from 'lucide-react';

interface HomepageFeaturesSectionProps {
  componentCount?: number;
  sectionCount?: number;
}

export default function HomepageFeaturesSection({
  componentCount = 72,
  sectionCount = 26,
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
          icon: <Bot size={24} />,
          title: 'MCP Server native',
          description:
            '9 tools for Claude Code, Cursor and Cline. Your AI agent discovers, searches and installs Orion components directly — without leaving the conversation.',
        },
        {
          icon: <Zap size={24} />,
          title: 'Chain of Truth',
          description:
            'Token-governed architecture that eliminates UI hallucination. Primitives, semantics, and components stay strictly separated — AI-generated code stays consistent.',
        },
        {
          icon: <Package size={24} />,
          title: `${componentCount} components`,
          description:
            'Production-ready React components with full TypeScript support, built-in accessibility, and AI-first validation.',
        },
        {
          icon: <Layers size={24} />,
          title: `${sectionCount} sections`,
          description:
            'Pre-built page blocks for hero sections, features grids, pricing tables, and more — ready to compose.',
        },
        {
          icon: <Palette size={24} />,
          title: '6 brands',
          description:
            'Multi-brand architecture via data-brand. Switch between orion, red, deepblue, orange, ember and lemon with a single attribute.',
        },
        {
          icon: <Moon size={24} />,
          title: 'Dark mode',
          description:
            'Full light/dark theme support with semantic token mappings. No hardcoded colors, zero visual drift.',
        },
      ]}
    />
  );
}
