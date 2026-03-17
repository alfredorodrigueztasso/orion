import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  warnMissingAriaLabel,
  warnBrandProp,
  warnThemeProp,
  warnGlassVariant,
  warnHardcodedColors,
  warnFieldChildren,
  warnUsePrebuiltSection,
} from "./validation";

describe("validation utils", () => {
  let consoleWarnSpy: any;

  beforeEach(() => {
    consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleWarnSpy.mockRestore();
  });

  describe("warnMissingAriaLabel", () => {
    it("warns when icon-only button has no aria-label", () => {
      warnMissingAriaLabel("Button", true, false);
      expect(consoleWarnSpy).toHaveBeenCalled();
    });

    it("does not warn when aria-label is present", () => {
      warnMissingAriaLabel("Button", true, true);
      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });

    it("does not warn when not icon-only", () => {
      warnMissingAriaLabel("Button", false, false);
      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });
  });

  describe("warnBrandProp", () => {
    it("warns when component has brand prop", () => {
      warnBrandProp("Button", true);
      expect(consoleWarnSpy).toHaveBeenCalled();
    });

    it("does not warn when no brand prop", () => {
      warnBrandProp("Button", false);
      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });
  });

  describe("warnThemeProp", () => {
    it("warns when component has theme prop", () => {
      warnThemeProp("Button", true);
      expect(consoleWarnSpy).toHaveBeenCalled();
    });

    it("does not warn when no theme prop", () => {
      warnThemeProp("Button", false);
      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });
  });

  describe("warnGlassVariant", () => {
    beforeEach(() => {
      document.documentElement.removeAttribute("data-mode");
    });

    it("warns when glass variant used in non-display mode", () => {
      document.documentElement.setAttribute("data-mode", "product");
      warnGlassVariant("Card", "glass");
      expect(consoleWarnSpy).toHaveBeenCalled();
    });

    it("does not warn when glass variant in display mode", () => {
      document.documentElement.setAttribute("data-mode", "display");
      warnGlassVariant("Card", "glass");
      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });

    it("does not warn for non-glass variant", () => {
      warnGlassVariant("Card", "solid");
      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });
  });

  describe("warnHardcodedColors", () => {
    it("warns for hardcoded hex color", () => {
      warnHardcodedColors("Button", { color: "#FF0000" });
      expect(consoleWarnSpy).toHaveBeenCalled();
    });

    it("warns for hardcoded rgb color", () => {
      warnHardcodedColors("Button", { color: "rgb(255, 0, 0)" });
      expect(consoleWarnSpy).toHaveBeenCalled();
    });

    it("does not warn for CSS variable", () => {
      warnHardcodedColors("Button", { color: "var(--text-primary)" });
      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });

    it("checks backgroundColor", () => {
      warnHardcodedColors("Button", { backgroundColor: "#FF0000" });
      expect(consoleWarnSpy).toHaveBeenCalled();
    });

    it("checks borderColor", () => {
      warnHardcodedColors("Button", { borderColor: "rgb(0, 0, 255)" });
      expect(consoleWarnSpy).toHaveBeenCalled();
    });
  });

  describe("warnFieldChildren", () => {
    it("warns when Field has children", () => {
      warnFieldChildren(true);
      expect(consoleWarnSpy).toHaveBeenCalled();
    });

    it("does not warn without children", () => {
      warnFieldChildren(false);
      expect(consoleWarnSpy).not.toHaveBeenCalled();
    });
  });

  describe("warnUsePrebuiltSection", () => {
    it("suggests using prebuilt section", () => {
      warnUsePrebuiltSection("CustomCard", "Card");
      expect(consoleWarnSpy).toHaveBeenCalled();
    });
  });
});
