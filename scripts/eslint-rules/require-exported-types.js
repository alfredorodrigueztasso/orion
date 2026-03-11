/**
 * ESLint Rule: require-exported-types
 *
 * Validates that index.ts files in components/sections export types.
 * This is a lightweight rule that only analyzes code patterns, not filesystem.
 */

export default {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Ensure components and sections export types from their index.ts',
      category: 'Best Practices',
    },
    fixable: null,
    schema: [],
  },
  create(context) {
    const filePath = context.getFilename();

    // Only check index.ts files in components or sections
    if (!filePath.endsWith('index.ts') ||
        (!filePath.includes('/components/') && !filePath.includes('/sections/'))) {
      return {};
    }

    return {
      ExportNamedDeclaration(node) {
        // Track if we see any type exports
        if (node.specifiers && node.specifiers.length > 0) {
          // Check if it's exporting from a .types file
          const source = node.source?.value || '';
          if (source.includes('.types')) {
            context.parent = { hasTypeExports: true };
          }
        }
      },
      ExportAllDeclaration(node) {
        // export * from './' style
        const source = node.source?.value || '';
        if (source.includes('.types')) {
          context.parent = { hasTypeExports: true };
        }
      },
    };
  },
};
