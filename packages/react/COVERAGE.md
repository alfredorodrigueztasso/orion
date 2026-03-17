# Code Coverage Configuration

## Coverage Thresholds

Code coverage gates are configured in `vitest.config.ts` to enforce minimum coverage standards:

```typescript
coverage: {
  provider: 'v8',
  reporter: ['text', 'json', 'html'],
  thresholds: {
    statements: 80,
    branches: 75,
    functions: 80,
    lines: 80,
  },
}
```

## Running Coverage

```bash
# Generate coverage report
npm run test:coverage

# View HTML report
open coverage/index.html
```

## Coverage Reports

Coverage reports are generated in multiple formats:

- **Text**: Console output with summary
- **JSON**: `coverage/coverage-final.json` for CI integration
- **HTML**: `coverage/index.html` for detailed browsing

## CI Integration

The coverage command will **exit with error code 1** if any threshold is not met. This automatically fails CI builds when coverage drops below acceptable levels.

## Current Status

**Note:** Coverage reporting requires all tests to pass. Current test status:

- **836/899 tests passing** (93.0%)
- **63 tests failing** (7.0%)

Once test pass rate reaches 95%+, coverage can be accurately measured and thresholds enforced.

## Excluded from Coverage

The following are excluded from coverage calculations:

- `node_modules/`
- `src/test/` - Test utilities
- `**/*.stories.tsx` - Storybook stories
- `**/*.test.tsx` - Test files
- `**/types/` - TypeScript type definitions
- `dist/` - Build output

## Improving Coverage

To improve coverage:

1. **Add tests for uncovered components**

   ```bash
   npm test -- ComponentName.test.tsx --coverage
   ```

2. **Focus on branches**
   - Test all conditional paths
   - Test error states
   - Test edge cases

3. **Test interactive behavior**
   - User events (click, type, focus)
   - State changes
   - Prop changes

## Coverage Goals

| Metric     | Current Threshold | Target (Phase 3) |
| ---------- | ----------------- | ---------------- |
| Statements | 80%               | 85%              |
| Branches   | 75%               | 80%              |
| Functions  | 80%               | 85%              |
| Lines      | 80%               | 85%              |

---

**Last Updated:** 2026-02-13
**Status:** Thresholds configured, awaiting test fixes for accurate measurement
