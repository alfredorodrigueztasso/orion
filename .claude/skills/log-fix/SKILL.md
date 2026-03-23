---
name: log-fix
description: Documenta un bug resuelto en memory/debugging.md con síntoma, causa raíz, fix y prevención. Auto-triggers con "loguea este bug", "documenta este fix", "guardemos cómo resolví esto", "este bug podría repetirse".
allowed-tools: ["Read", "Write", "Edit", "AskUserQuestion"]
---

# /log-fix — Documenta Bugs Resueltos

Captura bugs que fueron identificados y resueltos, incluyendo cómo prevenirlos en el futuro. Los logs de fixes sirven como referencia cuando síntomas similares aparecen después.

## Cuándo usar

- "Loguea este bug"
- "Documenta este fix"
- "Guardemos cómo resolví esto"
- "Este bug podría repetirse"
- "Quiero asegurar que esto no vuelva a pasar"

## What This Does

1. Pregunta contexto si falta (qué síntoma se vió, causa raíz, cómo se resolvió)
2. Lee `memory/debugging.md` para entender el formato
3. Elabora información faltante mediante preguntas dirigidas
4. Agrega la entrada completa formateada al archivo
5. Confirma el bug documentado

## Execution Steps

### PASO 1: Recopilar información

Pregunta al usuario por cada elemento si no está claro:

- "¿Cuál era el síntoma observable que viste?" (qué hacía mal)
- "¿En qué componente o sistema sucedía?" (dónde)
- "¿Cuál fue la causa raíz?" (por qué sucedía)
- "¿Cómo se resolvió?" (qué cambio se hizo)
- "¿Qué previene que esto vuelva a suceder?" (tests, validación, patrón)
- "¿Hay una lección de una línea para futuras developers?" (qué aprender)

### PASO 2: Leer el archivo objetivo

```bash
cat "/Users/alfredo/.claude/projects/-Users-alfredo-Documents-AI-First-DS-Library/memory/debugging.md"
```

### PASO 3: Construir la entrada

Formato esperado:

```markdown
### [YYYY-MM-DD] Component/System Name

**Symptom**:
Descripción clara de lo que el usuario/developer observó. Be specific: "Button text was cut off" vs "Bug in button"

**Root Cause**:
Explicación técnica de POR QUE sucedía. Puede incluir:
- Código problemático (snippet o reference)
- Configuración incorrecta
- Lógica ausente
- Side effect no esperado

**Fix Applied**:
La solución técnica. Incluye:
- Archivo(s) modificado(s): `packages/react/src/components/Button/Button.tsx` (líneas X-Y)
- Cambio específico (código antes/después si es relevante)
- Commit hash si aplica

**Prevention**:
Cómo asegurar que esto no vuelva:
- Test que lo captura: `describe('Button', () => { test('does not cut text') })`
- Validación en el codebase (linter rule, type check, validation script)
- Patrón arquitectónico que lo evita
- Documentación en CLAUDE.md si es una regla importante

**Lesson**:
Una sola línea que resume lo aprendido para futuras developers.
Ejemplo: "Always validate props at component boundaries, not just in child components"
```

### PASO 4: Escribir al archivo

Usa `Edit` para agregar la entrada al final de `debugging.md`.

### PASO 5: Confirmar

Reporta:
- Bug documentado
- Componente/sistema afectado
- Línea en el archivo de debugging
- Link a los commits relacionados (si aplica)

## Commands

```bash
# Leer el archivo de debugging
cat "/Users/alfredo/.claude/projects/-Users-alfredo-Documents-AI-First-DS-Library/memory/debugging.md"

# Agregar entrada (vía Edit tool)
```

## Auto-Trigger Patterns

- "loguea este bug"
- "documenta este fix"
- "guardemos cómo resolví esto"
- "este bug podría repetirse"
- "quiero asegurar que esto no vuelva"
- "documenta el bug"

## Success Output Format

```
✅ BUG DOCUMENTADO

📍 Archivo: memory/debugging.md
📅 Entrada: [YYYY-MM-DD] ComponentName
🔍 Síntoma: [síntoma resumido]
✅ Fix: [breve descripción de la solución]
🛡️ Prevención: [test/validación que lo captura]

Bug guardado. Futuras developers podrán consultar esta solución.
```

## Failure Output Format

```
⚠️ NO SE PUDO DOCUMENTAR

Problema: [descripción del error]

Verificaciones:
  1. ¿debugging.md existe en memory/?
  2. ¿Todos los campos necesarios están presentes? (Síntoma, causa, fix, prevención)
  3. ¿El bug es reproductible o está completamente resuelto?

¿Quieres proporcionar más detalles?
```

## Related Skills

- `/log-adr` — Si este bug llevó a una decisión arquitectónica
- `/team-docs --session-log` — Para registrar que se resolvió en esta sesión
- `/audit` — Para validar que la prevención (tests, validación) esté en lugar

## Exit Codes

- `0` = Bug documentado exitosamente
- `1` = Error en lectura/escritura del archivo
- `2` = Información incompleta (usuario canceló)
