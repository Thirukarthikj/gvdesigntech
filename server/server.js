// Standalone Backend Server for GV DesignTech (MongoDB API)
import express from 'express';
import cors from 'cors';
import { apiRouter } from './apiMiddleware.js';
import { connectMongo } from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Mount MongoDB API routes at /api
app.use('/api', apiRouter);

// Health check root
app.get('/', (req, res) => {
  res.json({
    app: 'GV DesignTech MongoDB Backend API',
    status: 'online',
    endpoints: [
      '/api/mous',
      '/api/gallery',
      '/api/placements',
      '/api/blogs',
      '/api/leaders',
      '/api/certificates',
      '/api/leads',
      '/api/health'
    ]
  });
});

async function startServer() {
  await connectMongo();
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 GV DesignTech MongoDB API Server running at http://localhost:${PORT}`);
  });
}

startServer();
