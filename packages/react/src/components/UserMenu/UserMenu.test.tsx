import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserMenu } from "./UserMenu";
import { LogOut, Settings, User, Bell } from "lucide-react";

describe("UserMenu", () => {
  const mockUser = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://i.pravatar.cc/150?u=john",
  };

  const mockSections = [
    {
      id: "account",
      label: "Account",
      items: [
        { id: "profile", label: "Profile", onClick: vi.fn() },
        {
          id: "settings",
          label: "Settings",
          icon: <Settings size={16} />,
          onClick: vi.fn(),
        },
        { id: "logout", label: "Sign out", onClick: vi.fn(), danger: true },
      ],
    },
  ];

  describe("rendering", () => {
    it("displays user name in trigger", () => {
      const { container } = render(
        <UserMenu user={mockUser} sections={mockSections} />,
      );

      const triggerName = container.querySelector("[class*='triggerName']");
      expect(triggerName).toHaveTextContent("John Doe");
    });

    it("shows user avatar image when provided", () => {
      const { container } = render(
        <UserMenu user={mockUser} sections={mockSections} />,
      );

      const img = container.querySelector("img") as HTMLImageElement;
      expect(img).toBeInTheDocument();
      expect(img.src).toBe(mockUser.avatar);
    });

    it("shows avatar initials when no image provided", () => {
      const userWithoutAvatar = { ...mockUser, avatar: undefined };
      const { container } = render(
        <UserMenu user={userWithoutAvatar} sections={mockSections} />,
      );

      const avatarInitials = container.querySelector(
        "[class*='avatarInitials']",
      );
      expect(avatarInitials).toHaveTextContent("JD");
    });

    it("uses custom initials when provided", () => {
      const userWithInitials = {
        ...mockUser,
        initials: "ABC",
        avatar: undefined,
      };
      const { container } = render(
        <UserMenu user={userWithInitials} sections={mockSections} />,
      );

      expect(container.textContent).toContain("ABC");
    });

    it("displays user role when provided", () => {
      const userWithRole = { ...mockUser, role: "Admin" };
      render(<UserMenu user={userWithRole} sections={mockSections} />);

      expect(screen.getByText("Admin")).toBeInTheDocument();
    });

    it("displays status indicator when provided", () => {
      const userWithStatus = { ...mockUser, status: "online" as const };
      const { container } = render(
        <UserMenu user={userWithStatus} sections={mockSections} />,
      );

      const statusIndicator = container.querySelector(
        "[style*='background-color']",
      );
      expect(statusIndicator).toBeInTheDocument();
    });
  });

  describe("menu interaction", () => {
    it("opens menu on trigger click", async () => {
      const user = userEvent.setup();
      render(<UserMenu user={mockUser} sections={mockSections} />);

      const trigger = screen.getByRole("button", { expanded: false });
      await user.click(trigger);

      expect(trigger).toHaveAttribute("aria-expanded", "true");
    });

    it("closes menu on second trigger click", async () => {
      const user = userEvent.setup();
      render(<UserMenu user={mockUser} sections={mockSections} />);

      const trigger = screen.getByRole("button", { expanded: false });
      await user.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "true");

      await user.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    });

    it("closes menu when clicking outside", async () => {
      const user = userEvent.setup();
      const { container } = render(
        <UserMenu user={mockUser} sections={mockSections} />,
      );

      const trigger = screen.getByRole("button", { expanded: false });
      await user.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "true");

      fireEvent.mouseDown(container.ownerDocument.body);
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    });

    it("closes menu when pressing Escape", async () => {
      const user = userEvent.setup();
      render(<UserMenu user={mockUser} sections={mockSections} />);

      const trigger = screen.getByRole("button", { expanded: false });
      await user.click(trigger);
      expect(trigger).toHaveAttribute("aria-expanded", "true");

      fireEvent.keyDown(document, { key: "Escape" });
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    });

    it("focuses trigger when closing with Escape", async () => {
      const user = userEvent.setup();
      render(<UserMenu user={mockUser} sections={mockSections} />);

      const trigger = screen.getByRole("button");
      await user.click(trigger);

      fireEvent.keyDown(document, { key: "Escape" });
      expect(document.activeElement).toBe(trigger);
    });
  });

  describe("menu items", () => {
    it("displays all menu items", () => {
      render(<UserMenu user={mockUser} sections={mockSections} />);

      expect(screen.getByText("Profile")).toBeInTheDocument();
      expect(screen.getByText("Settings")).toBeInTheDocument();
      expect(screen.getByText("Sign out")).toBeInTheDocument();
    });

    it("calls onClick handler when item is clicked", async () => {
      const clickHandler = vi.fn();
      const sectionsWithHandler = [
        {
          id: "account",
          items: [{ id: "profile", label: "Profile", onClick: clickHandler }],
        },
      ];

      const user = userEvent.setup();
      render(<UserMenu user={mockUser} sections={sectionsWithHandler} />);

      const trigger = screen.getByRole("button", { expanded: false });
      await user.click(trigger);

      const profileItem = screen.getByText("Profile");
      await user.click(profileItem);

      expect(clickHandler).toHaveBeenCalled();
    });

    it("closes menu after clicking an item", async () => {
      const user = userEvent.setup();
      render(<UserMenu user={mockUser} sections={mockSections} />);

      const trigger = screen.getByRole("button", { expanded: false });
      await user.click(trigger);

      const profileItem = screen.getByText("Profile");
      await user.click(profileItem);

      expect(trigger).toHaveAttribute("aria-expanded", "false");
    });

    it("does not call onClick for disabled items", async () => {
      const clickHandler = vi.fn();
      const sectionsWithDisabled = [
        {
          id: "account",
          items: [
            {
              id: "profile",
              label: "Profile",
              onClick: clickHandler,
              disabled: true,
            },
          ],
        },
      ];

      render(<UserMenu user={mockUser} sections={sectionsWithDisabled} />);
      const profileItem = screen.getByText("Profile");
      await userEvent.setup().click(profileItem);

      expect(clickHandler).not.toHaveBeenCalled();
    });

    it("displays items with icons", async () => {
      const sectionsWithIcons = [
        {
          id: "account",
          items: [
            {
              id: "settings",
              label: "Settings",
              icon: <Settings size={16} />,
              onClick: vi.fn(),
            },
          ],
        },
      ];

      const { container } = render(
        <UserMenu user={mockUser} sections={sectionsWithIcons} />,
      );

      const trigger = screen.getByRole("button", { expanded: false });
      await userEvent.setup().click(trigger);

      const itemIcon = container.querySelector("[class*='itemIcon']");
      expect(itemIcon).toBeInTheDocument();
    });

    it("displays items with badges", () => {
      const sectionsWithBadge = [
        {
          id: "account",
          items: [
            {
              id: "notifications",
              label: "Notifications",
              badge: 5,
              onClick: vi.fn(),
            },
          ],
        },
      ];

      render(<UserMenu user={mockUser} sections={sectionsWithBadge} />);
      expect(screen.getByText("5")).toBeInTheDocument();
    });

    it("displays items with shortcuts", () => {
      const sectionsWithShortcut = [
        {
          id: "account",
          items: [
            {
              id: "settings",
              label: "Settings",
              shortcut: "⌘S",
              onClick: vi.fn(),
            },
          ],
        },
      ];

      render(<UserMenu user={mockUser} sections={sectionsWithShortcut} />);
      expect(screen.getByText("⌘S")).toBeInTheDocument();
    });

    it("renders link items when href is provided", () => {
      const sectionsWithLink = [
        {
          id: "account",
          items: [
            { id: "help", label: "Help", href: "https://help.example.com" },
          ],
        },
      ];

      const { container } = render(
        <UserMenu user={mockUser} sections={sectionsWithLink} />,
      );

      const link = container.querySelector("a");
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "https://help.example.com");
    });

    it("does not render link item if disabled", () => {
      const sectionsWithDisabledLink = [
        {
          id: "account",
          items: [
            {
              id: "help",
              label: "Help",
              href: "https://help.example.com",
              disabled: true,
            },
          ],
        },
      ];

      const { container } = render(
        <UserMenu user={mockUser} sections={sectionsWithDisabledLink} />,
      );

      const link = container.querySelector("a");
      expect(link).not.toBeInTheDocument();
    });

    it("displays danger items with danger styling", () => {
      const sectionsWithDanger = [
        {
          id: "account",
          items: [
            {
              id: "delete",
              label: "Delete Account",
              danger: true,
              onClick: vi.fn(),
            },
          ],
        },
      ];

      const { container } = render(
        <UserMenu user={mockUser} sections={sectionsWithDanger} />,
      );

      const deleteItem = container.querySelector("[class*='itemDanger']");
      expect(deleteItem).toBeInTheDocument();
      expect(deleteItem).toHaveTextContent("Delete Account");
    });

    it("displays disabled items with disabled styling", () => {
      const sectionsWithDisabled = [
        {
          id: "account",
          items: [
            { id: "locked", label: "Locked", disabled: true, onClick: vi.fn() },
          ],
        },
      ];

      const { container } = render(
        <UserMenu user={mockUser} sections={sectionsWithDisabled} />,
      );

      const lockedButton = container.querySelector(
        "[class*='itemDisabled']",
      ) as HTMLButtonElement;
      expect(lockedButton).toBeInTheDocument();
      expect(lockedButton.disabled).toBe(true);
    });

    it("displays section labels", () => {
      const sectionsWithLabels = [
        {
          id: "account",
          label: "Account Settings",
          items: [{ id: "profile", label: "Profile", onClick: vi.fn() }],
        },
      ];

      render(<UserMenu user={mockUser} sections={sectionsWithLabels} />);
      expect(screen.getByText("Account Settings")).toBeInTheDocument();
    });

    it("displays dividers between sections", () => {
      const multiSections = [
        {
          id: "account",
          items: [{ id: "profile", label: "Profile", onClick: vi.fn() }],
        },
        {
          id: "app",
          items: [{ id: "about", label: "About", onClick: vi.fn() }],
        },
      ];

      const { container } = render(
        <UserMenu user={mockUser} sections={multiSections} />,
      );

      const dividers = container.querySelectorAll("[class*='divider']");
      expect(dividers.length).toBeGreaterThan(0);
    });
  });

  describe("header", () => {
    it("displays header by default", () => {
      const { container } = render(
        <UserMenu user={mockUser} sections={mockSections} />,
      );

      const header = container.querySelector("[class*='header']");
      expect(header).toBeInTheDocument();
    });

    it("hides header when showHeader is false", () => {
      const { container } = render(
        <UserMenu user={mockUser} sections={mockSections} showHeader={false} />,
      );

      const header = container.querySelector(
        "[class*='header']:not([class*='HeaderInfo'])",
      );
      expect(header).not.toBeInTheDocument();
    });

    it("displays email in header when provided", () => {
      const { container } = render(
        <UserMenu user={mockUser} sections={mockSections} />,
      );

      const headerEmail = container.querySelector("[class*='headerEmail']");
      expect(headerEmail).toHaveTextContent("john@example.com");
    });
  });

  describe("modes and variants", () => {
    it("applies compact mode", () => {
      const { container } = render(
        <UserMenu user={mockUser} sections={mockSections} compact />,
      );

      const trigger = container.querySelector("button");
      expect(trigger?.className).toMatch(/[Cc]ompact/);
    });

    it("applies fullWidth mode", () => {
      const { container } = render(
        <UserMenu user={mockUser} sections={mockSections} fullWidth />,
      );

      const userMenuDiv = container.firstChild as HTMLElement;
      expect(userMenuDiv.className).toMatch(/[Ff]ull[Ww]idth/);
    });

    it("applies start alignment", () => {
      const { container } = render(
        <UserMenu user={mockUser} sections={mockSections} align="start" />,
      );

      const dropdown = container.querySelector("[role='menu']") as HTMLElement;
      expect(dropdown.className).toMatch(/dropdownStart/);
    });

    it("applies top placement", () => {
      const { container } = render(
        <UserMenu user={mockUser} sections={mockSections} placement="top" />,
      );

      const dropdown = container.querySelector("[role='menu']") as HTMLElement;
      expect(dropdown.className).toMatch(/dropdownTop/);
    });
  });

  describe("controlled mode", () => {
    it("works in controlled mode with open prop", async () => {
      const onOpenChange = vi.fn();
      const { rerender } = render(
        <UserMenu
          user={mockUser}
          sections={mockSections}
          open={false}
          onOpenChange={onOpenChange}
        />,
      );

      const trigger = screen.getByRole("button", { expanded: false });
      expect(trigger).toHaveAttribute("aria-expanded", "false");

      rerender(
        <UserMenu
          user={mockUser}
          sections={mockSections}
          open={true}
          onOpenChange={onOpenChange}
        />,
      );

      expect(screen.getByRole("button", { expanded: true })).toHaveAttribute(
        "aria-expanded",
        "true",
      );
    });

    it("calls onOpenChange callback when opened", async () => {
      const onOpenChange = vi.fn();
      const user = userEvent.setup();

      render(
        <UserMenu
          user={mockUser}
          sections={mockSections}
          onOpenChange={onOpenChange}
        />,
      );

      const trigger = screen.getByRole("button", { expanded: false });
      await user.click(trigger);

      expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    it("calls onOpenChange callback when closed", async () => {
      const onOpenChange = vi.fn();
      const user = userEvent.setup();

      render(
        <UserMenu
          user={mockUser}
          sections={mockSections}
          onOpenChange={onOpenChange}
        />,
      );

      const trigger = screen.getByRole("button", { expanded: false });
      await user.click(trigger);
      await user.click(trigger);

      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
  });

  describe("custom trigger", () => {
    it("uses custom trigger when provided", () => {
      const customTrigger = <div>Custom Button</div>;
      render(
        <UserMenu
          user={mockUser}
          sections={mockSections}
          trigger={customTrigger}
        />,
      );

      expect(screen.getByText("Custom Button")).toBeInTheDocument();
    });

    it("toggles menu when custom trigger is clicked", async () => {
      const user = userEvent.setup();
      render(
        <UserMenu
          user={mockUser}
          sections={mockSections}
          trigger={<button>Custom Trigger</button>}
        />,
      );

      const customTrigger = screen.getByText("Custom Trigger");
      await user.click(customTrigger);

      expect(screen.getByText("Profile")).toBeInTheDocument();
    });
  });

  describe("ref forwarding", () => {
    it("forwards ref correctly", () => {
      const ref = vi.fn();
      render(<UserMenu ref={ref} user={mockUser} sections={mockSections} />);

      expect(ref).toHaveBeenCalled();
    });
  });

  describe("accessibility", () => {
    it("has proper ARIA attributes", () => {
      render(<UserMenu user={mockUser} sections={mockSections} />);

      const trigger = screen.getByRole("button");
      expect(trigger).toHaveAttribute("aria-expanded");
      expect(trigger).toHaveAttribute("aria-haspopup", "true");
    });

    it("menu has proper role", () => {
      const { container } = render(
        <UserMenu user={mockUser} sections={mockSections} />,
      );

      const menu = container.querySelector("[role='menu']");
      expect(menu).toBeInTheDocument();
    });

    it("items have proper role", () => {
      const { container } = render(
        <UserMenu user={mockUser} sections={mockSections} />,
      );

      const items = container.querySelectorAll("[role='menuitem']");
      expect(items.length).toBeGreaterThan(0);
    });
  });
});
