import { defineConfig } from 'vite'
import postcss from './postcss.config.js'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  define: {
    'process.env': process.env
  },
  optimizeDeps: {
    exclude: ['js-big-decimal']
  },
  css: {
    postcss,
  },
  plugins: [react(),VitePWA({ 
    workbox: {
      globPatterns: ['**/*.{js,css,html}'],
    },
    registerType: 'autoUpdate',
    includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg','logo_isem.png'],
    manifest: {
      name: 'Bolsa de Trabajo para Personas Discapacitadas',
      short_name: 'SICME',
      theme_color: '#8a2036',
      display: 'fullscreen',
      icons: [
          {
              src: 'edomex-64x64.png',
              sizes: '64x64',
              type: 'image/png'
          },
          {
              src: 'edomex-192x192.png',
              sizes: '192x192',
              type: 'image/png'
          },
          {
              src: 'edomex-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any'
          },
          {
            src: "assets/logo_isem-9741bee6.png",
            sizes: "710x281",
            type: "image/png",
          },
          {
              src: 'maskable-icon-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable'
          }
      ],
    }, 
  })],
  resolve: {
    alias: [
      {
        find: /^~.+/,
        replacement: (val) => {
          return val.replace(/^~/, "");
        },
      },
    ],
  },
  build: {
    chunkSizeWarningLimit: 4600,
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  } 
})
