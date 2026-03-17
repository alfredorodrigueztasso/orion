import { describe, it, expect } from "vitest";
import { SettingsTemplate } from "./SettingsTemplate";

describe("SettingsTemplate", () => {
  it("exports SettingsTemplate component", () => {
    expect(SettingsTemplate).toBeDefined();
  });

  it("has correct component name", () => {
    expect(SettingsTemplate.displayName || SettingsTemplate.name).toBe(
      "SettingsTemplate",
    );
  });

  it("is a forwardRef component", () => {
    expect(SettingsTemplate.$$typeof).toBeDefined();
  });
});
