/**
 * List Component Stories
 */

import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  User,
  Mail,
  Settings,
  Bell,
  Shield,
  HelpCircle,
  ChevronRight,
  Star,
} from "lucide-react";
import { List } from "./List";
import { Badge } from "../Badge";
import { Avatar } from "../Avatar";

const meta: Meta<typeof List> = {
  title: "Components/Data Display/List",
  component: List,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
    },
    variant: {
      control: "radio",
      options: ["default", "bordered", "divided"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof List>;

const basicItems = [
  { id: "1", primary: "Dashboard" },
  { id: "2", primary: "Settings" },
  { id: "3", primary: "Profile" },
  { id: "4", primary: "Notifications" },
];

const detailedItems = [
  { id: "1", primary: "John Doe", secondary: "john.doe@example.com" },
  { id: "2", primary: "Jane Smith", secondary: "jane.smith@example.com" },
  { id: "3", primary: "Bob Johnson", secondary: "bob.johnson@example.com" },
];

export const Default: Story = {
  args: {
    items: basicItems,
  },
};

export const WithSecondary: Story = {
  args: {
    items: detailedItems,
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      {
        id: "1",
        primary: "Profile",
        secondary: "Manage your account",
        leading: <User size={20} />,
      },
      {
        id: "2",
        primary: "Email",
        secondary: "Email preferences",
        leading: <Mail size={20} />,
      },
      {
        id: "3",
        primary: "Settings",
        secondary: "App configuration",
        leading: <Settings size={20} />,
      },
      {
        id: "4",
        primary: "Notifications",
        secondary: "Push & email",
        leading: <Bell size={20} />,
      },
    ],
    variant: "bordered",
  },
};

export const Interactive: Story = {
  render: () => {
    const items = [
      {
        id: "1",
        primary: "Profile",
        leading: <User size={20} />,
        trailing: <ChevronRight size={16} />,
      },
      {
        id: "2",
        primary: "Security",
        leading: <Shield size={20} />,
        trailing: <ChevronRight size={16} />,
      },
      {
        id: "3",
        primary: "Notifications",
        leading: <Bell size={20} />,
        trailing: <ChevronRight size={16} />,
      },
      {
        id: "4",
        primary: "Help & Support",
        leading: <HelpCircle size={20} />,
        trailing: <ChevronRight size={16} />,
      },
    ];

    return (
      <div style={{ width: "300px" }}>
        <List
          items={items.map((item) => ({
            ...item,
            onClick: () => console.log(`Clicked: ${item.primary}`),
          }))}
          variant="bordered"
          interactive
        />
      </div>
    );
  },
};

export const Selectable: Story = {
  render: () => {
    const [selectedId, setSelectedId] = useState<string | null>("1");

    const items = [
      { id: "1", primary: "Option 1", secondary: "First option" },
      { id: "2", primary: "Option 2", secondary: "Second option" },
      { id: "3", primary: "Option 3", secondary: "Third option" },
      {
        id: "4",
        primary: "Option 4",
        secondary: "Fourth option",
        disabled: true,
      },
    ].map((item) => ({
      ...item,
      selected: item.id === selectedId,
    }));

    return (
      <div style={{ width: "300px" }}>
        <List
          items={items}
          variant="bordered"
          selectable
          onSelect={(item) => setSelectedId(item.id)}
        />
      </div>
    );
  },
};

export const WithAvatars: Story = {
  args: {
    items: [
      {
        id: "1",
        primary: "Alice Cooper",
        secondary: "Product Designer",
        leading: <Avatar initials="AC" size="sm" />,
      },
      {
        id: "2",
        primary: "Bob Martin",
        secondary: "Software Engineer",
        leading: <Avatar initials="BM" size="sm" />,
      },
      {
        id: "3",
        primary: "Carol White",
        secondary: "Project Manager",
        leading: <Avatar initials="CW" size="sm" />,
      },
    ],
    variant: "divided",
  },
};

export const WithTrailingBadges: Story = {
  args: {
    items: [
      {
        id: "1",
        primary: "Inbox",
        leading: <Mail size={20} />,
        trailing: <Badge variant="primary">12</Badge>,
      },
      {
        id: "2",
        primary: "Notifications",
        leading: <Bell size={20} />,
        trailing: <Badge variant="warning">3</Badge>,
      },
      { id: "3", primary: "Settings", leading: <Settings size={20} /> },
      {
        id: "4",
        primary: "Security",
        leading: <Shield size={20} />,
        trailing: <Badge variant="success">OK</Badge>,
      },
    ],
    variant: "bordered",
    interactive: true,
  },
};

export const SmallSize: Story = {
  args: {
    items: basicItems,
    size: "sm",
    variant: "bordered",
  },
};

export const LargeSize: Story = {
  args: {
    items: detailedItems,
    size: "lg",
    variant: "bordered",
  },
};

export const Bordered: Story = {
  args: {
    items: basicItems,
    variant: "bordered",
  },
};

export const Divided: Story = {
  args: {
    items: basicItems,
    variant: "divided",
  },
};

export const WithDisabledItems: Story = {
  args: {
    items: [
      { id: "1", primary: "Active item 1" },
      { id: "2", primary: "Disabled item", disabled: true },
      { id: "3", primary: "Active item 2" },
      { id: "4", primary: "Another disabled", disabled: true },
    ],
    variant: "bordered",
    interactive: true,
  },
};

export const EmptyState: Story = {
  args: {
    items: [],
    emptyContent: (
      <div style={{ padding: "var(--spacing-8)", textAlign: "center" }}>
        <p
          style={{
            marginBottom: "var(--spacing-2)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          No items found
        </p>
        <p
          style={{
            fontSize: "var(--font-size-14)",
            color: "var(--text-secondary)",
          }}
        >
          Try adjusting your search or filters
        </p>
      </div>
    ),
  },
};

export const CustomRender: Story = {
  render: () => {
    const items = [
      {
        id: "1",
        primary: "React",
        secondary: "A JavaScript library for building user interfaces",
      },
      {
        id: "2",
        primary: "Vue",
        secondary: "The Progressive JavaScript Framework",
      },
      {
        id: "3",
        primary: "Angular",
        secondary: "The modern web developer platform",
      },
    ];

    return (
      <div style={{ width: "400px" }}>
        <List
          items={items}
          variant="bordered"
          renderItem={(item) => (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--spacing-3)",
                padding: "var(--spacing-3)",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "var(--radius-sm)",
                  background: "var(--interactive-primary-subtle)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Star size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: "var(--font-weight-medium)" }}>
                  {item.primary}
                </div>
                <div
                  style={{
                    fontSize: "var(--font-size-14)",
                    color: "var(--text-secondary)",
                  }}
                >
                  {item.secondary}
                </div>
              </div>
            </div>
          )}
        />
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-6)",
        width: "300px",
      }}
    >
      <div>
        <h4 style={{ marginBottom: "var(--spacing-2)" }}>Default</h4>
        <List items={basicItems} variant="default" />
      </div>
      <div>
        <h4 style={{ marginBottom: "var(--spacing-2)" }}>Bordered</h4>
        <List items={basicItems} variant="bordered" />
      </div>
      <div>
        <h4 style={{ marginBottom: "var(--spacing-2)" }}>Divided</h4>
        <List items={basicItems} variant="divided" />
      </div>
    </div>
  ),
};
