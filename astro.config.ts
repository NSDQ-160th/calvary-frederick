import path from 'node:path';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import yaml from '@rollup/plugin-yaml';
import keystatic from '@keystatic/astro';
import { defineConfig, envField } from 'astro/config';

const keystaticEnvStub = path.resolve('src/lib/keystatic-env-stub.ts');

// https://astro.build/config
export default defineConfig({
  site: 'https://www.calvaryfrederick.com',
  output: 'static',
  adapter: vercel(),
  integrations: [react(), keystatic()],
  server: {
    host: '127.0.0.1',
    port: 4321,
  },
  env: {
    schema: {
      KEYSTATIC_GITHUB_CLIENT_ID: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
      KEYSTATIC_GITHUB_CLIENT_SECRET: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
      KEYSTATIC_SECRET: envField.string({
        context: 'server',
        access: 'secret',
        optional: true,
      }),
    },
  },
  vite: {
    plugins: [yaml()],
    optimizeDeps: {
      esbuildOptions: {
        plugins: [
          {
            name: 'astro-env-server-stub',
            setup(build) {
              build.onResolve({ filter: /^astro:env\/server$/ }, () => ({
                path: keystaticEnvStub,
              }));
            },
          },
        ],
      },
    },
  },
});
