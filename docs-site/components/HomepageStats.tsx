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
      eyebrow="Built to scale"
      title="Shipping at scale, from day one"
      description="72 components, 41 sections, 10 templates. 9 MCP tools. Built in. Ready to go."
      columns={4}
      variant="cards"
      background="subtle"
      highlightValue={true}
      centered={true}
      stats={[
        {
          value: `${counts.components}`,
          label: 'Components',
          description: 'Production-ready React',
        },
        {
          value: `${counts.sections}`,
          label: 'Sections',
          description: 'Pre-built page blocks',
        },
        {
          value: `${counts.templates}`,
          label: 'Templates',
          description: 'Full-page layouts',
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
