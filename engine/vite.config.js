import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { execSync } from 'child_process'
import fs from 'fs'

// Custom Vite plugin to compile .ink files on the fly
function inkPlugin() {
  return {
    name: 'vite-plugin-ink',
    transform(code, id) {
      if (id.endsWith('.ink')) {
        try {
          // Run inkjs-compiler on the file
          execSync(`npx inkjs-compiler "${id}"`);
          // The compiler creates a .json file next to the .ink file
          const jsonPath = id + '.json';
          const jsonContent = fs.readFileSync(jsonPath, 'utf-8');
          
          // Return the parsed JSON as the default export
          return {
            code: `export default ${jsonContent};`,
            map: null
          };
        } catch (error) {
          console.error(`Error compiling Ink file: ${id}`, error);
          throw error;
        }
      }
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte(), inkPlugin()],
})
