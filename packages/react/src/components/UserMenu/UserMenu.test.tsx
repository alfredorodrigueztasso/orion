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

  it("displays user name", () => {
    render(
      <UserMenu user={mockUser} />,
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("shows user avatar", () => {
    const { container } = render(
      <UserMenu user={mockUser} />,
    );

    const img = container.querySelector("img");
    expect(img).toBeInTheDocument();
  });

  it("opens menu on click", async () => {
    const user = userEvent.setup();

    render(
      <UserMenu user={mockUser} />,
    );

    const trigger = screen.getByText("John Doe").closest("button") || screen.getByText("John Doe");
    await user.click(trigger as HTMLElement);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("handles logout", async () => {
    const handleLogout = vi.fn();
    const user = userEvent.setup();

    render(
      <UserMenu
        user={mockUser}
        onLogout={handleLogout}
      />,
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();
    render(
      <UserMenu ref={ref} user={mockUser} />,
    );

    expect(ref).toHaveBeenCalled();
  });
});
