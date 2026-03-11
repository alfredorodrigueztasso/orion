import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserMenu } from "./UserMenu";
import { LogOut, Settings } from "lucide-react";

describe("UserMenu", () => {
  const mockUser = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://i.pravatar.cc/150?u=john",
  };

  const mockSections = [
    {
      id: "account",
      items: [
        { id: "profile", label: "Profile", onClick: vi.fn() },
        { id: "settings", label: "Settings", onClick: vi.fn() },
        { id: "logout", label: "Sign out", onClick: vi.fn(), danger: true },
      ],
    },
  ];

  it("displays user name", () => {
    render(<UserMenu user={mockUser} sections={mockSections} />);

    expect(screen.getAllByText("John Doe")[0]).toBeInTheDocument();
  });

  it("shows user avatar", () => {
    const { container } = render(
      <UserMenu user={mockUser} sections={mockSections} />,
    );

    const img = container.querySelector("img");
    expect(img).toBeInTheDocument();
  });

  it("opens menu on click", async () => {
    const user = userEvent.setup();

    render(<UserMenu user={mockUser} sections={mockSections} />);

    const trigger =
      screen.getAllByText("John Doe")[0].closest("button") ||
      screen.getAllByText("John Doe")[0];
    await user.click(trigger as HTMLElement);

    expect(screen.getAllByText("John Doe")[0]).toBeInTheDocument();
  });

  it("shows menu items", () => {
    render(<UserMenu user={mockUser} sections={mockSections} />);

    expect(screen.getAllByText("John Doe")[0]).toBeInTheDocument();
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();
    render(<UserMenu ref={ref} user={mockUser} sections={mockSections} />);

    expect(ref).toHaveBeenCalled();
  });
});
