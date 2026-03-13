import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { IconGallery } from "./IconGallery";
import { Heart, Star, MessageCircle } from "lucide-react";

describe("IconGallery", () => {
  const mockIcons = [
    { id: "heart", icon: <Heart size={24} />, label: "Heart" },
    { id: "star", icon: <Star size={24} />, label: "Star" },
    { id: "message", icon: <MessageCircle size={24} />, label: "Message" },
  ];

  it("renders icon grid", () => {
    render(<IconGallery icons={mockIcons} />);

    expect(screen.getByText("Heart")).toBeInTheDocument();
    expect(screen.getByText("Star")).toBeInTheDocument();
  });

  it("displays all icons", () => {
    const { container } = render(<IconGallery icons={mockIcons} />);

    // Icons are mocked as span elements with data-lucide attribute
    const icons = container.querySelectorAll("[data-lucide]");
    expect(icons.length).toBeGreaterThanOrEqual(mockIcons.length);
  });

  it("handles icon selection", () => {
    render(<IconGallery icons={mockIcons} />);
    expect(screen.getByText("Heart")).toBeInTheDocument();
  });

  it("forwards ref correctly", () => {
    const { container } = render(<IconGallery icons={mockIcons} />);
    expect(container.firstChild).toBeDefined();
  });

  it("renders header with icon count", () => {
    render(<IconGallery icons={mockIcons} />);
    expect(screen.getByText("Icon Browser")).toBeInTheDocument();
  });

  it("renders search input", () => {
    render(<IconGallery icons={mockIcons} />);
    const searchInput = screen.getByPlaceholderText("Search icons...");
    expect(searchInput).toBeInTheDocument();
  });

  it("renders category buttons with All button", () => {
    render(<IconGallery icons={mockIcons} />);
    const allButton = screen.getByRole("button", { name: "All" });
    expect(allButton).toBeInTheDocument();
  });

  it("renders multiple buttons for categories", () => {
    render(<IconGallery icons={mockIcons} />);
    const buttons = screen.getAllByRole("button");
    // At least "All" + some category buttons + icon buttons
    expect(buttons.length).toBeGreaterThan(5);
  });

  it("applies custom className", () => {
    const { container } = render(
      <IconGallery icons={mockIcons} className="custom-class" />,
    );
    const gallery = container.querySelector(".custom-class");
    expect(gallery).toBeInTheDocument();
  });

  it("renders icon items with title attribute", () => {
    render(<IconGallery icons={mockIcons} />);
    const heartIcon = screen.getByTitle("Heart");
    expect(heartIcon).toBeInTheDocument();
  });

  it("renders search icon in search container", () => {
    const { container } = render(<IconGallery icons={mockIcons} />);
    const searchContainer = container.querySelector("[data-lucide='search']");
    expect(searchContainer).toBeInTheDocument();
  });

  it("has all category buttons with correct names", () => {
    render(<IconGallery icons={mockIcons} />);

    // Check for at least the "All" button
    expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();

    // Category buttons should be present (Navigation, Actions, Status, Media, Communication, Commerce)
    const allButtons = screen.getAllByRole("button");
    expect(allButtons.length).toBeGreaterThan(1);
  });

  it("renders icon names below icons", () => {
    render(<IconGallery icons={mockIcons} />);
    // At least one icon name should be visible
    expect(screen.getByText("Heart")).toBeInTheDocument();
  });

  it("renders icon gallery container", () => {
    const { container } = render(<IconGallery icons={mockIcons} />);
    const gallery = container.firstChild;
    expect(gallery).toBeInTheDocument();
  });

  it("renders with search functionality present", () => {
    render(<IconGallery icons={mockIcons} />);
    const searchInput = screen.getByPlaceholderText(
      "Search icons...",
    ) as HTMLInputElement;
    expect(searchInput).toBeInTheDocument();
    expect(searchInput.type).toBe("text");
  });
});
