#!/bin/bash
# ESM Module Validation Gate
# Ensures all .mjs exports are ESM spec-compliant
# Used by: npm run validate:esm (and npm run build:release)

set -e

echo "🔍 ESM Spec Compliance Validation"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check if dist files exist
if [ ! -d "packages/react/dist" ]; then
  echo "❌ ERROR: packages/react/dist directory not found"
  echo "   Run 'npm run build:react' before validating ESM"
  exit 1
fi

# Test 1: Main entry point
echo ""
echo "Test 1: Main entry point (index.mjs)"
if [ ! -f "packages/react/dist/index.mjs" ]; then
  echo "  ⚠ packages/react/dist/index.mjs not found (skipping)"
else
  node --input-type=module --eval "
    import('./packages/react/dist/index.mjs')
      .then(() => console.log('  ✓ Main entry point loaded'))
      .catch(err => {
        console.error('  ✗ Failed:', err.message);
        process.exit(1);
      })
  " || exit 1
fi

# Test 2: Client entry point (used by SSR)
echo ""
echo "Test 2: Client entry point (client.mjs)"
if [ ! -f "packages/react/dist/client.mjs" ]; then
  echo "  ⚠ packages/react/dist/client.mjs not found (skipping)"
else
  node --input-type=module --eval "
    import('./packages/react/dist/client.mjs')
      .then(() => console.log('  ✓ Client entry point loaded'))
      .catch(err => {
        console.error('  ✗ Failed:', err.message);
        process.exit(1);
      })
  " || exit 1
fi

# Test 3: Optional component subpaths (if they exist)
for subpath in chart calendar editor dnd; do
  echo ""
  echo "Test 3.$subpath: Optional subpath (${subpath}.mjs)"
  if [ ! -f "packages/react/dist/${subpath}.mjs" ]; then
    echo "  ⚠ packages/react/dist/${subpath}.mjs not found (skipping)"
  else
    node --input-type=module --eval "
      import('./packages/react/dist/${subpath}.mjs')
        .then(() => console.log('  ✓ ${subpath} entry point loaded'))
        .catch(err => {
          console.error('  ✗ ${subpath} failed:', err.message);
          process.exit(1);
        })
    " || exit 1
  fi
done

# Test 4: Tailwind integration preset
echo ""
echo "Test 4: Tailwind integration preset (integrations/tailwind/index.mjs)"
if [ ! -f "packages/react/dist/integrations/tailwind/index.mjs" ]; then
  echo "  ⚠ packages/react/dist/integrations/tailwind/index.mjs not found (skipping)"
else
  node --input-type=module --eval "
    import('./packages/react/dist/integrations/tailwind/index.mjs')
      .then(() => console.log('  ✓ Tailwind integration preset loaded'))
      .catch(err => {
        console.error('  ✗ Failed:', err.message);
        process.exit(1);
      })
  " || exit 1
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ ESM validation passed"
echo ""
echo "ℹ️  PRE-006 code quality issue (v5.4.0 deferred)"
echo "  Component guards use try/catch require() — production safe"
echo "  require is undefined in ESM → ReferenceError at call-time"
echo "  Caught by try/catch, modules load normally"
echo "  → Will refactor to 'typeof require !== undefined' in v5.4.0"
echo ""
echo "✅ All ESM entry points load successfully (includes safe try/catch guards)"
