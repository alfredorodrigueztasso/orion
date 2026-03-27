import { describe, it, expect, beforeAll } from "vitest";
import fs from "fs";
import path from "path";

/**
 * Dist Completeness Test Suite
 *
 * Validates that `npm run build` generates all expected exports.
 * This test prevents incomplete builds from being published.
 *
 * Run: npm test -- dist-completeness.test.ts
 * Run: npm test -- --grep "dist"
 */

describe("dist/ Completeness (Pre-Publish Validation)", () => {
  const ROOT = path.resolve(__dirname, "..");
  const DIST_PATH = path.join(ROOT, "dist");
  const PACKAGE_JSON_PATH = path.join(ROOT, "package.json");

  let packageJson: any;

  beforeAll(() => {
    if (!fs.existsSync(DIST_PATH)) {
      throw new Error(
        `dist/ does not exist at ${DIST_PATH}. Run: cd ${ROOT} && npm run build`,
      );
    }

    try {
      packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, "utf8"));
    } catch (e) {
      throw new Error(`Cannot read package.json: ${(e as Error).message}`);
    }
  });

  it("dist/ directory exists", () => {
    expect(fs.existsSync(DIST_PATH)).toBe(true);
  });

  describe("Main exports", () => {
    it("contains index exports (index.mjs, index.cjs, index.d.ts)", () => {
      expect(fs.existsSync(path.join(DIST_PATH, "index.mjs"))).toBe(true);
      expect(fs.existsSync(path.join(DIST_PATH, "index.cjs"))).toBe(true);
      expect(fs.existsSync(path.join(DIST_PATH, "index.d.ts"))).toBe(true);
    });

    it("index.mjs is not empty", () => {
      const filePath = path.join(DIST_PATH, "index.mjs");
      const stat = fs.statSync(filePath);
      expect(stat.size).toBeGreaterThan(0);
    });

    it("index.cjs is not empty", () => {
      const filePath = path.join(DIST_PATH, "index.cjs");
      const stat = fs.statSync(filePath);
      expect(stat.size).toBeGreaterThan(0);
    });
  });

  describe("Client exports", () => {
    it("contains client exports (client.mjs, client.cjs, client.d.ts)", () => {
      expect(fs.existsSync(path.join(DIST_PATH, "client.mjs"))).toBe(true);
      expect(fs.existsSync(path.join(DIST_PATH, "client.cjs"))).toBe(true);
      expect(fs.existsSync(path.join(DIST_PATH, "client.d.ts"))).toBe(true);
    });

    it("client.mjs is not empty", () => {
      const filePath = path.join(DIST_PATH, "client.mjs");
      const stat = fs.statSync(filePath);
      expect(stat.size).toBeGreaterThan(0);
    });
  });

  describe("Named entry points", () => {
    const entryPoints = ["tokens", "sections", "blocks"];

    for (const ep of entryPoints) {
      describe(ep, () => {
        it(`${ep}/index.mjs exists and is not empty`, () => {
          const filePath = path.join(DIST_PATH, ep, "index.mjs");
          expect(fs.existsSync(filePath)).toBe(true);
          const stat = fs.statSync(filePath);
          expect(stat.size).toBeGreaterThan(0);
        });

        it(`${ep}/index.cjs exists and is not empty`, () => {
          const filePath = path.join(DIST_PATH, ep, "index.cjs");
          expect(fs.existsSync(filePath)).toBe(true);
          const stat = fs.statSync(filePath);
          expect(stat.size).toBeGreaterThan(0);
        });

        it(`${ep}/index.d.ts exists`, () => {
          const filePath = path.join(DIST_PATH, ep, "index.d.ts");
          expect(fs.existsSync(filePath)).toBe(true);
        });
      });
    }
  });

  describe("Optional entry points (heavy components)", () => {
    const optionalEPs = ["chart", "calendar", "editor", "dnd"];

    for (const ep of optionalEPs) {
      describe(ep, () => {
        it(`${ep}.mjs exists and is not empty`, () => {
          const filePath = path.join(DIST_PATH, `${ep}.mjs`);
          expect(fs.existsSync(filePath)).toBe(true);
          const stat = fs.statSync(filePath);
          expect(stat.size).toBeGreaterThan(0);
        });

        it(`${ep}.cjs exists and is not empty`, () => {
          const filePath = path.join(DIST_PATH, `${ep}.cjs`);
          expect(fs.existsSync(filePath)).toBe(true);
          const stat = fs.statSync(filePath);
          expect(stat.size).toBeGreaterThan(0);
        });

        it(`${ep}.d.ts exists`, () => {
          const filePath = path.join(DIST_PATH, `${ep}.d.ts`);
          expect(fs.existsSync(filePath)).toBe(true);
        });
      });
    }
  });

  describe("CSS assets", () => {
    it("styles.css exists and contains content", () => {
      const filePath = path.join(DIST_PATH, "styles.css");
      expect(fs.existsSync(filePath)).toBe(true);
      const stat = fs.statSync(filePath);
      expect(stat.size).toBeGreaterThan(100); // Should have substantial CSS
    });

    it("blocks.css exists", () => {
      const filePath = path.join(DIST_PATH, "blocks.css");
      expect(fs.existsSync(filePath)).toBe(true);
    });

    it("theme.css exists", () => {
      const filePath = path.join(DIST_PATH, "theme.css");
      expect(fs.existsSync(filePath)).toBe(true);
    });
  });

  describe("package.json exports validation", () => {
    it("all exports in package.json have corresponding files", () => {
      const exports = packageJson.exports || {};
      const missingFiles: string[] = [];

      for (const [exportPath, exportDef] of Object.entries(exports)) {
        if (typeof exportDef === "string") {
          const filePath = (exportDef as string).replace(/^\.\/dist\//, "");
          if (!fs.existsSync(path.join(DIST_PATH, filePath))) {
            missingFiles.push(`${exportPath} → ${filePath}`);
          }
        } else if (typeof exportDef === "object") {
          const def = exportDef as Record<string, any>;

          if (def.types) {
            const filePath = def.types.replace(/^\.\/dist\//, "");
            if (!fs.existsSync(path.join(DIST_PATH, filePath))) {
              missingFiles.push(`${exportPath}.types → ${filePath}`);
            }
          }

          if (def.import) {
            const filePath = def.import.replace(/^\.\/dist\//, "");
            if (!fs.existsSync(path.join(DIST_PATH, filePath))) {
              missingFiles.push(`${exportPath}.import → ${filePath}`);
            }
          }

          if (def.require) {
            const filePath = def.require.replace(/^\.\/dist\//, "");
            if (!fs.existsSync(path.join(DIST_PATH, filePath))) {
              missingFiles.push(`${exportPath}.require → ${filePath}`);
            }
          }
        }
      }

      expect(missingFiles).toEqual([]);
    });
  });

  describe("No broken/empty files", () => {
    it("no JS files are empty (0 bytes)", () => {
      const emptyFiles: string[] = [];
      const distFiles = getAllFiles(DIST_PATH);

      for (const file of distFiles) {
        if (file.endsWith(".mjs") || file.endsWith(".cjs")) {
          const stat = fs.statSync(file);
          if (stat.size === 0) {
            emptyFiles.push(path.relative(DIST_PATH, file));
          }
        }
      }

      expect(emptyFiles).toEqual([]);
    });

    it("no JS files are suspiciously small (<100 bytes)", () => {
      const smallFiles: string[] = [];
      const distFiles = getAllFiles(DIST_PATH);

      for (const file of distFiles) {
        if (file.endsWith(".mjs") || file.endsWith(".cjs")) {
          const stat = fs.statSync(file);
          if (stat.size > 0 && stat.size < 100) {
            smallFiles.push(
              `${path.relative(DIST_PATH, file)} (${stat.size} bytes)`,
            );
          }
        }
      }

      expect(smallFiles).toEqual([]);
    });
  });

  describe("Directory structure", () => {
    const expectedDirs = ["tokens", "sections", "blocks"];

    for (const dir of expectedDirs) {
      it(`${dir}/ directory exists`, () => {
        const dirPath = path.join(DIST_PATH, dir);
        expect(fs.existsSync(dirPath)).toBe(true);
        expect(fs.statSync(dirPath).isDirectory()).toBe(true);
      });
    }
  });

  // Helper function
  function getAllFiles(dir: string): string[] {
    const files: string[] = [];

    try {
      const entries = fs.readdirSync(dir);

      for (const entry of entries) {
        const fullPath = path.join(dir, entry);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          files.push(...getAllFiles(fullPath));
        } else {
          files.push(fullPath);
        }
      }
    } catch (e) {
      // Silently skip directories we can't read
    }

    return files;
  }
});
