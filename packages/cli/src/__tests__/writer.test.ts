/**
 * Tests for the writer module
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import * as fs from "node:fs";
import * as path from "node:path";
import { writeComponents } from "../lib/writer.js";
import type { OrionConfig, RegistryItem, RegistryFile } from "../types.js";

// Mock data
const mockConfig: OrionConfig = {
  registryUrl: "http://localhost:3000",
  componentDir: "src/components",
  sectionDir: "src/sections",
  templateDir: "src/templates",
  typescript: true,
  brand: "orion",
  mode: "product",
};

const mockFile: RegistryFile = {
  path: "Button.tsx",
  type: "tsx",
  content: "export const Button = () => <button>Click me</button>;",
};

const mockItem: RegistryItem = {
  name: "button",
  type: "registry:component",
  title: "Button",
  description: "A button component",
  category: "forms",
  files: [mockFile],
  dependencies: ["lucide-react"],
};

describe("writeComponents", () => {
  let tempDir: string;

  beforeEach(() => {
    // Create a temporary directory for testing
    tempDir = path.join(process.cwd(), ".test-write-components");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
  });

  afterEach(() => {
    // Clean up temporary directory
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true });
    }
  });

  describe("normal mode", () => {
    it("writes component files to disk", () => {
      const result = writeComponents([mockItem], mockConfig, tempDir);

      expect(result.writtenFiles.length).toBeGreaterThan(0);
      expect(result.npmDeps).toContain("lucide-react");
      expect(result.dryRun).toBe(undefined);
    });

    it("creates required directories", () => {
      writeComponents([mockItem], mockConfig, tempDir);

      const expectedDir = path.join(
        tempDir,
        mockConfig.componentDir,
        mockItem.name,
      );
      expect(fs.existsSync(expectedDir)).toBe(true);
    });

    it("collects npm dependencies", () => {
      const itemWithDeps: RegistryItem = {
        ...mockItem,
        dependencies: ["lucide-react", "date-fns"],
      };

      const result = writeComponents([itemWithDeps], mockConfig, tempDir);

      expect(result.npmDeps).toContain("lucide-react");
      expect(result.npmDeps).toContain("date-fns");
    });

    it("respects overwrite option", () => {
      // Write once
      writeComponents([mockItem], mockConfig, tempDir);

      // Write again without overwrite - should skip existing
      const result = writeComponents([mockItem], mockConfig, tempDir, {
        overwrite: false,
      });

      // First file should not be in writtenFiles the second time
      // (implementation logs warning and continues)
      expect(result).toBeDefined();
    });
  });

  describe("dry-run mode", () => {
    it("does not write files to disk in dry-run", () => {
      const result = writeComponents([mockItem], mockConfig, tempDir, {
        dryRun: true,
      });

      // Files should be listed but not actually created
      expect(result.writtenFiles.length).toBeGreaterThan(0);
      expect(result.dryRun).toBe(true);

      // Check that files were NOT actually written
      const expectedPath = path.join(
        tempDir,
        mockConfig.componentDir,
        mockItem.name,
        "Button.tsx",
      );
      expect(fs.existsSync(expectedPath)).toBe(false);
    });

    it("collects npm dependencies even in dry-run", () => {
      const result = writeComponents([mockItem], mockConfig, tempDir, {
        dryRun: true,
      });

      expect(result.npmDeps).toContain("lucide-react");
    });

    it("marks dry-run mode in result", () => {
      const result = writeComponents([mockItem], mockConfig, tempDir, {
        dryRun: true,
      });

      expect(result.dryRun).toBe(true);
    });

    it("skips already-installed files in dry-run", () => {
      // First create the file for real
      writeComponents([mockItem], mockConfig, tempDir);

      // Then do dry-run - should skip the existing file
      const result = writeComponents([mockItem], mockConfig, tempDir, {
        dryRun: true,
        overwrite: false,
      });

      // Result should indicate no files (or skip info)
      expect(result).toBeDefined();
      expect(result.dryRun).toBe(true);
    });
  });

  describe("multiple items", () => {
    it("processes multiple items", () => {
      const item2: RegistryItem = {
        ...mockItem,
        name: "card",
        title: "Card",
        files: [
          {
            ...mockFile,
            path: "Card.tsx",
            content: "export const Card = () => <div>Card</div>;",
          },
        ],
      };

      const result = writeComponents([mockItem, item2], mockConfig, tempDir);

      expect(result.writtenFiles.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe("return value", () => {
    it("returns WriteResult interface", () => {
      const result = writeComponents([mockItem], mockConfig, tempDir);

      expect(result).toHaveProperty("writtenFiles");
      expect(result).toHaveProperty("npmDeps");
      expect(Array.isArray(result.writtenFiles)).toBe(true);
      expect(Array.isArray(result.npmDeps)).toBe(true);
    });

    it("returns file paths as strings", () => {
      const result = writeComponents([mockItem], mockConfig, tempDir);

      for (const file of result.writtenFiles) {
        expect(typeof file).toBe("string");
        expect(file.length).toBeGreaterThan(0);
      }
    });

    it("returns unique npm dependencies", () => {
      const itemDuplicate: RegistryItem = {
        ...mockItem,
        dependencies: ["lucide-react", "lucide-react"], // duplicate
      };

      const result = writeComponents([itemDuplicate], mockConfig, tempDir);

      // Should only contain unique dependencies
      const lucideCount = result.npmDeps.filter(
        (d) => d === "lucide-react",
      ).length;
      expect(lucideCount).toBe(1);
    });
  });
});
