import { describe, it, expect } from "vitest";
import { SettingsLayout } from "./SettingsLayout";

describe("SettingsLayout", () => {
  it("exports SettingsLayout component", () => {
    expect(SettingsLayout).toBeDefined();
  });

  it("has correct component name", () => {
    expect(SettingsLayout.displayName || SettingsLayout.name).toBe(
      "SettingsLayout",
    );
  });

  it("is a forwardRef component", () => {
    expect(SettingsLayout.$$typeof).toBeDefined();
  });
});
