---
name: Chat Component Classification & Heavy Component Pattern
description: Design analysis of Chat's move to ./rich subpath and classification framework for future heavy components
type: architecture
date: 2026-03-24
status: active
---

# Chat Component Classification: Design Lead Analysis

## Executive Summary

The move of Chat from main export to `@orion-ds/react/rich` subpath in v5.1.13 was **operationally necessary** (fixed npm blockers) but reveals a **deeper design question**: How do we classify and communicate heavy components in an AI-first system that prizes clarity over surprise?

**Recommendation**: Adopt a 3-tier component classification system with explicit documentation and error messaging that prevents user confusion and establishes a sustainable pattern for future heavy components.

---

## 1. Brand Coherence Analysis

### Is Chat a "Core Component" or "Premium Feature"?

**Current State (v5.1.13)**: Ambiguous
- Chat is moved to subpath (signal: premium/optional)
- But Chat wasn't marketed as premium—it was just heavy
- Users expecting Chat in main export will be surprised

**Design Decision**: Chat should be classified as **"Rich Content Component"** (not premium, not basic)

**Rationale**:
- **Not premium**: Available to all users (no paywall)
- **Not basic**: Requires 5 peer dependencies (react-markdown, react-syntax-highlighter, remark-gfm + JSDoc imports)
- **Actually**: A **specialty component** for conversational interfaces with markdown support
- **Analogy**: Like how specialized tools (Chart for data viz, Calendar for date pickers) are in separate subpaths

**Impact on Identity**:
- ✅ Reinforces "AI-first" → Chat IS AI-first (conversational, markdown, code highlighting)
- ✅ Maintains "lightweight core" → Chat opt-in keeps base package small
- ✅ Signals "ecosystem designed for growth" → Users can add Chat when needed
- ❌ Risk: Confuses casual users who expect "Chat" to be in main (need clear messaging)

### Communication Priority

**For Brand Coherence, prioritize this message:**

> "Orion's core library is intentionally lightweight. Specialized components like Chat, Chart, and Calendar live in focused subpaths, available whenever you need them. This design keeps your bundle small while scaling to complex applications."

**This positions as a feature, not a limitation.**

---

## 2. Component Classification Framework

### Tier 1: Core Components (Main Export `@orion-ds/react`)

**Criteria**:
- ✅ Zero optional dependencies (or only lucide-react)
- ✅ Used in 80%+ of applications
- ✅ Stable API (rarely change)
- ✅ Small bundle impact (<50KB)

**Current Examples**:
- Button, Field, Card, Alert
- Modal, Drawer, Popover
- Accordion, Tabs, Breadcrumb
- DataTable, Sidebar, Navbar
- All hooks, contexts, ThemeProvider

**Bundle Impact**: ~80KB minified (core + theme)

---

### Tier 2: Specialty Components (Dedicated Subpaths)

**Criteria**:
- ⚠️ Optional peer dependencies (user must install explicitly)
- ⚠️ Used in 30-50% of applications
- ⚠️ API may evolve with dependency updates
- ⚠️ Medium bundle impact (30-100KB)

**Current Framework**:
- `@orion-ds/react/chart` → requires recharts (35KB)
- `@orion-ds/react/calendar` → requires date-fns (40KB)
- `@orion-ds/react/dnd` → requires @dnd-kit (25KB)
- `@orion-ds/react/editor` → requires react-syntax-highlighter (120KB)
- `@orion-ds/react/rich` → requires react-markdown, remark-gfm (95KB)

**Subpath Naming Convention**:
- By category (chart, calendar, dnd, editor, rich)
- Not by component name (users know what they're looking for)

**Bundle Impact per Specialty**:
- chart: ~115KB with recharts
- calendar: ~55KB with date-fns
- dnd: ~40KB with @dnd-kit
- editor: ~160KB with react-syntax-highlighter
- rich: ~130KB with react-markdown + remark-gfm

**User Experience**:
```
Main export attempt:
import { Chat } from '@orion-ds/react';  // ❌ Friendly error

Error output:
"Chat component requires @orion-ds/react/rich subpath.
Install peer dependencies: npm install react-markdown react-syntax-highlighter remark-gfm
Then import: import { Chat } from '@orion-ds/react/rich';"
```

**Comparison to other systems**:
- shadcn: All components in single export, all optional
- Radix: All components in single scope, peer deps optional
- **Orion**: Lightweight core + focused subpaths (differentiator)

---

### Tier 3: Premium/Brand-Specific (Future - `@orion-ds/blocks`)

**Criteria**:
- 🔮 Paid or brand-exclusive content
- 🔮 Large templates, pre-built sections
- 🔮 Heavy design/UX specialization
- 🔮 Very large bundle (>500KB)

**Proposed Examples** (not yet implemented):
- `@orion-ds/blocks/templates` → LandingPageTemplate, DashboardTemplate
- `@orion-ds/blocks/premium` → Premium sections (Hero, Pricing with animations, etc.)

**Note**: Currently blocks are bundled with react (architecture decision from v4.5.0), but future versions may separate tier 3 entirely.

---

## 3. Component Classification Table (Current + Future)

| Tier | Name | Export Path | Peer Deps | Bundle | Example |
|------|------|------------|-----------|--------|---------|
| 1 | **Core** | `@orion-ds/react` | lucide-react | ~80KB | Button, Card, Modal |
| 2a | **Specialty: Data** | `@orion-ds/react/chart` | recharts | ~115KB | ChartContainer |
| 2b | **Specialty: Date** | `@orion-ds/react/calendar` | date-fns | ~55KB | Calendar, DatePicker |
| 2c | **Specialty: Drag** | `@orion-ds/react/dnd` | @dnd-kit/* | ~40KB | CollapsibleFolder |
| 2d | **Specialty: Code** | `@orion-ds/react/editor` | react-syntax-highlighter | ~160KB | CodeEditor |
| 2e | **Specialty: Rich** | `@orion-ds/react/rich` | react-markdown, remark-gfm | ~130KB | Chat |
| 3 | **Premium** | `@orion-ds/blocks/premium` | (future) | ~500KB+ | Hero Variants |

---

## 4. Documentation Requirements

### For CLAUDE.md Update

**Section to add: "Component Tier System"**

```markdown
## Component Classification System

Orion uses a **3-tier architecture** to balance bundle size, functionality, and discoverability:

### Tier 1: Core Components (Lightweight)
Always available from main export. Zero optional dependencies (except lucide-react).

### Tier 2: Specialty Components (Opt-In)
Available via dedicated subpaths. Each subpath represents a functional category with shared dependencies.

### Tier 3: Premium Components (Future)
Brand-specific or heavy templates. Distributed separately for maximum flexibility.

[See Component Classification Table](#component-classification-table) for complete inventory.
```

**Update "Package Exports & Import Paths" section** to explain WHY subpaths exist:

```markdown
#### Why Separate Subpaths?

Three reasons Orion uses subpaths instead of a single monolithic export:

1. **Bundle Size Control** — Your app only loads dependencies you actually use
2. **Peer Dependency Clarity** — Importing from `@orion-ds/react/chart` makes it obvious recharts is required
3. **Scalability** — New components can be added to existing subpaths without bloating the core

#### Choosing Between Tiers

- **Core** (`@orion-ds/react`): Use for basic UI building
- **Specialty** (`@orion-ds/react/chart`, `./calendar`, `./rich`): Import only when you need that component
- **Premium** (future): Enterprise features and heavy templates
```

---

### For AI_COMPONENTS.md Update

**Add section: "Heavy Components & Optional Dependencies"**

```markdown
## Heavy Components (Specialty Tiers)

Some components require additional dependencies and live in focused subpaths:

### Chart Component (`@orion-ds/react/chart`)
**Required**: `npm install recharts`
```tsx
import { ChartContainer, ChartTooltipContent } from '@orion-ds/react/chart';
```

### Calendar & DatePicker (`@orion-ds/react/calendar`)
**Required**: `npm install date-fns`
```tsx
import { Calendar, DatePicker } from '@orion-ds/react/calendar';
```

### Drag & Drop (`@orion-ds/react/dnd`)
**Required**: `npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities`
```tsx
import { CollapsibleFolder } from '@orion-ds/react/dnd';
```

### Code Editor (`@orion-ds/react/editor`)
**Required**: `npm install react-syntax-highlighter`
```tsx
import { CodeEditor } from '@orion-ds/react/editor';
```

### Chat & Rich Content (`@orion-ds/react/rich`)
**Required**: `npm install react-markdown react-syntax-highlighter remark-gfm`
```tsx
import { Chat } from '@orion-ds/react/rich';
```

**Rule**: Always check the subpath's required dependencies before importing.
```

---

### For Release Notes (v5.1.13)

**Title**: "Optimized Bundle Size with Component Tiers"

```markdown
## 🎯 Breaking Change: Chat Component Location

**What changed**: Chat component moved to dedicated subpath

### Before (v5.1.12)
```tsx
import { Chat } from '@orion-ds/react';  // ❌ Caused npm install failures
```

### After (v5.1.13)
```tsx
import { Chat } from '@orion-ds/react/rich';  // ✅ Explicit, lightweight main export
npm install react-markdown react-syntax-highlighter remark-gfm  // Required peer deps
```

### Why?
- **Bundle size**: Main export stays lightweight (~80KB)
- **Clarity**: Importing from ./rich signals "heavy component, requires setup"
- **Reliability**: Users of Button/Card/Field never hit missing optional dependencies
- **Pattern**: Matches other specialty components (chart, calendar, dnd, editor)

### Migration Guide
1. Install peer dependencies: `npm install react-markdown react-syntax-highlighter remark-gfm`
2. Update import: `import { Chat } from '@orion-ds/react/rich'`
3. Ensure ThemeProvider wraps your app

### This is a feature, not a limitation
Other heavy components already use this pattern:
- Chart → `@orion-ds/react/chart` (requires recharts)
- Calendar → `@orion-ds/react/calendar` (requires date-fns)
- DnD → `@orion-ds/react/dnd` (requires @dnd-kit)

Learn more: [Orion Component Tiers →](./CLAUDE.md#component-tier-system)
```

---

## 5. User Experience Recommendations

### Add Helpful Error Messages

When users try wrong import path:

```typescript
// User attempts: import { Chat } from '@orion-ds/react'
// Should get friendly error:

"⚠️ Chat component not found in @orion-ds/react

Chat is a 'rich content' component that requires additional dependencies.

✅ Correct import:
import { Chat } from '@orion-ds/react/rich';

📦 Required setup:
npm install react-markdown react-syntax-highlighter remark-gfm

📖 Learn more: https://docs.orion.design/rich-components"
```

**Implementation**: TypeScript export with helpful error message

```typescript
// packages/react/src/index.ts
export {
  // ... other exports
};

// Add this comment for IDE users (shows in autocomplete)
/**
 * @deprecated Chat component moved to @orion-ds/react/rich to reduce bundle size
 *
 * ✅ Use instead:
 * import { Chat } from '@orion-ds/react/rich'
 * npm install react-markdown react-syntax-highlighter remark-gfm
 */
export const Chat: never;
```

---

### Linter Rule (ESLint Plugin - Future)

```javascript
// packages/eslint-plugin-orion-imports/rules/no-heavy-imports.js

module.exports = {
  create(context) {
    return {
      ImportDeclaration(node) {
        const source = node.source.value;
        const specifiers = node.specifiers.map(s => s.imported.name);

        // Check for Chat in main export
        if (source === '@orion-ds/react' && specifiers.includes('Chat')) {
          context.report({
            node,
            message: 'Chat component must be imported from @orion-ds/react/rich',
            fix(fixer) {
              return fixer.replaceText(node.source, "'@orion-ds/react/rich'");
            }
          });
        }

        // Check for other heavy components
        const heavyComponents = {
          Chart: 'chart',
          Calendar: 'calendar',
          CollapsibleFolder: 'dnd',
          CodeEditor: 'editor'
        };

        for (const [comp, subpath] of Object.entries(heavyComponents)) {
          if (source === '@orion-ds/react' && specifiers.includes(comp)) {
            context.report({
              node,
              message: `${comp} component must be imported from @orion-ds/react/${subpath}`,
              fix(fixer) {
                return fixer.replaceText(node.source, `'@orion-ds/react/${subpath}'`);
              }
            });
          }
        }
      }
    };
  }
};
```

---

## 6. Consistency Check: Other Heavy Components

### Existing Implementations

| Component | Subpath | Status | Documented |
|-----------|---------|--------|-----------|
| ChartContainer | chart | ✅ Correct | ✅ Yes |
| Calendar | calendar | ✅ Correct | ✅ Yes |
| CollapsibleFolder | dnd | ✅ Correct | ✅ Yes |
| CodeEditor | editor | ✅ Correct | ⚠️ Needs update |
| Chat | rich | ✅ NEW (v5.1.13) | ⚠️ Needs update |

### Consistency Assessment

**Good news**: Chat follows the established pattern.

**Concerns**:
- CodeEditor location not well documented (users might try main import)
- AI_COMPONENTS.md doesn't mention Tier 2 at all (users don't know why components are in subpaths)
- No unified documentation on "which components have peer dependencies"

---

## 7. Future Pattern: Extending the System

### When to Add New Specialty Subpaths

**Decision flowchart**:

```
Does component have optional peer dependency?
├─ NO → Core export (@orion-ds/react)
└─ YES:
    ├─ Can use existing category? (chart, calendar, dnd, editor, rich)
    │  └─ YES → Add to that subpath
    └─ NO:
        ├─ Fewer than 3KB of code? → Ship with closest category
        └─ More than 3KB? → Create new subpath
```

### New Subpath Naming Convention

| Subpath | Use When | Examples |
|---------|----------|----------|
| `./chart` | Data visualization | ChartContainer, any recharts wrappers |
| `./calendar` | Date picking | Calendar, DatePicker, DateRangePicker |
| `./dnd` | Drag & drop | CollapsibleFolder, future SortableList |
| `./editor` | Code editing | CodeEditor, future DiffViewer |
| `./rich` | Rich content | Chat, future Markdown viewer, Rich text editor |
| `./maps` (future) | Geographic data | Map, GeoChart |
| `./table-pro` (future) | Advanced tables | AdvancedDataTable with filtering/grouping |

---

## 8. Implementation Checklist

### For Immediate Release (Already Done ✅)

- [x] Move Chat to `@orion-ds/react/rich` subpath
- [x] Remove Chat from main export
- [x] Add package.json export for `./rich`
- [x] Fix npm install failures (v5.1.13)
- [x] Test in clean npm environment

### For Next Release (v5.2.0)

- [ ] Update CLAUDE.md with Tier System section
- [ ] Update AI_COMPONENTS.md with "Heavy Components" section
- [ ] Add error message for Chat import from main
- [ ] Document all peer dependencies in subpath READMEs
- [ ] Create COMPONENT_TIERS.md comprehensive guide
- [ ] Update release notes to explain the pattern

### For Future (v5.3.0+)

- [ ] Create @orion-ds/eslint-plugin-orion for import validation
- [ ] Add subpath README.md files (packages/react/src/rich/README.md, etc.)
- [ ] Document "scalability pattern" for teams extending Orion
- [ ] Consider separating `./blocks` from main (Tier 3 extraction)

---

## 9. Communication Strategy

### By Audience

#### For Existing Users (Migration)

**Tone**: "Better for you"

> "Chat moved to a dedicated subpath. This keeps your bundle smaller if you don't use Chat, and makes setup clearer when you do. Same powerful component, better organized library."

**Channels**:
- Changelog (v5.1.13)
- GitHub Discussions: "Chat component relocation"
- Package.json deprecation warning

#### For New Users (Discovery)

**Tone**: "Intentional design"

> "Orion's component library is organized in tiers. Core components are always available. Specialty components like Chat live in focused subpaths—zero bundle bloat, clear intent. Choose what you need."

**Channels**:
- Documentation landing page
- Getting Started guide
- AI_COMPONENTS.md (authoritative reference)
- Storybook sidebar organization

#### For LLMs / AI Agents (Strict Rules)

**Tone**: "Compliance"

> "Chat component is ONLY available at @orion-ds/react/rich. Importing from main export will fail. Always check CLAUDE.md Component Classification Table for correct import paths."

**Channels**:
- CLAUDE.md (primary source of truth)
- AI_COMPONENTS.md (inventory)
- AI_GUIDE.md (setup rules)
- JSDoc comments (IDE hints)

---

## 10. Design Principles Reinforced

This classification system reinforces three core Orion principles:

### Principle 1: Chain of Truth
- **Main export** = core truth (what's stable)
- **Subpaths** = specialized variations (what's optional)
- **Single source of truth**: CLAUDE.md Component Classification Table

### Principle 2: Zero Hallucination
- Clear rules prevent AI/developers from guessing import paths
- Error messages guide users to correct location
- Classification table eliminates ambiguity

### Principle 3: AI-First
- Explicitly acknowledging that Chat is an AI component (conversational, markdown)
- Subpath patterns make it easy for AI systems to reason about dependencies
- Documentation written for both humans and LLMs

---

## 11. Risk Assessment

### Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|-----------|
| Users expect Chat in main | High | Medium | Clear migration guide + error message |
| Developers forget to install peer deps | Medium | Medium | Post-install validation script |
| Future contributors add heavy components to main | Medium | High | ESLint rule + PR checklist |
| Confusion about which tier a component belongs to | High | Low | COMPONENT_TIERS.md + AI docs |

### Mitigation Plan

1. **Documentation**: v5.2.0 adds comprehensive tier system docs
2. **Validation**: Pre-commit hook prevents heavy components in main
3. **Testing**: Smoke test suite validates subpath completeness
4. **Education**: Release blog post + changelog explain the "why"

---

## 12. Conclusion

The Chat component's move to `@orion-ds/react/rich` is **correct architecture**, but requires **investment in communication**. The real value isn't in the move itself—it's in establishing a sustainable pattern for scaling Orion without bloating the core.

### Design Lead Recommendation

**Tier this work**:

1. **Immediate (v5.1.13 - Already Done)** ✅
   - Move Chat to subpath
   - Fix npm blockers
   - Basic documentation update

2. **Next Release (v5.2.0)** 🔥 Priority
   - Add Component Classification section to CLAUDE.md
   - Update AI_COMPONENTS.md
   - Add helpful error messages
   - Release blog post

3. **Sustainable (v5.3.0+)** 📈 Growth
   - ESLint plugin for import validation
   - Subpath README files
   - Consider Tier 3 extraction

**Success Metric**: By v5.2.0, users can:
1. ✅ Explain why Chat is in a subpath (not a limitation, a feature)
2. ✅ Find correct import path without guessing
3. ✅ Understand the Tier system for predicting where new components live
4. ✅ AI systems can consistently resolve component imports without errors

---

**Document Status**: Design decision finalized and ready for implementation
**Ownership**: Product/Design Lead responsible for v5.2.0 documentation work
**Review**: All documentation changes should be reviewed with Dev Lead before merging
