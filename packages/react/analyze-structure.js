/**
 * Detailed Structure Analysis Script
 * Analyzes each component's completeness and generates actionable insights
 */

const fs = require('fs');
const path = require('path');

const componentsPath = path.join(__dirname, 'src/components');
const components = [];

// Priority weights based on common usage
const priorityComponents = {
  // Forms (High priority - most used)
  'Button': 10,
  'Field': 10,
  'Select': 9,
  'Switch': 8,
  'Checkbox': 8,
  'Radio': 7,
  'Textarea': 7,

  // Layout (High priority)
  'Card': 10,
  'Modal': 9,
  'Navbar': 8,

  // Feedback (Medium-High priority)
  'Alert': 9,
  'Badge': 8,
  'Spinner': 8,
  'ProgressBar': 7,
  'Tooltip': 7,

  // Data Display (Medium priority)
  'Avatar': 6,
  'Table': 7,
  'Tabs': 7,
  'Breadcrumb': 6,

  // Utilities (Medium priority)
  'ThemeController': 6,
};

function countLines(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return content.split('\n').length;
  } catch {
    return 0;
  }
}

function analyzeComponent(componentName) {
  const componentPath = path.join(componentsPath, componentName);
  const files = fs.readdirSync(componentPath);

  const analysis = {
    name: componentName,
    priority: priorityComponents[componentName] || 5,
    files: {
      component: null,
      types: null,
      styles: null,
      stories: null,
      test: null,
      index: null,
    },
    lines: {
      component: 0,
      types: 0,
      styles: 0,
      stories: 0,
      test: 0,
    },
    completeness: {
      hasComponent: false,
      hasTypes: false,
      hasStyles: false,
      hasStories: false,
      hasTest: false,
    },
    score: 0,
    recommendations: [],
  };

  // Check each file type
  files.forEach(file => {
    const filePath = path.join(componentPath, file);

    if (file === `${componentName}.tsx`) {
      analysis.files.component = file;
      analysis.lines.component = countLines(filePath);
      analysis.completeness.hasComponent = true;
    } else if (file === `${componentName}.types.ts`) {
      analysis.files.types = file;
      analysis.lines.types = countLines(filePath);
      analysis.completeness.hasTypes = true;
    } else if (file === `${componentName}.module.css`) {
      analysis.files.styles = file;
      analysis.lines.styles = countLines(filePath);
      analysis.completeness.hasStyles = true;
    } else if (file === `${componentName}.stories.tsx`) {
      analysis.files.stories = file;
      analysis.lines.stories = countLines(filePath);
      analysis.completeness.hasStories = true;
    } else if (file === `${componentName}.test.tsx`) {
      analysis.files.test = file;
      analysis.lines.test = countLines(filePath);
      analysis.completeness.hasTest = true;
    } else if (file === 'index.ts') {
      analysis.files.index = file;
    }
  });

  // Calculate completeness score
  const weights = {
    component: 30,
    types: 20,
    styles: 15,
    stories: 20,
    test: 15,
  };

  if (analysis.completeness.hasComponent) analysis.score += weights.component;
  if (analysis.completeness.hasTypes) analysis.score += weights.types;
  if (analysis.completeness.hasStyles) analysis.score += weights.styles;
  if (analysis.completeness.hasStories) analysis.score += weights.stories;
  if (analysis.completeness.hasTest) analysis.score += weights.test;

  // Generate recommendations
  if (!analysis.completeness.hasTest) {
    analysis.recommendations.push({
      type: 'CRITICAL',
      priority: 'HIGH',
      action: 'Create test file',
      file: `${componentName}.test.tsx`,
      impact: 'Enable automated validation and provide usage examples for AI',
    });
  }

  if (!analysis.completeness.hasStories) {
    analysis.recommendations.push({
      type: 'IMPORTANT',
      priority: 'HIGH',
      action: 'Create Storybook story',
      file: `${componentName}.stories.tsx`,
      impact: 'Visual documentation and interactive examples',
    });
  }

  if (analysis.completeness.hasTest && analysis.lines.test < 50) {
    analysis.recommendations.push({
      type: 'ENHANCEMENT',
      priority: 'MEDIUM',
      action: 'Expand test coverage',
      file: `${componentName}.test.tsx`,
      impact: `Current: ${analysis.lines.test} lines. Add edge cases and variants.`,
    });
  }

  if (analysis.completeness.hasStories && analysis.lines.stories < 50) {
    analysis.recommendations.push({
      type: 'ENHANCEMENT',
      priority: 'MEDIUM',
      action: 'Add more story variants',
      file: `${componentName}.stories.tsx`,
      impact: `Current: ${analysis.lines.stories} lines. Show more use cases.`,
    });
  }

  return analysis;
}

// Analyze all components
if (fs.existsSync(componentsPath)) {
  const dirs = fs.readdirSync(componentsPath);
  dirs.forEach(dir => {
    const componentPath = path.join(componentsPath, dir);
    const stat = fs.statSync(componentPath);
    if (stat.isDirectory()) {
      components.push(analyzeComponent(dir));
    }
  });
}

// Sort by priority and completeness
components.sort((a, b) => {
  // First by priority (higher first)
  if (b.priority !== a.priority) {
    return b.priority - a.priority;
  }
  // Then by completeness (lower first - needs more work)
  return a.score - b.score;
});

// Generate Report
console.log('\n╔════════════════════════════════════════════════════════════════╗');
console.log('║         DETAILED STRUCTURE ANALYSIS - @orion/react            ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

// Summary Statistics
const stats = {
  total: components.length,
  withTests: components.filter(c => c.completeness.hasTest).length,
  withStories: components.filter(c => c.completeness.hasStories).length,
  withTypes: components.filter(c => c.completeness.hasTypes).length,
  withStyles: components.filter(c => c.completeness.hasStyles).length,
  fullyComplete: components.filter(c => c.score === 100).length,
  needingTests: components.filter(c => !c.completeness.hasTest).length,
  needingStories: components.filter(c => !c.completeness.hasStories).length,
};

console.log('📊 SUMMARY STATISTICS:\n');
console.log(`   Total Components:        ${stats.total}`);
console.log(`   Fully Complete (100%):   ${stats.fullyComplete} (${Math.round(stats.fullyComplete/stats.total*100)}%)`);
console.log(`   With TypeScript Types:   ${stats.withTypes} (${Math.round(stats.withTypes/stats.total*100)}%)`);
console.log(`   With CSS Modules:        ${stats.withStyles} (${Math.round(stats.withStyles/stats.total*100)}%)`);
console.log(`   With Storybook Stories:  ${stats.withStories} (${Math.round(stats.withStories/stats.total*100)}%)`);
console.log(`   With Unit Tests:         ${stats.withTests} (${Math.round(stats.withTests/stats.total*100)}%)`);
console.log(`\n   🚨 Needing Tests:        ${stats.needingTests} components`);
console.log(`   📚 Needing Stories:      ${stats.needingStories} components\n`);

console.log('─────────────────────────────────────────────────────────────────\n');
console.log('📋 COMPONENT-BY-COMPONENT ANALYSIS:\n');
console.log('(Sorted by Priority + Completeness)\n');

components.forEach((comp, index) => {
  const priorityLabel = comp.priority >= 9 ? 'CRITICAL' :
                       comp.priority >= 7 ? 'HIGH' :
                       comp.priority >= 5 ? 'MEDIUM' : 'LOW';

  const statusEmoji = comp.score === 100 ? '✅' :
                     comp.score >= 85 ? '🟢' :
                     comp.score >= 65 ? '🟡' :
                     comp.score >= 50 ? '🟠' : '🔴';

  console.log(`${index + 1}. ${statusEmoji} ${comp.name.padEnd(20)} Priority: ${priorityLabel.padEnd(10)} Score: ${comp.score}%`);

  // Show what exists
  const exists = [];
  if (comp.completeness.hasComponent) exists.push('Component');
  if (comp.completeness.hasTypes) exists.push('Types');
  if (comp.completeness.hasStyles) exists.push('Styles');
  if (comp.completeness.hasStories) exists.push('Stories');
  if (comp.completeness.hasTest) exists.push('Tests');

  console.log(`   Has: ${exists.join(', ')}`);

  // Show lines of code
  if (comp.lines.component > 0) {
    const complexity = comp.lines.component > 200 ? 'Complex' :
                      comp.lines.component > 100 ? 'Medium' : 'Simple';
    console.log(`   Component: ${comp.lines.component} lines (${complexity})`);
  }

  if (comp.lines.stories > 0) {
    console.log(`   Stories: ${comp.lines.stories} lines`);
  }

  if (comp.lines.test > 0) {
    console.log(`   Tests: ${comp.lines.test} lines`);
  }

  // Show recommendations
  if (comp.recommendations.length > 0) {
    console.log(`   📝 Recommendations:`);
    comp.recommendations.forEach(rec => {
      const icon = rec.type === 'CRITICAL' ? '🚨' :
                  rec.type === 'IMPORTANT' ? '⚠️' : '💡';
      console.log(`      ${icon} ${rec.action} (${rec.priority})`);
      console.log(`         Impact: ${rec.impact}`);
    });
  }

  console.log('');
});

console.log('─────────────────────────────────────────────────────────────────\n');
console.log('🎯 PRIORITIZED ACTION PLAN:\n');

// Phase 1: Critical components without tests
const criticalWithoutTests = components.filter(c =>
  c.priority >= 8 && !c.completeness.hasTest
);

if (criticalWithoutTests.length > 0) {
  console.log('Phase 1: CRITICAL Components Needing Tests (HIGH IMPACT)');
  console.log('─────────────────────────────────────────────────────────\n');
  criticalWithoutTests.forEach((comp, i) => {
    console.log(`${i + 1}. ${comp.name}`);
    console.log(`   Priority: ${comp.priority}/10`);
    console.log(`   Complexity: ${comp.lines.component} lines`);
    console.log(`   Action: Create ${comp.name}.test.tsx`);
    console.log(`   Estimated Time: ${comp.lines.component > 150 ? '45-60' : '30-45'} minutes\n`);
  });
}

// Phase 2: High priority components without stories
const highPriorityWithoutStories = components.filter(c =>
  c.priority >= 7 && !c.completeness.hasStories
);

if (highPriorityWithoutStories.length > 0) {
  console.log('Phase 2: High Priority Components Needing Stories');
  console.log('─────────────────────────────────────────────────────────\n');
  highPriorityWithoutStories.forEach((comp, i) => {
    console.log(`${i + 1}. ${comp.name}`);
    console.log(`   Priority: ${comp.priority}/10`);
    console.log(`   Action: Create ${comp.name}.stories.tsx`);
    console.log(`   Estimated Time: 20-30 minutes\n`);
  });
}

// Phase 3: Remaining components
const remainingWithoutTests = components.filter(c =>
  c.priority < 8 && !c.completeness.hasTest
);

if (remainingWithoutTests.length > 0) {
  console.log('Phase 3: Remaining Components (Lower Priority)');
  console.log('─────────────────────────────────────────────────────────\n');
  remainingWithoutTests.forEach((comp, i) => {
    console.log(`${i + 1}. ${comp.name} - Priority: ${comp.priority}/10`);
  });
  console.log('');
}

console.log('─────────────────────────────────────────────────────────────────\n');
console.log('⏱️  TIME ESTIMATES:\n');

const testTime = criticalWithoutTests.reduce((sum, c) => {
  return sum + (c.lines.component > 150 ? 60 : 45);
}, 0);

const storyTime = highPriorityWithoutStories.length * 25;

console.log(`   Phase 1 (Critical Tests):     ~${Math.round(testTime / 60)} hours`);
console.log(`   Phase 2 (High Priority Stories): ~${Math.round(storyTime / 60)} hours`);
console.log(`   Phase 3 (Remaining):          ~${Math.round((stats.needingTests - criticalWithoutTests.length) * 40 / 60)} hours`);
console.log(`   ────────────────────────────────────────────`);
console.log(`   Total to 100% Coverage:       ~${Math.round((testTime + storyTime + (stats.needingTests - criticalWithoutTests.length) * 40) / 60)} hours\n`);

console.log('─────────────────────────────────────────────────────────────────\n');
console.log('💡 QUICK WINS (2-3 hours to boost score significantly):\n');

const quickWins = components
  .filter(c => c.priority >= 8 && !c.completeness.hasTest)
  .slice(0, 5);

if (quickWins.length > 0) {
  console.log('   Create tests for these 5 components:\n');
  quickWins.forEach((comp, i) => {
    console.log(`   ${i + 1}. ${comp.name}`);
  });
  console.log(`\n   Impact: Structure score from 59% → ~75% ⬆️ +16 points`);
  console.log(`   Overall AI-First score: 86 → ~91 🏆\n`);
}

console.log('─────────────────────────────────────────────────────────────────\n');
console.log('📈 SCORE PROJECTION:\n');

console.log(`   Current:               59/100 (10% test coverage)`);
console.log(`   After Phase 1:         ~75/100 (${Math.round((stats.withTests + criticalWithoutTests.length) / stats.total * 100)}% test coverage)`);
console.log(`   After Phase 1 + 2:     ~85/100 (${Math.round((stats.withStories + highPriorityWithoutStories.length) / stats.total * 100)}% story coverage)`);
console.log(`   After Full Coverage:   ~95/100 (100% test + story coverage)\n`);

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║                    ANALYSIS COMPLETE                           ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

// Save detailed JSON
const report = {
  summary: stats,
  components: components,
  phases: {
    phase1: criticalWithoutTests.map(c => c.name),
    phase2: highPriorityWithoutStories.map(c => c.name),
    phase3: remainingWithoutTests.map(c => c.name),
  },
  quickWins: quickWins.map(c => c.name),
  timeEstimates: {
    phase1Hours: Math.round(testTime / 60),
    phase2Hours: Math.round(storyTime / 60),
    totalHours: Math.round((testTime + storyTime + (stats.needingTests - criticalWithoutTests.length) * 40) / 60),
  },
};

fs.writeFileSync(
  path.join(__dirname, 'structure-analysis-detailed.json'),
  JSON.stringify(report, null, 2)
);

console.log('📄 Detailed JSON report saved to: structure-analysis-detailed.json\n');
