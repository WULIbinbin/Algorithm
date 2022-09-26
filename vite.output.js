import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'lib',
    lib: {
      entry: path.resolve(__dirname, './src/es'),
      name: 'es',
      fileName: 'es',
    },
  },
});
