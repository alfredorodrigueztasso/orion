/**
 * Tests for minifier.ts
 */

import { describe, it, expect } from "vitest";
import {
  minifyCSS,
  calculateCompressionRatio,
  formatBytes,
} from "../lib/minifier.js";

describe("minifier", () => {
  describe("minifyCSS", () => {
    it("should remove comments", () => {
      const css = `
        /* This is a comment */
        .button { color: black; }
      `;

      const result = minifyCSS(css);

      expect(result).not.toContain("/*");
      expect(result).not.toContain("*/");
      expect(result).toContain(".button");
    });

    it("should remove unnecessary whitespace", () => {
      const css = `
        .button {
          color: black;
          padding: 10px;
        }
      `;

      const result = minifyCSS(css);

      expect(result).not.toContain("\n");
      expect(result).not.toContain("  ");
      expect(result).toBe(".button{color:black;padding:10px}");
    });

    it("should compact rgba functions", () => {
      const css = "color: rgba( 0 , 0 , 0 , 0.1 );";
      const result = minifyCSS(css);

      expect(result).toContain("rgba(0,0,0,.1)");
    });

    it("should remove leading zeros from decimals", () => {
      const css = "opacity: 0.5;";
      const result = minifyCSS(css);

      expect(result).toContain(".5");
      expect(result).not.toContain("0.5");
    });

    it("should remove trailing semicolons before closing braces", () => {
      const css = ".button { color: black; }";
      const result = minifyCSS(css);

      expect(result).toBe(".button{color:black}");
    });

    it("should handle multiple selectors", () => {
      const css = `
        .button, .link {
          color: blue;
        }
      `;

      const result = minifyCSS(css);

      expect(result).toContain(".button");
      expect(result).toContain(".link");
      expect(result).toContain("color:blue");
    });

    it("should preserve media queries (compact)", () => {
      const css = `
        @media (max-width: 600px) {
          .button { padding: 5px; }
        }
      `;

      const result = minifyCSS(css);

      expect(result).toContain("@media");
      expect(result).toContain(".button");
      expect(result).not.toContain("\n");
    });

    it("should handle CSS variables", () => {
      const css = `
        :root {
          --text-primary: #000000;
        }
        .button { color: var(--text-primary); }
      `;

      const result = minifyCSS(css);

      expect(result).toContain("--text-primary");
      expect(result).toContain("#000000");
      expect(result).toContain("var(--text-primary)");
    });

    it("should handle hsla functions", () => {
      const css = "color: hsla( 0 , 100% , 50% , 0.5 );";
      const result = minifyCSS(css);

      expect(result).toContain("hsla(0,100%,50%,.5)");
    });

    it("should remove spaces around CSS operators", () => {
      const css = `.button , .link : hover { color : blue ; }`;
      const result = minifyCSS(css);

      expect(result).toBe(".button,.link:hover{color:blue}");
    });
  });

  describe("calculateCompressionRatio", () => {
    it("should calculate compression percentage", () => {
      const original = "a".repeat(1000);
      const minified = "a".repeat(500);

      const { percentage, bytes } = calculateCompressionRatio(
        original,
        minified,
      );

      expect(percentage).toBe(50);
      expect(bytes).toBe(500);
    });

    it("should return 0% for no compression", () => {
      const css = "same";
      const { percentage, bytes } = calculateCompressionRatio(css, css);

      expect(percentage).toBe(0);
      expect(bytes).toBe(0);
    });

    it("should handle empty strings", () => {
      const { percentage, bytes } = calculateCompressionRatio("", "");

      expect(percentage).toBe(0);
      expect(bytes).toBe(0);
    });

    it("should not return negative values", () => {
      const original = "short";
      const minified = "much longer string";

      const { percentage, bytes } = calculateCompressionRatio(
        original,
        minified,
      );

      expect(percentage).toBeGreaterThanOrEqual(0);
      expect(bytes).toBeGreaterThanOrEqual(0);
    });
  });

  describe("formatBytes", () => {
    it("should format bytes as B", () => {
      expect(formatBytes(100)).toBe("100 B");
      expect(formatBytes(0)).toBe("0 B");
    });

    it("should format bytes as KB", () => {
      expect(formatBytes(1024)).toBe("1.0 KB");
      expect(formatBytes(2048)).toBe("2.0 KB");
      expect(formatBytes(1536)).toBe("1.5 KB");
    });

    it("should format bytes as MB", () => {
      expect(formatBytes(1024 * 1024)).toBe("1.0 MB");
      expect(formatBytes(2.5 * 1024 * 1024)).toBe("2.5 MB");
    });

    it("should round to one decimal place", () => {
      const result = formatBytes(1024 + 512); // 1.5 KB
      expect(result).toMatch(/^\d+\.\d KB$/);
    });
  });
});
