# DetailPanel Section

> Slide-over panel for viewing and editing entity details without leaving the current page.

## Quick Start

```tsx
import { DetailPanel, Button } from "@orion/react";

function UserList() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <>
      <UserTable onRowClick={setSelectedUser} />

      <DetailPanel
        open={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        title="User Details"
        footer={
          <>
            <Button variant="ghost" onClick={() => setSelectedUser(null)}>
              Cancel
            </Button>
            <Button variant="primary">Save Changes</Button>
          </>
        }
      >
        <UserForm user={selectedUser} />
      </DetailPanel>
    </>
  );
}
```

---

## Features

- **Slide-over Animation** — Smooth slide-in from edge
- **Multiple Sizes** — Small to extra-large widths
- **Left or Right Position** — Choose panel side
- **Header Actions** — Buttons in header area
- **Footer Support** — Action buttons at bottom
- **Overlay Backdrop** — Optional dimmed background
- **Loading State** — Built-in loading indicator
- **Keyboard Support** — Close on Escape key
- **Brand-Aware** — Adapts to all Orion brands

---

## Props Reference

```typescript
interface DetailPanelProps {
  // State
  open: boolean; // REQUIRED - Panel visibility
  onClose: () => void; // REQUIRED - Close handler

  // Header
  title: ReactNode; // REQUIRED - Panel title
  subtitle?: ReactNode; // Optional subtitle
  headerActions?: ReactNode; // Header action buttons

  // Content
  children: ReactNode; // REQUIRED - Panel content

  // Footer
  footer?: ReactNode; // Footer content (action buttons)

  // Layout
  size?: "sm" | "md" | "lg" | "xl"; // Panel width - default: 'md'
  position?: "right" | "left"; // Panel side - default: 'right'

  // Behavior
  overlay?: boolean; // Show backdrop - default: true
  closeOnOverlayClick?: boolean; // Close on backdrop click - default: true
  closeOnEscape?: boolean; // Close on Escape key - default: true
  loading?: boolean; // Loading state - default: false
}
```

---

## Size Variants

### Small (320px)

Best for simple details or narrow content.

```tsx
<DetailPanel size="sm" open={isOpen} onClose={close} title="Quick View">
  <CompactDetails />
</DetailPanel>
```

### Medium (480px) - Default

Standard size for forms and details.

```tsx
<DetailPanel size="md" open={isOpen} onClose={close} title="Edit User">
  <UserForm />
</DetailPanel>
```

### Large (640px)

For complex forms or rich content.

```tsx
<DetailPanel size="lg" open={isOpen} onClose={close} title="Order Details">
  <OrderDetails />
</DetailPanel>
```

### Extra Large (800px)

For extensive content or side-by-side layouts.

```tsx
<DetailPanel size="xl" open={isOpen} onClose={close} title="Project Overview">
  <ProjectDetails />
</DetailPanel>
```

---

## Position

### Right (Default)

```tsx
<DetailPanel position="right" ... />
```

### Left

```tsx
<DetailPanel position="left" ... />
```

---

## Header Actions

Add action buttons to the header area.

```tsx
<DetailPanel
  open={isOpen}
  onClose={close}
  title="Document"
  headerActions={
    <>
      <Button
        size="sm"
        variant="ghost"
        iconOnly
        icon={<Edit size={16} />}
        aria-label="Edit"
      />
      <Button
        size="sm"
        variant="ghost"
        iconOnly
        icon={<Trash size={16} />}
        aria-label="Delete"
      />
    </>
  }
>
  <DocumentViewer />
</DetailPanel>
```

---

## Footer Actions

Common pattern with cancel and save buttons.

```tsx
<DetailPanel
  open={isOpen}
  onClose={close}
  title="Edit Profile"
  footer={
    <>
      <Button variant="ghost" onClick={close}>
        Cancel
      </Button>
      <Button variant="primary" onClick={save}>
        Save Changes
      </Button>
    </>
  }
>
  <ProfileForm />
</DetailPanel>
```

---

## Loading State

Show a loading indicator while content loads.

```tsx
<DetailPanel
  open={isOpen}
  onClose={close}
  title="Loading Details..."
  loading={isLoading}
>
  {data && <DetailsView data={data} />}
</DetailPanel>
```

---

## Overlay Options

### With Overlay (Default)

Dims the background and captures clicks outside.

```tsx
<DetailPanel
  overlay={true}
  closeOnOverlayClick={true}
  ...
/>
```

### Without Overlay

Panel slides over without dimming the background.

```tsx
<DetailPanel
  overlay={false}
  ...
/>
```

### Non-dismissible Overlay

Overlay present but clicking it doesn't close panel.

```tsx
<DetailPanel
  overlay={true}
  closeOnOverlayClick={false}
  ...
/>
```

---

## Complete Examples

### User Detail Panel

```tsx
import { DetailPanel, Button, Field } from "@orion/react";
import { Edit, Trash2, Mail } from "lucide-react";

function UserDetailPanel({ user, onClose, onSave }) {
  const [formData, setFormData] = useState(user);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await onSave(formData);
    setSaving(false);
    onClose();
  };

  return (
    <DetailPanel
      open={!!user}
      onClose={onClose}
      title={user?.name || "User Details"}
      subtitle={user?.email}
      size="md"
      headerActions={
        <>
          <Button
            size="sm"
            variant="ghost"
            iconOnly
            icon={<Mail size={16} />}
            aria-label="Send email"
          />
          <Button
            size="sm"
            variant="ghost"
            iconOnly
            icon={<Trash2 size={16} />}
            aria-label="Delete user"
          />
        </>
      }
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave} loading={saving}>
            Save Changes
          </Button>
        </>
      }
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-4)",
        }}
      >
        <Field
          label="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <Field
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <Field
          label="Role"
          type="select"
          value={formData.role}
          options={[
            { value: "admin", label: "Admin" },
            { value: "user", label: "User" },
            { value: "viewer", label: "Viewer" },
          ]}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        />
      </div>
    </DetailPanel>
  );
}
```

### Order Details Panel

```tsx
<DetailPanel
  open={!!selectedOrder}
  onClose={() => setSelectedOrder(null)}
  title={`Order #${selectedOrder?.id}`}
  subtitle={`Placed on ${selectedOrder?.date}`}
  size="lg"
  footer={
    <>
      <Button variant="ghost" onClick={() => setSelectedOrder(null)}>
        Close
      </Button>
      <Button variant="secondary" onClick={() => printOrder(selectedOrder)}>
        Print
      </Button>
      <Button variant="primary" onClick={() => refundOrder(selectedOrder)}>
        Process Refund
      </Button>
    </>
  }
>
  <OrderSummary order={selectedOrder} />
  <OrderItems items={selectedOrder?.items} />
  <OrderTimeline events={selectedOrder?.events} />
</DetailPanel>
```

### Read-Only Preview Panel

```tsx
<DetailPanel
  open={showPreview}
  onClose={() => setShowPreview(false)}
  title="Document Preview"
  size="xl"
  position="right"
  overlay={false}
>
  <DocumentViewer document={selectedDocument} />
</DetailPanel>
```

### Form Panel with Validation

```tsx
<DetailPanel
  open={isEditing}
  onClose={handleClose}
  title="Edit Settings"
  closeOnOverlayClick={false}
  closeOnEscape={false}
  footer={
    <>
      <Button variant="ghost" onClick={handleClose}>
        Discard
      </Button>
      <Button variant="primary" disabled={!isValid} onClick={handleSave}>
        Save
      </Button>
    </>
  }
>
  <form onSubmit={handleSubmit}>
    <SettingsForm errors={errors} />
  </form>
</DetailPanel>
```

---

## Accessibility

- Panel has proper `role="dialog"` and `aria-modal`
- Title associated via `aria-labelledby`
- Focus trapped within panel when open
- Close button has accessible label
- Escape key closes panel (configurable)
- Returns focus to trigger when closed

```tsx
// Good: Descriptive title
<DetailPanel title="Edit User Profile" ... />

// Avoid: Vague title
<DetailPanel title="Details" ... />
```

---

## Anti-Patterns

### No Close Method

```tsx
// WRONG - User can't close the panel
<DetailPanel
  open={true}
  onClose={() => {}}  // No-op
  closeOnOverlayClick={false}
  closeOnEscape={false}
>
  Content
</DetailPanel>

// CORRECT - Provide clear close action
<DetailPanel
  footer={
    <Button onClick={close}>Close</Button>
  }
>
  Content
</DetailPanel>
```

### Too Much Content

```tsx
// WRONG - Panel overloaded with content
<DetailPanel size="sm">
  <ComplexForm with={100} fields={true} />
</DetailPanel>

// CORRECT - Use appropriate size or paginate
<DetailPanel size="lg">
  <FormSection title="Basic Info">...</FormSection>
  <FormSection title="Advanced">...</FormSection>
</DetailPanel>
```

### Missing Loading State

```tsx
// WRONG - Content flashes undefined
<DetailPanel open={true}>
  <div>{data.name}</div>  // Crashes if data not loaded
</DetailPanel>

// CORRECT - Handle loading state
<DetailPanel open={true} loading={!data}>
  {data && <div>{data.name}</div>}
</DetailPanel>
```

---

## When to Use DetailPanel

| Scenario            | Recommendation            |
| ------------------- | ------------------------- |
| Quick edit          | Small or medium size      |
| Preview content     | Without overlay           |
| Complex forms       | Large with footer actions |
| Multi-step workflow | Large with stepper inside |

## When NOT to Use DetailPanel

| Scenario            | Use Instead    |
| ------------------- | -------------- |
| Confirmation prompt | Modal dialog   |
| Full page edit      | Dedicated page |
| Simple notification | Toast          |
| Quick action        | Dropdown menu  |

---

## Related Components

- **[Modal](../../components/Modal/README.md)** — Centered dialogs
- **[FormSection](../FormSection/README.md)** — Form layouts
- **[PageHeader](../PageHeader/README.md)** — Page headers
- **[DataTable](../DataTable/README.md)** — Tables with row actions
