/**
 * Link Component Stories
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "./Link";
import {
  ArrowRight,
  ArrowLeft,
  Download,
  Mail,
  Phone,
  FileText,
  ChevronRight,
} from "lucide-react";

const meta: Meta<typeof Link> = {
  title: "Components/Navigation/Link",
  component: Link,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["default", "subtle", "brand"],
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
    },
    iconAnimation: {
      control: "radio",
      options: ["none", "arrow", "arrow-left", "external"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: {
    href: "#",
    children: "Default Link",
  },
};

export const Subtle: Story = {
  args: {
    href: "#",
    variant: "subtle",
    children: "Subtle Link",
  },
};

export const Brand: Story = {
  args: {
    href: "#",
    variant: "brand",
    children: "Brand Link",
  },
};

export const External: Story = {
  args: {
    href: "https://example.com",
    external: true,
    children: "Visit Documentation",
  },
};

export const ExternalWithoutIcon: Story = {
  args: {
    href: "https://example.com",
    external: true,
    showExternalIcon: false,
    children: "External (no icon)",
  },
};

export const WithoutUnderline: Story = {
  args: {
    href: "#",
    underline: false,
    children: "No Underline",
  },
};

export const WithLeftIcon: Story = {
  args: {
    href: "#",
    icon: <ArrowLeft size={14} />,
    iconAnimation: "arrow-left",
    children: "Go Back",
  },
};

export const WithRightIcon: Story = {
  args: {
    href: "#",
    iconRight: <ArrowRight size={14} />,
    iconAnimation: "arrow",
    children: "Learn More",
  },
};

export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-4)",
        alignItems: "flex-start",
      }}
    >
      <Link href="#" size="sm">
        Small Link
      </Link>
      <Link href="#" size="md">
        Medium Link
      </Link>
      <Link href="#" size="lg">
        Large Link
      </Link>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-4)",
        alignItems: "flex-start",
      }}
    >
      <Link href="#" icon={<Mail size={14} />}>
        contact@example.com
      </Link>
      <Link href="#" icon={<Phone size={14} />}>
        +1 (555) 123-4567
      </Link>
      <Link href="#" icon={<FileText size={14} />}>
        View Documentation
      </Link>
      <Link href="#" icon={<Download size={14} />}>
        Download PDF
      </Link>
    </div>
  ),
};

export const NavigationLinks: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-3)",
        alignItems: "flex-start",
      }}
    >
      <Link
        href="#"
        iconRight={<ChevronRight size={14} />}
        iconAnimation="arrow"
        underline={false}
      >
        Getting Started
      </Link>
      <Link
        href="#"
        iconRight={<ChevronRight size={14} />}
        iconAnimation="arrow"
        underline={false}
      >
        Components
      </Link>
      <Link
        href="#"
        iconRight={<ChevronRight size={14} />}
        iconAnimation="arrow"
        underline={false}
      >
        API Reference
      </Link>
      <Link
        href="#"
        iconRight={<ChevronRight size={14} />}
        iconAnimation="arrow"
        underline={false}
      >
        Examples
      </Link>
    </div>
  ),
};

export const ExternalLinks: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-3)",
        alignItems: "flex-start",
      }}
    >
      <Link href="https://github.com" external variant="brand">
        GitHub Repository
      </Link>
      <Link href="https://npmjs.com" external variant="brand">
        NPM Package
      </Link>
      <Link href="https://discord.com" external variant="brand">
        Join Discord
      </Link>
    </div>
  ),
};

export const InParagraph: Story = {
  render: () => (
    <p
      style={{
        maxWidth: "500px",
        lineHeight: 1.7,
        color: "var(--text-secondary)",
      }}
    >
      This is a paragraph with an <Link href="#">inline link</Link> that
      demonstrates how links appear within body text. You can also have{" "}
      <Link href="https://example.com" external>
        external links
      </Link>{" "}
      that automatically show an icon and open in a new tab. The{" "}
      <Link href="#" variant="brand">
        brand variant
      </Link>{" "}
      uses the accent color for emphasis.
    </p>
  ),
};

export const FooterLinks: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "var(--spacing-8)",
        padding: "var(--spacing-6)",
        background: "var(--surface-subtle)",
        borderRadius: "var(--radius-control)",
        minWidth: "500px",
      }}
    >
      <div>
        <h4
          style={{
            fontSize: "var(--font-size-14)",
            fontWeight: "var(--font-weight-medium)",
            marginBottom: "var(--spacing-3)",
          }}
        >
          Product
        </h4>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-2)",
          }}
        >
          <Link href="#" variant="subtle" size="sm" underline={false}>
            Features
          </Link>
          <Link href="#" variant="subtle" size="sm" underline={false}>
            Pricing
          </Link>
          <Link href="#" variant="subtle" size="sm" underline={false}>
            Changelog
          </Link>
        </div>
      </div>
      <div>
        <h4
          style={{
            fontSize: "var(--font-size-14)",
            fontWeight: "var(--font-weight-medium)",
            marginBottom: "var(--spacing-3)",
          }}
        >
          Resources
        </h4>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-2)",
          }}
        >
          <Link href="#" variant="subtle" size="sm" underline={false}>
            Documentation
          </Link>
          <Link href="#" variant="subtle" size="sm" underline={false}>
            Tutorials
          </Link>
          <Link href="#" variant="subtle" size="sm" underline={false}>
            Blog
          </Link>
        </div>
      </div>
      <div>
        <h4
          style={{
            fontSize: "var(--font-size-14)",
            fontWeight: "var(--font-weight-medium)",
            marginBottom: "var(--spacing-3)",
          }}
        >
          Connect
        </h4>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-2)",
          }}
        >
          <Link
            href="https://twitter.com"
            external
            variant="subtle"
            size="sm"
            underline={false}
          >
            Twitter
          </Link>
          <Link
            href="https://github.com"
            external
            variant="subtle"
            size="sm"
            underline={false}
          >
            GitHub
          </Link>
          <Link
            href="https://discord.com"
            external
            variant="subtle"
            size="sm"
            underline={false}
          >
            Discord
          </Link>
        </div>
      </div>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-4)",
        alignItems: "flex-start",
      }}
    >
      <Link href="#" variant="default">
        Default Variant
      </Link>
      <Link href="#" variant="subtle">
        Subtle Variant
      </Link>
      <Link href="#" variant="brand">
        Brand Variant
      </Link>
    </div>
  ),
};
