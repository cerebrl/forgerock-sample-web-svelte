import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import { resolve } from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: adapter(),

    // Override http methods in the Todo forms
    methodOverride: {
      allowed: ['PATCH', 'DELETE']
    },

    vite: {
      resolve: {
        alias: {
          $icons: resolve('./src/lib/components/icons'),
          $journey: resolve('./src/lib/components/journey'),
          $todos: resolve('./src/lib/components/todos'),
          $utilities: resolve('./src/lib/components/utilities'),
        }
      }
    }
  }
};

export default config;
