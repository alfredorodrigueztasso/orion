'use client';

import { Stats } from '@/components/ClientComponents';

export default function HomepageSocialProof() {
  return (
    <Stats
      eyebrow="Community & Trust"
      title="Used by builders who ship"
      description="MIT open source. 5 npm packages. Trusted by developers shipping AI-first products."
      columns={3}
      variant="cards"
      background="subtle"
      centered={true}
      stats={[
        {
          value: 'MIT Licensed',
          label: 'Open Source',
          description: 'Free forever. Modify, distribute, use in production.',
        },
        {
          value: '5',
          label: 'npm packages',
          description: '@orion-ds/react (main), cli, mcp, create, validate',
        },
        {
          value: 'Used in Production',
          label: 'Trusted by Builders',
          description: 'Shipping products powered by Orion. Design & Code.',
        },
      ]}
    />
  );
}
