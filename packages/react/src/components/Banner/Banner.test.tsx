import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Banner } from "./Banner";

describe("Banner", () => {
  it("renders banner title", () => {
    render(<Banner title="Important information" />);

    expect(screen.getByText("Important information")).toBeInTheDocument();
  });

  it("displays banner description", () => {
    render(
      <Banner
        title="Important information"
        description="Please read this carefully"
      />,
    );

    expect(screen.getByText("Please read this carefully")).toBeInTheDocument();
  });

  it("applies variant styles", () => {
    const { container } = render(<Banner title="Default" variant="default" />);

    expect(container).toBeInTheDocument();
  });

  it("supports image variant", () => {
    const { container } = render(
      <Banner
        title="Image Banner"
        variant="image"
        backgroundImage="https://example.com/image.jpg"
      />,
    );

    expect(container).toBeInTheDocument();
  });

  it("handles dismiss button", async () => {
    const handleDismiss = vi.fn();
    const user = userEvent.setup();

    render(
      <Banner
        title="Dismissible Banner"
        dismissible
        onDismiss={handleDismiss}
      />,
    );

    const dismissButton = screen.getByRole("button");
    await user.click(dismissButton);

    expect(handleDismiss).toHaveBeenCalled();
  });

  it("displays CTA button with link", () => {
    render(
      <Banner
        title="Learn more"
        ctaLabel="Read documentation"
        ctaHref="/docs"
      />,
    );

    expect(screen.getByText("Read documentation")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <Banner title="Custom Banner" className="custom-banner" />,
    );

    const banner = container.querySelector(".custom-banner");
    expect(banner).toBeInTheDocument();
  });

  // ============================================================================
  // MISSING BRANCHES & FUNCTIONS COVERAGE
  // ============================================================================

  describe("Banner Eyebrow", () => {
    it("renders eyebrow text", () => {
      render(<Banner title="Main Title" eyebrow="Eyebrow Text" />);

      expect(screen.getByText("Eyebrow Text")).toBeInTheDocument();
    });

    it("does not render eyebrow when not provided", () => {
      const { container } = render(<Banner title="Main Title" />);

      const eyebrowElements = container.querySelectorAll("[class*='eyebrow']");
      expect(eyebrowElements.length).toBe(0);
    });

    it("renders eyebrow with title and description", () => {
      render(
        <Banner eyebrow="New" title="Feature" description="Check this out" />,
      );

      expect(screen.getByText("New")).toBeInTheDocument();
      expect(screen.getByText("Feature")).toBeInTheDocument();
      expect(screen.getByText("Check this out")).toBeInTheDocument();
    });
  });

  describe("Banner Description", () => {
    it("does not render description when not provided", () => {
      const { container } = render(<Banner title="Title Only" />);

      expect(screen.queryByText(/description/i)).not.toBeInTheDocument();
    });

    it("renders description when provided", () => {
      render(
        <Banner title="Title" description="This is a detailed description" />,
      );

      expect(
        screen.getByText("This is a detailed description"),
      ).toBeInTheDocument();
    });
  });

  describe("Banner CTA Buttons", () => {
    it("renders primary CTA button", () => {
      render(
        <Banner
          title="Call to Action"
          ctaLabel="Learn More"
          ctaHref="/learn"
        />,
      );

      expect(screen.getByText("Learn More")).toBeInTheDocument();
    });

    it("does not render CTA without href", () => {
      const { container } = render(<Banner title="Title" ctaLabel="Button" />);

      expect(screen.queryByText("Button")).not.toBeInTheDocument();
    });

    it("renders secondary CTA button", () => {
      render(
        <Banner
          title="Title"
          secondaryCtaLabel="Learn More"
          secondaryCtaHref="/docs"
        />,
      );

      expect(screen.getByText("Learn More")).toBeInTheDocument();
    });

    it("does not render secondary CTA without href", () => {
      const { container } = render(
        <Banner title="Title" secondaryCtaLabel="Button" />,
      );

      expect(screen.queryByText("Button")).not.toBeInTheDocument();
    });

    it("renders both primary and secondary CTAs", () => {
      render(
        <Banner
          title="Title"
          ctaLabel="Primary"
          ctaHref="/primary"
          secondaryCtaLabel="Secondary"
          secondaryCtaHref="/secondary"
        />,
      );

      expect(screen.getByText("Primary")).toBeInTheDocument();
      expect(screen.getByText("Secondary")).toBeInTheDocument();
    });

    it("does not render actions div when no CTAs", () => {
      const { container } = render(<Banner title="Title" />);

      const actionsDiv = container.querySelector("[class*='actions']");
      expect(actionsDiv).not.toBeInTheDocument();
    });
  });

  describe("Banner Split Variant", () => {
    it("renders split layout with side image", () => {
      const { container } = render(
        <Banner title="Split Banner" variant="split" sideImage="/image.jpg" />,
      );

      const img = container.querySelector("img");
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", "/image.jpg");
    });

    it("does not render split layout when no sideImage", () => {
      const { container } = render(<Banner title="Title" variant="split" />);

      const splitLayout = container.querySelector("[class*='splitLayout']");
      expect(splitLayout).not.toBeInTheDocument();
    });

    it("renders side image with aria-hidden", () => {
      const { container } = render(
        <Banner title="Title" variant="split" sideImage="/img.jpg" />,
      );

      const img = container.querySelector("img");
      expect(img).toHaveAttribute("aria-hidden", "true");
    });

    it("applies imagePosition to split layout", () => {
      const { container } = render(
        <Banner
          title="Title"
          variant="split"
          sideImage="/img.jpg"
          imagePosition="left"
        />,
      );

      const splitLayout = container.querySelector("[class*='splitLayout']");
      expect(splitLayout).toHaveAttribute("data-image-position", "left");
    });

    it("uses primary variant for split CTA button", () => {
      render(
        <Banner
          title="Title"
          variant="split"
          sideImage="/img.jpg"
          ctaLabel="Action"
          ctaHref="/action"
        />,
      );

      // Split variant uses 'primary' for primary CTA
      expect(screen.getByText("Action")).toBeInTheDocument();
    });

    it("uses secondary variant for split secondary CTA button", () => {
      render(
        <Banner
          title="Title"
          variant="split"
          sideImage="/img.jpg"
          secondaryCtaLabel="Learn More"
          secondaryCtaHref="/docs"
        />,
      );

      expect(screen.getByText("Learn More")).toBeInTheDocument();
    });
  });

  describe("Banner Variants & Styling", () => {
    const variants: Array<"default" | "image" | "gradient" | "split"> = [
      "default",
      "image",
      "gradient",
      "split",
    ];

    variants.forEach((variant) => {
      it(`renders ${variant} variant`, () => {
        const { container } = render(
          <Banner title={`${variant} banner`} variant={variant} />,
        );

        const banner = container.querySelector("section");
        expect(banner).toHaveAttribute("data-variant", variant);
      });
    });

    it("applies backgroundColor style", () => {
      const { container } = render(
        <Banner title="Title" backgroundColor="rgb(255, 0, 0)" />,
      );

      const banner = container.querySelector("section") as HTMLElement;
      expect(banner.style.backgroundColor).toBe("rgb(255, 0, 0)");
    });

    it("applies gradient style for gradient variant", () => {
      const { container } = render(
        <Banner
          title="Title"
          variant="gradient"
          gradient="linear-gradient(to right, red, blue)"
        />,
      );

      const banner = container.querySelector("section") as HTMLElement;
      expect(banner.style.background).toBe(
        "linear-gradient(to right, red, blue)",
      );
    });

    it("applies backgroundImage style for image variant", () => {
      const { container } = render(
        <Banner title="Title" variant="image" backgroundImage="/banner.jpg" />,
      );

      const banner = container.querySelector("section") as HTMLElement;
      expect(banner.style.backgroundImage).toContain("/banner.jpg");
    });

    it("does not apply backgroundImage for non-image variant", () => {
      const { container } = render(
        <Banner
          title="Title"
          variant="default"
          backgroundImage="/banner.jpg"
        />,
      );

      const banner = container.querySelector("section") as HTMLElement;
      // BackgroundImage should not be applied for non-image variant
      expect(banner.style.backgroundImage).toBe("");
    });

    it("applies gradient only for gradient variant", () => {
      const { container } = render(
        <Banner
          title="Title"
          variant="default"
          gradient="linear-gradient(...)"
        />,
      );

      const banner = container.querySelector("section") as HTMLElement;
      // Gradient should not be applied for non-gradient variant
      expect(banner.style.background).toBe("");
    });
  });

  describe("Banner Layout Options", () => {
    it("applies fullWidth data attribute", () => {
      const { container } = render(<Banner title="Full Width" fullWidth />);

      const banner = container.querySelector("section");
      expect(banner).toHaveAttribute("data-full-width", "true");
    });

    it("applies compact data attribute", () => {
      const { container } = render(<Banner title="Compact" compact />);

      const banner = container.querySelector("section");
      expect(banner).toHaveAttribute("data-compact", "true");
    });

    it("applies centered data attribute", () => {
      const { container } = render(<Banner title="Centered" centered />);

      const banner = container.querySelector("section");
      expect(banner).toHaveAttribute("data-centered", "true");
    });

    it("does not apply centered for split variant", () => {
      const { container } = render(
        <Banner title="Split" variant="split" sideImage="/img.jpg" centered />,
      );

      const banner = container.querySelector("section");
      expect(banner).toHaveAttribute("data-centered", "false");
    });

    it("applies combination of layout options", () => {
      const { container } = render(
        <Banner title="Complex" fullWidth compact centered />,
      );

      const banner = container.querySelector("section");
      expect(banner).toHaveAttribute("data-full-width", "true");
      expect(banner).toHaveAttribute("data-compact", "true");
      expect(banner).toHaveAttribute("data-centered", "true");
    });
  });

  describe("Banner Dismiss Button", () => {
    it("renders dismiss button when dismissible is true", () => {
      const { container } = render(<Banner title="Dismissible" dismissible />);

      const dismissButton = container.querySelector("[class*='dismissButton']");
      expect(dismissButton).toBeInTheDocument();
    });

    it("does not render dismiss button by default", () => {
      const { container } = render(<Banner title="Not dismissible" />);

      const dismissButton = container.querySelector("[class*='dismissButton']");
      expect(dismissButton).not.toBeInTheDocument();
    });

    it("dismiss button is icon-only", async () => {
      const { container } = render(<Banner title="Dismissible" dismissible />);

      const dismissButton = container.querySelector("button");
      expect(dismissButton?.className).toContain("iconOnly");
    });
  });

  describe("Banner Custom Styles", () => {
    it("merges custom style with generated styles", () => {
      const { container } = render(
        <Banner title="Styled" style={{ padding: "20px" }} />,
      );

      const banner = container.querySelector("section") as HTMLElement;
      expect(banner.style.padding).toBe("20px");
    });

    it("forwards additional HTML attributes", () => {
      render(
        <Banner title="Attributes" data-testid="custom-banner" role="region" />,
      );

      const banner = screen.getByTestId("custom-banner");
      expect(banner).toHaveAttribute("role", "region");
    });
  });
});
