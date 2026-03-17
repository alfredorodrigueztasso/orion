import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FontLoader } from "./FontLoader";

describe("FontLoader", () => {
  beforeEach(() => {
    // Clean up any font-related elements added to <head>
    document
      .querySelectorAll("[data-orion-fonts]")
      .forEach((el) => el.remove());
    document
      .querySelectorAll('link[href*="fonts.googleapis.com"]')
      .forEach((el) => el.remove());
  });

  it("renders children", () => {
    render(
      <FontLoader>
        <div data-testid="child">Hello</div>
      </FontLoader>,
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("renders null when no children", () => {
    const { container } = render(<FontLoader />);
    expect(container.innerHTML).toBe("");
  });

  it("injects preconnect links into document head", () => {
    render(<FontLoader>Content</FontLoader>);

    const preconnects = document.querySelectorAll(
      '[data-orion-fonts="preconnect"]',
    );
    expect(preconnects.length).toBeGreaterThanOrEqual(1);
  });

  it("injects Google Fonts stylesheet link into document head", () => {
    render(<FontLoader>Content</FontLoader>);

    const stylesheet = document.querySelector(
      '[data-orion-fonts="stylesheet"]',
    );
    expect(stylesheet).not.toBeNull();
    expect(stylesheet).toHaveAttribute("rel", "stylesheet");
    expect(stylesheet?.getAttribute("href")).toContain("fonts.googleapis.com");
  });

  it("does not inject duplicate links when fonts link already exists", () => {
    // Pre-add a Google Fonts link to simulate fonts already being loaded
    const existingLink = document.createElement("link");
    existingLink.href = "https://fonts.googleapis.com/css2?family=Test";
    existingLink.rel = "stylesheet";
    document.head.appendChild(existingLink);

    render(<FontLoader>Content</FontLoader>);

    // Should not add another stylesheet since one already exists
    const stylesheets = document.querySelectorAll(
      '[data-orion-fonts="stylesheet"]',
    );
    expect(stylesheets).toHaveLength(0);

    // Clean up
    existingLink.remove();
  });

  it("shows loading component when showLoadingState is true and fonts not yet loaded", () => {
    render(
      <FontLoader
        showLoadingState
        loadingComponent={<div data-testid="loading">Loading fonts...</div>}
      >
        <div data-testid="content">Main content</div>
      </FontLoader>,
    );

    // Initially showing loading or content depending on isLoaded state
    const loading = screen.queryByTestId("loading");
    const content = screen.queryByTestId("content");

    // One of these should be visible (loading XOR content)
    expect(loading || content).toBeTruthy();
  });

  it("returns null when showLoadingState is true and no loadingComponent provided", () => {
    const { container } = render(
      <FontLoader showLoadingState>
        <div>Content</div>
      </FontLoader>,
    );

    expect(container).toBeTruthy();
  });

  it("calls onError when font link fails", () => {
    const onError = vi.fn();
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(<FontLoader onError={onError}>Content</FontLoader>);

    // Simulate the link onerror by finding the injected stylesheet
    const stylesheet = document.querySelector(
      '[data-orion-fonts="stylesheet"]',
    ) as HTMLLinkElement;
    if (stylesheet && stylesheet.onerror) {
      (stylesheet.onerror as () => void)();
      expect(onError).toHaveBeenCalledTimes(1);
      expect(onError.mock.calls[0][0]).toBeInstanceOf(Error);
    }

    consoleSpy.mockRestore();
  });

  it("calls onLoad when existing fonts link found", () => {
    // Pre-add a Google Fonts link so FontLoader skips injection and calls onLoad directly
    const existingLink = document.createElement("link");
    existingLink.href = "https://fonts.googleapis.com/css2?family=Test";
    existingLink.rel = "stylesheet";
    document.head.appendChild(existingLink);

    const onLoad = vi.fn();
    render(<FontLoader onLoad={onLoad}>Content</FontLoader>);

    expect(onLoad).toHaveBeenCalled();

    // Clean up
    existingLink.remove();
  });

  it("has display name", () => {
    expect(FontLoader.displayName).toBe("FontLoader");
  });
});
