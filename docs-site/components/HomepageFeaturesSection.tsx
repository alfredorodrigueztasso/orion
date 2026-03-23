'use client';

import { Features } from '@/components/ClientComponents';
import { Zap, Package, Layers, Palette, Moon, Bot } from 'lucide-react';

interface HomepageFeaturesSectionProps {
  componentCount?: number;
  sectionCount?: number;
}

export default function HomepageFeaturesSection({
  componentCount = 72,
  sectionCount = 41,
}: HomepageFeaturesSectionProps) {
  return (
    <Features
      eyebrow="Built for your workflow"
      title="Components that ship with your AI tools"
      description="Start with components. Discover more via MCP. Integrate without friction. Every component is token-governed and AI-discoverable."
      columns={3}
      background="base"
      interactive={true}
      centered={true}
      items={[
        {
          icon: <Bot size={24} />,
          title: 'MCP Server',
          description:
            '9 tools. Claude Code. Cursor. Cline. Your AI agent discovers components, searches patterns, and installs directly into your project.',
        },
        {
          icon: <Zap size={24} />,
          title: 'Chain of Truth',
          description:
            'Token-governed architecture. No hardcoded values. Components reference semantic tokens. Your AI agent generates predictable styles.',
        },
        {
          icon: <Package size={24} />,
          title: `${componentCount} Components`,
          description:
            'Production-ready React components. Full TypeScript. Accessibility built in. Deploy with confidence.',
        },
        {
          icon: <Palette size={24} />,
          title: 'Multi-Brand',
          description:
            'Multi-brand support. Orion, Red, Deep Blue, Orange. Switch brands with one attribute. Zero refactoring.',
        },
        {
          icon: <Moon size={24} />,
          title: 'Light & Dark',
          description:
            'Full light/dark support. Semantic tokens handle the switch. No hardcoded values. Consistency across themes.',
        },
        {
          icon: <Layers size={24} />,
          title: `${sectionCount} Sections`,
          description:
            'Pre-built page blocks. Heroes, features, pricing, testimonials, footers. Compose pages in hours, not days.',
        },
      ]}
    />
  );
}
