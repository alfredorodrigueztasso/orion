import type { Meta, StoryObj } from "@storybook/react";
import { Section } from "./Section";

const meta = {
  title: "Sections/Layout/Section",
  component: Section,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    background: {
      control: "select",
      options: ["base", "subtle", "sunken", "brand", "none"],
    },
    spacing: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl"],
    },
    as: {
      control: "select",
      options: ["section", "div", "article", "aside", "header", "footer"],
    },
  },
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

const content = (
  <div style={{ textAlign: "center" }}>
    <h2>Section Content</h2>
    <p>
      This is a generic section wrapper that provides consistent spacing and
      background options.
    </p>
  </div>
);

export const Default: Story = {
  args: {
    children: content,
  },
};

export const BaseBackground: Story = {
  args: {
    background: "base",
    children: content,
  },
};

export const SubtleBackground: Story = {
  args: {
    background: "subtle",
    children: content,
  },
};

export const SunkenBackground: Story = {
  args: {
    background: "sunken",
    children: content,
  },
};

export const BrandBackground: Story = {
  args: {
    background: "brand",
    children: content,
  },
};

export const SmallSpacing: Story = {
  args: {
    spacing: "sm",
    children: content,
  },
};

export const LargeSpacing: Story = {
  args: {
    spacing: "lg",
    children: content,
  },
};

export const ExtraLargeSpacing: Story = {
  args: {
    spacing: "xl",
    children: content,
  },
};

export const NoSpacing: Story = {
  args: {
    spacing: "none",
    children: content,
  },
};

export const WithTopBorder: Story = {
  args: {
    borderTop: true,
    children: content,
  },
};

export const WithBottomBorder: Story = {
  args: {
    borderBottom: true,
    children: content,
  },
};

export const WithBothBorders: Story = {
  args: {
    borderTop: true,
    borderBottom: true,
    children: content,
  },
};

export const AsArticle: Story = {
  args: {
    as: "article",
    children: (
      <article>
        <h2>Article Section</h2>
        <p>This section renders as an article element.</p>
      </article>
    ),
  },
};

export const AsFooter: Story = {
  args: {
    as: "footer",
    background: "subtle",
    spacing: "md",
    children: (
      <footer style={{ textAlign: "center" }}>
        <p>Footer content goes here</p>
      </footer>
    ),
  },
};
