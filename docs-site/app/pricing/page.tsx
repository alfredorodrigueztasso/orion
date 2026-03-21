import type { Metadata } from 'next';
import HomepagePricing from '@/components/HomepagePricing';
import { FAQ } from '@/components/ClientComponents';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Start free with 72 open source components. Upgrade to Founding Member for AI-native patterns, Figma Kit and Pro templates.',
};

export default function PricingPage() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'var(--spacing-8)' }}>

      {/* Hero de pricing */}
      <div style={{ textAlign: 'center', padding: 'var(--spacing-16) 0 var(--spacing-8)' }}>
        <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 700, marginBottom: 'var(--spacing-4)' }}>
          Simple, transparent pricing
        </h1>
        <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--text-secondary)', maxWidth: '560px', margin: '0 auto' }}>
          Start building for free. Upgrade when you need AI-native components, the Figma Kit, and production templates.
        </p>
      </div>

      {/* Pricing cards — reutiliza HomepagePricing */}
      <HomepagePricing />

      {/* FAQ */}
      <div style={{ marginTop: 'var(--spacing-16)' }}>
        <FAQ
          title="Frequently asked questions"
          items={[
            {
              id: 'free-forever',
              question: 'Can I use Orion for free forever?',
              answer: 'Yes. All 72 base components, 26 sections, 10 templates, the CLI and the MCP Server are open source under MIT License. Free forever, no credit card required.',
            },
            {
              id: 'founding-member',
              question: 'What happens when the 200 Founding Member spots are gone?',
              answer: 'The price increases to $49/month for new subscribers. Founding Members keep $29/month forever as long as their subscription is active.',
            },
            {
              id: 'mcp-free',
              question: 'Is the MCP Server included in the free plan?',
              answer: 'Yes. The MCP Server with all 9 tools is completely free and open source. Claude Code, Cursor and Cline can install Orion components in any plan.',
            },
            {
              id: 'pro-components',
              question: "What are the AI/Agentic components in Pro?",
              answer: 'Pro includes components specifically designed for AI-powered interfaces: AgentThinking (animated processing states), StreamText (live text streaming), ToolCall (tool invocation visualization), ActionConfirmation (safe action prompts), DiffViewer (change previews), ContextBar (context usage), and more.',
            },
            {
              id: 'team',
              question: 'How does the Team plan work?',
              answer: 'The Team plan gives up to 5 people access to all Pro features, plus a monthly 30-minute design session with the Orion designer to help customize the system for your brand.',
            },
            {
              id: 'refund',
              question: 'Is there a refund policy?',
              answer: 'Yes. If you are not satisfied within the first 14 days, we will give you a full refund — no questions asked.',
            },
          ]}
        />
      </div>

    </div>
  );
}
