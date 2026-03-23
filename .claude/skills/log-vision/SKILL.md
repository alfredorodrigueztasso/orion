---
name: log-vision
description: Documenta una decisión de diseño visual en memory/design-vision.md. Auto-triggers con "loguea esta decisión de diseño", "documenta por qué elegimos esta tipografía/motion/color", "guarda esta visión visual".
allowed-tools: ["Read", "Write", "Edit", "AskUserQuestion"]
---

# /log-vision — Documenta Decisiones de Diseño Visual

Captura decisiones sobre tipografía, movimiento, color, layout y otros aspectos visuales del sistema. Cada entrada documenta el "por qué" detrás de las elecciones visuales.

## Cuándo usar

- "Loguea esta decisión de diseño"
- "Documenta por qué elegimos esta tipografía/motion/color"
- "Guarda esta visión visual"
- "Quiero registrar esta decisión de diseño"
- "Documenta la estrategia de color"

## What This Does

1. Pregunta contexto si falta (qué aspecto visual, qué se decidió, por qué)
2. Lee `memory/design-vision.md` para entender el formato
3. Elabora detalles (modos/brands afectados, tokens relacionados, referencias visuales)
4. Agrega la entrada formateada al archivo
5. Confirma la decisión documentada

## Execution Steps

### PASO 1: Recopilar información

Pregunta al usuario por cada elemento si no está explícito:

- "¿Cuál es el aspecto visual?" (tipografía, motion, color, layout, efectos, etc.)
- "¿Cuál es la decisión específica?" (e.g., "Hero titles son 80px, product titles son 32px")
- "¿Cuál fue la motivación?" (por qué se eligió así)
- "¿Qué modos o brands son afectados?" (Display/Product/App, orion/red/deepblue/orange/ember/lemon)
- "¿Qué tokens o CSS variables implementan esto?" (var(--font-size-xl), var(--mode-shadow-hover), etc.)
- "¿Dónde se ve esto?" (componente, página, Storybook story)

### PASO 2: Leer el archivo objetivo

```bash
cat "/Users/alfredo/.claude/projects/-Users-alfredo-Documents-AI-First-DS-Library/memory/design-vision.md"
```

### PASO 3: Construir la entrada

Formato esperado:

```markdown
### [YYYY-MM-DD] [Categoría] — [Título]

**Decision**:
La regla visual o patrón específico. Sé concreto.
Ejemplo: "Hero titles use 80px (var(--font-size-hero)), product titles use 32px (var(--font-size-2xl))"

**Motivation**:
Por qué se hizo así. Puede incluir:
- Contexto de usuario (Display mode es para marketing, Product es para eficiencia)
- Accesibilidad (legibilidad, contraste, tamaño de tap targets)
- Brand (la marca necesita presencia, jerarquía visual)
- Compatibilidad (móvil vs desktop)

**Modes/Brands**:
Qué contextos afecta:
- Modes: Display (marketing), Product (SaaS), App (mobile/touch)
- Brands: orion, red, deepblue, orange, ember, lemon

**Tokens/CSS**:
Las variables que implementan esto:
- `var(--font-size-xl)` para este tamaño
- `var(--mode-shadow-hover)` para este efecto
- `[data-mode="display"] .hero` para selectores mode-aware

**Reference**:
Dónde ver esto en el codebase o Storybook:
- File: `packages/react/src/components/Hero/Hero.stories.tsx`
- Story: "Hero Display Mode"
- Component: `packages/react/src/sections/Hero/Hero.tsx`
```

### PASO 4: Escribir al archivo

Usa `Edit` para agregar la entrada al final de `design-vision.md`.

### PASO 5: Confirmar

Reporta:
- Decisión documentada
- Categoría (Typography/Motion/Color/Layout/Visual Effects)
- Modos/Brands afectados
- Línea en el archivo donde fue guardada

## Commands

```bash
# Leer el archivo de design vision
cat "/Users/alfredo/.claude/projects/-Users-alfredo-Documents-AI-First-DS-Library/memory/design-vision.md"

# Agregar entrada (vía Edit tool)
```

## Auto-Trigger Patterns

- "loguea esta decisión de diseño"
- "documenta por qué elegimos esta tipografía"
- "guarda esta visión visual"
- "decisión de color"
- "por qué este shadow"
- "documenta la estrategia de motion"

## Success Output Format

```
✅ VISIÓN DOCUMENTADA

📍 Archivo: memory/design-vision.md
📅 Entrada: [YYYY-MM-DD] [Categoría] — [Título]
🎨 Aspecto: [Typography/Motion/Color/Layout/Effects]
🎯 Modes: [Display/Product/App]
🏷️ Tokens: [var(--token-name), ...]

Decisión visual guardada. Futuras designers podrán entender el "por qué".
```

## Failure Output Format

```
⚠️ NO SE PUDO DOCUMENTAR

Problema: [descripción del error]

Verificaciones:
  1. ¿design-vision.md existe en memory/?
  2. ¿Se especificó claramente la decisión visual?
  3. ¿Se explicó la motivación?

¿Quieres proporcionar más detalles sobre la decisión?
```

## Related Skills

- `/log-adr` — Si esta decisión visual requirió cambios arquitectónicos
- `/log-pattern` — Si surgió un patrón CSS reutilizable de esta decisión
- `/team-docs --session-log` — Para registrar que se documentó en esta sesión

## Exit Codes

- `0` = Visión documentada exitosamente
- `1` = Error en lectura/escritura del archivo
- `2` = Información insuficiente (usuario canceló)
