---
name: team-git
description: Git & Release Manager for Orion Design System. Manages complete cycle from git diagnostics to npm publishing and GitHub. Uses MCP tools for git operations with Bash fallback. Auto-triggers when user says "commitea los cambios", "quiero hacer un release", "revisa el estado de git", "prepara el PR", "tengo cambios que subir", "hay conflictos".
allowed-tools: ["Bash", "Read", "Glob", "Grep", "AskUserQuestion", "mcp__git__git_status", "mcp__git__git_log", "mcp__git__git_diff", "mcp__git__git_add", "mcp__git__git_commit", "mcp__git__git_push", "mcp__github__create_pull_request", "mcp__github__list_branches", "mcp__github__get_pull_request", "mcp__github__merge_pull_request"]
argument-hint: [--status, --commit-only, --pr, --release, --dry-run, --setup-mcp]
---

# /team-git — Git & Release Manager

Orchestrates the complete git workflow: diagnostics, commits, PRs, releases, and GitHub operations. Uses MCP tools as primary interface with Bash fallback.

## Mode Overview

| Mode | Argument | Function |
|---|---|---|
| **Status** | `--status` (default) | Diagnóstico completo del repo |
| **Commit** | `--commit-only` | Agrupa cambios + genera commit convencional |
| **PR** | `--pr` | Crea PR via GitHub MCP |
| **Release** | `--release` | Análisis semántico de versión |
| **Setup** | `--setup-mcp` | Configura MCPs en settings.json |

## PASO 0: MCP Availability Check

En el primer run, verifica MCPs:

```bash
# Check server-git MCP
npx -y @modelcontextprotocol/server-git --version

# Check github MCP (via HTTP)
# Verify GITHUB_PERSONAL_ACCESS_TOKEN is set
```

Si no están disponibles:
- ✅ Si `--setup-mcp`: Guía al usuario para instalar/configurar
- ✅ Si otro modo: Usa `Bash` como fallback automático

**MCP Fallback Strategy**:
- MCP tools primarios, Bash secundario
- Si MCP falla, retry con Bash
- Reporta qué fue usado en output

---

## MODO 1: `--status` (Diagnóstico)

Proporciona estado completo del repo sin modificar nada.

### Ejecución

```bash
# Paralelos o secuencia (MCP primero, Bash fallback)
mcp__git__git_status          # O: git status --short
mcp__git__git_log             # O: git log --oneline -10
mcp__git__git_diff --stat     # O: git diff --stat
cd "/Users/alfredo/Documents/AI First DS Library" && git branch -v
cd "/Users/alfredo/Documents/AI First DS Library" && git tag --sort=-version:refname | head -5
```

### Output Format

```
GIT STATUS — Orion Design System
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Current Branch: main
  Status: ahead 3 commits to origin/main
  Last push: 2 hours ago

Version: v4.9.6 (latest tag)

Working Directory:
  ✅ Staged:      0 files
  ⚠️  Modified:    5 files (Button.tsx, theme.css, CLAUDE.md, ...)
  ❓ Untracked:   22 files (.md sueltos en raíz)

Recent Commits:
  a1b2c3d feat(badge): add inverse variant
  d4e5f6a fix(badge): remove neutral variant
  g7h8i9j docs(badge): reorganize stories

Commits pending push: 3
Tags in repo: 41

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Next Step Recommendations:
  1. Commit the 5 modified files
  2. Organize the 22 untracked .md files (use /team-docs --cleanup)
  3. Push commits to origin
  4. Create PR for review

What do you want to do?
  /team-git --commit-only     Push to git
  /team-git --pr              Create PR
  /team-git --release         Prepare release
  /team-docs --cleanup        Organize .md files
```

---

## MODO 2: `--commit-only`

Commits grouped changes with conventional messages.

### Ejecución

#### 2a. Pre-flight Check

```bash
/quick-check  # Ejecuta format + lint + type-check
```

Si falla, muestra errores y pregunta si continuar.

#### 2b. Analyze Changed Files

```bash
mcp__git__git_diff          # O: git diff --name-only
mcp__git__git_status        # O: git status --short
```

Lee lista y agrupa por tipo:
- Componentes (packages/react/src/components/*)
- Estilos (*.css, tokens/*)
- Tests (*.test.tsx)
- Docs (*.md)
- Configuración (config files)

#### 2c. Propose Grouping

```
Detecté 8 archivos modificados.

Propuesta de commits:

COMMIT 1: feat(badge): add inverse variant + data-on-dark
  - packages/react/src/components/Badge/Badge.tsx
  - packages/react/src/components/Badge/Badge.module.css
  - packages/react/src/components/Badge/Badge.types.ts

COMMIT 2: refactor(badge): reorganize stories for clarity
  - packages/react/src/components/Badge/Badge.stories.tsx

COMMIT 3: docs(claude): update badge usage examples
  - CLAUDE.md

¿Te parece? (sí / cambiar agrupación / commit único)
```

#### 2d. Generate Commit Message

Para cada grupo, pregunta o infiere:
- **Type**: feat/fix/refactor/docs/chore/test/style/perf
- **Scope**: componente/sistema afectado
- **Subject**: descripción breve (max 50 chars)

Ejemplo message:
```
feat(badge): add inverse variant + data-on-dark support

- Added Badge inverse variant for dark backgrounds
- Implemented data-on-dark context selector pattern
- Updated Badge tests and stories
```

#### 2e. Stage & Commit

```bash
mcp__git__git_add [file1] [file2] ...    # O: git add explicitly
mcp__git__git_commit "[message]"          # O: git commit -m "..."
```

**NUNCA** usa `git add .`  — siempre lista archivos explícitamente.

#### 2f. Confirm Before Each Commit

```
Voy a hacer este commit:

  git add packages/react/src/components/Badge/Badge.tsx \
          packages/react/src/components/Badge/Badge.module.css

  git commit -m "feat(badge): add inverse variant"

¿Continuar? (sí/no/revisar)
```

---

## MODO 3: `--pr`

Creates PR via GitHub MCP.

### Ejecución

#### 3a. Ensure Branch is Clean

```bash
mcp__git__git_status
# Si hay cambios: "Debes commitear primero. Use /team-git --commit-only"
```

#### 3b. Run PR Ready

```bash
/pr-ready  # Validación completa antes de PR
```

#### 3c. Create/Update Branch

```bash
# Si no existe branch feature:
git checkout -b feature/[feature-name]
mcp__git__git_push [--set-upstream]   # O: git push -u origin

# O si ya existe:
mcp__git__git_push   # O: git push
```

#### 3d. Create PR via GitHub MCP

```bash
mcp__github__create_pull_request \
  --title "[Título del PR]" \
  --body "[Body con descripción]" \
  --base main \
  --head [branch-name]
```

**OR** Fallback CLI:

```bash
gh pr create --title "[Título]" --body "[Body]"
```

#### 3e. Report Success

```
✅ PR CREADO

🔗 PR #123: feat(badge): add inverse variant
https://github.com/alfredo/orion-design-system/pull/123

Estado: Open
Rama: feature/badge-inverse → main

Próximos pasos:
  1. Pedir review a equipo
  2. Resolver comentarios
  3. Mergear cuando esté aprobado
```

---

## MODO 4: `--release`

Orchestrates full release pipeline.

### Ejecución

#### 4a. Analyze Commits Since Last Tag

```bash
mcp__git__git_log [last-tag]..HEAD --oneline   # O: git log
```

Lee commits y clasifica:
- Cuántos `feat:` hay
- Cuántos `fix:` hay
- Hay `BREAKING CHANGE` o `!` en tipo

#### 4b. Recommend Semver Bump

**Regla semántica**:
```
Solo fix:/chore: → PATCH (3.2.0 → 3.2.1)
Al menos un feat: → MINOR (3.2.0 → 3.3.0)
Cualquier BREAKING → MAJOR (3.2.0 → 4.0.0)
```

Presenta:
```
Análisis desde v4.9.6:
  3x feat:  (Badge inverse, data-on-dark, Hero integration)
  1x fix:   (Badge neutral deprecation)
  0x BREAKING CHANGE

Recomendación: MINOR → v4.10.0

¿Confirmas? (patch → 4.9.7 / minor → 4.10.0 / major → 5.0.0 / cancelar)
```

#### 4c. Run Pre-Release Gate

```bash
/pre-release  # Audit + build + tests + registry checks
```

Si falla, detén aquí. No procedes.

#### 4d. Delegate to Release Skill

```bash
/release-patch   # Si elegiste patch
/release-minor   # Si elegiste minor
/release-major   # Si elegiste major
```

---

## MODO 5: `--setup-mcp`

Configures MCPs in project settings.

### Ejecución

1. **Check if settings.json exists**
   ```bash
   cat "/Users/alfredo/Documents/AI First DS Library/.claude/settings.json"
   ```

2. **If not exists, create it**:
   ```json
   {
     "mcpServers": {
       "git": {
         "command": "npx",
         "args": ["-y", "@modelcontextprotocol/server-git", "/Users/alfredo/Documents/AI First DS Library"]
       },
       "github": {
         "type": "http",
         "url": "https://api.githubcopilot.com/mcp/",
         "headers": {
           "Authorization": "Bearer ${GITHUB_PERSONAL_ACCESS_TOKEN}"
         }
       }
     }
   }
   ```

3. **Guide user for GitHub token**:
   ```
   Necesito tu GitHub Personal Access Token.

   Para crearlo:
   1. Ve a https://github.com/settings/tokens/new
   2. Selecciona scopes: repo, workflow
   3. Copia el token
   4. Set environment: export GITHUB_PERSONAL_ACCESS_TOKEN=ghp_xxxxx
   5. Add a .env.local file o configure en settings.json

   ¿Ya tienes el token? (sí/no/ver instrucciones)
   ```

---

## Auto-Trigger Patterns

- "commitea los cambios"
- "quiero hacer un release"
- "revisa el estado de git"
- "prepara el PR"
- "tengo cambios que subir"
- "hay conflictos"
- "estado del repo"
- "qué hay en git"
- "organize estos cambios"

---

## Success Output Format

```
✅ OPERACIÓN COMPLETADA

📊 Sumario de cambios:
   Commits: 2
   Files: 8
   Lines: +45, -12

🚀 Status:
   ✅ Committed
   ⏳ Pending push
   (use git push para subir a origin)

O:

🎉 PR CREADO
#123 — feat(badge): add inverse variant
Ready for review

O:

🚀 RELEASE INICIADO
Minor version: v4.10.0
→ Running /pre-release now
```

---

## Failure Output Format

```
⚠️  OPERACIÓN ABORTADA

Problema: [descripción]

Soluciones:
  1. ...
  2. ...
  3. Reintenta con /team-git --status para diagnóstico

O:

❌ Pre-Release Check FAILED

Tests: 5/145 failing

Arregla con:
  1. /test-full
  2. Fix failing tests
  3. /team-git --release (reintentar)
```

---

## Related Skills

- `/quick-check` — Pre-flight antes de commit
- `/pr-ready` — Validación completa antes de PR
- `/pre-release` — Gate de release
- `/release-patch`, `/release-minor`, `/release-major` — Ejecutan el release
- `/team-docs` — Organiza archivos .md detectados

---

## Integration Chain

```
User: "Tengo cambios que subir"
  ↓
/team-git --status (diagnóstico)
  ├─ Detecta 22 .md sueltos
  └─ Sugiere /team-docs --cleanup (paralelo, no bloquea)
  ↓
/team-git --commit-only
  ├─ /quick-check (pre-flight)
  ├─ Agrupa cambios
  └─ git commit (con confirmación)
  ↓
/team-git --pr
  ├─ /pr-ready (validación)
  └─ mcp__github__create_pull_request (o gh pr create)
  ↓
(After merge)
/team-git --release
  ├─ Análisis semántico
  ├─ /pre-release (gate)
  └─ /release-patch|minor|major
```

---

## Exit Codes

- **0** = Operación exitosa
- **1** = Error en operación
- **2** = Usuario canceló
- **3** = MCPs no disponibles (pero usó fallback Bash)
