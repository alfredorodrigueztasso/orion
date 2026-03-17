import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ChevronsUpDown, Plus, X } from "lucide-react";
import { Collapsible } from "./Collapsible";

const meta = {
  title: "Components/Layout/Collapsible",
  component: Collapsible,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    defaultOpen: {
      control: "boolean",
      description: "Default open state",
    },
    disabled: {
      control: "boolean",
      description: "Disable the trigger",
    },
  },
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: "360px" }}>
      <Collapsible {...args}>
        <Collapsible.Trigger>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--spacing-2)",
            }}
          >
            Toggle content <ChevronsUpDown size={16} />
          </span>
        </Collapsible.Trigger>
        <Collapsible.Content>
          <div style={{ paddingTop: "var(--spacing-3)" }}>
            <p
              style={{
                fontSize: "var(--font-size-14)",
                color: "var(--text-secondary)",
              }}
            >
              This is the collapsible content. It can contain any elements.
            </p>
          </div>
        </Collapsible.Content>
      </Collapsible>
    </div>
  ),
};

export const DefaultOpen: Story = {
  render: () => (
    <div style={{ width: "360px" }}>
      <Collapsible defaultOpen>
        <Collapsible.Trigger>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--spacing-2)",
            }}
          >
            Expanded by default <ChevronsUpDown size={16} />
          </span>
        </Collapsible.Trigger>
        <Collapsible.Content>
          <div style={{ paddingTop: "var(--spacing-3)" }}>
            <p
              style={{
                fontSize: "var(--font-size-14)",
                color: "var(--text-secondary)",
              }}
            >
              This content is visible by default because defaultOpen is true.
            </p>
          </div>
        </Collapsible.Content>
      </Collapsible>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: "360px" }}>
      <Collapsible disabled>
        <Collapsible.Trigger>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--spacing-2)",
            }}
          >
            Disabled trigger <ChevronsUpDown size={16} />
          </span>
        </Collapsible.Trigger>
        <Collapsible.Content>
          <div style={{ paddingTop: "var(--spacing-3)" }}>
            <p
              style={{
                fontSize: "var(--font-size-14)",
                color: "var(--text-secondary)",
              }}
            >
              You should not be able to see this.
            </p>
          </div>
        </Collapsible.Content>
      </Collapsible>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div style={{ width: "360px" }}>
        <Collapsible open={open} onOpenChange={setOpen}>
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
                fontSize: "var(--font-size-14)",
              }}
            >
              3 items starred
            </span>
            <Collapsible.Trigger>
              <ChevronsUpDown size={16} />
            </Collapsible.Trigger>
          </div>
          <div
            style={{
              marginTop: "var(--spacing-2)",
              padding: "var(--spacing-3)",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border-subtle)",
              fontSize: "var(--font-size-14)",
              fontFamily: "var(--font-mono)",
            }}
          >
            @peduarte/radix-vue
          </div>
          <Collapsible.Content forceMount>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--spacing-2)",
                paddingTop: "var(--spacing-2)",
              }}
            >
              <div
                style={{
                  padding: "var(--spacing-3)",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border-subtle)",
                  fontSize: "var(--font-size-14)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                @stitches/react
              </div>
              <div
                style={{
                  padding: "var(--spacing-3)",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border-subtle)",
                  fontSize: "var(--font-size-14)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                @radix-ui/colors
              </div>
            </div>
          </Collapsible.Content>
        </Collapsible>
        <p
          style={{
            marginTop: "var(--spacing-4)",
            fontSize: "var(--font-size-12)",
            color: "var(--text-tertiary)",
          }}
        >
          State: {open ? "open" : "closed"}
        </p>
      </div>
    );
  },
};

export const ForceMount: Story = {
  render: () => (
    <div style={{ width: "360px" }}>
      <Collapsible>
        <Collapsible.Trigger>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--spacing-2)",
            }}
          >
            Animated with forceMount <ChevronsUpDown size={16} />
          </span>
        </Collapsible.Trigger>
        <Collapsible.Content forceMount>
          <div style={{ paddingTop: "var(--spacing-3)" }}>
            <p
              style={{
                fontSize: "var(--font-size-14)",
                color: "var(--text-secondary)",
              }}
            >
              This content is always in the DOM. The CSS grid animation smoothly
              transitions the height from 0fr to 1fr.
            </p>
          </div>
        </Collapsible.Content>
      </Collapsible>
    </div>
  ),
};

export const MultipleItems: Story = {
  render: () => {
    const items = [
      {
        title: "Section 1",
        content: "Content for section one. This could be anything.",
      },
      {
        title: "Section 2",
        content: "Content for section two with different information.",
      },
      {
        title: "Section 3",
        content: "Content for section three — the last one.",
      },
    ];

    return (
      <div
        style={{
          width: "400px",
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-2)",
        }}
      >
        {items.map((item) => (
          <Collapsible key={item.title}>
            <div
              style={{
                padding: "var(--spacing-3) var(--spacing-4)",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <Collapsible.Trigger>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    fontWeight: "var(--font-weight-medium)",
                    fontSize: "var(--font-size-14)",
                  }}
                >
                  {item.title}
                  <ChevronsUpDown size={16} />
                </span>
              </Collapsible.Trigger>
              <Collapsible.Content forceMount>
                <p
                  style={{
                    paddingTop: "var(--spacing-3)",
                    fontSize: "var(--font-size-14)",
                    color: "var(--text-secondary)",
                  }}
                >
                  {item.content}
                </p>
              </Collapsible.Content>
            </div>
          </Collapsible>
        ))}
      </div>
    );
  },
};

export const TagsList: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [tags] = useState(["React", "TypeScript", "CSS Modules"]);

    return (
      <div style={{ width: "360px" }}>
        <Collapsible open={open} onOpenChange={setOpen}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "var(--spacing-2)",
            }}
          >
            <span
              style={{
                fontWeight: "var(--font-weight-medium)",
                fontSize: "var(--font-size-14)",
              }}
            >
              Tags ({tags.length})
            </span>
            <Collapsible.Trigger>
              {open ? <X size={16} /> : <Plus size={16} />}
            </Collapsible.Trigger>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "var(--spacing-2)",
            }}
          >
            {tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                style={{
                  padding: "var(--spacing-1) var(--spacing-3)",
                  borderRadius: "var(--radius-full)",
                  background: "var(--soft-brand)",
                  color: "var(--text-brand)",
                  fontSize: "var(--font-size-12)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <Collapsible.Content forceMount>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "var(--spacing-2)",
                paddingTop: "var(--spacing-2)",
              }}
            >
              {tags.slice(2).map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: "var(--spacing-1) var(--spacing-3)",
                    borderRadius: "var(--radius-full)",
                    background: "var(--soft-brand)",
                    color: "var(--text-brand)",
                    fontSize: "var(--font-size-12)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </Collapsible.Content>
        </Collapsible>
      </div>
    );
  },
};
