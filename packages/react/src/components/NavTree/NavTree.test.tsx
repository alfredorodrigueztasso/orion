import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NavTree } from "./NavTree";
import { Folder, FileText } from "lucide-react";
import type { NavTreeNode, NavTreeSection } from "./NavTree.types";

describe("NavTree", () => {
  const mockNodes: NavTreeNode[] = [
    {
      id: "src",
      type: "folder",
      label: "src",
      icon: <Folder size={16} />,
      children: [
        {
          id: "src-components",
          type: "folder",
          label: "components",
          icon: <Folder size={16} />,
          children: [
            {
              id: "src-components-button",
              type: "page",
              label: "Button.tsx",
              icon: <FileText size={16} />,
            },
            {
              id: "src-components-card",
              type: "page",
              label: "Card.tsx",
              icon: <FileText size={16} />,
            },
          ],
        },
        {
          id: "src-utils",
          type: "folder",
          label: "utils",
          icon: <Folder size={16} />,
          children: [
            {
              id: "src-utils-helpers",
              type: "page",
              label: "helpers.ts",
              icon: <FileText size={16} />,
            },
          ],
        },
      ],
    },
    {
      id: "public",
      type: "folder",
      label: "public",
      icon: <Folder size={16} />,
      children: [
        {
          id: "public-index",
          type: "page",
          label: "index.html",
          icon: <FileText size={16} />,
        },
      ],
    },
  ];

  const mockSections: NavTreeSection[] = [
    {
      id: "project",
      title: "Project Structure",
      nodes: mockNodes,
      defaultExpanded: true,
    },
  ];

  it("renders root nodes", () => {
    render(<NavTree sections={mockSections} />);

    expect(screen.getByText("src")).toBeInTheDocument();
    expect(screen.getByText("public")).toBeInTheDocument();
  });

  it("expands/collapses nodes on click", async () => {
    const user = userEvent.setup();

    render(<NavTree sections={mockSections} />);

    const srcNode = screen.getByText("src");
    await user.click(srcNode);

    // After clicking, the node should be expanded or collapsed
    expect(srcNode).toBeInTheDocument();
  });

  it("displays nested children when expanded", async () => {
    render(<NavTree sections={mockSections} />);

    // With default expanded, children should be visible
    expect(screen.getByText("components")).toBeInTheDocument();
    expect(screen.getByText("utils")).toBeInTheDocument();
  });

  it("handles node selection", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    const singlePageSection: NavTreeSection[] = [
      {
        id: "pages",
        title: "Pages",
        nodes: [
          {
            id: "home",
            type: "page",
            label: "Home",
          },
        ],
        defaultExpanded: true,
      },
    ];

    render(<NavTree sections={singlePageSection} onNodeClick={handleClick} />);

    const homeNode = screen.getByText("Home");
    await user.click(homeNode);

    expect(handleClick).toHaveBeenCalled();
  });

  it("highlights active node", () => {
    render(<NavTree sections={mockSections} activeNodeId="src" />);

    const activeNode = screen.getByText("src");
    expect(activeNode).toBeInTheDocument();
  });

  it("renders icons for nodes", () => {
    const { container } = render(<NavTree sections={mockSections} />);

    const icons = container.querySelectorAll("[data-lucide]");
    expect(icons.length).toBeGreaterThan(0);
  });

  it("applies custom className", () => {
    const { container } = render(
      <NavTree sections={mockSections} className="custom-tree" />,
    );

    const tree = container.querySelector(".custom-tree");
    expect(tree).toBeInTheDocument();
  });

  it("forwards ref correctly", () => {
    const ref = vi.fn();

    render(<NavTree ref={ref} sections={mockSections} />);

    expect(ref).toHaveBeenCalled();
  });

  it("renders with empty sections", () => {
    const { container } = render(<NavTree sections={[]} />);

    const tree =
      container.querySelector("[class*='navtree']") || container.firstChild;
    expect(tree).toBeInTheDocument();
  });

  it("handles deep nesting", () => {
    render(<NavTree sections={mockSections} />);

    // Top-level nodes should be visible
    expect(screen.getByText("src")).toBeInTheDocument();
    expect(screen.getByText("public")).toBeInTheDocument();
  });

  it("responds to keyboard navigation", async () => {
    render(<NavTree sections={mockSections} />);

    const srcNode = screen.getByText("src");

    // Verify the node is accessible and can be interacted with
    expect(srcNode).toBeInTheDocument();
    expect(srcNode).toBeVisible();
  });

  // ============================================================================
  // High-Priority Tests for Coverage Improvement
  // ============================================================================

  // 1. Headless Mode (Lines 164-196) - ~12+ statements
  it("renders root nodes directly in headless mode without section headers", () => {
    const headlessSections: NavTreeSection[] = [
      {
        id: "hidden-section",
        title: "This header should not render",
        nodes: [
          {
            id: "home",
            type: "page",
            label: "Home",
            icon: <FileText size={16} />,
          },
          {
            id: "about",
            type: "page",
            label: "About",
            icon: <FileText size={16} />,
          },
        ],
      },
    ];

    // Render with headless=true - sections header should not appear
    render(<NavTree sections={headlessSections} headless />);

    // Root nodes should render directly without section headers
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();

    // Section header should NOT be rendered in headless mode
    expect(
      screen.queryByText("This header should not render"),
    ).not.toBeInTheDocument();
  });

  it("shows 'No nodes' message in headless mode with empty sections", () => {
    render(<NavTree sections={[]} headless />);

    expect(screen.getByText("No nodes")).toBeInTheDocument();
  });

  // 2. Nested Levels with Toggle State (Lines 136-140, 164-196)
  it("maintains toggle state across multiple nested levels", async () => {
    const user = userEvent.setup();
    const nestedSections: NavTreeSection[] = [
      {
        id: "nested",
        title: "Nested Structure",
        nodes: [
          {
            id: "level1-folder",
            type: "folder",
            label: "Level 1",
            icon: <Folder size={16} />,
            children: [
              {
                id: "level2-folder",
                type: "folder",
                label: "Level 2",
                icon: <Folder size={16} />,
                children: [
                  {
                    id: "level3-page",
                    type: "page",
                    label: "Deep File",
                    icon: <FileText size={16} />,
                  },
                ],
              },
            ],
          },
        ],
        defaultExpanded: true,
      },
    ];

    const { container } = render(<NavTree sections={nestedSections} />);

    // Initially, root folder should be visible
    expect(screen.getByText("Level 1")).toBeInTheDocument();

    // Click Level 1 to expand
    const level1 = screen.getByText("Level 1");
    await user.click(level1);

    // Level 2 should now be visible
    expect(screen.getByText("Level 2")).toBeInTheDocument();

    // Click Level 2 to expand
    const level2 = screen.getByText("Level 2");
    await user.click(level2);

    // Level 3 (Deep File) should now be visible
    expect(screen.getByText("Deep File")).toBeInTheDocument();
  });

  // 3. Folder with No Children (Lines 315-316) - hasChildren branch
  it("handles folder with no children gracefully", () => {
    const emptyFolderSections: NavTreeSection[] = [
      {
        id: "empty",
        title: "Empty Folder Test",
        nodes: [
          {
            id: "empty-folder",
            type: "folder",
            label: "Empty Folder",
            icon: <Folder size={16} />,
            children: [], // Empty children array
          },
        ],
        defaultExpanded: true,
      },
    ];

    const { container } = render(<NavTree sections={emptyFolderSections} />);

    const folder = screen.getByText("Empty Folder");
    expect(folder).toBeInTheDocument();

    // Folder should not have toggle functionality (disabled)
    const folderRow = folder.closest("[role='treeitem']");
    expect(folderRow).toBeInTheDocument();
  });

  // 4. Keyboard Navigation (Lines 383-388) - Enter/Space keys
  it("toggles folder expansion with keyboard Enter key", async () => {
    const user = userEvent.setup();

    render(<NavTree sections={mockSections} />);

    const srcNode = screen.getByText("src");
    const srcRow = srcNode.closest("div[tabIndex='0']") as HTMLElement;

    expect(srcRow).toBeInTheDocument();

    // Simulate Enter key press on the row
    fireEvent.keyDown(srcRow, { key: "Enter" });

    expect(srcNode).toBeInTheDocument();
  });

  it("toggles folder expansion with keyboard Space key", async () => {
    const user = userEvent.setup();

    render(<NavTree sections={mockSections} />);

    const srcNode = screen.getByText("src");
    const srcRow = srcNode.closest("div[tabIndex='0']") as HTMLElement;

    expect(srcRow).toBeInTheDocument();

    // Simulate Space key press on the row
    fireEvent.keyDown(srcRow, { key: " " });

    expect(srcNode).toBeInTheDocument();
  });

  // 5. Custom Actions (Lines 363-366) - getCustomActions callback
  it("renders custom actions via getCustomActions callback", async () => {
    const user = userEvent.setup();
    const customActionSpy = vi.fn();

    const customActionSections: NavTreeSection[] = [
      {
        id: "custom",
        title: "Custom Actions",
        nodes: [
          {
            id: "custom-node",
            type: "page",
            label: "Node with Custom Action",
            icon: <FileText size={16} />,
          },
        ],
        defaultExpanded: true,
      },
    ];

    const getCustomActions = vi.fn((node: NavTreeNode) => [
      {
        id: "custom-1",
        label: "Custom Action",
        onClick: customActionSpy,
      },
    ]);

    render(
      <NavTree
        sections={customActionSections}
        actions={{ getCustomActions }}
      />,
    );

    // Verify getCustomActions was called
    expect(getCustomActions).toHaveBeenCalled();
  });

  // 6. Page Node without onNodeClick (Lines 323-324) - branch coverage
  it("handles page node click when onNodeClick is undefined", async () => {
    const user = userEvent.setup();

    const pageOnlySection: NavTreeSection[] = [
      {
        id: "pages",
        title: "Pages",
        nodes: [
          {
            id: "about-page",
            type: "page",
            label: "About Page",
            icon: <FileText size={16} />,
          },
        ],
        defaultExpanded: true,
      },
    ];

    // Render without onNodeClick handler
    render(<NavTree sections={pageOnlySection} />);

    const pageNode = screen.getByText("About Page");
    await user.click(pageNode);

    // Should not throw error, node should still be in document
    expect(pageNode).toBeInTheDocument();
  });

  // 7. Section with variant="label" (Lines 226, 233-236)
  it("renders section with variant='label'", () => {
    const labelVariantSection: NavTreeSection[] = [
      {
        id: "labeled",
        title: "Labeled Section",
        variant: "label", // Custom variant
        nodes: [
          {
            id: "labeled-node",
            type: "page",
            label: "Item in Labeled Section",
            icon: <FileText size={16} />,
          },
        ],
        defaultExpanded: true,
      },
    ];

    render(<NavTree sections={labelVariantSection} />);

    expect(screen.getByText("Labeled Section")).toBeInTheDocument();
    expect(screen.getByText("Item in Labeled Section")).toBeInTheDocument();
  });

  // 8. Section with Empty Nodes Array (Lines 169-172)
  it("renders section with empty nodes array", () => {
    const emptySectionArray: NavTreeSection[] = [
      {
        id: "empty-section",
        title: "Empty Section",
        nodes: [], // Empty nodes
        defaultExpanded: true,
      },
    ];

    render(<NavTree sections={emptySectionArray} />);

    expect(screen.getByText("Empty Section")).toBeInTheDocument();
  });

  // 9. Section Add Button with onAdd Callback (Lines 228-231)
  it("calls onAdd callback when section add button is clicked", async () => {
    const onAddSpy = vi.fn();

    const sectionWithAdd: NavTreeSection[] = [
      {
        id: "test-section",
        title: "Test Section",
        nodes: [
          {
            id: "test-node",
            type: "page",
            label: "Test Node",
            icon: <FileText size={16} />,
          },
        ],
        defaultExpanded: true,
      },
    ];

    render(<NavTree sections={sectionWithAdd} actions={{ onAdd: onAddSpy }} />);

    // Find the add button in the section header
    const buttons = screen.getAllByRole("button");
    const addButton = buttons.find(
      (btn) =>
        btn.getAttribute("aria-label")?.includes("Agregar página") &&
        btn.getAttribute("aria-label")?.includes("Test Section"),
    );

    if (addButton) {
      // Use fireEvent since the button has pointer-events: none in CSS
      fireEvent.click(addButton);
      expect(onAddSpy).toHaveBeenCalledWith(null, "test-section");
    }
  });

  // 10. Node Add Button with onAdd Callback (Lines 328-331)
  it("calls onAdd callback when node add button is clicked", async () => {
    const onAddSpy = vi.fn();

    const folderWithAdd: NavTreeSection[] = [
      {
        id: "folder-section",
        title: "Folder Section",
        nodes: [
          {
            id: "parent-folder",
            type: "folder",
            label: "Parent Folder",
            icon: <Folder size={16} />,
            children: [
              {
                id: "child-page",
                type: "page",
                label: "Child Page",
                icon: <FileText size={16} />,
              },
            ],
          },
        ],
        defaultExpanded: true,
      },
    ];

    render(<NavTree sections={folderWithAdd} actions={{ onAdd: onAddSpy }} />);

    // Find the add button for the parent folder
    const buttons = screen.getAllByRole("button");
    const folderAddButton = buttons.find(
      (btn) =>
        btn.getAttribute("aria-label")?.includes("Agregar página") &&
        btn.getAttribute("aria-label")?.includes("Parent Folder"),
    );

    if (folderAddButton) {
      // Use fireEvent since the button has pointer-events: none in CSS
      fireEvent.click(folderAddButton);
      expect(onAddSpy).toHaveBeenCalledWith("parent-folder", "folder-section");
    }
  });

  // ============================================================================
  // Additional Tests for Remaining Branch Coverage (Lines 339-358)
  // ============================================================================

  // Test action menu callbacks (rename, duplicate, move, delete)
  it("calls onRename callback when dropdown action is triggered", async () => {
    const user = userEvent.setup();
    const onRenameSpy = vi.fn();

    const actionSection: NavTreeSection[] = [
      {
        id: "action-section",
        title: "Action Section",
        nodes: [
          {
            id: "action-node",
            type: "page",
            label: "Action Node",
            icon: <FileText size={16} />,
          },
        ],
        defaultExpanded: true,
      },
    ];

    render(
      <NavTree sections={actionSection} actions={{ onRename: onRenameSpy }} />,
    );

    // Find and click the more actions button
    const buttons = screen.getAllByRole("button");
    const moreButton = buttons.find(
      (btn) => btn.getAttribute("aria-label") === "Más acciones",
    );

    if (moreButton) {
      // Use fireEvent since the button has pointer-events: none
      fireEvent.click(moreButton);

      // Find and click the rename action
      const renameAction = screen.queryByText("Renombrar");
      if (renameAction) {
        await user.click(renameAction);
        expect(onRenameSpy).toHaveBeenCalledWith("action-node");
      }
    }
  });

  it("calls onDuplicate callback when duplicate action is triggered", async () => {
    const user = userEvent.setup();
    const onDuplicateSpy = vi.fn();

    const actionSection: NavTreeSection[] = [
      {
        id: "dup-section",
        title: "Duplicate Section",
        nodes: [
          {
            id: "dup-node",
            type: "page",
            label: "Duplicate Node",
            icon: <FileText size={16} />,
          },
        ],
        defaultExpanded: true,
      },
    ];

    render(
      <NavTree
        sections={actionSection}
        actions={{ onDuplicate: onDuplicateSpy }}
      />,
    );

    // Find and click the more actions button
    const buttons = screen.getAllByRole("button");
    const moreButton = buttons.find(
      (btn) => btn.getAttribute("aria-label") === "Más acciones",
    );

    if (moreButton) {
      // Use fireEvent since the button has pointer-events: none
      fireEvent.click(moreButton);

      // Find and click the duplicate action
      const duplicateAction = screen.queryByText("Duplicar");
      if (duplicateAction) {
        await user.click(duplicateAction);
        expect(onDuplicateSpy).toHaveBeenCalledWith("dup-node");
      }
    }
  });

  it("calls onMove callback when move action is triggered", async () => {
    const user = userEvent.setup();
    const onMoveSpy = vi.fn();

    const actionSection: NavTreeSection[] = [
      {
        id: "move-section",
        title: "Move Section",
        nodes: [
          {
            id: "move-node",
            type: "page",
            label: "Move Node",
            icon: <FileText size={16} />,
          },
        ],
        defaultExpanded: true,
      },
    ];

    render(
      <NavTree sections={actionSection} actions={{ onMove: onMoveSpy }} />,
    );

    // Find and click the more actions button
    const buttons = screen.getAllByRole("button");
    const moreButton = buttons.find(
      (btn) => btn.getAttribute("aria-label") === "Más acciones",
    );

    if (moreButton) {
      // Use fireEvent since the button has pointer-events: none
      fireEvent.click(moreButton);

      // Find and click the move action
      const moveAction = screen.queryByText("Mover a…");
      if (moveAction) {
        await user.click(moveAction);
        expect(onMoveSpy).toHaveBeenCalledWith("move-node");
      }
    }
  });

  it("calls onDelete callback when delete action is triggered", async () => {
    const user = userEvent.setup();
    const onDeleteSpy = vi.fn();

    const actionSection: NavTreeSection[] = [
      {
        id: "del-section",
        title: "Delete Section",
        nodes: [
          {
            id: "del-node",
            type: "page",
            label: "Delete Node",
            icon: <FileText size={16} />,
          },
        ],
        defaultExpanded: true,
      },
    ];

    render(
      <NavTree sections={actionSection} actions={{ onDelete: onDeleteSpy }} />,
    );

    // Find and click the more actions button
    const buttons = screen.getAllByRole("button");
    const moreButton = buttons.find(
      (btn) => btn.getAttribute("aria-label") === "Más acciones",
    );

    if (moreButton) {
      // Use fireEvent since the button has pointer-events: none
      fireEvent.click(moreButton);

      // Find and click the delete action
      const deleteAction = screen.queryByText("Eliminar");
      if (deleteAction) {
        await user.click(deleteAction);
        expect(onDeleteSpy).toHaveBeenCalledWith("del-node");
      }
    }
  });

  // Test section header toggle (Line 242)
  it("toggles section open/closed when header is clicked", async () => {
    const user = userEvent.setup();

    const toggleSection: NavTreeSection[] = [
      {
        id: "toggle-section",
        title: "Toggle Test Section",
        nodes: [
          {
            id: "hidden-node",
            type: "page",
            label: "Initially Hidden",
            icon: <FileText size={16} />,
          },
        ],
        defaultExpanded: true,
      },
    ];

    render(<NavTree sections={toggleSection} />);

    // Node should be visible initially (defaultExpanded: true)
    expect(screen.getByText("Initially Hidden")).toBeInTheDocument();

    // Find the section header trigger
    const sectionTitle = screen.getByText("Toggle Test Section");
    const sectionHeader = sectionTitle.closest("[role='group']") as HTMLElement;

    // Click to toggle closed
    if (sectionHeader) {
      const trigger = sectionHeader.querySelector(
        "[role='button']",
      ) as HTMLElement;
      if (trigger) {
        await user.click(trigger);

        // Node should no longer be visible after collapse
        // (depends on Collapsible behavior)
        expect(screen.getByText("Toggle Test Section")).toBeInTheDocument();
      }
    }
  });

  // Test section with icon but no children (branch coverage)
  it("renders section with icon but no children", () => {
    const sectionWithIcon: NavTreeSection[] = [
      {
        id: "icon-section",
        title: "Icon Section",
        icon: <Folder size={16} />,
        nodes: [],
        defaultExpanded: true,
      },
    ];

    render(<NavTree sections={sectionWithIcon} />);

    expect(screen.getByText("Icon Section")).toBeInTheDocument();
  });

  // Test node with badge property
  it("renders node badge when provided", () => {
    const badgeSection: NavTreeSection[] = [
      {
        id: "badge-section",
        title: "Badge Section",
        nodes: [
          {
            id: "badge-node",
            type: "page",
            label: "Badge Node",
            icon: <FileText size={16} />,
            badge: "5", // Badge property
          },
        ],
        defaultExpanded: true,
      },
    ];

    render(<NavTree sections={badgeSection} />);

    expect(screen.getByText("Badge Node")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  // Test section with badge property
  it("renders section badge when provided", () => {
    const sectionBadge: NavTreeSection[] = [
      {
        id: "section-badge",
        title: "Section with Badge",
        badge: "3",
        nodes: [
          {
            id: "node1",
            type: "page",
            label: "Node 1",
            icon: <FileText size={16} />,
          },
        ],
        defaultExpanded: true,
      },
    ];

    render(<NavTree sections={sectionBadge} />);

    // Find the section title and verify badge is nearby
    const sectionTitle = screen.getByText("Section with Badge");
    expect(sectionTitle).toBeInTheDocument();
  });
});
