---
name: log-adr
description: Documenta una Architecture Decision Record en memory/architecture-decisions.md con contexto, decisión, trade-offs y escalabilidad. Auto-triggers con "loguea esta decisión arquitectónica", "documenta el ADR", "guarda por qué estructuramos esto así", "decision record".
allowed-tools: ["Read", "Write", "Edit", "AskUserQuestion"]
---

# /log-adr — Documenta Architecture Decision Records

Captura decisiones arquitectónicas importantes del sistema. Cada ADR documenta el contexto que llevó a la decisión, qué se decidió, qué se ganó y perdió, y cómo escala.

## Cuándo usar

- "Loguea esta decisión arquitectónica"
- "Documenta el ADR"
- "Guarda por qué estructuramos esto así"
- "Decision record"
- "Necesito documentar esta decisión de arquitectura"

## What This Does

1. Pregunta contexto completo (problema, decisión, trade-offs, escalabilidad)
2. Lee `memory/architecture-decisions.md` para entender el formato
3. Elabora detalles mediante preguntas dirigidas
4. Construye el ADR formateado y lo agrega al archivo
5. Confirma el ADR documentado

## Execution Steps

### PASO 1: Recopilar información

Pregunta al usuario por cada elemento si no está explícito:

- "¿Cuál fue el problema o necesidad?" (el contexto)
- "¿Qué decisión se tomó?" (la solución elegida)
- "¿Cuáles fueron los trade-offs?" (qué se ganó y perdió)
- "¿Cuáles eran las alternativas consideradas?" (qué más se evaluó)
- "¿Cómo escala esta decisión?" (comportamiento en el futuro, limitaciones conocidas)
- "¿Cuál es el estado?" (Implementado/En evaluación/Descartado)

### PASO 2: Leer el archivo objetivo

```bash
cat "/Users/alfredo/.claude/projects/-Users-alfredo-Documents-AI-First-DS-Library/memory/architecture-decisions.md"
```

### PASO 3: Construir el ADR

Formato esperado (RFC 2119 style):

```markdown
### [YYYY-MM-DD] [Título del ADR]

**Status**: Implementado / En evaluación / Descartado / Deprecated

**Context**:
Descripción del problema o necesidad que motivó esta decisión.
Incluye:
- La tensión o dilema existente
- Las restricciones (time, resources, expertise)
- Los stakeholders involucrados
- Por qué la solución anterior no funcionaba

**Decision**:
La decisión arquitectónica específica que se tomó.
Sé explícito y específico:
- Qué estructura se usó
- Qué patrón se adoptó
- Qué herramientas o tecnologías se eligieron

Ejemplo: "The `/team-git` skill manages all git operations via MCP tools,
with fallback to Bash if MCPs are unavailable. This centralizes git decisions
and prevents scatter across multiple skills."

**Trade-offs**:

**What We Gained**:
- Beneficio 1 (impacto cuantificable si es posible)
- Beneficio 2
- Beneficio 3

**What We Sacrificed**:
- Costo 1 (qué no pudimos hacer o qué se hizo más complejo)
- Costo 2
- Costo 3

**Alternatives Considered**:
1. **Alternative Name**
   - Pros: ...
   - Cons: ...
   - Why rejected: ...

2. **Another Alternative**
   - Pros: ...
   - Cons: ...
   - Why rejected: ...

**Scalability**:
Cómo esta decisión se comporta conforme el sistema crece:
- El patrón sigue siendo válido para N componentes / 10x codebase size
- Limitaciones conocidas: ...
- Posibles extensiones futuras: ...

**Related Decisions**:
- ADR [YYYY-MM-DD] — [Título relacionado]
- Otras decisiones que esto afecta o que la afectaron

**Implementation Details**:
Si aplica, referencias a commits, file paths, o documentación
- Archivo: `packages/react/src/...`
- Commit: abc123def456...
- Related documentation: `CLAUDE.md` sección X
```

### PASO 4: Escribir al archivo

Usa `Edit` para agregar el ADR al final de `architecture-decisions.md`.

### PASO 5: Confirmar

Reporta:
- ADR documentado
- Título
- Status
- Línea en el archivo donde fue guardada

## Commands

```bash
# Leer el archivo de architecture decisions
cat "/Users/alfredo/.claude/projects/-Users-alfredo-Documents-AI-First-DS-Library/memory/architecture-decisions.md"

# Agregar entrada (vía Edit tool)
```

## Auto-Trigger Patterns

- "loguea esta decisión arquitectónica"
- "documenta el ADR"
- "guarda por qué estructuramos esto así"
- "decision record"
- "architech decision"
- "documenta esta decisión de sistema"

## Success Output Format

```
✅ ADR DOCUMENTADO

📍 Archivo: memory/architecture-decisions.md
📅 ADR: [YYYY-MM-DD] [Título]
📊 Status: [Implementado/En evaluación/Descartado]
🔄 Trade-offs: [X ganados, Y sacrificados]

Decisión arquitectónica guardada. Futuras developers entenderán el contexto.
```

## Failure Output Format

```
⚠️ NO SE PUDO DOCUMENTAR

Problema: [descripción del error]

Verificaciones:
  1. ¿architecture-decisions.md existe?
  2. ¿Se explicó claramente el contexto?
  3. ¿Se documentaron los trade-offs?
  4. ¿Se consideraron alternativas?

¿Quieres rellenar las secciones faltantes?
```

## Related Skills

- `/log-pattern` — Si la decisión arquitectónica llevó a un patrón CSS/React reutilizable
- `/log-vision` — Si afectó decisiones visuales
- `/team-docs --session-log` — Para registrar que se documentó en esta sesión
- `/audit` — Para validar que la arquitectura se implementó correctamente

## Exit Codes

- `0` = ADR documentado exitosamente
- `1` = Error en lectura/escritura del archivo
- `2` = Información incompleta (usuario canceló)

## RFC 2119 Keywords

Cuando escribas ADRs, considera usar RFC 2119 keywords para claridad:
- **MUST** (obligatorio, sin excepciones)
- **SHOULD** (recomendado, excepciones posibles)
- **MAY** (opcional, uso según contexto)

Ejemplo: "The /team-git skill MUST use MCP tools for git operations.
It SHOULD fall back to Bash if MCPs are unavailable.
It MAY support additional git workflows in the future."
