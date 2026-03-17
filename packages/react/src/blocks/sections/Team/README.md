# Team (Section)

A team members section displaying team members in a grid with avatars, names, and roles. Designed for team pages, company bios, and leadership showcases.

## When to Use

| Scenario           | Use Team                              |
| ------------------ | ------------------------------------- |
| Team page          | ✅ Yes - displays all team members    |
| Company leadership | ✅ Yes - shows founder/executive team |
| About us section   | ✅ Yes - introduces team members      |
| Staff directory    | ✅ Yes - searchable team listing      |
| Single team member | ❌ No - use Card component            |
| Detailed profiles  | ❌ No - use custom layout             |

## Props Reference

| Prop        | Type         | Default | Description                      |
| ----------- | ------------ | ------- | -------------------------------- |
| title       | string       | —       | Section heading                  |
| description | string       | —       | Section description              |
| members     | TeamMember[] | —       | Array of team members (required) |
| columns     | 2 \| 3 \| 4  | 3       | Grid column count                |
| className   | string       | —       | Additional CSS class             |

### TeamMember

| Prop      | Type   | Description                  |
| --------- | ------ | ---------------------------- |
| name      | string | Member name (required)       |
| role      | string | Job title or role (required) |
| avatarSrc | string | Avatar image URL             |

## Examples

### Basic Team Grid

```tsx
import { Team } from "@orion-ds/react";

<Team
  title="Meet Our Team"
  description="The talented people behind the magic"
  members={[
    {
      name: "Alice Johnson",
      role: "CEO & Founder",
      avatarSrc: "/avatars/alice.jpg",
    },
    { name: "Bob Smith", role: "CTO", avatarSrc: "/avatars/bob.jpg" },
    {
      name: "Carol Davis",
      role: "Design Lead",
      avatarSrc: "/avatars/carol.jpg",
    },
  ]}
  columns={3}
/>;
```

### Two Column Layout

```tsx
<Team
  title="Leadership"
  members={[
    { name: "David Chen", role: "VP Product" },
    { name: "Emma Wilson", role: "VP Engineering" },
  ]}
  columns={2}
/>
```

## Accessibility

- Team members are presented in semantic article cards
- Avatar images include member name as alt text
- Member names are heading elements
- Roles are clearly labeled
- Grid layout is responsive and keyboard navigable

## Token Usage

- `--surface-base` — Section background
- `--surface-layer` — Member card backgrounds
- `--border-subtle` — Card borders
- `--text-primary` — Member names
- `--text-secondary` — Member roles
- `--spacing-4` — Card padding
- `--radius-container` — Card border radius
- `--radius-full` — Avatar border radius
