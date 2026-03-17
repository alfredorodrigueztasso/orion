# SettingsTemplate (Template)

Flexible settings and configuration page with sidebar navigation and content sections. Supports unsaved changes detection, error/success messaging, and organized settings organization.

## When to Use

| Scenario | Use SettingsTemplate |
|----------|-------------------|
| Application settings page | ✅ Yes - multi-section configuration |
| Preferences management | ✅ Yes - organized settings |
| Admin configuration panel | ✅ Yes - hierarchical settings |
| User preferences hub | ✅ Yes - account and app settings |
| Settings with draft state | ✅ Yes - unsaved changes tracking |

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | string | "Settings" | Page title |
| sections | SettingsSection[] | [] | Settings sections to display |
| activeSectionId | string | — | Default active section |
| onSelectSection | (sectionId: string) => void | — | Section change callback |
| onSave | () => void | — | Save settings callback |
| onReset | () => void | — | Reset/discard callback |
| isLoading | boolean | false | Loading state |
| hasUnsavedChanges | boolean | false | Shows unsaved indicator |
| error | string | — | Error message |
| successMessage | string | — | Success message |
| className | string | — | Custom CSS class |

### SettingsSection Interface

| Property | Type | Description |
|----------|------|-------------|
| id | string | Unique section identifier |
| title | string | Section heading |
| description | string | Section description (optional) |
| content | ReactNode | Section form/content component |

## Key Features

- **Sidebar navigation** — Section list with descriptions
- **Content area** — Main settings section display
- **Active state** — Highlight current section
- **Save changes** — Disabled until changes made
- **Discard button** — Reset unsaved changes
- **Unsaved badge** — Visual indicator of draft state
- **Error handling** — Display validation errors
- **Success messages** — Confirmation of saved changes
- **Loading state** — Disable actions during save
- **Empty state** — Guidance when no sections configured

## Usage Example

```tsx
import { SettingsTemplate } from "@orion-ds/react";

const sections = [
  {
    id: "account",
    title: "Account",
    description: "Email and profile settings",
    content: <AccountSettings />,
  },
  {
    id: "notifications",
    title: "Notifications",
    description: "Email and push settings",
    content: <NotificationSettings />,
  },
  {
    id: "privacy",
    title: "Privacy",
    description: "Data and sharing preferences",
    content: <PrivacySettings />,
  },
];

<SettingsTemplate
  title="Settings"
  sections={sections}
  activeSectionId="account"
  onSelectSection={(id) => console.log("Changed to:", id)}
  onSave={() => saveSettings()}
  onReset={() => revertChanges()}
  hasUnsavedChanges={isDirty}
  isLoading={isSaving}
/>
```

## Component Composition

Built with:
- `Card` — Section content container
- `Button` — Save and discard actions
- Lucide Icons — AlertCircle and Check for messages
- Sidebar navigation — Custom buttons for section selection
- Custom message sections — Error and success display

## Accessibility

- Navigation buttons have clear labels
- Active section is visually indicated
- Save/discard buttons are keyboard accessible
- Error and success messages are announced
- Section descriptions provide context
- Unsaved indicator is prominent

## Token Usage

- `--surface-base` — Page background
- `--surface-layer` — Sidebar and card backgrounds
- `--text-primary` — Section titles and labels
- `--text-secondary` — Descriptions
- `--interactive-primary` — Save button
- `--interactive-secondary` — Discard button
- `--status-error` — Error message color
- `--status-success` — Success message color
- `--border-subtle` — Section separators
- `--spacing-4` — Section padding
- `--spacing-6` — Sidebar width and gaps
- `--radius-control` — Button radius
