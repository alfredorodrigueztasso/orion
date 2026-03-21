# ProfilePageTemplate (Template)

User profile page with avatar, personal information, and tabbed sections for profile details, security settings, and account preferences. Designed for user account management interfaces.

## When to Use

| Scenario                  | Use ProfilePageTemplate              |
| ------------------------- | ------------------------------------ |
| User account page         | ✅ Yes - profile display and editing |
| Settings hub              | ✅ Yes - multiple sections via tabs  |
| Account management        | ✅ Yes - security and preferences    |
| Profile editing interface | ✅ Yes - user information management |
| Account dashboard         | ✅ Yes - personalized user view      |

## Props Reference

| Prop             | Type                    | Default      | Description              |
| ---------------- | ----------------------- | ------------ | ------------------------ |
| user             | User                    | Default user | User data to display     |
| onEditProfile    | () => void              | —            | Edit profile callback    |
| onChangePassword | () => void              | —            | Change password callback |
| onLogout         | () => void              | —            | Logout callback          |
| tabs             | Tab[]                   | Default tabs | Custom tab definitions   |
| activeTab        | string                  | "profile"    | Default active tab       |
| onSelectTab      | (tabId: string) => void | —            | Tab selection callback   |
| isLoading        | boolean                 | false        | Loading state            |
| error            | string                  | —            | Error message            |
| className        | string                  | —            | Custom CSS class         |

### User Interface

| Property | Type   | Description                      |
| -------- | ------ | -------------------------------- |
| id       | string | Unique identifier                |
| name     | string | User display name                |
| email    | string | Email address                    |
| avatar   | string | Avatar image URL (optional)      |
| bio      | string | User biography (optional)        |
| phone    | string | Phone number (optional)          |
| location | string | User location (optional)         |
| joinDate | Date   | Account creation date (optional) |

### Tab Interface

| Property | Type   | Description           |
| -------- | ------ | --------------------- |
| id       | string | Unique tab identifier |
| label    | string | Tab display label     |

## Key Features

- **Profile header** — Avatar, name, email, bio
- **Edit profile button** — Trigger edit mode
- **Logout button** — Account exit action
- **Tabbed interface** — Profile, Security, Settings sections
- **Profile tab** — Name, email, phone, location, join date
- **Security tab** — Password change and 2FA setup
- **Settings tab** — Notification and email preferences
- **Avatar placeholder** — Fallback with user initial
- **Error handling** — Error message display

## Usage Example

```tsx
import { ProfilePageTemplate } from "@orion-ds/react";

const [user, setUser] = useState({
  id: "1",
  name: "Jane Smith",
  email: "jane@example.com",
  avatar: "/avatars/jane.jpg",
  bio: "Product designer and developer",
  phone: "+1-555-0123",
  location: "San Francisco, CA",
  joinDate: new Date("2022-01-15"),
});

<ProfilePageTemplate
  user={user}
  onEditProfile={() => setEditMode(true)}
  onChangePassword={() => navigate("/change-password")}
  onLogout={() => logout()}
  activeTab="profile"
/>;
```

## Component Composition

Built with:

- `Card` — Header and tab content containers
- `Button` — Edit, logout, and action buttons
- Lucide Icons — Edit2, Lock, LogOut, Calendar, MapPin, Phone
- Tabbed interface — Custom button-based tabs
- Avatar — Image or initial fallback

## Accessibility

- Tab buttons have proper role semantics
- All text inputs have labels
- Icon buttons have aria-labels
- Tab selection is keyboard accessible
- User information is properly structured
- Error messages are announced

## Token Usage

- `--surface-base` — Page background
- `--surface-layer` — Card backgrounds
- `--text-primary` — User name and labels
- `--text-secondary` — Email and descriptions
- `--interactive-primary` — Edit and action buttons
- `--interactive-secondary` — Logout button
- `--border-subtle` — Tab separators
- `--spacing-4` — Card and section padding
- `--spacing-6` — Avatar spacing
- `--radius-sm` — Avatar border radius
