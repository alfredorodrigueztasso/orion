import { describe, it, expect } from "vitest";
import { AgentWorkspace } from "./AgentWorkspace";

describe("AgentWorkspace", () => {
  it("exports AgentWorkspace component", () => {
    expect(AgentWorkspace).toBeDefined();
  });

  it("has correct component name", () => {
    expect(AgentWorkspace.displayName || AgentWorkspace.name).toBe(
      "AgentWorkspace",
    );
  });

  it("is a forwardRef component", () => {
    expect(AgentWorkspace.$$typeof).toBeDefined();
  });
});
