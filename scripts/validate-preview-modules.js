#!/usr/bin/env node

/**
 * validate-preview-modules.js
 *
 * Validates all preview modules in registry/preview-modules/ for:
 * 1. Syntax errors (mismatched braces/parentheses/brackets)
 * 2. API drift (--check-api flag): ensures props match the API manifest
 *
 * Usage:
 *   node scripts/validate-preview-modules.js              # Syntax check only
 *   node scripts/validate-preview-modules.js --check-api  # Syntax + API drift check
 *
 * Pre-commit integration:
 *   if [ -f "registry/artifacts/api-manifest.json" ]; then
 *     node scripts/validate-preview-modules.js --check-api
 *   fi
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PREVIEW_MODULES_DIR = path.join(ROOT, 'registry', 'preview-modules');
const MANIFEST_PATH = path.join(ROOT, 'registry', 'artifacts', 'api-manifest.json');

const checkApiFlag = process.argv.includes('--check-api');

// ============================================================================
// Validation Functions
// ============================================================================

/**
 * Check for basic syntax errors in JSX/TSX files
 */
function validateSyntax(content, filepath) {
  const errors = [];

  // Check for balanced braces/brackets/parentheses (simple check, not exhaustive)
  const braceStack = [];
  const pairs = { '{': '}', '[': ']', '(': ')' };

  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const line = content.substring(0, i).split('\n').length;

    // Skip comments and strings (simplified)
    if (content[i - 1] === '/' && content[i] === '/') {
      // Skip line comment
      const endOfLine = content.indexOf('\n', i);
      i = endOfLine;
      continue;
    }

    if (char === '"' || char === "'" || char === '`') {
      // Skip string (simplified - doesn't handle escapes perfectly)
      const stringEnd = content.indexOf(char, i + 1);
      if (stringEnd !== -1) {
        i = stringEnd;
      }
      continue;
    }

    if (char in pairs) {
      braceStack.push({ char, line });
    } else if (Object.values(pairs).includes(char)) {
      const last = braceStack.pop();
      if (!last || pairs[last.char] !== char) {
        errors.push(
          `Mismatched closing '${char}' at line ${line} (expected '${last ? pairs[last.char] : '?'}')`
        );
      }
    }
  }

  // Check for unclosed braces
  while (braceStack.length > 0) {
    const unclosed = braceStack.pop();
    errors.push(
      `Unclosed '${unclosed.char}' at line ${unclosed.line} (missing '${pairs[unclosed.char]}')`
    );
  }

  return errors;
}

/**
 * Check for API drift: ensure all props used in preview modules exist in manifest
 */
function validateApiDrift(content, componentName, manifest) {
  const errors = [];

  if (!manifest[componentName]) {
    errors.push(
      `Component '${componentName}' not found in API manifest (registry-link.json)`
    );
    return errors;
  }

  const allowedProps = manifest[componentName];
  const line = 1;

  // Simple regex to find prop usage (componentName prop="value" or componentName prop={...})
  // This is a basic pattern - real usage might be more complex
  const propPattern = new RegExp(`\\b(\\w+)\\s*=\\s*["{\\[]`, 'g');
  let match;

  while ((match = propPattern.exec(content)) !== null) {
    const propName = match[1];

    // Skip known non-prop attributes
    if (['className', 'style', 'key', 'ref', 'children', 'id', 'data'].includes(propName)) {
      continue;
    }

    // Check if prop exists in manifest
    if (!allowedProps.includes(propName)) {
      const lineNum = content.substring(0, match.index).split('\n').length;
      errors.push(
        `Prop '${propName}' (line ${lineNum}) not found in API for component '${componentName}'. Available: ${allowedProps.join(', ')}`
      );
    }
  }

  return errors;
}

/**
 * Load and parse API manifest
 */
function loadManifest() {
  if (!fs.existsSync(MANIFEST_PATH)) {
    if (checkApiFlag) {
      console.warn(`⚠️  API manifest not found at ${MANIFEST_PATH}`);
      console.warn('   Run `npm run build:registry` first to generate manifest');
      return null;
    }
    return null;
  }

  try {
    return JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'));
  } catch (err) {
    console.error(`❌ Failed to parse API manifest: ${err.message}`);
    process.exit(1);
  }
}

// ============================================================================
// Main Validation Logic
// ============================================================================

function main() {
  console.log('🔍 Validating preview modules...\n');

  if (!fs.existsSync(PREVIEW_MODULES_DIR)) {
    console.log('⚠️  No preview-modules directory found');
    return;
  }

  const files = fs.readdirSync(PREVIEW_MODULES_DIR).filter(f => {
    // Skip index.tsx (barrel export) - validate individual preview modules only
    if (f === 'index.tsx' || f === 'index.ts') return false;
    return f.endsWith('.tsx') || f.endsWith('.ts') || f.endsWith('.jsx') || f.endsWith('.js');
  });

  if (files.length === 0) {
    console.log('✅ No preview modules to validate');
    return;
  }

  const manifest = checkApiFlag ? loadManifest() : null;
  let totalErrors = 0;
  let totalWarnings = 0;

  for (const file of files) {
    const filepath = path.join(PREVIEW_MODULES_DIR, file);
    const content = fs.readFileSync(filepath, 'utf-8');

    // Extract component name from file (e.g., "button-previews.tsx" → "button")
    const componentName = file
      .replace(/(-previews|\.preview)?\.tsx?/i, '')
      .toLowerCase()
      .replace(/-/g, '-');

    // 1. Syntax validation
    const syntaxErrors = validateSyntax(content, filepath);
    if (syntaxErrors.length > 0) {
      console.error(`  ❌ ${file} — Syntax errors:`);
      syntaxErrors.forEach(err => console.error(`     ${err}`));
      totalErrors += syntaxErrors.length;
    }

    // 2. API drift validation (if enabled)
    if (checkApiFlag && manifest) {
      const driftErrors = validateApiDrift(content, componentName, manifest);
      if (driftErrors.length > 0) {
        console.error(`  ❌ ${file} — API drift detected:`);
        driftErrors.forEach(err => console.error(`     ${err}`));
        totalErrors += driftErrors.length;
      }
    }

    if (syntaxErrors.length === 0 && (!checkApiFlag || !manifest || validateApiDrift(content, componentName, manifest).length === 0)) {
      console.log(`  ✅ ${file}`);
    }
  }

  console.log(`\n📋 Preview modules validation complete`);
  console.log(`   Total files: ${files.length}`);
  console.log(`   Errors: ${totalErrors}`);
  console.log(`   Warnings: ${totalWarnings}`);

  if (totalErrors > 0) {
    console.error(`\n❌ Validation failed with ${totalErrors} error(s)`);
    process.exit(1);
  } else {
    console.log('\n✅ All preview modules are valid');
    process.exit(0);
  }
}

main();
