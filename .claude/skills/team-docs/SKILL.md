---
name: team-docs
description: Knowledge Keeper. Documenta sesiones de trabajo, mantiene MEMORY.md bajo 200 líneas, organiza archivos .md sueltos, y crea/mantiene los archivos de memoria. Auto-triggers con "organiza la documentación", "MEMORY.md está lleno", "documenta lo que hicimos", "archiva este archivo", "limpia los archivos sueltos".
allowed-tools: ["Read", "Write", "Edit", "Glob", "Grep", "Bash", "AskUserQuestion"]
argument-hint: [--status, --session-log, --memory-trim, --cleanup]
---

# /team-docs — Knowledge & Documentation Keeper

Mantiene la memoria institucional del proyecto ordenada y accesible. Documenta sesiones, previene que MEMORY.md crezca sin límite, organiza archivos sueltos, y mantiene los 4 archivos de memoria en buen estado.

## Cuándo usar

- "¿Cuál es el estado de la documentación?"
- "Documenta lo que hicimos en esta sesión"
- "MEMORY.md está lleno, organízalo"
- "Hay muchos .md sueltos, organízalos"
- "Archiva este archivo"
- "¿Qué archivos de memoria tenemos?"

## Modos de Operación

| Modo | Argumento | Función |
|---|---|---|
| Status | `--status` (default) | Reporta estado de todos los archivos de memoria + archivos sueltos |
| Sesión | `--session-log` | Documenta lo que se trabajó hoy en MEMORY.md |
| Trim | `--memory-trim` | Recorta MEMORY.md si excede límite (681 → < 200 líneas) |
| Cleanup | `--cleanup` | Mueve archivos .md sueltos de raíz a `.claude/workspace-docs/` |

## What This Does

1. **`--status`**: Examina el estado actual de toda la documentación
2. **`--session-log`**: Pregunta qué se logró y agrega entrada a MEMORY.md
3. **`--memory-trim`**: Analiza MEMORY.md, mueve detalles a topic files
4. **`--cleanup`**: Detecta y clasifica `.md` sueltos, pide confirmación antes de mover

## Execution Steps

### PASO 0: Modo Status (Default)

Corre en paralelo o secuencia:

```bash
# Verificar estado de archivos de memoria
ls -lh "/Users/alfredo/.claude/projects/-Users-alfredo-Documents-AI-First-DS-Library/memory/"

# Detectar archivos .md sin trackear en raíz
cd "/Users/alfredo/Documents/AI First DS Library" && git status --short | grep "^??" | grep "\.md$"

# Contar líneas en MEMORY.md
wc -l "/Users/alfredo/.claude/projects/-Users-alfredo-Documents-AI-First-DS-Library/memory/MEMORY.md"
```

**Reporta**:
- ✅/❌ Estado de los 5 archivos de memoria (existen, tamaño, líneas)
- 📋 Archivos .md sueltos detectados (cantidad)
- 📊 Líneas actuales en MEMORY.md vs límite (681 / 200)

### PASO 1: Modo Session Log

1. **Pregunta al usuario**: "¿Qué se logró en esta sesión?" (bullets de lo importante)
2. **Lee MEMORY.md** para ver el formato existente
3. **Crea entrada** formateada:
   ```markdown
   ## [YYYY-MM-DD] — [Título de la sesión] ✅

   **Logros**:
   - Logro 1 (1-2 líneas descriptivas)
   - Logro 2
   - Logro 3

   **Estado actual**: [1 línea sobre el estado del proyecto]

   **Ver detalles**:
   - `memory/architecture-decisions.md` si hay ADRs nuevos
   - `memory/patterns.md` si hay patrones documentados
   - `memory/debugging.md` si hay bugs resueltos

   ---
   ```
4. **Agrega a MEMORY.md** (al principio, después de la introducción)
5. **Verifica líneas** — si MEMORY.md excede 200, sugiere `--memory-trim`

### PASO 2: Modo Memory Trim

**Criterio**: MEMORY.md actual (681 líneas) → < 200 líneas

Algoritmo:
1. Lee MEMORY.md completo
2. Clasifica cada sección:
   - **Mantener**: Sesiones recientes (últimas 3-4), status actual, skills importantes
   - **Mover**: Sesiones antiguas con detalles técnicos extensos (> 10 líneas)
   - **Eliminar**: Duplicados, información ya en otros archivos

3. Para cada sección a mover:
   - Lee el contenido completo
   - Determina el archivo de destino (patterns.md, debugging.md, design-vision.md, architecture-decisions.md)
   - Agrega a ese archivo
   - En MEMORY.md deja solo un link: "Ver `memory/patterns.md` para detalles del [nombre]"

4. **Reescribe MEMORY.md** con estructura limpia:
   ```markdown
   # Orion Design System - Working Memory

   [Introducción breve — 5 líneas máximo]

   ## Sesiones recientes (últimas 3)
   - [YYYY-MM-DD] — [Título] ✅
   - [YYYY-MM-DD] — [Título] ✅

   ## Estado actual (1-2 líneas)

   ## Archivos de memoria (índice)

   | Archivo | Contenido | Estado |
   |---|---|---|
   | patterns.md | Patrones CSS/React | X entries |
   | debugging.md | Bugs resueltos | X entries |
   | design-vision.md | Decisiones visuales | X entries |
   | architecture-decisions.md | ADRs | X entries |

   ---
   ```

5. **Reporta**: Qué se movió, qué se eliminó, líneas resultantes

### PASO 3: Modo Cleanup

1. **Detecta** archivos `.md` sin trackear:
   ```bash
   cd "/Users/alfredo/Documents/AI First DS Library"
   git status --short | grep "^??" | grep "\.md$"
   ```

2. **Clasifica** por tipo:
   - **Planes/Reportes de sesión**: → `.claude/workspace-docs/`
   - **Comunicaciones/Landing**: → `.claude/workspace-docs/communications/`
   - **Documentación técnica válida**: → `.claude/workspace-docs/`
   - **Archivos de valor incierto**: Preguntar al usuario

3. **Presenta el plan**:
   ```
   Detecté 22 archivos .md sin trackear:

   Para mover a .claude/workspace-docs/:
     [ ] DELIVERY_SUMMARY.md
     [ ] IMPLEMENTATION_MATRIX.md

   Para mover a .claude/workspace-docs/communications/:
     [ ] COMMUNICATION_STRATEGY.md
     [ ] LANDING_COPY_ONE_PAGER.md

   Requiere revisión (no está claro):
     [ ] DESIGN_FIX_RECOMMENDATIONS.md

   ¿Procedo? (sí / revisar uno por uno / cancelar)
   ```

4. **Ejecuta los moves** (si confirmó):
   ```bash
   mkdir -p "/Users/alfredo/Documents/AI First DS Library/.claude/workspace-docs/communications/"
   mv "/Users/alfredo/Documents/AI First DS Library/COMMUNICATION_STRATEGY.md" \
      "/Users/alfredo/Documents/AI First DS Library/.claude/workspace-docs/communications/"
   # ... etc
   ```

5. **Reporta**: Qué se movió, qué se dejó, status final

## Commands

```bash
# Listar archivos de memoria
ls -lh "/Users/alfredo/.claude/projects/-Users-alfredo-Documents-AI-First-DS-Library/memory/"

# Detectar .md sueltos (sin trackear)
cd "/Users/alfredo/Documents/AI First DS Library" && git status --short | grep "^??" | grep "\.md$"

# Contar líneas
wc -l "/Users/alfredo/.claude/projects/-Users-alfredo-Documents-AI-First-DS-Library/memory/MEMORY.md"

# Leer archivos de memoria para análisis
cat "/Users/alfredo/.claude/projects/-Users-alfredo-Documents-AI-First-DS-Library/memory/MEMORY.md"
cat "/Users/alfredo/.claude/projects/-Users-alfredo-Documents-AI-First-DS-Library/memory/patterns.md"
```

## Árbol de Decisión: ¿Qué tipo de memoria?

Cuando el usuario pregunta dónde guardar algo:

```
¿Es un bug resuelto repetible?
  → /log-fix → memory/debugging.md

¿Es un patrón CSS/React reutilizable?
  → /log-pattern → memory/patterns.md

¿Es una decisión visual (tipografía/motion/color)?
  → /log-vision → memory/design-vision.md

¿Es una decisión arquitectónica con contexto/trade-offs?
  → /log-adr → memory/architecture-decisions.md

¿Es un resumen de sesión (qué se hizo hoy)?
  → /team-docs --session-log → MEMORY.md (max 10 líneas)
```

## Auto-Trigger Patterns

- "organiza la documentación"
- "MEMORY.md está lleno"
- "documenta lo que hicimos"
- "archiva este archivo"
- "limpia los archivos sueltos"
- "¿cuál es el estado de la documentación?"
- "hay muchos .md"

## Success Output Format

```
📚 DOCUMENTACIÓN STATUS — Orion Design System

Archivos de memoria:
  ✅ MEMORY.md           (87 líneas — dentro del límite)
  ✅ patterns.md         (3 patrones documentados)
  ✅ debugging.md        (2 bugs documentados)
  ✅ design-vision.md    (1 decisión visual)
  ✅ architecture-decisions.md (4 ADRs)

Archivos sueltos en raíz: 22 archivos .md sin trackear
  → Ejecuta /team-docs --cleanup para organizarlos

¿Qué quieres documentar?
  /log-pattern  — Documenta un patrón reutilizable
  /log-fix      — Documenta un bug resuelto
  /log-vision   — Documenta una decisión visual
  /log-adr      — Documenta una decisión arquitectónica
  --session-log — Registra lo que hicimos hoy
  --cleanup     — Organiza archivos sueltos
```

## Failure Output Format

```
⚠️ NO SE PUDO COMPLETAR

Problema: [descripción]

Verificaciones:
  1. ¿Todos los archivos de memoria existen?
  2. ¿Tienes permisos de escritura en memory/?
  3. ¿El formato YAML es válido?

¿Quieres que intente arreglarlo?
```

## Related Skills

- `/log-pattern`, `/log-fix`, `/log-vision`, `/log-adr` — Sub-skills de logging que `/team-docs` orquesta
- `/team-git` — Detecta archivos .md sueltos durante diagnóstico
- `/audit` — Para validar que los patrones y decisiones se implementan correctamente

## Exit Codes

- `0` = Documentación actualizada/organizada exitosamente
- `1` = Error en lectura/escritura de archivos
- `2` = Información incompleta (usuario canceló)
