// Configure Vitest (https://vitest.dev/config/)
/// <reference types="vitest" />
import { configDefaults } from 'vitest/config'

import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
// https://vitejs.dev/guide/build.html#library-mode
export default defineConfig({
  plugins: [vue(), dts({ rollupTypes: true })],
  test: {
    environment: 'happy-dom',
    exclude: [...configDefaults.exclude, '**/src/experimental/**'],
  },
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'src/modal/index.ts'),
      name: 'useModalContext',
      fileName: 'index',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
