import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Tabs } from "./Tabs";
import type { TabItem } from "./Tabs.types";
import { Field } from "../Field";
import { Button } from "../Button";
import { Checkbox } from "../Checkbox";

const meta = {
  title: "Components/Navigation/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    tabs: {
      description: "Array of tab items",
    },
    defaultTab: {
      control: "text",
      description: "Default active tab ID (uncontrolled)",
    },
    activeTab: {
      control: "text",
      description: "Active tab ID (controlled)",
    },
    fullWidth: {
      control: "boolean",
      description: "Full width tabs",
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const basicTabs: TabItem[] = [
  {
    id: "profile",
    label: "Profile",
    content: (
      <div style={{ padding: "var(--spacing-6)" }}>
        <h3
          style={{
            margin: "0 0 var(--spacing-4) 0",
            fontSize: "var(--font-size-18)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          Profile
        </h3>
        <p style={{ margin: 0, color: "var(--text-secondary)" }}>
          Manage your profile information
        </p>
      </div>
    ),
  },
  {
    id: "settings",
    label: "Settings",
    content: (
      <div style={{ padding: "var(--spacing-6)" }}>
        <h3
          style={{
            margin: "0 0 var(--spacing-4) 0",
            fontSize: "var(--font-size-18)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          Settings
        </h3>
        <p style={{ margin: 0, color: "var(--text-secondary)" }}>
          Configure your preferences
        </p>
      </div>
    ),
  },
  {
    id: "notifications",
    label: "Notifications",
    content: (
      <div style={{ padding: "var(--spacing-6)" }}>
        <h3
          style={{
            margin: "0 0 var(--spacing-4) 0",
            fontSize: "var(--font-size-18)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          Notifications
        </h3>
        <p style={{ margin: 0, color: "var(--text-secondary)" }}>
          Manage your notification settings
        </p>
      </div>
    ),
  },
];

export const Default: Story = {
  args: {
    tabs: basicTabs,
  },
  render: (args) => (
    <div style={{ width: "600px" }}>
      <Tabs {...args} />
    </div>
  ),
};

export const WithDefaultTab: Story = {
  args: {
    tabs: basicTabs,
    defaultTab: "settings",
  },
  render: (args) => (
    <div style={{ width: "600px" }}>
      <Tabs {...args} />
    </div>
  ),
};

export const FullWidth: Story = {
  args: {
    tabs: basicTabs,
    fullWidth: true,
  },
  render: (args) => (
    <div style={{ width: "600px" }}>
      <Tabs {...args} />
    </div>
  ),
};

export const WithIcons: Story = {
  args: { tabs: basicTabs },
  render: () => {
    const tabsWithIcons: TabItem[] = [
      {
        id: "home",
        label: "Home",
        icon: <span style={{ fontSize: "var(--font-size-18)" }}>🏠</span>,
        content: (
          <div style={{ padding: "var(--spacing-6)" }}>
            <h3
              style={{
                margin: "0 0 var(--spacing-4) 0",
                fontSize: "var(--font-size-18)",
                fontWeight: "var(--font-weight-medium)",
              }}
            >
              Home
            </h3>
            <p style={{ margin: 0, color: "var(--text-secondary)" }}>
              Welcome to your dashboard
            </p>
          </div>
        ),
      },
      {
        id: "search",
        label: "Search",
        icon: <span style={{ fontSize: "var(--font-size-18)" }}>🔍</span>,
        content: (
          <div style={{ padding: "var(--spacing-6)" }}>
            <h3
              style={{
                margin: "0 0 var(--spacing-4) 0",
                fontSize: "var(--font-size-18)",
                fontWeight: "var(--font-weight-medium)",
              }}
            >
              Search
            </h3>
            <p style={{ margin: 0, color: "var(--text-secondary)" }}>
              Find what you need
            </p>
          </div>
        ),
      },
      {
        id: "favorites",
        label: "Favorites",
        icon: <span style={{ fontSize: "var(--font-size-18)" }}>⭐</span>,
        content: (
          <div style={{ padding: "var(--spacing-6)" }}>
            <h3
              style={{
                margin: "0 0 var(--spacing-4) 0",
                fontSize: "var(--font-size-18)",
                fontWeight: "var(--font-weight-medium)",
              }}
            >
              Favorites
            </h3>
            <p style={{ margin: 0, color: "var(--text-secondary)" }}>
              Your saved items
            </p>
          </div>
        ),
      },
    ];

    return (
      <div style={{ width: "600px" }}>
        <Tabs tabs={tabsWithIcons} />
      </div>
    );
  },
};

export const WithBadges: Story = {
  args: { tabs: basicTabs },
  render: () => {
    const tabsWithBadges: TabItem[] = [
      {
        id: "inbox",
        label: "Inbox",
        badge: 12,
        content: (
          <div style={{ padding: "var(--spacing-6)" }}>
            <h3
              style={{
                margin: "0 0 var(--spacing-4) 0",
                fontSize: "var(--font-size-18)",
                fontWeight: "var(--font-weight-medium)",
              }}
            >
              Inbox
            </h3>
            <p style={{ margin: 0, color: "var(--text-secondary)" }}>
              You have 12 unread messages
            </p>
          </div>
        ),
      },
      {
        id: "sent",
        label: "Sent",
        content: (
          <div style={{ padding: "var(--spacing-6)" }}>
            <h3
              style={{
                margin: "0 0 var(--spacing-4) 0",
                fontSize: "var(--font-size-18)",
                fontWeight: "var(--font-weight-medium)",
              }}
            >
              Sent
            </h3>
            <p style={{ margin: 0, color: "var(--text-secondary)" }}>
              View your sent messages
            </p>
          </div>
        ),
      },
      {
        id: "drafts",
        label: "Drafts",
        badge: 3,
        content: (
          <div style={{ padding: "var(--spacing-6)" }}>
            <h3
              style={{
                margin: "0 0 var(--spacing-4) 0",
                fontSize: "var(--font-size-18)",
                fontWeight: "var(--font-weight-medium)",
              }}
            >
              Drafts
            </h3>
            <p style={{ margin: 0, color: "var(--text-secondary)" }}>
              You have 3 draft messages
            </p>
          </div>
        ),
      },
    ];

    return (
      <div style={{ width: "600px" }}>
        <Tabs tabs={tabsWithBadges} />
      </div>
    );
  },
};

export const WithDisabledTab: Story = {
  args: { tabs: basicTabs },
  render: () => {
    const tabsWithDisabled: TabItem[] = [
      {
        id: "general",
        label: "General",
        content: (
          <div style={{ padding: "var(--spacing-6)" }}>
            <h3
              style={{
                margin: "0 0 var(--spacing-4) 0",
                fontSize: "var(--font-size-18)",
                fontWeight: "var(--font-weight-medium)",
              }}
            >
              General
            </h3>
            <p style={{ margin: 0, color: "var(--text-secondary)" }}>
              General settings
            </p>
          </div>
        ),
      },
      {
        id: "security",
        label: "Security",
        content: (
          <div style={{ padding: "var(--spacing-6)" }}>
            <h3
              style={{
                margin: "0 0 var(--spacing-4) 0",
                fontSize: "var(--font-size-18)",
                fontWeight: "var(--font-weight-medium)",
              }}
            >
              Security
            </h3>
            <p style={{ margin: 0, color: "var(--text-secondary)" }}>
              Security settings
            </p>
          </div>
        ),
      },
      {
        id: "admin",
        label: "Admin",
        disabled: true,
        content: (
          <div style={{ padding: "var(--spacing-6)" }}>
            <h3
              style={{
                margin: "0 0 var(--spacing-4) 0",
                fontSize: "var(--font-size-18)",
                fontWeight: "var(--font-weight-medium)",
              }}
            >
              Admin
            </h3>
            <p style={{ margin: 0, color: "var(--text-secondary)" }}>
              Admin panel (requires permission)
            </p>
          </div>
        ),
      },
    ];

    return (
      <div style={{ width: "600px" }}>
        <Tabs tabs={tabsWithDisabled} />
      </div>
    );
  },
};

export const ControlledTabs: Story = {
  args: { tabs: basicTabs },
  render: () => {
    const [activeTab, setActiveTab] = useState("tab1");

    const controlledTabs: TabItem[] = [
      {
        id: "tab1",
        label: "Tab 1",
        content: (
          <div style={{ padding: "var(--spacing-6)" }}>
            <h3
              style={{
                margin: "0 0 var(--spacing-4) 0",
                fontSize: "var(--font-size-18)",
                fontWeight: "var(--font-weight-medium)",
              }}
            >
              Tab 1
            </h3>
            <p style={{ margin: 0, color: "var(--text-secondary)" }}>
              First tab content
            </p>
          </div>
        ),
      },
      {
        id: "tab2",
        label: "Tab 2",
        content: (
          <div style={{ padding: "var(--spacing-6)" }}>
            <h3
              style={{
                margin: "0 0 var(--spacing-4) 0",
                fontSize: "var(--font-size-18)",
                fontWeight: "var(--font-weight-medium)",
              }}
            >
              Tab 2
            </h3>
            <p style={{ margin: 0, color: "var(--text-secondary)" }}>
              Second tab content
            </p>
          </div>
        ),
      },
      {
        id: "tab3",
        label: "Tab 3",
        content: (
          <div style={{ padding: "var(--spacing-6)" }}>
            <h3
              style={{
                margin: "0 0 var(--spacing-4) 0",
                fontSize: "var(--font-size-18)",
                fontWeight: "var(--font-weight-medium)",
              }}
            >
              Tab 3
            </h3>
            <p style={{ margin: 0, color: "var(--text-secondary)" }}>
              Third tab content
            </p>
          </div>
        ),
      },
    ];

    return (
      <div style={{ width: "600px" }}>
        <Tabs
          tabs={controlledTabs}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
        <div
          style={{
            marginTop: "var(--spacing-4)",
            padding: "var(--spacing-4)",
            background: "var(--surface-subtle)",
            borderRadius: "var(--radius-sm)",
            fontSize: "var(--font-size-14)",
          }}
        >
          <strong>Current active tab:</strong> {activeTab}
        </div>
      </div>
    );
  },
};

export const AccountSettings: Story = {
  args: { tabs: basicTabs },
  render: () => {
    const settingsTabs: TabItem[] = [
      {
        id: "profile",
        label: "Profile",
        icon: <span>👤</span>,
        content: (
          <div style={{ padding: "var(--spacing-8)" }}>
            <h3
              style={{
                margin: "0 0 var(--spacing-6) 0",
                fontSize: "var(--font-size-18)",
                fontWeight: "var(--font-weight-medium)",
              }}
            >
              Profile Settings
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--spacing-4)",
              }}
            >
              <Field label="Display Name" type="text" defaultValue="John Doe" />
              <Field
                label="Email"
                type="email"
                defaultValue="john@example.com"
              />
            </div>
          </div>
        ),
      },
      {
        id: "security",
        label: "Security",
        icon: <span>🔒</span>,
        content: (
          <div style={{ padding: "var(--spacing-8)" }}>
            <h3
              style={{
                margin: "0 0 var(--spacing-6) 0",
                fontSize: "var(--font-size-18)",
                fontWeight: "var(--font-weight-medium)",
              }}
            >
              Security Settings
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--spacing-4)",
              }}
            >
              <Button
                variant="secondary"
                style={{ justifyContent: "flex-start" }}
              >
                Change Password
              </Button>
              <Button
                variant="secondary"
                style={{ justifyContent: "flex-start" }}
              >
                Enable Two-Factor Authentication
              </Button>
            </div>
          </div>
        ),
      },
      {
        id: "notifications",
        label: "Notifications",
        icon: <span>🔔</span>,
        badge: 5,
        content: (
          <div style={{ padding: "var(--spacing-8)" }}>
            <h3
              style={{
                margin: "0 0 var(--spacing-6) 0",
                fontSize: "var(--font-size-18)",
                fontWeight: "var(--font-weight-medium)",
              }}
            >
              Notification Preferences
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--spacing-4)",
              }}
            >
              <Checkbox label="Email notifications" defaultChecked />
              <Checkbox label="Push notifications" defaultChecked />
              <Checkbox label="SMS notifications" />
            </div>
          </div>
        ),
      },
    ];

    return (
      <div
        style={{
          width: "700px",
          border: "1px solid var(--border-subtle)",
          borderRadius: "var(--radius-control)",
        }}
      >
        <Tabs tabs={settingsTabs} />
      </div>
    );
  },
};

export const ProductDashboard: Story = {
  args: { tabs: basicTabs },
  render: () => {
    const dashboardTabs: TabItem[] = [
      {
        id: "overview",
        label: "Overview",
        content: (
          <div style={{ padding: "var(--spacing-8)" }}>
            <h3
              style={{
                margin: "0 0 var(--spacing-6) 0",
                fontSize: "var(--font-size-18)",
                fontWeight: "var(--font-weight-medium)",
              }}
            >
              Dashboard Overview
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "var(--spacing-4)",
              }}
            >
              {["Revenue", "Users", "Orders"].map((metric) => (
                <div
                  key={metric}
                  style={{
                    padding: "var(--spacing-6)",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border-subtle)",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "var(--font-size-24)",
                      fontWeight: "var(--font-weight-bold)",
                      marginBottom: "var(--spacing-2)",
                    }}
                  >
                    {Math.floor(Math.random() * 1000)}
                  </div>
                  <div
                    style={{
                      fontSize: "var(--font-size-14)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {metric}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ),
      },
      {
        id: "analytics",
        label: "Analytics",
        content: (
          <div style={{ padding: "var(--spacing-8)" }}>
            <h3
              style={{
                margin: "0 0 var(--spacing-4) 0",
                fontSize: "var(--font-size-18)",
                fontWeight: "var(--font-weight-medium)",
              }}
            >
              Analytics
            </h3>
            <p style={{ margin: 0, color: "var(--text-secondary)" }}>
              View detailed analytics and reports
            </p>
          </div>
        ),
      },
      {
        id: "reports",
        label: "Reports",
        badge: "3 new",
        content: (
          <div style={{ padding: "var(--spacing-8)" }}>
            <h3
              style={{
                margin: "0 0 var(--spacing-4) 0",
                fontSize: "var(--font-size-18)",
                fontWeight: "var(--font-weight-medium)",
              }}
            >
              Reports
            </h3>
            <p style={{ margin: 0, color: "var(--text-secondary)" }}>
              Access and download reports
            </p>
          </div>
        ),
      },
      {
        id: "export",
        label: "Export",
        disabled: true,
        content: (
          <div style={{ padding: "var(--spacing-8)" }}>
            <h3
              style={{
                margin: "0 0 var(--spacing-4) 0",
                fontSize: "var(--font-size-18)",
                fontWeight: "var(--font-weight-medium)",
              }}
            >
              Export Data
            </h3>
            <p style={{ margin: 0, color: "var(--text-secondary)" }}>
              Upgrade to access data export
            </p>
          </div>
        ),
      },
    ];

    return (
      <div
        style={{
          width: "800px",
          border: "1px solid var(--border-subtle)",
          borderRadius: "var(--radius-control)",
          background: "var(--surface-base)",
        }}
      >
        <Tabs tabs={dashboardTabs} />
      </div>
    );
  },
};

export const DocumentationPages: Story = {
  args: { tabs: basicTabs },
  render: () => {
    const docTabs: TabItem[] = [
      {
        id: "getting-started",
        label: "Getting Started",
        content: (
          <div
            style={{
              padding: "var(--spacing-8)",
              maxHeight: "400px",
              overflow: "auto",
            }}
          >
            <h3
              style={{
                margin: "0 0 var(--spacing-4) 0",
                fontSize: "var(--font-size-20)",
                fontWeight: "var(--font-weight-medium)",
              }}
            >
              Getting Started
            </h3>
            <p
              style={{
                margin: "0 0 var(--spacing-4) 0",
                color: "var(--text-secondary)",
                lineHeight: 1.6,
              }}
            >
              Welcome to the documentation. This guide will help you get started
              with our product.
            </p>
            <h4
              style={{
                margin: "var(--spacing-6) 0 var(--spacing-3) 0",
                fontSize: "var(--font-size-16)",
                fontWeight: "var(--font-weight-medium)",
              }}
            >
              Installation
            </h4>
            <pre
              style={{
                padding: "var(--spacing-4)",
                borderRadius: "var(--radius-sm)",
                background: "var(--surface-subtle)",
                fontSize: "var(--font-size-14)",
                overflow: "auto",
              }}
            >
              npm install @example/package
            </pre>
          </div>
        ),
      },
      {
        id: "api-reference",
        label: "API Reference",
        content: (
          <div style={{ padding: "var(--spacing-8)" }}>
            <h3
              style={{
                margin: "0 0 var(--spacing-4) 0",
                fontSize: "var(--font-size-20)",
                fontWeight: "var(--font-weight-medium)",
              }}
            >
              API Reference
            </h3>
            <p
              style={{
                margin: 0,
                color: "var(--text-secondary)",
                lineHeight: 1.6,
              }}
            >
              Complete API documentation with examples and best practices.
            </p>
          </div>
        ),
      },
      {
        id: "examples",
        label: "Examples",
        content: (
          <div style={{ padding: "var(--spacing-8)" }}>
            <h3
              style={{
                margin: "0 0 var(--spacing-4) 0",
                fontSize: "var(--font-size-20)",
                fontWeight: "var(--font-weight-medium)",
              }}
            >
              Examples
            </h3>
            <p
              style={{
                margin: 0,
                color: "var(--text-secondary)",
                lineHeight: 1.6,
              }}
            >
              Code examples and use cases to help you get started quickly.
            </p>
          </div>
        ),
      },
    ];

    return (
      <div
        style={{
          width: "700px",
          border: "1px solid var(--border-subtle)",
          borderRadius: "var(--radius-control)",
          background: "var(--surface-base)",
        }}
      >
        <Tabs tabs={docTabs} fullWidth />
      </div>
    );
  },
};

export const WithCustomStyling: Story = {
  args: {
    tabs: basicTabs,
    className: "custom-tabs",
  },
  render: (args) => (
    <div style={{ width: "600px" }}>
      <Tabs {...args} />
    </div>
  ),
};
