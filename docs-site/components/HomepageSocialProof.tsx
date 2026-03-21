'use client';

import { Stats } from '@/components/ClientComponents';

export default function HomepageSocialProof() {
  return (
    <Stats
      eyebrow="Community"
      title="Built with Orion"
      description="Open source since day one. Used in production by builders who ship fast."
      columns={3}
      variant="cards"
      background="subtle"
      centered={true}
      stats={[
        {
          value: 'Open Source',
          label: 'MIT License',
          description: 'Free to use, modify and distribute forever',
        },
        {
          value: '5',
          label: 'npm packages',
          description: '@orion-ds/react · cli · mcp · create · validate',
        },
        {
          value: 'Design Intelligence',
          label: 'Built with Orion',
          description: 'AI-powered UX reviewer — 100% Orion components',
        },
      ]}
    />
  );
}
