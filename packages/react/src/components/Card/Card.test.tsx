import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Card } from "./Card";

describe("Card", () => {
  it("renders with children", () => {
    render(
      <Card>
        <Card.Body>Test content</Card.Body>
      </Card>,
    );
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("applies variant classes", () => {
    const { container, rerender } = render(<Card variant="base">Content</Card>);
    expect((container.firstChild as HTMLElement).className).toMatch(/card/);
    expect((container.firstChild as HTMLElement).className).toMatch(/base/);

    rerender(<Card variant="elevated">Content</Card>);
    expect((container.firstChild as HTMLElement).className).toMatch(/elevated/);

    rerender(<Card variant="glass">Content</Card>);
    expect((container.firstChild as HTMLElement).className).toMatch(/glass/);
  });

  it("applies interactive class when interactive prop is true", () => {
    const { container } = render(<Card interactive>Content</Card>);
    expect((container.firstChild as HTMLElement).className).toMatch(
      /interactive/,
    );
  });

  it("does not apply interactive class by default", () => {
    const { container } = render(<Card>Content</Card>);
    expect((container.firstChild as HTMLElement).className).not.toMatch(
      /interactive/,
    );
  });

  it("applies custom className", () => {
    const { container } = render(<Card className="custom-card">Content</Card>);
    expect(container.firstChild).toHaveClass("custom-card");
  });

  it("passes through additional props", () => {
    render(<Card data-testid="test-card">Content</Card>);
    expect(screen.getByTestId("test-card")).toBeInTheDocument();
  });

  describe("Card.Header", () => {
    it("renders header content", () => {
      render(
        <Card>
          <Card.Header>Header Text</Card.Header>
        </Card>,
      );
      expect(screen.getByText("Header Text")).toBeInTheDocument();
    });

    it("applies custom className to header", () => {
      render(
        <Card>
          <Card.Header className="custom-header">Header</Card.Header>
        </Card>,
      );
      const header = screen.getByText("Header");
      expect(header.className).toContain("custom-header");
    });
  });

  describe("Card.Body", () => {
    it("renders body content", () => {
      render(
        <Card>
          <Card.Body>Body Text</Card.Body>
        </Card>,
      );
      expect(screen.getByText("Body Text")).toBeInTheDocument();
    });

    it("applies custom className to body", () => {
      render(
        <Card>
          <Card.Body className="custom-body">Body</Card.Body>
        </Card>,
      );
      const body = screen.getByText("Body");
      expect(body.className).toContain("custom-body");
    });
  });

  describe("Card.Footer", () => {
    it("renders footer content", () => {
      render(
        <Card>
          <Card.Footer>Footer Text</Card.Footer>
        </Card>,
      );
      expect(screen.getByText("Footer Text")).toBeInTheDocument();
    });

    it("applies custom className to footer", () => {
      render(
        <Card>
          <Card.Footer className="custom-footer">Footer</Card.Footer>
        </Card>,
      );
      const footer = screen.getByText("Footer");
      expect(footer.className).toContain("custom-footer");
    });
  });

  describe("Complete Card", () => {
    it("renders all sections together", () => {
      render(
        <Card>
          <Card.Header>Header</Card.Header>
          <Card.Body>Body</Card.Body>
          <Card.Footer>Footer</Card.Footer>
        </Card>,
      );

      expect(screen.getByText("Header")).toBeInTheDocument();
      expect(screen.getByText("Body")).toBeInTheDocument();
      expect(screen.getByText("Footer")).toBeInTheDocument();
    });

    it("handles click events on interactive cards", async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(
        <Card interactive onClick={handleClick}>
          <Card.Body>Clickable content</Card.Body>
        </Card>,
      );

      await user.click(screen.getByText("Clickable content").parentElement!);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("uses default variant when not specified", () => {
      const { container } = render(<Card>Content</Card>);
      expect((container.firstChild as HTMLElement).className).toMatch(/base/);
    });
  });

  // ============================================================================
  // IMAGE VARIANT & IMAGE SUBCOMPONENTS (Missing Branches & Functions)
  // ============================================================================

  describe("Card Image Variant", () => {
    it("renders image variant with imageUrl", () => {
      const { container } = render(
        <Card variant="image" imageUrl="https://example.com/image.jpg">
          <Card.ImageContent>
            <Card.ImageTitle>Image Title</Card.ImageTitle>
          </Card.ImageContent>
        </Card>,
      );

      const card = container.firstChild as HTMLElement;
      expect(card.className).toMatch(/image/);
      expect(card.style.backgroundImage).toContain(
        "https://example.com/image.jpg",
      );
    });

    it("sets aspectRatio on image variant", () => {
      const { container } = render(
        <Card variant="image" imageUrl="test.jpg" aspectRatio="4/3">
          Image Card
        </Card>,
      );

      const card = container.firstChild as HTMLElement;
      expect(card.style.aspectRatio).toBe("4/3");
    });

    it("uses default aspectRatio 16/9 when not specified", () => {
      const { container } = render(
        <Card variant="image" imageUrl="test.jpg">
          Image Card
        </Card>,
      );

      const card = container.firstChild as HTMLElement;
      expect(card.style.aspectRatio).toBe("16/9");
    });

    it("renders without imageUrl on image variant", () => {
      const { container } = render(
        <Card variant="image">
          <Card.ImageContent>Content</Card.ImageContent>
        </Card>,
      );

      const card = container.firstChild as HTMLElement;
      expect(card.className).toMatch(/image/);
      expect(card.style.backgroundImage).toBe("");
    });

    it("applies gradient class with imagePosition top", () => {
      const { container } = render(
        <Card variant="image" imageUrl="test.jpg" imagePosition="top">
          <div>Content</div>
        </Card>,
      );

      const overlay = container.querySelector("[class*='imageOverlay']");
      expect(overlay?.className).toMatch(/gradientTop/);
    });

    it("applies gradient class with imagePosition center", () => {
      const { container } = render(
        <Card variant="image" imageUrl="test.jpg" imagePosition="center">
          <div>Content</div>
        </Card>,
      );

      const overlay = container.querySelector("[class*='imageOverlay']");
      expect(overlay?.className).toMatch(/gradientCenter/);
    });

    it("applies gradient class with imagePosition bottom", () => {
      const { container } = render(
        <Card variant="image" imageUrl="test.jpg" imagePosition="bottom">
          <div>Content</div>
        </Card>,
      );

      const overlay = container.querySelector("[class*='imageOverlay']");
      expect(overlay?.className).toMatch(/gradientBottom/);
    });

    it("renders children inside image overlay", () => {
      render(
        <Card variant="image" imageUrl="test.jpg">
          <Card.ImageContent>
            <Card.ImageTitle>My Title</Card.ImageTitle>
            <Card.ImageDescription>My Description</Card.ImageDescription>
          </Card.ImageContent>
        </Card>,
      );

      expect(screen.getByText("My Title")).toBeInTheDocument();
      expect(screen.getByText("My Description")).toBeInTheDocument();
    });

    it("preserves custom style on image variant", () => {
      const customStyle = { border: "1px solid red" };
      const { container } = render(
        <Card variant="image" imageUrl="test.jpg" style={customStyle}>
          Content
        </Card>,
      );

      const card = container.firstChild as HTMLElement;
      expect(card.style.border).toBe("1px solid red");
    });
  });

  describe("Card Image Subcomponents", () => {
    it("renders ImageContent with className", () => {
      render(
        <Card>
          <Card.ImageContent className="custom-image-content">
            Content
          </Card.ImageContent>
        </Card>,
      );

      const content = screen.getByText("Content");
      expect(content.className).toContain("custom-image-content");
    });

    it("renders ImageTitle as h3 element", () => {
      render(
        <Card>
          <Card.ImageTitle>Title Text</Card.ImageTitle>
        </Card>,
      );

      const title = screen.getByText("Title Text");
      expect(title.tagName).toBe("H3");
    });

    it("renders ImageTitle with custom className", () => {
      render(
        <Card>
          <Card.ImageTitle className="custom-title">Title</Card.ImageTitle>
        </Card>,
      );

      const title = screen.getByText("Title");
      expect(title.className).toContain("custom-title");
    });

    it("renders ImageDescription as p element", () => {
      render(
        <Card>
          <Card.ImageDescription>Description</Card.ImageDescription>
        </Card>,
      );

      const desc = screen.getByText("Description");
      expect(desc.tagName).toBe("P");
    });

    it("renders ImageDescription with custom className", () => {
      render(
        <Card>
          <Card.ImageDescription className="custom-desc">
            Description
          </Card.ImageDescription>
        </Card>,
      );

      const desc = screen.getByText("Description");
      expect(desc.className).toContain("custom-desc");
    });

    it("renders ImageMeta as span element", () => {
      render(
        <Card>
          <Card.ImageMeta>Meta Info</Card.ImageMeta>
        </Card>,
      );

      const meta = screen.getByText("Meta Info");
      expect(meta.tagName).toBe("SPAN");
    });

    it("renders ImageMeta with custom className", () => {
      render(
        <Card>
          <Card.ImageMeta className="custom-meta">Meta</Card.ImageMeta>
        </Card>,
      );

      const meta = screen.getByText("Meta");
      expect(meta.className).toContain("custom-meta");
    });

    it("complete image card with all image subcomponents", () => {
      render(
        <Card variant="image" imageUrl="test.jpg">
          <Card.ImageContent>
            <Card.ImageTitle>Card Title</Card.ImageTitle>
            <Card.ImageDescription>
              This is the description
            </Card.ImageDescription>
            <Card.ImageMeta>5 min read</Card.ImageMeta>
          </Card.ImageContent>
        </Card>,
      );

      expect(screen.getByText("Card Title")).toBeInTheDocument();
      expect(screen.getByText("This is the description")).toBeInTheDocument();
      expect(screen.getByText("5 min read")).toBeInTheDocument();
    });

    it("image subcomponents preserve additional HTML attributes", () => {
      render(
        <Card>
          <Card.ImageContent data-testid="image-content">
            Content
          </Card.ImageContent>
          <Card.ImageTitle data-testid="image-title">Title</Card.ImageTitle>
          <Card.ImageDescription data-testid="image-desc">
            Desc
          </Card.ImageDescription>
          <Card.ImageMeta data-testid="image-meta">Meta</Card.ImageMeta>
        </Card>,
      );

      expect(screen.getByTestId("image-content")).toBeInTheDocument();
      expect(screen.getByTestId("image-title")).toBeInTheDocument();
      expect(screen.getByTestId("image-desc")).toBeInTheDocument();
      expect(screen.getByTestId("image-meta")).toBeInTheDocument();
    });
  });

  describe("Deprecation Handling", () => {
    it("logs deprecation warning for variant='outlined'", () => {
      const warnSpy = vi.spyOn(console, "warn");

      render(<Card variant="outlined">Deprecated</Card>);

      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          '[Orion] Card variant="outlined" is deprecated',
        ),
      );

      warnSpy.mockRestore();
    });

    it("uses 'base' variant when 'outlined' is specified", () => {
      const { container } = render(<Card variant="outlined">Content</Card>);
      expect((container.firstChild as HTMLElement).className).toMatch(/base/);
    });

    it("does not warn for 'base' variant", () => {
      const warnSpy = vi.spyOn(console, "warn");

      render(<Card variant="base">Content</Card>);

      expect(warnSpy).not.toHaveBeenCalled();

      warnSpy.mockRestore();
    });

    it("does not warn when NODE_ENV is production", () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "production";

      const warnSpy = vi.spyOn(console, "warn");

      render(<Card variant="outlined">Content</Card>);

      // In production, warning should not be called (due to NODE_ENV check)
      expect(warnSpy).not.toHaveBeenCalled();

      process.env.NODE_ENV = originalEnv;
      warnSpy.mockRestore();
    });
  });

  describe("Empty className handling", () => {
    it("handles empty className by filtering out falsy values", () => {
      const { container } = render(
        <Card className="">
          <Card.Header>Header</Card.Header>
          <Card.Body>Body</Card.Body>
          <Card.Footer>Footer</Card.Footer>
        </Card>,
      );

      // Should render without errors and have valid classNames
      expect(container.firstChild).toBeInTheDocument();
    });

    it("filters out undefined className", () => {
      const { container } = render(
        <Card className={undefined as any}>Content</Card>,
      );

      expect(container.firstChild).toBeInTheDocument();
    });
  });
});
