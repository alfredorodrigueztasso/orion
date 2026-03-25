"use client";

/**
 * CollapsibleFolder Section
 *
 * Generic collapsible folder section for organizing items in a grid layout.
 * Supports native HTML5 drag & drop with visual feedback, sorting, and folder management actions.
 *
 * ## Drag & Drop Features
 * - **Drop target visual state**: Folder highlights when dragging items over it
 * - **Insertion indicator**: Dynamic line shows exactly where the item will be inserted
 * - **Automatic state cleanup**: Visual feedback clears when drag ends or user leaves folder
 * - **Empty folder support**: Shows centered insertion line for empty folders
 * - **Collapsed folder support**: Accepts drops even when folder is collapsed
 *
 * ## Customization
 * Use `renderItem` to render your custom items. See CollapsibleFolder stories and AgentFolder for examples.
 */

import React, { useRef, useState, useEffect } from "react";
import type { CollapsibleFolderProps } from "./CollapsibleFolder.types";
import { Collapsible } from "../../components/Collapsible";
import { Dropdown } from "../../components/Dropdown";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { ChevronDown, MoreHorizontal } from "lucide-react";
import { MissingDependencyError } from "../MissingDependencyError";
import {
  checkComponent,
  type OptionalDepError,
} from "../../utils/optionalDeps";
import styles from "./CollapsibleFolder.module.css";

// @dnd-kit imports with graceful error handling
let useDroppable: any;

if (typeof require !== "undefined") {
  try {
    const dndKit = require("@dnd-kit/core");
    useDroppable = dndKit.useDroppable;
  } catch (error) {
    // Fallback: require() can fail if @dnd-kit/core is not installed
    // Async validation will catch actual missing dependencies
  }
}

export function CollapsibleFolder<
  TItem extends { id: string; draggable?: boolean },
>(props: CollapsibleFolderProps<TItem>) {
  // FIRST: Props destructuring (needed for hook initialization)
  const {
    id,
    title,
    itemCount,
    items,
    renderItem,
    itemLabel = "Item",
    itemLabelPlural = "Items",
    emptyText = "No items in this folder",
    sortLabel = "Sort",
    defaultExpanded = true,
    sortOptions,
    selectedSort,
    onSortChange,
    onDrop,
    onFolderEdit,
    onFolderDelete,
    onFolderInvite,
    isDropTarget = false,
    isDropCompleted = false,
    onDragEnter,
    onDragLeaveFolder,
    className,
    ...rest
  } = props;

  // FIRST (continued): Declare ALL hooks and refs
  const [depError, setDepError] = useState<OptionalDepError | undefined>();
  const [isChecking, setIsChecking] = useState(true);
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [insertionIndex, setInsertionIndex] = useState<number | null>(null);
  const [isLocalDropTarget, setIsLocalDropTarget] = useState(false);

  const gridRef = useRef<HTMLDivElement>(null);
  const { setNodeRef } = useDroppable({ id });

  // SECOND: useEffect for dependency checking
  useEffect(() => {
    const checkDeps = async () => {
      try {
        const result = checkComponent("CollapsibleFolder");
        if (result instanceof Promise) {
          setDepError(await result);
        } else {
          setDepError(result);
        }
      } catch (error) {
        // Fallback: assume deps available (optimistic)
        setDepError(undefined);
      } finally {
        setIsChecking(false);
      }
    };

    checkDeps();
  }, []);

  // THIRD: Conditional rendering AFTER all hooks
  if (depError) {
    return <MissingDependencyError {...depError} />;
  }

  if (isChecking) {
    return <div>Loading folder...</div>;
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";

    // Notify parent that drag is over this folder
    if (!isLocalDropTarget) {
      setIsLocalDropTarget(true);
      onDragEnter?.();
    }

    // Calculate insertion index based on cursor position
    if (!isExpanded || items.length === 0) {
      setInsertionIndex(0);
      return;
    }

    const gridEl = gridRef.current;
    if (!gridEl) return;

    const itemElements = Array.from(
      gridEl.querySelectorAll("[data-item-id]"),
    ) as HTMLElement[];
    const cursorY = e.clientY;
    let idx = itemElements.length;

    for (let i = 0; i < itemElements.length; i++) {
      const item = itemElements[i];
      if (!item) continue;
      const rect = item.getBoundingClientRect();
      if (cursorY < rect.top + rect.height / 2) {
        idx = i;
        break;
      }
    }

    setInsertionIndex(idx);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsLocalDropTarget(false);
      setInsertionIndex(null);
      onDragLeaveFolder?.();
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    // Try "text/plain" first (from native drag), fallback to "itemId"
    const itemId =
      e.dataTransfer.getData("text/plain") || e.dataTransfer.getData("itemId");
    if (itemId && onDrop) {
      const index = insertionIndex ?? items.length;
      onDrop(itemId, id, index);
    }
    // Clean up drag state
    setIsLocalDropTarget(false);
    setInsertionIndex(null);
    onDragLeaveFolder?.();
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    itemId: string,
  ) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", itemId);
  };

  // Build sort dropdown items
  const sortDropdownItems = sortOptions?.map((option) => ({
    id: option.value,
    label: option.label,
    onClick: () => onSortChange?.(option.value),
  }));

  // Build folder actions dropdown
  const folderActionsItems = [
    ...(onFolderEdit
      ? [
          {
            id: "rename",
            label: "Rename",
            onClick: onFolderEdit,
          },
        ]
      : []),
    ...(onFolderInvite
      ? [
          {
            id: "invite",
            label: "Invite participants",
            onClick: onFolderInvite,
          },
        ]
      : []),
    ...(onFolderDelete
      ? [
          {
            id: "delete",
            label: "Delete folder",
            danger: true,
            onClick: onFolderDelete,
          },
        ]
      : []),
  ];

  const isActiveDropTarget = isDropTarget || isLocalDropTarget;

  const classNames = [
    styles.folder,
    isActiveDropTarget && styles.dropTarget,
    isDropCompleted && styles.dropCompleted,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const itemLabelDisplay = itemCount === 1 ? itemLabel : itemLabelPlural;

  return (
    <div
      ref={setNodeRef}
      className={classNames}
      data-folder-id={id}
      data-drop-active={isActiveDropTarget}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      {...rest}
    >
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        {/* Folder Header */}
        <div className={styles.header}>
          <Collapsible.Trigger className={styles.trigger}>
            <ChevronDown
              size={20}
              className={`${styles.chevron} ${isExpanded ? styles.expanded : ""}`}
            />
            <h2 className={styles.title}>{title}</h2>
            <Badge variant="secondary" className={styles.badge}>
              {itemCount}
              <span className={styles.badgeLabel}> {itemLabelDisplay}</span>
            </Badge>
          </Collapsible.Trigger>

          <div className={styles.actions}>
            {/* Sort dropdown */}
            {sortOptions && sortOptions.length > 0 && (
              <div className={styles.sortDropdown}>
                <Dropdown
                  trigger={
                    <Button
                      variant="ghost"
                      size="sm"
                      iconRight={<ChevronDown size={16} />}
                      aria-label={`Sort by ${sortLabel}`}
                    >
                      {sortOptions.find((opt) => opt.value === selectedSort)
                        ?.label || sortLabel}
                    </Button>
                  }
                  items={sortDropdownItems}
                  placement="bottom-end"
                />
              </div>
            )}

            {/* Folder actions menu */}
            {folderActionsItems.length > 0 && (
              <Dropdown
                trigger={
                  <Button
                    variant="ghost"
                    size="sm"
                    iconOnly
                    icon={<MoreHorizontal size={20} />}
                    aria-label="Folder actions"
                  />
                }
                items={folderActionsItems}
                placement="bottom-end"
              />
            )}
          </div>
        </div>

        {/* Items Grid */}
        <Collapsible.Content>
          <div className={styles.content}>
            {items.length === 0 ? (
              isActiveDropTarget ? (
                <div className={styles.emptyDropZone}>
                  <div className={styles.insertionLine} role="presentation" />
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <p className={styles.emptyText}>{emptyText}</p>
                </div>
              )
            ) : (
              <div className={styles.grid} ref={gridRef}>
                {items.map((item, index) => (
                  <React.Fragment key={item.id}>
                    {isActiveDropTarget && insertionIndex === index && (
                      <div
                        className={styles.insertionLine}
                        role="presentation"
                      />
                    )}
                    <div
                      data-item-id={item.id}
                      draggable={item.draggable}
                      onDragStart={(e) => handleDragStart(e, item.id)}
                    >
                      {renderItem(item, index)}
                    </div>
                  </React.Fragment>
                ))}
                {isActiveDropTarget && insertionIndex === items.length && (
                  <div className={styles.insertionLine} role="presentation" />
                )}
              </div>
            )}
          </div>
        </Collapsible.Content>
      </Collapsible>
    </div>
  );
}

CollapsibleFolder.displayName = "CollapsibleFolder";
