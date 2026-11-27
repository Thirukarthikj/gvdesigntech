import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import express from 'express';
import { apiRouter, serveVideoHandler } from './server/apiMiddleware.js';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  Object.assign(process.env, env);

  const apiApp = express();
  apiApp.get('/assets/videos/:filename', serveVideoHandler);
  apiApp.use('/api', apiRouter);

  return {
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
  };
});
