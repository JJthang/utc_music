import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '')
 return  {
    plugins: [
      react({
        babel: {
          plugins: [['babel-plugin-react-compiler']],
        },
      }),
       svgr()
    ],
    server: {
      port: 8000, // 👈 cổng dev
      open: true, // tự mở trình duyệt (tuỳ chọn)
    },
    css: {
      devSourcemap: true,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    define: {
      'process.env': env
    },
    build: {
      outDir: 'dist',
      sourcemap: mode !== 'production',
    },
  }
})
