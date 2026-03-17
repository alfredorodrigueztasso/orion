import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("renders with image", () => {
    render(<Avatar src="/user.jpg" alt="User" />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "/user.jpg");
    expect(img).toHaveAttribute("alt", "User");
  });

  it("renders with initials when no image", () => {
    render(<Avatar initials="JD" />);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("renders with custom icon when no image or initials", () => {
    render(<Avatar icon={<span data-testid="custom-icon">👨</span>} />);
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("renders default fallback icon when no image, initials, or icon", () => {
    const { container } = render(<Avatar />);
    // Default icon is lucide User icon
    const icon = container.querySelector('[data-icon="User"]');
    expect(icon).toBeInTheDocument();
  });

  it("fallbacks to initials when image fails to load", () => {
    render(<Avatar src="/invalid.jpg" alt="User" initials="JD" />);
    const img = screen.getByRole("img");

    // Simulate image load error
    fireEvent.error(img);

    expect(screen.getByText("JD")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("fallbacks to icon when image fails and no initials", () => {
    render(
      <Avatar
        src="/invalid.jpg"
        alt="User"
        icon={<span data-testid="fallback-icon">👨</span>}
      />,
    );
    const img = screen.getByRole("img");

    fireEvent.error(img);

    expect(screen.getByTestId("fallback-icon")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("fallbacks to default icon when image fails and no initials or icon", () => {
    const { container } = render(<Avatar src="/invalid.jpg" alt="User" />);
    const img = screen.getByRole("img");

    fireEvent.error(img);

    // Should render lucide User icon
    const icon = container.querySelector('[data-icon="User"]');
    expect(icon).toBeInTheDocument();
  });

  it("applies xs size class", () => {
    const { container } = render(<Avatar initials="JD" size="xs" />);
    expect((container.firstChild as HTMLElement).className).toMatch(/xs/);
  });

  it("applies sm size class", () => {
    const { container } = render(<Avatar initials="JD" size="sm" />);
    expect((container.firstChild as HTMLElement).className).toMatch(/sm/);
  });

  it("applies md size class by default", () => {
    const { container } = render(<Avatar initials="JD" />);
    expect((container.firstChild as HTMLElement).className).toMatch(/md/);
  });

  it("applies lg size class", () => {
    const { container } = render(<Avatar initials="JD" size="lg" />);
    expect((container.firstChild as HTMLElement).className).toMatch(/lg/);
  });

  it("applies xl size class", () => {
    const { container } = render(<Avatar initials="JD" size="xl" />);
    expect((container.firstChild as HTMLElement).className).toMatch(/xl/);
  });

  it("applies 2xl size class", () => {
    const { container } = render(<Avatar initials="JD" size="2xl" />);
    expect((container.firstChild as HTMLElement).className).toMatch(/xxl/);
  });

  it("renders online status indicator", () => {
    render(<Avatar initials="JD" status="online" />);
    const statusIndicator = screen.getByLabelText("Status: online");
    expect(statusIndicator).toBeInTheDocument();
  });

  it("renders offline status indicator", () => {
    render(<Avatar initials="JD" status="offline" />);
    const statusIndicator = screen.getByLabelText("Status: offline");
    expect(statusIndicator).toBeInTheDocument();
  });

  it("renders away status indicator", () => {
    render(<Avatar initials="JD" status="away" />);
    const statusIndicator = screen.getByLabelText("Status: away");
    expect(statusIndicator).toBeInTheDocument();
  });

  it("renders busy status indicator", () => {
    render(<Avatar initials="JD" status="busy" />);
    const statusIndicator = screen.getByLabelText("Status: busy");
    expect(statusIndicator).toBeInTheDocument();
  });

  it("does not render status indicator when status is not provided", () => {
    render(<Avatar initials="JD" />);
    expect(screen.queryByLabelText(/Status:/)).not.toBeInTheDocument();
  });

  it("applies interactive class when interactive is true", () => {
    const { container } = render(<Avatar initials="JD" interactive />);
    expect((container.firstChild as HTMLElement).className).toMatch(
      /interactive/,
    );
  });

  it("does not apply interactive class by default", () => {
    const { container } = render(<Avatar initials="JD" />);
    expect(container.firstChild?.className).not.toMatch(/interactive/);
  });

  it("applies custom className", () => {
    const { container } = render(
      <Avatar initials="JD" className="custom-avatar" />,
    );
    expect(container.firstChild).toHaveClass("custom-avatar");
  });

  it("passes through HTML attributes", () => {
    render(<Avatar initials="JD" data-testid="test-avatar" />);
    expect(screen.getByTestId("test-avatar")).toBeInTheDocument();
  });

  it("supports onClick handler", () => {
    const handleClick = vi.fn();
    render(<Avatar initials="JD" onClick={handleClick} />);
    fireEvent.click(screen.getByText("JD").parentElement!);
    expect(handleClick).toHaveBeenCalled();
  });

  describe("Display priority", () => {
    it("prioritizes image over initials", () => {
      render(<Avatar src="/user.jpg" alt="User" initials="JD" />);
      expect(screen.getByRole("img")).toBeInTheDocument();
      expect(screen.queryByText("JD")).not.toBeInTheDocument();
    });

    it("prioritizes image over icon", () => {
      render(
        <Avatar
          src="/user.jpg"
          alt="User"
          icon={<span data-testid="icon">👨</span>}
        />,
      );
      expect(screen.getByRole("img")).toBeInTheDocument();
      expect(screen.queryByTestId("icon")).not.toBeInTheDocument();
    });

    it("prioritizes initials over icon", () => {
      render(
        <Avatar initials="JD" icon={<span data-testid="icon">👨</span>} />,
      );
      expect(screen.getByText("JD")).toBeInTheDocument();
      expect(screen.queryByTestId("icon")).not.toBeInTheDocument();
    });

    it("shows icon when no image or initials", () => {
      render(<Avatar icon={<span data-testid="icon">👨</span>} />);
      expect(screen.getByTestId("icon")).toBeInTheDocument();
    });
  });

  describe("All sizes", () => {
    it("renders xs size", () => {
      const { container } = render(<Avatar initials="JD" size="xs" />);
      expect((container.firstChild as HTMLElement).className).toMatch(/xs/);
    });

    it("renders sm size", () => {
      const { container } = render(<Avatar initials="JD" size="sm" />);
      expect((container.firstChild as HTMLElement).className).toMatch(/sm/);
    });

    it("renders md size", () => {
      const { container } = render(<Avatar initials="JD" size="md" />);
      expect((container.firstChild as HTMLElement).className).toMatch(/md/);
    });

    it("renders lg size", () => {
      const { container } = render(<Avatar initials="JD" size="lg" />);
      expect((container.firstChild as HTMLElement).className).toMatch(/lg/);
    });

    it("renders xl size", () => {
      const { container } = render(<Avatar initials="JD" size="xl" />);
      expect((container.firstChild as HTMLElement).className).toMatch(/xl/);
    });

    it("renders 2xl size", () => {
      const { container } = render(<Avatar initials="JD" size="2xl" />);
      expect((container.firstChild as HTMLElement).className).toMatch(/xxl/);
    });
  });

  describe("All status indicators", () => {
    it("renders online status", () => {
      render(<Avatar initials="JD" status="online" />);
      expect(screen.getByLabelText("Status: online")).toBeInTheDocument();
    });

    it("renders offline status", () => {
      render(<Avatar initials="JD" status="offline" />);
      expect(screen.getByLabelText("Status: offline")).toBeInTheDocument();
    });

    it("renders away status", () => {
      render(<Avatar initials="JD" status="away" />);
      expect(screen.getByLabelText("Status: away")).toBeInTheDocument();
    });

    it("renders busy status", () => {
      render(<Avatar initials="JD" status="busy" />);
      expect(screen.getByLabelText("Status: busy")).toBeInTheDocument();
    });
  });

  describe("Edge cases", () => {
    it("handles empty initials", () => {
      const { container } = render(<Avatar initials="" />);
      // Should fallback to lucide User icon
      const icon = container.querySelector('[data-icon="User"]');
      expect(icon).toBeInTheDocument();
    });

    it("handles long initials (truncates in CSS)", () => {
      render(<Avatar initials="ABCDEFG" />);
      expect(screen.getByText("ABCDEFG")).toBeInTheDocument();
    });

    it("works with single initial", () => {
      render(<Avatar initials="J" />);
      expect(screen.getByText("J")).toBeInTheDocument();
    });

    it("handles missing alt text", () => {
      const { container } = render(<Avatar src="/user.jpg" />);
      const img = container.querySelector("img");
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("alt", "");
    });
  });

  // ============================================================================
  // COMPREHENSIVE BRANCHING TESTS (Missing Coverage)
  // ============================================================================

  describe("Avatar Size Mapping", () => {
    it("maps 3xl size correctly", () => {
      const { container } = render(<Avatar initials="JD" size="3xl" />);
      expect((container.firstChild as HTMLElement).className).toMatch(/xxxl/);
    });

    it("maps 4xl size correctly", () => {
      const { container } = render(<Avatar initials="JD" size="4xl" />);
      expect((container.firstChild as HTMLElement).className).toMatch(/xxxxl/);
    });

    it("maps 5xl size correctly", () => {
      const { container } = render(<Avatar initials="JD" size="5xl" />);
      expect((container.firstChild as HTMLElement).className).toMatch(/xxxxxl/);
    });

    it("maps profile size correctly", () => {
      const { container } = render(<Avatar initials="JD" size="profile" />);
      expect((container.firstChild as HTMLElement).className).toMatch(
        /profile/,
      );
    });

    it("handles unmapped size gracefully", () => {
      const { container } = render(
        <Avatar initials="JD" size={"custom" as any} />,
      );
      // Unmapped sizes that aren't in CSS modules just get filtered out
      // So we just verify the component still renders
      expect(container.firstChild).toBeInTheDocument();
      expect(screen.getByText("JD")).toBeInTheDocument();
    });
  });

  describe("Avatar Rendering Priorities with Complex Scenarios", () => {
    it("all three (image, initials, icon) - image wins", () => {
      const handleClick = vi.fn();
      render(
        <Avatar
          src="/img.jpg"
          alt="Test"
          initials="AB"
          icon={<span data-testid="icon">👤</span>}
          onClick={handleClick}
        />,
      );

      expect(screen.getByRole("img")).toBeInTheDocument();
      expect(screen.queryByText("AB")).not.toBeInTheDocument();
      expect(screen.queryByTestId("icon")).not.toBeInTheDocument();
    });

    it("image + initials (no icon) - image wins", () => {
      render(<Avatar src="/img.jpg" alt="Test" initials="AB" />);

      expect(screen.getByRole("img")).toBeInTheDocument();
      expect(screen.queryByText("AB")).not.toBeInTheDocument();
    });

    it("initials + icon (no image) - initials win", () => {
      render(
        <Avatar initials="AB" icon={<span data-testid="icon">👤</span>} />,
      );

      expect(screen.getByText("AB")).toBeInTheDocument();
      expect(screen.queryByTestId("icon")).not.toBeInTheDocument();
    });

    it("only icon (no image, no initials)", () => {
      render(<Avatar icon={<span data-testid="icon">👤</span>} />);

      expect(screen.getByTestId("icon")).toBeInTheDocument();
      expect(screen.queryByText("User icon")).not.toBeInTheDocument();
    });

    it("none provided - default User icon", () => {
      const { container } = render(<Avatar />);

      const userIcon = container.querySelector('[data-icon="User"]');
      expect(userIcon).toBeInTheDocument();
    });
  });

  describe("Avatar Image Error Handling", () => {
    it("fallback to initials when image src is invalid", () => {
      const { rerender } = render(
        <Avatar src="/invalid.jpg" alt="User" initials="JD" />,
      );

      const img = screen.getByRole("img");
      fireEvent.error(img);

      expect(screen.getByText("JD")).toBeInTheDocument();
      expect(screen.queryByRole("img")).not.toBeInTheDocument();
    });

    it("fallback to icon when image errors and no initials", () => {
      render(
        <Avatar
          src="/error.jpg"
          alt="User"
          icon={<span data-testid="fallback-icon">⚙️</span>}
        />,
      );

      const img = screen.getByRole("img");
      fireEvent.error(img);

      expect(screen.getByTestId("fallback-icon")).toBeInTheDocument();
      expect(screen.queryByRole("img")).not.toBeInTheDocument();
    });

    it("fallback to default icon when image errors with no initials or custom icon", () => {
      const { container } = render(<Avatar src="/bad.jpg" alt="User" />);

      const img = container.querySelector("img");
      expect(img).toBeInTheDocument();

      fireEvent.error(img!);

      // After error, image should be removed and default icon shown
      const imageTags = container.querySelectorAll("img");
      expect(imageTags.length).toBe(0);

      const defaultIcon = container.querySelector('[data-icon="User"]');
      expect(defaultIcon).toBeInTheDocument();
    });

    it("imageError state is set to true after error", () => {
      const { container } = render(
        <Avatar src="/error.jpg" alt="User" initials="JD" />,
      );

      const img = container.querySelector("img");
      expect(img).toBeInTheDocument();

      fireEvent.error(img!);

      // Should show fallback (initials)
      expect(screen.getByText("JD")).toBeInTheDocument();

      // Image should be removed from DOM
      const imageTags = container.querySelectorAll("img");
      expect(imageTags.length).toBe(0);
    });
  });

  describe("Avatar Status Indicators with All States", () => {
    const statusStates: Array<"online" | "offline" | "away" | "busy"> = [
      "online",
      "offline",
      "away",
      "busy",
    ];

    statusStates.forEach((status) => {
      it(`renders status indicator for ${status}`, () => {
        const { container } = render(<Avatar initials="JD" status={status} />);

        const statusIndicator = screen.getByLabelText(`Status: ${status}`);
        expect(statusIndicator).toBeInTheDocument();
        expect(statusIndicator.className).toContain(status);
      });

      it(`${status} status with image`, () => {
        render(<Avatar src="/user.jpg" alt="User" status={status} />);

        expect(screen.getByLabelText(`Status: ${status}`)).toBeInTheDocument();
      });

      it(`${status} status with icon`, () => {
        render(
          <Avatar icon={<span data-testid="icon">👤</span>} status={status} />,
        );

        expect(screen.getByLabelText(`Status: ${status}`)).toBeInTheDocument();
      });

      it(`${status} status displays CSS class in className`, () => {
        const { container } = render(<Avatar initials="JD" status={status} />);

        const statusIndicator = screen.getByLabelText(`Status: ${status}`);
        expect(statusIndicator.className).toMatch(new RegExp(status));
      });
    });
  });

  describe("Avatar Interactive Mode", () => {
    it("interactive mode with image", async () => {
      const handleClick = vi.fn();
      render(
        <Avatar src="/user.jpg" alt="User" interactive onClick={handleClick} />,
      );

      const container = screen.getByRole("img").parentElement!;
      fireEvent.click(container);

      expect(handleClick).toHaveBeenCalled();
    });

    it("interactive mode with initials", async () => {
      const handleClick = vi.fn();
      render(<Avatar initials="JD" interactive onClick={handleClick} />);

      const container = screen.getByText("JD").parentElement!;
      fireEvent.click(container);

      expect(handleClick).toHaveBeenCalled();
    });

    it("interactive mode with icon", async () => {
      const handleClick = vi.fn();
      render(
        <Avatar
          icon={<span data-testid="icon">👤</span>}
          interactive
          onClick={handleClick}
        />,
      );

      const container = screen.getByTestId("icon").parentElement!;
      fireEvent.click(container);

      expect(handleClick).toHaveBeenCalled();
    });

    it("applies interactive class to container", () => {
      const { container } = render(<Avatar initials="JD" interactive />);

      expect((container.firstChild as HTMLElement).className).toMatch(
        /interactive/,
      );
    });

    it("non-interactive mode does not apply interactive class", () => {
      const { container } = render(
        <Avatar initials="JD" interactive={false} />,
      );

      expect((container.firstChild as HTMLElement).className).not.toMatch(
        /interactive/,
      );
    });
  });

  describe("Avatar CSS Class Building", () => {
    it("combines multiple classes correctly", () => {
      const { container } = render(
        <Avatar
          initials="JD"
          size="lg"
          interactive
          className="custom-avatar"
        />,
      );

      const avatar = container.firstChild as HTMLElement;
      expect(avatar.className).toContain("lg");
      expect(avatar.className).toContain("interactive");
      expect(avatar.className).toContain("custom-avatar");
    });

    it("filters out falsy className values", () => {
      const { container } = render(
        <Avatar initials="JD" interactive={false} className="" />,
      );

      const avatar = container.firstChild as HTMLElement;
      // Should not have empty strings
      expect(avatar.className.split(" ").filter((c) => c === "")).toHaveLength(
        0,
      );
    });

    it("handles undefined className gracefully", () => {
      const { container } = render(
        <Avatar initials="JD" className={undefined as any} />,
      );

      expect(container.firstChild).toBeInTheDocument();
    });

    it("preserves custom className while adding required classes", () => {
      const { container } = render(
        <Avatar initials="JD" size="xl" className="my-custom" />,
      );

      const avatar = container.firstChild as HTMLElement;
      expect(avatar).toHaveClass("my-custom");
      expect(avatar.className).toMatch(/xl/);
    });
  });

  describe("Avatar HTML Attributes Forwarding", () => {
    it("forwards data-* attributes", () => {
      render(
        <Avatar initials="JD" data-testid="avatar-test" data-user-id="123" />,
      );

      const avatar = screen.getByTestId("avatar-test");
      expect(avatar).toHaveAttribute("data-user-id", "123");
    });

    it("forwards aria-* attributes", () => {
      render(
        <Avatar
          initials="JD"
          aria-label="User Avatar"
          aria-describedby="user-info"
        />,
      );

      const avatar = screen.getByLabelText("User Avatar");
      expect(avatar).toHaveAttribute("aria-describedby", "user-info");
    });

    it("forwards role attribute", () => {
      render(<Avatar initials="JD" role="img" />);

      const avatar = screen.getByRole("img", { hidden: true });
      expect(avatar).toBeInTheDocument();
    });

    it("forwards title attribute", () => {
      render(<Avatar initials="JD" title="John Doe" />);

      const avatar = screen.getByTitle("John Doe");
      expect(avatar).toBeInTheDocument();
    });
  });

  describe("Avatar Image Rendering Details", () => {
    it("image element has correct CSS class", () => {
      const { container } = render(<Avatar src="/user.jpg" alt="User" />);

      const img = container.querySelector("img");
      expect(img?.className).toContain("image");
    });

    it("initials span has correct CSS class", () => {
      const { container } = render(<Avatar initials="JD" />);

      const initialsSpan = container.querySelector("span");
      expect(initialsSpan?.className).toContain("initials");
    });

    it("icon span has correct CSS class", () => {
      const { container } = render(
        <Avatar icon={<span data-testid="icon">👤</span>} />,
      );

      const iconSpan = screen.getByTestId("icon").parentElement;
      expect(iconSpan?.className).toContain("icon");
    });

    it("default icon span has correct CSS class", () => {
      const { container } = render(<Avatar />);

      const iconSpan = container.querySelector("[class*='icon']");
      expect(iconSpan?.className).toContain("icon");
    });
  });
});
