# Modal

Dialog/overlay component with backdrop, animations, and compound components for structure.

## Props

### Modal

| Prop              | Type                                     | Default      | Description                      |
| ----------------- | ---------------------------------------- | ------------ | -------------------------------- |
| `open`            | `boolean`                                | **required** | Whether the modal is open        |
| `onClose`         | `() => void`                             | **required** | Callback when modal should close |
| `size`            | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'`       | Modal size                       |
| `closeOnBackdrop` | `boolean`                                | `true`       | Close when clicking backdrop     |
| `closeOnEscape`   | `boolean`                                | `true`       | Close on Escape key              |
| `showCloseButton` | `boolean`                                | `true`       | Show X button in corner          |
| `children`        | `ReactNode`                              | -            | Modal content                    |
| `className`       | `string`                                 | -            | Additional CSS class             |

### Modal.Header / Modal.Body / Modal.Footer

| Prop        | Type        | Description          |
| ----------- | ----------- | -------------------- |
| `children`  | `ReactNode` | Section content      |
| `className` | `string`    | Additional CSS class |

## Usage

### Basic Structure

```tsx
import { Modal, Button } from "@orion/react";
import { useState } from "react";

function Example() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>

      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Header>Confirm Action</Modal.Header>
        <Modal.Body>Are you sure you want to proceed?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
```

### Sizes

```tsx
<Modal open={isOpen} onClose={onClose} size="sm">
  {/* Small modal - 400px max width */}
</Modal>

<Modal open={isOpen} onClose={onClose} size="lg">
  {/* Large modal - 800px max width */}
</Modal>

<Modal open={isOpen} onClose={onClose} size="full">
  {/* Full screen modal */}
</Modal>
```

### Prevent Close on Backdrop

```tsx
<Modal
  open={isOpen}
  onClose={onClose}
  closeOnBackdrop={false}
  closeOnEscape={false}
>
  {/* User must use explicit close actions */}
</Modal>
```

### Without Close Button

```tsx
<Modal open={isOpen} onClose={onClose} showCloseButton={false}>
  <Modal.Body>Custom close handling only</Modal.Body>
</Modal>
```

## Tokens Used

- `--surface-base` - Modal background
- `--surface-overlay` - Backdrop color
- `--text-primary` - Header text
- `--spacing-4`, `--spacing-6` - Padding
- `--radius-container` - Border radius
- `--shadow-lg` - Modal shadow

## Accessibility

- Uses `role="dialog"` and `aria-modal="true"`
- Focus trapped inside modal when open
- Escape key closes modal (configurable)
- Body scroll locked when open
- Close button has `aria-label="Close modal"`
