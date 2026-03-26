/**
 * Reusable Storybook decorators for common testing scenarios
 * Use in stories: decorators: [allBrandsDecorator]
 */

import React from "react";

const BRANDS = [
  "orion",
  "red",
  "deepblue",
  "orange",
  "ember",
  "lemon",
] as const;

const MODES = [
  { value: "display", label: "Display Mode (Marketing)" },
  { value: "product", label: "Product Mode (SaaS)" },
  { value: "app", label: "App Mode (Mobile)" },
] as const;

/**
 * Renders story in all 6 brands simultaneously
 * Shows how component adapts to each brand color/radius
 *
 * Usage: export const AllBrands: Story = {
 *   decorators: [allBrandsDecorator],
 *   ...
 * }
 */
export const allBrandsDecorator = (Story: any) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "var(--spacing-6)",
      padding: "var(--spacing-8)",
    }}
  >
    {BRANDS.map((brand) => (
      <div
        key={brand}
        data-brand={brand}
        style={{
          padding: "var(--spacing-6)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "var(--radius-container)",
          background: "var(--surface-base)",
        }}
      >
        <p
          style={{
            fontSize: "var(--font-size-sm)",
            color: "var(--text-secondary)",
            marginTop: 0,
            marginBottom: "var(--spacing-4)",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          {brand}
        </p>
        <Story />
      </div>
    ))}
  </div>
);

/**
 * Renders story on dark background
 * Tests readability and contrast in dark mode
 *
 * Usage: export const DarkMode: Story = {
 *   decorators: [darkModeDecorator],
 *   ...
 * }
 */
export const darkModeDecorator = (Story: any) => (
  <div
    data-theme="dark"
    style={{
      padding: "var(--spacing-8)",
      background: "var(--surface-base)",
      minHeight: "300px",
      borderRadius: "var(--radius-container)",
    }}
  >
    <p
      style={{
        fontSize: "var(--font-size-sm)",
        color: "var(--text-secondary)",
        marginTop: 0,
        marginBottom: "var(--spacing-4)",
      }}
    >
      Dark Mode (data-theme="dark")
    </p>
    <Story />
  </div>
);

/**
 * Renders story in all 3 tri-modal contexts
 * Shows how component adapts to display, product, and app modes
 *
 * Usage: export const TriModal: Story = {
 *   decorators: [triModalDecorator],
 *   ...
 * }
 */
export const triModalDecorator = (Story: any) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "var(--spacing-6)",
      padding: "var(--spacing-8)",
    }}
  >
    {MODES.map(({ value, label }) => (
      <div
        key={value}
        data-mode={value}
        style={{
          padding: "var(--spacing-6)",
          border: "1px solid var(--border-subtle)",
          borderRadius: "var(--radius-container)",
          background: "var(--surface-base)",
        }}
      >
        <p
          style={{
            fontSize: "var(--font-size-sm)",
            color: "var(--text-secondary)",
            marginTop: 0,
            marginBottom: "var(--spacing-4)",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          {label}
        </p>
        <Story />
      </div>
    ))}
  </div>
);

/**
 * Combines allBrands + triModal
 * Shows how component behaves across all brands AND all modes
 * Warning: 6 brands × 3 modes = 18 variations, takes up a lot of space
 *
 * Usage: export const AllBrandsAllModes: Story = {
 *   decorators: [brandAndModeDecorator],
 *   ...
 * }
 */
export const brandAndModeDecorator = (Story: any) => (
  <div style={{ padding: "var(--spacing-8)" }}>
    {MODES.map(({ value: mode, label: modeLabel }) => (
      <div key={mode} style={{ marginBottom: "var(--spacing-12)" }}>
        <h3
          style={{
            fontSize: "var(--font-size-lg)",
            fontWeight: 600,
            marginTop: "var(--spacing-8)",
            marginBottom: "var(--spacing-6)",
            color: "var(--text-primary)",
          }}
        >
          {modeLabel}
        </h3>
        <div
          data-mode={mode}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "var(--spacing-6)",
          }}
        >
          {BRANDS.map((brand) => (
            <div
              key={`${brand}-${mode}`}
              data-brand={brand}
              style={{
                padding: "var(--spacing-6)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-container)",
                background: "var(--surface-base)",
              }}
            >
              <p
                style={{
                  fontSize: "var(--font-size-xs)",
                  color: "var(--text-tertiary)",
                  marginTop: 0,
                  marginBottom: "var(--spacing-4)",
                  textTransform: "uppercase",
                }}
              >
                {brand}
              </p>
              <Story />
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);
