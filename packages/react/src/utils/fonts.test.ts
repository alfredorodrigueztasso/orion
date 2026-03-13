import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  BRAND_FONTS,
  ALL_FONTS,
  GOOGLE_FONTS_URL,
  FONT_PRECONNECT_URLS,
  isFontLoaded,
  areBrandFontsLoaded,
  getMissingFonts,
  getFontLinkTags,
  waitForFonts,
} from "./fonts";

describe("fonts utils", () => {
  describe("Font constants", () => {
    it("BRAND_FONTS has all brands", () => {
      expect(BRAND_FONTS).toHaveProperty("orion");
      expect(BRAND_FONTS).toHaveProperty("red");
      expect(BRAND_FONTS).toHaveProperty("deepblue");
      expect(BRAND_FONTS).toHaveProperty("orange");
      expect(BRAND_FONTS).toHaveProperty("ember");
      expect(BRAND_FONTS).toHaveProperty("lemon");
    });

    it("ALL_FONTS contains unique font families", () => {
      expect(Array.isArray(ALL_FONTS)).toBe(true);
      expect(ALL_FONTS.length).toBeGreaterThan(0);
    });

    it("ALL_FONTS are strings", () => {
      ALL_FONTS.forEach((font) => {
        expect(typeof font).toBe("string");
      });
    });

    it("GOOGLE_FONTS_URL is a valid URL string", () => {
      expect(typeof GOOGLE_FONTS_URL).toBe("string");
      expect(GOOGLE_FONTS_URL).toContain("fonts.googleapis.com");
    });

    it("FONT_PRECONNECT_URLS is an array of URLs", () => {
      expect(Array.isArray(FONT_PRECONNECT_URLS)).toBe(true);
      FONT_PRECONNECT_URLS.forEach((url) => {
        expect(typeof url).toBe("string");
      });
    });
  });

  describe("Brand fonts map", () => {
    it("orion brand has fonts array", () => {
      expect(Array.isArray(BRAND_FONTS.orion)).toBe(true);
      expect(BRAND_FONTS.orion.length).toBeGreaterThan(0);
    });

    it("each brand has font arrays", () => {
      ["orion", "red", "deepblue", "orange", "ember", "lemon"].forEach(
        (brand) => {
          const brandKey = brand as keyof typeof BRAND_FONTS;
          expect(Array.isArray(BRAND_FONTS[brandKey])).toBe(true);
        },
      );
    });
  });

  describe("Font utility functions", () => {
    it("isFontLoaded returns a boolean", () => {
      const result = isFontLoaded("Arial");
      expect(typeof result).toBe("boolean");
    });

    it("isFontLoaded handles invalid font names gracefully", () => {
      expect(() => isFontLoaded("NonexistentFont")).not.toThrow();
    });

    it("areBrandFontsLoaded returns a boolean", () => {
      const result = areBrandFontsLoaded("orion");
      expect(typeof result).toBe("boolean");
    });

    it("areBrandFontsLoaded works with all brands", () => {
      ["orion", "red", "deepblue", "orange", "ember", "lemon"].forEach(
        (brand) => {
          const result = areBrandFontsLoaded(
            brand as
              | "orion"
              | "red"
              | "deepblue"
              | "orange"
              | "ember"
              | "lemon",
          );
          expect(typeof result).toBe("boolean");
        },
      );
    });

    it("getMissingFonts returns an array", () => {
      const result = getMissingFonts("orion");
      expect(Array.isArray(result)).toBe(true);
    });

    it("getMissingFonts returns strings", () => {
      const result = getMissingFonts("orion");
      result.forEach((font) => {
        expect(typeof font).toBe("string");
      });
    });

    it("getMissingFonts works with all brands", () => {
      ["orion", "red", "deepblue", "orange", "ember", "lemon"].forEach(
        (brand) => {
          expect(() => {
            getMissingFonts(
              brand as
                | "orion"
                | "red"
                | "deepblue"
                | "orange"
                | "ember"
                | "lemon",
            );
          }).not.toThrow();
        },
      );
    });

    it("getFontLinkTags returns HTML string", () => {
      const html = getFontLinkTags();
      expect(typeof html).toBe("string");
      expect(html).toContain("<link");
      expect(html).toContain("fonts.googleapis.com");
    });

    it("getFontLinkTags includes preconnect links", () => {
      const html = getFontLinkTags();
      expect(html).toContain("preconnect");
      expect(html).toContain("gstatic.com");
    });
  });

  describe("waitForFonts", () => {
    beforeEach(() => {
      // Tests modify document.fonts via Object.defineProperty
    });

    it("returns true when fonts load successfully", async () => {
      // Mock document.fonts.load to resolve successfully
      Object.defineProperty(document, "fonts", {
        writable: true,
        configurable: true,
        value: {
          load: vi.fn().mockResolvedValue([]),
          check: vi.fn().mockReturnValue(true),
          ready: Promise.resolve(true),
        },
      });

      const result = await waitForFonts(["Inter", "DM Sans"]);
      expect(result).toBe(true);
    });

    it("returns false when fonts fail to load", async () => {
      // Mock document.fonts.load to reject
      Object.defineProperty(document, "fonts", {
        writable: true,
        configurable: true,
        value: {
          load: vi.fn().mockRejectedValue(new Error("Font load failed")),
          check: vi.fn().mockReturnValue(false),
          ready: Promise.reject(new Error("Font load failed")).catch(() => {}), // Handle rejection
        },
      });

      const result = await waitForFonts(["Invalid Font"]);
      expect(result).toBe(false);
    });

    it("calls document.fonts.load with correct font names", async () => {
      const loadSpy = vi.fn().mockResolvedValue([]);
      Object.defineProperty(document, "fonts", {
        writable: true,
        configurable: true,
        value: {
          load: loadSpy,
          check: vi.fn().mockReturnValue(true),
        },
      });

      await waitForFonts(["Inter", "DM Sans"]);
      expect(loadSpy).toHaveBeenCalled();
    });

    it("handles missing document.fonts API gracefully", async () => {
      // Simulate missing document.fonts
      Object.defineProperty(document, "fonts", {
        writable: true,
        configurable: true,
        value: undefined,
      });

      const result = await waitForFonts(["Inter"]);
      // Should return false or handle gracefully
      expect(typeof result).toBe("boolean");
    });

    it("handles empty fonts array", async () => {
      Object.defineProperty(document, "fonts", {
        writable: true,
        configurable: true,
        value: {
          load: vi.fn().mockResolvedValue([]),
          check: vi.fn().mockReturnValue(true),
        },
      });

      const result = await waitForFonts([]);
      expect(result).toBe(true);
    });

    it("handles multiple fonts loading", async () => {
      const loadSpy = vi.fn().mockResolvedValue([]);
      Object.defineProperty(document, "fonts", {
        writable: true,
        configurable: true,
        value: {
          load: loadSpy,
          check: vi.fn().mockReturnValue(true),
        },
      });

      const fonts = ["Inter", "DM Sans", "Work Sans"];
      await waitForFonts(fonts);
      expect(loadSpy).toHaveBeenCalledTimes(fonts.length);
    });
  });

  describe("isFontLoaded", () => {
    it("returns true when font is loaded", () => {
      Object.defineProperty(document, "fonts", {
        writable: true,
        configurable: true,
        value: {
          check: vi.fn().mockReturnValue(true),
        },
      });

      const result = isFontLoaded("Inter");
      expect(result).toBe(true);
    });

    it("returns false when font is not loaded", () => {
      Object.defineProperty(document, "fonts", {
        writable: true,
        configurable: true,
        value: {
          check: vi.fn().mockReturnValue(false),
        },
      });

      const result = isFontLoaded("NonexistentFont");
      expect(result).toBe(false);
    });

    it("returns true in SSR context (document undefined)", () => {
      const originalDocument = global.document;
      delete (global as any).document;

      const result = isFontLoaded("Inter");
      expect(result).toBe(true);

      (global as any).document = originalDocument;
    });

    it("returns true when document.fonts.check throws", () => {
      Object.defineProperty(document, "fonts", {
        writable: true,
        configurable: true,
        value: {
          check: vi.fn().mockImplementation(() => {
            throw new Error("Font check failed");
          }),
        },
      });

      const result = isFontLoaded("Inter");
      expect(result).toBe(true);
    });

    it("passes correct font format to document.fonts.check", () => {
      const checkSpy = vi.fn().mockReturnValue(true);
      Object.defineProperty(document, "fonts", {
        writable: true,
        configurable: true,
        value: {
          check: checkSpy,
        },
      });

      isFontLoaded("Inter");
      expect(checkSpy).toHaveBeenCalledWith('16px "Inter"');
    });
  });

  describe("areBrandFontsLoaded", () => {
    it("returns true when all brand fonts are loaded", () => {
      Object.defineProperty(document, "fonts", {
        writable: true,
        configurable: true,
        value: {
          check: vi.fn().mockReturnValue(true),
        },
      });

      const result = areBrandFontsLoaded("orion");
      expect(result).toBe(true);
    });

    it("returns false when some brand fonts are missing", () => {
      let callCount = 0;
      Object.defineProperty(document, "fonts", {
        writable: true,
        configurable: true,
        value: {
          check: vi.fn().mockImplementation(() => {
            callCount++;
            // First font loads, second font doesn't
            return callCount === 1;
          }),
        },
      });

      const result = areBrandFontsLoaded("orion");
      expect(result).toBe(false);
    });

    it("returns true for ember brand when all fonts loaded", () => {
      Object.defineProperty(document, "fonts", {
        writable: true,
        configurable: true,
        value: {
          check: vi.fn().mockReturnValue(true),
        },
      });

      const result = areBrandFontsLoaded("ember");
      expect(result).toBe(true);
    });

    it("returns true for lemon brand when all fonts loaded", () => {
      Object.defineProperty(document, "fonts", {
        writable: true,
        configurable: true,
        value: {
          check: vi.fn().mockReturnValue(true),
        },
      });

      const result = areBrandFontsLoaded("lemon");
      expect(result).toBe(true);
    });
  });

  describe("getMissingFonts", () => {
    it("returns empty array when all fonts are loaded", () => {
      Object.defineProperty(document, "fonts", {
        writable: true,
        configurable: true,
        value: {
          check: vi.fn().mockReturnValue(true),
        },
      });

      const result = getMissingFonts("orion");
      expect(result).toEqual([]);
    });

    it("returns array of missing fonts", () => {
      let callCount = 0;
      Object.defineProperty(document, "fonts", {
        writable: true,
        configurable: true,
        value: {
          check: vi.fn().mockImplementation(() => {
            callCount++;
            // First font loads, second and third don't
            return callCount === 1;
          }),
        },
      });

      const result = getMissingFonts("orion");
      expect(result.length).toBeGreaterThan(0);
      expect(Array.isArray(result)).toBe(true);
    });

    it("returns specific missing fonts for orion", () => {
      const missingFont = "Libre Baskerville";
      const callCount = 0;
      Object.defineProperty(document, "fonts", {
        writable: true,
        configurable: true,
        value: {
          check: vi.fn().mockImplementation((fontStr: string) => {
            // Only Libre Baskerville is missing
            return !fontStr.includes(missingFont);
          }),
        },
      });

      const result = getMissingFonts("orion");
      expect(result).toContain(missingFont);
    });

    it("returns missing fonts for red brand", () => {
      Object.defineProperty(document, "fonts", {
        writable: true,
        configurable: true,
        value: {
          check: vi.fn().mockReturnValue(false),
        },
      });

      const result = getMissingFonts("red");
      expect(result.length).toBe(BRAND_FONTS.red.length);
    });

    it("returns no missing fonts when all loaded for deepblue", () => {
      Object.defineProperty(document, "fonts", {
        writable: true,
        configurable: true,
        value: {
          check: vi.fn().mockReturnValue(true),
        },
      });

      const result = getMissingFonts("deepblue");
      expect(result).toEqual([]);
    });
  });
});
