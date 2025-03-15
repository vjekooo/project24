import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
// import devtools from 'solid-devtools/vite'

export default defineConfig({
  plugins: [
    // devtools(),
    solidPlugin(),
  ],
  server: {
    host: true,
    port: 3000,
    open: false,
  },
  build: {
    target: 'esnext',
  },
})
