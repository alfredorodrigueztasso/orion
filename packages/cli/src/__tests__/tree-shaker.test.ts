/**
 * Tests for tree-shaker.ts
 */

import { describe, it, expect } from "vitest";
import {
  treeShakeTokens,
  calculateSavings,
  getUnusedTokens,
  extractUsedTokensOnly,
} from "../lib/tree-shaker.js";

describe("tree-shaker", () => {
  describe("treeShakeTokens", () => {
    it("should remove unused tokens from :root", () => {
      const css = `
        :root {
          --text-primary: #000;
          --text-secondary: #666;
          --spacing-4: 16px;
        }
        .button { color: var(--text-primary); }
      `;

      const usageMap = {
        button: ["--text-primary"],
      };

      const result = treeShakeTokens(css, usageMap);

      expect(result).toContain("--text-primary");
      expect(result).not.toContain("--text-secondary");
      expect(result).not.toContain("--spacing-4");
    });

    it("should preserve component CSS", () => {
      const css = `
        .button { color: var(--text-primary); }
        .card { background: var(--surface-base); }
      `;

      const usageMap = {
        button: ["--text-primary"],
        card: ["--surface-base"],
      };

      const result = treeShakeTokens(css, usageMap);

      expect(result).toContain(".button");
      expect(result).toContain(".card");
    });

    it("should handle multiple :root blocks", () => {
      const css = `
        :root {
          --text-primary: #000;
          --unused: red;
        }
        :root[data-theme="dark"] {
          --text-primary: #fff;
          --unused: blue;
        }
        .button { color: var(--text-primary); }
      `;

      const usageMap = {
        button: ["--text-primary"],
      };

      const result = treeShakeTokens(css, usageMap);

      // Both --text-primary should be kept
      const textPrimaryCount = (result.match(/--text-primary/g) || []).length;
      expect(textPrimaryCount).toBe(2);

      // Both --unused should be removed
      expect(result).not.toContain("--unused");
    });

    it("should preserve comments outside :root", () => {
      const css = `
        /* Component styles */
        .button { color: var(--text-primary); }
      `;

      const usageMap = {
        button: ["--text-primary"],
      };

      const result = treeShakeTokens(css, usageMap);

      expect(result).toContain("/* Component styles */");
    });

    it("should clean up excess whitespace", () => {
      const css = `
        :root {
          --text-primary: #000;


          --unused: red;
        }
      `;

      const usageMap = {
        button: ["--text-primary"],
      };

      const result = treeShakeTokens(css, usageMap);

      // Should not have excessive blank lines
      expect(result).not.toContain("\n\n\n");
    });
  });

  describe("calculateSavings", () => {
    it("should calculate bytes saved", () => {
      const original = "a".repeat(1000);
      const shaken = "a".repeat(500);

      const { bytes, percentage } = calculateSavings(original, shaken);

      expect(bytes).toBe(500);
      expect(percentage).toBe(50);
    });

    it("should return 0 for equal strings", () => {
      const css = "same";
      const { bytes, percentage } = calculateSavings(css, css);

      expect(bytes).toBe(0);
      expect(percentage).toBe(0);
    });

    it("should handle empty strings", () => {
      const { bytes, percentage } = calculateSavings("", "");
      expect(bytes).toBe(0);
      expect(percentage).toBe(0);
    });
  });

  describe("getUnusedTokens", () => {
    it("should identify unused tokens", () => {
      const css = `
        :root {
          --text-primary: #000;
          --text-secondary: #666;
          --spacing-4: 16px;
        }
      `;

      const usageMap = {
        button: ["--text-primary"],
      };

      const unused = getUnusedTokens(css, usageMap);

      expect(unused).toContain("--text-secondary");
      expect(unused).toContain("--spacing-4");
      expect(unused).not.toContain("--text-primary");
    });

    it("should return empty array when all tokens are used", () => {
      const css = `
        :root {
          --text-primary: #000;
          --text-secondary: #666;
        }
      `;

      const usageMap = {
        button: ["--text-primary", "--text-secondary"],
      };

      const unused = getUnusedTokens(css, usageMap);

      expect(unused).toEqual([]);
    });

    it("should sort unused tokens alphabetically", () => {
      const css = `
        :root {
          --zebra: #000;
          --apple: #fff;
          --monkey: #888;
        }
      `;

      const usageMap = {};

      const unused = getUnusedTokens(css, usageMap);

      expect(unused[0]).toBe("--apple");
      expect(unused[1]).toBe("--monkey");
      expect(unused[2]).toBe("--zebra");
    });
  });

  describe("extractUsedTokensOnly", () => {
    it("should extract only used tokens into :root block", () => {
      const css = `
        :root {
          --text-primary: #000;
          --text-secondary: #666;
          --spacing-4: 16px;
        }
        .button { color: var(--text-primary); padding: var(--spacing-4); }
      `;

      const usageMap = {
        button: ["--text-primary", "--spacing-4"],
      };

      const result = extractUsedTokensOnly(css, usageMap);

      expect(result).toContain(":root");
      expect(result).toContain("--text-primary");
      expect(result).toContain("--spacing-4");
      expect(result).not.toContain("--text-secondary");
    });

    it("should return properly formatted CSS", () => {
      const css = `
        :root {
          --text-primary: #000;
        }
      `;

      const usageMap = {
        button: ["--text-primary"],
      };

      const result = extractUsedTokensOnly(css, usageMap);

      expect(result.startsWith(":root")).toBe(true);
      expect(result.endsWith("}\n")).toBe(true);
    });

    it("should preserve variable values with spaces", () => {
      const css = `
        :root {
          --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
      `;

      const usageMap = {
        button: ["--shadow"],
      };

      const result = extractUsedTokensOnly(css, usageMap);

      expect(result).toContain("0 4px 6px rgba(0, 0, 0, 0.1)");
    });
  });
});
