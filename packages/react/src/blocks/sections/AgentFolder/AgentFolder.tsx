/**
 * AgentFolder Section
 *
 * Collapsible folder section for organizing AI agents in a grid layout.
 * Built as a thin wrapper over the generic CollapsibleFolder component.
 *
 * Supports native HTML5 drag & drop with visual feedback (drop target highlighting and insertion indicators),
 * sorting, and folder management actions.
 *
 * ## Drag & Drop Features
 * - **Drop target visual state**: Folder highlights with background color and border when dragging agents over it
 * - **Insertion indicator**: Dynamic blue line shows exactly where the agent will be inserted
 * - **Automatic state cleanup**: Visual feedback clears when drag ends or user leaves folder
 * - **Empty folder support**: Shows centered insertion line for empty folders
 * - **Collapsed folder support**: Accepts drops even when folder is collapsed
 *
 * ## Synchronization
 * AgentFolder integrates with parent container (@dnd-kit in AgentWorkspace) via callbacks:
 * - `onDragEnter`: Notifies parent when drag enters this folder
 * - `onDragLeaveFolder`: Notifies parent when drag leaves this folder
 *
 * ## Extending
 * If you need to organize items other than agents, use the generic `CollapsibleFolder` component directly:
 * ```tsx
 * // For organizing files, documents, or custom item types
 * <CollapsibleFolder
 *   items={files}
 *   itemLabel="File"
 *   itemLabelPlural="Files"
 *   renderItem={(file) => <FileCard {...file} />}
 *   {...otherProps}
 * />
 * ```
 *
 * @example
 * ```tsx
 * <AgentFolder
 *   id="folder-1"
 *   title="Customer Support Agents"
 *   agentCount={5}
 *   agents={agentsList}
 *   defaultExpanded={true}
 *   sortOptions={[
 *     { label: 'Most Recent', value: 'recent' },
 *     { label: 'Alphabetical', value: 'alpha' }
 *   ]}
 *   selectedSort="recent"
 *   onSortChange={(value) => console.log('Sort:', value)}
 *   onDrop={(agentId, folderId, index) => {
 *     moveAgent(agentId, folderId, index);
 *   }}
 *   onDragEnter={() => setActiveDropTarget(id)}
 *   onDragLeaveFolder={() => setActiveDropTarget(null)}
 * />
 * ```
 */

import React from "react";
import { CollapsibleFolder, AgentCard } from "@orion-ds/react";
import type { AgentFolderProps } from "./AgentFolder.types";

export const AgentFolder: React.FC<AgentFolderProps> = ({
  agents,
  agentCount,
  ...rest
}) => (
  <CollapsibleFolder
    {...rest}
    items={agents}
    itemCount={agentCount}
    itemLabel="Agente"
    itemLabelPlural="Agentes"
    emptyText="No hay agentes en esta carpeta"
    sortLabel="Ordenar"
    renderItem={(agent) => <AgentCard {...agent} />}
  />
);

AgentFolder.displayName = "AgentFolder";
