import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Home,
  Folder,
  Users,
  Settings,
  BarChart2,
  Mail,
  Calendar,
  FileText,
  HelpCircle,
  LogOut,
  Search,
  Plus,
  Box,
  ChevronDown,
} from "lucide-react";
import { Sidebar } from "./Sidebar";
import { Button } from "@orion-ds/react";
import { Dropdown } from "@orion-ds/react";

const meta: Meta<typeof Sidebar> = {
  title: "Sections/App/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A collapsible navigation sidebar for SaaS applications. Optimized for Product Mode with efficient space usage and clear hierarchy.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "floating"],
    },
    collapsed: { control: "boolean" },
    width: { control: "number" },
    collapsedWidth: { control: "number" },
  },
  decorators: [
    (Story) => (
      <div style={{ height: "600px", display: "flex" }}>
        <Story />
        <div
          style={{
            flex: 1,
            padding: "var(--spacing-6)",
            background: "var(--surface-subtle)",
          }}
        >
          <p>Main content area</p>
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

const defaultSections = [
  {
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: <Home size={20} />,
        href: "#",
      },
      {
        id: "projects",
        label: "Projects",
        icon: <Folder size={20} />,
        href: "#",
        badge: "12",
      },
      { id: "team", label: "Team", icon: <Users size={20} />, href: "#" },
      {
        id: "analytics",
        label: "Analytics",
        icon: <BarChart2 size={20} />,
        href: "#",
      },
    ],
  },
  {
    title: "Communication",
    items: [
      {
        id: "messages",
        label: "Messages",
        icon: <Mail size={20} />,
        href: "#",
        badge: "3",
      },
      {
        id: "calendar",
        label: "Calendar",
        icon: <Calendar size={20} />,
        href: "#",
      },
    ],
  },
  {
    title: "Other",
    items: [
      {
        id: "documents",
        label: "Documents",
        icon: <FileText size={20} />,
        href: "#",
      },
      {
        id: "settings",
        label: "Settings",
        icon: <Settings size={20} />,
        href: "#",
      },
    ],
  },
];

export const Default: Story = {
  args: {
    sections: defaultSections,
    activeItem: "dashboard",
    header: (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--spacing-2)",
        }}
      >
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "var(--radius-sm)",
            background: "var(--interactive-primary)",
          }}
        />
        <span style={{ fontWeight: "var(--font-weight-medium)" }}>
          Acme Inc
        </span>
      </div>
    ),
  },
};

export const WithCollapse: Story = {
  render: (args) => {
    const [collapsed, setCollapsed] = useState(false);
    return (
      <Sidebar
        {...args}
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
      />
    );
  },
  args: {
    sections: defaultSections,
    activeItem: "projects",
    header: (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--spacing-2)",
        }}
      >
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "var(--radius-sm)",
            background: "var(--interactive-primary)",
          }}
        />
        <span style={{ fontWeight: "var(--font-weight-medium)" }}>
          Acme Inc
        </span>
      </div>
    ),
  },
};

export const Collapsed: Story = {
  args: {
    sections: defaultSections,
    activeItem: "dashboard",
    collapsed: true,
  },
};

export const WithFooter: Story = {
  args: {
    sections: defaultSections,
    activeItem: "dashboard",
    header: (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--spacing-2)",
        }}
      >
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "var(--radius-sm)",
            background: "var(--interactive-primary)",
          }}
        />
        <span style={{ fontWeight: "var(--font-weight-medium)" }}>
          Acme Inc
        </span>
      </div>
    ),
    footer: (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-2)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--spacing-3)",
            padding: "var(--spacing-2)",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "var(--surface-subtle)",
            }}
          />
          <div>
            <div
              style={{
                fontWeight: "var(--font-weight-medium)",
                fontSize: "var(--font-size-14)",
              }}
            >
              John Doe
            </div>
            <div
              style={{
                fontSize: "var(--font-size-12)",
                color: "var(--text-secondary)",
              }}
            >
              Admin
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          style={{ width: "100%", justifyContent: "flex-start" }}
        >
          <LogOut size={16} />
          <span>Sign out</span>
        </Button>
      </div>
    ),
  },
};

export const WithNestedItems: Story = {
  args: {
    sections: [
      {
        items: [
          {
            id: "dashboard",
            label: "Dashboard",
            icon: <Home size={20} />,
            href: "#",
          },
          {
            id: "projects",
            label: "Projects",
            icon: <Folder size={20} />,
            children: [
              { id: "active", label: "Active", href: "#" },
              { id: "archived", label: "Archived", href: "#" },
              { id: "drafts", label: "Drafts", href: "#" },
            ],
          },
          {
            id: "reports",
            label: "Reports",
            icon: <BarChart2 size={20} />,
            children: [
              { id: "sales", label: "Sales", href: "#" },
              { id: "traffic", label: "Traffic", href: "#" },
              { id: "users", label: "Users", href: "#" },
            ],
          },
        ],
      },
      {
        title: "Settings",
        items: [
          {
            id: "account",
            label: "Account",
            icon: <Settings size={20} />,
            href: "#",
          },
          {
            id: "help",
            label: "Help",
            icon: <HelpCircle size={20} />,
            href: "#",
          },
        ],
      },
    ],
    activeItem: "dashboard",
  },
};

export const WithDisabledItems: Story = {
  args: {
    sections: [
      {
        items: [
          {
            id: "dashboard",
            label: "Dashboard",
            icon: <Home size={20} />,
            href: "#",
          },
          {
            id: "projects",
            label: "Projects",
            icon: <Folder size={20} />,
            href: "#",
          },
          {
            id: "premium",
            label: "Premium Features",
            icon: <BarChart2 size={20} />,
            href: "#",
            disabled: true,
            badge: "Pro",
          },
        ],
      },
    ],
    activeItem: "dashboard",
  },
};

export const CustomHeader: Story = {
  args: {
    sections: defaultSections,
    activeItem: "dashboard",
    header: (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-3)",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontWeight: "var(--font-weight-medium)",
              fontSize: "var(--font-size-18)",
            }}
          >
            Workspace
          </span>
          <Button variant="ghost" size="sm" iconOnly aria-label="Add">
            <Plus size={16} />
          </Button>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--spacing-2)",
            padding: "var(--spacing-2) var(--spacing-3)",
            background: "var(--surface-subtle)",
            borderRadius: "var(--radius-sm)",
            fontSize: "var(--font-size-14)",
            color: "var(--text-secondary)",
          }}
        >
          <Search size={14} />
          <span>Search...</span>
        </div>
      </div>
    ),
  },
};

export const Floating: Story = {
  args: {
    variant: "floating",
    sections: defaultSections,
    activeItem: "dashboard",
    header: (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--spacing-2)",
        }}
      >
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "var(--radius-sm)",
            background: "var(--interactive-primary)",
          }}
        />
        <span style={{ fontWeight: "var(--font-weight-medium)" }}>
          Acme Inc
        </span>
      </div>
    ),
  },
  decorators: [
    (Story) => (
      <div
        style={{
          height: "600px",
          display: "flex",
          padding: "0",
          background: "var(--surface-subtle)",
        }}
      >
        <Story />
        <div style={{ flex: 1, padding: "var(--spacing-6)" }}>
          <p>Main content area</p>
        </div>
      </div>
    ),
  ],
};

// Header Variant Stories

export const WithoutHeader: Story = {
  args: {
    sections: defaultSections,
    activeItem: "dashboard",
  },
};

export const WithLogo: Story = {
  args: {
    header: (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--spacing-2)",
        }}
      >
        <Box size={24} />
        <span
          style={{
            fontWeight: "var(--font-weight-medium)",
            fontSize: "var(--font-size-16)",
          }}
        >
          Acme Inc
        </span>
      </div>
    ),
    sections: defaultSections,
    activeItem: "dashboard",
  },
};

export const WithDropdown: Story = {
  args: {
    header: (
      <Dropdown
        trigger={
          <Button variant="ghost" iconRight={<ChevronDown size={16} />}>
            Workspace
          </Button>
        }
        items={[
          { id: "ws1", label: "Personal" },
          { id: "ws2", label: "Team" },
          { id: "ws3", label: "Enterprise" },
        ]}
      />
    ),
    sections: defaultSections,
    activeItem: "dashboard",
  },
};

export const WithLogoAndActions: Story = {
  args: {
    header: (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--spacing-2)",
          }}
        >
          <Box size={24} />
          <span style={{ fontWeight: "var(--font-weight-medium)" }}>Acme</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconOnly
          icon={<Settings size={18} />}
          aria-label="Settings"
        />
      </div>
    ),
    sections: defaultSections,
    activeItem: "dashboard",
  },
};
