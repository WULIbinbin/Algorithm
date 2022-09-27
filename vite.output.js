import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist-promise',
    lib: {
      entry: path.resolve(__dirname, './src/es'),
      name: 'es',
      fileName: 'es',
    },
  },
});
