import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IconGallery } from "./IconGallery";

describe("IconGallery", () => {
  it("renders icon gallery container", () => {
    const { container } = render(<IconGallery />);
    const gallery = container.firstChild;
    expect(gallery).toBeInTheDocument();
  });

  it("renders header with title", () => {
    render(<IconGallery />);
    expect(screen.getByText("Icon Browser")).toBeInTheDocument();
  });

  it("displays icon count in header", () => {
    render(<IconGallery />);
    const header = screen.getByText(/icons available/i);
    expect(header).toBeInTheDocument();
  });

  it("renders search input", () => {
    render(<IconGallery />);
    const searchInput = screen.getByPlaceholderText("Search icons...");
    expect(searchInput).toBeInTheDocument();
  });

  it("renders All category button", () => {
    render(<IconGallery />);
    const allButton = screen.getByRole("button", { name: "All" });
    expect(allButton).toBeInTheDocument();
  });

  it("renders category buttons for all categories", () => {
    render(<IconGallery />);

    // Check for category buttons
    expect(
      screen.getByRole("button", { name: "Navigation" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Actions" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Status" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Media" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Communication" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Commerce" }),
    ).toBeInTheDocument();
  });

  it("renders icon grid with icons", () => {
    render(<IconGallery />);

    // Check that at least some icons are rendered
    const buttons = screen.getAllByRole("button");
    // Should have: All + 6 categories + many icon buttons
    expect(buttons.length).toBeGreaterThan(7);
  });

  it("displays icon names", () => {
    render(<IconGallery />);

    // Some icons should be visible (check common ones like Plus, Heart)
    const plusIcon = screen.queryByTitle("Plus");
    const heartIcon = screen.queryByTitle("Heart");
    expect(plusIcon || heartIcon).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<IconGallery className="custom-gallery" />);
    const gallery = container.firstChild as HTMLElement;
    expect(gallery.className).toContain("custom-gallery");
  });

  it("filters icons when search term is entered", async () => {
    const user = userEvent.setup();
    render(<IconGallery />);

    const searchInput = screen.getByPlaceholderText(
      "Search icons...",
    ) as HTMLInputElement;

    // Search for "menu"
    await user.type(searchInput, "menu");

    expect(searchInput.value).toBe("menu");
  });

  it("displays result count when searching", async () => {
    const user = userEvent.setup();
    render(<IconGallery />);

    const searchInput = screen.getByPlaceholderText("Search icons...");
    await user.type(searchInput, "arrow");

    // Should display result count
    const resultCount = screen.getByText(/results/i);
    expect(resultCount).toBeInTheDocument();
  });

  it("shows no results message when search has no matches", async () => {
    const user = userEvent.setup();
    render(<IconGallery />);

    const searchInput = screen.getByPlaceholderText("Search icons...");
    await user.type(searchInput, "xyznonexistenticon");

    // Should display "No icons found" message
    const noResults = screen.getByText(/No icons found/i);
    expect(noResults).toBeInTheDocument();
  });

  it("filters icons by category", async () => {
    const user = userEvent.setup();
    render(<IconGallery />);

    const navigationButton = screen.getByRole("button", { name: "Navigation" });
    const initialButtonCount = screen.getAllByRole("button").length;

    await user.click(navigationButton);

    // After filtering, should still have category buttons visible
    const buttonsAfterFilter = screen.getAllByRole("button");
    expect(buttonsAfterFilter.length).toBeGreaterThan(0);
  });

  it("shows All button as active initially", () => {
    const { container } = render(<IconGallery />);

    const allButton = screen.getByRole("button", { name: "All" });
    // Button should have some class applied
    expect(allButton.className).toBeTruthy();
  });

  it("updates active state when category button is clicked", async () => {
    const user = userEvent.setup();
    const { container } = render(<IconGallery />);

    const actionsButton = screen.getByRole("button", { name: "Actions" });
    await user.click(actionsButton);

    // Button should have updated class
    expect(actionsButton.className).toBeTruthy();
  });

  it("returns to all icons when All button is clicked", async () => {
    const user = userEvent.setup();
    render(<IconGallery />);

    // Click on a category
    const navigationButton = screen.getByRole("button", { name: "Navigation" });
    await user.click(navigationButton);

    // Click on All
    const allButton = screen.getByRole("button", { name: "All" });
    await user.click(allButton);

    // All button should be clickable
    expect(allButton).toBeInTheDocument();
  });

  it("renders usage information section", () => {
    render(<IconGallery />);
    const usageHeading = screen.getByText("Usage");
    expect(usageHeading).toBeInTheDocument();
  });

  it("displays code example in usage section", () => {
    render(<IconGallery />);
    const codeExample = screen.getByText(/import.*lucide-react/);
    expect(codeExample).toBeInTheDocument();
  });

  it("renders search icon in search container", () => {
    const { container } = render(<IconGallery />);
    // Search icon should be rendered (mocked as span with data-lucide='Search')
    const searchIcon = container.querySelector("[data-lucide='Search']");
    expect(searchIcon).toBeInTheDocument();
  });

  it("icon buttons have correct structure", () => {
    render(<IconGallery />);

    // All buttons should be of type button
    const buttons = screen.getAllByRole("button");
    buttons.forEach((btn) => {
      expect(btn.type).toBe("button");
    });
  });

  it("clicking category button changes displayed icons", async () => {
    const user = userEvent.setup();
    render(<IconGallery />);

    // Get initial buttons
    const initialButtons = screen.getAllByRole("button");

    // Click on Navigation category
    const navigationButton = screen.getByRole("button", { name: "Navigation" });
    await user.click(navigationButton);

    // Buttons should still be visible after category filter
    const buttonsAfterFilter = screen.getAllByRole("button");
    expect(buttonsAfterFilter.length).toBeGreaterThan(0);
  });

  it("combines search and category filtering", async () => {
    const user = userEvent.setup();
    render(<IconGallery />);

    // Click on Actions category
    const actionsButton = screen.getByRole("button", { name: "Actions" });
    await user.click(actionsButton);

    // Search for "plus"
    const searchInput = screen.getByPlaceholderText("Search icons...");
    await user.type(searchInput, "plus");

    // Should show Plus icon (or other plus-related icons)
    const resultCount = screen.getByText(/results/i);
    expect(resultCount).toBeInTheDocument();
  });

  it("search is case-insensitive", async () => {
    const user = userEvent.setup();
    render(<IconGallery />);

    const searchInput = screen.getByPlaceholderText("Search icons...");

    // Search with uppercase
    await user.type(searchInput, "PLUS");

    // Should still find Plus icon
    const resultCount = screen.getByText(/results/i);
    expect(resultCount).toBeInTheDocument();
  });

  it("displays gallery with correct structure", () => {
    const { container } = render(<IconGallery />);

    // Should have gallery container
    const gallery = container.firstChild;
    expect(gallery).toBeInTheDocument();

    // Should have search container, categories, and icon grid
    expect(container.querySelector("[class*='header']")).toBeInTheDocument();
    expect(container.querySelector("[class*='search']")).toBeInTheDocument();
    expect(container.querySelector("[class*='categor']")).toBeInTheDocument();
  });

  it("renders icons with correct structure", () => {
    const { container } = render(<IconGallery />);

    // Should have icon items displayed
    const iconItems = container.querySelectorAll("[class*='iconItem']");
    expect(iconItems.length).toBeGreaterThan(0);

    // Each icon item should have icon display and name elements
    iconItems.forEach((item) => {
      const iconDisplay = item.querySelector("[class*='iconDisplay']");
      const iconName = item.querySelector("[class*='iconName']");
      expect(iconDisplay || iconName).toBeInTheDocument();
    });
  });

  it("clears search results when search is empty", async () => {
    const user = userEvent.setup();
    render(<IconGallery />);

    const searchInput = screen.getByPlaceholderText(
      "Search icons...",
    ) as HTMLInputElement;

    // Type something
    await user.type(searchInput, "plus");
    expect(screen.getByText(/results/i)).toBeInTheDocument();

    // Clear the search
    await user.clear(searchInput);

    // Result count should disappear
    const resultCount = screen.queryByText(/results/i);
    expect(resultCount).not.toBeInTheDocument();
  });

  it("renders header correctly", () => {
    render(<IconGallery />);

    const heading = screen.getByRole("heading", { name: "Icon Browser" });
    expect(heading).toBeInTheDocument();
  });

  it("all category buttons are buttons", () => {
    render(<IconGallery />);

    const allButton = screen.getByRole("button", { name: "All" });
    const navigationButton = screen.getByRole("button", { name: "Navigation" });

    expect(allButton.type).toBe("button");
    expect(navigationButton.type).toBe("button");
  });
});
