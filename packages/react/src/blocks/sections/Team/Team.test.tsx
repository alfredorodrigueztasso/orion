import { describe, it, expect } from "vitest";
import { Team } from "./Team";

describe("Team", () => {
  it("exports Team component", () => {
    expect(Team).toBeDefined();
  });

  it("has correct component name", () => {
    expect(Team.displayName || Team.name).toBe("Team");
  });

  it("is a forwardRef component", () => {
    expect(Team.$$typeof).toBeDefined();
  });
});
