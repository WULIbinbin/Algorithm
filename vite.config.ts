import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "./",
  mode: "development",
  server: {
    port: 8896,
  },
  esbuild: {
    // jsxFactory: "h",
    // jsxFragment: "Fragment",
    // jsxImportSource: 'preact',
    jsx: "automatic",
    jsxInject: `import React from 'react'`,
  },
  resolve: {
    alias: {
      "@": "/src/",
      pages: resolve(__dirname, "/src/pages"),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${resolve(
            "src/styles/var.less"
          )}";`,
        },
        javascriptEnabled: true,
      },
    },
  },
});
