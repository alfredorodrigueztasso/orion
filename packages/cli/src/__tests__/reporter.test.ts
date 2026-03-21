/**
 * Tests for reporter.ts
 */

import { describe, it, expect } from "vitest";
import {
  generateReport,
  formatStatsForConsole,
  estimateGzipSize,
  type BuildStatistics,
} from "../lib/reporter.js";

describe("reporter", () => {
  describe("generateReport", () => {
    it("should generate valid build statistics", () => {
      const usageMap = {
        button: ["--text-primary", "--spacing-4"],
        card: ["--text-primary", "--surface-base"],
      };

      const components = [
        {
          name: "button",
          path: "src/button/Button.module.css",
          cssSize: 500,
          tokens: ["--text-primary", "--spacing-4"],
        },
      ];

      const originalCSS = `
        :root {
          --text-primary: #000;
          --spacing-4: 16px;
          --surface-base: #fff;
          --unused-1: red;
          --unused-2: blue;
        }
        .button { color: var(--text-primary); }
      `;

      const minifiedCSS = ".button{color:var(--text-primary)}";

      const stats = generateReport(
        usageMap,
        components,
        originalCSS,
        minifiedCSS,
        1000,
      );

      expect(stats).toHaveProperty("timestamp");
      expect(stats).toHaveProperty("components");
      expect(stats).toHaveProperty("tokens");
      expect(stats).toHaveProperty("bundleSize");
      expect(stats).toHaveProperty("recommendations");
    });

    it("should calculate token usage percentage correctly", () => {
      const usageMap = {
        button: ["--text-primary"],
      };

      const components = [
        {
          name: "button",
          path: "src/button/Button.module.css",
          cssSize: 100,
          tokens: ["--text-primary"],
        },
      ];

      const originalCSS = `
        :root {
          --text-primary: #000;
          --unused-1: red;
          --unused-2: blue;
          --unused-3: green;
        }
      `;

      const stats = generateReport(usageMap, components, originalCSS, "", 0);

      // 1 used token out of 4 total = 25%
      expect(stats.tokens.percentage).toBe(25);
    });

    it("should categorize tokens correctly", () => {
      const usageMap = {
        component: [
          "--text-primary",
          "--background-color",
          "--spacing-4",
          "--font-size-lg",
          "--radius-control",
          "--shadow-md",
        ],
      };

      const components = [
        {
          name: "component",
          path: "src/component.module.css",
          cssSize: 100,
          tokens: usageMap.component,
        },
      ];

      const originalCSS = usageMap.component
        .map((t) => `${t}: value;`)
        .join("\n");

      const stats = generateReport(usageMap, components, originalCSS, "", 0);

      expect(stats.tokens.byCategory.colors).toBeGreaterThan(0);
      expect(stats.tokens.byCategory.spacing).toBeGreaterThan(0);
      expect(stats.tokens.byCategory.typography).toBeGreaterThan(0);
    });

    it("should calculate bundle size reduction", () => {
      const usageMap = { component: ["--text-primary"] };
      const components = [
        {
          name: "component",
          path: "src/component.module.css",
          cssSize: 100,
          tokens: ["--text-primary"],
        },
      ];

      const originalCSS = "a".repeat(1000);
      const minifiedCSS = "a".repeat(500);

      const stats = generateReport(
        usageMap,
        components,
        originalCSS,
        minifiedCSS,
        0,
      );

      expect(stats.bundleSize.reduction).toBe("50%");
    });

    it("should include timestamp", () => {
      const usageMap = {};
      const components: any[] = [];
      const originalCSS = ":root {}";

      const stats = generateReport(usageMap, components, originalCSS, "", 0);

      expect(stats.timestamp).toBeTruthy();
      expect(new Date(stats.timestamp).getTime()).toBeLessThanOrEqual(
        Date.now(),
      );
    });
  });

  describe("formatStatsForConsole", () => {
    it("should format stats for console output", () => {
      const stats: BuildStatistics = {
        timestamp: new Date().toISOString(),
        projectName: "test-app",
        buildTime: 1500,
        components: [
          {
            name: "button",
            path: "src/button/Button.module.css",
            cssSize: "2.5 KB",
            tokensReferenced: 5,
          },
        ],
        tokens: {
          total: 250,
          referenced: 25,
          percentage: 10,
          byCategory: {
            colors: 5,
            spacing: 3,
            typography: 2,
            radius: 1,
            effects: 2,
            other: 12,
          },
        },
        bundleSize: {
          original: "28.5 KB",
          minified: "12.3 KB",
          reduction: "57%",
          gzipped: "4.2 KB",
        },
        recommendations: ["Tree-shaking could save more"],
      };

      const lines = formatStatsForConsole(stats);

      expect(lines.length).toBeGreaterThan(0);
      expect(lines.join("\n")).toContain("Build Summary");
      expect(lines.join("\n")).toContain("button");
      expect(lines.join("\n")).toContain("28.5 KB");
      expect(lines.join("\n")).toContain("Recommendations");
    });

    it("should include all token categories in output", () => {
      const stats: BuildStatistics = {
        timestamp: new Date().toISOString(),
        projectName: "test-app",
        buildTime: 0,
        components: [],
        tokens: {
          total: 10,
          referenced: 5,
          percentage: 50,
          byCategory: {
            colors: 2,
            spacing: 1,
            typography: 1,
            radius: 1,
            effects: 0,
            other: 0,
          },
        },
        bundleSize: {
          original: "10 KB",
          minified: "5 KB",
          reduction: "50%",
        },
        recommendations: [],
      };

      const lines = formatStatsForConsole(stats);
      const output = lines.join("\n");

      expect(output).toContain("Colors:");
      expect(output).toContain("Spacing:");
      expect(output).toContain("Typography:");
      expect(output).toContain("Radius:");
    });
  });

  describe("estimateGzipSize", () => {
    it("should estimate gzip size as 30% of original", () => {
      const original = "a".repeat(1000);
      const estimated = estimateGzipSize(original);

      expect(estimated).toBeLessThan(original);
      expect(estimated).toBeCloseTo(300, -1); // ~30% of 1000
    });

    it("should return 0 for empty string", () => {
      const estimated = estimateGzipSize("");
      expect(estimated).toBe(0);
    });

    it("should handle large files", () => {
      const original = "x".repeat(1024 * 1024); // 1MB
      const estimated = estimateGzipSize(original);

      expect(estimated).toBeGreaterThan(0);
      expect(estimated).toBeLessThan(original);
    });
  });
});
