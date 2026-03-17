# Tabs

Navigation tabs for switching between content sections. Supports controlled and uncontrolled modes.

## Props

| Prop         | Type                      | Default      | Description                       |
| ------------ | ------------------------- | ------------ | --------------------------------- |
| `tabs`       | `TabItem[]`               | **required** | Array of tab definitions          |
| `defaultTab` | `string`                  | First tab ID | Default active tab (uncontrolled) |
| `activeTab`  | `string`                  | -            | Controlled active tab ID          |
| `onChange`   | `(tabId: string) => void` | -            | Tab change callback               |
| `fullWidth`  | `boolean`                 | `false`      | Tabs fill container width         |
| `className`  | `string`                  | -            | Additional CSS class              |

### TabItem

```ts
interface TabItem {
  id: string; // Unique identifier
  label: string; // Tab label text
  content: ReactNode; // Tab panel content
  icon?: ReactNode; // Optional icon
  disabled?: boolean; // Disabled state
  badge?: string | number; // Badge/count indicator
}
```

## Usage

### Basic

```tsx
import { Tabs } from "@orion/react";

<Tabs
  tabs={[
    { id: "profile", label: "Profile", content: <ProfileContent /> },
    { id: "settings", label: "Settings", content: <SettingsContent /> },
    { id: "billing", label: "Billing", content: <BillingContent /> },
  ]}
/>;
```

### With Default Tab

```tsx
<Tabs tabs={tabs} defaultTab="settings" />
```

### Controlled

```tsx
import { useState } from "react";

function Example() {
  const [activeTab, setActiveTab] = useState("profile");

  return <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />;
}
```

### With Icons

```tsx
import { User, Settings, CreditCard } from "lucide-react";

<Tabs
  tabs={[
    {
      id: "profile",
      label: "Profile",
      icon: <User size={16} />,
      content: <ProfileContent />,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings size={16} />,
      content: <SettingsContent />,
    },
    {
      id: "billing",
      label: "Billing",
      icon: <CreditCard size={16} />,
      content: <BillingContent />,
    },
  ]}
/>;
```

### With Badge

```tsx
<Tabs
  tabs={[
    { id: "inbox", label: "Inbox", badge: 5, content: <Inbox /> },
    { id: "sent", label: "Sent", content: <Sent /> },
    { id: "drafts", label: "Drafts", badge: 2, content: <Drafts /> },
  ]}
/>
```

### With Disabled Tab

```tsx
<Tabs
  tabs={[
    { id: "overview", label: "Overview", content: <Overview /> },
    { id: "analytics", label: "Analytics", disabled: true, content: null },
    { id: "reports", label: "Reports", content: <Reports /> },
  ]}
/>
```

### Full Width

```tsx
<Tabs tabs={tabs} fullWidth />
```

## Tokens Used

- `--surface-base` - Tab panel background
- `--surface-subtle` - Tab list background
- `--text-primary` - Active tab text
- `--text-secondary` - Inactive tab text
- `--interactive-primary` - Active indicator
- `--spacing-3`, `--spacing-4` - Padding
- `--radius-control` - Tab border radius

## Accessibility

- Tab list has `role="tablist"`
- Tabs have `role="tab"` with `aria-selected`
- Panels have `role="tabpanel"` with `aria-labelledby`
- Tabs linked to panels via `aria-controls`
- Disabled tabs properly indicated
- Keyboard navigation supported (arrow keys)
