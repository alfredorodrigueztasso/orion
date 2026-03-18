#!/usr/bin/env node
/**
 * @orion-ds/cli — Add Orion Design System components to your project
 *
 * Usage:
 *   npx @orion-ds/cli init                    # Configure project
 *   npx @orion-ds/cli add button card modal   # Copy components
 *   npx @orion-ds/cli list                    # Show available items
 */

import { init } from "./commands/init.js";
import { add } from "./commands/add.js";
import { list } from "./commands/list.js";
import * as logger from "./lib/logger.js";

const VERSION = "1.0.0";

function showHelp(): void {
  console.log(`
  ${logger.bold("@orion-ds/cli")} — Add Orion components to your project

  ${logger.bold("Usage:")}
    orion init                       Initialize orion.json
    orion add <name...>              Add components to your project
    orion list                       List available components

  ${logger.bold("Init options:")}
    --yes, -y                        Skip prompts, use defaults

  ${logger.bold("Add options:")}
    --yes, -y                        Skip confirmation prompts
    --overwrite                      Overwrite existing files
    --local                          Use local registry (public/r/)

  ${logger.bold("List options:")}
    --type=<component|section|template>   Filter by type
    --local                               Use local registry

  ${logger.bold("Examples:")}
    npx @orion-ds/cli init
    npx @orion-ds/cli add button card modal
    npx @orion-ds/cli add theme-controller --yes
    npx @orion-ds/cli list --type=section
`);
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const command = args[0];
  const commandArgs = args.slice(1);

  switch (command) {
    case "init":
      await init(commandArgs);
      break;
    case "add":
      await add(commandArgs);
      break;
    case "list":
      await list(commandArgs);
      break;
    case "--version":
    case "-v":
      console.log(VERSION);
      break;
    case "--help":
    case "-h":
    case undefined:
      showHelp();
      break;
    default:
      logger.error(`Unknown command: ${command}`);
      showHelp();
      process.exit(1);
  }
}

main().catch((err) => {
  logger.error((err as Error).message);
  process.exit(1);
});
