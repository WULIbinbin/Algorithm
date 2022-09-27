import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  mode: 'development',
  server: {
    port: 8897,
  },
  esbuild: {},
  resolve: {
    alias: {
      '@': '/src/',
    },
  },
  plugins: [],
});
