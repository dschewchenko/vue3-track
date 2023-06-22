/// <reference types="vitest/config" />

import { defineConfig, PluginOption } from "vite";
import dtsPlugin from "vite-plugin-dts";
import vuePlugin from "@vitejs/plugin-vue";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  base: "/",
  build: {
    outDir: "docs"
  },
  plugins: [
    vuePlugin(),
    visualizer({
      template: "list",
      gzipSize: true
    }) as PluginOption
  ]
});
