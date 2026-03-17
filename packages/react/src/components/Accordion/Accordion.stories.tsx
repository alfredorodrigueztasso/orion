/**
 * Accordion Component Stories
 */

import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Accordion } from "./Accordion";
import { HelpCircle, FileText, Settings, Shield } from "lucide-react";

const meta: Meta<typeof Accordion> = {
  title: "Components/Layout/Accordion",
  component: Accordion,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["default", "bordered", "separated"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

const defaultItems = [
  {
    id: "1",
    title: "What is Orion Design System?",
    content:
      'Orion is an AI-first design system built on the "Chain of Truth" principle. It eliminates UI hallucination by enforcing strict separation between primitives, semantics, and components.',
  },
  {
    id: "2",
    title: "How do I install Orion?",
    content:
      "You can install Orion using npm: npm install @orion/react @orion/core. Make sure to import the CSS file in your application entry point.",
  },
  {
    id: "3",
    title: "Does Orion support theming?",
    content:
      "Yes! Orion supports multiple themes (light/dark) and multiple brands (orion, uvm, unitec, laureate). Theme and brand are controlled globally via the ThemeProvider component.",
  },
];

export const Default: Story = {
  args: {
    items: defaultItems,
  },
};

export const Bordered: Story = {
  args: {
    items: defaultItems,
    variant: "bordered",
  },
};

export const Separated: Story = {
  args: {
    items: defaultItems,
    variant: "separated",
  },
};

export const AllowMultiple: Story = {
  args: {
    items: defaultItems,
    allowMultiple: true,
  },
};

export const DefaultExpanded: Story = {
  args: {
    items: defaultItems,
    defaultExpanded: ["1"],
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      {
        id: "1",
        title: "Getting Started",
        content:
          "Learn how to set up and configure Orion Design System in your project.",
        icon: <FileText size={20} />,
      },
      {
        id: "2",
        title: "Configuration",
        content:
          "Customize themes, brands, and tokens to match your design requirements.",
        icon: <Settings size={20} />,
      },
      {
        id: "3",
        title: "Security",
        content:
          "Best practices for securing your application when using Orion components.",
        icon: <Shield size={20} />,
      },
      {
        id: "4",
        title: "FAQ",
        content: "Frequently asked questions about Orion Design System.",
        icon: <HelpCircle size={20} />,
      },
    ],
    variant: "separated",
  },
};

export const WithDisabledItems: Story = {
  args: {
    items: [
      {
        id: "1",
        title: "Available Section",
        content: "This section can be expanded.",
      },
      {
        id: "2",
        title: "Disabled Section",
        content: "This content is hidden.",
        disabled: true,
      },
      {
        id: "3",
        title: "Another Available",
        content: "This section can also be expanded.",
      },
    ],
  },
};

export const Controlled: Story = {
  render: () => {
    const [expanded, setExpanded] = useState<string[]>(["1"]);

    return (
      <div>
        <div style={{ marginBottom: 16, display: "flex", gap: 8 }}>
          <button onClick={() => setExpanded(["1"])}>Open First</button>
          <button onClick={() => setExpanded(["2"])}>Open Second</button>
          <button onClick={() => setExpanded([])}>Close All</button>
        </div>
        <Accordion
          items={defaultItems}
          expanded={expanded}
          onChange={setExpanded}
        />
      </div>
    );
  },
};

export const LongContent: Story = {
  args: {
    items: [
      {
        id: "1",
        title: "Terms of Service",
        content: `
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        `,
      },
      {
        id: "2",
        title: "Privacy Policy",
        content:
          "We take your privacy seriously. This section outlines how we collect, use, and protect your personal information.",
      },
    ],
    variant: "bordered",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <div>
        <h3 style={{ marginBottom: 16 }}>Default</h3>
        <Accordion items={defaultItems.slice(0, 2)} variant="default" />
      </div>
      <div>
        <h3 style={{ marginBottom: 16 }}>Bordered</h3>
        <Accordion items={defaultItems.slice(0, 2)} variant="bordered" />
      </div>
      <div>
        <h3 style={{ marginBottom: 16 }}>Separated</h3>
        <Accordion items={defaultItems.slice(0, 2)} variant="separated" />
      </div>
    </div>
  ),
};
