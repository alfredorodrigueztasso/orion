# Stepper

Multi-step progress indicator for wizards and flows. Supports horizontal and vertical layouts, validation states, and mobile-friendly scrollable mode.

## Props

| Prop             | Type                         | Default        | Description                            |
| ---------------- | ---------------------------- | -------------- | -------------------------------------- |
| `steps`          | `StepItem[]`                 | **required**   | Step definitions                       |
| `currentStep`    | `number`                     | `0`            | Active step index (0-based)            |
| `onStepClick`    | `(index, step) => void`      | -              | Step click callback                    |
| `clickable`      | `boolean`                    | `false`        | Allow clicking steps                   |
| `orientation`    | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction                       |
| `size`           | `'sm' \| 'md' \| 'lg'`       | `'md'`         | Size variant                           |
| `showNumbers`    | `boolean`                    | `true`         | Show step numbers                      |
| `showConnectors` | `boolean`                    | `true`         | Show connector lines                   |
| `showCheckmarks` | `boolean`                    | `true`         | Show checkmarks on complete            |
| `labelPosition`  | `'bottom' \| 'right'`        | `'bottom'`     | Label position (horizontal only)       |
| `scrollable`     | `boolean`                    | `false`        | Enable horizontal scrolling for mobile |

### StepItem

```ts
interface StepItem {
  id: string; // Unique identifier
  title: string; // Step title
  description?: string; // Optional description
  icon?: ReactNode; // Custom icon
  optional?: boolean; // Mark as optional
  error?: boolean; // Error state
  errorMessage?: string; // Error message
  disabled?: boolean; // Disabled state
}
```

## Usage

### Basic

```tsx
import { Stepper } from "@orion/react";

<Stepper
  steps={[
    { id: "1", title: "Account" },
    { id: "2", title: "Profile" },
    { id: "3", title: "Review" },
  ]}
  currentStep={1}
/>;
```

### With Descriptions

```tsx
<Stepper
  steps={[
    { id: "1", title: "Account", description: "Create your account" },
    { id: "2", title: "Profile", description: "Set up your profile" },
    { id: "3", title: "Complete", description: "Review and finish" },
  ]}
  currentStep={1}
/>
```

### Clickable Steps

```tsx
function WizardExample() {
  const [step, setStep] = useState(0);

  return (
    <Stepper
      steps={steps}
      currentStep={step}
      clickable
      onStepClick={(index) => {
        // Only allow going back or to completed steps
        if (index <= step) {
          setStep(index);
        }
      }}
    />
  );
}
```

### With Icons

```tsx
import { User, FileText, Check } from "lucide-react";

<Stepper
  steps={[
    { id: "1", title: "Account", icon: <User size={18} /> },
    { id: "2", title: "Documents", icon: <FileText size={18} /> },
    { id: "3", title: "Complete", icon: <Check size={18} /> },
  ]}
  currentStep={1}
/>;
```

### Optional Steps

```tsx
<Stepper
  steps={[
    { id: "1", title: "Account" },
    { id: "2", title: "Profile", optional: true },
    { id: "3", title: "Complete" },
  ]}
  currentStep={0}
/>
```

### Error State

Show validation errors on specific steps:

```tsx
<Stepper
  steps={[
    { id: "1", title: "Account" },
    {
      id: "2",
      title: "Payment",
      error: true,
      errorMessage: "Payment failed",
    },
    { id: "3", title: "Complete" },
  ]}
  currentStep={1}
/>
```

### Vertical Orientation

```tsx
<Stepper
  orientation="vertical"
  steps={[
    { id: "1", title: "Step 1", description: "First step description" },
    { id: "2", title: "Step 2", description: "Second step description" },
    { id: "3", title: "Step 3", description: "Third step description" },
  ]}
  currentStep={1}
/>
```

### Sizes

```tsx
<Stepper size="sm" steps={steps} currentStep={0} />
<Stepper size="md" steps={steps} currentStep={0} />
<Stepper size="lg" steps={steps} currentStep={0} />
```

### Without Numbers

```tsx
<Stepper steps={steps} currentStep={1} showNumbers={false} />
```

### Scrollable Mode (Mobile)

For wizards with many steps on mobile, enable `scrollable` for horizontal scroll with auto-centering:

```tsx
<Stepper
  steps={[
    { id: "1", title: "Account" },
    { id: "2", title: "Profile" },
    { id: "3", title: "Address" },
    { id: "4", title: "Payment" },
    { id: "5", title: "Review" },
    { id: "6", title: "Complete" },
  ]}
  currentStep={3}
  scrollable
/>
```

**Scrollable behavior:**

- Enables horizontal overflow scrolling
- Auto-scrolls to center the current step when it changes
- Uses smooth scroll animation
- Maintains visible labels (no truncation)
- Ideal for 5+ steps on mobile viewports

### Multi-Step Form with Validation

Complete example with step-by-step validation:

```tsx
import { useState } from "react";
import { Stepper, Button, Field } from "@orion/react";

interface FormData {
  email: string;
  password: string;
  name: string;
  bio: string;
}

interface StepErrors {
  [stepId: string]: string | undefined;
}

function SignupWizard() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    name: "",
    bio: "",
  });
  const [errors, setErrors] = useState<StepErrors>({});

  const steps = [
    {
      id: "account",
      title: "Account",
      description: "Create your account",
      error: !!errors.account,
      errorMessage: errors.account,
    },
    {
      id: "profile",
      title: "Profile",
      description: "Set up your profile",
      error: !!errors.profile,
      errorMessage: errors.profile,
    },
    {
      id: "review",
      title: "Review",
      description: "Confirm details",
    },
  ];

  const validateStep = (stepIndex: number): boolean => {
    const newErrors: StepErrors = {};

    if (stepIndex === 0) {
      if (!formData.email) {
        newErrors.account = "Email is required";
      } else if (!formData.email.includes("@")) {
        newErrors.account = "Invalid email format";
      } else if (!formData.password || formData.password.length < 8) {
        newErrors.account = "Password must be at least 8 characters";
      }
    }

    if (stepIndex === 1) {
      if (!formData.name) {
        newErrors.profile = "Name is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step < steps.length - 1) {
        setStep(step + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
  };

  return (
    <div>
      <Stepper
        steps={steps}
        currentStep={step}
        clickable
        onStepClick={(index) => {
          // Allow clicking to previous steps or current step
          if (index <= step) {
            setStep(index);
          }
        }}
      />

      <div style={{ marginTop: 32, minHeight: 200 }}>
        {step === 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Field
              type="email"
              label="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              error={
                errors.account?.includes("email") ? errors.account : undefined
              }
            />
            <Field
              type="password"
              label="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              error={
                errors.account?.includes("Password")
                  ? errors.account
                  : undefined
              }
            />
          </div>
        )}

        {step === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Field
              label="Full Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              error={errors.profile}
            />
            <Field
              label="Bio"
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
            />
          </div>
        )}

        {step === 2 && (
          <div>
            <h3>Review Your Information</h3>
            <p>
              <strong>Email:</strong> {formData.email}
            </p>
            <p>
              <strong>Name:</strong> {formData.name}
            </p>
            {formData.bio && (
              <p>
                <strong>Bio:</strong> {formData.bio}
              </p>
            )}
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: 16, marginTop: 32 }}>
        <Button variant="secondary" disabled={step === 0} onClick={handleBack}>
          Back
        </Button>
        <Button onClick={handleNext}>
          {step === steps.length - 1 ? "Submit" : "Next"}
        </Button>
      </div>
    </div>
  );
}
```

### Checkout Flow Example

```tsx
function CheckoutStepper() {
  const [step, setStep] = useState(0);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const steps = [
    { id: "cart", title: "Cart", description: "Review items" },
    { id: "shipping", title: "Shipping", description: "Delivery address" },
    {
      id: "payment",
      title: "Payment",
      description: "Payment method",
      error: !!paymentError,
      errorMessage: paymentError || undefined,
    },
    { id: "confirm", title: "Confirm", description: "Place order" },
  ];

  const handlePayment = async () => {
    try {
      // Simulate payment
      await processPayment();
      setPaymentError(null);
      setStep(3);
    } catch {
      setPaymentError("Card declined. Please try another card.");
    }
  };

  return (
    <Stepper
      steps={steps}
      currentStep={step}
      clickable
      onStepClick={(index) => {
        // Clear payment error when navigating away
        if (index !== 2) setPaymentError(null);
        if (index < step) setStep(index);
      }}
    />
  );
}
```

## Tokens Used

- `--interactive-primary` - Active/complete step
- `--surface-subtle` - Upcoming step background
- `--text-primary` - Active step text
- `--text-secondary` - Upcoming step text
- `--color-error-500` - Error state
- `--border-subtle` - Connector lines
- `--spacing-2`, `--spacing-4` - Padding

## Accessibility

- Uses `role="navigation"` with `aria-label="Progress"`
- Steps have `aria-current="step"` for current step
- `aria-disabled` for disabled steps
- Error states announced with `aria-invalid`
- Keyboard navigable when clickable:

| Key               | Action                             |
| ----------------- | ---------------------------------- |
| `Tab`             | Move focus between clickable steps |
| `Enter` / `Space` | Activate focused step              |

## Step Status States

Each step can be in one of four states:

| Status     | Visual             | Description               |
| ---------- | ------------------ | ------------------------- |
| `complete` | Checkmark + filled | Step has been completed   |
| `current`  | Highlighted        | Currently active step     |
| `upcoming` | Muted              | Step not yet reached      |
| `error`    | Red + error icon   | Step has validation error |

The status is determined automatically based on `currentStep` and the step's `error` property.
