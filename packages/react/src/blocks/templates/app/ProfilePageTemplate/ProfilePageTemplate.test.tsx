import { describe, it, expect } from "vitest";
import { ProfilePageTemplate } from "./ProfilePageTemplate";

describe("ProfilePageTemplate", () => {
  it("exports ProfilePageTemplate component", () => {
    expect(ProfilePageTemplate).toBeDefined();
  });

  it("has correct component name", () => {
    expect(ProfilePageTemplate.displayName || ProfilePageTemplate.name).toBe(
      "ProfilePageTemplate",
    );
  });

  it("is a forwardRef component", () => {
    expect(ProfilePageTemplate.$$typeof).toBeDefined();
  });
});
