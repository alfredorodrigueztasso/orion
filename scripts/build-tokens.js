#!/usr/bin/env node
/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ORION DESIGN SYSTEM — Token Compiler
 * Compiles JSON tokens to CSS variables
 * 
 * Usage: node scripts/build-tokens.js
 * ═══════════════════════════════════════════════════════════════════════════
 */

const fs = require('fs');
const path = require('path');

// Paths
const TOKENS_DIR = path.join(__dirname, '..', 'tokens');
const OUTPUT_FILE = path.join(__dirname, '..', 'tokens', 'generated.css');

// Load JSON files
function loadJSON(filename) {
    const filepath = path.join(TOKENS_DIR, filename);
    if (!fs.existsSync(filepath)) {
        console.error(`❌ File not found: ${filepath}`);
        return null;
    }
    return JSON.parse(fs.readFileSync(filepath, 'utf8'));
}

// Flatten nested object to CSS variable format
function flattenTokens(obj, prefix = '') {
    const result = {};

    for (const [key, value] of Object.entries(obj)) {
        const varName = prefix ? `${prefix}-${key}` : key;

        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            Object.assign(result, flattenTokens(value, varName));
        } else {
            result[`--${varName}`] = value;
        }
    }

    return result;
}

// Resolve a brand's buttonStyle to its radius primitive name
function resolveButtonPrimitive(brand) {
    const style = brand.geometry.buttonStyle;
    if (style === 'pill') return 'full';
    if (style === 'square') return '0';
    // "rounded" — parse radiusControl reference e.g. "{radius.md}" → "md"
    const ref = brand.geometry.radiusControl;
    const match = ref.match(/\{radius\.(.+)\}/);
    if (match) return match[1];
    // Fallback: parse "var(--radius-X)" or raw "Npx"
    const varMatch = ref.match(/var\(--radius-(.+)\)/);
    if (varMatch) return varMatch[1];
    return 'md'; // safe default
}

// Derive container radius primitive name from button primitive via scale
function deriveContainerRadius(buttonPrimitive, scale) {
    return scale[buttonPrimitive] || '3xl'; // cap at 3xl for unknown
}

// Generate CSS from tokens
function generateCSS() {
    console.log('🔧 Orion Token Compiler v1.0');
    console.log('───────────────────────────────');

    const primary = loadJSON('primary.json');
    const light = loadJSON('light.json');
    const dark = loadJSON('dark.json');
    const brandsData = loadJSON('brands.json');

    if (!primary) {
        console.error('❌ Failed to load primary.json');
        process.exit(1);
    }

    if (!brandsData) {
        console.error('❌ Failed to load brands.json');
        process.exit(1);
    }

    let css = `/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ORION DESIGN SYSTEM — Generated Tokens
 * DO NOT EDIT MANUALLY - Generated from tokens/*.json
 * Run: node scripts/build-tokens.js
 * ═══════════════════════════════════════════════════════════════════════════
 */

`;

    // --- Primitives from primary.json ---
    css += `/* ─── Primitives (from primary.json) ─── */\n`;
    css += `:root {\n`;

    // Colors
    if (primary.color) {
        css += `    /* Colors */\n`;

        // Brand colors (support nested orion/uvm structure)
        if (primary.color.brand) {
            if (primary.color.brand.orion) {
                // Multi-brand structure
                css += `    /* Brand: Orion (default) */\n`;
                for (const [shade, value] of Object.entries(primary.color.brand.orion)) {
                    css += `    --color-brand-${shade}: ${value};\n`;
                }
            } else {
                // Flat brand structure
                for (const [shade, value] of Object.entries(primary.color.brand)) {
                    css += `    --color-brand-${shade}: ${value};\n`;
                }
            }
        }

        // Neutral colors
        if (primary.color.neutral) {
            css += `\n    /* Neutral */\n`;
            for (const [shade, value] of Object.entries(primary.color.neutral)) {
                css += `    --color-neutral-${shade}: ${value};\n`;
            }
        }

        // Status colors
        if (primary.color.error) {
            css += `\n    /* Status */\n`;
            css += `    --color-error-500: ${primary.color.error['500']};\n`;
        }
        if (primary.color.success) {
            css += `    --color-success-500: ${primary.color.success['500']};\n`;
        }
        if (primary.color.warning) {
            css += `    --color-warning-500: ${primary.color.warning['500']};\n`;
        }
    }

    // Typography
    if (primary.typography) {
        css += `\n    /* Typography */\n`;
        if (primary.typography.family) {
            for (const [name, value] of Object.entries(primary.typography.family)) {
                css += `    --font-${name}: ${value};\n`;
            }
        }
        if (primary.typography.size) {
            css += `\n    /* Font Sizes */\n`;
            for (const [size, value] of Object.entries(primary.typography.size)) {
                css += `    --font-size-${size}: ${value};\n`;
            }
        }
        if (primary.typography.weight) {
            css += `\n    /* Font Weights */\n`;
            for (const [name, value] of Object.entries(primary.typography.weight)) {
                css += `    --font-weight-${name}: ${value};\n`;
            }
        }
    }

    // Spacing
    if (primary.spacing) {
        css += `\n    /* Spacing (base: 4px) */\n`;
        for (const [size, value] of Object.entries(primary.spacing)) {
            css += `    --spacing-${size}: ${value};\n`;
        }
    }

    // Radius
    if (primary.radius) {
        css += `\n    /* Border Radius */\n`;
        for (const [name, value] of Object.entries(primary.radius)) {
            css += `    --radius-${name}: ${value};\n`;
        }
    }

    // Blur
    if (primary.blur) {
        css += `\n    /* Blur */\n`;
        for (const [name, value] of Object.entries(primary.blur)) {
            css += `    --blur-${name}: ${value};\n`;
        }
    }

    if (primary.zIndex) {
        css += `\n    /* Z-Index */\n`;
        for (const [name, value] of Object.entries(primary.zIndex)) {
            css += `    --z-${name}: ${value};\n`;
        }
    }

    if (primary.typography?.size) {
        css += `\n    /* Font Size Semantic Aliases */\n`;
        const sizeMap = {
            '12': 'xs',
            '13': 'sm',
            '14': 'base',
            '16': 'md',
            '18': 'lg',
            '20': 'xl',
            '24': '2xl',
            '32': '3xl'
        };
        for (const [size, name] of Object.entries(sizeMap)) {
            if (primary.typography.size[size]) {
                css += `    --font-size-${name}: ${primary.typography.size[size]};\n`;
            }
        }
    }

    css += `}\n\n`;

    // --- Brand Overrides (All brands except default orion) ---
    const brandOverrides = {
        uvm: { radiusControl: '9999px' },
        unitec: { radiusControl: '12px' },
        laureate: { radiusControl: '9999px' }
    };

    for (const [brandName, config] of Object.entries(brandOverrides)) {
        if (primary.color?.brand?.[brandName]) {
            css += `/* ─── ${brandName.toUpperCase()} Brand Override ─── */\n`;
            css += `[data-brand="${brandName}"] {\n`;

            // Generate color overrides
            for (const [shade, value] of Object.entries(primary.color.brand[brandName])) {
                css += `    --color-brand-${shade}: ${value};\n`;
            }

            // Add radius control override
            if (config.radiusControl) {
                css += `    --radius-control: ${config.radiusControl};\n`;
            }

            css += `}\n\n`;
        }
    }

    // --- Light Theme Semantics ---
    if (light && light.semantic) {
        css += `/* ─── Light Theme Semantics ─── */\n`;
        css += `[data-theme="light"] {\n`;

        // Surface
        if (light.semantic.surface) {
            css += `    /* Surfaces */\n`;
            for (const [name, value] of Object.entries(light.semantic.surface)) {
                const resolvedValue = resolveTokenRef(value);
                css += `    --surface-${name}: ${resolvedValue};\n`;
            }
        }

        // Text
        if (light.semantic.text) {
            css += `\n    /* Text */\n`;
            for (const [name, value] of Object.entries(light.semantic.text)) {
                if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                    // Handle nested objects like on-brand
                    for (const [subname, subvalue] of Object.entries(value)) {
                        const resolvedValue = resolveTokenRef(subvalue);
                        css += `    --text-${name}-${subname}: ${resolvedValue};\n`;
                    }
                } else {
                    const resolvedValue = resolveTokenRef(value);
                    css += `    --text-${name}: ${resolvedValue};\n`;
                }
            }
        }

        // Border
        if (light.semantic.border) {
            css += `\n    /* Borders */\n`;
            for (const [name, value] of Object.entries(light.semantic.border)) {
                const resolvedValue = resolveTokenRef(value);
                css += `    --border-${name}: ${resolvedValue};\n`;
            }
        }

        // Interactive
        if (light.semantic.interactive) {
            css += `\n    /* Interactive */\n`;
            if (light.semantic.interactive.primary) {
                css += `    --interactive-primary: ${resolveTokenRef(light.semantic.interactive.primary.default)};\n`;
                css += `    --interactive-primary-hover: ${resolveTokenRef(light.semantic.interactive.primary.hover)};\n`;
                css += `    --interactive-primary-text: ${resolveTokenRef(light.semantic.interactive.primary.text)};\n`;
            }
            if (light.semantic.interactive.secondary) {
                css += `    --interactive-secondary: ${resolveTokenRef(light.semantic.interactive.secondary.default)};\n`;
                css += `    --interactive-secondary-hover: ${resolveTokenRef(light.semantic.interactive.secondary.hover)};\n`;
                css += `    --interactive-secondary-text: ${resolveTokenRef(light.semantic.interactive.secondary.text)};\n`;
            }
        }

        // Status
        if (light.semantic.status) {
            css += `\n    /* Status */\n`;
            for (const [name, value] of Object.entries(light.semantic.status)) {
                const resolvedValue = resolveTokenRef(value);
                css += `    --status-${name}: ${resolvedValue};\n`;
            }
        }

        // Gradient
        if (light.semantic.gradient) {
            css += `\n    /* Gradient */\n`;
            for (const [name, value] of Object.entries(light.semantic.gradient)) {
                const resolvedValue = resolveTokenRef(value);
                css += `    --gradient-${name}: ${resolvedValue};\n`;
            }
        }

        // Chart Palette
        if (light.semantic.chart) {
            css += `\n    /* Chart Palette */\n`;
            for (const [name, value] of Object.entries(light.semantic.chart)) {
                const resolvedValue = resolveTokenRef(value);
                css += `    --chart-${name}: ${resolvedValue};\n`;
            }
        }

        // Alert
        if (light.semantic.alert) {
            css += `\n    /* Alert */\n`;
            for (const [variant, properties] of Object.entries(light.semantic.alert)) {
                for (const [prop, value] of Object.entries(properties)) {
                    const resolvedValue = resolveTokenRef(value);
                    css += `    --alert-${variant}-${prop}: ${resolvedValue};\n`;
                }
            }
        }

        // Interactive Ghost
        if (light.semantic.interactive?.ghost) {
            css += `\n    /* Interactive Ghost */\n`;
            for (const [name, value] of Object.entries(light.semantic.interactive.ghost)) {
                const resolvedValue = resolveTokenRef(value);
                css += `    --interactive-ghost-${name}: ${resolvedValue};\n`;
            }
        }

        // Soft
        if (light.semantic.soft) {
            css += `\n    /* Soft Variants */\n`;
            for (const [name, value] of Object.entries(light.semantic.soft)) {
                const resolvedValue = resolveTokenRef(value);
                css += `    --soft-${name}: ${resolvedValue};\n`;
            }
        }

        // Focus Ring
        if (light.semantic.focus?.ring) {
            css += `\n    /* Focus Ring */\n`;
            const ringValue = light.semantic.focus.ring;
            if (typeof ringValue === 'string') {
                const resolvedValue = resolveTokenRef(ringValue);
                css += `    --focus-ring: ${resolvedValue};\n`;
            } else if (typeof ringValue === 'object' && ringValue !== null && !Array.isArray(ringValue)) {
                for (const [name, value] of Object.entries(ringValue)) {
                    const resolvedValue = resolveTokenRef(value);
                    css += `    --focus-ring-${name}: ${resolvedValue};\n`;
                }
            }
        }

        css += `}\n\n`;
    }

    // --- Dark Theme Semantics ---
    if (dark && dark.semantic) {
        css += `/* ─── Dark Theme Semantics ─── */\n`;
        css += `[data-theme="dark"] {\n`;

        // Surface
        if (dark.semantic.surface) {
            css += `    /* Surfaces */\n`;
            for (const [name, value] of Object.entries(dark.semantic.surface)) {
                const resolvedValue = resolveTokenRef(value);
                css += `    --surface-${name}: ${resolvedValue};\n`;
            }
        }

        // Text
        if (dark.semantic.text) {
            css += `\n    /* Text */\n`;
            for (const [name, value] of Object.entries(dark.semantic.text)) {
                if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                    // Handle nested objects like on-brand
                    for (const [subname, subvalue] of Object.entries(value)) {
                        const resolvedValue = resolveTokenRef(subvalue);
                        css += `    --text-${name}-${subname}: ${resolvedValue};\n`;
                    }
                } else {
                    const resolvedValue = resolveTokenRef(value);
                    css += `    --text-${name}: ${resolvedValue};\n`;
                }
            }
        }

        // Border
        if (dark.semantic.border) {
            css += `\n    /* Borders */\n`;
            for (const [name, value] of Object.entries(dark.semantic.border)) {
                const resolvedValue = resolveTokenRef(value);
                css += `    --border-${name}: ${resolvedValue};\n`;
            }
        }

        // Interactive
        if (dark.semantic.interactive) {
            css += `\n    /* Interactive */\n`;
            if (dark.semantic.interactive.primary) {
                css += `    --interactive-primary: ${resolveTokenRef(dark.semantic.interactive.primary.default)};\n`;
                css += `    --interactive-primary-hover: ${resolveTokenRef(dark.semantic.interactive.primary.hover)};\n`;
                css += `    --interactive-primary-text: ${resolveTokenRef(dark.semantic.interactive.primary.text)};\n`;
            }
            if (dark.semantic.interactive.secondary) {
                css += `    --interactive-secondary: ${resolveTokenRef(dark.semantic.interactive.secondary.default)};\n`;
                css += `    --interactive-secondary-hover: ${resolveTokenRef(dark.semantic.interactive.secondary.hover)};\n`;
                css += `    --interactive-secondary-text: ${resolveTokenRef(dark.semantic.interactive.secondary.text)};\n`;
            }
        }

        // Status
        if (dark.semantic.status) {
            css += `\n    /* Status */\n`;
            for (const [name, value] of Object.entries(dark.semantic.status)) {
                const resolvedValue = resolveTokenRef(value);
                css += `    --status-${name}: ${resolvedValue};\n`;
            }
        }

        // Gradient
        if (dark.semantic.gradient) {
            css += `\n    /* Gradient */\n`;
            for (const [name, value] of Object.entries(dark.semantic.gradient)) {
                const resolvedValue = resolveTokenRef(value);
                css += `    --gradient-${name}: ${resolvedValue};\n`;
            }
        }

        // Chart Palette
        if (dark.semantic.chart) {
            css += `\n    /* Chart Palette */\n`;
            for (const [name, value] of Object.entries(dark.semantic.chart)) {
                const resolvedValue = resolveTokenRef(value);
                css += `    --chart-${name}: ${resolvedValue};\n`;
            }
        }

        // Alert
        if (dark.semantic.alert) {
            css += `\n    /* Alert */\n`;
            for (const [variant, properties] of Object.entries(dark.semantic.alert)) {
                for (const [prop, value] of Object.entries(properties)) {
                    const resolvedValue = resolveTokenRef(value);
                    css += `    --alert-${variant}-${prop}: ${resolvedValue};\n`;
                }
            }
        }

        // Interactive Ghost
        if (dark.semantic.interactive?.ghost) {
            css += `\n    /* Interactive Ghost */\n`;
            for (const [name, value] of Object.entries(dark.semantic.interactive.ghost)) {
                const resolvedValue = resolveTokenRef(value);
                css += `    --interactive-ghost-${name}: ${resolvedValue};\n`;
            }
        }

        // Soft
        if (dark.semantic.soft) {
            css += `\n    /* Soft Variants */\n`;
            for (const [name, value] of Object.entries(dark.semantic.soft)) {
                const resolvedValue = resolveTokenRef(value);
                css += `    --soft-${name}: ${resolvedValue};\n`;
            }
        }

        // Focus Ring
        if (dark.semantic.focus?.ring) {
            css += `\n    /* Focus Ring */\n`;
            const ringValue = dark.semantic.focus.ring;
            if (typeof ringValue === 'string') {
                const resolvedValue = resolveTokenRef(ringValue);
                css += `    --focus-ring: ${resolvedValue};\n`;
            } else if (typeof ringValue === 'object' && ringValue !== null && !Array.isArray(ringValue)) {
                for (const [name, value] of Object.entries(ringValue)) {
                    const resolvedValue = resolveTokenRef(value);
                    css += `    --focus-ring-${name}: ${resolvedValue};\n`;
                }
            }
        }

        css += `}\n\n`;
    }

    // --- Radius Scale: Derive --radius-button and --radius-container per brand ---
    if (primary.radiusScale && brandsData.brands) {
        const scale = primary.radiusScale;
        const radiusPrimitives = primary.radius;
        const defaultBrandName = brandsData.defaultBrand || 'orion';
        const brands = brandsData.brands;

        css += `/* ─── Radius Scale (Button → Container Derivation) ─── */\n`;

        // Validate deprecated radiusContainer
        for (const [name, brand] of Object.entries(brands)) {
            if (brand.geometry && brand.geometry.radiusContainer) {
                console.warn(`⚠️  Brand "${name}" still has deprecated radiusContainer in brands.json — it will be ignored`);
            }
        }

        // Generate default brand (orion) in :root
        const defaultBrand = brands[defaultBrandName];
        if (defaultBrand) {
            const btnPrim = resolveButtonPrimitive(defaultBrand);
            const containerPrim = deriveContainerRadius(btnPrim, scale);
            const btnValue = radiusPrimitives[btnPrim];
            const containerValue = radiusPrimitives[containerPrim];

            if (!btnValue) {
                console.error(`❌ Brand "${defaultBrandName}": button radius "${btnPrim}" not found in radius primitives`);
                process.exit(1);
            }

            css += `:root {\n`;
            css += `    /* Derived: button="${btnPrim}" (${btnValue}) → container="${containerPrim}" (${containerValue}) */\n`;
            css += `    --radius-button: var(--radius-${btnPrim});\n`;
            css += `    --radius-container: var(--radius-${containerPrim});\n`;
            css += `}\n\n`;

            console.log(`  ${defaultBrandName}: --radius-button: ${btnValue} (${btnPrim}) → --radius-container: ${containerValue} (${containerPrim})`);
        }

        // Generate non-default brand overrides
        for (const [name, brand] of Object.entries(brands)) {
            if (name === defaultBrandName) continue;
            if (!brand.geometry) continue;

            const btnPrim = resolveButtonPrimitive(brand);
            const containerPrim = deriveContainerRadius(btnPrim, scale);
            const btnValue = radiusPrimitives[btnPrim];
            const containerValue = radiusPrimitives[containerPrim];

            if (!btnValue) {
                console.error(`❌ Brand "${name}": button radius "${btnPrim}" not found in radius primitives`);
                process.exit(1);
            }

            css += `/* ─── ${name.charAt(0).toUpperCase() + name.slice(1)} Radius ─── */\n`;
            css += `[data-brand="${name}"] {\n`;
            css += `    /* Derived: button="${btnPrim}" (${btnValue}) → container="${containerPrim}" (${containerValue}) */\n`;
            css += `    --radius-button: var(--radius-${btnPrim});\n`;
            css += `    --radius-container: var(--radius-${containerPrim});\n`;
            css += `}\n\n`;

            console.log(`  ${name}: --radius-button: ${btnValue} (${btnPrim}) → --radius-container: ${containerValue} (${containerPrim})`);
        }
    }

    // Write output
    fs.writeFileSync(OUTPUT_FILE, css);
    console.log(`✅ Generated: ${OUTPUT_FILE}`);
    console.log(`   ${css.split('\n').length} lines`);
}

// Resolve token references like {color.brand.500} to var(--color-brand-500)
// Also handles color-mix(in srgb, {color.brand.500} 10%, transparent)
function resolveTokenRef(value) {
    if (typeof value !== 'string') return value;

    // Check if it's a token reference {token.path}
    const match = value.match(/^\{(.+)\}$/);
    if (match) {
        const tokenPath = match[1].replace(/\./g, '-');
        return `var(--${tokenPath})`;
    }

    // Handle color-mix with token references
    if (value.includes('color-mix')) {
        return value.replace(/\{([^}]+)\}/g, (match, tokenPath) => {
            const varName = tokenPath.replace(/\./g, '-');
            return `var(--${varName})`;
        });
    }

    return value;
}

// Validate radius scale integrity
function validateRadiusScale() {
    const primary = loadJSON('primary.json');
    const brandsData = loadJSON('brands.json');
    if (!primary || !brandsData) return false;

    const scale = primary.radiusScale;
    const radiusPrimitives = primary.radius;
    let valid = true;

    console.log('\n🔍 Radius Scale Validation');
    console.log('───────────────────────────────');

    // Check scale references valid primitives
    for (const [btnKey, containerKey] of Object.entries(scale)) {
        if (!radiusPrimitives[btnKey]) {
            console.error(`  ❌ Scale key "${btnKey}" not found in radius primitives`);
            valid = false;
        }
        if (!radiusPrimitives[containerKey]) {
            console.error(`  ❌ Scale value "${containerKey}" (from "${btnKey}") not found in radius primitives`);
            valid = false;
        }
    }

    // Check each brand maps to a valid scale entry
    for (const [name, brand] of Object.entries(brandsData.brands)) {
        if (!brand.geometry) continue;

        // Warn if deprecated radiusContainer still present
        if (brand.geometry.radiusContainer) {
            console.warn(`  ⚠️  Brand "${name}": radiusContainer is deprecated — remove from brands.json`);
        }

        const btnPrim = resolveButtonPrimitive(brand);
        if (!scale[btnPrim]) {
            console.error(`  ❌ Brand "${name}": button primitive "${btnPrim}" has no entry in radiusScale`);
            valid = false;
        }
        if (!radiusPrimitives[btnPrim]) {
            console.error(`  ❌ Brand "${name}": button primitive "${btnPrim}" not found in radius primitives`);
            valid = false;
        }

        const containerPrim = deriveContainerRadius(btnPrim, scale);
        console.log(`  ✅ ${name}: button=${btnPrim} (${radiusPrimitives[btnPrim]}) → container=${containerPrim} (${radiusPrimitives[containerPrim]})`);
    }

    if (valid) {
        console.log('  ✅ All brands pass radius scale validation');
    }

    return valid;
}

// Run
generateCSS();
validateRadiusScale();
