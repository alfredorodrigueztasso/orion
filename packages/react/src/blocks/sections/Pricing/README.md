# Pricing (Section)

A pricing plans section displaying multiple pricing tiers with features and call-to-action buttons. Designed for SaaS landing pages and product marketing.

## When to Use

| Scenario               | Use Pricing                          |
| ---------------------- | ------------------------------------ |
| SaaS pricing page      | ✅ Yes - displays multiple tiers     |
| Product comparison     | ✅ Yes - features per plan           |
| Subscription selection | ✅ Yes - with action buttons         |
| Feature matrix only    | ❌ No - use Comparison section       |
| Simple pricing display | ❌ No - use Stats or card components |

## Props Reference

| Prop        | Type          | Default | Description                       |
| ----------- | ------------- | ------- | --------------------------------- |
| title       | string        | —       | Section heading                   |
| description | string        | —       | Section description               |
| plans       | PricingPlan[] | —       | Array of pricing plans (required) |
| className   | string        | —       | Additional CSS class              |

### PricingPlan

| Prop        | Type      | Description                          |
| ----------- | --------- | ------------------------------------ |
| name        | string    | Plan name (e.g., "Starter", "Pro")   |
| price       | string    | Price display string (e.g., "$29")   |
| period      | string    | Billing period (e.g., "/month")      |
| description | string    | Short plan description               |
| features    | string[]  | List of included features (required) |
| action      | ReactNode | CTA element (button, link, etc.)     |
| popular     | boolean   | Highlight as popular/recommended     |

## Examples

### Basic Pricing Plans

```tsx
import { Pricing } from "@orion-ds/react";

<Pricing
  title="Simple, Transparent Pricing"
  description="Choose the perfect plan for your needs"
  plans={[
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      features: ["5 projects", "10GB storage", "Email support"],
      action: <Button>Get Started</Button>,
    },
    {
      name: "Pro",
      price: "$79",
      period: "/month",
      features: ["Unlimited projects", "100GB storage", "Priority support"],
      popular: true,
      action: <Button variant="primary">Choose Plan</Button>,
    },
  ]}
/>;
```

### With Plan Descriptions

```tsx
<Pricing
  plans={[
    {
      name: "Team",
      price: "$199",
      period: "/month",
      description: "Perfect for growing teams",
      features: ["Unlimited everything", "API access", "24/7 phone support"],
      action: <Button>Contact Sales</Button>,
    },
  ]}
/>
```

## Accessibility

- Plan cards are semantic section elements
- Feature lists use unordered list markup
- Action buttons are keyboard accessible
- Popular badges are decorative (not announced to screen readers)

## Token Usage

- `--surface-base` — Plan card backgrounds
- `--surface-layer` — Feature list backgrounds
- `--border-subtle` — Plan card borders
- `--interactive-primary` — Popular badge background
- `--text-primary` — Plan names and prices
- `--text-secondary` — Descriptions and features
- `--spacing-4` — Card padding
- `--radius-container` — Card border radius
