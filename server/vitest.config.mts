import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  test: {
    include: ['**/*.test.ts'],
    exclude: ['**/node_modules/**', '**/dist/**'],
    setupFiles: './src/services/tests.setup.ts',
  },
  plugins: [tsconfigPaths()],
})
