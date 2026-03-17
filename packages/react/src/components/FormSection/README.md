# FormSection Section

> Structured form layout with title, description, and grouped fields for settings pages.

## Quick Start

```tsx
import { FormSection, Field, Button } from "@orion/react";

<FormSection
  title="Profile Information"
  description="Update your personal details and contact information."
  actions={<Button variant="primary">Save Changes</Button>}
>
  <Field label="Full Name" type="text" placeholder="Enter your name" />
  <Field label="Email" type="email" placeholder="you@example.com" />
  <Field label="Bio" type="textarea" placeholder="Tell us about yourself" />
</FormSection>;
```

---

## Features

- **3 Variants** — Default, Card, and Inline layouts
- **Collapsible** — Expand/collapse sections
- **Section Icons** — Optional icons in headers
- **Field Grouping** — Organize related fields
- **Action Buttons** — Built-in action area
- **Disabled State** — Disable all fields at once
- **Dividers** — Optional section dividers
- **Brand-Aware** — Adapts to all Orion brands

---

## Props Reference

```typescript
interface FormSectionProps {
  // Header
  title: string; // REQUIRED - Section title
  description?: string; // Description below title
  icon?: ReactNode; // Header icon

  // Content
  children: ReactNode; // REQUIRED - Form fields

  // Actions
  actions?: ReactNode; // Action buttons

  // Behavior
  collapsible?: boolean; // Make collapsible - default: false
  defaultCollapsed?: boolean; // Start collapsed - default: false

  // Display
  variant?: "default" | "card" | "inline"; // Visual style - default: 'default'
  divider?: boolean; // Show bottom divider - default: false
  disabled?: boolean; // Disable all fields - default: false
}

// Sub-component for grouping fields
interface FormSectionGroupProps {
  label?: string; // Group label
  helpText?: string; // Help text
  children: ReactNode; // Fields
  columns?: 1 | 2 | 3; // Column layout - default: 1
}

// Sub-component for action buttons
interface FormSectionActionsProps {
  children: ReactNode; // Buttons
  align?: "start" | "center" | "end" | "between"; // default: 'end'
}
```

---

## Visual Variants

### `variant="default"` (Default)

Simple layout with subtle border.

```tsx
<FormSection
  variant="default"
  title="Account Settings"
  description="Manage your account preferences."
>
  <Field label="Username" type="text" />
  <Field label="Language" type="select" options={languages} />
</FormSection>
```

### `variant="card"`

Wrapped in a card container with shadow.

```tsx
<FormSection
  variant="card"
  title="Notification Preferences"
  description="Choose how you want to be notified."
>
  <Field label="Email Notifications" type="checkbox" />
  <Field label="Push Notifications" type="checkbox" />
</FormSection>
```

### `variant="inline"`

Side-by-side title and fields layout (settings page style).

```tsx
<FormSection
  variant="inline"
  title="Display Name"
  description="This is how your name appears to others."
>
  <Field type="text" placeholder="Your display name" />
</FormSection>
```

---

## Collapsible Sections

Make sections expandable/collapsible.

```tsx
<FormSection
  collapsible
  title="Advanced Settings"
  description="Additional configuration options."
>
  <Field label="Debug Mode" type="checkbox" />
  <Field label="Log Level" type="select" options={logLevels} />
</FormSection>
```

### Start Collapsed

```tsx
<FormSection collapsible defaultCollapsed title="Developer Options">
  <Field label="API Key" type="text" />
</FormSection>
```

---

## With Icon

Add an icon to the section header.

```tsx
import { User, Bell, Shield } from 'lucide-react';

<FormSection
  icon={<User size={20} />}
  title="Personal Information"
>
  <Field label="Name" type="text" />
</FormSection>

<FormSection
  icon={<Bell size={20} />}
  title="Notifications"
>
  <Field label="Email alerts" type="checkbox" />
</FormSection>

<FormSection
  icon={<Shield size={20} />}
  title="Security"
>
  <Field label="Two-factor auth" type="checkbox" />
</FormSection>
```

---

## Field Groups

Use `FormSection.Group` to organize related fields.

```tsx
<FormSection title="Contact Information">
  <FormSection.Group label="Address" columns={2}>
    <Field label="Street" type="text" />
    <Field label="City" type="text" />
    <Field label="State" type="text" />
    <Field label="ZIP" type="text" />
  </FormSection.Group>

  <FormSection.Group label="Phone Numbers">
    <Field label="Mobile" type="tel" />
    <Field label="Work" type="tel" />
  </FormSection.Group>
</FormSection>
```

---

## Action Buttons

Add save/cancel buttons to sections.

```tsx
<FormSection
  title="Profile"
  actions={
    <FormSection.Actions>
      <Button variant="ghost">Cancel</Button>
      <Button variant="primary">Save</Button>
    </FormSection.Actions>
  }
>
  <Field label="Name" type="text" />
</FormSection>
```

### Different Alignments

```tsx
// Right-aligned (default)
<FormSection.Actions align="end">
  <Button>Save</Button>
</FormSection.Actions>

// Left-aligned
<FormSection.Actions align="start">
  <Button>Save</Button>
</FormSection.Actions>

// Space between
<FormSection.Actions align="between">
  <Button variant="ghost">Reset</Button>
  <Button>Save</Button>
</FormSection.Actions>
```

---

## Dividers

Add visual separation between sections.

```tsx
<FormSection title="Section 1" divider>
  <Field label="Field 1" type="text" />
</FormSection>

<FormSection title="Section 2" divider>
  <Field label="Field 2" type="text" />
</FormSection>

<FormSection title="Section 3">
  <Field label="Field 3" type="text" />
</FormSection>
```

---

## Disabled State

Disable all fields in a section.

```tsx
<FormSection
  title="Locked Settings"
  description="These settings are managed by your administrator."
  disabled
>
  <Field label="SSO Provider" type="text" value="Okta" />
  <Field label="Domain" type="text" value="company.com" />
</FormSection>
```

---

## Complete Examples

### Settings Page

```tsx
import { FormSection, Field, Button } from "@orion/react";
import { User, Bell, Shield, CreditCard } from "lucide-react";

function SettingsPage() {
  return (
    <form onSubmit={handleSubmit}>
      <FormSection
        icon={<User size={20} />}
        title="Profile"
        description="Your public profile information."
        variant="card"
      >
        <FormSection.Group columns={2}>
          <Field label="First Name" type="text" required />
          <Field label="Last Name" type="text" required />
        </FormSection.Group>
        <Field label="Email" type="email" required />
        <Field label="Bio" type="textarea" maxLength={200} />
        <FormSection.Actions>
          <Button variant="primary">Update Profile</Button>
        </FormSection.Actions>
      </FormSection>

      <FormSection
        icon={<Bell size={20} />}
        title="Notifications"
        description="Configure your notification preferences."
        variant="card"
      >
        <Field label="Email notifications" type="checkbox" />
        <Field label="Push notifications" type="checkbox" />
        <Field label="Weekly digest" type="checkbox" />
        <FormSection.Actions>
          <Button variant="primary">Save Preferences</Button>
        </FormSection.Actions>
      </FormSection>

      <FormSection
        icon={<Shield size={20} />}
        title="Security"
        description="Keep your account secure."
        variant="card"
        collapsible
      >
        <Field label="Current Password" type="password" />
        <Field label="New Password" type="password" />
        <Field label="Confirm Password" type="password" />
        <FormSection.Actions>
          <Button variant="primary">Change Password</Button>
        </FormSection.Actions>
      </FormSection>

      <FormSection
        icon={<CreditCard size={20} />}
        title="Billing"
        description="Manage your subscription and payment methods."
        variant="card"
        collapsible
        defaultCollapsed
      >
        <Field
          label="Card Number"
          type="text"
          placeholder="**** **** **** 4242"
          disabled
        />
        <FormSection.Actions>
          <Button variant="secondary">Update Payment Method</Button>
        </FormSection.Actions>
      </FormSection>
    </form>
  );
}
```

### Inline Settings (Linear-style)

```tsx
<FormSection
  variant="inline"
  title="Display name"
  description="Your name as it appears across the platform."
>
  <Field type="text" value="John Doe" />
</FormSection>

<FormSection
  variant="inline"
  title="Email address"
  description="Used for notifications and sign-in."
>
  <Field type="email" value="john@example.com" />
</FormSection>

<FormSection
  variant="inline"
  title="Timezone"
  description="All dates and times are shown in this timezone."
>
  <Field
    type="select"
    value="America/New_York"
    options={timezones}
  />
</FormSection>
```

---

## Accessibility

- Section titles use proper heading hierarchy
- Collapsible sections have ARIA expanded state
- Disabled fields properly marked as disabled
- Form groups use fieldset/legend when appropriate
- Action buttons are keyboard accessible

```tsx
// Good: Descriptive section titles
<FormSection title="Two-Factor Authentication Settings" ... />

// Avoid: Vague titles
<FormSection title="Settings" ... />
```

---

## Anti-Patterns

### Too Many Fields Per Section

```tsx
// WRONG - 20 fields in one section
<FormSection title="Profile">
  {twentyFields.map(field => <Field {...field} />)}
</FormSection>

// CORRECT - Break into logical groups
<FormSection title="Personal Information">
  <Field label="Name" />
  <Field label="Email" />
</FormSection>
<FormSection title="Preferences">
  <Field label="Language" />
  <Field label="Timezone" />
</FormSection>
```

### Missing Descriptions

```tsx
// WRONG - No context for users
<FormSection title="API">
  <Field label="Key" type="text" />
</FormSection>

// CORRECT - Explain the purpose
<FormSection
  title="API Access"
  description="Use this key to authenticate API requests. Keep it secret!"
>
  <Field label="API Key" type="text" />
</FormSection>
```

### No Clear Actions

```tsx
// WRONG - Users don't know what to do
<FormSection title="Profile">
  <Field label="Name" type="text" />
</FormSection>

// CORRECT - Clear save action
<FormSection
  title="Profile"
  actions={<Button variant="primary">Save Changes</Button>}
>
  <Field label="Name" type="text" />
</FormSection>
```

---

## When to Use FormSection

| Scenario        | Recommendation         |
| --------------- | ---------------------- |
| Settings pages  | Card or inline variant |
| Profile editing | With icon and actions  |
| Account setup   | Collapsible sections   |
| Admin panels    | Card with dividers     |

## When NOT to Use FormSection

| Scenario          | Use Instead       |
| ----------------- | ----------------- |
| Simple login form | Basic form layout |
| Checkout flow     | Stepper section   |
| Quick edit        | DetailPanel       |
| Inline editing    | Editable field    |

---

## Related Components

- **[Field](../../components/Field/README.md)** — Form inputs
- **[SettingsLayout](../SettingsLayout/README.md)** — Settings page layout
- **[DetailPanel](../DetailPanel/README.md)** — Slide-over forms
- **[Stepper](../Stepper/README.md)** — Multi-step forms
