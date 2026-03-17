# WorkspaceSwitcher

A dropdown component for switching between organizations/workspaces, displaying the current org with member count and management actions.

## When to Use

| Scenario                        | Use WorkspaceSwitcher                            |
| ------------------------------- | ------------------------------------------------ |
| Multi-tenant app navigation     | ✅ Yes - switch between organizations            |
| Sidebar workspace selector      | ✅ Yes - shows current org + switcher            |
| Team/org management entry point | ✅ Yes - includes settings, participants actions |
| Simple user menu                | ❌ No - use UserMenu instead                     |
| Project/repo switching          | ❌ No - use Select or Combobox                   |

## Props Reference

| Prop                 | Type                      | Default | Description                          |
| -------------------- | ------------------------- | ------- | ------------------------------------ |
| currentOrg           | CurrentWorkspaceOrg       | —       | Currently active organization        |
| organizations        | WorkspaceOrg[]            | —       | List of other organizations          |
| onSettings           | () => void                | —       | Settings button callback             |
| onParticipants       | () => void                | —       | Participants button callback         |
| onCreateOrganization | () => void                | —       | Create new org callback              |
| onOrgChange          | (orgName: string) => void | —       | Organization switch callback         |
| fullWidth            | boolean                   | true    | Whether trigger stretches full width |

### CurrentWorkspaceOrg

| Prop        | Type   | Description               |
| ----------- | ------ | ------------------------- |
| name        | string | Organization display name |
| role        | string | User's role in this org   |
| memberCount | number | Number of members         |

### WorkspaceOrg

| Prop | Type   | Description               |
| ---- | ------ | ------------------------- |
| name | string | Organization display name |
| role | string | User's role in this org   |

## Examples

### Basic Usage

```tsx
import { WorkspaceSwitcher } from "@orion-ds/react";

<WorkspaceSwitcher
  currentOrg={{ name: "Acme Corp", role: "Admin", memberCount: 12 }}
  organizations={[
    { name: "Personal", role: "Owner" },
    { name: "Startup Inc", role: "Member" },
  ]}
  onOrgChange={(name) => switchOrg(name)}
  onSettings={() => navigate("/settings")}
  onCreateOrganization={() => openCreateDialog()}
/>;
```

### In Sidebar

```tsx
<Sidebar>
  <WorkspaceSwitcher
    currentOrg={currentOrg}
    organizations={orgs}
    onOrgChange={handleSwitch}
    onParticipants={() => openParticipants()}
    fullWidth
  />
  <Sidebar.Nav>{/* navigation items */}</Sidebar.Nav>
</Sidebar>
```

## Accessibility

- Dropdown trigger is keyboard accessible
- Organization list is navigable with arrow keys
- Current org is marked as selected
- Actions have descriptive labels

## Token Usage

- `--surface-base` — Dropdown background
- `--surface-subtle` — Trigger background
- `--text-primary` — Organization name
- `--text-secondary` — Role and member count
- `--border-subtle` — Dropdown border
- `--interactive-primary` — Hover state
- `--radius-control` — Trigger border radius
- `--spacing-3` — Internal padding
