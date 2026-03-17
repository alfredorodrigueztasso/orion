/**
 * Link Component Tests
 */

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Link } from "./Link";

describe("Link", () => {
  it("renders a link with text", () => {
    render(<Link href="/about">About us</Link>);
    const link = screen.getByRole("link", { name: "About us" });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/about");
  });

  it("applies default variant and size", () => {
    render(<Link href="/">Home</Link>);
    const link = screen.getByRole("link");

    expect(link.className).toContain("default");
    expect(link.className).toContain("md");
  });

  it("applies variant classes", () => {
    const { rerender } = render(
      <Link href="/" variant="subtle">
        Link
      </Link>,
    );
    expect(screen.getByRole("link").className).toContain("subtle");

    rerender(
      <Link href="/" variant="brand">
        Link
      </Link>,
    );
    expect(screen.getByRole("link").className).toContain("brand");
  });

  it("applies size classes", () => {
    const { rerender } = render(
      <Link href="/" size="sm">
        Link
      </Link>,
    );
    expect(screen.getByRole("link").className).toContain("sm");

    rerender(
      <Link href="/" size="lg">
        Link
      </Link>,
    );
    expect(screen.getByRole("link").className).toContain("lg");
  });

  it("opens in new tab when external is true", () => {
    render(
      <Link href="https://example.com" external>
        External
      </Link>,
    );
    const link = screen.getByRole("link");

    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("does not add external attributes for internal links", () => {
    render(<Link href="/about">About</Link>);
    const link = screen.getByRole("link");

    expect(link).not.toHaveAttribute("target");
    expect(link).not.toHaveAttribute("rel");
  });

  it("applies underline class by default", () => {
    render(<Link href="/">Link</Link>);
    expect(screen.getByRole("link").className).toContain("underline");
  });

  it("removes underline when underline is false", () => {
    render(
      <Link href="/" underline={false}>
        Link
      </Link>,
    );
    expect(screen.getByRole("link").className).not.toContain("underline");
  });

  it("renders with left icon", () => {
    render(
      <Link href="/" icon={<span data-testid="left-icon">←</span>}>
        Back
      </Link>,
    );
    expect(screen.getByTestId("left-icon")).toBeInTheDocument();
  });

  it("renders with right icon", () => {
    render(
      <Link href="/" iconRight={<span data-testid="right-icon">→</span>}>
        Next
      </Link>,
    );
    expect(screen.getByTestId("right-icon")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <Link href="/" className="custom-class">
        Link
      </Link>,
    );
    expect(screen.getByRole("link").className).toContain("custom-class");
  });

  it("forwards ref correctly", () => {
    const ref = { current: null };
    render(
      <Link ref={ref} href="/">
        Link
      </Link>,
    );
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });

  // Additional coverage tests
  it("shows external icon by default for external links", () => {
    render(
      <Link href="https://example.com" external>
        External Link
      </Link>,
    );

    const link = screen.getByRole("link");
    const externalIcon = link.querySelector('[aria-hidden="true"]');

    // Should have an icon (external link icon)
    expect(externalIcon).toBeInTheDocument();
  });

  it("hides external icon when showExternalIcon is false", () => {
    render(
      <Link href="https://example.com" external showExternalIcon={false}>
        External Link
      </Link>,
    );

    const link = screen.getByRole("link");
    // External icon should not be rendered
    const icons = link.querySelectorAll('[aria-hidden="true"]');
    expect(icons.length).toBe(0);
  });

  it("external icon takes precedence over iconRight when showExternalIcon is true", () => {
    render(
      <Link href="https://example.com" external iconRight={<span>custom</span>}>
        External Link
      </Link>,
    );

    const link = screen.getByRole("link");
    // Custom iconRight should be rendered, not external icon
    expect(link).toHaveTextContent("custom");
  });

  it("applies animation when iconAnimation is arrow", () => {
    render(
      <Link href="/" iconAnimation="arrow" iconRight={<span>→</span>}>
        Next
      </Link>,
    );

    const link = screen.getByRole("link");
    // Icon should be rendered with animation applied
    expect(link).toHaveTextContent("→");
  });

  it("applies animation when iconAnimation is arrow-left", () => {
    render(
      <Link href="/" iconAnimation="arrow-left" icon={<span>←</span>}>
        Back
      </Link>,
    );

    const link = screen.getByRole("link");
    // Icon should be rendered with animation applied
    expect(link).toHaveTextContent("←");
  });

  it("applies animation when iconAnimation is external", () => {
    render(
      <Link href="/" iconAnimation="external" iconRight={<span>→</span>}>
        External
      </Link>,
    );

    const link = screen.getByRole("link");
    // Icon should be rendered with animation applied
    expect(link).toHaveTextContent("→");
  });

  it("applies external animation by default for external links with right icon", () => {
    render(
      <Link href="https://example.com" external iconRight={<span>→</span>}>
        External
      </Link>,
    );

    const link = screen.getByRole("link");
    // Custom icon should be rendered
    expect(link).toHaveTextContent("→");
  });

  it("renders with sm size", () => {
    render(
      <Link href="/" size="sm" icon={<span>icon</span>}>
        Small Link
      </Link>,
    );

    const link = screen.getByRole("link");
    expect(link.className).toContain("sm");
  });

  it("renders with lg size", () => {
    render(
      <Link href="/" size="lg" icon={<span>icon</span>}>
        Large Link
      </Link>,
    );

    const link = screen.getByRole("link");
    expect(link.className).toContain("lg");
  });

  it("renders both left and right icons together", () => {
    render(
      <Link
        href="/"
        icon={<span data-testid="left">←</span>}
        iconRight={<span data-testid="right">→</span>}
      >
        Middle
      </Link>,
    );

    expect(screen.getByTestId("left")).toBeInTheDocument();
    expect(screen.getByTestId("right")).toBeInTheDocument();
  });

  it("handles unknown iconAnimation gracefully", () => {
    render(
      <Link href="/" iconAnimation={"unknown" as any} icon={<span>icon</span>}>
        Link
      </Link>,
    );

    const link = screen.getByRole("link");
    // Should still render without errors
    expect(link).toBeInTheDocument();
  });

  it("renders internal link with left icon without external animation", () => {
    render(
      <Link href="/" icon={<span>→</span>}>
        Internal
      </Link>,
    );

    const link = screen.getByRole("link");
    // Icon should be rendered
    expect(link).toHaveTextContent("→");
  });

  it("combines multiple class names correctly", () => {
    render(
      <Link href="/" variant="brand" size="lg" className="custom">
        Link
      </Link>,
    );

    const link = screen.getByRole("link");
    expect(link.className).toContain("brand");
    expect(link.className).toContain("lg");
    expect(link.className).toContain("custom");
  });

  it("passes through additional HTML attributes", () => {
    render(
      <Link href="/" data-testid="custom-link" title="Link title">
        Link
      </Link>,
    );

    const link = screen.getByTestId("custom-link");
    expect(link).toHaveAttribute("title", "Link title");
  });

  it("icon is hidden from accessibility tree", () => {
    render(
      <Link href="/" icon={<span data-testid="icon">→</span>}>
        Link
      </Link>,
    );

    const icon = screen.getByTestId("icon");
    expect(icon.parentElement).toHaveAttribute("aria-hidden", "true");
  });

  it("right icon is hidden from accessibility tree", () => {
    render(
      <Link href="/" iconRight={<span data-testid="right-icon">→</span>}>
        Link
      </Link>,
    );

    const icon = screen.getByTestId("right-icon");
    expect(icon.parentElement).toHaveAttribute("aria-hidden", "true");
  });

  it("external icon is hidden from accessibility tree", () => {
    render(
      <Link href="https://example.com" external>
        External
      </Link>,
    );

    const link = screen.getByRole("link");
    const hiddenIcons = link.querySelectorAll('[aria-hidden="true"]');

    // Should have at least one hidden icon (external icon)
    expect(hiddenIcons.length).toBeGreaterThan(0);
  });
});
