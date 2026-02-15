import { defineConfig } from 'vite';
import aurelia from '@aurelia/vite-plugin';

export default defineConfig({
  server: {
    open: true,
    port: 8080,
  },
  build: {
    target: 'es2022',
  },
  plugins: [
    aurelia(),
  ],
});
