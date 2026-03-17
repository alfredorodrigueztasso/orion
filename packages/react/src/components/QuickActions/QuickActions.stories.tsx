import type { Meta, StoryObj } from "@storybook/react";
import {
  Plus,
  Upload,
  FileText,
  Mail,
  Edit,
  Trash2,
  Download,
  Share2,
} from "lucide-react";
import { QuickActions } from "./QuickActions";

const meta: Meta<typeof QuickActions> = {
  title: "Sections/App/QuickActions",
  component: QuickActions,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A FAB or floating action bar for quick access to common actions. Optimized for Product Mode with efficient action access.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["fab", "bar", "menu"],
    },
    position: {
      control: "select",
      options: [
        "bottom-right",
        "bottom-left",
        "bottom-center",
        "top-right",
        "top-left",
      ],
    },
    fixed: { control: "boolean" },
    showLabels: { control: "boolean" },
    offset: { control: "number" },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          height: "400px",
          position: "relative",
          background: "var(--surface-subtle)",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof QuickActions>;

const sampleActions = [
  {
    id: "new",
    label: "New Document",
    icon: <FileText size={18} />,
    onClick: () => console.log("New"),
  },
  {
    id: "upload",
    label: "Upload File",
    icon: <Upload size={18} />,
    onClick: () => console.log("Upload"),
  },
  {
    id: "email",
    label: "Send Email",
    icon: <Mail size={18} />,
    onClick: () => console.log("Email"),
  },
];

export const FAB: Story = {
  args: {
    variant: "fab",
    actions: sampleActions,
    position: "bottom-right",
  },
};

export const FABWithLabels: Story = {
  args: {
    variant: "fab",
    actions: sampleActions,
    position: "bottom-right",
    showLabels: true,
  },
};

export const Bar: Story = {
  args: {
    variant: "bar",
    actions: sampleActions,
    position: "bottom-center",
  },
};

export const BarWithShortcuts: Story = {
  args: {
    variant: "bar",
    actions: [
      {
        id: "new",
        label: "New",
        icon: <Plus size={18} />,
        shortcut: "⌘N",
        onClick: () => {},
      },
      {
        id: "edit",
        label: "Edit",
        icon: <Edit size={18} />,
        shortcut: "⌘E",
        onClick: () => {},
      },
      {
        id: "share",
        label: "Share",
        icon: <Share2 size={18} />,
        shortcut: "⌘S",
        onClick: () => {},
      },
    ],
    position: "bottom-center",
  },
};

export const Menu: Story = {
  args: {
    variant: "menu",
    actions: sampleActions,
    position: "bottom-right",
  },
};

export const MenuWithShortcuts: Story = {
  args: {
    variant: "menu",
    actions: [
      {
        id: "new",
        label: "New Document",
        icon: <FileText size={18} />,
        shortcut: "⌘N",
        onClick: () => {},
      },
      {
        id: "upload",
        label: "Upload",
        icon: <Upload size={18} />,
        shortcut: "⌘U",
        onClick: () => {},
      },
      {
        id: "download",
        label: "Download",
        icon: <Download size={18} />,
        shortcut: "⌘D",
        onClick: () => {},
      },
    ],
    position: "bottom-right",
  },
};

export const BottomLeft: Story = {
  args: {
    variant: "fab",
    actions: sampleActions,
    position: "bottom-left",
  },
};

export const TopRight: Story = {
  args: {
    variant: "fab",
    actions: sampleActions,
    position: "top-right",
  },
};

export const WithVariants: Story = {
  args: {
    variant: "menu",
    actions: [
      {
        id: "edit",
        label: "Edit",
        icon: <Edit size={18} />,
        variant: "default",
        onClick: () => {},
      },
      {
        id: "duplicate",
        label: "Duplicate",
        icon: <FileText size={18} />,
        variant: "primary",
        onClick: () => {},
      },
      {
        id: "delete",
        label: "Delete",
        icon: <Trash2 size={18} />,
        variant: "danger",
        onClick: () => {},
      },
    ],
    position: "bottom-right",
  },
};

export const WithDisabled: Story = {
  args: {
    variant: "fab",
    actions: [
      { id: "new", label: "New", icon: <Plus size={18} />, onClick: () => {} },
      {
        id: "upload",
        label: "Upload",
        icon: <Upload size={18} />,
        onClick: () => {},
        disabled: true,
      },
      {
        id: "email",
        label: "Email",
        icon: <Mail size={18} />,
        onClick: () => {},
      },
    ],
    position: "bottom-right",
    showLabels: true,
  },
};

export const CustomOffset: Story = {
  args: {
    variant: "fab",
    actions: sampleActions,
    position: "bottom-right",
    offset: 48,
  },
};

export const NotFixed: Story = {
  args: {
    variant: "bar",
    actions: sampleActions,
    position: "bottom-center",
    fixed: false,
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          height: "400px",
          padding: "var(--spacing-6)",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const CustomTriggerIcon: Story = {
  args: {
    variant: "fab",
    actions: sampleActions,
    triggerIcon: <Edit size={24} />,
    position: "bottom-right",
  },
};
