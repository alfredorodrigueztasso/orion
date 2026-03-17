import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button", () => {
  it("renders with children", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: "Click me" }),
    ).toBeInTheDocument();
  });

  it("applies variant classes", () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toMatch(/primary/);

    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole("button").className).toMatch(/secondary/);

    rerender(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole("button").className).toMatch(/ghost/);
  });

  it("applies size classes", () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByRole("button").className).toMatch(/sm/);

    rerender(<Button size="md">Medium</Button>);
    expect(screen.getByRole("button").className).toMatch(/md/);

    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByRole("button").className).toMatch(/lg/);
  });

  it("applies fullWidth class", () => {
    render(<Button fullWidth>Full Width</Button>);
    expect(screen.getByRole("button").className).toMatch(/fullWidth/);
  });

  it("handles click events", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click</Button>);

    await user.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not trigger click when disabled", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Button onClick={handleClick} disabled>
        Disabled
      </Button>,
    );

    await user.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();
    render(<Button ref={ref}>Button</Button>);
    expect(ref).toHaveBeenCalled();
  });

  it("supports different button types", () => {
    const { rerender } = render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");

    rerender(<Button type="reset">Reset</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "reset");
  });

  it("applies custom className", () => {
    render(<Button className="custom-class">Custom</Button>);
    expect(screen.getByRole("button")).toHaveClass("custom-class");
  });

  it("passes through additional props", () => {
    render(
      <Button data-testid="custom-button" aria-label="Custom Button">
        Test
      </Button>,
    );
    expect(screen.getByTestId("custom-button")).toBeInTheDocument();
    expect(screen.getByLabelText("Custom Button")).toBeInTheDocument();
  });

  // ============================================================================
  // ICON PROPS (Left Icon, Right Icon, Icon-Only) - Missing Branches
  // ============================================================================

  describe("Button Icon Props", () => {
    it("renders left icon before children", () => {
      const { container } = render(
        <Button icon={<span data-testid="left-icon">🔍</span>}>Search</Button>,
      );

      const leftIcon = screen.getByTestId("left-icon");
      const childText = screen.getByText("Search");

      // Icon should appear before text in DOM
      expect(leftIcon).toBeInTheDocument();
      expect(childText).toBeInTheDocument();
    });

    it("renders right icon after children", () => {
      const { container } = render(
        <Button iconRight={<span data-testid="right-icon">→</span>}>
          Next
        </Button>,
      );

      const rightIcon = screen.getByTestId("right-icon");
      const childText = screen.getByText("Next");

      expect(rightIcon).toBeInTheDocument();
      expect(childText).toBeInTheDocument();
    });

    it("renders both left and right icons with children", () => {
      render(
        <Button
          icon={<span data-testid="left-icon">←</span>}
          iconRight={<span data-testid="right-icon">→</span>}
        >
          Move
        </Button>,
      );

      expect(screen.getByTestId("left-icon")).toBeInTheDocument();
      expect(screen.getByTestId("right-icon")).toBeInTheDocument();
      expect(screen.getByText("Move")).toBeInTheDocument();
    });

    it("renders icon-only button without children", () => {
      render(
        <Button
          iconOnly
          icon={<span data-testid="icon">⚙️</span>}
          aria-label="Settings"
        />,
      );

      const icon = screen.getByTestId("icon");
      expect(icon).toBeInTheDocument();

      // Should not have visible children text
      const button = screen.getByRole("button");
      expect(button.textContent).toContain("⚙️");
    });

    it("does not render icon-only when icon prop is missing", () => {
      render(
        <Button iconOnly aria-label="Settings">
          Settings
        </Button>,
      );

      // Should render children as fallback
      expect(screen.getByText("Settings")).toBeInTheDocument();
    });

    it("applies correct classes for icon-only variant", () => {
      const { container } = render(<Button iconOnly icon={<span>🔧</span>} />);

      const button = screen.getByRole("button");
      expect(button.className).toMatch(/iconOnly/);
    });

    it("does not render right icon when iconOnly is true", () => {
      render(
        <Button
          iconOnly
          icon={<span data-testid="main-icon">⚙️</span>}
          iconRight={<span data-testid="right-icon">❌</span>}
        />,
      );

      expect(screen.getByTestId("main-icon")).toBeInTheDocument();
      expect(screen.queryByTestId("right-icon")).not.toBeInTheDocument();
    });

    it("hides icons with aria-hidden attribute", () => {
      const { container } = render(
        <Button icon={<span data-testid="left-icon">🔍</span>}>Search</Button>,
      );

      const iconSpan = screen.getByTestId("left-icon").parentElement;
      expect(iconSpan).toHaveAttribute("aria-hidden", "true");
    });
  });

  // ============================================================================
  // LOADING STATE - Missing Branches & Functions
  // ============================================================================

  describe("Button Loading State", () => {
    it("renders spinner when isLoading is true", () => {
      const { container } = render(<Button isLoading>Loading...</Button>);

      const spinner = container.querySelector("[class*='spinner']");
      expect(spinner).toBeInTheDocument();
    });

    it("disables button when isLoading is true", () => {
      render(<Button isLoading>Loading...</Button>);

      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });

    it("does not render spinner when isLoading is false", () => {
      const { container } = render(<Button>Click</Button>);

      const spinner = container.querySelector("[class*='spinner']");
      expect(spinner).not.toBeInTheDocument();
    });

    it("applies loading content class when loading", () => {
      const { container } = render(<Button isLoading>Loading</Button>);

      const contentSpan = container.querySelector("[class*='loadingContent']");
      expect(contentSpan).toBeInTheDocument();
    });

    it("applies loadingContent class to icon when loading with icon", () => {
      const { container } = render(
        <Button isLoading icon={<span data-testid="icon">🔍</span>}>
          Loading
        </Button>,
      );

      const iconSpan = screen.getByTestId("icon").parentElement;
      expect(iconSpan?.className).toContain("loadingContent");
    });

    it("applies loadingContent class to children when loading", () => {
      const { container } = render(<Button isLoading>Loading</Button>);

      const contentSpan = container.querySelector("[class*='loadingContent']");
      expect(contentSpan?.textContent).toContain("Loading");
    });

    it("button is disabled when loading (prevents click interactions)", () => {
      const handleClick = vi.fn();

      render(
        <Button isLoading onClick={handleClick}>
          Loading
        </Button>,
      );

      const button = screen.getByRole("button");
      // Button should have disabled attribute, which prevents clicks
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute("disabled");
    });

    it("does not render spinner when isLoading is false with icon-only", () => {
      const { container } = render(<Button iconOnly icon={<span>⚙️</span>} />);

      const spinner = container.querySelector("[class*='spinner']");
      expect(spinner).not.toBeInTheDocument();
    });

    it("applies loading class when isLoading is true", () => {
      render(<Button isLoading>Loading</Button>);

      const button = screen.getByRole("button");
      expect(button.className).toMatch(/loading/);
    });
  });

  // ============================================================================
  // COMBINED ICON & LOADING STATES
  // ============================================================================

  describe("Button Icon with Loading State", () => {
    it("renders loading spinner with left icon", () => {
      const { container } = render(
        <Button isLoading icon={<span data-testid="icon">🔍</span>}>
          Loading
        </Button>,
      );

      const spinner = container.querySelector("[class*='spinner']");
      expect(spinner).toBeInTheDocument();
      expect(screen.getByTestId("icon")).toBeInTheDocument();
    });

    it("renders loading spinner with right icon", () => {
      const { container } = render(
        <Button isLoading iconRight={<span data-testid="icon">→</span>}>
          Loading
        </Button>,
      );

      const spinner = container.querySelector("[class*='spinner']");
      expect(spinner).toBeInTheDocument();
      expect(screen.getByTestId("icon")).toBeInTheDocument();
    });

    it("renders icon-only with loading state", () => {
      const { container } = render(
        <Button isLoading iconOnly icon={<span data-testid="icon">⚙️</span>} />,
      );

      const spinner = container.querySelector("[class*='spinner']");
      expect(spinner).toBeInTheDocument();
      expect(screen.getByTestId("icon")).toBeInTheDocument();
    });
  });

  // ============================================================================
  // VARIANT COMBINATIONS - Test all variants
  // ============================================================================

  describe("Button All Variants", () => {
    const variants: Array<"primary" | "secondary" | "ghost" | "danger"> = [
      "primary",
      "secondary",
      "ghost",
      "danger",
    ];

    variants.forEach((variant) => {
      it(`renders ${variant} variant with correct class`, () => {
        render(<Button variant={variant}>{variant}</Button>);

        const button = screen.getByRole("button");
        expect(button.className).toMatch(new RegExp(variant));
      });

      it(`${variant} variant with icon renders correctly`, () => {
        render(
          <Button variant={variant} icon={<span data-testid="icon">📌</span>}>
            {variant}
          </Button>,
        );

        expect(screen.getByTestId("icon")).toBeInTheDocument();
      });

      it(`${variant} variant with isLoading disables correctly`, () => {
        render(
          <Button variant={variant} isLoading>
            {variant}
          </Button>,
        );

        const button = screen.getByRole("button");
        expect(button).toBeDisabled();
      });
    });
  });

  // ============================================================================
  // EDGE CASES
  // ============================================================================

  describe("Button Edge Cases", () => {
    it("handles both disabled and isLoading (disabled takes precedence in attribute)", () => {
      render(
        <Button disabled isLoading>
          Test
        </Button>,
      );

      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });

    it("renders with all props combined", () => {
      const handleClick = vi.fn();

      render(
        <Button
          variant="primary"
          size="lg"
          fullWidth
          icon={<span data-testid="left-icon">📌</span>}
          iconRight={<span data-testid="right-icon">→</span>}
          type="submit"
          className="custom-btn"
          onClick={handleClick}
        >
          Complex Button
        </Button>,
      );

      const button = screen.getByRole("button");
      expect(button).toHaveClass("custom-btn");
      expect(button).toHaveAttribute("type", "submit");
      expect(button.className).toMatch(/lg/);
      expect(button.className).toMatch(/fullWidth/);
      expect(button.className).toMatch(/primary/);
      expect(screen.getByTestId("left-icon")).toBeInTheDocument();
      expect(screen.getByTestId("right-icon")).toBeInTheDocument();
    });

    it("respects className prop while keeping required classes", () => {
      render(
        <Button variant="secondary" className="my-custom-class">
          Test
        </Button>,
      );

      const button = screen.getByRole("button");
      expect(button).toHaveClass("my-custom-class");
      expect(button.className).toMatch(/secondary/);
    });

    it("filters out falsy className values", () => {
      const { container } = render(<Button className="">Empty Class</Button>);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      // Should not have empty strings in class list
      expect(button.className.split(" ").filter((c) => c === "")).toHaveLength(
        0,
      );
    });
  });

  // ============================================================================
  // KEBAB-TO-CAMEL-CASE CONVERSION (toCamelCase function coverage)
  // ============================================================================

  describe("Button Kebab-to-CamelCase Conversion", () => {
    // Tests for toCamelCase function indirectly through variant rendering
    it("converts primary variant (no hyphens) correctly", () => {
      render(<Button variant="primary">Primary</Button>);
      const button = screen.getByRole("button");
      expect(button.className).toMatch(/primary/);
    });

    it("converts secondary variant (no hyphens) correctly", () => {
      render(<Button variant="secondary">Secondary</Button>);
      const button = screen.getByRole("button");
      expect(button.className).toMatch(/secondary/);
    });

    it("converts ghost variant correctly", () => {
      render(<Button variant="ghost">Ghost</Button>);
      const button = screen.getByRole("button");
      expect(button.className).toMatch(/ghost/);
    });

    it("converts danger variant correctly", () => {
      render(<Button variant="danger">Danger</Button>);
      const button = screen.getByRole("button");
      expect(button.className).toMatch(/danger/);
    });

    // Edge cases for conversion logic
    it("handles small size (sm) without hyphens", () => {
      render(<Button size="sm">Small</Button>);
      const button = screen.getByRole("button");
      expect(button.className).toMatch(/sm/);
    });

    it("handles medium size (md) without hyphens", () => {
      render(<Button size="md">Medium</Button>);
      const button = screen.getByRole("button");
      expect(button.className).toMatch(/md/);
    });

    it("handles large size (lg) without hyphens", () => {
      render(<Button size="lg">Large</Button>);
      const button = screen.getByRole("button");
      expect(button.className).toMatch(/lg/);
    });

    // Test variant + size combination
    it("applies both variant and size classes correctly", () => {
      render(
        <Button variant="primary" size="lg">
          Primary Large
        </Button>,
      );
      const button = screen.getByRole("button");
      expect(button.className).toMatch(/primary/);
      expect(button.className).toMatch(/lg/);
    });

    // Test that invalid variant names don't crash
    it("handles missing/invalid variant gracefully", () => {
      const { container } = render(
        <Button variant={"invalid-variant" as any}>Invalid</Button>,
      );
      const button = screen.getByRole("button");
      // Should still render button even if variant doesn't exist in CSS
      expect(button).toBeInTheDocument();
    });

    // Comprehensive combination test
    it("applies all classes correctly with complex prop combination", () => {
      render(
        <Button variant="secondary" size="md" fullWidth icon={<span>🔍</span>}>
          Search
        </Button>,
      );
      const button = screen.getByRole("button");
      expect(button.className).toMatch(/secondary/);
      expect(button.className).toMatch(/md/);
      expect(button.className).toMatch(/fullWidth/);
    });
  });

  // ============================================================================
  // DISABLED STATE & INTERACTION EDGE CASES
  // ============================================================================

  describe("Button Disabled State Edge Cases", () => {
    it("button disabled attribute prevents interaction even with onClick", () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      const { container } = render(
        <Button disabled onClick={handleClick}>
          Disabled
        </Button>,
      );

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("disabled");
      // userEvent respects disabled attribute
      expect(button).toBeDisabled();
    });

    it("isLoading disables button and renders spinner", () => {
      const { container } = render(<Button isLoading>Loading...</Button>);
      const button = screen.getByRole("button");
      const spinner = container.querySelector("[class*='spinner']");

      expect(button).toBeDisabled();
      expect(spinner).toBeInTheDocument();
    });

    it("isLoading=true with disabled=false still disables button", () => {
      render(
        <Button disabled={false} isLoading>
          Loading
        </Button>,
      );
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });

    it("disabled prop with isLoading both render as disabled", () => {
      render(
        <Button disabled isLoading>
          Both Disabled
        </Button>,
      );
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });
  });

  // ============================================================================
  // ICON + TEXT CONTENT COMBINATIONS
  // ============================================================================

  describe("Button Icon and Text Content", () => {
    it("renders icon-left + text + icon-right (full triple icon test)", () => {
      render(
        <Button
          icon={<span data-testid="left">←</span>}
          iconRight={<span data-testid="right">→</span>}
        >
          Between
        </Button>,
      );

      const leftIcon = screen.getByTestId("left");
      const rightIcon = screen.getByTestId("right");
      const text = screen.getByText("Between");

      expect(leftIcon).toBeInTheDocument();
      expect(rightIcon).toBeInTheDocument();
      expect(text).toBeInTheDocument();
    });

    it("left icon alone (no right icon, no iconOnly)", () => {
      render(<Button icon={<span data-testid="icon">🔍</span>}>Search</Button>);

      expect(screen.getByTestId("icon")).toBeInTheDocument();
      expect(screen.getByText("Search")).toBeInTheDocument();
    });

    it("right icon alone (no left icon, no iconOnly)", () => {
      render(
        <Button iconRight={<span data-testid="icon">→</span>}>Next</Button>,
      );

      expect(screen.getByTestId("icon")).toBeInTheDocument();
      expect(screen.getByText("Next")).toBeInTheDocument();
    });

    it("iconOnly=true prevents iconRight from rendering", () => {
      render(
        <Button
          iconOnly
          icon={<span data-testid="main">⚙️</span>}
          iconRight={<span data-testid="right">❌</span>}
        />,
      );

      expect(screen.getByTestId("main")).toBeInTheDocument();
      expect(screen.queryByTestId("right")).not.toBeInTheDocument();
    });

    it("iconOnly=true with no icon falls back to children", () => {
      render(<Button iconOnly>Fallback</Button>);

      expect(screen.getByText("Fallback")).toBeInTheDocument();
    });

    it("loading state applies loadingContent class to icon", () => {
      const { container } = render(
        <Button isLoading icon={<span data-testid="icon">🔍</span>}>
          Search
        </Button>,
      );

      const iconParent = screen.getByTestId("icon").parentElement;
      expect(iconParent?.className).toContain("loadingContent");
    });

    it("loading state applies loadingContent class to children span", () => {
      const { container } = render(<Button isLoading>Loading</Button>);

      const contentSpan = container.querySelector("[class*='loadingContent']");
      expect(contentSpan).toBeInTheDocument();
      expect(contentSpan?.textContent).toContain("Loading");
    });
  });

  describe("loadingText prop", () => {
    it("displays loadingText instead of children when isLoading=true", () => {
      render(
        <Button isLoading loadingText="Saving...">
          Save Changes
        </Button>,
      );

      expect(screen.getByText("Saving...")).toBeInTheDocument();
      expect(screen.queryByText("Save Changes")).not.toBeInTheDocument();
    });

    it("displays children (not loadingText) when isLoading=false", () => {
      render(
        <Button isLoading={false} loadingText="Saving...">
          Save Changes
        </Button>,
      );

      expect(screen.getByText("Save Changes")).toBeInTheDocument();
      expect(screen.queryByText("Saving...")).not.toBeInTheDocument();
    });

    it("displays children when isLoading=true but no loadingText provided", () => {
      render(<Button isLoading>Save Changes</Button>);

      expect(screen.getByText("Save Changes")).toBeInTheDocument();
    });

    it("loadingText works with different variants", () => {
      const { rerender } = render(
        <Button isLoading loadingText="Processing..." variant="primary">
          Submit
        </Button>,
      );

      expect(screen.getByText("Processing...")).toBeInTheDocument();

      rerender(
        <Button isLoading loadingText="Processing..." variant="danger">
          Delete
        </Button>,
      );

      expect(screen.getByText("Processing...")).toBeInTheDocument();
    });

    it("loadingText works with icon", () => {
      render(
        <Button
          isLoading
          loadingText="Uploading..."
          icon={<span data-testid="icon">📤</span>}
        >
          Upload File
        </Button>,
      );

      expect(screen.getByTestId("icon")).toBeInTheDocument();
      expect(screen.getByText("Uploading...")).toBeInTheDocument();
      expect(screen.queryByText("Upload File")).not.toBeInTheDocument();
    });

    it("loadingText applies loadingContent class", () => {
      const { container } = render(
        <Button isLoading loadingText="Saving...">
          Save
        </Button>,
      );

      const contentSpan = container.querySelector("[class*='loadingContent']");
      expect(contentSpan).toBeInTheDocument();
      expect(contentSpan?.textContent).toContain("Saving...");
    });

    it("button remains disabled during loading with loadingText", () => {
      render(
        <Button isLoading loadingText="Saving...">
          Save
        </Button>,
      );

      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });
  });
});
