import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { DetailPanel } from "./DetailPanel";
import { Button } from "@orion-ds/react";
import { Field } from "@orion-ds/react";

const meta: Meta<typeof DetailPanel> = {
  title: "Sections/App/DetailPanel",
  component: DetailPanel,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A slide-over panel for viewing and editing entity details. Optimized for Product Mode with focused interactions.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
    },
    position: {
      control: "select",
      options: ["right", "left"],
    },
    overlay: { control: "boolean" },
    closeOnOverlayClick: { control: "boolean" },
    closeOnEscape: { control: "boolean" },
    loading: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof DetailPanel>;

const InteractivePanel = (args: React.ComponentProps<typeof DetailPanel>) => {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ padding: "var(--spacing-5)", height: "100vh" }}>
      <Button onClick={() => setOpen(true)}>Open Panel</Button>
      <DetailPanel {...args} open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <InteractivePanel {...args} />,
  args: {
    title: "User Details",
    subtitle: "View and edit user information",
    children: (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-4)",
        }}
      >
        <Field label="Name" type="text" defaultValue="John Doe" />
        <Field label="Email" type="email" defaultValue="john@example.com" />
        <Field label="Role" type="select" />
        <Field
          label="Bio"
          type="textarea"
          defaultValue="Software developer with 5+ years of experience."
        />
      </div>
    ),
    footer: (
      <>
        <Button variant="secondary">Cancel</Button>
        <Button>Save Changes</Button>
      </>
    ),
  },
};

export const SmallSize: Story = {
  render: (args) => <InteractivePanel {...args} />,
  args: {
    title: "Quick Edit",
    size: "sm",
    children: (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-4)",
        }}
      >
        <Field label="Name" type="text" />
        <Field label="Status" type="select" />
      </div>
    ),
    footer: <Button style={{ width: "100%" }}>Save</Button>,
  },
};

export const LargeSize: Story = {
  render: (args) => <InteractivePanel {...args} />,
  args: {
    title: "Project Overview",
    subtitle: "Complete project details and settings",
    size: "lg",
    children: (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-6)",
        }}
      >
        <div>
          <h3 style={{ marginBottom: "var(--spacing-3)" }}>
            General Information
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "var(--spacing-4)",
            }}
          >
            <Field
              label="Project Name"
              type="text"
              defaultValue="Acme Website Redesign"
            />
            <Field label="Status" type="select" />
            <Field label="Start Date" type="text" defaultValue="2024-01-01" />
            <Field label="Due Date" type="text" defaultValue="2024-03-31" />
          </div>
        </div>
        <div>
          <h3 style={{ marginBottom: "var(--spacing-3)" }}>Description</h3>
          <Field
            type="textarea"
            defaultValue="Complete redesign of the company website with new branding guidelines."
          />
        </div>
      </div>
    ),
    footer: (
      <>
        <Button variant="secondary">Cancel</Button>
        <Button>Save Changes</Button>
      </>
    ),
  },
};

export const LeftPosition: Story = {
  render: (args) => <InteractivePanel {...args} />,
  args: {
    title: "Navigation",
    position: "left",
    children: (
      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-2)",
        }}
      >
        <a
          href="#"
          style={{
            padding: "var(--spacing-3)",
            background: "var(--surface-subtle)",
            borderRadius: "var(--radius-sm)",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          Dashboard
        </a>
        <a
          href="#"
          style={{
            padding: "var(--spacing-3)",
            background: "var(--surface-subtle)",
            borderRadius: "var(--radius-sm)",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          Projects
        </a>
        <a
          href="#"
          style={{
            padding: "var(--spacing-3)",
            background: "var(--surface-subtle)",
            borderRadius: "var(--radius-sm)",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          Team
        </a>
        <a
          href="#"
          style={{
            padding: "var(--spacing-3)",
            background: "var(--surface-subtle)",
            borderRadius: "var(--radius-sm)",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          Settings
        </a>
      </nav>
    ),
  },
};

export const WithHeaderActions: Story = {
  render: (args) => <InteractivePanel {...args} />,
  args: {
    title: "Document",
    subtitle: "contract-v2.pdf",
    headerActions: (
      <>
        <Button
          variant="ghost"
          size="sm"
          iconOnly
          icon={<Edit size={16} />}
          aria-label="Edit"
        />
        <Button
          variant="ghost"
          size="sm"
          iconOnly
          icon={<Trash2 size={16} />}
          aria-label="Delete"
        />
      </>
    ),
    children: (
      <div
        style={{
          padding: "var(--spacing-10)",
          textAlign: "center",
          color: "var(--text-secondary)",
        }}
      >
        Document preview would appear here
      </div>
    ),
  },
};

export const Loading: Story = {
  render: (args) => <InteractivePanel {...args} />,
  args: {
    title: "Loading...",
    loading: true,
    children: null,
  },
};

export const NoOverlay: Story = {
  render: (args) => <InteractivePanel {...args} />,
  args: {
    title: "Side Panel",
    overlay: false,
    children: (
      <p>
        This panel has no overlay backdrop. You can interact with the content
        behind it.
      </p>
    ),
  },
};
