# Stepper (Section)

A step-by-step progress indicator section with navigation controls. Designed for multi-step forms, wizards, and process flows.

## When to Use

| Scenario               | Use Stepper                          |
| ---------------------- | ------------------------------------ |
| Multi-step form wizard | ✅ Yes - shows progress with labels  |
| Process flow indicator | ✅ Yes - displays step sequence      |
| Onboarding flow        | ✅ Yes - guides users through steps  |
| Vertical timeline      | ✅ Yes - vertical orientation option |
| Simple progress bar    | ❌ No - use ProgressBar component    |
| One-time action        | ❌ No - use simple Form              |

## Props Reference

| Prop           | Type                        | Default      | Description                           |
| -------------- | --------------------------- | ------------ | ------------------------------------- |
| steps          | StepItem[]                  | —            | Array of step definitions (required)  |
| activeStep     | number                      | 0            | Currently active step index (0-based) |
| orientation    | StepperOrientation          | "horizontal" | Layout direction                      |
| onStepChange   | (stepIndex: number) => void | —            | Step change callback                  |
| showNavigation | boolean                     | —            | Show prev/next buttons                |
| className      | string                      | —            | Additional CSS class                  |

### StepItem

| Prop        | Type   | Description               |
| ----------- | ------ | ------------------------- |
| id          | string | Unique step identifier    |
| label       | string | Step label text           |
| description | string | Optional step description |

### StepperOrientation

```typescript
type StepperOrientation = "horizontal" | "vertical";
```

## Examples

### Horizontal Wizard

```tsx
import { Stepper } from "@orion-ds/react";

<Stepper
  steps={[
    { id: "personal", label: "Personal Info" },
    { id: "address", label: "Address" },
    { id: "payment", label: "Payment" },
    { id: "review", label: "Review" },
  ]}
  activeStep={currentStep}
  onStepChange={setCurrentStep}
  showNavigation
  orientation="horizontal"
/>;
```

### Vertical with Descriptions

```tsx
<Stepper
  steps={[
    { id: "1", label: "Account Creation", description: "Set up your account" },
    { id: "2", label: "Verification", description: "Verify your email" },
    { id: "3", label: "Profile Setup", description: "Complete your profile" },
  ]}
  activeStep={activeStep}
  orientation="vertical"
  showNavigation
/>
```

## Accessibility

- Steps are marked with aria-current="step" when active
- Step labels are clickable and keyboard accessible
- Progress is announced to screen readers
- Navigation buttons have clear labeling
- Completed steps are marked as such for assistive devices

## Token Usage

- `--surface-base` — Step container background
- `--surface-layer` — Step item background
- `--interactive-primary` — Active step color
- `--interactive-primary-text` — Active step text
- `--border-subtle` — Step connectors and borders
- `--text-primary` — Step labels
- `--text-secondary` — Step descriptions
- `--status-success` — Completed step indicator
- `--spacing-4` — Step padding
- `--radius-full` — Step number circles
