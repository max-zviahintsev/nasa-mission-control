import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  test: {
    include: ['**/*.test.ts', '**/*.spec.ts'],
    exclude: ['**/node_modules/**', '**/dist/**'],
    server: {
      sourcemap: 'inline',
      debug: { dumpModules: true, loadDumppedModules: true },
    },
    reporters: ['html'],
  },
  plugins: [tsconfigPaths()],
})
