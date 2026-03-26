"use client";

/**
 * ThemeController Component
 *
 * Interactive controls for theme and brand switching.
 *
 * @example
 * ```tsx
 * <ThemeController
 *   showBrandSelector
 *   showThemeToggle
 *   showSummary
 * />
 *
 * <ThemeController
 *   compact
 *   onThemeChange={(theme) => console.log('Theme changed:', theme)}
 *   onBrandChange={(brand) => console.log('Brand changed:', brand)}
 * />
 * ```
 */

import React from "react";
import type { ThemeControllerProps } from "./ThemeController.types";
import type { Brand } from "../../tokens/types";
import { useTheme } from "../../hooks";
import { useThemeContext } from "../../contexts/ThemeContext";
import { Card } from "../Card";
import { Switch } from "../Switch";
import { Radio } from "../Radio";
import { Button } from "../Button";
import { Badge } from "../Badge";
import { Alert } from "../Alert";

// Brand configuration
// NOTE: These HEX color values are descriptive data for the UI of ThemeController,
// not CSS styles. The actual styling uses CSS tokens (var(--interactive-primary), etc.).
// This is display metadata showing what each brand looks like, not styling rules.
const BRAND_CONFIG: Record<
  Brand,
  { accent: string; radius: string; description: string }
> = {
  orion: {
    accent: "#1B5BFF",
    radius: "12px",
    description: "Blue accent • 12px radius",
  },
  red: {
    accent: "#D7282F",
    radius: "9999px",
    description: "Red accent • Pill buttons",
  },
  deepblue: {
    accent: "#006FBA",
    radius: "12px",
    description: "Deep Blue accent • 12px radius",
  },
  orange: {
    accent: "#F15D22",
    radius: "9999px",
    description: "Red-Orange accent • Pill buttons",
  },
  lemon: {
    accent: "#72FF43",
    radius: "9999px",
    description: "Lime green accent • Highly rounded",
  },
};

export const ThemeController: React.FC<ThemeControllerProps> = ({
  showBrandSelector = true,
  showThemeToggle = true,
  showSummary = true,
  compact = false,
  className,
  style,
  onThemeChange,
  onBrandChange,
}) => {
  // Always call both hooks unconditionally (React rules of hooks)
  const standaloneTheme = useTheme();
  let contextTheme: ReturnType<typeof useThemeContext> | null = null;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- useThemeContext always executes; try/catch handles missing ThemeProvider
    contextTheme = useThemeContext();
  } catch {
    // No ThemeProvider — will use standalone hook
  }

  // Use context if available, otherwise fall back to standalone hook
  const {
    theme,
    brand: rawBrand,
    setTheme,
    setBrand,
  } = contextTheme ?? standaloneTheme;
  const brand = rawBrand as Brand;

  const handleThemeChange = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
    onThemeChange?.(newTheme);
  };

  const handleBrandChange = (newBrand: Brand) => {
    setBrand(newBrand);
    onBrandChange?.(newBrand);
  };

  if (compact) {
    return (
      <div
        className={className}
        style={{
          display: "flex",
          gap: "var(--spacing-3)",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {showThemeToggle && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--spacing-2)",
            }}
          >
            <span style={{ fontSize: "20px" }}>☀️</span>
            <Switch
              checked={theme === "dark"}
              onChange={(e) =>
                handleThemeChange(e.target.checked ? "dark" : "light")
              }
            />
            <span style={{ fontSize: "20px" }}>🌙</span>
          </div>
        )}

        {showBrandSelector && (
          <div style={{ display: "flex", gap: "var(--spacing-2)" }}>
            {(Object.keys(BRAND_CONFIG) as Brand[]).map((b) => (
              <Button
                key={b}
                variant={brand === b ? "primary" : "secondary"}
                size="sm"
                onClick={() => handleBrandChange(b)}
              >
                {b.charAt(0).toUpperCase() + b.slice(1)}
              </Button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Card
      variant="elevated"
      className={className}
      style={{
        background: "var(--interactive-primary)",
        color: "var(--interactive-primary-text)",
        ...style,
      }}
    >
      <Card.Header>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--spacing-2)",
          }}
        >
          <span style={{ fontSize: "24px" }}>🎨</span>
          <div>
            <h3 style={{ margin: 0, color: "var(--interactive-primary-text)" }}>
              Theme & Brand Settings
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: "var(--text-sm)",
                opacity: 0.9,
                color: "var(--interactive-primary-text)",
              }}
            >
              Customize the appearance in real-time
            </p>
          </div>
        </div>
      </Card.Header>

      <Card.Body
        style={{
          background: "var(--surface-base)",
          color: "var(--text-primary)",
        }}
      >
        <div style={{ display: "grid", gap: "var(--spacing-6)" }}>
          {/* Theme Toggle */}
          {showThemeToggle && (
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "var(--spacing-3)",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "var(--text-lg)",
                      fontWeight: "var(--font-weight-bold)",
                      color: "var(--text-primary)",
                      marginBottom: "var(--spacing-1)",
                    }}
                  >
                    Color Mode
                  </label>
                  <p
                    style={{
                      fontSize: "var(--text-sm)",
                      color: "var(--text-secondary)",
                      margin: 0,
                    }}
                  >
                    Switch between light and dark themes
                  </p>
                </div>
                <Badge
                  variant={theme === "light" ? "warning" : "primary"}
                  size="lg"
                >
                  {theme === "light" ? "☀️ Light" : "🌙 Dark"}
                </Badge>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--spacing-3)",
                  padding: "var(--spacing-4)",
                  background: "var(--surface-subtle)",
                  borderRadius: "var(--radius-control)",
                  border: "2px solid var(--border-subtle)",
                }}
              >
                <span style={{ fontSize: "32px" }}>☀️</span>
                <Switch
                  checked={theme === "dark"}
                  onChange={(e) =>
                    handleThemeChange(e.target.checked ? "dark" : "light")
                  }
                  size="lg"
                />
                <span style={{ fontSize: "32px" }}>🌙</span>
                <div
                  style={{
                    marginLeft: "auto",
                    display: "flex",
                    gap: "var(--spacing-2)",
                  }}
                >
                  <Button
                    variant={theme === "light" ? "primary" : "ghost"}
                    size="sm"
                    onClick={() => handleThemeChange("light")}
                  >
                    Light
                  </Button>
                  <Button
                    variant={theme === "dark" ? "primary" : "ghost"}
                    size="sm"
                    onClick={() => handleThemeChange("dark")}
                  >
                    Dark
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Brand Selection */}
          {showBrandSelector && (
            <div>
              <div style={{ marginBottom: "var(--spacing-3)" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "var(--text-lg)",
                    fontWeight: "var(--font-weight-bold)",
                    color: "var(--text-primary)",
                    marginBottom: "var(--spacing-1)",
                  }}
                >
                  Brand Identity
                </label>
                <p
                  style={{
                    fontSize: "var(--text-sm)",
                    color: "var(--text-secondary)",
                    margin: 0,
                  }}
                >
                  Select a brand to see different accent colors and styling
                </p>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "var(--spacing-3)",
                }}
              >
                {(Object.keys(BRAND_CONFIG) as Brand[]).map((b) => (
                  <div
                    key={b}
                    onClick={() => handleBrandChange(b)}
                    style={{
                      padding: "var(--spacing-4)",
                      background:
                        brand === b
                          ? "var(--interactive-primary)"
                          : "var(--surface-subtle)",
                      color: brand === b ? "white" : "var(--text-primary)",
                      borderRadius: "var(--radius-control)",
                      border: `2px solid ${
                        brand === b
                          ? "var(--interactive-primary)"
                          : "var(--border-subtle)"
                      }`,
                      cursor: "pointer",
                      transition: "all 150ms ease",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "var(--spacing-2)",
                      }}
                    >
                      <Radio
                        name="brand"
                        value={b}
                        checked={brand === b}
                        onChange={() => handleBrandChange(b)}
                        label={b.charAt(0).toUpperCase() + b.slice(1)}
                        size="lg"
                      />
                      {brand === b && <Badge variant="success">Active</Badge>}
                    </div>
                    <p
                      style={{
                        fontSize: "var(--text-sm)",
                        margin: 0,
                        opacity: 0.8,
                      }}
                    >
                      {BRAND_CONFIG[b].description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Current Settings Summary */}
          {showSummary && (
            <Alert variant="info" title="Current Settings">
              <div
                style={{
                  display: "flex",
                  gap: "var(--spacing-2)",
                  flexWrap: "wrap",
                }}
              >
                <Badge variant="primary">Theme: {theme}</Badge>
                <Badge variant="secondary">Brand: {brand}</Badge>
                <Badge variant="secondary">
                  Accent: {BRAND_CONFIG[brand].accent}
                </Badge>
                <Badge variant="secondary">
                  Radius:{" "}
                  {BRAND_CONFIG[brand].radius === "9999px"
                    ? "9999px (pills)"
                    : BRAND_CONFIG[brand].radius}
                </Badge>
              </div>
            </Alert>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

ThemeController.displayName = "ThemeController";
