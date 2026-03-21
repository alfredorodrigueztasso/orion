'use client';

import { Button, Badge } from '@/components/ClientComponents';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

export default function HomepagePricing() {
  const freeFeatures = [
    '72 base components',
    '26 sections',
    '10 templates',
    'CLI installer',
    'MCP Server — 9 tools',
    'Chain of Truth architecture',
    'Dark mode + 6 brands',
    'MIT License',
  ];

  const foundingFeatures = [
    'Everything in Free',
    '10+ AI / Agentic components',
    'AgentThinking · StreamText · ToolCall',
    'ActionConfirmation · DiffViewer · ContextBar',
    '4 production-ready AI templates',
    'Figma Kit completo',
    'Extended docs — the "why" behind each pattern',
    'Private Slack channel',
    'Early access to new components',
  ];

  return (
    <section
      style={{
        padding: 'var(--spacing-16) var(--spacing-6)',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-12)' }}>
        <h2
          style={{
            fontSize: 'var(--font-size-3xl)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            margin: '0 0 var(--spacing-3) 0',
          }}
        >
          Start free. Go Pro when you're ready.
        </h2>
        <p
          style={{
            fontSize: 'var(--font-size-lg)',
            color: 'var(--text-secondary)',
            margin: 0,
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          All core components are open source and free forever. Founding Members unlock agentic
          patterns, the Figma Kit, and premium templates.
        </p>
      </div>

      {/* Pricing Grid - 2 columns (Free + Founding Member) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--spacing-4)',
          maxWidth: '720px',
          margin: '0 auto var(--spacing-12)',
        }}
      >
        {/* Free Plan Card */}
        <div
          style={{
            background: 'var(--surface-subtle)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-container)',
            padding: 'var(--spacing-6)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h3
            style={{
              fontSize: 'var(--font-size-2xl)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              margin: '0 0 var(--spacing-4) 0',
            }}
          >
            Free
          </h3>
          <div
            style={{
              fontSize: 'var(--font-size-3xl)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              margin: '0 0 var(--spacing-3) 0',
            }}
          >
            $0
            <span
              style={{
                fontSize: 'var(--font-size-sm)',
                fontWeight: 500,
                color: 'var(--text-secondary)',
                marginLeft: 'var(--spacing-1)',
              }}
            >
              /month
            </span>
          </div>

          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: '0 0 var(--spacing-6) 0',
              flex: 1,
            }}
          >
            {freeFeatures.map((feature, idx) => (
              <li
                key={idx}
                style={{
                  display: 'flex',
                  gap: 'var(--spacing-2)',
                  marginBottom: 'var(--spacing-3)',
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--text-secondary)',
                }}
              >
                <Check size={16} style={{ color: 'var(--interactive-primary)', flexShrink: 0 }} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <Link href="/docs/getting-started" style={{ width: '100%' }}>
            <Button
              variant="ghost"
              size="md"
              style={{
                width: '100%',
              }}
            >
              Start Free
            </Button>
          </Link>
        </div>

        {/* Founding Member Card - Hero Card with Gradient Border */}
        <div
          style={{
            background: 'linear-gradient(135deg, var(--color-brand-400), var(--color-brand-600))',
            padding: '2px',
            borderRadius: 'calc(var(--radius-container) + 2px)',
            boxShadow: '0 0 32px -8px rgba(27,91,255,0.30), 0 8px 24px -4px rgba(27,91,255,0.12)',
          }}
        >
          <div
            style={{
              background: 'var(--surface-layer)',
              borderRadius: 'var(--radius-container)',
              padding: 'var(--spacing-6)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Accent stripe at top */}
            <div
              style={{
                position: 'absolute',
                top: '2px',
                left: '2px',
                right: '2px',
                height: '4px',
                background: 'linear-gradient(135deg, var(--color-brand-400), var(--color-brand-600))',
                borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0',
              }}
            />

            <Badge variant="brand">Founding Offer</Badge>

            <h3
              style={{
                fontSize: 'var(--font-size-2xl)',
                fontWeight: 700,
                color: 'var(--text-primary)',
                margin: 'var(--spacing-3) 0 var(--spacing-4) 0',
              }}
            >
              Founding Member
            </h3>

            <div
              style={{
                fontSize: 'var(--font-size-3xl)',
                fontWeight: 700,
                color: 'var(--text-primary)',
                margin: '0 0 var(--spacing-3) 0',
              }}
            >
              $29
              <span
                style={{
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  marginLeft: 'var(--spacing-1)',
                }}
              >
                /month
              </span>
            </div>

            <p
              style={{
                fontSize: 'var(--font-size-sm)',
                color: 'var(--text-secondary)',
                margin: '0 0 var(--spacing-6) 0',
              }}
            >
              Lock in your price forever. First 200 members only.
            </p>

            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 var(--spacing-6) 0',
                flex: 1,
              }}
            >
              {foundingFeatures.map((feature, idx) => (
                <li
                  key={idx}
                  style={{
                    display: 'flex',
                    gap: 'var(--spacing-2)',
                    marginBottom: 'var(--spacing-3)',
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <Check size={16} style={{ color: 'var(--interactive-primary)', flexShrink: 0 }} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link href="/pricing" style={{ width: '100%' }}>
              <Button
                variant="primary"
                size="lg"
                iconRight={<ArrowRight size={20} />}
                style={{
                  width: '100%',
                }}
              >
                Join Founding — $29/mo
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Team Plan - Text Only */}
      <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-6)' }}>
        <p
          style={{
            fontSize: 'var(--font-size-base)',
            color: 'var(--text-secondary)',
            margin: 0,
          }}
        >
          Need team licenses?{' '}
          <a
            href="mailto:hello@orionui.dev"
            style={{
              color: 'var(--interactive-primary)',
              textDecoration: 'none',
            }}
          >
            Contact us
          </a>
        </p>
      </div>

      {/* Footer note */}
      <p
        style={{
          textAlign: 'center',
          fontSize: 'var(--font-size-xs)',
          color: 'var(--text-tertiary)',
        }}
      >
        Price increases to $49/month after the first 200 Founding Members.
      </p>
    </section>
  );
}
