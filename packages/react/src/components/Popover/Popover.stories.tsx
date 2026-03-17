/**
 * Popover Component Stories
 */

import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Popover } from "./Popover";
import { Button } from "../Button";

const meta: Meta<typeof Popover> = {
  title: "Components/Overlays/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    placement: {
      control: "select",
      options: [
        "top",
        "top-start",
        "top-end",
        "bottom",
        "bottom-start",
        "bottom-end",
        "left",
        "left-start",
        "left-end",
        "right",
        "right-start",
        "right-end",
      ],
    },
    triggerType: {
      control: "radio",
      options: ["click", "hover", "focus", "manual"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  args: {
    trigger: <Button>Click me</Button>,
    content: (
      <div>
        <p style={{ margin: 0 }}>This is the popover content.</p>
      </div>
    ),
  },
};

export const TopPlacement: Story = {
  args: {
    trigger: <Button>Top Popover</Button>,
    content: <p style={{ margin: 0 }}>Popover appears above</p>,
    placement: "top",
  },
};

export const LeftPlacement: Story = {
  args: {
    trigger: <Button>Left Popover</Button>,
    content: <p style={{ margin: 0 }}>Popover appears to the left</p>,
    placement: "left",
  },
};

export const RightPlacement: Story = {
  args: {
    trigger: <Button>Right Popover</Button>,
    content: <p style={{ margin: 0 }}>Popover appears to the right</p>,
    placement: "right",
  },
};

export const HoverTrigger: Story = {
  args: {
    trigger: <Button>Hover me</Button>,
    content: <p style={{ margin: 0 }}>This appears on hover</p>,
    triggerType: "hover",
  },
};

export const FocusTrigger: Story = {
  args: {
    trigger: <Button>Focus me</Button>,
    content: <p style={{ margin: 0 }}>This appears on focus</p>,
    triggerType: "focus",
  },
};

export const WithoutArrow: Story = {
  args: {
    trigger: <Button>No Arrow</Button>,
    content: <p style={{ margin: 0 }}>Popover without arrow</p>,
    showArrow: false,
  },
};

export const RichContent: Story = {
  args: {
    trigger: <Button>View Details</Button>,
    content: (
      <div>
        <h4
          style={{
            margin: "0 0 var(--spacing-2) 0",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          User Profile
        </h4>
        <p
          style={{
            margin: "0 0 var(--spacing-2) 0",
            fontSize: "var(--font-size-14)",
            color: "var(--text-secondary)",
          }}
        >
          John Doe
        </p>
        <p
          style={{
            margin: "0 0 var(--spacing-3) 0",
            fontSize: "var(--font-size-12)",
            color: "var(--text-tertiary)",
          }}
        >
          john.doe@example.com
        </p>
        <Button size="sm" variant="secondary" fullWidth>
          View Full Profile
        </Button>
      </div>
    ),
  },
};

export const ControlledPopover: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div
        style={{
          display: "flex",
          gap: "var(--spacing-3)",
          alignItems: "center",
        }}
      >
        <Button variant="secondary" onClick={() => setOpen(!open)}>
          Toggle: {open ? "Open" : "Closed"}
        </Button>
        <Popover
          trigger={<Button>Controlled</Button>}
          content={<p style={{ margin: 0 }}>This is controlled externally</p>}
          open={open}
          onOpenChange={setOpen}
          triggerType="manual"
        />
      </div>
    );
  },
};

export const AllPlacements: Story = {
  render: () => {
    const placements = [
      "top-start",
      "top",
      "top-end",
      "left-start",
      "left",
      "left-end",
      "right-start",
      "right",
      "right-end",
      "bottom-start",
      "bottom",
      "bottom-end",
    ] as const;

    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "var(--spacing-12)",
          padding: "var(--spacing-24)",
        }}
      >
        {placements.map((placement) => (
          <Popover
            key={placement}
            trigger={<Button size="sm">{placement}</Button>}
            content={
              <p style={{ margin: 0, fontSize: "var(--font-size-12)" }}>
                {placement}
              </p>
            }
            placement={placement}
          />
        ))}
      </div>
    );
  },
};

export const MenuExample: Story = {
  render: () => (
    <Popover
      trigger={<Button variant="secondary">Options</Button>}
      content={
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-1)",
            margin: "calc(var(--spacing-2) * -1)",
          }}
        >
          {["Edit", "Duplicate", "Archive", "Delete"].map((action) => (
            <button
              key={action}
              style={{
                padding: "var(--spacing-2) var(--spacing-3)",
                textAlign: "left",
                background: "none",
                border: "none",
                cursor: "pointer",
                borderRadius: "var(--radius-sm)",
                fontSize: "var(--font-size-14)",
                color:
                  action === "Delete"
                    ? "var(--status-error)"
                    : "var(--text-primary)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--surface-subtle)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "none";
              }}
            >
              {action}
            </button>
          ))}
        </div>
      }
      placement="bottom-start"
      showArrow={false}
    />
  ),
};

export const TooltipLike: Story = {
  render: () => (
    <Popover
      trigger={
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            background: "var(--surface-subtle)",
            fontSize: "var(--font-size-12)",
            cursor: "help",
          }}
        >
          ?
        </span>
      }
      content={
        <p style={{ margin: 0, fontSize: "var(--font-size-12)" }}>
          This is a helpful explanation that provides more context about the
          feature.
        </p>
      }
      triggerType="hover"
      placement="top"
      openDelay={200}
    />
  ),
};
