import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PageHeader } from "./PageHeader";

describe("PageHeader", () => {
  it("renders title", () => {
    render(
      <PageHeader title="Settings" description="Manage your preferences" />,
    );

    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("displays description", () => {
    render(
      <PageHeader title="Settings" description="Manage your preferences" />,
    );

    expect(screen.getByText("Manage your preferences")).toBeInTheDocument();
  });

  it("renders action buttons", () => {
    render(
      <PageHeader
        title="Settings"
        actions={[{ label: "Save", onClick: () => {} }]}
      />,
    );

    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  it("renders breadcrumbs", () => {
    render(
      <PageHeader
        title="Settings"
        breadcrumbs={[{ label: "Home", href: "/" }]}
      />,
    );

    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();
    render(
      <PageHeader ref={ref} title="Settings" />,
    );

    expect(ref).toHaveBeenCalled();
  });
});

import { vi } from "vitest";
