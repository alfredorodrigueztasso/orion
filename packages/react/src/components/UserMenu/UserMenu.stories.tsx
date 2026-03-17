import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  User,
  Settings,
  CreditCard,
  HelpCircle,
  LogOut,
  Moon,
  Bell,
  Shield,
} from "lucide-react";
import { UserMenu } from "./UserMenu";
import type { UserMenuSection } from "./UserMenu.types";

const meta: Meta<typeof UserMenu> = {
  title: "Sections/App/UserMenu",
  component: UserMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof UserMenu>;

// Sample user
const sampleUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "https://i.pravatar.cc/150?img=1",
  status: "online" as const,
  role: "Admin",
};

// Sample sections
const sampleSections: UserMenuSection[] = [
  {
    id: "account",
    items: [
      { id: "profile", label: "Profile", icon: <User size={18} /> },
      { id: "settings", label: "Settings", icon: <Settings size={18} /> },
      {
        id: "billing",
        label: "Billing",
        icon: <CreditCard size={18} />,
        href: "/billing",
      },
    ],
  },
  {
    id: "preferences",
    label: "Preferences",
    items: [
      { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
      { id: "appearance", label: "Dark mode", icon: <Moon size={18} /> },
      { id: "security", label: "Security", icon: <Shield size={18} /> },
    ],
  },
  {
    id: "support",
    items: [
      {
        id: "help",
        label: "Help & Support",
        icon: <HelpCircle size={18} />,
        href: "/help",
      },
      {
        id: "logout",
        label: "Sign out",
        icon: <LogOut size={18} />,
        danger: true,
      },
    ],
  },
];

/**
 * Default UserMenu with avatar and full info
 */
export const Default: Story = {
  args: {
    user: sampleUser,
    sections: sampleSections,
  },
};

/**
 * Interactive UserMenu
 */
export const Interactive: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    const handleItemClick = (itemId: string) => {
      if (itemId === "logout") {
        alert("Signing out...");
      } else {
        alert(`Clicked: ${itemId}`);
      }
    };

    const sections: UserMenuSection[] = [
      {
        id: "account",
        items: [
          {
            id: "profile",
            label: "Profile",
            icon: <User size={18} />,
            onClick: () => handleItemClick("profile"),
          },
          {
            id: "settings",
            label: "Settings",
            icon: <Settings size={18} />,
            onClick: () => handleItemClick("settings"),
          },
        ],
      },
      {
        id: "actions",
        items: [
          {
            id: "logout",
            label: "Sign out",
            icon: <LogOut size={18} />,
            danger: true,
            onClick: () => handleItemClick("logout"),
          },
        ],
      },
    ];

    return (
      <UserMenu
        user={sampleUser}
        sections={sections}
        open={open}
        onOpenChange={setOpen}
      />
    );
  },
};

/**
 * Compact mode (avatar only)
 */
export const Compact: Story = {
  args: {
    user: sampleUser,
    sections: sampleSections,
    compact: true,
  },
};

/**
 * Without avatar (initials only)
 */
export const WithoutAvatar: Story = {
  args: {
    user: {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      status: "away" as const,
    },
    sections: sampleSections,
  },
};

/**
 * With custom initials
 */
export const CustomInitials: Story = {
  args: {
    user: {
      name: "Organization Account",
      email: "admin@org.com",
      initials: "ORG",
    },
    sections: sampleSections,
  },
};

/**
 * Different status indicators
 */
export const StatusIndicators: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "var(--spacing-6)",
        alignItems: "flex-start",
      }}
    >
      <UserMenu
        user={{ ...sampleUser, status: "online" }}
        sections={sampleSections.slice(0, 1)}
        compact
      />
      <UserMenu
        user={{
          ...sampleUser,
          status: "away",
          avatar: "https://i.pravatar.cc/150?img=2",
        }}
        sections={sampleSections.slice(0, 1)}
        compact
      />
      <UserMenu
        user={{
          ...sampleUser,
          status: "busy",
          avatar: "https://i.pravatar.cc/150?img=3",
        }}
        sections={sampleSections.slice(0, 1)}
        compact
      />
      <UserMenu
        user={{
          ...sampleUser,
          status: "offline",
          avatar: "https://i.pravatar.cc/150?img=4",
        }}
        sections={sampleSections.slice(0, 1)}
        compact
      />
    </div>
  ),
};

/**
 * Without header in dropdown
 */
export const WithoutHeader: Story = {
  args: {
    user: sampleUser,
    sections: sampleSections,
    showHeader: false,
  },
};

/**
 * Aligned to start
 */
export const AlignStart: Story = {
  args: {
    user: sampleUser,
    sections: sampleSections,
    align: "start",
  },
  decorators: [
    (Story) => (
      <div style={{ paddingLeft: "200px" }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * With disabled items
 */
export const WithDisabledItems: Story = {
  args: {
    user: sampleUser,
    sections: [
      {
        id: "account",
        items: [
          { id: "profile", label: "Profile", icon: <User size={18} /> },
          {
            id: "settings",
            label: "Settings",
            icon: <Settings size={18} />,
            disabled: true,
          },
          {
            id: "billing",
            label: "Billing (Upgrade required)",
            icon: <CreditCard size={18} />,
            disabled: true,
          },
        ],
      },
      {
        id: "actions",
        items: [
          {
            id: "logout",
            label: "Sign out",
            icon: <LogOut size={18} />,
            danger: true,
          },
        ],
      },
    ],
  },
};

/**
 * Minimal sections
 */
export const Minimal: Story = {
  args: {
    user: {
      name: "Guest User",
      email: "guest@example.com",
    },
    sections: [
      {
        id: "actions",
        items: [
          { id: "settings", label: "Settings", icon: <Settings size={18} /> },
          { id: "logout", label: "Sign out", danger: true },
        ],
      },
    ],
    showHeader: false,
    compact: true,
  },
};
