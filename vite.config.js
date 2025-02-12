import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "/Fresh-Cart/", 
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'reactVendor';
            if (id.includes('@tanstack/react-query') || id.includes('react-hot-toast')) return 'uiLibs';
            return 'vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 700, // ✅ رفع الحد الأقصى لحجم الملفات
    minify: 'terser', 
    terserOptions: {
      compress: {
        drop_console: true, // ✅ إزالة console.log
        drop_debugger: true, // ✅ إزالة debugger
      },
    },
  },
});
