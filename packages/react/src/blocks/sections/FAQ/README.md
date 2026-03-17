# FAQ (Section)

A frequently asked questions accordion section for displaying Q&A content. Ideal for support pages, documentation, and help centers.

## When to Use

| Scenario                   | Use FAQ                                       |
| -------------------------- | --------------------------------------------- |
| Customer support questions | ✅ Yes - organized Q&A format                 |
| Product help documentation | ✅ Yes - expandable accordion UI              |
| Billing/pricing questions  | ✅ Yes - common use case                      |
| Onboarding explanations    | ✅ Yes - guides users through features        |
| One-off questions          | ❌ No - use simple collapse component instead |
| Complex multi-step guides  | ❌ No - use detailed documentation instead    |

## Props Reference

| Prop          | Type      | Default | Description                               |
| ------------- | --------- | ------- | ----------------------------------------- |
| title         | string    | —       | Section heading (optional)                |
| description   | string    | —       | Section description (optional)            |
| items         | FAQItem[] | —       | Array of FAQ questions/answers (required) |
| allowMultiple | boolean   | false   | Allow multiple items open simultaneously  |
| className     | string    | —       | Additional CSS class                      |

### FAQItem

| Prop     | Type   | Description                    |
| -------- | ------ | ------------------------------ |
| id       | string | Unique identifier for the item |
| question | string | The question text              |
| answer   | string | The answer/response text       |

## Examples

### Basic FAQ Section

```tsx
import { FAQ } from "@orion-ds/react";

<FAQ
  title="Frequently Asked Questions"
  items={[
    {
      id: "1",
      question: "What is your refund policy?",
      answer: "We offer 30-day refunds.",
    },
    {
      id: "2",
      question: "How do I reset my password?",
      answer: "Click 'Forgot Password' on login.",
    },
    {
      id: "3",
      question: "Do you have mobile apps?",
      answer: "Yes, iOS and Android available.",
    },
  ]}
/>;
```

### Multiple Items Open

```tsx
<FAQ
  title="Common Questions"
  description="Get answers to our most asked questions"
  items={faqItems}
  allowMultiple
/>
```

## Accessibility

- Each FAQ item is an accordion with proper ARIA attributes
- Questions are keyboard navigable (Enter/Space to toggle)
- Open state is announced to screen readers
- Answer text has sufficient heading hierarchy

## Token Usage

- `--surface-base` — Container background
- `--surface-layer` — Item backgrounds
- `--text-primary` — Question text
- `--text-secondary` — Answer text
- `--border-subtle` — Item separators
- `--spacing-4` — Item padding
- `--radius-control` — Item border radius
