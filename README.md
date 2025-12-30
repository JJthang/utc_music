# Music Streaming Frontend

React + TypeScript + Vite application for music streaming platform.

## Features

- **Chatbot AI**: Tích hợp Groq AI API (miễn phí) để trả lời câu hỏi về nghe nhạc

## Setup

### 1. Install Dependencies

```bash
npm install
# hoặc
yarn install
```

### 2. Configure Environment Variables

Tạo file `.env` trong thư mục root và thêm các biến môi trường:

```env
VITE_API_URL=http://localhost:3000
VITE_GROQ_API_KEY=your_groq_api_key_here
```

#### Lấy Groq API Key (Miễn phí):

1. Truy cập https://console.groq.com/
2. Đăng ký/Đăng nhập tài khoản (hoàn toàn miễn phí)
3. Vào phần "API Keys" 
4. Tạo API key mới
5. Copy API key và dán vào file `.env` như trên

**Lưu ý**: Groq API có gói miễn phí hào phóng với giới hạn hợp lý cho việc sử dụng chatbot.

### 3. Run Development Server

```bash
npm run dev
# hoặc
yarn dev
```

## Chatbot Feature

Chatbot sử dụng Groq AI API để trả lời các câu hỏi về:
- Tìm kiếm và khám phá bài hát
- Hướng dẫn sử dụng ứng dụng
- Thông tin về gói Premium
- Tư vấn về tính năng nghe nhạc

Nếu không cấu hình `VITE_GROQ_API_KEY`, chatbot sẽ sử dụng chế độ fallback với keyword matching cơ bản.

---

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
