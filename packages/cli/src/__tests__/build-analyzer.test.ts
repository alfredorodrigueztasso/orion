/**
 * Tests for build-analyzer.ts
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import * as fs from "node:fs";
import * as path from "node:path";
import * as os from "node:os";
import {
  analyzeComponents,
  loadComponentCSS,
  extractTokenDefinitions,
  countUsedTokens,
} from "../lib/build-analyzer.js";

describe("build-analyzer", () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "orion-test-"));
  });

  afterEach(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  describe("analyzeComponents", () => {
    it("should find and analyze .module.css files", () => {
      // Create test components
      const buttonDir = path.join(tempDir, "button");
      fs.mkdirSync(buttonDir);
      fs.writeFileSync(
        path.join(buttonDir, "Button.module.css"),
        `.button { color: var(--text-primary); background: var(--interactive-primary); }`,
        "utf-8",
      );

      const cardDir = path.join(tempDir, "card");
      fs.mkdirSync(cardDir);
      fs.writeFileSync(
        path.join(cardDir, "Card.module.css"),
        `.card { background: var(--surface-base); }`,
        "utf-8",
      );

      const { usageMap, components, totalTokens } = analyzeComponents(tempDir);

      expect(components).toHaveLength(2);
      expect(Object.keys(usageMap)).toContain("button");
      expect(Object.keys(usageMap)).toContain("card");
      expect(totalTokens.size).toBe(3);
    });

    it("should extract token references correctly", () => {
      const componentDir = path.join(tempDir, "button");
      fs.mkdirSync(componentDir);
      fs.writeFileSync(
        path.join(componentDir, "Button.module.css"),
        `
        :root {
          --text-primary: #000;
        }
        .button {
          color: var(--text-primary);
          padding: var(--spacing-4);
        }
      `,
        "utf-8",
      );

      const { usageMap } = analyzeComponents(tempDir);

      expect(usageMap["button"]).toContain("--text-primary");
      expect(usageMap["button"]).toContain("--spacing-4");
    });

    it("should handle nested component directories", () => {
      const nestedDir = path.join(tempDir, "nested", "deep", "button");
      fs.mkdirSync(nestedDir, { recursive: true });
      fs.writeFileSync(
        path.join(nestedDir, "Button.module.css"),
        `.button { color: var(--text-primary); }`,
        "utf-8",
      );

      const { components } = analyzeComponents(tempDir);

      expect(components.length).toBeGreaterThan(0);
      expect(components[0]!.name).toBe("button");
    });

    it("should return empty results for empty directories", () => {
      const { usageMap, components, totalTokens } = analyzeComponents(tempDir);

      expect(components).toEqual([]);
      expect(Object.keys(usageMap)).toEqual([]);
      expect(totalTokens.size).toBe(0);
    });

    it("should ignore non-.module.css files", () => {
      const componentDir = path.join(tempDir, "button");
      fs.mkdirSync(componentDir);
      fs.writeFileSync(
        path.join(componentDir, "Button.css"),
        ".button {}",
        "utf-8",
      );
      fs.writeFileSync(
        path.join(componentDir, "Button.module.css"),
        ".button { color: var(--text-primary); }",
        "utf-8",
      );

      const { components } = analyzeComponents(tempDir);

      expect(components).toHaveLength(1);
    });

    it("should handle duplicate token references", () => {
      const componentDir = path.join(tempDir, "button");
      fs.mkdirSync(componentDir);
      fs.writeFileSync(
        path.join(componentDir, "Button.module.css"),
        `
        .button { color: var(--text-primary); }
        .button:hover { color: var(--text-primary); }
      `,
        "utf-8",
      );

      const { usageMap } = analyzeComponents(tempDir);

      // Tokens should be deduplicated
      expect(usageMap["button"]).toHaveLength(1);
      expect(usageMap["button"]).toContain("--text-primary");
    });
  });

  describe("loadComponentCSS", () => {
    it("should merge all component CSS", () => {
      const button = path.join(tempDir, "button");
      fs.mkdirSync(button);
      fs.writeFileSync(
        path.join(button, "Button.module.css"),
        ".button {}",
        "utf-8",
      );

      const card = path.join(tempDir, "card");
      fs.mkdirSync(card);
      fs.writeFileSync(path.join(card, "Card.module.css"), ".card {}", "utf-8");

      const css = loadComponentCSS(tempDir);

      expect(css).toContain(".button");
      expect(css).toContain(".card");
    });

    it("should return empty string for empty directory", () => {
      const css = loadComponentCSS(tempDir);
      expect(css).toBe("");
    });
  });

  describe("extractTokenDefinitions", () => {
    it("should extract all :root variable definitions", () => {
      const css = `
        :root {
          --text-primary: #000000;
          --spacing-4: 16px;
          --radius-control: 12px;
        }
      `;

      const defs = extractTokenDefinitions(css);

      expect(defs.size).toBe(3);
      expect(defs.get("text-primary")).toBe("#000000");
      expect(defs.get("spacing-4")).toBe("16px");
      expect(defs.get("radius-control")).toBe("12px");
    });

    it("should handle CSS with multiple :root blocks", () => {
      const css = `
        :root {
          --text-primary: #000;
        }
        [data-theme="dark"] {
          --text-primary: #fff;
        }
        :root {
          --spacing-4: 16px;
        }
      `;

      const defs = extractTokenDefinitions(css);

      expect(defs.size).toBe(2);
      expect(defs.has("text-primary")).toBe(true);
      expect(defs.has("spacing-4")).toBe(true);
    });

    it("should handle variable values with spaces", () => {
      const css = `
        :root {
          --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
      `;

      const defs = extractTokenDefinitions(css);

      expect(defs.get("shadow")).toBe("0 4px 6px rgba(0, 0, 0, 0.1)");
    });
  });

  describe("countUsedTokens", () => {
    it("should count unique used tokens", () => {
      const usageMap = {
        button: ["--text-primary", "--spacing-4"],
        card: ["--text-primary", "--surface-base"],
      };

      const count = countUsedTokens(usageMap);

      expect(count).toBe(3); // text-primary (counted once), spacing-4, surface-base
    });

    it("should return 0 for empty usage map", () => {
      const count = countUsedTokens({});
      expect(count).toBe(0);
    });
  });
});
