# Bundle Optimization Guide

Orion DS React uses **optional peer dependencies** to keep your bundle small. Heavy dependencies are only included if you actually use them.

## 📦 Dependency Strategy

| Component                | Peer Dependency                                | Size   | Optional      |
| ------------------------ | ---------------------------------------------- | ------ | ------------- |
| **Chart**                | `recharts`                                     | ~600KB | ✅ Yes        |
| **Calendar, DatePicker** | `date-fns`                                     | ~220KB | ✅ Yes        |
| **KanbanBoard**          | `@dnd-kit/*`                                   | ~220KB | ✅ Yes        |
| **Chat**                 | `react-markdown`<br>`react-syntax-highlighter` | ~350KB | ❌ Required\* |
| **All others**           | `lucide-react`                                 | ~180KB | ❌ Required   |

**Total optional weight: ~1.04MB** (22% of full bundle)

\* _Chat markdown dependencies are currently required. For lighter alternatives, consider building a custom chat UI without markdown rendering._

---

## 🚀 Automatic Tree-Shaking

Modern bundlers (Vite, Webpack 5+, Rollup) automatically exclude optional dependencies you don't use.

### Example 1: Without Chart Component

```tsx
// ✅ Bundle includes only core components
import { Button, Card, Field } from "@orion-ds/react";
import "@orion-ds/react/styles.css";

function App() {
  return (
    <Card>
      <Button>Hello</Button>
    </Card>
  );
}
```

**Result**: No `recharts` in bundle → **Saves 600KB**

### Example 2: With Chart Component

```bash
# Install optional peer dependency
npm install recharts
```

```tsx
// ✅ Now Chart works, recharts included in bundle
import { Button, ChartContainer } from "@orion-ds/react";
import { BarChart, Bar } from "recharts";
```

**Result**: `recharts` included → **Full chart functionality**

---

## 🎯 Selective Imports (Advanced)

For maximum control, import individual components:

```tsx
// ✅ Only imports Button component + its dependencies
import { Button } from "@orion-ds/react/components/Button";
import "@orion-ds/react/styles.css";
```

### Entry Points Available

- `@orion-ds/react` - All components (default)
- `@orion-ds/react/components/Button` - Individual components
- `@orion-ds/react/components/Chart` - Chart components
- `@orion-ds/react/components/Calendar` - Calendar + DatePicker
- `@orion-ds/react/components/KanbanBoard` - Kanban board
- `@orion-ds/react/tokens` - Design tokens only
- `@orion-ds/react/styles.css` - All styles (required)
- `@orion-ds/react/theme.css` - Tokens only

---

## 📊 Bundle Size Comparison

### Scenario 1: Basic UI (No heavy components)

```tsx
import { Button, Card, Field, Alert, Badge } from "@orion-ds/react";
```

- **Bundle size**: ~2.8MB (minified)
- **Excludes**: recharts, date-fns, @dnd-kit

### Scenario 2: With Charts

```tsx
import { Button, ChartContainer } from "@orion-ds/react";
```

- **Bundle size**: ~3.4MB (minified)
- **Includes**: recharts
- **Excludes**: date-fns, @dnd-kit

### Scenario 3: Full Feature Set

```tsx
import { Button, ChartContainer, Calendar, KanbanBoard } from "@orion-ds/react";
```

- **Bundle size**: ~4.7MB (minified)
- **Includes**: All optional dependencies

---

## ⚠️ Missing Dependency Errors

If you use a component without installing its peer dependency:

```
Error: Cannot find module 'recharts'
```

**Solution**: Install the missing dependency:

```bash
npm install recharts        # For Chart
npm install date-fns        # For Calendar/DatePicker
npm install @dnd-kit/core @dnd-kit/sortable  # For KanbanBoard
```

---

## 🔍 Check Your Bundle

Analyze what's actually included:

### With Vite

```bash
npm run build -- --mode analyze
```

### With Webpack Bundle Analyzer

```bash
npm install -D webpack-bundle-analyzer
npx webpack-bundle-analyzer dist/stats.json
```

### With Rollup Visualizer

```bash
npm install -D rollup-plugin-visualizer
```

---

## 💡 Best Practices

### ✅ Do:

- Import only components you need
- Install peer dependencies only when needed
- Use tree-shaking-friendly bundlers (Vite, Webpack 5+)
- Check bundle size with `npm run build`

### ❌ Don't:

- Import the entire library if you only need 2-3 components
- Install all peer dependencies unless you use them
- Use old bundlers without tree-shaking (Webpack < 4)

---

## 🆕 Migration from v2.x

In v3.0.0, we moved heavy dependencies to optional peer dependencies.

### Before (v2.x)

```json
{
  "dependencies": {
    "@orion-ds/react": "^2.0.0"
    // recharts, date-fns automatically installed
  }
}
```

### After (v3.0.0)

```json
{
  "dependencies": {
    "@orion-ds/react": "^3.0.0",
    "recharts": "^3.0.0" // Only if you use Chart
  }
}
```

If you use Chart, Calendar, or Kanban components, install their peer dependencies after upgrading.

---

## 📚 Related Documentation

- [Component API Reference](./README.md)
- [AI-Native Features](./AI_GUIDE.md)
- [Migration Guide](../../MIGRATION_V3.md)
