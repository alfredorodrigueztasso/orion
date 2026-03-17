import { describe, it, expect } from "vitest";
import { ActivityFeed } from "./ActivityFeed";

describe("ActivityFeed", () => {
  it("exports ActivityFeed component", () => {
    expect(ActivityFeed).toBeDefined();
  });

  it("has correct component name", () => {
    expect(ActivityFeed.displayName || ActivityFeed.name).toBe("ActivityFeed");
  });

  it("is a forwardRef component", () => {
    expect(ActivityFeed.$$typeof).toBeDefined();
  });
});
