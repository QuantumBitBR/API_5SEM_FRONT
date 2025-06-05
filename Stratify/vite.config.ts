import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    // vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  test: {
    // Ambiente para testes de componentes Vue
    environment: 'jsdom',

    // Configuração de relatório de cobertura
    coverage: {
      provider: 'v8',               // usa @vitest/coverage-v8
      reporter: ['text', 'lcov'],   // 'lcov' é essencial para SonarCloud
      reportsDirectory: './coverage',
    },
  },
})
