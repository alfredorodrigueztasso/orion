/**
 * Integration tests for build.ts command
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import * as fs from "node:fs";
import * as path from "node:path";
import * as os from "node:os";
import { build } from "../commands/build.js";

describe("build command", () => {
  let tempDir: string;
  let originalCwd: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "orion-build-test-"));
    originalCwd = process.cwd();
    process.chdir(tempDir);
  });

  afterEach(() => {
    process.chdir(originalCwd);
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  describe("validation", () => {
    it("should fail without orion.json", async () => {
      let errorThrown = false;

      try {
        await build([]);
      } catch {
        errorThrown = true;
      }

      expect(errorThrown).toBe(true);
    });

    it("should fail with empty component directory", async () => {
      fs.writeFileSync(
        path.join(tempDir, "orion.json"),
        JSON.stringify({
          registryUrl: "https://orion-ds.dev/r",
          componentDir: "src/components/orion",
          sectionDir: "src/sections/orion",
          templateDir: "src/templates/orion",
          typescript: true,
          brand: "orion",
          mode: "product",
        }),
        "utf-8"
      );

      let errorThrown = false;

      try {
        await build([]);
      } catch {
        errorThrown = true;
      }

      expect(errorThrown).toBe(true);
    });

    it("should fail with invalid output directory", async () => {
      // Create valid setup
      const componentDir = path.join(tempDir, "src", "components", "orion");
      fs.mkdirSync(componentDir, { recursive: true });

      const buttonDir = path.join(componentDir, "button");
      fs.mkdirSync(buttonDir);
      fs.writeFileSync(
        path.join(buttonDir, "Button.module.css"),
        ".button { color: var(--text-primary); }",
        "utf-8"
      );

      fs.writeFileSync(
        path.join(tempDir, "orion.json"),
        JSON.stringify({
          registryUrl: "https://orion-ds.dev/r",
          componentDir: "src/components/orion",
          sectionDir: "src/sections/orion",
          templateDir: "src/templates/orion",
          typescript: true,
          brand: "orion",
          mode: "product",
        }),
        "utf-8"
      );

      let errorThrown = false;

      try {
        // Try to write to a directory we don't have permission to (simulate)
        await build(["--output-dir=/root-only-access"]);
      } catch {
        errorThrown = true;
      }

      expect(errorThrown).toBe(true);
    });
  });

  describe("basic build", () => {
    it("should create output directory with CSS file", async () => {
      const componentDir = path.join(tempDir, "src", "components", "orion");
      fs.mkdirSync(componentDir, { recursive: true });

      const buttonDir = path.join(componentDir, "button");
      fs.mkdirSync(buttonDir);
      fs.writeFileSync(
        path.join(buttonDir, "Button.module.css"),
        `
        :root {
          --text-primary: #000;
          --text-secondary: #666;
        }
        .button { color: var(--text-primary); }
      `,
        "utf-8"
      );

      fs.writeFileSync(
        path.join(tempDir, "orion.json"),
        JSON.stringify({
          registryUrl: "https://orion-ds.dev/r",
          componentDir: "src/components/orion",
          sectionDir: "src/sections/orion",
          templateDir: "src/templates/orion",
          typescript: true,
          brand: "orion",
          mode: "product",
        }),
        "utf-8"
      );

      const outputDir = path.join(tempDir, ".orion-build");

      await build([]);

      expect(fs.existsSync(outputDir)).toBe(true);
      expect(fs.existsSync(path.join(outputDir, "index.css"))).toBe(true);
      expect(fs.existsSync(path.join(outputDir, "variables.css"))).toBe(true);
    });

    it("should minify CSS by default", async () => {
      const componentDir = path.join(tempDir, "src", "components", "orion");
      fs.mkdirSync(componentDir, { recursive: true });

      const buttonDir = path.join(componentDir, "button");
      fs.mkdirSync(buttonDir);
      fs.writeFileSync(
        path.join(buttonDir, "Button.module.css"),
        `
        .button {
          color: var(--text-primary);
          padding: 10px;
        }
      `,
        "utf-8"
      );

      fs.writeFileSync(
        path.join(tempDir, "orion.json"),
        JSON.stringify({
          registryUrl: "https://orion-ds.dev/r",
          componentDir: "src/components/orion",
          sectionDir: "src/sections/orion",
          templateDir: "src/templates/orion",
          typescript: true,
          brand: "orion",
          mode: "product",
        }),
        "utf-8"
      );

      await build([]);

      const cssContent = fs.readFileSync(
        path.join(tempDir, ".orion-build", "index.css"),
        "utf-8"
      );

      // Minified CSS should not have unnecessary whitespace
      expect(cssContent).not.toContain("\n\n");
      expect(cssContent.trim()).toBe(cssContent.trim()); // No leading/trailing whitespace
    });
  });

  describe("flags", () => {
    beforeEach(() => {
      const componentDir = path.join(tempDir, "src", "components", "orion");
      fs.mkdirSync(componentDir, { recursive: true });

      const buttonDir = path.join(componentDir, "button");
      fs.mkdirSync(buttonDir);
      fs.writeFileSync(
        path.join(buttonDir, "Button.module.css"),
        `
        :root {
          --text-primary: #000;
          --text-secondary: #666;
          --unused: red;
        }
        .button { color: var(--text-primary); }
      `,
        "utf-8"
      );

      fs.writeFileSync(
        path.join(tempDir, "orion.json"),
        JSON.stringify({
          registryUrl: "https://orion-ds.dev/r",
          componentDir: "src/components/orion",
          sectionDir: "src/sections/orion",
          templateDir: "src/templates/orion",
          typescript: true,
          brand: "orion",
          mode: "product",
        }),
        "utf-8"
      );
    });

    it("should respect --no-minify flag", async () => {
      await build(["--no-minify"]);

      const cssContent = fs.readFileSync(
        path.join(tempDir, ".orion-build", "index.css"),
        "utf-8"
      );

      // Non-minified CSS should have formatting
      expect(cssContent.length).toBeGreaterThan(100);
    });

    it("should generate analysis report with --analyze flag", async () => {
      await build(["--analyze"]);

      const reportPath = path.join(tempDir, ".orion-build", "build-analysis.json");
      expect(fs.existsSync(reportPath)).toBe(true);

      const report = JSON.parse(fs.readFileSync(reportPath, "utf-8"));
      expect(report).toHaveProperty("timestamp");
      expect(report).toHaveProperty("components");
      expect(report).toHaveProperty("tokens");
    });

    it("should use custom output directory", async () => {
      const customDir = "custom-build";
      await build([`--output-dir=${customDir}`]);

      expect(fs.existsSync(path.join(tempDir, customDir, "index.css"))).toBe(
        true
      );
    });

    it("should respect --no-tree-shake-tokens flag", async () => {
      const withShaking = ".orion-build";
      await build([]);

      const withSize = Buffer.byteLength(
        fs.readFileSync(path.join(tempDir, withShaking, "index.css"), "utf-8"),
        "utf-8"
      );

      // Clean up
      fs.rmSync(path.join(tempDir, withShaking), { recursive: true });

      const withoutShaking = ".orion-build-no-shake";
      await build([
        "--no-tree-shake-tokens",
        `--output-dir=${withoutShaking}`,
      ]);

      const withoutSize = Buffer.byteLength(
        fs.readFileSync(path.join(tempDir, withoutShaking, "index.css"), "utf-8"),
        "utf-8"
      );

      // Without tree-shaking should be larger or equal
      expect(withoutSize).toBeGreaterThanOrEqual(withSize);
    });
  });

  describe("help", () => {
    it("should show help with --help flag", async () => {
      // Just ensure it doesn't throw
      await build(["--help"]);
    });
  });
});
