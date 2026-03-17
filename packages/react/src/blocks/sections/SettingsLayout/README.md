# SettingsLayout (Section)

A settings page layout with sidebar navigation and main content area. Designed for preference pages, user settings, and administrative panels.

## When to Use

| Scenario                | Use SettingsLayout                    |
| ----------------------- | ------------------------------------- |
| User settings page      | ✅ Yes - sidebar navigation + content |
| Admin panel             | ✅ Yes - multi-section configuration  |
| Preferences with groups | ✅ Yes - organized navigation         |
| Simple settings form    | ❌ No - use Form or Field components  |
| Multi-step wizard       | ❌ No - use Stepper section           |

## Props Reference

| Prop          | Type                        | Default | Description                         |
| ------------- | --------------------------- | ------- | ----------------------------------- |
| title         | string                      | —       | Page title                          |
| navigation    | SettingsNavGroup[]          | —       | Grouped navigation items (required) |
| activeSection | string                      | —       | Currently active section ID         |
| onNavigate    | (sectionId: string) => void | —       | Callback when nav item selected     |
| children      | ReactNode                   | —       | Content for active section          |
| className     | string                      | —       | Additional CSS class                |

### SettingsNavGroup

| Prop  | Type              | Description                          |
| ----- | ----------------- | ------------------------------------ |
| title | string            | Group heading (required)             |
| items | SettingsNavItem[] | Navigation items in group (required) |

### SettingsNavItem

| Prop        | Type   | Description                  |
| ----------- | ------ | ---------------------------- |
| id          | string | Unique identifier (required) |
| label       | string | Display label (required)     |
| description | string | Optional item description    |

## Examples

### Basic Settings Layout

```tsx
import { SettingsLayout } from "@orion-ds/react";

<SettingsLayout
  title="Settings"
  navigation={[
    {
      title: "Account",
      items: [
        { id: "profile", label: "Profile" },
        { id: "password", label: "Password" },
      ],
    },
    {
      title: "Preferences",
      items: [
        { id: "notifications", label: "Notifications" },
        { id: "theme", label: "Theme" },
      ],
    },
  ]}
  activeSection={activeSection}
  onNavigate={setActiveSection}
>
  <SettingsContent sectionId={activeSection} />
</SettingsLayout>;
```

### With Descriptions

```tsx
<SettingsLayout
  navigation={[
    {
      title: "Security",
      items: [
        {
          id: "two-factor",
          label: "Two-Factor Authentication",
          description: "Add an extra layer of security",
        },
      ],
    },
  ]}
/>
```

## Accessibility

- Sidebar navigation is a vertical menu list
- Active section is marked with aria-current="page"
- Navigation items are keyboard accessible
- Content area updates when section changes
- Page title announces section changes to screen readers

## Token Usage

- `--surface-base` — Main background
- `--surface-subtle` — Sidebar background
- `--surface-layer` — Active nav item background
- `--border-subtle` — Sidebar/content divider
- `--interactive-primary` — Active item indicator
- `--text-primary` — Navigation labels and headings
- `--text-secondary` — Item descriptions
- `--spacing-4` — Section padding
- `--radius-sm` — Active item border radius
