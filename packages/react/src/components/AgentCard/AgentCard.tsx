"use client";

/**
 * AgentCard Component
 *
 * Specialized card component for displaying AI agent information with avatar,
 * title, description, and optional actions. Supports drag & drop functionality.
 *
 * @example
 * ```tsx
 * <AgentCard
 *   id="agent-1"
 *   avatar="/agent-avatar.png"
 *   title="Customer Support Agent"
 *   description="Handles customer inquiries and support tickets"
 *   timestamp="Updated 2 hours ago"
 *   onClick={() => console.log('Agent clicked')}
 *   onEdit={() => console.log('Edit agent')}
 *   onDelete={() => console.log('Delete agent')}
 * />
 * ```
 */

import React, { useState } from "react";
import { Edit, Trash2, MoreVertical, Folder } from "lucide-react";
import type { AgentCardProps } from "./AgentCard.types";
import { Card } from "../Card";
import { Avatar } from "../Avatar";
import { Button } from "../Button";
import { Dropdown } from "../Dropdown";
import styles from "./AgentCard.module.css";

export const AgentCard: React.FC<AgentCardProps> = ({
  id,
  avatar,
  title,
  description,
  timestamp,
  isMultiAgent = false,
  onClick,
  onEdit,
  onDelete,
  availableFolders,
  onMoveToFolder,
  draggable = false,
  isDragging = false,
  className,
  ...rest
}) => {
  const isImageAvatar = typeof avatar === "string";
  const [isDraggingState, setIsDraggingState] = useState(isDragging);

  const classNames = [
    styles.agentCard,
    onClick && styles.clickable,
    draggable && styles.draggable,
    isDraggingState && styles.dragging,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleClick = () => {
    onClick?.();
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (!draggable) return;
    setIsDraggingState(true);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.setData("application/json", JSON.stringify({ id, title }));
  };

  const handleDragEnd = () => {
    setIsDraggingState(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    if (!draggable) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const dropdownItems = [
    ...(onEdit
      ? [
          {
            id: "edit",
            label: "Edit",
            icon: <Edit size={16} />,
            onClick: onEdit,
          },
        ]
      : []),
    ...(onDelete
      ? [
          {
            id: "delete",
            label: "Delete",
            icon: <Trash2 size={16} />,
            danger: true,
            onClick: onDelete,
          },
        ]
      : []),
    ...(onMoveToFolder && availableFolders && availableFolders.length > 0
      ? [
          { id: "_move-sep", label: "", separator: true },
          ...availableFolders.map((f) => ({
            id: `move-to-${f.id}`,
            label: f.title,
            icon: <Folder size={16} />,
            onClick: () => onMoveToFolder(f.id),
          })),
        ]
      : []),
  ];

  return (
    <Card
      variant="base"
      interactive={!!onClick}
      className={classNames}
      onClick={handleClick}
      draggable={draggable}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      data-agent-id={id}
      data-dragging={isDraggingState}
      {...rest}
    >
      {/* Header: Avatar + Badge + Actions Menu */}
      <Card.Header>
        <div className={styles.headerContent}>
          {isImageAvatar ? (
            <Avatar src={avatar} alt={title} size="lg" />
          ) : (
            <div className={styles.iconAvatar}>{avatar}</div>
          )}

          <div className={styles.headerRight}>
            {/* Multi badge — only shown for multi-agents */}
            {isMultiAgent && <span className={styles.multiBadge}>Multi</span>}

            {/* Actions Menu via Dropdown component */}
            {dropdownItems.length > 0 && (
              <Dropdown
                trigger={
                  <Button
                    variant="ghost"
                    iconOnly
                    size="sm"
                    icon={<MoreVertical size={20} />}
                    aria-label="Actions"
                    onDragStart={(e) => e.stopPropagation()}
                  />
                }
                items={dropdownItems}
                placement="bottom-end"
                minWidth={140}
              />
            )}
          </div>
        </div>
      </Card.Header>

      {/* Body: Title + Description */}
      <Card.Body>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description ?? ""}</p>
      </Card.Body>

      {/* Footer: Timestamp only */}
      {timestamp && (
        <Card.Footer>
          <time className={styles.timestamp}>{timestamp}</time>
        </Card.Footer>
      )}
    </Card>
  );
};

AgentCard.displayName = "AgentCard";
