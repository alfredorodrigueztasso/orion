import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { Navbar } from "./Navbar";

describe("Navbar", () => {
  it("renders navbar with children", () => {
    render(
      <Navbar>
        <Navbar.Brand>Brand</Navbar.Brand>
      </Navbar>,
    );
    expect(screen.getByText("Brand")).toBeInTheDocument();
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("applies height classes correctly", () => {
    const { container, rerender } = render(
      <Navbar height="sm">
        <Navbar.Brand>Brand</Navbar.Brand>
      </Navbar>,
    );
    expect((container.firstChild as HTMLElement).className).toMatch(/sm/);

    rerender(
      <Navbar height="md">
        <Navbar.Brand>Brand</Navbar.Brand>
      </Navbar>,
    );
    expect((container.firstChild as HTMLElement).className).toMatch(/md/);

    rerender(
      <Navbar height="lg">
        <Navbar.Brand>Brand</Navbar.Brand>
      </Navbar>,
    );
    expect((container.firstChild as HTMLElement).className).toMatch(/lg/);
  });

  it("uses default height when not specified", () => {
    const { container } = render(
      <Navbar>
        <Navbar.Brand>Brand</Navbar.Brand>
      </Navbar>,
    );
    expect((container.firstChild as HTMLElement).className).toMatch(/md/);
  });

  it("applies variant classes correctly", () => {
    const { container, rerender } = render(
      <Navbar variant="solid">
        <Navbar.Brand>Brand</Navbar.Brand>
      </Navbar>,
    );
    expect((container.firstChild as HTMLElement).className).toMatch(/solid/);

    rerender(
      <Navbar variant="transparent">
        <Navbar.Brand>Brand</Navbar.Brand>
      </Navbar>,
    );
    expect((container.firstChild as HTMLElement).className).toMatch(
      /transparent/,
    );

    rerender(
      <Navbar variant="glass">
        <Navbar.Brand>Brand</Navbar.Brand>
      </Navbar>,
    );
    expect((container.firstChild as HTMLElement).className).toMatch(/glass/);
  });

  it("uses default variant when not specified", () => {
    const { container } = render(
      <Navbar>
        <Navbar.Brand>Brand</Navbar.Brand>
      </Navbar>,
    );
    expect((container.firstChild as HTMLElement).className).toMatch(/solid/);
  });

  it("applies sticky class when sticky is true", () => {
    const { container } = render(
      <Navbar sticky>
        <Navbar.Brand>Brand</Navbar.Brand>
      </Navbar>,
    );
    expect((container.firstChild as HTMLElement).className).toMatch(/sticky/);
  });

  it("does not apply sticky class by default", () => {
    const { container } = render(
      <Navbar>
        <Navbar.Brand>Brand</Navbar.Brand>
      </Navbar>,
    );
    expect((container.firstChild as HTMLElement).className).not.toMatch(
      /sticky/,
    );
  });

  it("applies bordered class by default", () => {
    const { container } = render(
      <Navbar>
        <Navbar.Brand>Brand</Navbar.Brand>
      </Navbar>,
    );
    expect((container.firstChild as HTMLElement).className).toMatch(/bordered/);
  });

  it("does not apply bordered class when bordered is false", () => {
    const { container } = render(
      <Navbar bordered={false}>
        <Navbar.Brand>Brand</Navbar.Brand>
      </Navbar>,
    );
    expect((container.firstChild as HTMLElement).className).not.toMatch(
      /bordered/,
    );
  });

  it("applies custom className", () => {
    const { container } = render(
      <Navbar className="custom-navbar">
        <Navbar.Brand>Brand</Navbar.Brand>
      </Navbar>,
    );
    expect(container.firstChild).toHaveClass("custom-navbar");
  });

  it("passes through HTML attributes", () => {
    render(
      <Navbar data-testid="test-navbar">
        <Navbar.Brand>Brand</Navbar.Brand>
      </Navbar>,
    );
    expect(screen.getByTestId("test-navbar")).toBeInTheDocument();
  });

  describe("Navbar.Brand", () => {
    it("renders brand content", () => {
      render(
        <Navbar>
          <Navbar.Brand>MyApp</Navbar.Brand>
        </Navbar>,
      );
      expect(screen.getByText("MyApp")).toBeInTheDocument();
    });

    it("renders as link when href is provided", () => {
      render(
        <Navbar>
          <Navbar.Brand href="/">MyApp</Navbar.Brand>
        </Navbar>,
      );
      const brand = screen.getByText("MyApp");
      expect(brand.tagName).toBe("A");
      expect(brand).toHaveAttribute("href", "/");
    });

    it("renders as div when href is not provided", () => {
      render(
        <Navbar>
          <Navbar.Brand>MyApp</Navbar.Brand>
        </Navbar>,
      );
      const brand = screen.getByText("MyApp");
      expect(brand.tagName).toBe("DIV");
    });

    it("applies custom className to brand", () => {
      render(
        <Navbar>
          <Navbar.Brand className="custom-brand">Brand</Navbar.Brand>
        </Navbar>,
      );
      const brand = screen.getByText("Brand");
      expect(brand).toHaveClass("custom-brand");
    });

    it("renders complex brand content", () => {
      render(
        <Navbar>
          <Navbar.Brand>
            <img src="/logo.svg" alt="Logo" />
            <span>MyApp</span>
          </Navbar.Brand>
        </Navbar>,
      );
      expect(screen.getByAltText("Logo")).toBeInTheDocument();
      expect(screen.getByText("MyApp")).toBeInTheDocument();
    });
  });

  describe("Navbar.Nav", () => {
    it("renders navigation container", () => {
      render(
        <Navbar>
          <Navbar.Nav>
            <Navbar.Link href="/">Home</Navbar.Link>
          </Navbar.Nav>
        </Navbar>,
      );
      expect(screen.getByRole("navigation")).toBeInTheDocument();
    });

    it("applies custom className to nav", () => {
      const { container } = render(
        <Navbar>
          <Navbar.Nav className="custom-nav">
            <Navbar.Link href="/">Home</Navbar.Link>
          </Navbar.Nav>
        </Navbar>,
      );
      const nav = container.querySelector("nav");
      expect(nav?.className).toContain("custom-nav");
    });

    it("passes through HTML attributes to nav", () => {
      render(
        <Navbar>
          <Navbar.Nav data-testid="test-nav">
            <Navbar.Link href="/">Home</Navbar.Link>
          </Navbar.Nav>
        </Navbar>,
      );
      expect(screen.getByTestId("test-nav")).toBeInTheDocument();
    });
  });

  describe("Navbar.Link", () => {
    it("renders link with href", () => {
      render(
        <Navbar>
          <Navbar.Nav>
            <Navbar.Link href="/about">About</Navbar.Link>
          </Navbar.Nav>
        </Navbar>,
      );
      const link = screen.getByText("About");
      expect(link.tagName).toBe("A");
      expect(link).toHaveAttribute("href", "/about");
    });

    it("applies active class when active is true", () => {
      render(
        <Navbar>
          <Navbar.Nav>
            <Navbar.Link href="/" active>
              Home
            </Navbar.Link>
          </Navbar.Nav>
        </Navbar>,
      );
      const link = screen.getByText("Home");
      expect(link.className).toMatch(/active/);
    });

    it("does not apply active class by default", () => {
      render(
        <Navbar>
          <Navbar.Nav>
            <Navbar.Link href="/">Home</Navbar.Link>
          </Navbar.Nav>
        </Navbar>,
      );
      const link = screen.getByText("Home");
      expect(link.className).not.toMatch(/active/);
    });

    it('has aria-current="page" when active', () => {
      render(
        <Navbar>
          <Navbar.Nav>
            <Navbar.Link href="/" active>
              Home
            </Navbar.Link>
          </Navbar.Nav>
        </Navbar>,
      );
      expect(screen.getByText("Home")).toHaveAttribute("aria-current", "page");
    });

    it("does not have aria-current when not active", () => {
      render(
        <Navbar>
          <Navbar.Nav>
            <Navbar.Link href="/about">About</Navbar.Link>
          </Navbar.Nav>
        </Navbar>,
      );
      expect(screen.getByText("About")).not.toHaveAttribute("aria-current");
    });

    it("applies custom className to link", () => {
      render(
        <Navbar>
          <Navbar.Nav>
            <Navbar.Link href="/" className="custom-link">
              Home
            </Navbar.Link>
          </Navbar.Nav>
        </Navbar>,
      );
      expect(screen.getByText("Home")).toHaveClass("custom-link");
    });

    it("passes through HTML attributes to link", () => {
      render(
        <Navbar>
          <Navbar.Nav>
            <Navbar.Link href="/" data-testid="test-link">
              Home
            </Navbar.Link>
          </Navbar.Nav>
        </Navbar>,
      );
      expect(screen.getByTestId("test-link")).toBeInTheDocument();
    });
  });

  describe("Navbar.Actions", () => {
    it("renders actions container", () => {
      render(
        <Navbar>
          <Navbar.Actions>
            <button>Sign In</button>
          </Navbar.Actions>
        </Navbar>,
      );
      expect(screen.getByText("Sign In")).toBeInTheDocument();
    });

    it("applies custom className to actions", () => {
      render(
        <Navbar>
          <Navbar.Actions className="custom-actions">
            <button>Sign In</button>
          </Navbar.Actions>
        </Navbar>,
      );
      const actions = screen.getByText("Sign In").parentElement;
      expect(actions).toHaveClass("custom-actions");
    });

    it("passes through HTML attributes to actions", () => {
      render(
        <Navbar>
          <Navbar.Actions data-testid="test-actions">
            <button>Sign In</button>
          </Navbar.Actions>
        </Navbar>,
      );
      expect(screen.getByTestId("test-actions")).toBeInTheDocument();
    });

    it("renders multiple action buttons", () => {
      render(
        <Navbar>
          <Navbar.Actions>
            <button>Sign In</button>
            <button>Sign Up</button>
          </Navbar.Actions>
        </Navbar>,
      );
      expect(screen.getByText("Sign In")).toBeInTheDocument();
      expect(screen.getByText("Sign Up")).toBeInTheDocument();
    });
  });

  describe("Complete Navbar", () => {
    it("renders all sections together", () => {
      render(
        <Navbar>
          <Navbar.Brand>Brand</Navbar.Brand>
          <Navbar.Nav>
            <Navbar.Link href="/">Home</Navbar.Link>
            <Navbar.Link href="/about">About</Navbar.Link>
          </Navbar.Nav>
          <Navbar.Actions>
            <button>Sign In</button>
          </Navbar.Actions>
        </Navbar>,
      );

      expect(screen.getByText("Brand")).toBeInTheDocument();
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("About")).toBeInTheDocument();
      expect(screen.getByText("Sign In")).toBeInTheDocument();
    });

    it("renders complex navbar with all features", () => {
      render(
        <Navbar sticky bordered variant="glass" height="lg">
          <Navbar.Brand href="/">
            <img src="/logo.svg" alt="Logo" />
            MyApp
          </Navbar.Brand>
          <Navbar.Nav>
            <Navbar.Link href="/" active>
              Home
            </Navbar.Link>
            <Navbar.Link href="/products">Products</Navbar.Link>
            <Navbar.Link href="/pricing">Pricing</Navbar.Link>
            <Navbar.Link href="/about">About</Navbar.Link>
          </Navbar.Nav>
          <Navbar.Actions>
            <button>Sign In</button>
            <button>Get Started</button>
          </Navbar.Actions>
        </Navbar>,
      );

      // Check all sections exist
      expect(screen.getByAltText("Logo")).toBeInTheDocument();
      expect(screen.getByText("MyApp")).toBeInTheDocument();
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Products")).toBeInTheDocument();
      expect(screen.getByText("Pricing")).toBeInTheDocument();
      expect(screen.getByText("About")).toBeInTheDocument();
      expect(screen.getByText("Sign In")).toBeInTheDocument();
      expect(screen.getByText("Get Started")).toBeInTheDocument();

      // Check active link
      expect(screen.getByText("Home")).toHaveAttribute("aria-current", "page");

      // Check navbar classes
      const navbar = screen.getByRole("banner");
      expect(navbar.className).toMatch(/glass/);
      expect(navbar.className).toMatch(/lg/);
      expect(navbar.className).toMatch(/sticky/);
      expect(navbar.className).toMatch(/bordered/);
    });
  });

  // ============================================================================
  // MISSING BRANCHES & TOGGLE/COLLAPSE COMPONENTS COVERAGE
  // ============================================================================

  describe("Navbar.Toggle", () => {
    it("renders with correct aria-label when isOpen is false", () => {
      const { container } = render(
        <Navbar>
          <Navbar.Toggle isOpen={false} onToggle={() => {}} />
        </Navbar>,
      );

      const toggle = container.querySelector("button[aria-label]");
      expect(toggle).toHaveAttribute("aria-label", "Open menu");
      expect(toggle).toHaveAttribute("aria-expanded", "false");
    });

    it("renders with correct aria-label when isOpen is true", () => {
      const { container } = render(
        <Navbar>
          <Navbar.Toggle isOpen={true} onToggle={() => {}} />
        </Navbar>,
      );

      const toggle = container.querySelector("button[aria-label]");
      expect(toggle).toHaveAttribute("aria-label", "Close menu");
      expect(toggle).toHaveAttribute("aria-expanded", "true");
      expect(toggle?.className).toMatch(/toggleOpen/);
    });

    it("calls onToggle callback when clicked", async () => {
      const user = userEvent.setup();
      const handleToggle = vi.fn();

      const { container } = render(
        <Navbar>
          <Navbar.Toggle isOpen={false} onToggle={handleToggle} />
        </Navbar>,
      );

      const toggle = container.querySelector("button[aria-label]");
      if (toggle) {
        await user.click(toggle);
      }

      expect(handleToggle).toHaveBeenCalled();
    });
  });

  describe("Navbar.Collapse", () => {
    it("does not render collapseOpen class when isOpen is false", () => {
      const { container } = render(
        <Navbar>
          <Navbar.Collapse isOpen={false}>
            <Navbar.Link href="/">Home</Navbar.Link>
          </Navbar.Collapse>
        </Navbar>,
      );

      const collapse = container.querySelector("[class*='collapse']");
      expect(collapse?.className).not.toMatch(/collapseOpen/);
    });

    it("renders collapseOpen class when isOpen is true", () => {
      const { container } = render(
        <Navbar>
          <Navbar.Collapse isOpen={true}>
            <Navbar.Link href="/">Home</Navbar.Link>
          </Navbar.Collapse>
        </Navbar>,
      );

      const collapse = container.querySelector("[class*='collapse']");
      expect(collapse?.className).toMatch(/collapseOpen/);
    });
  });

  describe("Navbar.CollapseActions", () => {
    it("renders children in CollapseActions", () => {
      render(
        <Navbar>
          <Navbar.CollapseActions>
            <button>Sign In</button>
          </Navbar.CollapseActions>
        </Navbar>,
      );

      expect(screen.getByText("Sign In")).toBeInTheDocument();
    });

    it("applies custom className to CollapseActions", () => {
      render(
        <Navbar>
          <Navbar.CollapseActions className="custom-actions">
            <button>Sign In</button>
          </Navbar.CollapseActions>
        </Navbar>,
      );

      const button = screen.getByText("Sign In");
      expect(button.parentElement).toHaveClass("custom-actions");
    });
  });

  describe("Navbar colorScheme", () => {
    it("applies light scheme class when colorScheme='light'", () => {
      const { container } = render(
        <Navbar colorScheme="light">
          <Navbar.Brand>Brand</Navbar.Brand>
        </Navbar>,
      );

      const navbar = container.firstChild as HTMLElement;
      expect(navbar.className).toMatch(/schemeLight/);
    });
  });

  describe("Navbar responsive with Toggle and Collapse", () => {
    it("toggle and collapse work together for responsive navbar", () => {
      const { container } = render(
        <Navbar>
          <Navbar.Brand>MyApp</Navbar.Brand>
          <Navbar.Toggle isOpen={false} onToggle={() => {}} />
          <Navbar.Collapse isOpen={false}>
            <Navbar.Link href="/">Home</Navbar.Link>
            <Navbar.Link href="/about">About</Navbar.Link>
          </Navbar.Collapse>
        </Navbar>,
      );

      // Verify toggle button exists with correct aria attributes
      const toggleButton = container.querySelector("button[aria-expanded]");
      expect(toggleButton).toBeInTheDocument();
      expect(toggleButton).toHaveAttribute("aria-expanded", "false");

      // Verify collapse exists with correct class
      const collapse = container.querySelector("[class*='collapse']");
      expect(collapse).toBeInTheDocument();
      expect(collapse?.className).not.toMatch(/collapseOpen/);
    });
  });
});
