# Avatar

User or entity representation with image, initials, or icon fallback.

## Props

| Prop          | Type                                            | Default | Description                    |
| ------------- | ----------------------------------------------- | ------- | ------------------------------ |
| `src`         | `string`                                        | -       | Image source URL               |
| `alt`         | `string`                                        | -       | Alt text for image             |
| `initials`    | `string`                                        | -       | Initials fallback (e.g., "JD") |
| `icon`        | `ReactNode`                                     | -       | Icon fallback                  |
| `size`        | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'`  | Avatar size                    |
| `status`      | `'online' \| 'offline' \| 'away' \| 'busy'`     | -       | Status indicator               |
| `interactive` | `boolean`                                       | `false` | Make clickable                 |

## Usage

### With Image

```tsx
import { Avatar } from "@orion/react";

<Avatar src="/avatars/john.jpg" alt="John Doe" />;
```

### With Initials

```tsx
<Avatar initials="JD" />
<Avatar initials="AB" />
```

### With Icon

```tsx
import { User } from "lucide-react";

<Avatar icon={<User size={20} />} />;
```

### Fallback Chain

The avatar displays in this priority order:

1. `src` (image)
2. `initials`
3. `icon`
4. Default user icon

```tsx
// Shows image if loads, otherwise initials
<Avatar src="/might-not-exist.jpg" initials="JD" alt="John Doe" />
```

### Sizes

```tsx
<Avatar initials="XS" size="xs" />  {/* 24px */}
<Avatar initials="SM" size="sm" />  {/* 32px */}
<Avatar initials="MD" size="md" />  {/* 40px */}
<Avatar initials="LG" size="lg" />  {/* 48px */}
<Avatar initials="XL" size="xl" />  {/* 56px */}
<Avatar initials="2X" size="2xl" /> {/* 64px */}
```

### With Status Indicator

```tsx
<Avatar src="/user.jpg" status="online" />
<Avatar src="/user.jpg" status="offline" />
<Avatar src="/user.jpg" status="away" />
<Avatar src="/user.jpg" status="busy" />
```

### Interactive (Clickable)

```tsx
<Avatar
  src="/user.jpg"
  alt="Profile"
  interactive
  onClick={() => openProfile()}
/>
```

### Avatar Group

```tsx
<div style={{ display: "flex", marginLeft: "-8px" }}>
  <Avatar src="/user1.jpg" style={{ marginLeft: "-8px" }} />
  <Avatar src="/user2.jpg" style={{ marginLeft: "-8px" }} />
  <Avatar src="/user3.jpg" style={{ marginLeft: "-8px" }} />
  <Avatar initials="+5" style={{ marginLeft: "-8px" }} />
</div>
```

## Tokens Used

- `--surface-subtle` - Fallback background
- `--text-secondary` - Initials text
- `--interactive-primary` - Interactive hover
- `--color-success-500` - Online status
- `--color-error-500` - Busy status
- `--color-warning-500` - Away status
- `--text-tertiary` - Offline status
- `--radius-full` - Circular shape

## Accessibility

- Image has `alt` text
- Interactive avatars are focusable
- Status has `aria-label` description
- Uses `role="img"` for non-image avatars
