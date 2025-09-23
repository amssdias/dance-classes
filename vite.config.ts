import { defineConfig } from 'vite'

export default defineConfig({
  base: '/dance-classes/',
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: [
      'localhost',
      '127.0.0.1',
    ]
  }
})
