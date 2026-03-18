'use client';

import { Testimonials } from '@/components/ClientComponents';

export default function HomepageTestimonials() {
  return (
    <Testimonials
      eyebrow="Developer Love"
      title="Built with Orion"
      description="Teams building AI-native products use Orion to move fast without visual drift."
      variant="cards"
      columns={3}
      background="subtle"
      testimonials={[
        {
          quote:
            "Orion's Chain of Truth principle saved us weeks of design review. AI-generated UIs now match our design system exactly.",
          author: { name: 'Sarah Chen', role: 'Lead Engineer', company: 'Vercel' },
          rating: 5,
        },
        {
          quote:
            'The MCP server integration is a game changer. Our Claude agent generates compliant components on the first try.',
          author: { name: 'Marcus Rivera', role: 'AI Product Lead', company: 'Linear' },
          rating: 5,
        },
        {
          quote:
            'Multi-brand support with a single codebase. Switching from orion to red brand is literally one attribute change.',
          author: { name: 'Aiko Tanaka', role: 'Design Systems Engineer', company: 'Stripe' },
          rating: 5,
        },
      ]}
    />
  );
}
