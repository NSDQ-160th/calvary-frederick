import yaml from '@rollup/plugin-yaml';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.calvaryfrederick.com',
  output: 'static',
  server: {
    host: '127.0.0.1',
    port: 4321,
  },
  vite: {
    plugins: [yaml()],
  },
});
