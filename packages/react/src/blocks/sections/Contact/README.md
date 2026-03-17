# Contact (Section)

A contact information section displaying business contact details like phone, email, address, and other communication methods.

## When to Use

| Scenario                  | Use Contact                                |
| ------------------------- | ------------------------------------------ |
| Contact page info section | ✅ Yes - displays business contact details |
| About page footer         | ✅ Yes - shows contact options             |
| Office locations          | ✅ Yes - multiple contact points           |
| Contact form only         | ❌ No - use Contact component instead      |
| Chat widget               | ❌ No - use Chat section instead           |

## Props Reference

| Prop        | Type          | Default | Description               |
| ----------- | ------------- | ------- | ------------------------- |
| title       | string        | —       | Section heading           |
| description | string        | —       | Section description       |
| contactInfo | ContactInfo[] | —       | Contact information items |
| className   | string        | —       | Additional CSS class      |

### ContactInfo

| Prop  | Type   | Description                           |
| ----- | ------ | ------------------------------------- |
| label | string | Contact type label (e.g., "Email")    |
| value | string | Contact value                         |
| href  | string | Optional link (mailto:, tel:, https:) |

## Examples

### Basic Contact Information

```tsx
import { Contact } from "@orion-ds/react";

<Contact
  title="Get in Touch"
  description="We'd love to hear from you"
  contactInfo={[
    {
      label: "Email",
      value: "hello@example.com",
      href: "mailto:hello@example.com",
    },
    { label: "Phone", value: "+1 (555) 123-4567", href: "tel:+15551234567" },
    { label: "Address", value: "123 Main St, City, State 12345" },
  ]}
/>;
```

### Multiple Locations

```tsx
<Contact
  title="Contact Us"
  contactInfo={[
    { label: "Headquarters", value: "San Francisco, CA" },
    {
      label: "Support Email",
      value: "support@example.com",
      href: "mailto:support@example.com",
    },
    { label: "Sales", value: "+1 (555) 987-6543", href: "tel:+15559876543" },
    { label: "Website", value: "example.com", href: "https://example.com" },
  ]}
/>
```

## Accessibility

- Links use proper `href` values (mailto:, tel:, https:)
- Contact labels are clearly associated with values
- Links are keyboard accessible
- Screen readers announce link types properly

## Token Usage

- `--surface-base` — Section background
- `--text-primary` — Labels
- `--text-secondary` — Contact values
- `--interactive-primary` — Link hover states
- `--border-subtle` — Item dividers
- `--spacing-6` — Section padding
