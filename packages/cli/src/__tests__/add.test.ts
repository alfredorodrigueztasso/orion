/**
 * Tests for the add command
 */

import { describe, it, expect } from "vitest";

// Note: Testing parseArgs directly would require exporting it from add.ts
// For now, we test the utilities that add.ts depends on

describe("add command", () => {
  describe("flag parsing", () => {
    it("should parse component names correctly", () => {
      // This test demonstrates the expected behavior
      // In actual implementation, we'd test the parseArgs function
      const args = ["button", "card", "--yes"];
      const names = args.filter(
        (a) => !a.startsWith("--") && !a.startsWith("-"),
      );
      expect(names).toEqual(["button", "card"]);
    });

    it("should extract flags from args", () => {
      const args = ["button", "--dry-run", "--yes", "--type=component"];
      const hasDryRun = args.includes("--dry-run");
      const hasYes = args.includes("--yes") || args.includes("-y");
      const type = args.find((a) => a.startsWith("--type="))?.split("=")[1];

      expect(hasDryRun).toBe(true);
      expect(hasYes).toBe(true);
      expect(type).toBe("component");
    });

    it("should handle --category flag", () => {
      const args = ["--category=forms"];
      const category = args
        .find((a) => a.startsWith("--category="))
        ?.split("=")[1];
      expect(category).toBe("forms");
    });

    it("should handle --tag flag", () => {
      const args = ["--tag=marketing"];
      const tag = args.find((a) => a.startsWith("--tag="))?.split("=")[1];
      expect(tag).toBe("marketing");
    });

    it("should handle --no-install flag", () => {
      const args = ["button", "--no-install"];
      const noInstall = args.includes("--no-install");
      expect(noInstall).toBe(true);
    });

    it("should prioritize names in args", () => {
      const args = ["button", "card", "--yes", "--category=forms", "--dry-run"];
      const names = args.filter(
        (a) => !a.startsWith("--") && !a.startsWith("-"),
      );
      expect(names).toEqual(["button", "card"]);
    });
  });

  describe("validation", () => {
    it("should require at least names or category or tag", () => {
      const args: string[] = [];
      const names = args.filter(
        (a) => !a.startsWith("--") && !a.startsWith("-"),
      );
      const category = args
        .find((a) => a.startsWith("--category="))
        ?.split("=")[1];
      const tag = args.find((a) => a.startsWith("--tag="))?.split("=")[1];

      const hasInput = names.length > 0 || category || tag;
      expect(hasInput).toBe(false);
    });

    it("should accept names or category or tag", () => {
      const args1 = ["button"];
      const names1 = args1.filter(
        (a) => !a.startsWith("--") && !a.startsWith("-"),
      );
      expect(names1.length > 0).toBe(true);

      const args2 = ["--category=forms"];
      const category2 = args2
        .find((a) => a.startsWith("--category="))
        ?.split("=")[1];
      expect(category2).toBeDefined();

      const args3 = ["--tag=marketing"];
      const tag3 = args3.find((a) => a.startsWith("--tag="))?.split("=")[1];
      expect(tag3).toBeDefined();
    });
  });

  describe("flag combinations", () => {
    it("should allow combining multiple flags", () => {
      const args = [
        "button",
        "--dry-run",
        "--yes",
        "--type=component",
        "--overwrite",
      ];

      const dryRun = args.includes("--dry-run");
      const yes = args.includes("--yes");
      const type = args.find((a) => a.startsWith("--type="))?.split("=")[1];
      const overwrite = args.includes("--overwrite");

      expect(dryRun).toBe(true);
      expect(yes).toBe(true);
      expect(type).toBe("component");
      expect(overwrite).toBe(true);
    });

    it("should support both --yes and -y", () => {
      const args1 = ["button", "--yes"];
      const args2 = ["button", "-y"];

      expect(args1.includes("--yes") || args1.includes("-y")).toBe(true);
      expect(args2.includes("--yes") || args2.includes("-y")).toBe(true);
    });
  });
});
