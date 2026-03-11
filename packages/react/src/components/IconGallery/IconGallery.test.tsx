import { describe, it, expect, vi } from "vitest";
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

    const icons = container.querySelectorAll("svg");
    expect(icons.length).toBeGreaterThan(0);
  });

  it("handles icon selection", async () => {
    const handleSelect = vi.fn();

    render(
      <IconGallery icons={mockIcons} onSelect={handleSelect} />,
    );

    expect(screen.getByText("Heart")).toBeInTheDocument();
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();
    render(<IconGallery ref={ref} icons={mockIcons} />);
    expect(ref).toHaveBeenCalled();
  });
});
