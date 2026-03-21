'use client';

import { Pricing, Button } from '@/components/ClientComponents';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HomepagePricing() {
  return (
    <section style={{ padding: 'var(--spacing-8)', maxWidth: '1200px', margin: '0 auto' }}>
      <Pricing
        title="Start free. Go Pro when you're ready."
        description="All core components are open source and free forever. Pro unlocks agentic patterns, the Figma Kit and premium templates."
        plans={[
          {
            name: 'Free',
            price: '$0',
            period: '/ forever',
            description: 'Everything you need to start building.',
            features: [
              '72 base components',
              '26 sections',
              '10 templates',
              'CLI installer',
              'MCP Server — 9 tools',
              'Chain of Truth architecture',
              'Dark mode + 6 brands',
              'MIT License',
            ],
            action: (
              <Link href="/docs/getting-started" style={{ width: '100%' }}>
                <Button variant="secondary" size="md" style={{ width: '100%' }}>
                  Get Started Free
                </Button>
              </Link>
            ),
          },
          {
            name: 'Founding Member',
            price: '$29',
            period: '/ month',
            description: 'First 200 users. Price locks forever.',
            popular: true,
            features: [
              'Everything in Free',
              '10+ AI / Agentic components',
              'AgentThinking · StreamText · ToolCall',
              'ActionConfirmation · DiffViewer · ContextBar',
              '4 production-ready AI templates',
              'Figma Kit completo',
              'Extended docs — the "why" behind each pattern',
              'Private Slack channel',
              'Early access to new components',
            ],
            action: (
              <Link href="/pricing" style={{ width: '100%' }}>
                <Button variant="primary" size="md" iconRight={<ArrowRight size={16} />} style={{ width: '100%' }}>
                  Become a Founding Member
                </Button>
              </Link>
            ),
          },
          {
            name: 'Team',
            price: '$149',
            period: '/ month',
            description: 'Up to 5 people. With design guidance.',
            features: [
              'Everything in Pro',
              'Up to 5 seats',
              'Brand customization guidance',
              '1 design session / month (30 min)',
              'Priority support',
            ],
            action: (
              <a href="mailto:hello@orionui.dev" style={{ width: '100%' }}>
                <Button variant="ghost" size="md" style={{ width: '100%' }}>
                  Contact Us
                </Button>
              </a>
            ),
          },
        ]}
      />
      <p style={{ textAlign: 'center', fontSize: '0.8125rem', color: 'var(--text-tertiary)', marginTop: 'var(--spacing-6)' }}>
        Price increases to $49/month after the first 200 Founding Members.
      </p>
    </section>
  );
}
