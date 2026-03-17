# ProgressBar

Visual indicator for task completion or loading progress.

## Props

| Prop            | Type                                                       | Default     | Description                 |
| --------------- | ---------------------------------------------------------- | ----------- | --------------------------- |
| `value`         | `number`                                                   | -           | Progress value (0-100)      |
| `max`           | `number`                                                   | `100`       | Maximum value               |
| `variant`       | `'primary' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'primary'` | Color variant               |
| `size`          | `'sm' \| 'md' \| 'lg'`                                     | `'md'`      | Bar height                  |
| `showLabel`     | `boolean`                                                  | `false`     | Show percentage label       |
| `label`         | `string`                                                   | -           | Custom label text           |
| `indeterminate` | `boolean`                                                  | `false`     | Indeterminate/loading state |

## Usage

### Basic

```tsx
import { ProgressBar } from "@orion/react";

<ProgressBar value={65} />;
```

### With Label

```tsx
<ProgressBar value={75} showLabel />
// Shows "75%"

<ProgressBar value={75} label="75% complete" />
// Shows "75% complete"
```

### Variants

```tsx
<ProgressBar value={80} variant="primary" />
<ProgressBar value={100} variant="success" />
<ProgressBar value={50} variant="warning" />
<ProgressBar value={25} variant="error" />
<ProgressBar value={60} variant="info" />
```

### Sizes

```tsx
<ProgressBar value={50} size="sm" />  {/* 4px height */}
<ProgressBar value={50} size="md" />  {/* 8px height */}
<ProgressBar value={50} size="lg" />  {/* 12px height */}
```

### Indeterminate (Loading)

```tsx
<ProgressBar indeterminate />
<ProgressBar indeterminate variant="info" />
```

### Custom Max Value

```tsx
<ProgressBar value={3} max={10} showLabel />
// Shows "30%"
```

### File Upload Example

```tsx
function FileUpload() {
  const [progress, setProgress] = useState(0);

  return (
    <div>
      <ProgressBar
        value={progress}
        variant={progress === 100 ? "success" : "primary"}
        showLabel
      />
      <p>{progress === 100 ? "Upload complete!" : "Uploading..."}</p>
    </div>
  );
}
```

### Multi-Step Progress

```tsx
function StepProgress({ currentStep, totalSteps }) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <ProgressBar
      value={progress}
      label={`Step ${currentStep} of ${totalSteps}`}
    />
  );
}
```

## Tokens Used

- `--surface-subtle` - Track background
- `--interactive-primary` - Primary fill
- `--color-success-500` - Success fill
- `--color-warning-500` - Warning fill
- `--color-error-500` - Error fill
- `--color-info-500` - Info fill
- `--text-secondary` - Label text
- `--radius-full` - Border radius

## Accessibility

- Uses `role="progressbar"`
- `aria-valuenow`, `aria-valuemin`, `aria-valuemax` set
- `aria-label` describes the progress
- Indeterminate state uses `aria-busy="true"`
