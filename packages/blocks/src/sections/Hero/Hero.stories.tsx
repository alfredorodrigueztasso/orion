import type { Meta, StoryObj } from "@storybook/react";
import { Hero } from "./Hero";
import { Button } from "@orion-ds/react";

const meta = {
  title: "Sections/Marketing/Hero",
  component: Hero,
  parameters: {
    layout: "fullWidth",
  },
  tags: ["autodocs"],
  argTypes: {
    align: {
      control: "select",
      options: ["left", "center"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    spacing: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl"],
      description: "Vertical padding. Default is 'xl' (128px) for all layouts.",
    },
    mediaPosition: {
      control: "select",
      options: ["left", "right", "bottom"],
    },
    layout: {
      control: "select",
      options: ["contained", "fullscreen", "card"],
    },
    variant: {
      control: "select",
      options: ["default", "background"],
    },
    backgroundOverlay: {
      control: { type: "range", min: 0, max: 1, step: 0.1 },
    },
  },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    headline: "Build faster with Orion",
    description:
      "The AI-first design system for modern web applications. Ship beautiful, accessible interfaces in record time.",
    primaryAction: <Button size="lg">Get Started</Button>,
    secondaryAction: (
      <Button size="lg" variant="secondary">
        Learn More
      </Button>
    ),
  },
};

export const WithBadge: Story = {
  args: {
    badge: "New Release",
    headline: "Introducing Orion 2.0",
    description:
      "A complete redesign with 50+ new components, dark mode, and multi-brand support.",
    primaryAction: <Button size="lg">Explore Features</Button>,
    secondaryAction: (
      <Button size="lg" variant="ghost">
        View Changelog
      </Button>
    ),
  },
};

export const LeftAligned: Story = {
  args: {
    align: "left",
    headline: "Design systems that scale",
    description:
      "From startup to enterprise, Orion adapts to your needs with customizable tokens and flexible components.",
    primaryAction: <Button size="lg">Start Free Trial</Button>,
    secondaryAction: (
      <Button size="lg" variant="secondary">
        Book Demo
      </Button>
    ),
  },
};

export const WithMedia: Story = {
  args: {
    align: "left",
    headline: "Beautiful dashboards in minutes",
    description:
      "Pre-built sections and components help you ship faster without sacrificing quality.",
    primaryAction: <Button size="lg">Get Started</Button>,
    media: (
      <div
        style={{
          background: "var(--surface-subtle)",
          borderRadius: "var(--radius-container)",
          padding: "var(--spacing-12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "300px",
        }}
      >
        <span style={{ color: "var(--text-tertiary)" }}>Dashboard Preview</span>
      </div>
    ),
    mediaPosition: "right",
  },
};

export const WithDefaultMedia: Story = {
  args: {
    align: "left",
    headline: "Media placeholder included",
    description:
      "When showDefaultMedia is true, a placeholder image icon appears automatically.",
    primaryAction: <Button size="lg">Get Started</Button>,
    showDefaultMedia: true,
    mediaPosition: "right",
  },
};

export const WithTrustIndicators: Story = {
  args: {
    headline: "Trusted by thousands of developers",
    description: "Join the community building the future of web interfaces.",
    primaryAction: <Button size="lg">Join Now</Button>,
    trustIndicators: (
      <div
        style={{
          display: "flex",
          gap: "var(--spacing-6)",
          opacity: 0.6,
          marginTop: "var(--spacing-6)",
        }}
      >
        <span>Acme Inc</span>
        <span>TechCorp</span>
        <span>StartupXYZ</span>
        <span>BigCo</span>
      </div>
    ),
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    headline: "Documentation",
    description: "Everything you need to know about using Orion.",
    primaryAction: <Button>Browse Docs</Button>,
  },
};

export const FullHeight: Story = {
  args: {
    fullHeight: true,
    headline: "Welcome to Orion",
    description: "The design system that puts AI first.",
    primaryAction: <Button size="lg">Enter</Button>,
  },
};

/* ============================================================================
 * NEW STORIES: Layout Variants
 * ============================================================================ */

export const Fullscreen: Story = {
  args: {
    layout: "fullscreen",
    headline: "Full Screen Experience",
    description: "Takes up the entire viewport height with edge-to-edge width.",
    primaryAction: <Button size="lg">Get Started</Button>,
    align: "center",
    size: "lg",
  },
};

export const FullscreenBackground: Story = {
  args: {
    layout: "fullscreen",
    variant: "background",
    backgroundImage: "https://picsum.photos/1920/1080",
    headline: "Immersive Full Screen",
    description:
      "Background image combined with fullscreen layout for maximum impact.",
    primaryAction: <Button size="lg">Explore</Button>,
    secondaryAction: (
      <Button size="lg" variant="ghost">
        Learn More
      </Button>
    ),
    align: "center",
  },
};

export const CardLayout: Story = {
  args: {
    layout: "card",
    headline: "Hero as a Card",
    description:
      "Contained within margins with rounded corners. Perfect for app-like interfaces.",
    primaryAction: <Button>Learn More</Button>,
    align: "center",
  },
};

export const CardWithBackground: Story = {
  args: {
    layout: "card",
    variant: "background",
    backgroundImage: "https://picsum.photos/1920/1080",
    headline: "Featured Content",
    description:
      "Card-style hero with background image. Great for featured sections.",
    primaryAction: <Button>View Details</Button>,
    align: "center",
    elevated: true,
  },
};

export const CardElevated: Story = {
  args: {
    layout: "card",
    elevated: true,
    headline: "Elevated Card Hero",
    description: "With shadow for depth and visual hierarchy.",
    primaryAction: <Button>Get Started</Button>,
  },
};

/* ============================================================================
 * NEW STORIES: Background Variant
 * ============================================================================ */

export const BackgroundVariant: Story = {
  args: {
    variant: "background",
    backgroundImage: "https://picsum.photos/1920/1080",
    headline: "Hero with Background Image",
    description:
      "Full-width background with gradient overlay. Text automatically becomes white.",
    primaryAction: <Button size="lg">Explore</Button>,
    secondaryAction: (
      <Button size="lg" variant="ghost">
        Learn More
      </Button>
    ),
    align: "center",
    backgroundOverlay: 0.6,
  },
};

export const BackgroundLightOverlay: Story = {
  args: {
    variant: "background",
    backgroundImage: "https://picsum.photos/1920/1080",
    headline: "Lighter Overlay",
    description: "Background with lighter overlay (0.4) for brighter images.",
    primaryAction: <Button size="lg">Get Started</Button>,
    align: "center",
    backgroundOverlay: 0.4,
  },
};

export const BackgroundDarkOverlay: Story = {
  args: {
    variant: "background",
    backgroundImage: "https://picsum.photos/1920/1080",
    headline: "Darker Overlay",
    description:
      "Background with darker overlay (0.8) for better text contrast.",
    primaryAction: <Button size="lg">Get Started</Button>,
    align: "center",
    backgroundOverlay: 0.8,
  },
};

/* ============================================================================
 * NEW STORIES: Highlight Text
 * ============================================================================ */

export const HighlightedTitle: Story = {
  args: {
    headline: (
      <>
        Build products <Hero.Highlight>10x faster</Hero.Highlight> with AI
      </>
    ),
    description: "The AI-first design system that eliminates hallucination.",
    primaryAction: <Button size="lg">Get Started</Button>,
    align: "center",
  },
};

export const HighlightedMultiple: Story = {
  args: {
    headline: (
      <>
        <Hero.Highlight>Design</Hero.Highlight>,{" "}
        <Hero.Highlight>build</Hero.Highlight>, and{" "}
        <Hero.Highlight>ship</Hero.Highlight> faster
      </>
    ),
    description: "Multiple words can be highlighted for emphasis.",
    primaryAction: <Button size="lg">Start Now</Button>,
    align: "center",
  },
};

export const HighlightedOnBackground: Story = {
  args: {
    variant: "background",
    backgroundImage: "https://picsum.photos/1920/1080",
    headline: (
      <>
        The <Hero.Highlight>future</Hero.Highlight> is here
      </>
    ),
    description:
      "Highlights work on background variants too, with adjusted colors.",
    primaryAction: <Button size="lg">Explore</Button>,
    align: "center",
  },
};

/* ============================================================================
 * NEW STORIES: Combined Features
 * ============================================================================ */

export const AllFeatures: Story = {
  args: {
    layout: "fullscreen",
    variant: "background",
    backgroundImage: "https://picsum.photos/1920/1080",
    headline: (
      <>
        The <Hero.Highlight>future</Hero.Highlight> is here
      </>
    ),
    description:
      "Fullscreen + background + highlight combined for maximum impact.",
    primaryAction: <Button size="lg">Explore</Button>,
    secondaryAction: (
      <Button size="lg" variant="ghost">
        Learn More
      </Button>
    ),
    align: "center",
    badge: "New",
  },
};

export const CardWithMediaAndHighlight: Story = {
  args: {
    layout: "card",
    elevated: true,
    align: "left",
    headline: (
      <>
        Build <Hero.Highlight>beautiful</Hero.Highlight> interfaces
      </>
    ),
    description: "Card layout with media and highlighted text.",
    primaryAction: <Button>Get Started</Button>,
    showDefaultMedia: true,
    mediaPosition: "right",
  },
};

export const LeftAlignedWithHighlight: Story = {
  args: {
    align: "left",
    headline: (
      <>
        Ship <Hero.Highlight>production-ready</Hero.Highlight> code
      </>
    ),
    description: "Type-safe components that follow your design system rules.",
    primaryAction: <Button size="lg">View Components</Button>,
    secondaryAction: (
      <Button size="lg" variant="secondary">
        Read Docs
      </Button>
    ),
    showDefaultMedia: true,
    mediaPosition: "right",
  },
};
