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
});
