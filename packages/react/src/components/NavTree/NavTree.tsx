"use client";

/**
 * NavTree Component
 *
 * A Notion-style hierarchical navigation sidebar with collapsible sections,
 * folders, pages, and per-row context menu actions.
 *
 * @example
 * ```tsx
 * import { NavTree } from '@orion-ds/react/sections';
 *
 * const sections = [
 *   {
 *     id: 'essentials',
 *     title: 'Lo esencial',
 *     nodes: [
 *       { id: 'home', type: 'page', label: 'Home', href: '/' },
 *       {
 *         id: 'docs',
 *         type: 'folder',
 *         label: 'Documentation',
 *         children: [
 *           { id: 'guide', type: 'page', label: 'Getting Started', href: '/docs' }
 *         ]
 *       }
 *     ]
 *   }
 * ];
 *
 * function App() {
 *   return (
 *     <NavTree
 *       sections={sections}
 *       activeNodeId="home"
 *       onNodeClick={(node) => navigate(node.href!)}
 *       actions={{
 *         onDelete: (nodeId) => console.log('delete', nodeId)
 *       }}
 *       header={<Logo />}
 *     />
 *   );
 * }
 * ```
 */

import {
  createContext,
  useContext,
  forwardRef,
  CSSProperties,
  useMemo,
} from "react";
import {
  ChevronRight,
  Plus,
  MoreHorizontal,
  Copy,
  FolderSymlink,
  Pencil,
  Trash2,
} from "lucide-react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Collapsible } from "../../components/Collapsible";
import { Dropdown } from "../../components/Dropdown";
import { Button } from "../../components/Button";
import type {
  NavTreeProps,
  NavTreeNode,
  NavTreeSection,
  NavTreeContextValue,
} from "./NavTree.types";
import type { DropdownItem } from "../../components/Dropdown";
import styles from "./NavTree.module.css";

/* ============================================================================
   NavTreeContext
   ============================================================================ */

const NavTreeContext = createContext<NavTreeContextValue | undefined>(
  undefined,
);

function useNavTreeContext() {
  const context = useContext(NavTreeContext);
  if (!context) {
    throw new Error("useNavTreeContext must be used within NavTree");
  }
  return context;
}

/* ============================================================================
   NavTree (Root Component)
   ============================================================================ */

/**
 * Notion-style navigation tree component
 */
export const NavTree = forwardRef<HTMLDivElement, NavTreeProps>(
  (
    {
      sections,
      activeNodeId,
      onNodeClick,
      actions,
      persistKey = "orion-nav-tree",
      header,
      footer,
      width = 240,
      className,
      headless = false,
    },
    ref,
  ) => {
    // Initialize localStorage for open sections and nodes
    const defaultOpenSections = useMemo(
      () =>
        sections.filter((s) => s.defaultExpanded !== false).map((s) => s.id),
      [sections],
    );

    const [openSectionIds, setOpenSectionIds] = useLocalStorage<string[]>(
      `${persistKey}-sections`,
      defaultOpenSections,
    );

    const [openNodeIds, setOpenNodeIds] = useLocalStorage<string[]>(
      `${persistKey}-nodes`,
      [],
    );

    const toggleSection = (id: string) => {
      setOpenSectionIds((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
      );
    };

    const toggleNode = (id: string) => {
      setOpenNodeIds((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
      );
    };

    const isOpen = (id: string) => {
      if (id.startsWith("section-")) {
        return openSectionIds.includes(id.replace("section-", ""));
      }
      return openNodeIds.includes(id);
    };

    const contextValue: NavTreeContextValue = {
      activeNodeId,
      openSectionIds,
      openNodeIds,
      toggleSection,
      toggleNode,
      isOpen,
      onNodeClick,
      actionConfig: actions,
    };

    const navTreeStyle: CSSProperties = {
      width: typeof width === "number" ? `${width}px` : width,
    };

    // Collect all root nodes when in headless mode
    const allRootNodes = headless
      ? sections.flatMap((section) => section.nodes)
      : [];

    const isEmpty = headless
      ? allRootNodes.length === 0
      : sections.length === 0;
    const emptyMessage = headless ? "No nodes" : "No sections";

    return (
      <div
        ref={ref}
        className={`${styles.navTree} ${className || ""}`}
        style={navTreeStyle}
        role="tree"
      >
        {header && <div className={styles.header}>{header}</div>}

        <div className={styles.treeContent}>
          <NavTreeContext.Provider value={contextValue}>
            {isEmpty ? (
              <div className={styles.empty}>{emptyMessage}</div>
            ) : headless ? (
              // Headless mode: render root nodes directly without section headers
              allRootNodes.map((node) => (
                <NavTreeNodeRow
                  key={node.id}
                  node={node}
                  depth={0}
                  sectionId="" // No section context in headless mode
                />
              ))
            ) : (
              // Normal mode: render sections with collapsible headers
              sections.map((section) => (
                <NavTreeSectionBlock key={section.id} section={section} />
              ))
            )}
          </NavTreeContext.Provider>
        </div>

        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    );
  },
);

NavTree.displayName = "NavTree";

/* ============================================================================
   NavTreeSectionBlock (Section with Collapsible Header)
   ============================================================================ */

interface NavTreeSectionBlockProps {
  section: NavTreeSection;
}

function NavTreeSectionBlock({ section }: NavTreeSectionBlockProps) {
  const { isOpen, toggleSection, actionConfig } = useNavTreeContext();
  const sectionId = `section-${section.id}`;
  const open = isOpen(sectionId);
  const variant = section.variant ?? "node"; // Default to 'node'

  const handleSectionAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    actionConfig?.onAdd?.(null, section.id);
  };

  const titleClass =
    variant === "node" ? styles.sectionTitleNode : styles.sectionTitle;
  const headerClass =
    `${styles.sectionHeader} ${variant === "node" ? styles.sectionHeaderNode : ""}`.trim();

  return (
    <div className={styles.section} role="group">
      <Collapsible
        open={open}
        onOpenChange={() => toggleSection(section.id)}
        disabled={section.nodes.length === 0}
      >
        <Collapsible.Trigger asChild>
          <div className={headerClass}>
            {section.icon ? (
              <div className={styles.iconSlot}>
                <span className={styles.slotIcon}>{section.icon}</span>
                {section.nodes.length > 0 && (
                  <div
                    className={`${styles.slotChevron} ${open ? styles.slotChevronOpen : ""}`}
                  >
                    <ChevronRight size={16} />
                  </div>
                )}
              </div>
            ) : (
              section.nodes.length > 0 && (
                <ChevronRight
                  size={12}
                  className={`${styles.sectionChevron} ${open ? styles.sectionChevronOpen : ""}`}
                />
              )
            )}
            <span className={titleClass}>{section.title}</span>
            {section.badge !== undefined && (
              <span className={styles.sectionBadge}>{section.badge}</span>
            )}
            <div className={styles.sectionActions}>
              <Button
                variant="ghost"
                size="sm"
                iconOnly
                icon={<Plus size={12} />}
                onClick={handleSectionAdd}
                aria-label={`Agregar página en ${section.title}`}
                title={`Agregar página en ${section.title}`}
              />
            </div>
          </div>
        </Collapsible.Trigger>

        <Collapsible.Content>
          <div className={styles.sectionBody}>
            {section.nodes.map((node) => (
              <NavTreeNodeRow
                key={node.id}
                node={node}
                depth={0}
                sectionId={section.id}
              />
            ))}
          </div>
        </Collapsible.Content>
      </Collapsible>
    </div>
  );
}

/* ============================================================================
   NavTreeNodeRow (Recursive Node with Folder/Page Logic)
   ============================================================================ */

interface NavTreeNodeRowProps {
  node: NavTreeNode;
  depth: number;
  sectionId: string;
}

function NavTreeNodeRow({ node, depth, sectionId }: NavTreeNodeRowProps) {
  const { activeNodeId, isOpen, toggleNode, onNodeClick, actionConfig } =
    useNavTreeContext();

  const isFolder = node.type === "folder";
  const hasChildren = isFolder && node.children && node.children.length > 0;
  const open = isOpen(node.id);
  const isActive = activeNodeId === node.id;

  const handleRowClick = () => {
    if (isFolder) {
      toggleNode(node.id);
    } else if (onNodeClick) {
      onNodeClick(node);
    }
  };

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    actionConfig?.onAdd?.(isFolder ? node.id : null, sectionId);
  };

  // Build dropdown menu items
  const dropdownItems: DropdownItem[] = [
    {
      id: "rename",
      label: "Renombrar",
      icon: <Pencil size={14} />,
      onClick: () => actionConfig?.onRename?.(node.id),
    },
    {
      id: "duplicate",
      label: "Duplicar",
      icon: <Copy size={14} />,
      onClick: () => actionConfig?.onDuplicate?.(node.id),
    },
    {
      id: "move",
      label: "Mover a…",
      icon: <FolderSymlink size={14} />,
      onClick: () => actionConfig?.onMove?.(node.id),
    },
    {
      id: "delete",
      label: "Eliminar",
      icon: <Trash2 size={14} />,
      danger: true,
      onClick: () => actionConfig?.onDelete?.(node.id),
    },
  ];

  // Add custom actions if provided
  if (actionConfig?.getCustomActions) {
    const customActions = actionConfig.getCustomActions(node);
    dropdownItems.push(...customActions);
  }

  const nodePaddingStyle: CSSProperties = {
    paddingLeft: `calc(var(--spacing-2) * ${depth + 1})`,
  };

  return (
    <div
      className={styles.node}
      role="treeitem"
      aria-expanded={isFolder && open}
    >
      <div
        className={`${styles.nodeRow} ${isActive ? styles.nodeRowActive : ""} ${depth > 0 ? styles.nodeNested : ""}`}
        onClick={handleRowClick}
        style={nodePaddingStyle}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleRowClick();
          }
        }}
      >
        {node.icon ? (
          isFolder ? (
            <div className={styles.iconSlot}>
              <span className={styles.slotIcon}>{node.icon}</span>
              {hasChildren && (
                <div
                  className={`${styles.slotChevron} ${open ? styles.slotChevronOpen : ""}`}
                >
                  <ChevronRight size={16} />
                </div>
              )}
            </div>
          ) : (
            <div className={styles.iconSlot}>
              <span className={styles.slotIcon}>{node.icon}</span>
            </div>
          )
        ) : isFolder ? (
          <ChevronRight
            size={12}
            className={`${styles.nodeChevron} ${open ? styles.nodeChevronOpen : ""}`}
          />
        ) : (
          <div className={styles.nodeChevronHidden} />
        )}

        <span className={styles.nodeLabel}>{node.label}</span>

        {node.badge !== undefined && (
          <span className={styles.nodeBadge}>{node.badge}</span>
        )}

        <div className={styles.nodeActions}>
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            icon={<Plus size={14} />}
            onClick={handleAddClick}
            aria-label={`Agregar página en ${node.label}`}
            title={`Agregar página en ${node.label}`}
          />

          <Dropdown
            trigger={
              <Button
                variant="ghost"
                size="sm"
                iconOnly
                icon={<MoreHorizontal size={14} />}
                aria-label="Más acciones"
                title="Más acciones"
              />
            }
            items={dropdownItems}
            placement="bottom-end"
            minWidth={160}
          />
        </div>
      </div>

      {/* Render children if folder is open */}
      {isFolder && open && hasChildren && (
        <div className={styles.nodeChildren}>
          {node.children!.map((child) => (
            <NavTreeNodeRow
              key={child.id}
              node={child}
              depth={depth + 1}
              sectionId={sectionId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
