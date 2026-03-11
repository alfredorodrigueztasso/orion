/**
 * TypeScript declarations for CSS Modules
 * Allows importing *.module.css files in TypeScript
 */

declare module "*.module.css" {
  const content: Record<string, string>;
  export default content;
}
