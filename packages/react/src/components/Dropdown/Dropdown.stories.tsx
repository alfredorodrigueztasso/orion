/**
 * Dropdown Component Stories
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown } from "./Dropdown";
import { Button } from "../Button";
import {
  Edit,
  Copy,
  Trash2,
  Settings,
  User,
  LogOut,
  HelpCircle,
  FileText,
  Download,
  Share,
} from "lucide-react";

const meta: Meta<typeof Dropdown> = {
  title: "Components/Overlays/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    placement: {
      control: "select",
      options: [
        "bottom-start",
        "bottom",
        "bottom-end",
        "top-start",
        "top",
        "top-end",
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

const basicItems = [
  { id: "edit", label: "Edit" },
  { id: "duplicate", label: "Duplicate" },
  { id: "archive", label: "Archive" },
  { id: "delete", label: "Delete", danger: true },
];

export const Default: Story = {
  args: {
    trigger: <Button variant="secondary">Options</Button>,
    items: basicItems,
  },
};

export const WithIcons: Story = {
  args: {
    trigger: <Button variant="secondary">Actions</Button>,
    items: [
      { id: "edit", label: "Edit", icon: <Edit size={16} /> },
      { id: "duplicate", label: "Duplicate", icon: <Copy size={16} /> },
      { id: "download", label: "Download", icon: <Download size={16} /> },
      { id: "share", label: "Share", icon: <Share size={16} /> },
      {
        id: "delete",
        label: "Delete",
        icon: <Trash2 size={16} />,
        danger: true,
      },
    ],
  },
};

export const WithShortcuts: Story = {
  args: {
    trigger: <Button variant="secondary">File</Button>,
    items: [
      {
        id: "new",
        label: "New File",
        shortcut: "⌘N",
        icon: <FileText size={16} />,
      },
      { id: "save", label: "Save", shortcut: "⌘S" },
      { id: "export", label: "Export", shortcut: "⌘E" },
      { id: "print", label: "Print", shortcut: "⌘P" },
    ],
  },
};

export const WithGroups: Story = {
  args: {
    trigger: <Button variant="secondary">Menu</Button>,
    groups: [
      {
        label: "Actions",
        items: [
          { id: "edit", label: "Edit", icon: <Edit size={16} /> },
          { id: "duplicate", label: "Duplicate", icon: <Copy size={16} /> },
        ],
      },
      {
        label: "Danger Zone",
        items: [
          {
            id: "delete",
            label: "Delete",
            icon: <Trash2 size={16} />,
            danger: true,
          },
        ],
      },
    ],
  },
};

export const UserMenu: Story = {
  args: {
    trigger: (
      <button
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--spacing-2)",
          padding: "var(--spacing-2) var(--spacing-3)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "var(--radius-sm)",
          background: "var(--surface-base)",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            width: "var(--spacing-8)",
            height: "var(--spacing-8)",
            borderRadius: "var(--radius-full)",
            background: "var(--interactive-primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--interactive-primary-text)",
            fontSize: "var(--font-size-14)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          JD
        </div>
        <span>John Doe</span>
      </button>
    ),
    groups: [
      {
        items: [
          { id: "profile", label: "Profile", icon: <User size={16} /> },
          { id: "settings", label: "Settings", icon: <Settings size={16} /> },
          {
            id: "help",
            label: "Help & Support",
            icon: <HelpCircle size={16} />,
          },
        ],
      },
      {
        items: [
          {
            id: "logout",
            label: "Log out",
            icon: <LogOut size={16} />,
            danger: true,
          },
        ],
      },
    ],
    placement: "bottom-end",
  },
};

export const WithDisabledItems: Story = {
  args: {
    trigger: <Button variant="secondary">Options</Button>,
    items: [
      { id: "edit", label: "Edit" },
      { id: "duplicate", label: "Duplicate", disabled: true },
      { id: "archive", label: "Archive", disabled: true },
      { id: "delete", label: "Delete", danger: true },
    ],
  },
};

export const TopPlacement: Story = {
  args: {
    trigger: <Button variant="secondary">Opens Up</Button>,
    items: basicItems,
    placement: "top-start",
  },
  decorators: [
    (Story) => (
      <div style={{ marginTop: "200px" }}>
        <Story />
      </div>
    ),
  ],
};

export const BottomEnd: Story = {
  args: {
    trigger: <Button variant="secondary">Bottom End</Button>,
    items: basicItems,
    placement: "bottom-end",
  },
};

export const WideMenu: Story = {
  args: {
    trigger: <Button variant="secondary">Wide Menu</Button>,
    items: [
      { id: "option1", label: "This is a very long option label" },
      { id: "option2", label: "Another long option with description" },
      { id: "option3", label: "Short" },
    ],
    minWidth: 280,
  },
};

export const ContextMenu: Story = {
  render: () => (
    <div
      style={{
        padding: "var(--spacing-12)",
        border: "1px dashed var(--border-subtle)",
        borderRadius: "var(--radius-sm)",
        textAlign: "center",
      }}
    >
      <Dropdown
        trigger={
          <div
            style={{
              padding: "var(--spacing-6)",
              background: "var(--surface-subtle)",
              borderRadius: "var(--radius-sm)",
              cursor: "context-menu",
            }}
          >
            Right-click or click here
          </div>
        }
        items={[
          { id: "cut", label: "Cut", shortcut: "⌘X" },
          { id: "copy", label: "Copy", shortcut: "⌘C" },
          { id: "paste", label: "Paste", shortcut: "⌘V" },
        ]}
      />
    </div>
  ),
};

export const MultipleDropdowns: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "var(--spacing-4)" }}>
      <Dropdown
        trigger={<Button variant="secondary">File</Button>}
        items={[
          { id: "new", label: "New" },
          { id: "open", label: "Open" },
          { id: "save", label: "Save" },
        ]}
      />
      <Dropdown
        trigger={<Button variant="secondary">Edit</Button>}
        items={[
          { id: "undo", label: "Undo" },
          { id: "redo", label: "Redo" },
          { id: "cut", label: "Cut" },
        ]}
      />
      <Dropdown
        trigger={<Button variant="secondary">View</Button>}
        items={[
          { id: "zoom-in", label: "Zoom In" },
          { id: "zoom-out", label: "Zoom Out" },
          { id: "fullscreen", label: "Fullscreen" },
        ]}
      />
    </div>
  ),
};
