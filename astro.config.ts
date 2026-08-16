import yaml from '@rollup/plugin-yaml';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.calvaryfrederick.com',
  output: 'static',
  vite: {
    plugins: [yaml()],
  },
});
