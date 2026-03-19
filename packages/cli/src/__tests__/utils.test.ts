/**
 * Tests for CLI utilities
 */

import { describe, it, expect } from "vitest";
import {
  fuzzyMatch,
  filterByCategory,
  filterByTag,
  filterByType,
  getPreviewUrl,
} from "../lib/utils.js";
import type { RegistryIndexItem } from "../types.js";

describe("fuzzyMatch", () => {
  const candidates = ["button", "banner", "badge", "card", "checkbox"];

  it("returns exact matches", () => {
    const result = fuzzyMatch("button", candidates);
    expect(result).toContain("button");
  });

  it("returns top-3 fuzzy matches with distance <= 2", () => {
    const result = fuzzyMatch("botton", candidates);
    expect(result).toHaveLength(1);
    expect(result[0]).toBe("button");
  });

  it("returns multiple matches ordered by distance", () => {
    const result = fuzzyMatch("ba", candidates);
    // Should match "banner", "badge", "button" (all distance 1-2 from first 2 chars)
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(3);
  });

  it("returns empty array for no matches", () => {
    const result = fuzzyMatch("xyz123", candidates);
    expect(result).toEqual([]);
  });

  it("is case-insensitive", () => {
    const result = fuzzyMatch("BUTTON", candidates);
    expect(result).toContain("button");
  });

  it("limits results to top-3", () => {
    const manyItems = Array.from({ length: 50 }, (_, i) => `item${i}`);
    const result = fuzzyMatch("item", manyItems);
    expect(result.length).toBeLessThanOrEqual(3);
  });
});

describe("filterByCategory", () => {
  const items: RegistryIndexItem[] = [
    {
      name: "button",
      type: "registry:component",
      title: "Button",
      description: "Button component",
      category: "forms",
      registryUrl: "http://example.com",
    },
    {
      name: "card",
      type: "registry:component",
      title: "Card",
      description: "Card component",
      category: "layout",
      registryUrl: "http://example.com",
    },
    {
      name: "checkbox",
      type: "registry:component",
      title: "Checkbox",
      description: "Checkbox component",
      category: "forms",
      registryUrl: "http://example.com",
    },
  ];

  it("filters items by category", () => {
    const result = filterByCategory(items, "forms");
    expect(result).toHaveLength(2);
    expect(result.map((r) => r.name)).toEqual(["button", "checkbox"]);
  });

  it("is case-insensitive", () => {
    const result = filterByCategory(items, "FORMS");
    expect(result).toHaveLength(2);
  });

  it("returns empty array for non-matching category", () => {
    const result = filterByCategory(items, "nonexistent");
    expect(result).toEqual([]);
  });
});

describe("filterByTag", () => {
  const items: RegistryIndexItem[] = [
    {
      name: "button",
      type: "registry:component",
      title: "Button",
      description: "Button component",
      category: "forms",
      registryUrl: "http://example.com",
      tags: ["input", "interactive"],
    },
    {
      name: "banner",
      type: "registry:component",
      title: "Banner",
      description: "Banner component",
      category: "layout",
      registryUrl: "http://example.com",
      tags: ["marketing"],
    },
    {
      name: "hero",
      type: "registry:section",
      title: "Hero",
      description: "Hero section",
      category: "sections",
      registryUrl: "http://example.com",
      tags: ["marketing", "landing"],
    },
  ];

  it("filters items by tag", () => {
    const result = filterByTag(items, "marketing");
    expect(result).toHaveLength(2);
    expect(result.map((r) => r.name)).toEqual(["banner", "hero"]);
  });

  it("is case-insensitive", () => {
    const result = filterByTag(items, "MARKETING");
    expect(result).toHaveLength(2);
  });

  it("returns empty array for non-matching tag", () => {
    const result = filterByTag(items, "nonexistent");
    expect(result).toEqual([]);
  });

  it("handles items without tags", () => {
    const itemsWithoutTags: RegistryIndexItem[] = [
      {
        name: "card",
        type: "registry:component",
        title: "Card",
        description: "Card component",
        category: "layout",
        registryUrl: "http://example.com",
      },
    ];
    const result = filterByTag(itemsWithoutTags, "marketing");
    expect(result).toEqual([]);
  });
});

describe("filterByType", () => {
  const items: RegistryIndexItem[] = [
    {
      name: "button",
      type: "registry:component",
      title: "Button",
      description: "Button component",
      category: "forms",
      registryUrl: "http://example.com",
    },
    {
      name: "hero",
      type: "registry:section",
      title: "Hero",
      description: "Hero section",
      category: "sections",
      registryUrl: "http://example.com",
    },
    {
      name: "landing",
      type: "registry:template",
      title: "Landing",
      description: "Landing template",
      category: "templates",
      registryUrl: "http://example.com",
    },
  ];

  it("filters items by type component", () => {
    const result = filterByType(items, "component");
    expect(result).toHaveLength(1);
    expect(result[0]!.name).toBe("button");
  });

  it("filters items by type section", () => {
    const result = filterByType(items, "section");
    expect(result).toHaveLength(1);
    expect(result[0]!.name).toBe("hero");
  });

  it("filters items by type template", () => {
    const result = filterByType(items, "template");
    expect(result).toHaveLength(1);
    expect(result[0]!.name).toBe("landing");
  });
});

describe("getPreviewUrl", () => {
  it("returns provided preview URL if available", () => {
    const item: RegistryIndexItem = {
      name: "button",
      type: "registry:component",
      title: "Button",
      description: "Button component",
      category: "forms",
      registryUrl: "http://example.com",
      preview: {
        url: "https://example.com/components/button",
      },
    };
    const result = getPreviewUrl(item);
    expect(result).toBe("https://example.com/components/button");
  });

  it("infers preview URL from name if not provided", () => {
    const item: RegistryIndexItem = {
      name: "button",
      type: "registry:component",
      title: "Button",
      description: "Button component",
      category: "forms",
      registryUrl: "http://example.com",
    };
    const result = getPreviewUrl(item);
    expect(result).toBe("https://orion-ds.dev/library.html#button");
  });

  it("uses inferred URL for sections", () => {
    const item: RegistryIndexItem = {
      name: "hero",
      type: "registry:section",
      title: "Hero",
      description: "Hero section",
      category: "sections",
      registryUrl: "http://example.com",
    };
    const result = getPreviewUrl(item);
    expect(result).toBe("https://orion-ds.dev/library.html#hero");
  });
});
