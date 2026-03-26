import { describe, it, expect } from "vitest";
import { orionPreset } from "./index";

describe("orionPreset", () => {
  it("exports a valid config object", () => {
    expect(orionPreset).toBeDefined();
    expect(orionPreset.theme?.extend).toBeDefined();
  });

  it("all color values are CSS variable references (no hardcoded hex)", () => {
    const colors = orionPreset.theme?.extend?.colors as Record<string, string>;
    expect(colors).toBeDefined();

    Object.entries(colors).forEach(([key, value]) => {
      expect(value).toMatch(/^var\(--[\w-]+\)$/);
      expect(value).not.toMatch(/#[0-9a-fA-F]{3,6}/);
      expect(value).not.toMatch(/rgb\(/);
    });
  });

  it("contains expected token keys (surfaces, text, interactive)", () => {
    const colors = orionPreset.theme?.extend?.colors as Record<string, string>;

    // Surfaces
    expect(colors["surface-base"]).toBe("var(--surface-base)");
    expect(colors["surface-subtle"]).toBe("var(--surface-subtle)");

    // Text
    expect(colors["text-primary"]).toBe("var(--text-primary)");
    expect(colors["text-secondary"]).toBe("var(--text-secondary)");

    // Interactive
    expect(colors["interactive-primary"]).toBe("var(--interactive-primary)");
    expect(colors["interactive-secondary"]).toBe(
      "var(--interactive-secondary)",
    );
  });

  it("spacing has exactly 19 orion-* keys", () => {
    const spacing = orionPreset.theme?.extend?.spacing as Record<
      string,
      string
    >;
    expect(spacing).toBeDefined();

    const orionKeys = Object.keys(spacing).filter((k) =>
      k.startsWith("orion-"),
    );
    expect(orionKeys).toHaveLength(19);

    // Verify all spacing values use var() format
    Object.values(spacing).forEach((value) => {
      expect(value).toMatch(/^var\(--spacing-[\w-]+\)$/);
    });
  });

  it("borderRadius has all required keys (button, container, sm, md, lg, xl)", () => {
    const radius = orionPreset.theme?.extend?.borderRadius as Record<
      string,
      string
    >;
    expect(radius).toBeDefined();

    expect(radius["button"]).toBe("var(--radius-button)");
    expect(radius["container"]).toBe("var(--radius-container)");
    expect(radius["sm"]).toBe("var(--radius-sm)");
    expect(radius["md"]).toBe("var(--radius-md)");
    expect(radius["lg"]).toBe("var(--radius-lg)");
    expect(radius["xl"]).toBe("var(--radius-xl)");
  });

  it("fontFamily has primary, secondary, and mono", () => {
    const fonts = orionPreset.theme?.extend?.fontFamily as Record<
      string,
      string[]
    >;
    expect(fonts).toBeDefined();

    expect(fonts["primary"]).toEqual(["var(--font-primary)"]);
    expect(fonts["secondary"]).toEqual(["var(--font-secondary)"]);
    expect(fonts["mono"]).toEqual(["var(--font-mono)"]);
  });

  it("backdropBlur has all 4 orion-* keys (sm, md, lg, xl)", () => {
    const blur = orionPreset.theme?.extend?.backdropBlur as Record<
      string,
      string
    >;
    expect(blur).toBeDefined();

    expect(blur["orion-sm"]).toBe("var(--blur-sm)");
    expect(blur["orion-md"]).toBe("var(--blur-md)");
    expect(blur["orion-lg"]).toBe("var(--blur-lg)");
    expect(blur["orion-xl"]).toBe("var(--blur-xl)");
  });

  it("alert colors include all 12 variants (success/error/warning/info × bg/text/border)", () => {
    const colors = orionPreset.theme?.extend?.colors as Record<string, string>;

    const statuses = ["success", "error", "warning", "info"];
    const props = ["bg", "text", "border"];

    statuses.forEach((status) => {
      props.forEach((prop) => {
        const key = `alert-${status}-${prop}`;
        expect(colors[key]).toBeDefined();
        expect(colors[key]).toMatch(/^var\(--alert-[\w-]+\)$/);
      });
    });
  });
});
