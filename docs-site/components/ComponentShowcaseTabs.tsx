'use client';

import { Tabs } from '@orion-ds/react';
import {
  Button,
  Badge,
  Card,
  Alert,
  Field,
  Select,
  Switch,
  Toggle,
  ProgressBar,
  Spinner,
  Avatar,
  Chip,
  Breadcrumb,
  Pagination,
  SearchInput,
} from '@orion-ds/react';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

const ButtonShowcase = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 'var(--spacing-4)' }}>
    {(['primary', 'secondary', 'ghost', 'danger'] as const).map((variant) => (
      <div key={variant} style={{ textAlign: 'center' }}>
        <Button size="md" variant={variant}>{variant}</Button>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: 'var(--spacing-2)' }}>
          {variant}
        </p>
      </div>
    ))}
    {['sm', 'md', 'lg'].map((size) => (
      <div key={size} style={{ textAlign: 'center' }}>
        <Button size={size as any} variant="primary">
          {size}
        </Button>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: 'var(--spacing-2)' }}>
          size: {size}
        </p>
      </div>
    ))}
  </div>
);

const CardShowcase = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--spacing-4)' }}>
    {(['base', 'outlined', 'elevated'] as const).map((variant) => (
      <Card key={variant} variant={variant} interactive>
        <Card.Header>
          <span style={{ fontWeight: 600 }}>Card {variant}</span>
        </Card.Header>
        <Card.Body>
          <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.875rem' }}>
            This is a {variant} card variant. Hover to see interaction feedback.
          </p>
        </Card.Body>
      </Card>
    ))}
  </div>
);

const BadgeShowcase = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-3)', alignItems: 'center' }}>
    {(['primary', 'secondary', 'success', 'warning', 'error', 'info'] as const).map((variant) => (
      <Badge key={variant} variant={variant} size="md">
        {variant}
      </Badge>
    ))}
    {['sm', 'md', 'lg'].map((size) => (
      <Badge key={size} variant="primary" size={size as any}>
        size: {size}
      </Badge>
    ))}
    <Badge variant="secondary" dot>
      With dot
    </Badge>
  </div>
);

const AlertShowcase = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
    <Alert variant="info" icon={<Info size={20} />}>
      <strong>Info</strong> — This is an informational alert.
    </Alert>
    <Alert variant="success" icon={<CheckCircle size={20} />}>
      <strong>Success</strong> — Operation completed successfully.
    </Alert>
    <Alert variant="warning" icon={<AlertCircle size={20} />}>
      <strong>Warning</strong> — Please review this action.
    </Alert>
    <Alert variant="error" icon={<AlertCircle size={20} />}>
      <strong>Error</strong> — Something went wrong.
    </Alert>
  </div>
);

const FormShowcase = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-6)' }}>
    <Field label="Input Field" placeholder="Enter text..." />
    <div style={{ display: 'flex', gap: 'var(--spacing-3)', alignItems: 'flex-end' }}>
      <div style={{ flex: 1 }}>
        <SearchInput placeholder="Search..." size="md" />
      </div>
    </div>
    <div style={{ display: 'flex', gap: 'var(--spacing-4)', alignItems: 'center' }}>
      <span style={{ fontSize: '0.875rem' }}>Toggle Switch</span>
      <Toggle defaultPressed={true} />
    </div>
  </div>
);

const FeedbackShowcase = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-4)', alignItems: 'start' }}>
    <div>
      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-2)' }}>Spinner</div>
      <Spinner size="md" />
    </div>
    <div>
      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-2)' }}>Progress Bar</div>
      <ProgressBar value={65} />
    </div>
  </div>
);

const NavigationShowcase = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
    <div>
      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-3)' }}>Breadcrumb</div>
      <Breadcrumb items={[
        { label: 'Home', href: '#' },
        { label: 'Components', href: '#' },
        { label: 'Button', href: '#' },
      ]} />
    </div>
    <div>
      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-3)' }}>Pagination</div>
      <Pagination current={1} total={5} />
    </div>
  </div>
);

const AvatarShowcase = () => (
  <div style={{ display: 'flex', gap: 'var(--spacing-4)', alignItems: 'center', flexWrap: 'wrap' }}>
    {['sm', 'md', 'lg'].map((size) => (
      <div key={size} style={{ textAlign: 'center' }}>
        <Avatar size={size as any} name="Alex Chen" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" />
        <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: 'var(--spacing-2)' }}>
          {size}
        </p>
      </div>
    ))}
  </div>
);

const AIAgentsShowcase = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--spacing-4)',
      padding: 'var(--spacing-8)',
      background: 'var(--surface-layer)',
      borderRadius: 'var(--radius-control)',
      border: '1px solid var(--border-subtle)',
    }}>
      <Spinner size="lg" />
      <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Agent thinking...</p>
    </div>

    <div style={{ padding: 'var(--spacing-6)' }}>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-4)' }}>
        Processing steps
      </p>
      <ProgressBar value={45} />
    </div>

    <div style={{
      padding: 'var(--spacing-6)',
      background: 'var(--surface-layer)',
      borderRadius: 'var(--radius-control)',
      border: '2px solid var(--interactive-primary)',
      textAlign: 'center',
    }}>
      <p style={{ color: 'var(--text-primary)', margin: 0, fontWeight: 600 }}>
        Full AI component library coming in Pro →
      </p>
      <p style={{ color: 'var(--text-secondary)', margin: 'var(--spacing-2) 0 0', fontSize: '0.875rem' }}>
        AgentThinking, StreamText, ToolCall, ActionConfirmation, and more
      </p>
    </div>
  </div>
);

export default function ComponentShowcaseTabs() {
  return (
    <section style={{
      padding: 'var(--spacing-12) var(--spacing-8)',
      background: 'var(--surface-subtle)',
      borderRadius: 'var(--radius-control)',
      border: '1px solid var(--border-subtle)',
      marginBottom: 'var(--spacing-16)',
    }}>
      <div style={{ marginBottom: 'var(--spacing-8)' }}>
        <h2 style={{ marginBottom: 'var(--spacing-2)' }}>Interactive Components</h2>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
          Every component. Every variant. Every state. Built with design tokens. Copy the code. Integrate with MCP.
        </p>
      </div>

      <Tabs
        tabs={[
          { id: 'buttons', label: 'Buttons', content: <ButtonShowcase /> },
          { id: 'cards', label: 'Cards', content: <CardShowcase /> },
          { id: 'badges', label: 'Badges', content: <BadgeShowcase /> },
          { id: 'alerts', label: 'Alerts', content: <AlertShowcase /> },
          { id: 'forms', label: 'Forms', content: <FormShowcase /> },
          { id: 'feedback', label: 'Feedback', content: <FeedbackShowcase /> },
          { id: 'navigation', label: 'Navigation', content: <NavigationShowcase /> },
          { id: 'avatars', label: 'Avatars', content: <AvatarShowcase /> },
          { id: 'ai-agents', label: 'AI Agents', content: <AIAgentsShowcase /> },
        ]}
        defaultTab="buttons"
      />
    </section>
  );
}
