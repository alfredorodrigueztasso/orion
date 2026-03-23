'use client';

import { Button, Badge } from '@/components/ClientComponents';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

export default function HomepagePricing() {
  const freeFeatures = [
    '72 components',
    '41 sections',
    '10 templates',
    'CLI installer',
    'MCP Server (9 tools)',
    'Token-governed',
    'Light/dark + 4 brands',
    'MIT License',
  ];

  const foundingFeatures = [
    'Everything in Free',
    '10 AI components',
    'AgentThinking, StreamText, ToolCall',
    'ActionConfirmation, DiffViewer, ContextBar',
    '4 AI templates',
    'Figma Kit (complete)',
    'Extended docs + design rationale',
    'Private Slack group',
    'Early access to features',
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
              forever
            </span>
          </div>

          <p
            style={{
              fontSize: 'var(--font-size-sm)',
              color: 'var(--text-secondary)',
              margin: '0 0 var(--spacing-6) 0',
            }}
          >
            Get building. No credit card. Everything free.
          </p>

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
              variant="secondary"
              size="md"
              style={{
                width: '100%',
              }}
            >
              Get Started Free
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

            <Badge variant="brand">200 spots · X remaining</Badge>

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
              200 spots total. Price locks in forever. Then $49/mo.
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
            Get in Touch
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
        Price increases to $49/mo after 200 Founding Members are locked.
      </p>
    </section>
  );
}
