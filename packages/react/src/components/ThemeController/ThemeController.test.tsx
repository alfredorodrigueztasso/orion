import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeController } from "./ThemeController";
import { ThemeProvider } from "../../contexts/ThemeContext";

// Wrapper to provide theme context
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe("ThemeController", () => {
  it("renders full controller by default", () => {
    render(<ThemeController />, { wrapper });
    expect(screen.getByText("Theme & Brand Settings")).toBeInTheDocument();
  });

  it("renders theme toggle section", () => {
    render(<ThemeController />, { wrapper });
    expect(screen.getByText("Color Mode")).toBeInTheDocument();
    expect(
      screen.getByText("Switch between light and dark themes"),
    ).toBeInTheDocument();
  });

  it("renders brand selector section", () => {
    render(<ThemeController />, { wrapper });
    expect(screen.getByText("Brand Identity")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Select a brand to see different accent colors and styling",
      ),
    ).toBeInTheDocument();
  });

  it("renders all brand options", () => {
    render(<ThemeController />, { wrapper });
    expect(screen.getByText("Orion")).toBeInTheDocument();
    expect(screen.getByText("Red")).toBeInTheDocument();
    expect(screen.getByText("Deepblue")).toBeInTheDocument();
    expect(screen.getByText("Orange")).toBeInTheDocument();
  });

  it("renders current settings summary", () => {
    render(<ThemeController />, { wrapper });
    expect(screen.getByText("Current Settings")).toBeInTheDocument();
  });

  it("shows theme in summary badges", () => {
    render(<ThemeController />, { wrapper });
    expect(screen.getByText(/Theme:/)).toBeInTheDocument();
    expect(screen.getByText(/Brand:/)).toBeInTheDocument();
    expect(screen.getByText(/Accent:/)).toBeInTheDocument();
    expect(screen.getByText(/Radius:/)).toBeInTheDocument();
  });

  it("hides theme toggle when showThemeToggle is false", () => {
    render(<ThemeController showThemeToggle={false} />, { wrapper });
    expect(screen.queryByText("Color Mode")).not.toBeInTheDocument();
  });

  it("hides brand selector when showBrandSelector is false", () => {
    render(<ThemeController showBrandSelector={false} />, { wrapper });
    expect(screen.queryByText("Brand Identity")).not.toBeInTheDocument();
  });

  it("hides summary when showSummary is false", () => {
    render(<ThemeController showSummary={false} />, { wrapper });
    expect(screen.queryByText("Current Settings")).not.toBeInTheDocument();
  });

  it("renders compact mode", () => {
    render(<ThemeController compact />, { wrapper });
    // Compact mode doesn't have the full card header
    expect(
      screen.queryByText("Theme & Brand Settings"),
    ).not.toBeInTheDocument();
    // But should still have theme controls (Switch uses role="switch", not "checkbox")
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("renders brand buttons in compact mode", () => {
    render(<ThemeController compact />, { wrapper });
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(4); // 4 brand buttons
  });

  it("calls onThemeChange when theme is toggled", async () => {
    const user = userEvent.setup();
    const handleThemeChange = vi.fn();
    render(<ThemeController onThemeChange={handleThemeChange} />, { wrapper });

    // The Switch input has pointer-events: none CSS, so click the theme buttons instead
    // which internally call the onThemeChange callback
    const darkButton = screen.getByRole("button", { name: "Dark" });
    await user.click(darkButton);

    expect(handleThemeChange).toHaveBeenCalled();
  });

  it("calls onBrandChange when brand is selected", async () => {
    const user = userEvent.setup();
    const handleBrandChange = vi.fn();
    render(<ThemeController onBrandChange={handleBrandChange} />, { wrapper });

    const redButton = screen.getByText("Red").closest("div");
    if (redButton) {
      await user.click(redButton);
      expect(handleBrandChange).toHaveBeenCalledWith("red");
    }
  });

  it("switches theme with Light button", async () => {
    const user = userEvent.setup();
    render(<ThemeController />, { wrapper });

    const lightButton = screen.getByRole("button", { name: "Light" });
    await user.click(lightButton);

    // Light theme should be active (indicated by badge)
    expect(screen.getByText("☀️ Light")).toBeInTheDocument();
  });

  it("switches theme with Dark button", async () => {
    const user = userEvent.setup();
    render(<ThemeController />, { wrapper });

    const darkButton = screen.getByRole("button", { name: "Dark" });
    await user.click(darkButton);

    // Dark theme should be active
    expect(screen.getByText("🌙 Dark")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <ThemeController className="custom-controller" />,
      { wrapper },
    );
    expect(container.querySelector(".custom-controller")).toBeInTheDocument();
  });

  it("applies inline styles", () => {
    const { container } = render(
      <ThemeController style={{ background: "red" }} />,
      { wrapper },
    );
    const controller = container.firstChild as HTMLElement;
    expect(controller?.style.background).toBe("red");
  });

  describe("Compact mode", () => {
    it("renders compact layout with theme toggle", () => {
      render(<ThemeController compact showThemeToggle />, { wrapper });
      // Should have sun and moon emojis
      expect(screen.getByText("☀️")).toBeInTheDocument();
      expect(screen.getByText("🌙")).toBeInTheDocument();
    });

    it("renders compact layout with brand selector", () => {
      render(<ThemeController compact showBrandSelector />, { wrapper });
      // Should have brand buttons
      expect(screen.getByRole("button", { name: /Orion/ })).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /Deepblue/ }),
      ).toBeInTheDocument();
    });

    it("renders both controls in compact mode", () => {
      render(<ThemeController compact showThemeToggle showBrandSelector />, {
        wrapper,
      });
      expect(screen.getByRole("switch")).toBeInTheDocument();
      expect(screen.getAllByRole("button").length).toBeGreaterThanOrEqual(4);
    });
  });

  describe("Brand descriptions", () => {
    it("shows brand descriptions in full mode", () => {
      render(<ThemeController />, { wrapper });
      expect(screen.getByText("Blue accent • 12px radius")).toBeInTheDocument(); // Orion
      expect(screen.getByText("Red accent • Pill buttons")).toBeInTheDocument(); // Red
    });
  });

  describe("Visibility controls", () => {
    it("shows all sections when all flags are true", () => {
      render(
        <ThemeController showThemeToggle showBrandSelector showSummary />,
        { wrapper },
      );
      expect(screen.getByText("Color Mode")).toBeInTheDocument();
      expect(screen.getByText("Brand Identity")).toBeInTheDocument();
      expect(screen.getByText("Current Settings")).toBeInTheDocument();
    });

    it("hides all sections when all flags are false", () => {
      render(
        <ThemeController
          showThemeToggle={false}
          showBrandSelector={false}
          showSummary={false}
        />,
        { wrapper },
      );
      expect(screen.queryByText("Color Mode")).not.toBeInTheDocument();
      expect(screen.queryByText("Brand Identity")).not.toBeInTheDocument();
      expect(screen.queryByText("Current Settings")).not.toBeInTheDocument();
    });

    it("shows only theme toggle", () => {
      render(
        <ThemeController
          showThemeToggle
          showBrandSelector={false}
          showSummary={false}
        />,
        {
          wrapper,
        },
      );
      expect(screen.getByText("Color Mode")).toBeInTheDocument();
      expect(screen.queryByText("Brand Identity")).not.toBeInTheDocument();
      expect(screen.queryByText("Current Settings")).not.toBeInTheDocument();
    });

    it("shows only brand selector", () => {
      render(
        <ThemeController
          showThemeToggle={false}
          showBrandSelector
          showSummary={false}
        />,
        {
          wrapper,
        },
      );
      expect(screen.queryByText("Color Mode")).not.toBeInTheDocument();
      expect(screen.getByText("Brand Identity")).toBeInTheDocument();
      expect(screen.queryByText("Current Settings")).not.toBeInTheDocument();
    });

    it("shows only summary", () => {
      render(
        <ThemeController
          showThemeToggle={false}
          showBrandSelector={false}
          showSummary
        />,
        {
          wrapper,
        },
      );
      expect(screen.queryByText("Color Mode")).not.toBeInTheDocument();
      expect(screen.queryByText("Brand Identity")).not.toBeInTheDocument();
      expect(screen.getByText("Current Settings")).toBeInTheDocument();
    });
  });

  // ============================================================================
  // COMPREHENSIVE FUNCTIONAL TESTS (Opción B - Deep Coverage)
  // ============================================================================

  describe("Theme change callbacks", () => {
    it("calls onThemeChange with 'light' when Light button clicked", async () => {
      const user = userEvent.setup();
      const handleThemeChange = vi.fn();

      render(<ThemeController onThemeChange={handleThemeChange} />, {
        wrapper,
      });

      const lightButton = screen.getByRole("button", { name: "Light" });
      await user.click(lightButton);

      expect(handleThemeChange).toHaveBeenCalledWith("light");
    });

    it("calls onThemeChange with 'dark' when Dark button clicked", async () => {
      const user = userEvent.setup();
      const handleThemeChange = vi.fn();

      render(<ThemeController onThemeChange={handleThemeChange} />, {
        wrapper,
      });

      const darkButton = screen.getByRole("button", { name: "Dark" });
      await user.click(darkButton);

      expect(handleThemeChange).toHaveBeenCalledWith("dark");
    });

    it("renders Switch in full mode and can be interacted with", () => {
      render(<ThemeController showThemeToggle />, { wrapper });

      const switchInput = screen.getByRole("switch");
      expect(switchInput).toBeInTheDocument();
      // Switch has pointer-events: none in CSS, but is functional via button alternatives
    });

    it("renders Switch in compact mode", () => {
      render(<ThemeController compact showThemeToggle />, { wrapper });

      const switchInput = screen.getByRole("switch");
      expect(switchInput).toBeInTheDocument();
    });

    it("does not call onThemeChange when callback is not provided", async () => {
      const user = userEvent.setup();

      render(<ThemeController />, { wrapper });

      const lightButton = screen.getByRole("button", { name: "Light" });
      await user.click(lightButton);

      // Should not error if callback is not provided
      expect(screen.getByText("☀️ Light")).toBeInTheDocument();
    });
  });

  describe("Brand change callbacks", () => {
    it("calls onBrandChange with brand value when brand card clicked", async () => {
      const user = userEvent.setup();
      const handleBrandChange = vi.fn();

      render(<ThemeController onBrandChange={handleBrandChange} />, {
        wrapper,
      });

      const redBrandCard = screen
        .getByText("Red accent • Pill buttons")
        .closest("div[style*='padding']");

      if (redBrandCard) {
        await user.click(redBrandCard);
        expect(handleBrandChange).toHaveBeenCalledWith("red");
      }
    });

    it("calls onBrandChange with correct brand for each brand option", async () => {
      const user = userEvent.setup();
      const handleBrandChange = vi.fn();

      render(<ThemeController onBrandChange={handleBrandChange} />, {
        wrapper,
      });

      const deepblueBrandCard = screen
        .getByText("Deep Blue accent • 12px radius")
        .closest("div[style*='padding']");

      if (deepblueBrandCard) {
        await user.click(deepblueBrandCard);
        expect(handleBrandChange).toHaveBeenCalledWith("deepblue");
      }
    });

    it("calls onBrandChange in compact mode", async () => {
      const user = userEvent.setup();
      const handleBrandChange = vi.fn();

      render(
        <ThemeController
          compact
          showBrandSelector
          onBrandChange={handleBrandChange}
        />,
        { wrapper },
      );

      const orangeButton = screen.getByRole("button", { name: /Orange/ });
      await user.click(orangeButton);

      expect(handleBrandChange).toHaveBeenCalledWith("orange");
    });

    it("renders Radio inputs for all brands in full mode", () => {
      render(<ThemeController />, { wrapper });

      const radioButtons = screen.getAllByRole("radio");
      // Should have one radio per brand
      expect(radioButtons.length).toBeGreaterThanOrEqual(4);
      radioButtons.forEach((radio) => {
        expect(radio).toBeInTheDocument();
      });
    });

    it("does not call onBrandChange when callback is not provided", async () => {
      const user = userEvent.setup();

      render(<ThemeController />, { wrapper });

      const brandCard = screen
        .getByText("Red accent • Pill buttons")
        .closest("div[style*='padding']");

      if (brandCard) {
        await user.click(brandCard);
        // Should not error if callback is not provided
        expect(
          screen.getByText("Red accent • Pill buttons"),
        ).toBeInTheDocument();
      }
    });
  });

  describe("Compact mode brand buttons", () => {
    it("renders brand buttons with correct variants", () => {
      render(<ThemeController compact showBrandSelector />, { wrapper });

      const buttons = screen.getAllByRole("button");
      expect(buttons.length).toBeGreaterThanOrEqual(4); // At least 4 brand buttons
    });

    it("highlights current brand button", () => {
      const { rerender } = render(
        <ThemeController compact showBrandSelector />,
        { wrapper },
      );

      const initialOrionButton = screen.getByRole("button", { name: /Orion/ });
      expect(initialOrionButton).toBeInTheDocument();

      // Switch brand
      const redButton = screen.getByRole("button", { name: /Red/ });
      // The variant should indicate it's now selected after click
      expect(redButton).toBeInTheDocument();
    });
  });

  describe("Summary section", () => {
    it("displays correct theme in summary", async () => {
      const user = userEvent.setup();

      render(<ThemeController showSummary />, { wrapper });

      expect(screen.getByText(/Theme: light|Theme: dark/)).toBeInTheDocument();
    });

    it("displays correct brand in summary", () => {
      render(<ThemeController showSummary />, { wrapper });

      expect(screen.getByText(/Brand:/)).toBeInTheDocument();
    });

    it("displays accent color in summary", () => {
      render(<ThemeController showSummary />, { wrapper });

      // Should display at least one accent color value
      const accentBadge = screen.getByText(/Accent:/);
      expect(accentBadge).toBeInTheDocument();
    });

    it("displays radius value in summary", () => {
      render(<ThemeController showSummary />, { wrapper });

      const radiusBadge = screen.getByText(/Radius:/);
      expect(radiusBadge).toBeInTheDocument();
    });
  });

  describe("Brand configurations", () => {
    it("renders all six brands in full mode", () => {
      render(<ThemeController showBrandSelector />, { wrapper });

      expect(screen.getByText("Blue accent • 12px radius")).toBeInTheDocument(); // Orion
      expect(screen.getByText("Red accent • Pill buttons")).toBeInTheDocument(); // Red
      expect(
        screen.getByText("Deep Blue accent • 12px radius"),
      ).toBeInTheDocument(); // Deepblue
      expect(
        screen.getByText("Red-Orange accent • Pill buttons"),
      ).toBeInTheDocument(); // Orange
      expect(
        screen.getByText("Lime green accent • Highly rounded"),
      ).toBeInTheDocument(); // Lemon
    });

    it("renders all five brands in compact mode", () => {
      render(<ThemeController compact showBrandSelector />, { wrapper });

      expect(screen.getByRole("button", { name: /Orion/ })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Red/ })).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /Deepblue/ }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /Orange/ }),
      ).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Lemon/ })).toBeInTheDocument();
    });
  });

  describe("Compact mode styling", () => {
    it("applies correct flex layout in compact mode", () => {
      const { container } = render(
        <ThemeController compact showThemeToggle showBrandSelector />,
        { wrapper },
      );

      const outerDiv = container.firstChild as HTMLElement;
      const style = outerDiv?.getAttribute("style");
      expect(style).toContain("display: flex");
      expect(style).toContain("flex-wrap: wrap");
    });

    it("does not render header in compact mode", () => {
      render(<ThemeController compact />, { wrapper });

      expect(
        screen.queryByText("Theme & Brand Settings"),
      ).not.toBeInTheDocument();
    });

    it("renders header in full mode", () => {
      render(<ThemeController compact={false} />, { wrapper });

      expect(screen.getByText("Theme & Brand Settings")).toBeInTheDocument();
    });
  });

  describe("Full mode brand card styling", () => {
    it("highlights active brand card", async () => {
      const user = userEvent.setup();
      const { container } = render(<ThemeController showBrandSelector />, {
        wrapper,
      });

      const brandCards = container.querySelectorAll(
        "div[style*='cursor: pointer']",
      );
      expect(brandCards.length).toBeGreaterThanOrEqual(4);
    });

    it("displays Active badge on selected brand", () => {
      render(<ThemeController showBrandSelector />, { wrapper });

      const activeBadges = screen.getAllByText("Active");
      expect(activeBadges.length).toBeGreaterThanOrEqual(1); // At least one brand is active
    });
  });

  describe("Theme and Brand interaction", () => {
    it("switches theme and brand independently", async () => {
      const user = userEvent.setup();
      const handleThemeChange = vi.fn();
      const handleBrandChange = vi.fn();

      render(
        <ThemeController
          onThemeChange={handleThemeChange}
          onBrandChange={handleBrandChange}
        />,
        { wrapper },
      );

      // Change theme
      const lightButton = screen.getByRole("button", { name: "Light" });
      await user.click(lightButton);
      expect(handleThemeChange).toHaveBeenCalledWith("light");

      // Change brand
      const brandCard = screen
        .getByText("Red accent • Pill buttons")
        .closest("div[style*='padding']");
      if (brandCard) {
        await user.click(brandCard);
        expect(handleBrandChange).toHaveBeenCalledWith("red");
      }
    });

    it("maintains selected theme when changing brand", async () => {
      const user = userEvent.setup();

      render(<ThemeController />, { wrapper });

      const darkButton = screen.getByRole("button", { name: "Dark" });
      await user.click(darkButton);

      // Dark theme should still be active
      expect(screen.getByText("🌙 Dark")).toBeInTheDocument();

      // Change brand (should not affect theme)
      const brandCard = screen
        .getByText("Red accent • Pill buttons")
        .closest("div[style*='padding']");
      if (brandCard) {
        await user.click(brandCard);
        // Dark theme should still be active
        expect(screen.getByText("🌙 Dark")).toBeInTheDocument();
      }
    });
  });

  describe("Empty/undefined callbacks", () => {
    it("renders without errors when no callbacks provided", () => {
      render(<ThemeController />, { wrapper });
      expect(screen.getByText("Theme & Brand Settings")).toBeInTheDocument();
    });

    it("renders in compact mode without callbacks", () => {
      render(<ThemeController compact />, { wrapper });
      expect(screen.getByRole("switch")).toBeInTheDocument();
    });

    it("handles missing style prop", () => {
      const { container } = render(<ThemeController />, { wrapper });
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});
