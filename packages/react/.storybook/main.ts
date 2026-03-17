import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";
import path from "path";

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../../blocks/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      resolve: {
        dedupe: ["react", "react-dom", "react/jsx-runtime"],
        alias: {
          // Force Vite to use the workspace-local theme.css (with inlined generated tokens)
          // instead of the stale pnpm store copy
          "@orion-ds/react/theme.css": path.resolve(
            __dirname,
            "../../theme.css",
          ),
          // Resolve @orion-ds/blocks to source for hot-reload (CSS modules handled by Vite)
          "@orion-ds/blocks": path.resolve(
            __dirname,
            "../../packages/blocks/src",
          ),
        },
      },
    });
  },
};

export default config;
