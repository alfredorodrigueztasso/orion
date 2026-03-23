---
name: log-pattern
description: Documenta un patrón CSS/React/arquitectónico reutilizable en memory/patterns.md. Auto-triggers con "loguea este patrón", "documenta este CSS pattern", "guarda esto como patrón reutilizable", "esto es un patrón que vamos a repetir".
allowed-tools: ["Read", "Write", "Edit", "AskUserQuestion"]
---

# /log-pattern — Documenta Patrones Reutilizables

Captura patrones de código, CSS, componentes o arquitectura que se van a repetir. Los patrones documentados sirven como referencia para futuras sesiones de desarrollo.

## Cuándo usar

- "Loguea este patrón"
- "Documenta este CSS pattern"
- "Guarda esto como patrón reutilizable"
- "Esto es algo que vamos a repetir"
- "Este selector/composición es útil para el futuro"

## What This Does

1. Pregunta contexto si falta (componente, archivo, problema que resolvía)
2. Lee `memory/patterns.md` para entender el formato existente
3. Pregunta detalles sobre el patrón (cuándo NO usarlo, alternativas)
4. Agrega la entrada formateada al final del archivo
5. Confirma la entrada creada

## Execution Steps

### PASO 1: Recopilar información

Si el usuario no proporcionó suficiente contexto, pregunta:
- "¿En qué componente o archivo se aplicó este patrón?"
- "¿Cuál era el problema que resolvía?"
- "¿Es generalizable a otros contextos o es específico de un caso?"
- "¿Cuándo NO deberías usar este patrón?"

### PASO 2: Leer el archivo objetivo

```bash
cat "/Users/alfredo/.claude/projects/-Users-alfredo-Documents-AI-First-DS-Library/memory/patterns.md"
```

Examina el formato existente para mantener consistencia.

### PASO 3: Construir la entrada

Formato esperado:

```markdown
### [Fecha] [Categoría] — [Nombre del patrón]

**Status**: Probado / Experimental

**Problema que resolvía**:
Descripción breve de qué problema existía y cómo este patrón lo solucionaba.

**Contexto**:
Dónde se descubrió (componente, file path, sesión). Modos/brands afectados si aplica.

**Implementación**:
```typescript
// Código o estructura del patrón
```

**Cuándo usar**: Condiciones o contextos donde aplica bien

**Cuándo NO usar**: Contraejemplos o situaciones a evitar

**Alternativas consideradas**: Otras formas en que se pudo haber hecho esto

**Aplicado en**:
- `packages/react/src/components/ComponentName/ComponentName.tsx` (línea X-Y)
- `packages/react/src/styles/pattern-name.css`

**Extensiones futuras**: Si este patrón podría evolucionar o escalarse de otra forma
```

### PASO 4: Escribir al archivo

Usa `Edit` para agregar la entrada al final de `patterns.md` (antes de cualquier sección de footer vacía).

### PASO 5: Confirmar

Reporta:
- Fecha de entrada
- Nombre del patrón
- Línea donde fue agregada
- URL relativa al archivo (para copiar fácilmente después)

## Commands

```bash
# Leer el archivo de patterns
cat "/Users/alfredo/.claude/projects/-Users-alfredo-Documents-AI-First-DS-Library/memory/patterns.md"

# Crear/actualizar entrada (vía Edit tool)
```

## Auto-Trigger Patterns

- "loguea este patrón"
- "documenta este CSS pattern"
- "guarda esto como patrón"
- "patrón reutilizable"
- "vamos a repetir esto"
- "esto es un pattern"

## Success Output Format

```
✅ PATRÓN DOCUMENTADO

📍 Archivo: memory/patterns.md
📅 Entrada: [YYYY-MM-DD] [Categoría] — [Nombre]
🔗 Líneas: X-Y

Patrón guardado exitosamente.

Úsalo en futuras sesiones con:
  /log-pattern [similar pattern name] para encontrarlo rápidamente
```

## Failure Output Format

```
⚠️ NO SE PUDO DOCUMENTAR

Problema: [descripción del error]

Soluciones:
  1. Verifica que memory/patterns.md exista
  2. Revisa que el archivo tenga formato YAML válido
  3. Asegúrate de que el patrón tenga al menos 3 detalles (problema, contexto, implementación)

¿Quieres reintentar con más contexto?
```

## Related Skills

- `/team-docs --session-log` — Para registrar la sesión donde descubriste este patrón
- `/log-fix` — Si el patrón surgió de resolver un bug
- `/audit` — Para validar que los patrones se aplican correctamente en el codebase

## Exit Codes

- `0` = Patrón documentado exitosamente
- `1` = Error en lectura/escritura del archivo
- `2` = Información insuficiente (usuario canceló)
