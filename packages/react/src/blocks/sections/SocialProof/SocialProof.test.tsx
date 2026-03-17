import { describe, it, expect } from "vitest";
import { SocialProof } from "./SocialProof";

describe("SocialProof", () => {
  it("exports SocialProof component", () => {
    expect(SocialProof).toBeDefined();
  });

  it("has correct component name", () => {
    expect(SocialProof.displayName || SocialProof.name).toBe("SocialProof");
  });

  it("is a forwardRef component", () => {
    expect(SocialProof.$$typeof).toBeDefined();
  });
});
