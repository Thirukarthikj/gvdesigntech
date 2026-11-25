import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import express from 'express';
import { apiRouter } from './server/apiMiddleware.js';

const apiApp = express();
apiApp.use('/api', apiRouter);

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'mongodb-api-middleware',
      configureServer(server) {
        server.middlewares.use(apiApp);
      }
    }
  ],
  server: {
    port: 3000,
    open: false,
    host: true
  }
});
