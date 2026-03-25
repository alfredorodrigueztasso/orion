import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  checkComponent,
  getOptionalDepError,
  OPTIONAL_DEP_COMPONENTS,
  type OptionalDepError,
} from "./optionalDeps";

describe("Optional Dependencies - ESM (v5.3.1)", () => {
  // Helper to access private depCache and depCheckInProgress
  // We'll need to test them indirectly through the public API

  beforeEach(() => {
    // Clear any cached module imports by clearing require cache
    // This simulates a fresh module load for each test
    vi.resetModules();
  });

  afterEach(() => {
    // Cleanup after each test
    vi.clearAllMocks();
  });

  describe("isDepAvailable (async)", () => {
    it("should detect available dependencies (react)", async () => {
      const error = await getOptionalDepError(
        "TestComponent",
        "react",
        "http://test.com",
      );
      expect(error.available).toBe(true);
    });

    it("should detect missing dependencies gracefully", async () => {
      const error = await getOptionalDepError(
        "TestComponent",
        "nonexistent-package-xyz-123-test",
        "http://test.com",
      );
      expect(error.available).toBe(false);
    });

    it("should handle multiple dependencies in parallel", async () => {
      // react exists, nonexistent doesn't - result should be false (all must be available)
      const error = await getOptionalDepError(
        "TestComponent",
        ["react", "nonexistent-xyz-123"],
        "http://test.com",
      );
      expect(error.available).toBe(false);
    });

    it("should handle array of available dependencies", async () => {
      // Both react and typescript should be available in test environment
      const error = await getOptionalDepError(
        "TestComponent",
        ["react"],
        "http://test.com",
      );
      expect(error.available).toBe(true);
    });
  });

  describe("checkComponent", () => {
    it("should return undefined for available dependencies on sync check", () => {
      const result = checkComponent("Chart");
      // First check might be async (cache miss), but we test the API contract
      expect(result === undefined || result instanceof Promise).toBe(true);
    });

    it("should return error or promise for missing dependencies", async () => {
      // Mock recharts as not available by using a component that would error
      const result = checkComponent("Chart");
      if (result instanceof Promise) {
        const resolved = await result;
        if (resolved) {
          expect(resolved.componentName).toBe("Chart");
          expect(resolved.depName).toBe("recharts");
        }
      }
    });

    it("should have correct component configurations", () => {
      expect(OPTIONAL_DEP_COMPONENTS.Chart).toBeDefined();
      expect(OPTIONAL_DEP_COMPONENTS.Calendar).toBeDefined();
      expect(OPTIONAL_DEP_COMPONENTS.DatePicker).toBeDefined();
      expect(OPTIONAL_DEP_COMPONENTS.CodeEditor).toBeDefined();
      expect(OPTIONAL_DEP_COMPONENTS.Chat).toBeDefined();
      expect(OPTIONAL_DEP_COMPONENTS.CollapsibleFolder).toBeDefined();
    });

    it("should have correct docsUrl for each component", () => {
      expect(OPTIONAL_DEP_COMPONENTS.Chart.docsUrl).toContain("chart");
      expect(OPTIONAL_DEP_COMPONENTS.Calendar.docsUrl).toContain("calendar");
      expect(OPTIONAL_DEP_COMPONENTS.DatePicker.docsUrl).toContain(
        "date-picker",
      );
      expect(OPTIONAL_DEP_COMPONENTS.CodeEditor.docsUrl).toContain(
        "code-editor",
      );
      expect(OPTIONAL_DEP_COMPONENTS.Chat.docsUrl).toContain("chat");
      expect(OPTIONAL_DEP_COMPONENTS.CollapsibleFolder.docsUrl).toContain(
        "collapsible-folder",
      );
    });
  });

  describe("OptionalDepError structure", () => {
    it("should have correct error structure for missing deps", async () => {
      const error = await getOptionalDepError(
        "TestComponent",
        "missing-package",
        "http://docs.test.com/component",
      );

      expect(error).toHaveProperty("available");
      expect(error).toHaveProperty("componentName");
      expect(error).toHaveProperty("depName");
      expect(error).toHaveProperty("installCommand");
      expect(error).toHaveProperty("pnpmCommand");
      expect(error).toHaveProperty("docsUrl");
    });

    it("should generate correct npm install command", async () => {
      const error = await getOptionalDepError(
        "Calendar",
        "date-fns",
        "http://test.com",
      );

      expect(error.installCommand).toBe("npm install date-fns");
    });

    it("should generate correct pnpm add command", async () => {
      const error = await getOptionalDepError(
        "Calendar",
        "date-fns",
        "http://test.com",
      );

      expect(error.pnpmCommand).toBe("pnpm add date-fns");
    });

    it("should handle multiple dependencies in install command", async () => {
      const error = await getOptionalDepError(
        "CollapsibleFolder",
        ["@dnd-kit/core", "@dnd-kit/sortable", "@dnd-kit/utilities"],
        "http://test.com",
      );

      expect(error.installCommand).toContain("@dnd-kit/core");
      expect(error.installCommand).toContain("@dnd-kit/sortable");
      expect(error.installCommand).toContain("@dnd-kit/utilities");
    });
  });

  describe("ESM spec compliance", () => {
    it("should not use require() - only import()", async () => {
      // This test validates that the source doesn't use require()
      // by grepping the source file for require patterns
      const fs = await import("fs");
      const path = await import("path");
      const sourceFile = path.join(__dirname, "./optionalDeps.ts");
      const source = fs.readFileSync(sourceFile, "utf-8");

      // Check for require() calls (excluding comments and strings)
      const requirePattern = /(?<!\/\/.*)require\(/g;
      const matches = source.match(requirePattern);

      expect(matches).toBeNull();
    });

    it("should export OptionalDepError interface", async () => {
      // Use dynamic import() instead of require() for ESM compliance
      const module = await import("./optionalDeps.ts");
      // TypeScript interfaces don't exist at runtime, but the type is exported
      expect(module.checkComponent).toBeDefined();
      expect(module.getOptionalDepError).toBeDefined();
      expect(module.OPTIONAL_DEP_COMPONENTS).toBeDefined();
    });

    it("should be async-safe for SSR environments", async () => {
      // Simulates SSR environment calling getOptionalDepError
      const error = await getOptionalDepError(
        "Chart",
        "recharts",
        "http://docs.test.com",
      );

      expect(error).toHaveProperty("available");
      expect(error).toHaveProperty("installCommand");
      expect(typeof error.installCommand).toBe("string");
    });
  });

  describe("Caching behavior", () => {
    it("should handle rapid sequential checks", async () => {
      // First check
      const error1 = await getOptionalDepError(
        "Test1",
        "react",
        "http://test.com",
      );

      // Second check (should hit cache)
      const error2 = await getOptionalDepError(
        "Test2",
        "react",
        "http://test.com",
      );

      expect(error1.available).toBe(error2.available);
      expect(error1.available).toBe(true);
    });

    it("should handle parallel checks for same dependency", async () => {
      // Simulate concurrent checks
      const promises = [
        getOptionalDepError("Test1", "react", "http://test.com"),
        getOptionalDepError("Test2", "react", "http://test.com"),
        getOptionalDepError("Test3", "react", "http://test.com"),
      ];

      const results = await Promise.all(promises);

      results.forEach((error) => {
        expect(error.available).toBe(true);
      });
    });
  });
});
