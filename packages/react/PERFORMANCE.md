# Performance Monitoring

Performance budgets and monitoring for the Orion React package.

## Performance Budgets

Configured in `performance.budgets.json`:

```json
{
  "bundle": {
    "maxJsSize": 204800, // 200KB
    "maxCssSize": 51200 // 50KB
  },
  "render": {
    "maxInitialRender": 16, // 1 frame (60fps)
    "maxReRender": 8 // 0.5 frame
  },
  "lighthouse": {
    "performance": 90,
    "accessibility": 95,
    "bestPractices": 90,
    "seo": 90
  }
}
```

## Bundle Size Monitoring

Measure bundle sizes and compare against budgets:

```bash
# Build the package
npm run build

# Measure bundle sizes
npm run measure:bundle-size
```

Output example:

```
📊 Bundle Size Report
═══════════════════════════════════════════════════════════

📦 Total Bundle Sizes:
  JavaScript: 180.5KB
  CSS:        45.2KB

📏 Performance Budgets:
  ✅ JavaScript: 180.5KB / 200KB
  ✅ CSS:        45.2KB / 50KB

📁 Largest Files (Top 5):
  1. index.esm.js - 150KB
  2. index.cjs.js - 140KB
  3. react.css - 45KB

═══════════════════════════════════════════════════════════
✅ All bundles within budget!
```

## Component Render Performance

Benchmark render performance of critical components:

```bash
npm run bench
```

This measures:

- **Initial render time** - Time to mount component (budget: < 16ms)
- **Re-render time** - Time to update component (budget: < 8ms)
- **Comparison between variants** - Which variants are slowest

Results saved to `.bench/` directory.

### Critical Components

The following components are tracked in benchmarks:

- Button
- Field
- Card
- Modal
- Dropdown
- Tabs

### Adding New Benchmarks

Edit `src/test/performance.bench.tsx`:

```tsx
import { bench, describe } from "vitest";
import { render } from "@testing-library/react";
import { MyComponent } from "../components/MyComponent";

describe("MyComponent", () => {
  bench("renders basic variant", () => {
    render(<MyComponent />);
  });

  bench("renders with props", () => {
    render(<MyComponent variant="complex" />);
  });
});
```

## CI Integration

Bundle size is checked automatically in CI:

```yaml
# .github/workflows/ci.yml
- name: Measure bundle size
  run: |
    npm run build
    npm run measure:bundle-size
```

If bundle exceeds budget, CI fails with exit code 1.

## Performance Reports

Reports are saved to:

- `bundle-size-report.json` - Bundle size measurements
- `.bench/` - Vitest benchmark results

### Tracking Over Time

Commit `bundle-size-report.json` to track bundle size changes:

```bash
git add bundle-size-report.json
git commit -m "chore: update bundle size report"
```

Compare with previous commits:

```bash
git diff HEAD~1 bundle-size-report.json
```

## Optimization Tips

### Reducing Bundle Size

1. **Tree-shaking**: Ensure components are exported individually
2. **Code splitting**: Use dynamic imports for large components
3. **Remove unused deps**: Check for unused dependencies
4. **Minification**: Already enabled in build config

### Improving Render Performance

1. **React.memo**: Wrap expensive components
2. **useMemo/useCallback**: Cache computed values
3. **Virtualization**: Use react-window for long lists
4. **Lazy loading**: Defer non-critical components

### Profiling

Use React DevTools Profiler:

```tsx
import { Profiler } from "react";

<Profiler
  id="MyComponent"
  onRender={(id, phase, actualDuration) => {
    console.log(`${id} (${phase}): ${actualDuration}ms`);
  }}
>
  <MyComponent />
</Profiler>;
```

## Lighthouse Audits

For Storybook or testing projects:

```bash
# Install Lighthouse CLI
npm install -g @lhci/cli

# Run audit
lhci autorun
```

Configure thresholds in `lighthouserc.json`:

```json
{
  "ci": {
    "assert": {
      "assertions": {
        "performance": ["error", { "minScore": 0.9 }],
        "accessibility": ["error", { "minScore": 0.95 }]
      }
    }
  }
}
```

---

**Last Updated:** 2026-02-13
**Status:** Performance monitoring configured ✅
