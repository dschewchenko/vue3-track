/// <reference types="vitest/config" />

import { resolve } from "path";
import { defineConfig, PluginOption } from "vite";
import dtsPlugin from "vite-plugin-dts";
import vuePlugin from "@vitejs/plugin-vue";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "vue3-track",
      fileName: "vue3-track"
    }
  },
  plugins: [
    vuePlugin(),
    dtsPlugin({
      insertTypesEntry: true
    }),
    visualizer({
      template: "list",
      gzipSize: true
    }) as PluginOption
  ],
  test: {
    environment: "jsdom",
    coverage: {
      provider: "c8",
      reporter: ["text", "json-summary", "json"],
      lines: 60,
      branches: 60,
      functions: 60,
      statements: 60
    }
  }
});
