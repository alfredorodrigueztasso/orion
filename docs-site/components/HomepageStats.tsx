'use client';

import { Stats } from '@/components/ClientComponents';

interface HomepageStatsProps {
  counts: {
    components: number;
    sections: number;
    templates: number;
  };
}

export default function HomepageStats({ counts }: HomepageStatsProps) {
  return (
    <Stats
      eyebrow="The numbers"
      title="Everything you need, nothing you don't"
      description="Orion ships with a complete set of production-ready building blocks."
      columns={4}
      variant="cards"
      background="subtle"
      highlightValue={true}
      centered={true}
      stats={[
        {
          value: `${counts.components}`,
          label: 'Components',
          description: 'Ready-to-use React building blocks',
        },
        {
          value: `${counts.sections}`,
          label: 'Sections',
          description: 'Pre-composed page blocks',
        },
        {
          value: `${counts.templates}`,
          label: 'Templates',
          description: 'Full-page starter layouts',
        },
        {
          value: '9',
          label: 'MCP Tools',
          description: 'AI agent integrations',
        },
      ]}
    />
  );
}
