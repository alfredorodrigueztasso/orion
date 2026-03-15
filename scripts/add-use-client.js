#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { globSync } from 'glob';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// React hooks that require "use client"
const HOOKS_PATTERN = /\b(useState|useEffect|useRef|useCallback|useMemo|useContext|useReducer|useLayoutEffect|useImperativeHandle|useTransition|useDeferredValue|useId|useInsertionEffect|useSyncExternalStore)\b/;

// Patterns to exclude
const EXCLUDE_PATTERNS = ['**/*.stories.tsx', '**/*.test.tsx', '**/*.spec.tsx'];

// Directories to scan
const SCAN_DIRS = [
  'packages/react/src/components/**/*.tsx',
  'packages/react/src/blocks/sections/**/*.tsx',
  'packages/react/src/contexts/**/*.tsx',
];

async function getFilesToProcess() {
  const files = [];
  for (const pattern of SCAN_DIRS) {
    const matches = globSync(pattern, {
      cwd: ROOT,
      ignore: EXCLUDE_PATTERNS,
    });
    files.push(...matches);
  }
  return [...new Set(files)]; // Remove duplicates
}

function hasUseClientDirective(content) {
  // Check if first non-whitespace content starts with "use client"
  const trimmed = content.trimStart();
  return (
    trimmed.startsWith('"use client"') ||
    trimmed.startsWith("'use client'") ||
    trimmed.startsWith('"use client";') ||
    trimmed.startsWith("'use client';")
  );
}

function hasHooks(content) {
  return HOOKS_PATTERN.test(content);
}

function addUseClientDirective(content) {
  // Prepend "use client" as the first line
  return '"use client";\n\n' + content;
}

async function main() {
  console.log('🔍 Scanning files for React hooks usage...\n');

  const files = await getFilesToProcess();
  let modified = 0;
  let skipped = 0;
  let noHooks = 0;

  const results = {
    modified: [],
    skipped: [],
    noHooks: [],
  };

  for (const filePath of files) {
    const fullPath = path.resolve(ROOT, filePath);
    const content = fs.readFileSync(fullPath, 'utf-8');

    // Check if already has "use client"
    if (hasUseClientDirective(content)) {
      results.skipped.push(filePath);
      skipped++;
      continue;
    }

    // Check if file uses hooks
    if (!hasHooks(content)) {
      results.noHooks.push(filePath);
      noHooks++;
      continue;
    }

    // Add "use client" directive
    const newContent = addUseClientDirective(content);
    fs.writeFileSync(fullPath, newContent, 'utf-8');
    results.modified.push(filePath);
    modified++;
  }

  // Print results
  console.log('✅ RESULTS\n');
  console.log(`📝 Modified: ${modified} files`);
  if (results.modified.length > 0 && modified <= 10) {
    results.modified.forEach((f) => console.log(`   ✓ ${f}`));
  } else if (results.modified.length > 10) {
    results.modified.slice(0, 5).forEach((f) => console.log(`   ✓ ${f}`));
    console.log(`   ... and ${results.modified.length - 5} more`);
  }

  console.log(`\n⏭️  Skipped (already had "use client"): ${skipped} files`);
  if (results.skipped.length > 0 && skipped <= 5) {
    results.skipped.forEach((f) => console.log(`   - ${f}`));
  }

  console.log(`\n⚪ No hooks (server-safe): ${noHooks} files`);
  if (results.noHooks.length > 0 && noHooks <= 5) {
    results.noHooks.forEach((f) => console.log(`   - ${f}`));
  } else if (results.noHooks.length > 5) {
    results.noHooks.slice(0, 3).forEach((f) => console.log(`   - ${f}`));
    console.log(`   ... and ${results.noHooks.length - 3} more`);
  }

  console.log(
    `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`
  );
  console.log(
    `Total: ${modified + skipped + noHooks} files scanned\n`
  );
  console.log(`📊 Summary:`);
  console.log(`   Modified:  ${modified}`);
  console.log(`   Skipped:   ${skipped}`);
  console.log(`   No hooks:  ${noHooks}`);
  console.log();

  if (modified > 0) {
    console.log('✨ Next steps:');
    console.log('   1. npm run type-check');
    console.log('   2. npm run build:release');
    console.log('   3. npm run release:patch');
    console.log();
  }
}

main().catch((err) => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
