import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss(), solidPlugin()],
  server: {
    host: true,
    port: 4000,
    open: false,
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        format: 'es',
        manualChunks(id) {
          if (/envVariables.ts/.test(id)) {
            return 'envVariables'
          }
        },
      },
    },
  },
})
