# Field Component

> A self-contained form input with label, validation, and helper text.

## Critical: Props-Based API

**Field is NOT a wrapper component.** It renders its own `<input>` element.

```tsx
// CORRECT - Use props
<Field
  label="Email"
  type="email"
  placeholder="you@example.com"
  error="Invalid email"
/>

// WRONG - Field doesn't accept children for input
<Field label="Email">
  <input type="email" />  // This won't work!
</Field>
```

---

## When to Use

| Scenario                    | Use Field                                                 |
| --------------------------- | --------------------------------------------------------- |
| Text input with label       | `<Field label="Name" />`                                  |
| Email input                 | `<Field label="Email" type="email" />`                    |
| Password input              | `<Field label="Password" type="password" />`              |
| Number input                | `<Field label="Amount" type="number" />`                  |
| Search with icon            | `<Field leftIcon={<Search />} placeholder="Search..." />` |
| Input with validation error | `<Field label="Email" error="Invalid email" />`           |

## When NOT to Use

| Scenario           | Use Instead                |
| ------------------ | -------------------------- |
| Multi-line text    | `<Textarea>`               |
| Dropdown selection | `<Select>`                 |
| Boolean toggle     | `<Switch>` or `<Checkbox>` |
| Search with submit | `<SearchInput>`            |
| Autocomplete       | `<Combobox>`               |

---

## Props Reference

```typescript
interface FieldProps {
  // Label & Messages
  label?: string; // Input label text
  error?: string; // Error message (shows error state)
  helperText?: string; // Helper text below input

  // Icons
  leftIcon?: ReactNode; // Icon on left side
  rightIcon?: ReactNode; // Icon on right side

  // Layout
  fullWidth?: boolean; // default: false
  size?: "sm" | "md" | "lg"; // default: 'md'
  optional?: boolean; // Shows "(optional)" indicator

  // Standard HTML input props
  type?: string; // 'text', 'email', 'password', 'number', etc.
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  // ... all other input attributes
}
```

---

## Examples

### Basic Usage

```tsx
import { Field } from '@orion/react';

// Simple text input
<Field label="Full Name" placeholder="John Doe" />

// Email input
<Field label="Email" type="email" placeholder="you@example.com" />

// Password input
<Field label="Password" type="password" />

// Number input
<Field label="Age" type="number" min={0} max={120} />
```

### With Validation

```tsx
import { Field } from "@orion/react";
import { useState } from "react";

function EmailField() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (value && !value.includes("@")) {
      setError("Please enter a valid email");
    } else {
      setError("");
    }
  };

  return (
    <Field
      label="Email"
      type="email"
      value={email}
      onChange={handleChange}
      error={error}
      placeholder="you@example.com"
    />
  );
}
```

### With Helper Text

```tsx
import { Field } from '@orion/react';

<Field
  label="Password"
  type="password"
  helperText="Must be at least 8 characters"
/>

<Field
  label="Username"
  helperText="This will be your public display name"
  error={usernameError}  // Error takes precedence over helper
/>
```

### With Icons

```tsx
import { Field } from '@orion/react';
import { Mail, Lock, Search, Eye, EyeOff, DollarSign } from 'lucide-react';

// Left icon
<Field
  label="Email"
  type="email"
  leftIcon={<Mail size={18} />}
  placeholder="you@example.com"
/>

// Right icon
<Field
  label="Search"
  rightIcon={<Search size={18} />}
  placeholder="Search..."
/>

// Both icons
<Field
  label="Amount"
  type="number"
  leftIcon={<DollarSign size={18} />}
  rightIcon={<span>USD</span>}
/>

// Password with toggle
function PasswordField() {
  const [show, setShow] = useState(false);

  return (
    <Field
      label="Password"
      type={show ? 'text' : 'password'}
      leftIcon={<Lock size={18} />}
      rightIcon={
        <button type="button" onClick={() => setShow(!show)}>
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      }
    />
  );
}
```

### Sizes

```tsx
import { Field } from '@orion/react';

// Small - for dense UIs
<Field label="Code" size="sm" placeholder="ABC123" />

// Medium - default
<Field label="Name" size="md" placeholder="Your name" />

// Large - for prominent forms
<Field label="Search" size="lg" placeholder="What are you looking for?" />
```

### Optional Fields

```tsx
import { Field } from '@orion/react';

// Shows "(optional)" label
<Field label="Phone Number" type="tel" optional />

// Required (default behavior)
<Field label="Email" type="email" required />
```

### Full Width

```tsx
import { Field } from '@orion/react';

// Fills container width
<Field label="Message" fullWidth />

// In a form
<form style={{ maxWidth: '400px' }}>
  <Field label="Name" fullWidth />
  <Field label="Email" type="email" fullWidth />
  <Button type="submit" fullWidth>Submit</Button>
</form>
```

---

## Form Patterns

### Login Form

```tsx
import { Field, Button, Card } from "@orion/react";
import { Mail, Lock } from "lucide-react";

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // ... handle login
  };

  return (
    <Card>
      <Card.Header>Sign In</Card.Header>
      <Card.Body>
        <form onSubmit={handleSubmit}>
          <Field
            label="Email"
            type="email"
            name="email"
            leftIcon={<Mail size={18} />}
            placeholder="you@example.com"
            required
            fullWidth
          />
          <Field
            label="Password"
            type="password"
            name="password"
            leftIcon={<Lock size={18} />}
            placeholder="Enter password"
            error={error}
            required
            fullWidth
          />
          <Button type="submit" fullWidth isLoading={isLoading}>
            Sign In
          </Button>
        </form>
      </Card.Body>
    </Card>
  );
}
```

### Contact Form

```tsx
import { Field, Textarea, Button } from "@orion/react";
import { User, Mail, Building } from "lucide-react";

function ContactForm() {
  return (
    <form>
      <Field
        label="Name"
        name="name"
        leftIcon={<User size={18} />}
        required
        fullWidth
      />
      <Field
        label="Email"
        type="email"
        name="email"
        leftIcon={<Mail size={18} />}
        required
        fullWidth
      />
      <Field
        label="Company"
        name="company"
        leftIcon={<Building size={18} />}
        optional
        fullWidth
      />
      <Textarea
        label="Message"
        name="message"
        placeholder="How can we help?"
        required
        fullWidth
      />
      <Button type="submit" fullWidth>
        Send Message
      </Button>
    </form>
  );
}
```

### Search Field

```tsx
import { Field } from '@orion/react';
import { Search } from 'lucide-react';

// Basic search
<Field
  leftIcon={<Search size={18} />}
  placeholder="Search..."
  aria-label="Search"
/>

// With keyboard shortcut hint
<Field
  leftIcon={<Search size={18} />}
  rightIcon={<kbd>⌘K</kbd>}
  placeholder="Search..."
  aria-label="Search"
/>
```

---

## Accessibility

### Labels Are Required for Accessibility

```tsx
// CORRECT - Has label
<Field label="Email" type="email" />

// CORRECT - No visible label but has aria-label
<Field
  leftIcon={<Search size={18} />}
  placeholder="Search..."
  aria-label="Search products"
/>

// WRONG - No accessible name
<Field placeholder="Search..." />  // Screen reader can't announce purpose
```

### Error Announcements

When `error` prop is set, it's automatically associated with the input via `aria-describedby`.

```tsx
<Field
  label="Email"
  type="email"
  error="Please enter a valid email" // Announced to screen readers
/>
```

---

## Common Mistakes

### Using Children

```tsx
// WRONG
<Field label="Email">
  <input type="email" />
</Field>

// CORRECT
<Field label="Email" type="email" />
```

### Confusing with Textarea

```tsx
// WRONG - Field is for single-line inputs
<Field label="Description" multiline />  // No such prop

// CORRECT - Use Textarea for multi-line
<Textarea label="Description" rows={4} />
```

### Missing Type for Special Inputs

```tsx
// WRONG - Browser won't show email keyboard
<Field label="Email" />

// CORRECT
<Field label="Email" type="email" />
```

### Icon Size Mismatch

```tsx
// WRONG - Icon too large
<Field leftIcon={<Mail size={32} />} />

// CORRECT - Use 18px for icons in Field
<Field leftIcon={<Mail size={18} />} />
```
