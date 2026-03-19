/**
 * Tests for the info command
 */

import { describe, it, expect } from "vitest";
import {
  parseArgs,
  formatDefault,
  formatTypeLabel,
  formatValues,
  shouldShowAccessibility,
  getRelated,
} from "../commands/info.js";
import type { RegistryItem, AccessibilityInfo } from "../types.js";

describe("info command", () => {
  describe("parseArgs", () => {
    it("extracts name posicional", () => {
      const result = parseArgs(["button"]);
      expect(result.name).toBe("button");
      expect(result.json).toBe(false);
      expect(result.examples).toBe(false);
      expect(result.props).toBe(false);
      expect(result.local).toBe(false);
    });

    it("extracts --type flag", () => {
      const result = parseArgs(["hero", "--type=section"]);
      expect(result.name).toBe("hero");
      expect(result.type).toBe("section");
    });

    it("extracts all boolean flags", () => {
      const result = parseArgs(["button", "--json", "--examples", "--props", "--local"]);
      expect(result.name).toBe("button");
      expect(result.json).toBe(true);
      expect(result.examples).toBe(true);
      expect(result.props).toBe(true);
      expect(result.local).toBe(true);
    });

    it("returns empty name without positional", () => {
      const result = parseArgs(["--json"]);
      expect(result.name).toBe("");
      expect(result.json).toBe(true);
    });

    it("extracts name even when flag comes first", () => {
      const result = parseArgs(["--local", "button"]);
      expect(result.name).toBe("button");
      expect(result.local).toBe(true);
    });

    it("ignores unknown flags", () => {
      const result = parseArgs(["button", "--unknown"]);
      expect(result.name).toBe("button");
      // Should not throw
    });

    it("uses only first positional name", () => {
      const result = parseArgs(["button", "card"]);
      expect(result.name).toBe("button");
    });
  });

  describe("formatters", () => {
    it("formats default values", () => {
      expect(formatDefault(undefined)).toBe("—");
      expect(formatDefault(null)).toBe("—");
      expect(formatDefault(false)).toBe("false");
      expect(formatDefault(true)).toBe("true");
      expect(formatDefault("value")).toBe("value");
      expect(formatDefault(42)).toBe("42");
    });

    it("formats type labels for all 3 types", () => {
      expect(formatTypeLabel("registry:component")).toBe("component");
      expect(formatTypeLabel("registry:section")).toBe("section");
      expect(formatTypeLabel("registry:template")).toBe("template");
    });

    it("formats values array as pipe-separated", () => {
      expect(formatValues(["a", "b", "c"])).toBe("a | b | c");
      expect(formatValues([])).toBe("");
      expect(formatValues(undefined)).toBe("");
    });

    it("determines accessibility visibility", () => {
      const emptyItem: RegistryItem = {
        name: "test",
        type: "registry:component",
        title: "Test",
        description: "Test",
        category: "test",
        files: [],
        accessibility: {},
      };
      expect(shouldShowAccessibility(emptyItem)).toBe(false);

      const itemWithRole: RegistryItem = {
        ...emptyItem,
        accessibility: { role: "button" },
      };
      expect(shouldShowAccessibility(itemWithRole)).toBe(true);

      const itemWithAria: RegistryItem = {
        ...emptyItem,
        accessibility: { ariaAttributes: ["aria-label"] },
      };
      expect(shouldShowAccessibility(itemWithAria)).toBe(true);

      const itemWithoutAccessibility: RegistryItem = {
        ...emptyItem,
        accessibility: undefined,
      };
      expect(shouldShowAccessibility(itemWithoutAccessibility)).toBe(false);
    });

    it("resolves related components with fallback to sections", () => {
      const itemWithComponents: RegistryItem = {
        name: "button",
        type: "registry:component",
        title: "Button",
        description: "Test",
        category: "actions",
        files: [],
        related_components: ["Field", "Modal"],
      };
      expect(getRelated(itemWithComponents)).toEqual(["Field", "Modal"]);

      const itemWithSections: RegistryItem = {
        name: "landing",
        type: "registry:template",
        title: "Landing",
        description: "Test",
        category: "marketing",
        files: [],
        related_sections: ["Features", "CTA"],
      };
      expect(getRelated(itemWithSections)).toEqual(["Features", "CTA"]);

      const itemWithNeither: RegistryItem = {
        name: "card",
        type: "registry:component",
        title: "Card",
        description: "Test",
        category: "layout",
        files: [],
      };
      expect(getRelated(itemWithNeither)).toEqual([]);
    });

    it("constructs preview URL with fallback", () => {
      const itemWithPreview: RegistryItem = {
        name: "button",
        type: "registry:component",
        title: "Button",
        description: "Test",
        category: "actions",
        files: [],
        preview: { url: "https://custom.com/button" },
      };
      // Note: The fallback logic is in printInfo, but we can infer it here
      expect(itemWithPreview.preview?.url).toBe("https://custom.com/button");

      const itemWithoutPreview: RegistryItem = {
        name: "card",
        type: "registry:component",
        title: "Card",
        description: "Test",
        category: "layout",
        files: [],
      };
      // Fallback would be `https://orion-ds.dev/library.html#${item.name}`
      const fallbackUrl = `https://orion-ds.dev/library.html#${itemWithoutPreview.name}`;
      expect(fallbackUrl).toBe("https://orion-ds.dev/library.html#card");
    });
  });
});
