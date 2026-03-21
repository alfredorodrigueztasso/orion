# Turbo Recursion Infinita - Análisis Técnico & Recomendaciones

**Fecha**: 21 Marzo 2026
**Estatus**: CRÍTICO - Requiere decisión arquitectónica
**Prioridad**: P0 Hotfix implementado, P1 Solución definitiva pendiente

---

## 1. ESTADO ACTUAL

### P0 Hotfix (Implementado ✅)

**Archivo**: `scripts/release.js` (líneas 240-249)

```javascript
// P0 FIX: Avoid turbo recursion - run tokens then packages directly
const tokensBuildResult = exec('npm run build:tokens');
if (!tokensBuildResult.success) {
  logError('Token build failed. Please fix issues before releasing.');
  process.exit(1);
}
logSuccess('Tokens built');

log('\n  Running package builds...');
const packagesBuildResult = exec('turbo run build --filter=!orion-docs');
```

**Impacto**:
- ✅ `npm run release:patch/minor/major` funciona sin recursión
- ✅ Release pipeline completamente independiente de la recursión
- ✅ `npm run release:dry` valida end-to-end

**Limitaciones**:
- ❌ `npm run build` sigue generando recursión (no usado en releases, pero rompe dev workflow)
- ❌ El filtro `--filter='...!orion-design-system'` es **inválido** en Turbo 2.x
  - Error: `No package found with name '!orion-design-system' in workspace`
  - Turbo 2.x NO soporta `!nombre` en filtros (sintaxis antigua de Turbo 1.x)
- ❌ `--filter=!orion-docs` en release.js también es inválido (mismo problema)

---

## 2. RAÍZ DEL PROBLEMA

### La Arquitectura Conflictiva

```
package.json (root)
├─ "build": "npm run build:tokens && npm run build:packages"
├─ "build:packages": "turbo run build --filter='...!orion-design-system'"  ← INVÁLIDO
└─ "build:release": "npm run build:tokens && npm run build:packages"

turbo.json
└─ "tasks": { "build": { "dependsOn": ["^build"], ... } }

Cuando ejecutas: npm run build:packages
├─ Turbo interpreta: turbo run build
├─ Turbo ejecuta: build task en TODOS los packages + ROOT
├─ Root "build" invoca: npm run build:packages
├─ Que a su vez invoca: turbo run build
└─ 🔴 LOOP INFINITO
```

### Por qué el filtro es inválido

**Turbo 2.x (Current)**:
- Soporta: `--filter=package-name` (by scope/name)
- Soporta: `--filter=./path` (by path)
- Soporta: `--filter=...package-name` (incluye dependencias)
- NO soporta: `!nombre` (negación - fue Turbo 1.x)
- NO soporta: `...!nombre` (negación con dependencias)

**Turbo 1.x (Legacy)**:
- Soportaba: `--filter=!nombre` (negación simple)

**Prueba ejecutada**:
```bash
$ npm run build:packages --dry-run
> turbo run build --filter='...!orion-design-system'
✗ No package found with name '!orion-design-system' in workspace
```

---

## 3. PROBLEMA DETECTADO EN FILTRO DE release.js

**Línea 249** en `scripts/release.js`:
```javascript
const packagesBuildResult = exec('turbo run build --filter=!orion-docs');
```

**Estado**:
- ❌ Usa sintaxis inválida `!orion-docs` (Turbo 1.x)
- ❌ NO está probado en CI/CD (hotfix no fue validado con ejecución real)
- ⚠️ Fallará cuando se ejecute `npm run release:patch`

**Impacto**:
- Release workflow está **ROTO** por sintaxis inválida del filtro
- El hotfix P0 es **INCOMPLETO** - parece funcionar pero fallará en producción

---

## 4. OPCIONES DE SOLUCIÓN

### Opción A: Excluir Root del Turbo Pipeline (RECOMENDADO)

**Ventaja**: Más limpio, arquitectónicamente correcto
**Desventaja**: Requiere refactor de scripts

**Cambios necesarios**:

1. **`package.json`**: Cambiar build scripts para NUNCA invocar turbo recursivamente
```json
{
  "build": "npm run build:tokens && npm run build:packages",
  "build:packages": "turbo run build --filter=@orion-ds/react --filter=@orion-ds/cli --filter=@orion-ds/mcp --filter=@orion-ds/create --filter=@orion-ds/validate",
  "build:release": "npm run build:tokens && npm run build:packages"
}
```

2. **`turbo.json`**: NO incluir raíz en task execution
```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"],
      "cache": true,
      "includeRoot": false  // ← Explícitamente excluir root
    }
  }
}
```

3. **`scripts/release.js`**: Usar filtro válido Turbo 2.x
```javascript
// En vez de --filter=!orion-docs
// Usar lista explícita de packages a construir
const packagesBuildResult = exec(
  'turbo run build --filter=@orion-ds/react --filter=@orion-ds/cli --filter=@orion-ds/mcp --filter=@orion-ds/create --filter=@orion-ds/validate'
);
```

**Validación**:
```bash
npm run build          # ✅ No recursión
npm run release:dry    # ✅ Release workflow
npm run dev:packages   # ✅ Dev workflow
```

---

### Opción B: Usar Subtarea separada (ALTERNATIVA)

**Ventaja**: Minimal refactor
**Desventaja**: Menos explícito

1. **`turbo.json`**: Crear task separado para root
```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "cache": true
    },
    "build:root": {
      "dependsOn": ["build"],
      "outputs": [],
      "cache": false
    }
  }
}
```

2. **`package.json`**: Root solo corre build:root
```json
{
  "build": "npm run build:tokens && turbo run build:root"
}
```

**Problema**: Turbo aún ejecutaría build tasks en packages, entonces estaría mejor que Opción A

---

### Opción C: Documentación + Workaround (CORTA PLAZO)

**Ventaja**: Cero cambios en turbo.json
**Desventaja**: No resuelve el problema real

Agregar a CLAUDE.md:
```markdown
### ⚠️ Known Issues

1. **npm run build causes recursion** — Use alternatives:
   - Development: `npm run build:tokens && npm run dev:packages`
   - Releases: `npm run release:patch` (uses direct commands, not npm run build)
   - CI/CD: Use `npm run audit && turbo run build --filter=@orion-ds/react --filter=@orion-ds/cli ...`

2. **Turbo 2.x filter syntax**: Use explicit package names, not `!name` (Turbo 1.x syntax)
```

---

## 5. RECOMENDACIÓN FINAL

### Estrategia: Opción A (Recomendado para P1)

**Razones**:
1. ✅ Resolución definitiva (no parches)
2. ✅ Arquitectónicamente limpio
3. ✅ Explícitamente documentado
4. ✅ Fácil de mantener (lista de packages en un solo lugar)
5. ✅ Compatible con Turbo 2.x
6. ✅ Zero breaking changes para usuarios

**Esfuerzo**: ~15 minutos
- 3 archivos a editar: `package.json`, `turbo.json`, `scripts/release.js`
- 1 manual test: `npm run build` sin recursión
- 1 smoke test: `npm run release:dry`

### Timeline de Implementación

**P0 (URGENTE - Ya implementado)**:
- ✅ release.js usa `exec()` directo (hotfix actual)
- ⚠️ Pero con sintaxis inválida `--filter=!orion-docs` — DEBE CORREGIRSE AHORA

**P0.5 (INMEDIATO - Dentro de 30 minutos)**:
- FIX: Cambiar `--filter=!orion-docs` a lista explícita en release.js
- TEST: `npm run release:dry` debe pasar
- COMMIT: "fix(build): correct turbo filter syntax for release workflow"

**P1 (ESTA SEMANA)**:
- Implementar Opción A
- Actualizar CLAUDE.md con nueva arquitectura
- Commit: "refactor(turbo): exclude root from build pipeline - eliminates recursion"

---

## 6. CAMBIOS INMEDIATOS REQUERIDOS

### Fix P0.5: release.js (línea 249)

**Antes**:
```javascript
const packagesBuildResult = exec('turbo run build --filter=!orion-docs');
```

**Después**:
```javascript
// List all packages explicitly to avoid Turbo 2.x filter syntax issues
const packagesBuildResult = exec(
  'turbo run build --filter=@orion-ds/react --filter=@orion-ds/cli --filter=@orion-ds/mcp --filter=@orion-ds/create --filter=@orion-ds/validate'
);
```

También cambiar línea 232 (audit):
```javascript
// Mejor: ejecutar audit directamente sin turbo para evitar ambigüedades
const auditResult = exec('npm run type-check && npm run validate');
```

---

## 7. EVIDENCIA & VALIDACIÓN

### Prueba Actual (Fallida)
```bash
$ npm run build:packages --dry-run
> turbo run build --filter='...!orion-design-system'
✗ No package found with name '!orion-design-system' in workspace
```

### Estado del Hotfix
- ✅ release.js estructura es correcta (direkt exec)
- ✅ release.js bypassa npm script recursion
- ❌ release.js usa sintaxis inválida (`!orion-docs`)
- ❌ `npm run build` aún genera loop infinito (pero no usado en releases)

### Validación Post-Fix (P0.5)
```bash
npm run release:dry
# Esperado: ✅ PASS - mostrará qué se publicaría sin errores de turbo
```

---

## 8. PREGUNTAS PENDIENTES PARA TECH LEAD

1. **¿Es aceptable tener `npm run build` en recursión infinita?**
   - Usuarios raramente lo usan directamente
   - Workflows usan `npm run release:patch` (release.js directo) o `npm run dev:packages` (turbo directo)
   - Pero es confuso documentalmente

2. **¿Cuál es la jerarquía de prioridad?**
   - P0.5: Fix sintaxis invalid del filtro (URGENTE - bloquea releases)
   - P1: Solución arquitectónica (Opción A) (esta semana)

3. **¿Debemos deprecar `npm run build` en favor de `npm run build:tokens && turbo run build --filter=...`?**
   - Más transparente
   - Menos confusión

---

## Summary de Commits Necesarios

| Prioridad | Cambio | Archivos | Descripción |
|-----------|--------|----------|-------------|
| **P0.5** | Fix Turbo filter syntax | `scripts/release.js` | Cambiar `!orion-docs` a lista explícita de packages |
| **P1** | Arquitectura limpia | `package.json`, `turbo.json`, `scripts/release.js`, `CLAUDE.md` | Opción A: Excluir root del pipeline |

---

**Creado**: 2026-03-21
**Estatus**: LISTO PARA IMPLEMENTAR
**Asignado a**: Tech Lead + Team
