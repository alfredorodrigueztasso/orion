import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";
import path from "path";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
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
        },
      },
      build: {
        rollupOptions: {
          output: {
            manualChunks: (id) => {
              // Split large story files into separate chunks to avoid >500KB bundles
              if (id.includes("Chart.stories")) {
                return "chart-stories";
              }
              if (id.includes("IconGallery.stories")) {
                return "icon-stories";
              }
              // Vendor code in its own chunk
              if (id.includes("node_modules")) {
                return "vendor";
              }
            },
          },
        },
      },
    });
  },
};

export default config;
