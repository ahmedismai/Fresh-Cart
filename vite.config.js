import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/Fresh-Cart/", // تأكد من أنه يطابق اسم المستودع بالضبط
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          reactVendor: ['react', 'react-dom', 'react-router-dom'],
          uiLibs: ['@tanstack/react-query', 'react-hot-toast'],
        },
      },
    },
    chunkSizeWarningLimit: 700, 
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});

