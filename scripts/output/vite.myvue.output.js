import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target:['es2015'],
    outDir: 'dist-myvue',
    lib: {
      entry: path.resolve(__dirname, './src/vue/index'),
      name: 'myvue',
      fileName: 'myvue',
    },
  },
});
