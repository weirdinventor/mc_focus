// Add this to your vite.config.ts to fix the React Native issue

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import svgr from "vite-plugin-svgr";
import tailwindcss from '@tailwindcss/vite';


export default defineConfig({
  plugins: [ svgr({
      include: "**/*.svg?react",
    }), react(),tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@modules': path.resolve(__dirname, 'src/modules'),
      // Mock react-native to prevent build issues
      'react-native': path.resolve(__dirname, 'src/mocks/react-native.ts'),
    },
  },
  optimizeDeps: {
    exclude: ['react-native'], // Exclude react-native from dependency optimization
  },
  define: {
    // Define global constants for React Native compatibility
    __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
    global: 'globalThis',
  },
})