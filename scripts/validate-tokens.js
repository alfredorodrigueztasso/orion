#!/usr/bin/env node
/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ORION DESIGN SYSTEM — Token Validator
 * Audits CSS files for hardcoded values that should use tokens
 * 
 * Usage: node scripts/validate-tokens.js [file]
 * Default: validates theme.css
 * ═══════════════════════════════════════════════════════════════════════════
 */

const fs = require('fs');
const path = require('path');

// Patterns that indicate hardcoded values (anti-patterns)
const VIOLATIONS = {
    // Hardcoded colors (except in :root or comments)
    hex_colors: {
        pattern: /#[0-9a-fA-F]{3,8}(?![0-9a-fA-F])/g,
        message: 'Hardcoded HEX color',
        severity: 'error',
        allowed_contexts: [':root', '/*', 'rgba(', 'hsla(', 'var(--']
    },

    // Hardcoded pixel values for spacing (not in :root)
    px_spacing: {
        pattern: /(?<!var\([^)]*)\b(\d+)px\b/g,
        message: 'Hardcoded pixel value',
        severity: 'warning',
        allowed_values: ['1px', '0px', '9999px'],
        allowed_contexts: [':root', '/*', 'var(--', 'translate', 'calc(']
    },

    // Hardcoded font families
    font_family: {
        pattern: /font-family:\s*['"]?(?!var\()([\w\s,-]+)['"]?;/g,
        message: 'Hardcoded font-family',
        severity: 'error',
        allowed_contexts: [':root', '/*']
    },

    // Hardcoded border-radius without var()
    border_radius: {
        pattern: /border-radius:\s*(?!var\()(\d+px|0)/g,
        message: 'Hardcoded border-radius',
        severity: 'warning',
        allowed_contexts: [':root', '/*']
    }
};

// CSS variable patterns we expect to see (positive patterns)
const EXPECTED_PATTERNS = [
    'var(--surface-',
    'var(--text-',
    'var(--border-',
    'var(--interactive-',
    'var(--color-',
    'var(--spacing-',
    'var(--radius-',
    'var(--font-',
    'var(--shadow-'
];

function validateFile(filepath) {
    console.log('🔍 Orion Token Validator v1.0');
    console.log('───────────────────────────────');
    console.log(`📄 Validating: ${filepath}`);
    console.log('');

    if (!fs.existsSync(filepath)) {
        console.error(`❌ File not found: ${filepath}`);
        process.exit(1);
    }

    const content = fs.readFileSync(filepath, 'utf8');
    const lines = content.split('\n');

    const issues = [];
    let inRootBlock = false;
    let inComment = false;
    let braceDepth = 0;
    let rootBraceDepth = 0;

    lines.forEach((line, index) => {
        const lineNum = index + 1;

        // Track comment blocks
        if (line.includes('/*')) inComment = true;
        if (line.includes('*/')) inComment = false;
        if (inComment || line.trim().startsWith('//')) return;

        // Track :root block
        if (line.includes(':root')) {
            inRootBlock = true;
            rootBraceDepth = braceDepth;
        }

        // Track brace depth
        braceDepth += (line.match(/{/g) || []).length;
        braceDepth -= (line.match(/}/g) || []).length;

        if (inRootBlock && braceDepth <= rootBraceDepth) {
            inRootBlock = false;
        }

        // Skip :root block (primitives are defined there)
        if (inRootBlock) return;

        // Check for violations
        for (const [type, rule] of Object.entries(VIOLATIONS)) {
            const matches = line.matchAll(rule.pattern);

            for (const match of matches) {
                const value = match[0];

                // Check if in allowed context
                const isAllowed = rule.allowed_contexts?.some(ctx =>
                    line.includes(ctx)
                );

                // Check if allowed value
                const isAllowedValue = rule.allowed_values?.includes(value);

                if (!isAllowed && !isAllowedValue) {
                    issues.push({
                        line: lineNum,
                        column: match.index + 1,
                        type,
                        value,
                        message: rule.message,
                        severity: rule.severity,
                        context: line.trim().substring(0, 60)
                    });
                }
            }
        }
    });

    // Report
    const errors = issues.filter(i => i.severity === 'error');
    const warnings = issues.filter(i => i.severity === 'warning');

    // Calculate compliance score
    const totalLines = lines.length;
    const violationLines = new Set(issues.map(i => i.line)).size;
    const compliance = Math.round((1 - violationLines / totalLines) * 100);

    if (issues.length === 0) {
        console.log('✅ No violations found! Token compliance: 100%');
    } else {
        console.log(`Found ${issues.length} potential issues:\n`);

        // Group by type
        const grouped = {};
        issues.forEach(issue => {
            if (!grouped[issue.type]) grouped[issue.type] = [];
            grouped[issue.type].push(issue);
        });

        for (const [type, typeIssues] of Object.entries(grouped)) {
            console.log(`\n📌 ${type.toUpperCase()} (${typeIssues.length})`);
            typeIssues.slice(0, 5).forEach(issue => {
                const icon = issue.severity === 'error' ? '❌' : '⚠️';
                console.log(`   ${icon} Line ${issue.line}: ${issue.value}`);
                console.log(`      ${issue.context}...`);
            });
            if (typeIssues.length > 5) {
                console.log(`   ... and ${typeIssues.length - 5} more`);
            }
        }

        console.log('\n───────────────────────────────');
        console.log(`Summary: ${errors.length} errors, ${warnings.length} warnings`);
        console.log(`Token Compliance: ${compliance}%`);
    }

    // Token usage stats
    console.log('\n📊 Token Usage Statistics:');
    let tokenUsage = 0;
    EXPECTED_PATTERNS.forEach(pattern => {
        const count = (content.match(new RegExp(pattern.replace('(', '\\('), 'g')) || []).length;
        if (count > 0) {
            console.log(`   ${pattern.replace('var(--', '').replace('-', '')} → ${count} usages`);
            tokenUsage += count;
        }
    });
    console.log(`   Total token references: ${tokenUsage}`);

    // Pass if compliance >= 95% (allowing for acceptable violations like brand overrides)
    const MINIMUM_COMPLIANCE = 95;
    const passed = compliance >= MINIMUM_COMPLIANCE;

    if (!passed) {
        console.log(`\n❌ Compliance ${compliance}% is below minimum ${MINIMUM_COMPLIANCE}%`);
    } else if (issues.length > 0) {
        console.log(`\n✅ Compliance ${compliance}% meets minimum ${MINIMUM_COMPLIANCE}% (issues are acceptable)`);
    }

    return passed;
}

// Run
const targetFile = process.argv[2] || path.join(__dirname, '..', 'theme.css');
const success = validateFile(targetFile);
process.exit(success ? 0 : 1);
