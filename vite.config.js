import { defineConfig } from 'vite';

export default defineConfig(({ command, mode }) => {
  console.log(command)
  return {
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
  };
});
