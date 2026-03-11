import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Banner } from "./Banner";

describe("Banner", () => {
  it("renders banner title", () => {
    render(
      <Banner title="Important information" />,
    );

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
    const { container } = render(
      <Banner title="Default" variant="default" />,
    );

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
      <Banner
        title="Custom Banner"
        className="custom-banner"
      />,
    );

    const banner = container.querySelector(".custom-banner");
    expect(banner).toBeInTheDocument();
  });
});
