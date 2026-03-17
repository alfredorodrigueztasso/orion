import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Navbar } from "./Navbar";
import { Button } from "../Button/Button";

const meta: Meta<typeof Navbar> = {
  title: "Components/Navigation/Navbar",
  component: Navbar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    height: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Navbar height",
    },
    variant: {
      control: "select",
      options: ["solid", "transparent", "glass"],
      description: "Navbar background style",
    },
    sticky: {
      control: "boolean",
      description: "Make navbar sticky",
    },
    bordered: {
      control: "boolean",
      description: "Add bottom border",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "100%", minHeight: "100vh" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <Navbar.Brand href="/">MyApp</Navbar.Brand>
        <Navbar.Nav>
          <Navbar.Link href="/" active>
            Home
          </Navbar.Link>
          <Navbar.Link href="/about">About</Navbar.Link>
          <Navbar.Link href="/contact">Contact</Navbar.Link>
        </Navbar.Nav>
        <Navbar.Actions>
          <Button variant="ghost">Sign In</Button>
          <Button variant="primary">Sign Up</Button>
        </Navbar.Actions>
      </>
    ),
  },
};

export const WithLogo: Story = {
  args: {
    children: (
      <>
        <Navbar.Brand href="/">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--spacing-2)",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "var(--radius-sm)",
                background:
                  "linear-gradient(135deg, var(--color-brand-400) 0%, var(--color-brand-600) 100%)",
              }}
            />
            <span style={{ fontWeight: "var(--font-weight-medium)" }}>
              MyApp
            </span>
          </div>
        </Navbar.Brand>
        <Navbar.Nav>
          <Navbar.Link href="/" active>
            Home
          </Navbar.Link>
          <Navbar.Link href="/products">Products</Navbar.Link>
          <Navbar.Link href="/pricing">Pricing</Navbar.Link>
          <Navbar.Link href="/docs">Docs</Navbar.Link>
        </Navbar.Nav>
        <Navbar.Actions>
          <Button variant="ghost">Login</Button>
          <Button variant="primary">Get Started</Button>
        </Navbar.Actions>
      </>
    ),
  },
};

export const GlassVariant: Story = {
  args: { children: null },
  render: () => (
    <div
      style={{
        background:
          "linear-gradient(135deg, var(--color-brand-400) 0%, var(--color-brand-600) 100%)",
        minHeight: "300px",
        borderRadius: "var(--radius-control)",
      }}
    >
      <Navbar variant="glass" colorScheme="light" bordered={false}>
        <Navbar.Brand href="/">Brand</Navbar.Brand>
        <Navbar.Nav>
          <Navbar.Link href="/" active>
            Home
          </Navbar.Link>
          <Navbar.Link href="/features">Features</Navbar.Link>
          <Navbar.Link href="/pricing">Pricing</Navbar.Link>
        </Navbar.Nav>
        <Navbar.Actions>
          <Button variant="secondary" size="sm">
            Login
          </Button>
        </Navbar.Actions>
      </Navbar>
      <div
        style={{
          padding: "var(--spacing-8)",
          color: "var(--interactive-primary-text)",
        }}
      >
        <h2 style={{ marginBottom: "var(--spacing-2)" }}>Glass Navbar</h2>
        <p style={{ opacity: 0.8 }}>
          The glass effect creates a frosted appearance with backdrop blur.
        </p>
      </div>
    </div>
  ),
};

export const TransparentVariant: Story = {
  args: { children: null },
  render: () => (
    <div
      style={{
        background:
          "linear-gradient(135deg, var(--color-neutral-900) 0%, var(--color-neutral-800) 50%, var(--color-neutral-800) 100%)",
        minHeight: "300px",
        borderRadius: "var(--radius-control)",
      }}
    >
      <Navbar variant="transparent" colorScheme="light" bordered={false}>
        <Navbar.Brand href="/">Brand</Navbar.Brand>
        <Navbar.Nav>
          <Navbar.Link href="/" active>
            Home
          </Navbar.Link>
          <Navbar.Link href="/about">About</Navbar.Link>
          <Navbar.Link href="/contact">Contact</Navbar.Link>
        </Navbar.Nav>
        <Navbar.Actions>
          <Button variant="secondary" size="sm">
            Sign In
          </Button>
          <Button variant="primary" size="sm">
            Get Started
          </Button>
        </Navbar.Actions>
      </Navbar>
      <div
        style={{
          padding: "var(--spacing-8)",
          color: "var(--interactive-primary-text)",
        }}
      >
        <h2 style={{ marginBottom: "var(--spacing-2)" }}>Transparent Navbar</h2>
        <p style={{ opacity: 0.8 }}>
          Use colorScheme="light" for dark backgrounds, colorScheme="dark" for
          light backgrounds.
        </p>
      </div>
    </div>
  ),
};

export const SmallHeight: Story = {
  args: { children: null },
  render: () => (
    <div>
      <Navbar height="sm">
        <Navbar.Brand href="/">Compact</Navbar.Brand>
        <Navbar.Nav>
          <Navbar.Link href="/" active>
            Home
          </Navbar.Link>
          <Navbar.Link href="/about">About</Navbar.Link>
          <Navbar.Link href="/contact">Contact</Navbar.Link>
        </Navbar.Nav>
        <Navbar.Actions>
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
          <Button variant="primary" size="sm">
            Get Started
          </Button>
        </Navbar.Actions>
      </Navbar>
      <div
        style={{
          padding: "var(--spacing-6)",
          background: "var(--surface-subtle)",
        }}
      >
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "var(--font-size-14)",
          }}
        >
          Small navbar (56px height) - ideal for dense interfaces and admin
          panels.
        </p>
      </div>
    </div>
  ),
};

export const LargeHeight: Story = {
  args: { children: null },
  render: () => (
    <div>
      <Navbar height="lg">
        <Navbar.Brand href="/">Spacious</Navbar.Brand>
        <Navbar.Nav>
          <Navbar.Link href="/" active>
            Home
          </Navbar.Link>
          <Navbar.Link href="/products">Products</Navbar.Link>
          <Navbar.Link href="/about">About</Navbar.Link>
        </Navbar.Nav>
        <Navbar.Actions>
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
          <Button variant="primary">Get Started</Button>
        </Navbar.Actions>
      </Navbar>
      <div
        style={{
          padding: "var(--spacing-6)",
          background: "var(--surface-subtle)",
        }}
      >
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "var(--font-size-14)",
          }}
        >
          Large navbar (72px height) - ideal for marketing sites and landing
          pages.
        </p>
      </div>
    </div>
  ),
};

export const Sticky: Story = {
  args: { children: null },
  render: () => (
    <div style={{ minHeight: "200vh" }}>
      <Navbar sticky>
        <Navbar.Brand href="/">Sticky Nav</Navbar.Brand>
        <Navbar.Nav>
          <Navbar.Link href="/" active>
            Home
          </Navbar.Link>
          <Navbar.Link href="/features">Features</Navbar.Link>
          <Navbar.Link href="/pricing">Pricing</Navbar.Link>
        </Navbar.Nav>
        <Navbar.Actions>
          <Button variant="primary" size="sm">
            Get Started
          </Button>
        </Navbar.Actions>
      </Navbar>
      <div style={{ padding: "var(--spacing-8)" }}>
        <h1 style={{ marginBottom: "var(--spacing-4)" }}>
          Scroll down to see sticky behavior
        </h1>
        <p
          style={{
            color: "var(--text-secondary)",
            marginBottom: "var(--spacing-8)",
          }}
        >
          The navbar will stay fixed at the top as you scroll.
        </p>
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            style={{
              padding: "var(--spacing-6)",
              marginBottom: "var(--spacing-4)",
              background: "var(--surface-subtle)",
              borderRadius: "var(--radius-control)",
            }}
          >
            <h3 style={{ marginBottom: "var(--spacing-2)" }}>
              Section {i + 1}
            </h3>
            <p style={{ color: "var(--text-secondary)" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const NoBorder: Story = {
  args: { children: null },
  render: () => (
    <div>
      <Navbar bordered={false}>
        <Navbar.Brand href="/">No Border</Navbar.Brand>
        <Navbar.Nav>
          <Navbar.Link href="/" active>
            Home
          </Navbar.Link>
          <Navbar.Link href="/about">About</Navbar.Link>
          <Navbar.Link href="/contact">Contact</Navbar.Link>
        </Navbar.Nav>
        <Navbar.Actions>
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
        </Navbar.Actions>
      </Navbar>
      <div
        style={{
          padding: "var(--spacing-6)",
          background: "var(--surface-subtle)",
        }}
      >
        <p style={{ color: "var(--text-secondary)" }}>
          Notice there is no border at the bottom of the navbar.
        </p>
      </div>
    </div>
  ),
};

export const MinimalNav: Story = {
  args: {
    children: (
      <>
        <Navbar.Brand href="/">Brand</Navbar.Brand>
        <Navbar.Actions>
          <Button variant="ghost">Menu</Button>
        </Navbar.Actions>
      </>
    ),
  },
};

export const ManyLinks: Story = {
  args: {
    children: (
      <>
        <Navbar.Brand href="/">Brand</Navbar.Brand>
        <Navbar.Nav>
          <Navbar.Link href="/" active>
            Home
          </Navbar.Link>
          <Navbar.Link href="/products">Products</Navbar.Link>
          <Navbar.Link href="/solutions">Solutions</Navbar.Link>
          <Navbar.Link href="/pricing">Pricing</Navbar.Link>
          <Navbar.Link href="/docs">Docs</Navbar.Link>
          <Navbar.Link href="/blog">Blog</Navbar.Link>
          <Navbar.Link href="/about">About</Navbar.Link>
        </Navbar.Nav>
        <Navbar.Actions>
          <Button variant="ghost">Login</Button>
          <Button variant="primary">Sign Up</Button>
        </Navbar.Actions>
      </>
    ),
  },
};

export const GlassShowcase: Story = {
  args: { children: null },
  render: () => (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-8)",
      }}
    >
      {/* Glass on gradient background */}
      <div
        style={{
          background:
            "linear-gradient(135deg, var(--color-neutral-900) 0%, var(--color-neutral-800) 100%)",
          minHeight: "180px",
          borderRadius: "var(--radius-control)",
          overflow: "hidden",
        }}
      >
        <Navbar variant="glass" colorScheme="light" bordered={false}>
          <Navbar.Brand>GlassNav</Navbar.Brand>
          <Navbar.Nav>
            <Navbar.Link href="/" active>
              Home
            </Navbar.Link>
            <Navbar.Link href="/about">About</Navbar.Link>
            <Navbar.Link href="/contact">Contact</Navbar.Link>
          </Navbar.Nav>
          <Navbar.Actions>
            <Button variant="primary" size="sm">
              Action
            </Button>
          </Navbar.Actions>
        </Navbar>
        <div
          style={{
            padding: "var(--spacing-6)",
            color: "var(--interactive-primary-text)",
          }}
        >
          <p style={{ opacity: 0.7, fontSize: "var(--font-size-14)" }}>
            Glass + colorScheme="light" on dark gradient
          </p>
        </div>
      </div>

      {/* Glass on image background */}
      <div
        style={{
          background:
            'url("https://images.unsplash.com/photo-1557683316-973673baf926?w=1200") center/cover',
          minHeight: "180px",
          borderRadius: "var(--radius-control)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.2)",
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <Navbar variant="glass" colorScheme="light" bordered={false}>
            <Navbar.Brand>PhotoApp</Navbar.Brand>
            <Navbar.Nav>
              <Navbar.Link href="/" active>
                Gallery
              </Navbar.Link>
              <Navbar.Link href="/albums">Albums</Navbar.Link>
              <Navbar.Link href="/upload">Upload</Navbar.Link>
            </Navbar.Nav>
            <Navbar.Actions>
              <Button variant="secondary" size="sm">
                Sign In
              </Button>
            </Navbar.Actions>
          </Navbar>
          <div
            style={{
              padding: "var(--spacing-6)",
              color: "var(--interactive-primary-text)",
            }}
          >
            <p style={{ opacity: 0.9, fontSize: "var(--font-size-14)" }}>
              Glass over image with overlay
            </p>
          </div>
        </div>
      </div>

      {/* Glass on light background */}
      <div
        style={{
          background:
            "linear-gradient(135deg, var(--surface-subtle) 0%, var(--surface-layer) 100%)",
          minHeight: "180px",
          borderRadius: "var(--radius-control)",
          overflow: "hidden",
          border: "1px solid var(--border-subtle)",
        }}
      >
        <Navbar variant="glass" colorScheme="dark" bordered={false}>
          <Navbar.Brand>Dashboard</Navbar.Brand>
          <Navbar.Nav>
            <Navbar.Link href="/" active>
              Overview
            </Navbar.Link>
            <Navbar.Link href="/analytics">Analytics</Navbar.Link>
            <Navbar.Link href="/settings">Settings</Navbar.Link>
          </Navbar.Nav>
          <Navbar.Actions>
            <Button variant="ghost" size="sm">
              Help
            </Button>
            <Button variant="primary" size="sm">
              Upgrade
            </Button>
          </Navbar.Actions>
        </Navbar>
        <div style={{ padding: "var(--spacing-6)" }}>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "var(--font-size-14)",
            }}
          >
            Glass + colorScheme="dark" on light gradient
          </p>
        </div>
      </div>
    </div>
  ),
};

export const ColorSchemes: Story = {
  args: { children: null },
  render: () => (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-8)",
      }}
    >
      {/* Light color scheme on dark background */}
      <div
        style={{
          background:
            "linear-gradient(135deg, var(--color-brand-400) 0%, var(--color-brand-600) 100%)",
          minHeight: "200px",
          borderRadius: "var(--radius-control)",
          overflow: "hidden",
        }}
      >
        <Navbar variant="transparent" colorScheme="light" bordered={false}>
          <Navbar.Brand>LightOnDark</Navbar.Brand>
          <Navbar.Nav>
            <Navbar.Link href="/" active>
              Home
            </Navbar.Link>
            <Navbar.Link href="/features">Features</Navbar.Link>
            <Navbar.Link href="/pricing">Pricing</Navbar.Link>
          </Navbar.Nav>
          <Navbar.Actions>
            <Button variant="secondary" size="sm">
              Sign In
            </Button>
            <Button variant="primary" size="sm">
              Get Started
            </Button>
          </Navbar.Actions>
        </Navbar>
        <div
          style={{
            padding: "var(--spacing-6)",
            color: "var(--interactive-primary-text)",
          }}
        >
          <h2 style={{ marginBottom: "var(--spacing-2)" }}>Hero Section</h2>
          <p style={{ opacity: 0.8 }}>
            Use colorScheme="light" for navbars on dark or colored backgrounds.
          </p>
        </div>
      </div>

      {/* Dark color scheme on light background */}
      <div
        style={{
          background: "var(--surface-subtle)",
          minHeight: "200px",
          borderRadius: "var(--radius-control)",
          overflow: "hidden",
          border: "1px solid var(--border-subtle)",
        }}
      >
        <Navbar variant="transparent" colorScheme="dark" bordered={false}>
          <Navbar.Brand>DarkOnLight</Navbar.Brand>
          <Navbar.Nav>
            <Navbar.Link href="/" active>
              Home
            </Navbar.Link>
            <Navbar.Link href="/features">Features</Navbar.Link>
            <Navbar.Link href="/pricing">Pricing</Navbar.Link>
          </Navbar.Nav>
          <Navbar.Actions>
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button variant="primary" size="sm">
              Get Started
            </Button>
          </Navbar.Actions>
        </Navbar>
        <div style={{ padding: "var(--spacing-6)" }}>
          <h2 style={{ marginBottom: "var(--spacing-2)" }}>Content Section</h2>
          <p style={{ color: "var(--text-secondary)" }}>
            Use colorScheme="dark" for navbars on light backgrounds.
          </p>
        </div>
      </div>

      {/* Glass with light scheme */}
      <div
        style={{
          background:
            'url("https://images.unsplash.com/photo-1557683316-973673baf926?w=1200") center/cover',
          minHeight: "200px",
          borderRadius: "var(--radius-control)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.3)",
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <Navbar variant="glass" colorScheme="light" bordered={false}>
            <Navbar.Brand>GlassNav</Navbar.Brand>
            <Navbar.Nav>
              <Navbar.Link href="/" active>
                Home
              </Navbar.Link>
              <Navbar.Link href="/gallery">Gallery</Navbar.Link>
              <Navbar.Link href="/contact">Contact</Navbar.Link>
            </Navbar.Nav>
            <Navbar.Actions>
              <Button variant="secondary" size="sm">
                Explore
              </Button>
            </Navbar.Actions>
          </Navbar>
          <div
            style={{
              padding: "var(--spacing-6)",
              color: "var(--interactive-primary-text)",
            }}
          >
            <h2 style={{ marginBottom: "var(--spacing-2)" }}>Glass Effect</h2>
            <p style={{ opacity: 0.9 }}>
              Glass navbar with light color scheme over an image.
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const AllHeights: Story = {
  args: { children: null },
  render: () => (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-8)",
        padding: "var(--spacing-4)",
      }}
    >
      <div>
        <h3
          style={{
            marginBottom: "var(--spacing-4)",
            paddingLeft: "var(--spacing-4)",
          }}
        >
          Small (56px)
        </h3>
        <Navbar height="sm">
          <Navbar.Brand>Brand</Navbar.Brand>
          <Navbar.Nav>
            <Navbar.Link href="/" active>
              Home
            </Navbar.Link>
            <Navbar.Link href="/about">About</Navbar.Link>
            <Navbar.Link href="/contact">Contact</Navbar.Link>
          </Navbar.Nav>
          <Navbar.Actions>
            <Button variant="primary" size="sm">
              Action
            </Button>
          </Navbar.Actions>
        </Navbar>
      </div>

      <div>
        <h3
          style={{
            marginBottom: "var(--spacing-4)",
            paddingLeft: "var(--spacing-4)",
          }}
        >
          Medium (64px) - Default
        </h3>
        <Navbar height="md">
          <Navbar.Brand>Brand</Navbar.Brand>
          <Navbar.Nav>
            <Navbar.Link href="/" active>
              Home
            </Navbar.Link>
            <Navbar.Link href="/about">About</Navbar.Link>
            <Navbar.Link href="/contact">Contact</Navbar.Link>
          </Navbar.Nav>
          <Navbar.Actions>
            <Button variant="primary" size="sm">
              Action
            </Button>
          </Navbar.Actions>
        </Navbar>
      </div>

      <div>
        <h3
          style={{
            marginBottom: "var(--spacing-4)",
            paddingLeft: "var(--spacing-4)",
          }}
        >
          Large (72px)
        </h3>
        <Navbar height="lg">
          <Navbar.Brand>Brand</Navbar.Brand>
          <Navbar.Nav>
            <Navbar.Link href="/" active>
              Home
            </Navbar.Link>
            <Navbar.Link href="/about">About</Navbar.Link>
            <Navbar.Link href="/contact">Contact</Navbar.Link>
          </Navbar.Nav>
          <Navbar.Actions>
            <Button variant="primary" size="sm">
              Action
            </Button>
          </Navbar.Actions>
        </Navbar>
      </div>
    </div>
  ),
};

// Responsive navbar with mobile menu
const ResponsiveNavbarDemo = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <Navbar sticky>
      <Navbar.Brand href="/">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--spacing-2)",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "var(--radius-sm)",
              background: "var(--interactive-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--interactive-primary-text)",
              fontWeight: "var(--font-weight-bold)",
              fontSize: "var(--font-size-14)",
            }}
          >
            O
          </div>
          <span>Orion</span>
        </div>
      </Navbar.Brand>

      {/* Desktop nav - hidden on mobile */}
      <Navbar.Nav>
        <Navbar.Link href="/" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="/features">Features</Navbar.Link>
        <Navbar.Link href="/pricing">Pricing</Navbar.Link>
        <Navbar.Link href="/docs">Documentation</Navbar.Link>
        <Navbar.Link href="/blog">Blog</Navbar.Link>
      </Navbar.Nav>

      {/* Desktop actions - hidden on mobile */}
      <Navbar.Actions>
        <Button variant="ghost" size="sm">
          Sign In
        </Button>
        <Button variant="primary" size="sm">
          Get Started
        </Button>
      </Navbar.Actions>

      {/* Mobile toggle - shown only on mobile */}
      <Navbar.Toggle isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />

      {/* Mobile menu - shown only when open on mobile */}
      <Navbar.Collapse isOpen={isOpen}>
        <Navbar.Link href="/" active onClick={closeMenu}>
          Home
        </Navbar.Link>
        <Navbar.Link href="/features" onClick={closeMenu}>
          Features
        </Navbar.Link>
        <Navbar.Link href="/pricing" onClick={closeMenu}>
          Pricing
        </Navbar.Link>
        <Navbar.Link href="/docs" onClick={closeMenu}>
          Documentation
        </Navbar.Link>
        <Navbar.Link href="/blog" onClick={closeMenu}>
          Blog
        </Navbar.Link>

        <Navbar.CollapseActions>
          <Button variant="secondary" fullWidth>
            Sign In
          </Button>
          <Button variant="primary" fullWidth>
            Get Started
          </Button>
        </Navbar.CollapseActions>
      </Navbar.Collapse>
    </Navbar>
  );
};

export const Responsive: Story = {
  args: { children: null },
  render: () => <ResponsiveNavbarDemo />,
  parameters: {
    docs: {
      description: {
        story:
          "Resize the viewport to see the responsive behavior. On mobile (< 768px), the nav and actions are hidden and a hamburger menu appears.",
      },
    },
  },
};

// Mobile preview (forced mobile view)
export const MobileView: Story = {
  args: { children: null },
  render: () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <div
        style={{
          maxWidth: "375px",
          margin: "0 auto",
          border: "1px solid var(--border-subtle)",
          borderRadius: "var(--radius-control)",
          overflow: "hidden",
        }}
      >
        <Navbar>
          <Navbar.Brand href="/">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--spacing-2)",
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "var(--radius-sm)",
                  background: "var(--interactive-primary)",
                }}
              />
              <span>App</span>
            </div>
          </Navbar.Brand>

          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              background: "transparent",
              border: "none",
              borderRadius: "var(--radius-sm)",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--spacing-1)",
              }}
            >
              <span
                style={{
                  width: "20px",
                  height: "2px",
                  background: "var(--text-primary)",
                  borderRadius: "1px",
                  transform: isOpen ? "translateY(7px) rotate(45deg)" : "none",
                  transition: "all 0.2s",
                }}
              />
              <span
                style={{
                  width: "20px",
                  height: "2px",
                  background: "var(--text-primary)",
                  borderRadius: "1px",
                  opacity: isOpen ? 0 : 1,
                  transition: "all 0.2s",
                }}
              />
              <span
                style={{
                  width: "20px",
                  height: "2px",
                  background: "var(--text-primary)",
                  borderRadius: "1px",
                  transform: isOpen
                    ? "translateY(-7px) rotate(-45deg)"
                    : "none",
                  transition: "all 0.2s",
                }}
              />
            </div>
          </button>

          <Navbar.Collapse isOpen={isOpen}>
            <Navbar.Link href="/" active>
              Home
            </Navbar.Link>
            <Navbar.Link href="/features">Features</Navbar.Link>
            <Navbar.Link href="/pricing">Pricing</Navbar.Link>
            <Navbar.Link href="/about">About</Navbar.Link>

            <Navbar.CollapseActions>
              <Button variant="secondary" fullWidth>
                Sign In
              </Button>
              <Button variant="primary" fullWidth>
                Get Started
              </Button>
            </Navbar.CollapseActions>
          </Navbar.Collapse>
        </Navbar>

        <div
          style={{
            padding: "var(--spacing-6)",
            minHeight: "200px",
            background: "var(--surface-subtle)",
          }}
        >
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "var(--font-size-14)",
            }}
          >
            This demonstrates the mobile menu. The toggle button shows a
            hamburger that animates to an X when open.
          </p>
        </div>
      </div>
    );
  },
};

export const AllVariants: Story = {
  args: { children: null },
  render: () => (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-8)",
        padding: "var(--spacing-4)",
      }}
    >
      <div>
        <h3
          style={{
            marginBottom: "var(--spacing-4)",
            paddingLeft: "var(--spacing-4)",
          }}
        >
          Solid (Default)
        </h3>
        <Navbar variant="solid">
          <Navbar.Brand>Brand</Navbar.Brand>
          <Navbar.Nav>
            <Navbar.Link href="/" active>
              Home
            </Navbar.Link>
            <Navbar.Link href="/about">About</Navbar.Link>
            <Navbar.Link href="/contact">Contact</Navbar.Link>
          </Navbar.Nav>
          <Navbar.Actions>
            <Button variant="primary" size="sm">
              Action
            </Button>
          </Navbar.Actions>
        </Navbar>
      </div>

      <div
        style={{
          background:
            "linear-gradient(135deg, var(--interactive-primary), var(--color-brand-600))",
          borderRadius: "var(--radius-control)",
          padding: "var(--spacing-4) 0",
        }}
      >
        <h3
          style={{
            marginBottom: "var(--spacing-4)",
            paddingLeft: "var(--spacing-4)",
            color: "var(--interactive-primary-text)",
          }}
        >
          Transparent + colorScheme="light"
        </h3>
        <Navbar variant="transparent" colorScheme="light" bordered={false}>
          <Navbar.Brand>Brand</Navbar.Brand>
          <Navbar.Nav>
            <Navbar.Link href="/" active>
              Home
            </Navbar.Link>
            <Navbar.Link href="/about">About</Navbar.Link>
            <Navbar.Link href="/contact">Contact</Navbar.Link>
          </Navbar.Nav>
          <Navbar.Actions>
            <Button variant="secondary" size="sm">
              Action
            </Button>
          </Navbar.Actions>
        </Navbar>
      </div>

      <div
        style={{
          background:
            "linear-gradient(135deg, var(--color-neutral-900), var(--color-neutral-800))",
          borderRadius: "var(--radius-control)",
          padding: "var(--spacing-4) 0",
        }}
      >
        <h3
          style={{
            marginBottom: "var(--spacing-4)",
            paddingLeft: "var(--spacing-4)",
            color: "var(--interactive-primary-text)",
          }}
        >
          Glass + colorScheme="light"
        </h3>
        <Navbar variant="glass" colorScheme="light" bordered={false}>
          <Navbar.Brand>Brand</Navbar.Brand>
          <Navbar.Nav>
            <Navbar.Link href="/" active>
              Home
            </Navbar.Link>
            <Navbar.Link href="/about">About</Navbar.Link>
            <Navbar.Link href="/contact">Contact</Navbar.Link>
          </Navbar.Nav>
          <Navbar.Actions>
            <Button variant="primary" size="sm">
              Action
            </Button>
          </Navbar.Actions>
        </Navbar>
      </div>
    </div>
  ),
};
