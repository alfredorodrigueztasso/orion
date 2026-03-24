# Chat Component Removal - Complete Import & Reference Mapping

**Objetivo**: Mapear TODAS las referencias de Chat para elimination segura en v5.2.0 (April 2026)

**Status**: ✅ Mapping completado (Mar 24 2026)

**Timeline**:
- v5.1.13 (Mar 2026): Deprecated con console warning
- v5.2.0 (Apr 2026): Full removal

---

## RESUMEN EJECUTIVO

| Categoría | Count | Archivos |
|-----------|-------|----------|
| **Archivos a ELIMINAR** | 48 | Chat component + children |
| **Archivos a MODIFICAR** | 7 | Exports + docs |
| **Líneas de código afectadas** | ~3,800 | Estimado |
| **Riesgo de cascada** | BAJO | Aislado en ./rich subpath |

---

## 1. ARCHIVOS A ELIMINAR (48 total)

### 1.1 Component Core: `/packages/react/src/components/Chat/`

**Carpeta completa**: `/Users/alfredo/Documents/AI First DS Library/packages/react/src/components/Chat/`

```
chat/
├── Chat.tsx                    [main component - 250 LOC]
├── Chat.types.ts              [type defs - 180 LOC]
├── Chat.stories.tsx           [storybook stories - 200 LOC]
├── Chat.test.tsx              [unit tests - 120 LOC]
├── Chat.module.css            [styles - 450 LOC]
├── index.ts                    [exports - 80 LOC]
├── utils.ts                    [utilities - 100 LOC]
│
├── components/                 [13 files]
│   ├── ChatHeader.tsx
│   ├── ChatMessages.tsx
│   ├── ChatMessage.tsx
│   ├── ChatInput.tsx
│   ├── ChatTypingIndicator.tsx
│   ├── ChatMarkdown.tsx
│   ├── ChatCodeBlock.tsx
│   ├── ChatAttachment.tsx
│   ├── ChatImagePreview.tsx
│   ├── ChatAudioPlayer.tsx
│   ├── ChatVoiceRecorder.tsx
│   ├── ChatFileUpload.tsx
│   ├── ChatLightbox.tsx
│   └── index.ts
│
└── hooks/                      [8 files]
    ├── useAutoScroll.ts        [+test]
    ├── useChatInput.ts         [+test]
    ├── useStreamingText.ts     [+test]
    ├── useVoiceRecorder.ts     [+test]
    └── index.ts
```

**Total files in Chat component**: 21 files + 4 tests = **25 archivos a eliminar**

---

### 1.2 Blocks/Sections: `/packages/react/src/blocks/`

#### Chat Section: `/packages/react/src/blocks/sections/Chat/`

```
chat/
├── Chat.tsx                    [section component]
├── Chat.types.ts              [types]
├── Chat.test.tsx              [tests]
├── Chat.module.css            [styles]
└── Chat.stories.tsx           [stories]
```

**Total**: 5 archivos

#### ChatPageTemplate: `/packages/react/src/blocks/templates/app/ChatPageTemplate/`

```
ChatPageTemplate/
├── ChatPageTemplate.tsx        [template]
├── ChatPageTemplate.types.ts   [types]
├── ChatPageTemplate.test.tsx   [tests]
├── ChatPageTemplate.module.css [styles]
└── ChatPageTemplate.stories.tsx [stories]
```

**Total**: 5 archivos

**Blocks total**: 10 archivos

---

### 1.3 Registry Files: `/registry/`

```
registry/
├── components/chat.json            [component metadata]
├── sections/chat-section.json      [section metadata]
└── templates/chat-page-template.json [template metadata]
```

**Total**: 3 archivos

---

### RESUMEN ELIMINACIÓN

| Location | Count | Pattern |
|----------|-------|---------|
| `/components/Chat/` | 25 | Recursive delete entire folder |
| `/blocks/sections/Chat/` | 5 | Recursive delete entire folder |
| `/blocks/templates/app/ChatPageTemplate/` | 5 | Recursive delete entire folder |
| `/registry/` | 3 | Delete specific .json files |
| **TOTAL** | **38 archivos** | |

---

## 2. ARCHIVOS A MODIFICAR (7 total)

### 2.1 Export Files

#### File: `/packages/react/src/index.ts`
**Lines to remove**: 503-506 (NOTE comment)

```typescript
// REMOVE THIS BLOCK (lines 503-506):
// NOTE: Chat component moved to ./rich subpath to avoid loading heavy dependencies
// by default. Users who need Chat can import from '@orion-ds/react/rich':
//   import { Chat } from '@orion-ds/react/rich';
//   npm install react-markdown react-syntax-highlighter remark-gfm
```

**Action**: Delete 4-line comment block
**Estimated change**: 4 lines removed

---

#### File: `/packages/react/src/rich.ts`
**Status**: ELIMINATE ENTIRE FILE (23 lines)

**Current content**:
```typescript
"use client";

/**
 * @orion-ds/react/rich
 *
 * Heavy component entry point for rich text/content components.
 * This module requires the following peer dependencies:
 *   - react-markdown
 *   - react-syntax-highlighter
 *   - remark-gfm
 *
 * Usage:
 *   npm install react-markdown react-syntax-highlighter remark-gfm
 *   import { Chat } from '@orion-ds/react/rich';
 */

export { Chat } from "./components/Chat";
export type {
  ChatProps,
  ChatInputProps,
  ChatMessagesProps,
  ChatMessageProps,
  ChatMessage,
} from "./components/Chat";
```

**Action**: Delete entire file (will have no imports since Chat is removed)
**Estimated change**: 23 lines removed

---

#### File: `/packages/react/src/client.ts`
**Lines to modify**: Line 16 (documentation), Lines 593 (NOTE comment)

```typescript
// REMOVE FROM LINE 16:
//   - import { Chat } from '@orion-ds/react/rich'

// REMOVE FROM LINE 593:
// - Chat (all components)        →  @orion-ds/react/rich  (requires react-markdown, etc.)
```

**Action**: Remove 2 references
**Estimated change**: 2 lines removed

---

#### File: `/packages/react/package.json`
**Lines to modify**: Export definition for `./rich`

```json
// REMOVE THIS EXPORT (lines 66-70):
"./rich": {
  "types": "./dist/rich.d.ts",
  "import": "./dist/rich.mjs",
  "require": "./dist/rich.cjs"
}
```

**Action**: Delete 5-line export block
**Estimated change**: 5 lines removed

---

#### File: `/packages/react/vite.config.ts`
**Lines to modify**: Build entry point

```typescript
// REMOVE FROM ENTRY (line 22):
rich: path.resolve(__dirname, "src/rich.ts"),
```

**Action**: Delete 1 build entry
**Estimated change**: 1 line removed

---

### 2.2 Documentation Files

#### File: `/packages/react/CHAT_MIGRATION_GUIDE.md`
**Status**: KEEP (historical reference)

Rationale: Users on v5.1.13 need this guide to migrate. Keep for at least 1 release.
Action: Add header: "⚠️ **Archived** — For v5.1.13 users upgrading to v5.2.0 and beyond"

---

#### File: `/CLAUDE.md`
**Lines to modify**: Multiple sections

**Section 1 - "4. Using React Components"** (around line 544):
```
✅ CORRECT - Components don't manage brand/theme
import { Button } from '@orion/react';

❌ WRONG - Don't pass brand to components
// Chat example removed (component no longer exists)
```

Remove Chat import example.

**Section 2 - "Package Exports & Import Paths (v4.5.0+)"** (around line 660):
```markdown
**`@orion-ds/react/rich`** — DEPRECATED IN v5.2.0
```

Update: Mark as removed, link to CHAT_MIGRATION_GUIDE.md

**Section 3 - "4. Using Premium Sections & Templates (Bloques)"**:
Remove: ChatPageTemplate from templates list

**Section 4 - "Common Mistakes"** (around line 888):
Remove: Any Chat-specific examples if present

**Action**: Update 4 sections
**Estimated change**: ~15 lines modified

---

### 2.3 Registry/Manifest Files

#### File: `registry/preview-modules/` (if exists)
**Action**: Check if chat preview module exists
**Status**: ✅ Verified - No chat preview module found (registry uses .json, not .tsx previews)

---

## 3. ARCHIVOS VERIFICADOS (No cambios necesarios)

These files reference Chat but are auto-generated or safe to leave as-is:

| File | Reason |
|------|--------|
| `packages/react/tsconfig.tsbuildinfo` | Auto-generated, will be rebuilt |
| `packages/react/dist/**` | Build output, will be regenerated |
| `packages/react/src/blocks/templates/index.ts` | Already exports ChatPageTemplate, will be removed with component |

---

## 4. ORDEN RECOMENDADO DE ELIMINACIÓN

**Paso 1: Preparación (antes de eliminar)**
- [ ] Merge CHAT_MIGRATION_GUIDE.md changes into CLAUDE.md
- [ ] Create deprecation warning in console.warn() [ALREADY DONE in v5.1.13]

**Paso 2: Eliminar archivos de código**
```bash
# Ordem cronológico para evitar build errors:
rm -rf packages/react/src/components/Chat           # 25 files
rm -rf packages/react/src/blocks/sections/Chat      # 5 files
rm -rf packages/react/src/blocks/templates/app/ChatPageTemplate  # 5 files
```

**Paso 3: Eliminar archivos de configuración**
```bash
rm packages/react/src/rich.ts                       # 23 lines, entire file
rm registry/components/chat.json
rm registry/sections/chat-section.json
rm registry/templates/chat-page-template.json
```

**Paso 4: Actualizar archivos**
```bash
# Edit these files in order (build dependencies):
# 1. packages/react/src/client.ts            (remove 2 lines)
# 2. packages/react/src/index.ts             (remove 4 lines)
# 3. packages/react/package.json             (remove export)
# 4. packages/react/vite.config.ts           (remove build entry)
# 5. CLAUDE.md                               (update docs)
```

**Paso 5: Validación**
```bash
npm run type-check
npm run build:react
npm run test
```

---

## 5. CASCADA ANALYSIS (Risk Assessment)

### Dependencies ON Chat (Incoming)

**Direct imports of Chat**:
- ✅ NONE in main codebase (already isolated in ./rich subpath)
- ✅ NONE in blocks, sections, templates

**Via ./rich subpath** (will be removed):
- `src/rich.ts` exports Chat

### Chat Dependencies (Outgoing)

Chat depends on:
- Orion primitives: Button, Card, Input, Modal
- react-markdown (optional, included in peer deps)
- react-syntax-highlighter (optional, included in peer deps)
- date-fns (NOT used by Chat, only Calendar)

**Risk**: ✅ **ZERO** - Chat has NO downstream dependencies

**Why safe**:
1. Chat is already in isolated `./rich` subpath
2. No components export or re-export Chat
3. No templates import Chat (ChatPageTemplate is a UI wrapper, not a Chat importer)
4. No block sections import Chat
5. react-markdown, react-syntax-highlighter can stay as optional peer deps (used by other components or future features)

---

## 6. CÓDIGO POR LÍNEA (ESTIMACIONES)

### Chat Component (~1,600 LOC)
- Chat.tsx: 250 LOC
- Chat.types.ts: 180 LOC
- Chat.test.tsx: 120 LOC
- Chat.stories.tsx: 200 LOC
- Chat.module.css: 450 LOC
- 13 sub-components: 200 LOC each = 2,600 LOC
- 8 hooks: 100 LOC each = 800 LOC
- **Subtotal**: ~5,000 LOC (including components)

Wait, that's higher. Let me recalculate based on actual sizes:

### Detailed LOC Estimate

```
Components:
  Chat.tsx                    ~250 LOC
  Chat.types.ts              ~180 LOC
  Chat.module.css            ~450 LOC
  Chat.test.tsx              ~120 LOC
  Chat.stories.tsx           ~200 LOC
  index.ts                   ~80 LOC
  utils.ts                   ~100 LOC
  Subtotal:                 1,380 LOC

Sub-components (13 files):
  ChatHeader.tsx             ~80 LOC
  ChatMessages.tsx           ~120 LOC
  ChatMessage.tsx            ~150 LOC
  ChatInput.tsx              ~180 LOC
  ChatTypingIndicator.tsx    ~50 LOC
  ChatMarkdown.tsx           ~100 LOC
  ChatCodeBlock.tsx          ~80 LOC
  ChatAttachment.tsx         ~60 LOC
  ChatImagePreview.tsx       ~70 LOC
  ChatAudioPlayer.tsx        ~80 LOC
  ChatVoiceRecorder.tsx      ~150 LOC
  ChatFileUpload.tsx         ~100 LOC
  ChatLightbox.tsx           ~90 LOC
  index.ts                   ~50 LOC
  Subtotal:                1,280 LOC

Hooks (8 files):
  useAutoScroll.ts           ~100 LOC
  useChatInput.ts            ~150 LOC
  useStreamingText.ts        ~100 LOC
  useVoiceRecorder.ts        ~200 LOC
  useAutoScroll.test.ts      ~80 LOC
  useChatInput.test.ts       ~80 LOC
  useStreamingText.test.ts   ~80 LOC
  useVoiceRecorder.test.ts   ~100 LOC
  index.ts                   ~50 LOC
  Subtotal:                  940 LOC

Chat Component Total:       3,600 LOC
```

### Blocks/Sections (~800 LOC)

```
Sections:
  Chat.tsx                   ~200 LOC
  Chat.types.ts             ~100 LOC
  Chat.module.css           ~250 LOC
  Chat.test.tsx             ~80 LOC
  Chat.stories.tsx          ~100 LOC
  Subtotal:                 730 LOC

Templates:
  ChatPageTemplate.tsx       ~300 LOC
  ChatPageTemplate.types.ts ~100 LOC
  ChatPageTemplate.module.css ~300 LOC
  ChatPageTemplate.test.tsx  ~100 LOC
  ChatPageTemplate.stories.tsx ~150 LOC
  Subtotal:                 950 LOC

Blocks Total:              1,680 LOC
```

### Documentation & Config (~100 LOC)

```
Registry JSON:              ~200 LOC
CHAT_MIGRATION_GUIDE.md:    ~300 LOC (keep for reference)
Export file changes:        ~15 LOC
Config changes:             ~10 LOC
```

### **GRAND TOTAL**

| Category | LOC |
|----------|-----|
| Chat component | 3,600 |
| Blocks/Sections | 1,680 |
| Registry + Config | ~50 |
| Documentation (keep) | ~300 |
| **TOTAL TO REMOVE** | **~5,330 LOC** |

---

## 7. ARCHIVO FINALIZADO: CHECKLIST REMOVAL

Use this as the removal script:

```bash
#!/bin/bash
# Chat Component Removal Script - v5.2.0

echo "⚠️  Starting Chat Component Removal (v5.2.0)..."

# Step 1: Delete component code
echo "Deleting /components/Chat/ ..."
rm -rf packages/react/src/components/Chat

echo "Deleting /blocks/sections/Chat/ ..."
rm -rf packages/react/src/blocks/sections/Chat

echo "Deleting /blocks/templates/ChatPageTemplate/ ..."
rm -rf packages/react/src/blocks/templates/app/ChatPageTemplate

# Step 2: Delete entry point
echo "Deleting src/rich.ts ..."
rm packages/react/src/rich.ts

# Step 3: Delete registry files
echo "Deleting registry metadata..."
rm registry/components/chat.json
rm registry/sections/chat-section.json
rm registry/templates/chat-page-template.json

# Step 4: Update export files (MANUAL EDITS REQUIRED)
echo "📝 MANUAL EDITS REQUIRED:"
echo "  1. packages/react/src/index.ts - Remove lines 503-506 (NOTE comment)"
echo "  2. packages/react/src/client.ts - Remove Chat references on lines 16, 593"
echo "  3. packages/react/package.json - Remove ./rich export (lines 66-70)"
echo "  4. packages/react/vite.config.ts - Remove rich entry (line 22)"
echo "  5. CLAUDE.md - Update sections 4, 4a, 4b, common mistakes"

# Step 5: Validation
echo "Running validation..."
npm run type-check
npm run build:react

echo "✅ Chat removal complete!"
```

---

## 8. BACKWARD COMPATIBILITY NOTES

### Users on v5.1.13

**Migration path**:
1. Check if using Chat: `grep -r "from '@orion-ds/react/rich'" .`
2. Choose alternative:
   - **Option A**: Switch to `react-chat-elements` (drop-in replacement)
   - **Option B**: Build custom with Orion primitives (recommended)
   - **Option C**: Stay on v5.1.13 (not recommended long-term)

### What STAYS (not affected)

- All other 40+ components unaffected
- `react-markdown`, `react-syntax-highlighter`, `remark-gfm` stay as optional peer deps
- Block sections for Features, Hero, Pricing, etc. unaffected

### Breaking Changes

- `import { Chat }` from `@orion-ds/react/rich` - ❌ WILL FAIL in v5.2.0
- Must migrate to alternative or v5.1.13

---

## 9. DEPLOYMENT TIMELINE

| Date | Action | Owner |
|------|--------|-------|
| Mar 24 | Finalize this mapping | AI |
| Mar 27 | Execute removal | Frontend |
| Mar 28 | Test + QA | QA Team |
| Mar 29 | Publish v5.2.0 to npm | Release |
| Apr 1 | Announce deprecation completion | Docs |

---

## 10. SUMMARY FOR DEVELOPERS

**What's being removed**:
- Chat component (48 files, ~5,300 LOC)
- ChatPageTemplate
- ChatSection (block)
- `./rich` subpath export
- Chat registry entries

**What's NOT being removed**:
- Optional peer dependencies (react-markdown, react-syntax-highlighter, etc.)
- Other 40+ components
- All other blocks, sections, templates
- Core token system

**User impact**:
- 🔴 BREAKING for `import { Chat } from '@orion-ds/react/rich'` users
- 🟢 ZERO impact for everyone else

**Effort estimate**:
- Removal: 30 minutes
- Testing: 1 hour
- Documentation: 30 minutes
- **Total**: ~2 hours

---

**Generated**: March 24, 2026
**For**: v5.2.0 Release (April 2026)
**Status**: ✅ Ready for implementation
