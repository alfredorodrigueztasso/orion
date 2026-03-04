# Knowledge-Capture Skills para Orion

**Fecha**: Marzo 4, 2026
**Skills disponibles**: 4 (`/log-pattern`, `/log-fix`, `/log-vision`, `/log-adr`)
**Almacenamiento**: `memory/` (topic files) + `VISUAL_GUIDELINES.md` (proyecto raíz)

---

## Quick Reference: Cuándo Usar Cada Skill

### Decision Tree

```
¿Qué acabas de descubrir/resolver?

├─ Una técnica CSS reutilizable (data-attribute, selector, composición)
│  └─> /log-pattern
│
├─ Un bug resuelto (síntoma, causa raíz, cómo se detecta)
│  └─> /log-fix
│
├─ Una regla visual o principio UX (tipografía, sombras, animaciones)
│  └─> /log-vision
│
└─ Una decisión arquitectural que establece un patrón
   (cambia un boundary del sistema, escala a N+casos)
   └─> /log-adr
```

---

## Tabla Rápida: Qué Documenta Cada Skill

| Skill | Qué Documenta | Archivo Destino | Modelo | Auto-trigger |
|---|---|---|---|---|
| **`/log-pattern`** | Técnicas CSS, composición de componentes, patrones de tokens | `memory/patterns.md` | haiku | "log this pattern", "patrón detectado", "save pattern" |
| **`/log-fix`** | Bugs resueltos con síntoma, causa raíz, fix, prevención | `memory/debugging.md` | haiku | "log this fix", "documenta este error", "save this bug" |
| **`/log-vision`** | Decisiones visuales/UX, principios de diseño, tipografía, sombras | `memory/design-vision.md` + `VISUAL_GUIDELINES.md` (stable) | haiku | "log design vision", "save UX decision", "visual principle" |
| **`/log-adr`** | Decisiones arquitecturales con razonamiento de escalabilidad | `memory/architecture-decisions.md` | default | "log architecture decision", "ADR", "this is scalable, not a patch" |

---

## Ejemplos Reales de Orion

### Ejemplo 1: `/log-pattern` — data-on-dark Context Selector

**Situación**: Descubres que Badge, Hero, Card necesitan aparecer en fondos oscuros sin prop drilling.

```bash
/log-pattern data-on-dark-context-selector
```

**Qué captura**:
- Problema: Múltiples componentes necesitan variant="inverse" manualmente en cada sitio
- Implementación: `[data-on-dark="true"]` HTML attribute + CSS `:global()` selector
- Extension Points: Aplica a Alert, Card, Chip, Button — cualquier componente
- Anti-patterns: No usar para brand-specific changes

**Resultado**: `memory/patterns.md` contiene la técnica completa — próxima vez que necesites esto, Claude lo encontrará.

---

### Ejemplo 2: `/log-fix` — ComponentShowcaseTabs Wrong Tabs API

**Situación**: Pasaste 30 minutos debuggeando por qué Tabs fallaba en docs-site.

```bash
/log-fix "ComponentShowcaseTabs wrong Tabs API"
```

**Qué captura**:
- Symptom: `TypeError: Cannot read properties of undefined (reading '0')`
- Root Cause: Código usaba API de Radix UI (compound pattern) en lugar de API de Orion Tabs (data-driven)
- Fix: Cambiar `<Tabs><Tabs.Content>` a `<Tabs tabs={[...]}>`
- Early Detection: Leer docs de Orion Tabs antes de asumir que está roto

**Resultado**: `memory/debugging.md` lo documenta — si vuelves a esse error, Claude lo reconoce y evita la sesión de debugging.

---

### Ejemplo 3: `/log-vision` — Display Mode Atmospheric Shadows

**Situación**: Iteras en Display mode y descubres que las sombras deben ser "generosas" vs Product mode.

```bash
/log-vision "display-mode-atmospheric-shadows"
```

**Qué captura**:
- Principle: "Display mode uses generous shadow depths (shadow-lg on hover) for atmospheric effect"
- Rationale: Atmospheric design requires depth cues; Product mode is flat so shadows are minimal
- Implementation: Use `var(--mode-shadow-hover)` token que cambia por modo
- Violations: No hardcodear `box-shadow: 0 8px 16px`

**Resultado**:
- `memory/design-vision.md` — para futuras decisiones de diseño
- **Si es Stable**: También `VISUAL_GUIDELINES.md` — carga en CLAUDE.md, disponible en cada sesión

---

### Ejemplo 4: `/log-adr` — Release Pipeline Separation

**Situación**: Realizas una mejora arquitectural: separar la compilación de core packages de docs-site.

```bash
/log-adr "release-pipeline-separation"
```

**Qué captura**:
- Context: docs-site failures were blocking npm releases even when packages were ready
- Decision: Create `npm run build:release` script que excluye docs-site
- Alternatives Considered: (1) Keep everything together — blocks releases, (2) Manual process — error-prone
- **Why Scalable**:
  - Scale: Cuando en futuro se añadan más infraestructura (analytics, blog), cada una no bloqueará releases
  - Phase N: Cada subsystem es independent, puede ser released por separado
  - Natural: Los devs entienden el concepto de "release-only dependencies"
  - vs Patch: Un parche sería hacer "npm run build", que es lo que teníamos antes

**Resultado**: `memory/architecture-decisions.md` → ADR-N con número de versión, fuerza la mentalidad "escalable, no parches"

---

## Flujo de Trabajo Integrado

### Sesión Típica en Orion

```
1. Haces cambios en un componente
   ↓
2. Descubres un patrón reutilizable
   └─> /log-pattern data-attribute-context

3. Encuentras y resuelves un bug
   └─> /log-fix nombre-del-bug

4. Iteras en diseño visual
   └─> /log-vision visual-principle

5. Tomas una decisión arquitectural
   └─> /log-adr decision-title

6. Próxima sesión: Claude ya sabe todos estos patrones/errores/principios
   └─> No necesitas re-explicar nada
```

---

## Dónde Se Almacena Todo

```
📁 memory/
├── patterns.md                          ← /log-pattern escribe aquí
├── debugging.md                         ← /log-fix escribe aquí
├── design-vision.md                     ← /log-vision escribe aquí
└── architecture-decisions.md            ← /log-adr escribe aquí (append-only)

📄 MEMORY.md (665 líneas, solo cargan 200)
   └─ NO se actualiza automáticamente — tú añades índices manualmente

📄 VISUAL_GUIDELINES.md (proyecto raíz)
   └─ Creado por /log-vision cuando marcas decisión como "Stable"
   └─ Referenciado en CLAUDE.md → carga en cada sesión
```

---

## Mejores Prácticas por Skill

### `/log-pattern`

**✅ Bueno**:
```
Pattern: data-on-dark Context Selector
Problem: Multiple components need variant="inverse" manually at each site
Implementation: [data-on-dark="true"] HTML attribute + CSS selector
Components Using: Badge, Hero (establecido en 2+ casos)
Status: Established ✅
```

**❌ Evitar**:
- "Patrón único" — si solo 1 componente lo usa, es demasiado pronto
- Sin código — un patrón sin implementación clara no es útil
- Sin anti-patterns — qué NO hacer es tan importante como qué SÍ hacer

---

### `/log-fix`

**✅ Bueno**:
```
Symptom: TypeError: Cannot read properties (reading '0')
Root Cause: Used Radix UI Tabs API instead of Orion Tabs API
Fix: Change <Tabs><Tabs.Content> to <Tabs tabs={[...]}>
Early Detection: Read component README before assuming it's broken
Complexity: moderate (required cross-file investigation)
```

**❌ Evitar**:
- Sin causa raíz — "simplemente estaba roto" no ayuda
- Sin detección temprana — un fix sin manera de evitarlo en futuro es incompleto
- Bugs triviales — typo fixes no necesitan logging

---

### `/log-vision`

**✅ Bueno**:
```
Visual Principle: Display Mode Atmospheric Shadows
Category: Motion
Applies to: Display mode only
Rationale: Atmospheric design requires depth cues
Implementation: var(--mode-shadow-hover) changes by mode
Violations: Never hardcode box-shadow values
Status: Stable ✅ (proven in Button, Card, Alert)
```

**❌ Evitar**:
- Sin rationale — "porque se ve mejor" no es suficiente
- Cross-mode conflicts — si viola CLAUDE.md, marcar Experimental
- Sin implementación tokens — qué CSS variables usar es crítico

---

### `/log-adr`

**✅ Escalable**:
```
Decision: data-on-dark propagation
Scale 1→N: Component-agnostic CSS, only one selector per variant
Phase N: When 8+ components use it, any container becomes "dark zone"
Natural adoption: Mirrors existing data-theme/data-brand patterns
Why not patch: Patch = manual variant="inverse" at every site (N×M places)
Status: Accepted ✅
```

**❌ No es Arquitectural** (marcar Experimental o rechazar):
- "Añadimos una prop" — si solo afecta 1 componente, es un cambio, no arquitectura
- "Bug fix" — arreglar un error no es una decisión arquitectural
- Sin "por qué escalable" — si no puedes responder esto, no es ADR

**Scalability Checklist** (mínimo 3/4):
- [ ] Funciona igual en 3+ componentes/sistemas
- [ ] Un dev futuro lo seguiría sin docs
- [ ] N+1 caso no requiere cambio global
- [ ] Hay un "ecosystem effect" nombrado

Si < 3: marca como **Experimental**, no Accepted.

---

## Integración con Otros Skills

Estos 4 skills **capturan conocimiento**. Se integran con otros skills que **actúan sobre** ese conocimiento:

```
Captura (Estos 4 skills)
├─ /log-pattern → memory/patterns.md
├─ /log-fix → memory/debugging.md
├─ /log-vision → memory/design-vision.md
└─ /log-adr → memory/architecture-decisions.md

Actúan sobre el conocimiento
├─ /validate-ai-first ← Usa patrones para validar compliance
├─ /update-component ← Usa visión para mantener consistencia visual
├─ /audit ← Lee architecture-decisions para entender sistema
└─ /pr-ready ← Verifica que cambios alinean con patrones documentados
```

---

## Cómo Usarlos en Sesiones Futuras

### Sesión N (próximas semanas)

Cuando vuelvas a Orion y enfrentes un problema similar:

```bash
# Claude reconoce automáticamente el contexto
# y puede sugerir: "Esto parece ser similar a /log-fix 'ComponentShowcaseTabs error'
# que documentamos antes. La causa raíz fue..."

# O: "Este patrón se parece a data-on-dark que documentamos.
# En lugar de inventar algo nuevo, podemos reutilizar esa técnica."

# O: "Esta decisión arquitectural alinea con ADR-N:
# Release Pipeline Separation. Ambas siguen el patrón de..."
```

### Cómo Claude Accede al Conocimiento

1. **Carga automática**: `memory/` files se leen al inicio de cada sesión
2. **Referencia en CLAUDE.md**: architecture-decisions.md carga directamente
3. **VISUAL_GUIDELINES.md**: Carga si fue creada (decisiones Stable)
4. **En la conversación**: Cuando sea relevante, Claude dice "Vi que documentamos..."

---

## FAQ Rápido

**P: ¿Y si documento algo y después cambia?**
R: Es OK marcar el ADR como `Deprecated` en una futura entrada. No sobrescribas, usa update protocol (ver reference.md de log-adr).

**P: ¿Qué pasa si doc documento algo que no es útil?**
R: Los archivos en `memory/` son append-only. Puedes limpiar manualmente si algo no vale. La idea es que todo lo que escribas tenga valor.

**P: ¿Los skills funcionan sin que invoque manualmente?**
R: Auto-trigger en lenguaje natural. Si dices "log this pattern", Claude puede invocar `/log-pattern` automáticamente. Pero también puedes usar manualmente con `/log-pattern nombre`.

**P: ¿Puedo escribir a estos archivos manualmente?**
R: Sí. Los archivos en `memory/` son Markdown normales. Pero el skill formatea siguiendo un estándar — usar el skill mantiene consistencia.

**P: ¿Qué pasa con MEMORY.md? ¿Por qué no escriben ahí?**
R: Está en 665 líneas (límite 200 para cargar). Escribir ahí = escribir en zona muerta. Topic files cargan completos. Tú añades índices manualmente si quieres hot-loading.

---

## Próximos Pasos

1. **Usa los skills en tu próximo trabajo en Orion**
2. **Observa qué funciona bien**, qué necesita ajuste
3. **En 2-3 sesiones**, tendremos experiencia real y podemos refinar

**Recuerda**: La idea es que Claude NUNCA olvide:
- Patrones que descubriste
- Errores que resolviste
- Principios visuales que emergieron
- Decisiones arquitecturales que tomaste

---

**Created**: 2026-03-04
**Status**: Ready to use
**Last Updated**: (cuando uses los skills por primera vez)
