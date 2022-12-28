import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist-promise',
    lib: {
      entry: path.resolve(__dirname, './src/common/promise'),
      name: 'promise',
      fileName: 'promise',
    },
  },
});
