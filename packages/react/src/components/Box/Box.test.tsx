import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { Box } from "./Box";

describe("Box", () => {
  // ============================================================================
  // RENDERING & DEFAULTS
  // ============================================================================

  it("renders with children", () => {
    render(<Box>Test Content</Box>);
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("renders as div by default", () => {
    const { container } = render(<Box>Content</Box>);
    const box = container.firstChild as HTMLElement;
    expect(box.tagName.toLowerCase()).toBe("div");
  });

  it("applies custom className", () => {
    const { container } = render(<Box className="custom-box">Content</Box>);
    const box = container.firstChild as HTMLElement;
    expect(box).toHaveClass("custom-box");
  });

  // ============================================================================
  // PADDING - UNIFORM
  // ============================================================================

  it("applies uniform padding with single value", () => {
    const { container } = render(<Box padding={4}>Content</Box>);
    const box = container.firstChild as HTMLElement;
    expect(box.style.paddingTop).toBe("var(--spacing-4)");
    expect(box.style.paddingRight).toBe("var(--spacing-4)");
    expect(box.style.paddingBottom).toBe("var(--spacing-4)");
    expect(box.style.paddingLeft).toBe("var(--spacing-4)");
  });

  it("handles all spacing scale values", () => {
    const scales: Array<[string, any]> = [
      ["0", 0],
      ["px", "px"],
      ["05", "05"],
      ["1", 1],
      ["2", 2],
      ["3", 3],
      ["4", 4],
      ["8", 8],
      ["12", 12],
      ["16", 16],
      ["32", 32],
    ];

    scales.forEach(([expected, value]) => {
      const { container } = render(<Box padding={value}>Test</Box>);
      const box = container.firstChild as HTMLElement;
      const expectedValue = value === 0 ? "0px" : `var(--spacing-${expected})`;
      expect(box.style.paddingTop).toBe(expectedValue);
    });
  });

  // ============================================================================
  // PADDING - DIRECTIONAL AXES (paddingX, paddingY)
  // ============================================================================

  it("applies horizontal padding (paddingX)", () => {
    const { container } = render(<Box paddingX={3}>Content</Box>);
    const box = container.firstChild as HTMLElement;
    expect(box.style.paddingLeft).toBe("var(--spacing-3)");
    expect(box.style.paddingRight).toBe("var(--spacing-3)");
    expect(box.style.paddingTop).toBe("");
    expect(box.style.paddingBottom).toBe("");
  });

  it("applies vertical padding (paddingY)", () => {
    const { container } = render(<Box paddingY={5}>Content</Box>);
    const box = container.firstChild as HTMLElement;
    expect(box.style.paddingTop).toBe("var(--spacing-5)");
    expect(box.style.paddingBottom).toBe("var(--spacing-5)");
    expect(box.style.paddingLeft).toBe("");
    expect(box.style.paddingRight).toBe("");
  });

  // ============================================================================
  // PADDING - INDIVIDUAL DIRECTIONS
  // ============================================================================

  it("applies individual padding directions", () => {
    const { container } = render(
      <Box paddingTop={2} paddingRight={3} paddingBottom={4} paddingLeft={5}>
        Content
      </Box>,
    );
    const box = container.firstChild as HTMLElement;
    expect(box.style.paddingTop).toBe("var(--spacing-2)");
    expect(box.style.paddingRight).toBe("var(--spacing-3)");
    expect(box.style.paddingBottom).toBe("var(--spacing-4)");
    expect(box.style.paddingLeft).toBe("var(--spacing-5)");
  });

  // ============================================================================
  // PADDING PRIORITY CASCADE
  // ============================================================================

  it("applies padding priority: paddingX overrides paddingX from padding", () => {
    const { container } = render(
      <Box padding={4} paddingX={2}>
        Content
      </Box>,
    );
    const box = container.firstChild as HTMLElement;
    // padding sets all to 4, then paddingX overrides horizontal to 2
    expect(box.style.paddingTop).toBe("var(--spacing-4)");
    expect(box.style.paddingBottom).toBe("var(--spacing-4)");
    expect(box.style.paddingLeft).toBe("var(--spacing-2)");
    expect(box.style.paddingRight).toBe("var(--spacing-2)");
  });

  it("applies padding priority: individual directions override all", () => {
    const { container } = render(
      <Box padding={4} paddingX={3} paddingTop={1}>
        Content
      </Box>,
    );
    const box = container.firstChild as HTMLElement;
    expect(box.style.paddingTop).toBe("var(--spacing-1)"); // individual wins
    expect(box.style.paddingRight).toBe("var(--spacing-3)"); // paddingX wins over padding
    expect(box.style.paddingBottom).toBe("var(--spacing-4)"); // padding fallback
    expect(box.style.paddingLeft).toBe("var(--spacing-3)"); // paddingX wins over padding
  });

  it("applies padding priority: paddingY overrides padding", () => {
    const { container } = render(
      <Box padding={4} paddingY={6}>
        Content
      </Box>,
    );
    const box = container.firstChild as HTMLElement;
    expect(box.style.paddingTop).toBe("var(--spacing-6)");
    expect(box.style.paddingBottom).toBe("var(--spacing-6)");
    expect(box.style.paddingLeft).toBe("var(--spacing-4)");
    expect(box.style.paddingRight).toBe("var(--spacing-4)");
  });

  // ============================================================================
  // BACKGROUND SURFACES
  // ============================================================================

  it("applies background surface classes", () => {
    const surfaces = [
      "surface-base",
      "surface-subtle",
      "surface-layer",
      "surface-sunken",
      "surface-glass",
    ] as const;

    surfaces.forEach((surface) => {
      const { container } = render(<Box bg={surface}>Content</Box>);
      const box = container.firstChild as HTMLElement;
      expect(box.className).toMatch(new RegExp(`bg-${surface}`));
    });
  });

  // ============================================================================
  // BORDER RADIUS
  // ============================================================================

  it("applies border radius classes", () => {
    const radii = ["sm", "control", "container", "full"] as const;

    radii.forEach((r) => {
      const { container } = render(<Box radius={r}>Content</Box>);
      const box = container.firstChild as HTMLElement;
      expect(box.className).toMatch(new RegExp(`radius-${r}`));
    });
  });

  // ============================================================================
  // POLYMORPHIC ELEMENT TYPE
  // ============================================================================

  it("renders as section element with as prop", () => {
    const { container } = render(<Box as="section">Content</Box>);
    const box = container.firstChild as HTMLElement;
    expect(box.tagName.toLowerCase()).toBe("section");
  });

  it("renders as article element with as prop", () => {
    const { container } = render(<Box as="article">Content</Box>);
    const box = container.firstChild as HTMLElement;
    expect(box.tagName.toLowerCase()).toBe("article");
  });

  it("renders as form element with as prop", () => {
    const { container } = render(<Box as="form">Content</Box>);
    const box = container.firstChild as HTMLElement;
    expect(box.tagName.toLowerCase()).toBe("form");
  });

  it("renders as aside element with as prop", () => {
    const { container } = render(<Box as="aside">Content</Box>);
    const box = container.firstChild as HTMLElement;
    expect(box.tagName.toLowerCase()).toBe("aside");
  });

  // ============================================================================
  // COMBINATION & INTEGRATION
  // ============================================================================

  it("combines padding, background, and radius", () => {
    const { container } = render(
      <Box padding={4} bg="surface-layer" radius="control">
        Content
      </Box>,
    );
    const box = container.firstChild as HTMLElement;
    expect(box.style.paddingTop).toBe("var(--spacing-4)");
    expect(box.className).toMatch(/bg-surface-layer/);
    expect(box.className).toMatch(/radius-control/);
  });

  it("combines all padding directions with element type", () => {
    const { container } = render(
      <Box as="section" padding={2} paddingX={4} paddingTop={1}>
        Content
      </Box>,
    );
    const box = container.firstChild as HTMLElement;
    expect(box.tagName.toLowerCase()).toBe("section");
    expect(box.style.paddingTop).toBe("var(--spacing-1)");
    expect(box.style.paddingLeft).toBe("var(--spacing-4)");
    expect(box.style.paddingRight).toBe("var(--spacing-4)");
    expect(box.style.paddingBottom).toBe("var(--spacing-2)");
  });

  // ============================================================================
  // HTML ATTRIBUTES & PASSTHROUGH
  // ============================================================================

  it("passes through data-* attributes", () => {
    render(<Box data-testid="test-box">Content</Box>);
    expect(screen.getByTestId("test-box")).toBeInTheDocument();
  });

  it("supports custom style prop (merges with computed styles)", () => {
    const { container } = render(
      <Box padding={4} style={{ border: "1px solid red" }}>
        Content
      </Box>,
    );
    const box = container.firstChild as HTMLElement;
    expect(box.style.paddingTop).toBe("var(--spacing-4)");
    expect(box.style.border).toBe("1px solid red");
  });

  it("supports onClick handler", () => {
    let clicked = false;
    render(
      <Box
        onClick={() => {
          clicked = true;
        }}
      >
        Click me
      </Box>,
    );
    const box = screen.getByText("Click me");
    box.click();
    expect(clicked).toBe(true);
  });

  // ============================================================================
  // FORWARDREF
  // ============================================================================

  it("forwards ref to underlying element", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Box ref={ref}>Content</Box>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current?.textContent).toBe("Content");
  });

  it("forwards ref to custom element type", () => {
    const ref = React.createRef<HTMLSectionElement>();
    render(
      <Box as="section" ref={ref}>
        Content
      </Box>,
    );
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName.toLowerCase()).toBe("section");
  });

  // ============================================================================
  // MULTIPLE CHILDREN
  // ============================================================================

  it("renders multiple children", () => {
    render(
      <Box padding={4}>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </Box>,
    );
    expect(screen.getByText("Child 1")).toBeInTheDocument();
    expect(screen.getByText("Child 2")).toBeInTheDocument();
    expect(screen.getByText("Child 3")).toBeInTheDocument();
  });

  // ============================================================================
  // EDGE CASES
  // ============================================================================

  it("handles zero padding", () => {
    const { container } = render(<Box padding={0}>Content</Box>);
    const box = container.firstChild as HTMLElement;
    expect(box.style.paddingTop).toBe("0px");
    expect(box.style.paddingBottom).toBe("0px");
  });

  it("handles undefined bg and radius (no classes applied)", () => {
    const { container } = render(<Box padding={4}>Content</Box>);
    const box = container.firstChild as HTMLElement;
    // Should not have any bg or radius classes
    expect(box.className).not.toMatch(/bg-/);
    expect(box.className).not.toMatch(/radius-/);
  });

  it("merges className correctly with bg and radius", () => {
    const { container } = render(
      <Box padding={4} bg="surface-base" radius="full" className="custom">
        Content
      </Box>,
    );
    const box = container.firstChild as HTMLElement;
    expect(box).toHaveClass("custom");
    expect(box.className).toMatch(/bg-surface-base/);
    expect(box.className).toMatch(/radius-full/);
  });
});
