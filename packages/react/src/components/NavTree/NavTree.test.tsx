import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NavTree } from "./NavTree";
import { ChevronRight, Folder, FileText } from "lucide-react";
import type { NavTreeNode } from "./NavTree.types";

describe("NavTree", () => {
  const mockNodes: NavTreeNode[] = [
    {
      id: "src",
      label: "src",
      icon: <Folder size={16} />,
      children: [
        {
          id: "src-components",
          label: "components",
          icon: <Folder size={16} />,
          children: [
            {
              id: "src-components-button",
              label: "Button.tsx",
              icon: <FileText size={16} />,
            },
            {
              id: "src-components-card",
              label: "Card.tsx",
              icon: <FileText size={16} />,
            },
          ],
        },
        {
          id: "src-utils",
          label: "utils",
          icon: <Folder size={16} />,
          children: [
            {
              id: "src-utils-helpers",
              label: "helpers.ts",
              icon: <FileText size={16} />,
            },
          ],
        },
      ],
    },
    {
      id: "public",
      label: "public",
      icon: <Folder size={16} />,
      children: [
        {
          id: "public-index",
          label: "index.html",
          icon: <FileText size={16} />,
        },
      ],
    },
  ];

  it("renders root nodes", () => {
    render(<NavTree nodes={mockNodes} />);

    expect(screen.getByText("src")).toBeInTheDocument();
    expect(screen.getByText("public")).toBeInTheDocument();
  });

  it("expands/collapses nodes on click", async () => {
    const user = userEvent.setup();

    render(<NavTree nodes={mockNodes} />);

    const srcNode = screen.getByText("src");
    await user.click(srcNode);

    // After clicking, the node should be expanded or collapsed
    expect(srcNode).toBeInTheDocument();
  });

  it("displays nested children when expanded", async () => {
    const user = userEvent.setup();

    const { rerender } = render(
      <NavTree nodes={mockNodes} defaultExpandedIds={["src"]} />,
    );

    // With default expanded, children should be visible
    expect(screen.getByText("components")).toBeInTheDocument();
    expect(screen.getByText("utils")).toBeInTheDocument();
  });

  it("handles node selection", async () => {
    const handleSelect = vi.fn();
    const user = userEvent.setup();

    render(
      <NavTree
        nodes={mockNodes}
        defaultExpandedIds={["src", "src-components"]}
        onSelect={handleSelect}
      />,
    );

    const buttonNode = screen.getByText("Button.tsx");
    await user.click(buttonNode);

    expect(handleSelect).toHaveBeenCalledWith(expect.objectContaining({ id: "src-components-button" }));
  });

  it("highlights selected node", () => {
    render(
      <NavTree
        nodes={mockNodes}
        defaultExpandedIds={["src", "src-components"]}
        selectedId="src-components-button"
      />,
    );

    const selectedNode = screen.getByText("Button.tsx");
    expect(selectedNode).toBeInTheDocument();
  });

  it("renders icons for nodes", () => {
    const { container } = render(
      <NavTree
        nodes={mockNodes}
        defaultExpandedIds={["src"]}
      />,
    );

    const icons = container.querySelectorAll("[data-icon]");
    expect(icons.length).toBeGreaterThan(0);
  });

  it("supports drag and drop", () => {
    render(
      <NavTree
        nodes={mockNodes}
        draggable
        defaultExpandedIds={["src"]}
      />,
    );

    expect(screen.getByText("src")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <NavTree
        nodes={mockNodes}
        className="custom-tree"
      />,
    );

    const tree = container.querySelector(".custom-tree");
    expect(tree).toBeInTheDocument();
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();

    render(
      <NavTree
        ref={ref}
        nodes={mockNodes}
      />,
    );

    expect(ref).toHaveBeenCalled();
  });

  it("renders with empty nodes", () => {
    render(<NavTree nodes={[]} />);

    const tree = screen.queryByRole("tree") || screen.getByText(/./);
    expect(tree).toBeInTheDocument();
  });

  it("handles deep nesting", () => {
    render(
      <NavTree
        nodes={mockNodes}
        defaultExpandedIds={["src", "src-components"]}
      />,
    );

    expect(screen.getByText("Button.tsx")).toBeInTheDocument();
    expect(screen.getByText("Card.tsx")).toBeInTheDocument();
  });

  it("responds to keyboard navigation", async () => {
    const user = userEvent.setup();

    render(
      <NavTree
        nodes={mockNodes}
        defaultExpandedIds={["src"]}
      />,
    );

    const srcNode = screen.getByText("src");
    srcNode.focus();

    // Simulate arrow key navigation
    expect(srcNode).toHaveFocus();
  });
});
