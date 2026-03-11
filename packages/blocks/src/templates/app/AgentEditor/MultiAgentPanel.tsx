import { useState, useMemo } from "react";
import { CodeEditor } from "@orion-ds/react";
import styles from "./MultiAgentPanel.module.css";

interface AgentFlowNode {
  id: string;
  type: "input" | "processing" | "decision" | "output";
  description: string;
  next?: string;
  outputs?: Record<string, string>;
}

interface AgentFlow {
  agent_name: string;
  version: string;
  nodes: AgentFlowNode[];
}

const INNER = 44; // box inner content width

/**
 * Convert node ID to display label
 * @param id Node ID (e.g., "recibir_consulta" → "RECIBIR CONSULTA")
 */
function idToLabel(id: string): string {
  return id.replace(/_/g, " ").toUpperCase();
}

/**
 * Pad or truncate string to exact length
 */
function pad(s: string, w: number): string {
  if (s.length > w) return s.substring(0, w - 1) + "…";
  return s.padEnd(w);
}

/**
 * Render a single node box
 * @param node The node to render
 * @param hasArrow Whether this node has a next/output (determines bottom style)
 */
function renderNodeBox(node: AgentFlowNode, hasArrow: boolean): string[] {
  const label = idToLabel(node.id);
  const type = `[${node.type.toUpperCase()}]`;
  const desc = node.description;

  const top = `┌${"─".repeat(INNER + 2)}┐`;
  const line1 = `│ ${pad(type, INNER)} │`;
  const line2 = `│  ${pad(label, INNER - 1)}│`;
  const line3 = `│  ${pad(desc, INNER - 1)}│`;

  let bot: string;
  if (hasArrow) {
    // Centered ┬: position 23 from left (1 + 22 dashes + 1 ┬)
    bot = `└${"─".repeat(22)}┬${"─".repeat(23)}┘`;
  } else {
    bot = `└${"─".repeat(INNER + 2)}┘`;
  }

  return [top, line1, line2, line3, bot];
}

/**
 * Generate ASCII flowchart from AgentFlow
 */
function generateFlowchart(flow: AgentFlow): string {
  const nodeMap = new Map(flow.nodes.map((n) => [n.id, n]));
  const lines: string[] = [];

  // Header
  lines.push(` ${flow.agent_name}  v${flow.version}`);
  lines.push("═".repeat(INNER + 4));
  lines.push("");

  const visited = new Set<string>();

  /**
   * Traverse and render nodes recursively
   * @param nodeId ID of node to render
   */
  function traverse(nodeId: string): void {
    if (visited.has(nodeId)) {
      lines.push(`    ↻ ${idToLabel(nodeId)} (ya visitado)`);
      return;
    }

    const node = nodeMap.get(nodeId);
    if (!node) {
      lines.push(`⚠ Nodo no encontrado: ${nodeId}`);
      return;
    }

    visited.add(nodeId);

    const hasNext = !!node.next;
    const hasOutputs = !!node.outputs && Object.keys(node.outputs).length > 0;

    // Render box
    renderNodeBox(node, hasNext || hasOutputs).forEach((l) => lines.push(l));

    if (hasNext) {
      // Arrow down (centered at position 23)
      lines.push(`${"─".repeat(23)}│`);
      lines.push(`${"─".repeat(23)}▼`);
      traverse(node.next!);
    } else if (hasOutputs) {
      // Branch list
      lines.push("        │");
      const entries = Object.entries(node.outputs!);
      entries.forEach(([label, targetId], i) => {
        const isLast = i === entries.length - 1;
        const conn = isLast ? "└" : "├";
        const targetLabel = idToLabel(targetId);
        lines.push(`   ${conn}── [${label}] ──► ${targetLabel}`);
      });
      lines.push("");

      // Render each branch's subtree
      entries.forEach(([label, targetId], i) => {
        if (i > 0) lines.push("");
        lines.push(
          `${"─".repeat(Math.floor(INNER / 2))} Rama: ${label} ${"─".repeat(Math.floor(INNER / 2))}`,
        );
        lines.push("");
        traverse(targetId);
      });
    }
  }

  // Find start node
  const startNode = flow.nodes.find((n) => n.type === "input");
  if (!startNode) {
    return '⚠ JSON inválido — debe tener un nodo con type: "input"';
  }

  traverse(startNode.id);
  return lines.join("\n");
}

const DEFAULT_JSON = `{
  "agent_name": "AgentSoporteIA",
  "version": "1.0",
  "nodes": [
    {
      "id": "recibir_consulta",
      "type": "input",
      "description": "Recibe la consulta inicial del usuario",
      "next": "analizar_intencion"
    },
    {
      "id": "analizar_intencion",
      "type": "processing",
      "description": "Clasifica el tipo de solicitud",
      "next": "clasificar_urgencia"
    },
    {
      "id": "clasificar_urgencia",
      "type": "decision",
      "description": "Evalúa la prioridad del caso",
      "outputs": {
        "alta": "escalar_agente",
        "media": "resolver_directo",
        "baja": "respuesta_automatica"
      }
    },
    {
      "id": "escalar_agente",
      "type": "processing",
      "description": "Deriva al agente especialista",
      "next": "confirmar_escalamiento"
    },
    {
      "id": "resolver_directo",
      "type": "processing",
      "description": "Resuelve con base de conocimiento",
      "next": "verificar_resolucion"
    },
    {
      "id": "respuesta_automatica",
      "type": "processing",
      "description": "Envía respuesta automatizada",
      "next": "verificar_resolucion"
    },
    {
      "id": "confirmar_escalamiento",
      "type": "output",
      "description": "Notifica escalamiento al usuario"
    },
    {
      "id": "verificar_resolucion",
      "type": "decision",
      "description": "Confirma si el problema fue resuelto",
      "outputs": {
        "resuelto": "cerrar_ticket",
        "no_resuelto": "escalar_agente"
      }
    },
    {
      "id": "cerrar_ticket",
      "type": "output",
      "description": "Cierra el ticket de soporte"
    },
    {
      "id": "registrar_feedback",
      "type": "processing",
      "description": "Registra el feedback del usuario",
      "next": "fin_atencion"
    },
    {
      "id": "fin_atencion",
      "type": "output",
      "description": "Finaliza la sesión de atención"
    }
  ]
}`;

interface MultiAgentPanelProps {
  /** Current JSON value (controlled component) */
  value?: string;
  /** Called when JSON changes */
  onChange?: (value: string) => void;
}

export const MultiAgentPanel = ({
  value: controlledValue,
  onChange,
}: MultiAgentPanelProps) => {
  // Support both controlled and uncontrolled modes
  const [internalValue, setInternalValue] = useState(DEFAULT_JSON);
  const isControlled = controlledValue !== undefined;
  const jsonValue = isControlled ? controlledValue : internalValue;

  const handleChange = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const flowchartOutput = useMemo(() => {
    try {
      const parsed = JSON.parse(jsonValue) as AgentFlow;
      if (!parsed.nodes || !Array.isArray(parsed.nodes)) {
        return '⚠ JSON inválido — debe tener "nodes": [...]';
      }
      return generateFlowchart(parsed);
    } catch {
      return "⚠ JSON inválido — corrige el formato para ver la vista previa";
    }
  }, [jsonValue]);

  return (
    <div className={styles.panel}>
      <div className={styles.box}>
        <span className={styles.boxLabel}>Definición del flujo (JSON)</span>
        <CodeEditor
          className={styles.editorFill}
          value={jsonValue}
          onChange={handleChange}
          language="json"
          placeholder='{ "agent_name": "...", "version": "1.0", "nodes": [...] }'
          showLineNumbers
        />
      </div>
      <div className={styles.box}>
        <span className={styles.boxLabel}>Vista previa del flujo</span>
        <CodeEditor
          className={styles.editorFill}
          value={flowchartOutput}
          readOnly
          showLineNumbers={false}
          placeholder="La vista previa aparece aquí..."
        />
      </div>
    </div>
  );
};
