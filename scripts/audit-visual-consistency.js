#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const COMPONENTS_PATH = path.join(__dirname, '../packages/react/src/components');
const REPORT_PATH = path.join(__dirname, '../docs/visual-audit-report.md');

// Common visual violations to detect
const violations = {
  radiusHardcoded: {
    pattern: /border-radius:\s*([0-9]+px)/g,
    exclude: ['0px', '9999px', '1px'],
    severity: 'P0',
    message: (match) => `Hardcoded radius: ${match} (should use var(--radius-*))`
  },
  shadowHardcoded: {
    pattern: /box-shadow:\s*([^;]+);/g,
    exclude: ['var('],
    severity: 'P1',
    message: (match) => `Hardcoded shadow: ${match.substring(0, 50)}... (should use var(--shadow-*))`
  },
  hoverTransformHardcoded: {
    pattern: /:hover\s*{\s*[^}]*transform:\s*translateY\((-?[0-9]+px)\)/g,
    exclude: [],
    severity: 'P1',
    message: (match) => `Hardcoded hover lift: ${match} (should use var(--mode-hover-lift))`
  }
};

const results = [];

// Scan all component CSS files
const componentDirs = fs.readdirSync(COMPONENTS_PATH).filter(d => {
  const fullPath = path.join(COMPONENTS_PATH, d);
  return fs.statSync(fullPath).isDirectory();
});

componentDirs.forEach(componentDir => {
  const cssFile = path.join(COMPONENTS_PATH, componentDir, `${componentDir}.module.css`);
  if (!fs.existsSync(cssFile)) return;

  const cssContent = fs.readFileSync(cssFile, 'utf-8');
  const found = {};

  // Check each violation pattern
  Object.entries(violations).forEach(([type, check]) => {
    let match;
    while ((match = check.pattern.exec(cssContent)) !== null) {
      const value = match[1] || match[0];
      
      // Skip excluded values
      if (check.exclude.some(ex => value.includes(ex))) return;
      
      if (!found[type]) found[type] = [];
      found[type].push({
        value,
        severity: check.severity,
        message: check.message(value)
      });
    }
  });

  if (Object.keys(found).length > 0) {
    results.push({
      component: componentDir,
      violations: found
    });
  }
});

// Generate report
let report = `# Visual Consistency Audit Report

**Generated**: ${new Date().toISOString()}
**Components Scanned**: ${componentDirs.length}
**Components with Violations**: ${results.length}

## Severity Levels

- **P0**: Critical — Break visual consistency across themes/brands
- **P1**: High — Prevent mode-aware styling (display/product/app)
- **P2**: Medium — Technical debt but not breaking

## Violations by Severity

### P0 - Critical Violations (Hardcoded Radius)

| Component | Issue | Fix |
|-----------|-------|-----|
`;

results.forEach(r => {
  if (r.violations.radiusHardcoded) {
    r.violations.radiusHardcoded.forEach(v => {
      report += `| ${r.component} | ${v.message} | Use \`var(--radius-control)\` or \`var(--radius-container)\` |\n`;
    });
  }
});

report += `\n### P1 - High Violations (Shadow/Hover)\n\n| Component | Issue | Suggestion |\n|-----------|-------|-------------|\n`;

results.forEach(r => {
  if (r.violations.shadowHardcoded) {
    r.violations.shadowHardcoded.forEach(v => {
      report += `| ${r.component} | ${v.message} | Use \`var(--shadow-md)\` or mode-specific token |\n`;
    });
  }
  if (r.violations.hoverTransformHardcoded) {
    r.violations.hoverTransformHardcoded.forEach(v => {
      report += `| ${r.component} | ${v.message} | Use \`var(--mode-hover-lift)\` |\n`;
    });
  }
});

report += `\n## Summary\n\n- **Total Issues**: ${results.reduce((sum, r) => sum + Object.values(r.violations).reduce((s, arr) => s + arr.length, 0), 0)}
- **Critical (P0)**: ${results.reduce((sum, r) => sum + (r.violations.radiusHardcoded?.length || 0), 0)}
- **High (P1)**: ${results.reduce((sum, r) => sum + ((r.violations.shadowHardcoded?.length || 0) + (r.violations.hoverTransformHardcoded?.length || 0)), 0)}

## Remediation Priority

1. Fix all P0 (radius hardcoding) — breaks consistency
2. Fix all P1 (shadow/hover) — breaks mode-aware behavior
3. Monitor for P2 issues — track in backlog

## Known False Positives

- Avatar.module.css has hardcoded colors for .teal and .pink badge backgrounds (intentional for icon palette)
`;

// Create docs directory if needed
const docsDir = path.dirname(REPORT_PATH);
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

fs.writeFileSync(REPORT_PATH, report);
console.log(`✅ Visual audit report generated: ${REPORT_PATH}`);
console.log(`   ${results.length} components with violations found`);
