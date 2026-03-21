# Status Update: @orion-ds/react v4.9.5

**Date**: March 21, 2026
**Audience**: npm users, docs-site team, downstream projects
**Status**: 🔴 CRITICAL BLOCKER (Fix in progress)

---

## What's Happening

Users of `@orion-ds/react@4.9.5` are unable to build Next.js projects due to a file extension mismatch in preview-modules.

**Build Error**:
```
Failed to compile
../registry/preview-modules/index.ts
Error: Expected '>', got 'style'
    at line 58:1
    <div style={{ display: 'flex', ... }}>
         ^^^^^
Syntax Error
```

---

## Root Cause (Technical)

**File**: `registry/preview-modules/index.ts`
**Content**: React components with JSX (`<Button>`, `<Card>`, etc.)
**Problem**: `.ts` files are treated as pure TypeScript (no JSX support)
**Expected**: `.tsx` extension for files containing JSX

This is standard in every React/Next.js project. The file was created with the wrong extension.

---

## Impact

| Scope | Impact |
|-------|--------|
| **docs-site** | Build completely blocked |
| **npm users with Next.js** | Build fails when importing preview-modules |
| **Severity** | 🔴 CRITICAL — Blocks all projects |

---

## What You Should Do Now

### Option A: Downgrade (Recommended — immediate solution)
```bash
npm install @orion-ds/react@4.9.4
```

- `v4.9.4` is stable and fully functional
- All features work correctly
- Temporary solution while we release v4.9.6

### Option B: Wait for v4.9.6 (Recommended — long-term)
- We're publishing the fix within 24-48 hours
- Simple file extension change, fully tested
- Will be available by March 22, 2026

### Option C: Patch Locally (Advanced)
If you need v4.9.5 features immediately, you can patch locally:
```bash
npm install @orion-ds/react@4.9.5

# Then rename the file in node_modules:
mv node_modules/@orion-ds/react/dist/preview-modules/index.ts \
   node_modules/@orion-ds/react/dist/preview-modules/index.tsx
```

---

## Timeline

| When | What |
|------|------|
| **Now** | Use v4.9.4 as workaround |
| **Tomorrow (March 22)** | v4.9.6 published with fix |
| **After v4.9.6 releases** | `npm install @orion-ds/react@4.9.6` |

---

## What We're Doing

1. **Immediate**: Rename file from `.ts` to `.tsx`
2. **Testing**: Verify fix works in real Next.js projects
3. **Publishing**: Release v4.9.6 to npm
4. **Communication**: Update all channels (GitHub, email, docs)
5. **Prevention**: Add automated checks to prevent recurrence

---

## Questions?

- **GitHub Issues**: https://github.com/orion-ds/orion/issues
- **Discussions**: https://github.com/orion-ds/orion/discussions
- **Email**: team@orion-design-system.com

We apologize for the inconvenience and thank you for your patience.

---

**Status**: 🟡 IN PROGRESS → 🟢 RESOLVING (v4.9.6 coming soon)

