/**
 * Preview module for Field component
 * Updated to use separate Textarea and Select components
 */

import React from 'react';
import { Field, Textarea, Select } from '@orion-ds/react';

export const previews = [
  {
    title: 'Input Types',
    render: () => (
      <div style={{ display: 'grid', gap: 'var(--spacing-4)', maxWidth: '400px' }}>
        <Field label="Email" type="email" placeholder="you@example.com" />
        <Field label="Password" type="password" placeholder="Enter password" />
        <Textarea
          label="Message"
          rows={4}
          placeholder="Your message..."
        />
      </div>
    ),
  },
  {
    title: 'Select and States',
    render: () => (
      <div style={{ display: 'grid', gap: 'var(--spacing-4)', maxWidth: '400px' }}>
        <Select label="Country">
          <option value="">Select country</option>
          <option value="us">United States</option>
          <option value="uk">United Kingdom</option>
          <option value="ca">Canada</option>
        </Select>
        <Field label="Disabled Field" value="Read-only value" disabled />
        <Field
          label="With Error"
          type="email"
          error="Please enter a valid email address"
          placeholder="email@example.com"
        />
      </div>
    ),
  },
  {
    title: 'On Dark Background',
    render: () => (
      <div
        style={{
          padding: 'var(--spacing-6)',
          borderRadius: 'var(--radius-container)',
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.7))',
        }}
      >
        <p style={{ color: 'var(--color-neutral-0)', marginBottom: 'var(--spacing-4)' }}>
          Fields automatically adapt for dark backgrounds
        </p>
        <div style={{ display: 'grid', gap: 'var(--spacing-4)', maxWidth: '400px' }} data-on-dark="true">
          <Field label="Email" type="email" placeholder="you@example.com" />
          <Field label="Password" type="password" placeholder="Enter password" />
          <Field
            label="Phone (Optional)"
            type="tel"
            placeholder="+1 (555) 123-4567"
            optional
          />
        </div>
      </div>
    ),
  },
];

export default previews;
