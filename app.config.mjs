import { defineConfig } from '@solidjs/start/config'
import tailwindcss from '@tailwindcss/vite'
import devtools from 'solid-devtools/vite'

export default defineConfig({
  server: {
    prerender: {
      routes: ['/'],
    },
  },
  vite: {
    plugins: [tailwindcss(), devtools()],
  },
})
