/**
 * Preview module for Card component
 * Manually created for Phase 1 pilot testing
 *
 * Based on: packages/react/src/components/Card/Card.stories.tsx
 */

import React from 'react';
import { Card, Button } from '@orion-ds/react';

export const previews = [
  {
    title: 'All Variants',
    render: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--spacing-4)' }}>
          <Card variant="base">
            <Card.Header>Base Card</Card.Header>
            <Card.Body>This is a base card with default styling.</Card.Body>
            <Card.Footer>
              <Button size="sm">Action</Button>
            </Card.Footer>
          </Card>

          <Card variant="glass">
            <Card.Header>Glass Card</Card.Header>
            <Card.Body>This card has a glassmorphism effect.</Card.Body>
          </Card>

          <Card variant="elevated">
            <Card.Header>Elevated Card</Card.Header>
            <Card.Body>This card has elevation shadow.</Card.Body>
          </Card>
        </div>

        <div style={{ padding: 'var(--spacing-4)', borderRadius: 'var(--radius-container)', background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6))' }}>
          <p style={{ color: 'var(--color-neutral-0)', marginBottom: 'var(--spacing-4)' }}>Inverse Variant (on dark background)</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--spacing-4)' }}>
            <Card variant="inverse">
              <Card.Header>Inverse Card</Card.Header>
              <Card.Body>This card is designed for dark backgrounds.</Card.Body>
            </Card>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Interactive Card',
    render: () => (
      <Card variant="base" interactive style={{ maxWidth: '300px' }}>
        <Card.Header>Clickable Card</Card.Header>
        <Card.Body>
          This card has an interactive hover state. Try hovering over it.
        </Card.Body>
      </Card>
    ),
  },
];

export default previews;
