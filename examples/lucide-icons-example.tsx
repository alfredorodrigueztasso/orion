/**
 * Lucide Icons Example with Orion React
 *
 * This example demonstrates how to use Lucide icons with Orion React components.
 */

import React from 'react';
import {
  Button,
  Field,
  Alert,
  Badge,
  Card,
  ThemeProvider,
} from '@orion/react';

// Import Lucide icons
import {
  Search,
  Download,
  Upload,
  Settings,
  Bell,
  User,
  Heart,
  Star,
  ChevronDown,
  Plus,
  Edit,
  Trash2,
  AlertCircle,
  CheckCircle,
  Mail,
} from 'lucide-react';

// Import CSS
import '@orion/core/theme.css';
import '@orion/react/dist/react.css';

/**
 * Example 1: Buttons with Icons
 */
function ButtonsWithIcons() {
  return (
    <Card>
      <Card.Header>Buttons with Icons</Card.Header>
      <Card.Body>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {/* Icon on left */}
          <Button icon={<Search size={20} />}>Search</Button>

          {/* Icon on right */}
          <Button iconRight={<ChevronDown size={20} />}> Dropdown</Button>

          {/* Icon only */}
          <Button
            iconOnly
            icon={<Settings size={20} />}
            variant="ghost"
            aria-label="Settings"
          />

          {/* Different variants */}
          <Button icon={<Download size={20} />} variant="secondary">
            Download
          </Button>

          <Button
            icon={<Trash2 size={20} />}
            variant="danger"
            aria-label="Delete"
            iconOnly
          />
        </div>
      </Card.Body>
    </Card>
  );
}

/**
 * Example 2: Form Fields with Icons
 */
function FormsWithIcons() {
  return (
    <Card>
      <Card.Header>Form Fields with Icons</Card.Header>
      <Card.Body style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Field
          type="email"
          placeholder="Enter your email"
          icon={<Mail size={18} />}
        />

        <Field
          type="text"
          placeholder="Search for something..."
          icon={<Search size={18} />}
        />
      </Card.Body>
    </Card>
  );
}

/**
 * Example 3: Alerts with Icons
 */
function AlertsWithIcons() {
  return (
    <Card>
      <Card.Header>Alerts with Icons</Card.Header>
      <Card.Body style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Alert variant="error" icon={<AlertCircle size={20} />}>
          Something went wrong. Please try again.
        </Alert>

        <Alert variant="success" icon={<CheckCircle size={20} />}>
          Your changes have been saved successfully.
        </Alert>
      </Card.Body>
    </Card>
  );
}

/**
 * Example 4: Icon Collections
 */
function IconCollections() {
  const icons = [
    { name: 'Search', icon: <Search size={24} /> },
    { name: 'Download', icon: <Download size={24} /> },
    { name: 'Upload', icon: <Upload size={24} /> },
    { name: 'Settings', icon: <Settings size={24} /> },
    { name: 'Bell', icon: <Bell size={24} /> },
    { name: 'User', icon: <User size={24} /> },
    { name: 'Heart', icon: <Heart size={24} /> },
    { name: 'Star', icon: <Star size={24} /> },
    { name: 'Plus', icon: <Plus size={24} /> },
    { name: 'Edit', icon: <Edit size={24} /> },
    { name: 'Trash', icon: <Trash2 size={24} /> },
  ];

  return (
    <Card>
      <Card.Header>Icon Gallery</Card.Header>
      <Card.Body>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
            gap: '16px',
          }}
        >
          {icons.map((item) => (
            <div
              key={item.name}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
                padding: '12px',
                borderRadius: 'var(--radius-control)',
                backgroundColor: 'var(--surface-subtle)',
              }}
            >
              <div style={{ fontSize: '24px' }}>{item.icon}</div>
              <small>{item.name}</small>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
}

/**
 * Example 5: Badges with Icons
 */
function BadgesWithIcons() {
  return (
    <Card>
      <Card.Header>Badges with Icons</Card.Header>
      <Card.Body style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <Badge variant="brand">
          <Star size={14} style={{ marginRight: '4px' }} />
          Featured
        </Badge>

        <Badge variant="success">
          <CheckCircle size={14} style={{ marginRight: '4px' }} />
          Verified
        </Badge>

        <Badge variant="error">
          <AlertCircle size={14} style={{ marginRight: '4px' }} />
          Alert
        </Badge>

        <Badge variant="primary">
          <Bell size={14} style={{ marginRight: '4px' }} />
          Important
        </Badge>
      </Card.Body>
    </Card>
  );
}

/**
 * Main App Component
 */
export default function App() {
  return (
    <ThemeProvider>
      <div
        style={{
          padding: '20px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <h1>Lucide Icons with Orion React</h1>
        <p>
          This example demonstrates how to use Lucide icons with various Orion
          React components.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
          <ButtonsWithIcons />
          <FormsWithIcons />
          <AlertsWithIcons />
          <BadgesWithIcons />
          <IconCollections />
        </div>

        <div style={{ marginTop: '40px', padding: '20px', backgroundColor: 'var(--surface-subtle)', borderRadius: 'var(--radius-control)' }}>
          <h3>📚 Learn More</h3>
          <ul>
            <li>
              <strong>Icon Library</strong>: Browse all 5000+ icons at{' '}
              <a href="https://lucide.dev" target="_blank" rel="noopener noreferrer">
                lucide.dev
              </a>
            </li>
            <li>
              <strong>Documentation</strong>: See <code>LUCIDE_ICONS.md</code> in the React
              package
            </li>
            <li>
              <strong>Import</strong>: <code>import {{ IconName }} from 'lucide-react';</code>
            </li>
            <li>
              <strong>Size</strong>: Use <code>size</code> prop in pixels (16, 20, 24, 32)
            </li>
          </ul>
        </div>
      </div>
    </ThemeProvider>
  );
}
