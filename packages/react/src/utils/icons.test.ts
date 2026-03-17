import { describe, it, expect } from "vitest";
import { Icons } from "./icons";

describe("icons utils", () => {
  it("exports Icons object", () => {
    expect(Icons).toBeDefined();
    expect(typeof Icons).toBe("object");
  });

  it("Icons object is not empty", () => {
    const iconKeys = Object.keys(Icons);
    expect(iconKeys.length).toBeGreaterThan(0);
  });

  it("Icons.Search exists", () => {
    expect(Icons.Search).toBeDefined();
    // React components can be objects (forwardRef) or functions
    expect(Icons.Search).toBeTruthy();
  });

  it("Icons.Menu exists", () => {
    expect(Icons.Menu).toBeDefined();
    // React components can be objects (forwardRef) or functions
    expect(Icons.Menu).toBeTruthy();
  });

  it("common icon components are available", () => {
    // Verify commonly used icons that are in the mock
    const commonIcons = ["Search", "Menu", "Plus", "Check", "X", "AlertCircle"];
    commonIcons.forEach((iconName) => {
      expect(Icons[iconName as keyof typeof Icons]).toBeDefined();
    });
  });

  it("all exported icon components are defined", () => {
    Object.values(Icons).forEach((icon) => {
      // React components can be functions or objects (forwardRef), just check they exist
      expect(icon).toBeTruthy();
    });
  });
});
