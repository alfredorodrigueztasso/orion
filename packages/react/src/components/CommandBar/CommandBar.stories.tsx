import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Home,
  Folder,
  Users,
  Settings,
  Search,
  FileText,
  Plus,
  Download,
} from "lucide-react";
import { CommandBar } from "./CommandBar";

const meta: Meta<typeof CommandBar> = {
  title: "Sections/App/CommandBar",
  component: CommandBar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A command palette (Cmd+K) for quick navigation and actions. Optimized for Product Mode with keyboard-first interaction.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CommandBar>;

const sampleCommands = [
  {
    id: "home",
    label: "Go to Home",
    icon: <Home size={18} />,
    shortcut: "⌘H",
    category: "Navigation",
    onSelect: () => console.log("Home"),
  },
  {
    id: "projects",
    label: "Go to Projects",
    icon: <Folder size={18} />,
    category: "Navigation",
    onSelect: () => console.log("Projects"),
  },
  {
    id: "team",
    label: "Go to Team",
    icon: <Users size={18} />,
    category: "Navigation",
    onSelect: () => console.log("Team"),
  },
  {
    id: "settings",
    label: "Open Settings",
    icon: <Settings size={18} />,
    shortcut: "⌘,",
    category: "Navigation",
    onSelect: () => console.log("Settings"),
  },
  {
    id: "new-doc",
    label: "Create New Document",
    icon: <FileText size={18} />,
    shortcut: "⌘N",
    category: "Actions",
    onSelect: () => console.log("New Doc"),
  },
  {
    id: "new-project",
    label: "Create New Project",
    icon: <Plus size={18} />,
    category: "Actions",
    onSelect: () => console.log("New Project"),
  },
  {
    id: "export",
    label: "Export Data",
    icon: <Download size={18} />,
    category: "Actions",
    onSelect: () => console.log("Export"),
  },
  {
    id: "search",
    label: "Search Everything",
    icon: <Search size={18} />,
    shortcut: "⌘K",
    category: "Tools",
    onSelect: () => console.log("Search"),
  },
];

const InteractiveCommandBar = () => {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ padding: "var(--spacing-5)" }}>
      <p style={{ marginBottom: "var(--spacing-5)" }}>
        Press <kbd>⌘K</kbd> or <kbd>Ctrl+K</kbd> to open
      </p>
      <button onClick={() => setOpen(true)}>Open Command Bar</button>
      <CommandBar
        open={open}
        onOpenChange={setOpen}
        commands={sampleCommands}
        onSelect={(cmd) => console.log("Selected:", cmd)}
      />
    </div>
  );
};

export const Default: Story = {
  render: () => <InteractiveCommandBar />,
};

export const WithRecentCommands: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    const recentCommands = [
      {
        id: "projects",
        label: "Go to Projects",
        icon: <Folder size={18} />,
        onSelect: () => {},
      },
      {
        id: "settings",
        label: "Open Settings",
        icon: <Settings size={18} />,
        onSelect: () => {},
      },
    ];
    return (
      <CommandBar
        open={open}
        onOpenChange={setOpen}
        commands={sampleCommands}
        recentCommands={recentCommands}
      />
    );
  },
};

export const CustomPlaceholder: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <CommandBar
        open={open}
        onOpenChange={setOpen}
        commands={sampleCommands}
        placeholder="What would you like to do?"
        emptyMessage="No matching commands found."
      />
    );
  },
};

export const WithCustomFooter: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <CommandBar
        open={open}
        onOpenChange={setOpen}
        commands={sampleCommands}
        footer={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <span>Acme Inc Command Palette</span>
            <span>v1.0.0</span>
          </div>
        }
      />
    );
  },
};

export const FewCommands: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    const commands = [
      {
        id: "home",
        label: "Home",
        icon: <Home size={18} />,
        onSelect: () => {},
      },
      {
        id: "settings",
        label: "Settings",
        icon: <Settings size={18} />,
        onSelect: () => {},
      },
    ];
    return (
      <CommandBar open={open} onOpenChange={setOpen} commands={commands} />
    );
  },
};
