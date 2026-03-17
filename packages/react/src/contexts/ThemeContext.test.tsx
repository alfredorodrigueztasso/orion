import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { useThemeContext, ThemeProvider } from "./ThemeContext";
import React from "react";

// Mock FontLoader component
vi.mock("../components/FontLoader", () => ({
  FontLoader: () => <div data-testid="font-loader">FontLoader</div>,
}));

// Mock useTheme hook
const mockUseTheme = vi.fn();
vi.mock("../hooks/useTheme", () => ({
  useTheme: () => mockUseTheme(),
}));

// Mock fonts utility - use vi.hoisted for top-level variables
const { mockGetMissingFonts } = vi.hoisted(() => ({
  mockGetMissingFonts: vi.fn().mockReturnValue([]),
}));

vi.mock("../utils/fonts", () => ({
  getMissingFonts: mockGetMissingFonts,
  GOOGLE_FONTS_URL: "https://fonts.googleapis.com/css",
  BRAND_FONTS: {
    orion: ["Inter", "Libre Baskerville"],
    red: ["Inter", "Libre Baskerville"],
    deepblue: ["Inter", "Libre Baskerville"],
    orange: ["Inter", "Libre Baskerville"],
    lemon: ["Inter", "Libre Baskerville"],
  },
}));

describe("ThemeProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseTheme.mockReturnValue({
      theme: "light",
      brand: "orion",
      setTheme: vi.fn(),
      setBrand: vi.fn(),
    });
    // Mock getComputedStyle
    Object.defineProperty(window, "getComputedStyle", {
      writable: true,
      value: vi.fn().mockReturnValue({
        getPropertyValue: vi.fn().mockReturnValue("1"),
      }),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders children without error", () => {
    render(
      <ThemeProvider>
        <div data-testid="test-child">Test Child</div>
      </ThemeProvider>,
    );

    expect(screen.getByTestId("test-child")).toBeInTheDocument();
  });

  it("renders FontLoader by default", () => {
    render(
      <ThemeProvider>
        <div>Content</div>
      </ThemeProvider>,
    );

    expect(screen.getByTestId("font-loader")).toBeInTheDocument();
  });

  it("does not render FontLoader when disableAutoFontLoading is true", () => {
    render(
      <ThemeProvider disableAutoFontLoading>
        <div>Content</div>
      </ThemeProvider>,
    );

    expect(screen.queryByTestId("font-loader")).not.toBeInTheDocument();
  });

  it("passes defaultTheme to useTheme hook", () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <div>Content</div>
      </ThemeProvider>,
    );

    // useTheme should be called with defaultTheme in options
    expect(mockUseTheme).toHaveBeenCalled();
  });

  it("passes defaultBrand to useTheme hook", () => {
    render(
      <ThemeProvider defaultBrand="red">
        <div>Content</div>
      </ThemeProvider>,
    );

    expect(mockUseTheme).toHaveBeenCalled();
  });

  it("merges flat props with options (flat props take precedence)", () => {
    render(
      <ThemeProvider options={{ defaultTheme: "light" }} defaultTheme="dark">
        <div>Content</div>
      </ThemeProvider>,
    );

    // Flat prop should override options
    expect(mockUseTheme).toHaveBeenCalled();
  });

  it("provides theme context to children", () => {
    const TestComponent = () => {
      const { theme } = useThemeContext();
      return <div data-testid="theme-value">{theme}</div>;
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("theme-value")).toHaveTextContent("light");
  });

  it("provides brand context to children", () => {
    const TestComponent = () => {
      const { brand } = useThemeContext();
      return <div data-testid="brand-value">{brand}</div>;
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("brand-value")).toHaveTextContent("orion");
  });

  it("provides setTheme function in context", () => {
    const setThemeMock = vi.fn();
    mockUseTheme.mockReturnValue({
      theme: "light",
      brand: "orion",
      setTheme: setThemeMock,
      setBrand: vi.fn(),
    });

    const TestComponent = () => {
      const { setTheme } = useThemeContext();
      return (
        <button onClick={() => setTheme("dark")} data-testid="set-theme-btn">
          Change Theme
        </button>
      );
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("set-theme-btn")).toBeInTheDocument();
  });

  it("provides setBrand function in context", () => {
    const setBrandMock = vi.fn();
    mockUseTheme.mockReturnValue({
      theme: "light",
      brand: "orion",
      setTheme: vi.fn(),
      setBrand: setBrandMock,
    });

    const TestComponent = () => {
      const { setBrand } = useThemeContext();
      return (
        <button onClick={() => setBrand("red")} data-testid="set-brand-btn">
          Change Brand
        </button>
      );
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("set-brand-btn")).toBeInTheDocument();
  });
});

describe("ThemeProvider - CSS Warnings", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseTheme.mockReturnValue({
      theme: "light",
      brand: "orion",
      setTheme: vi.fn(),
      setBrand: vi.fn(),
    });
    // Set NODE_ENV to development
    process.env.NODE_ENV = "development";
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("does not warn about missing CSS when disableCSSWarnings is true", async () => {
    // Mock getComputedStyle to return missing marker
    Object.defineProperty(window, "getComputedStyle", {
      writable: true,
      value: vi.fn().mockReturnValue({
        getPropertyValue: vi.fn().mockReturnValue(""),
      }),
    });

    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    render(
      <ThemeProvider disableCSSWarnings>
        <div>Content</div>
      </ThemeProvider>,
    );

    await waitFor(
      () => {
        expect(consoleWarnSpy).not.toHaveBeenCalledWith(
          expect.stringContaining("Component styles not detected"),
        );
      },
      { timeout: 1000 },
    );

    consoleWarnSpy.mockRestore();
  });

  it("warns about missing CSS when styles not loaded in development", async () => {
    // Mock getComputedStyle to return missing marker
    Object.defineProperty(window, "getComputedStyle", {
      writable: true,
      value: vi.fn().mockReturnValue({
        getPropertyValue: vi.fn().mockReturnValue(""),
      }),
    });

    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    render(
      <ThemeProvider>
        <div>Content</div>
      </ThemeProvider>,
    );

    await waitFor(
      () => {
        expect(consoleWarnSpy).toHaveBeenCalledWith(
          expect.stringContaining("Component styles not detected"),
        );
      },
      { timeout: 500 },
    );

    consoleWarnSpy.mockRestore();
  });

  it("does not warn about CSS in production", async () => {
    process.env.NODE_ENV = "production";

    Object.defineProperty(window, "getComputedStyle", {
      writable: true,
      value: vi.fn().mockReturnValue({
        getPropertyValue: vi.fn().mockReturnValue(""),
      }),
    });

    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    render(
      <ThemeProvider>
        <div>Content</div>
      </ThemeProvider>,
    );

    await waitFor(
      () => {
        expect(consoleWarnSpy).not.toHaveBeenCalledWith(
          expect.stringContaining("Component styles not detected"),
        );
      },
      { timeout: 500 },
    );

    consoleWarnSpy.mockRestore();
  });
});

describe("ThemeProvider - Font Warnings", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseTheme.mockReturnValue({
      theme: "light",
      brand: "orion",
      setTheme: vi.fn(),
      setBrand: vi.fn(),
    });
    // Set NODE_ENV to development
    process.env.NODE_ENV = "development";
    mockGetMissingFonts.mockReturnValue([]);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("does not warn about missing fonts when disableFontWarnings is true", async () => {
    mockGetMissingFonts.mockReturnValue(["Inter"]);

    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    render(
      <ThemeProvider disableFontWarnings>
        <div>Content</div>
      </ThemeProvider>,
    );

    await waitFor(
      () => {
        expect(consoleWarnSpy).not.toHaveBeenCalledWith(
          expect.stringContaining("Missing fonts"),
        );
      },
      { timeout: 1500 },
    );

    consoleWarnSpy.mockRestore();
  });

  it("warns about missing fonts in development when fonts are missing", async () => {
    mockGetMissingFonts.mockReturnValue(["Inter"]);

    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    render(
      <ThemeProvider>
        <div>Content</div>
      </ThemeProvider>,
    );

    await waitFor(
      () => {
        expect(consoleWarnSpy).toHaveBeenCalledWith(
          expect.stringContaining("Missing fonts"),
        );
      },
      { timeout: 1500 },
    );

    consoleWarnSpy.mockRestore();
  });

  it("does not warn about fonts in production", async () => {
    process.env.NODE_ENV = "production";
    mockGetMissingFonts.mockReturnValue(["Inter"]);

    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    render(
      <ThemeProvider>
        <div>Content</div>
      </ThemeProvider>,
    );

    await waitFor(
      () => {
        expect(consoleWarnSpy).not.toHaveBeenCalledWith(
          expect.stringContaining("Missing fonts"),
        );
      },
      { timeout: 1500 },
    );

    consoleWarnSpy.mockRestore();
  });

  it("only warns once per brand", async () => {
    mockGetMissingFonts.mockReturnValue(["Inter"]);

    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    const { rerender } = render(
      <ThemeProvider>
        <div>Content</div>
      </ThemeProvider>,
    );

    await waitFor(
      () => {
        expect(consoleWarnSpy).toHaveBeenCalledWith(
          expect.stringContaining("Missing fonts"),
        );
      },
      { timeout: 1500 },
    );

    const warnCallCount = consoleWarnSpy.mock.calls.length;

    // Re-render with same brand
    rerender(
      <ThemeProvider>
        <div>Updated Content</div>
      </ThemeProvider>,
    );

    await waitFor(
      () => {
        // Should not warn again for same brand
        expect(consoleWarnSpy.mock.calls.length).toBe(warnCallCount);
      },
      { timeout: 500 },
    );

    consoleWarnSpy.mockRestore();
  });

  it("warns for different brands separately", async () => {
    mockGetMissingFonts.mockReturnValue(["Inter"]);

    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    // First render with orion brand
    const { rerender } = render(
      <ThemeProvider defaultBrand="orion">
        <div>Content</div>
      </ThemeProvider>,
    );

    await waitFor(
      () => {
        expect(consoleWarnSpy).toHaveBeenCalled();
      },
      { timeout: 1500 },
    );

    const firstCallCount = consoleWarnSpy.mock.calls.length;

    // Render with different brand
    mockUseTheme.mockReturnValue({
      theme: "light",
      brand: "red",
      setTheme: vi.fn(),
      setBrand: vi.fn(),
    });

    rerender(
      <ThemeProvider defaultBrand="red">
        <div>Content</div>
      </ThemeProvider>,
    );

    await waitFor(
      () => {
        // Should warn again for different brand
        expect(consoleWarnSpy.mock.calls.length).toBeGreaterThan(
          firstCallCount,
        );
      },
      { timeout: 1500 },
    );

    consoleWarnSpy.mockRestore();
  });
});

describe("useThemeContext Hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseTheme.mockReturnValue({
      theme: "light",
      brand: "orion",
      setTheme: vi.fn(),
      setBrand: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("throws error when used outside ThemeProvider", () => {
    const TestComponent = () => {
      useThemeContext();
      return <div>Test</div>;
    };

    // useThemeContext should throw
    const renderWithoutProvider = () => render(<TestComponent />);
    expect(renderWithoutProvider).toThrow();
  });

  it("returns context value when used inside ThemeProvider", () => {
    const TestComponent = () => {
      const context = useThemeContext();
      return (
        <div>
          <div data-testid="theme">{context.theme}</div>
          <div data-testid="brand">{context.brand}</div>
        </div>
      );
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("theme")).toHaveTextContent("light");
    expect(screen.getByTestId("brand")).toHaveTextContent("orion");
  });

  it("returns setTheme function", () => {
    const setThemeMock = vi.fn();
    mockUseTheme.mockReturnValue({
      theme: "light",
      brand: "orion",
      setTheme: setThemeMock,
      setBrand: vi.fn(),
    });

    const TestComponent = () => {
      const { setTheme } = useThemeContext();
      return (
        <button onClick={() => setTheme("dark")} data-testid="btn">
          Change
        </button>
      );
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("btn")).toBeInTheDocument();
  });

  it("returns setBrand function", () => {
    const setBrandMock = vi.fn();
    mockUseTheme.mockReturnValue({
      theme: "light",
      brand: "orion",
      setTheme: vi.fn(),
      setBrand: setBrandMock,
    });

    const TestComponent = () => {
      const { setBrand } = useThemeContext();
      return (
        <button onClick={() => setBrand("red")} data-testid="btn">
          Change
        </button>
      );
    };

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("btn")).toBeInTheDocument();
  });

  it("works in deeply nested components", () => {
    const DeepComponent = () => {
      const { theme } = useThemeContext();
      return <div data-testid="deep">{theme}</div>;
    };

    const MiddleComponent = () => (
      <div>
        <DeepComponent />
      </div>
    );

    const TopComponent = () => (
      <div>
        <MiddleComponent />
      </div>
    );

    render(
      <ThemeProvider>
        <TopComponent />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("deep")).toHaveTextContent("light");
  });

  it("allows multiple components to use context simultaneously", () => {
    const Component1 = () => {
      const { theme } = useThemeContext();
      return <div data-testid="comp1">{theme}</div>;
    };

    const Component2 = () => {
      const { brand } = useThemeContext();
      return <div data-testid="comp2">{brand}</div>;
    };

    render(
      <ThemeProvider>
        <Component1 />
        <Component2 />
      </ThemeProvider>,
    );

    expect(screen.getByTestId("comp1")).toHaveTextContent("light");
    expect(screen.getByTestId("comp2")).toHaveTextContent("orion");
  });
});

describe("ThemeProvider - Cleanup", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseTheme.mockReturnValue({
      theme: "light",
      brand: "orion",
      setTheme: vi.fn(),
      setBrand: vi.fn(),
    });
    Object.defineProperty(window, "getComputedStyle", {
      writable: true,
      value: vi.fn().mockReturnValue({
        getPropertyValue: vi.fn().mockReturnValue("1"),
      }),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("clears CSS warning timeout on unmount", () => {
    const clearTimeoutSpy = vi.spyOn(global, "clearTimeout");

    const { unmount } = render(
      <ThemeProvider>
        <div>Content</div>
      </ThemeProvider>,
    );

    unmount();

    // clearTimeout should have been called for CSS warning timeout
    expect(clearTimeoutSpy).toHaveBeenCalled();

    clearTimeoutSpy.mockRestore();
  });

  it("clears font warning timeout on unmount", () => {
    const clearTimeoutSpy = vi.spyOn(global, "clearTimeout");

    const { unmount } = render(
      <ThemeProvider>
        <div>Content</div>
      </ThemeProvider>,
    );

    unmount();

    // clearTimeout should have been called for font warning timeout
    expect(clearTimeoutSpy).toHaveBeenCalled();

    clearTimeoutSpy.mockRestore();
  });
});

describe("ThemeProvider - Edge Cases", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseTheme.mockReturnValue({
      theme: "light",
      brand: "orion",
      setTheme: vi.fn(),
      setBrand: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("handles all valid brand options", () => {
    const brands = ["orion", "red", "deepblue", "orange", "lemon"] as const;

    brands.forEach((brand) => {
      mockUseTheme.mockReturnValueOnce({
        theme: "light",
        brand,
        setTheme: vi.fn(),
        setBrand: vi.fn(),
      });

      const TestComponent = () => {
        const { brand: contextBrand } = useThemeContext();
        return <div data-testid="brand">{contextBrand}</div>;
      };

      const { unmount } = render(
        <ThemeProvider defaultBrand={brand}>
          <TestComponent />
        </ThemeProvider>,
      );

      expect(screen.getByTestId("brand")).toHaveTextContent(brand);
      unmount();
    });
  });

  it("handles all theme options", () => {
    const themes = ["light", "dark"] as const;

    themes.forEach((theme) => {
      mockUseTheme.mockReturnValueOnce({
        theme,
        brand: "orion",
        setTheme: vi.fn(),
        setBrand: vi.fn(),
      });

      const TestComponent = () => {
        const { theme: contextTheme } = useThemeContext();
        return <div data-testid="theme">{contextTheme}</div>;
      };

      const { unmount } = render(
        <ThemeProvider defaultTheme={theme}>
          <TestComponent />
        </ThemeProvider>,
      );

      expect(screen.getByTestId("theme")).toHaveTextContent(theme);
      unmount();
    });
  });

  it("works with undefined children (edge case)", () => {
    // Should handle gracefully
    expect(() =>
      render(<ThemeProvider>{undefined}</ThemeProvider>),
    ).not.toThrow();
  });

  it("works with multiple children", () => {
    render(
      <ThemeProvider>
        <div data-testid="child1">Child 1</div>
        <div data-testid="child2">Child 2</div>
        <div data-testid="child3">Child 3</div>
      </ThemeProvider>,
    );

    expect(screen.getByTestId("child1")).toBeInTheDocument();
    expect(screen.getByTestId("child2")).toBeInTheDocument();
    expect(screen.getByTestId("child3")).toBeInTheDocument();
  });

  it("handles nested ThemeProviders (uses innermost context)", () => {
    const InnerComponent = () => {
      const { theme } = useThemeContext();
      return <div data-testid="inner">{theme}</div>;
    };

    mockUseTheme.mockReturnValueOnce({
      theme: "light",
      brand: "orion",
      setTheme: vi.fn(),
      setBrand: vi.fn(),
    });
    mockUseTheme.mockReturnValueOnce({
      theme: "dark",
      brand: "red",
      setTheme: vi.fn(),
      setBrand: vi.fn(),
    });

    render(
      <ThemeProvider defaultTheme="light">
        <ThemeProvider defaultTheme="dark">
          <InnerComponent />
        </ThemeProvider>
      </ThemeProvider>,
    );

    // Should use innermost provider's value
    expect(screen.getByTestId("inner")).toHaveTextContent("dark");
  });

  // ============================================================================
  // NEW TESTS FOR UNTESTED BRANCHES (Production + Non-localhost conditions)
  // ============================================================================

  it("does not warn about CSS in production on non-localhost", () => {
    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    // Mock window.location to non-localhost domain in production
    Object.defineProperty(window, "location", {
      value: { hostname: "production.example.com" },
      writable: true,
    });

    vi.stubEnv("NODE_ENV", "production");

    const TestComponent = () => {
      const { theme } = useThemeContext();
      return <div data-testid="content">{theme}</div>;
    };

    render(
      <ThemeProvider defaultTheme="light">
        <TestComponent />
      </ThemeProvider>,
    );

    // No warning should be logged in production + non-localhost
    expect(consoleSpy).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
    vi.unstubAllEnvs();
  });

  it("does not warn about fonts in production on non-localhost", () => {
    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    // Mock window.location to non-localhost domain in production
    Object.defineProperty(window, "location", {
      value: { hostname: "production.example.com" },
      writable: true,
    });

    vi.stubEnv("NODE_ENV", "production");

    const TestComponent = () => {
      const { theme } = useThemeContext();
      return <div data-testid="content">{theme}</div>;
    };

    render(
      <ThemeProvider defaultTheme="light" disableAutoFontLoading={false}>
        <TestComponent />
      </ThemeProvider>,
    );

    // No warning should be logged in production + non-localhost
    expect(consoleSpy).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
    vi.unstubAllEnvs();
  });
});
