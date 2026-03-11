import { defineConfig } from "vite";
import { resolve } from "path";
import { createViteConfig, BLOCKS_EXTERNALS } from "../../vite.shared.config";

export default defineConfig(
  createViteConfig({
    entry: resolve(__dirname, "src/index.ts"),
    name: "OrionBlocks",
    extraExternals: BLOCKS_EXTERNALS,
    cssCodeSplit: false,
    assetFileNames: (assetInfo) => {
      if (assetInfo.name && assetInfo.name.endsWith(".css")) {
        return "blocks.css";
      }
      return assetInfo.name || "assets/[name]-[hash][extname]";
    },
  }),
);
